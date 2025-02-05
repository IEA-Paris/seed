provider "aws" {
  alias   = "apex"
  region  = "us-east-1"
  profile = "apex"
}

provider "aws" {
  alias   = "acm_provider"
  region  = "us-east-1"
  profile = var.env
}

locals {
    subdomain = var.env == "prod" ? null : var.env
    domain_names = ["paris-ias.io"]
}

data "aws_route53_zone" "these" {
  provider = aws.apex
  for_each = toset(local.domain_names)

  name = each.key
}

resource "aws_route53_record" "cert_validation" {
  provider = aws.apex

  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = data.aws_route53_zone.these[join(".", slice(split(".", dvo.domain_name), length(split(".", dvo.domain_name)) - 2, length(split(".", dvo.domain_name))))].zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}


resource "aws_acm_certificate" "this" {
  provider = aws.acm_provider

  domain_name               = "${local.subdomain != null ? "${local.subdomain}." : ""}${local.domain_names[0]}"
  subject_alternative_names = local.subdomain != null ? [for dn in slice(local.domain_names, 1, length(local.domain_names)) : "${local.subdomain}.${dn}"] : slice(local.domain_names, 1, length(local.domain_names))
  validation_method         = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  provider = aws.acm_provider

  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_route53_record" "a_records" {
  provider = aws.apex
  for_each = toset(local.domain_names)

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.these[each.key].zone_id
  name            = local.subdomain != null ? "${local.subdomain}.${each.key}" : each.key
  type            = "A"

  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = true
  }
}