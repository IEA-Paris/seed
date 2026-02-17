terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {}

  required_version = ">= 1.2.0"
}

provider "aws" {
  profile = var.env
  region  = var.region
}


locals {
  s3_bucket = "${var.env}-website-iea-paris"
}

resource "aws_s3_bucket" "this" {
  acl    = "private"
  bucket = local.s3_bucket

  website {
    index_document = "index.html"
  }
}


resource "aws_cloudfront_origin_access_identity" "this" {}

data "aws_iam_policy_document" "this" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.this.iam_arn]
    }
    resources = ["${aws_s3_bucket.this.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.this.json
}

# CloudFront Function to rewrite clean URLs to /index.html
# S3 with OAI uses the bucket API (not website endpoint),
# so it can't resolve /path → /path/index.html automatically.
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "${var.env}-iea-paris-url-rewrite"
  runtime = "cloudfront-js-1.0"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;
      if (uri.endsWith('/')) {
        request.uri += 'index.html';
      } else if (!uri.includes('.')) {
        request.uri += '/index.html';
      }
      return request;
    }
  EOF
}

resource "aws_cloudfront_distribution" "this" {
  #depends_on = local.new_cert == true ? [aws_acm_certificate.this[0]] : []

  #web_acl_id = "${data.aws_waf_web_acl.cf.id}"
  aliases = (var.env == "prod") ? [for dn in local.domain_names : dn] : [for dn in local.domain_names : "${var.env}.${dn}"]

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 403
    response_page_path    = "/404.html"
  }

  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET"]
    cached_methods   = ["HEAD", "GET"]
    target_origin_id = "S3-${aws_s3_bucket.this.id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }

    /* Attach Lambda Edge */
    #lambda_function_association {
    #  event_type   = "origin-response"
    #  lambda_arn   = "${data.aws_lambda_function.edge_lambda.arn}:${var.version_function}"
    #  include_body = false
    #}
  }

  default_root_object = "index.html"
  enabled             = true
  is_ipv6_enabled     = true

  origin {
    domain_name = aws_s3_bucket.this.bucket_domain_name
    origin_id   = "S3-${aws_s3_bucket.this.id}"

    /* Attach policy to S3 - Restrict access to Cloudfront */
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  retain_on_delete = false

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate.this.arn
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = false
  }

}
