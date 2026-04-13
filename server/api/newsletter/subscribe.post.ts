import mailchimp from "@mailchimp/mailchimp_marketing"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email is required",
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email format",
    })
  }

  try {
    // Configure Mailchimp
    mailchimp.setConfig({
      apiKey: config.mailchimpApiKey,
      server: config.mailchimpServerPrefix,
    })

    // Use setListMember for idempotent behavior
    const crypto = await import("crypto")
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex")

    const response = await mailchimp.lists.setListMember(
      config.mailchimpListId,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          MMERGE8: "",
        },
      },
    )

    return {
      success: true,
      message: "Successfully subscribed to newsletter",
      email: response.email_address,
      status: response.status,
    }
  } catch (error: any) {
    console.error("Mailchimp subscription error:", error)

    // Handle specific Mailchimp errors
    if (
      error.status === 400 &&
      error.response?.body?.title === "Member Exists"
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: "This email is already subscribed",
      })
    }

    throw createError({
      statusCode: error.status || 500,
      statusMessage:
        error.response?.body?.detail || "Failed to subscribe to newsletter",
    })
  }
})
