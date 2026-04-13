import crypto from "crypto"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const maxNumber = 100000
  const saltLength = 16
  const algorithm = "SHA-256"
  const hmacKey = config.altchaHmacKey || "secret-hmac-key-change-in-production"

  // Generate random salt
  const salt = crypto.randomBytes(saltLength).toString("hex")

  // Generate random number
  const number = Math.floor(Math.random() * maxNumber)

  // Create the challenge hash
  const challenge = crypto
    .createHash("sha256")
    .update(salt + number.toString())
    .digest("hex")

  // Create signature
  const signature = crypto
    .createHmac("sha256", hmacKey)
    .update(JSON.stringify({ algorithm, challenge, salt }))
    .digest("hex")

  return {
    algorithm,
    challenge,
    salt,
    signature,
  }
})
