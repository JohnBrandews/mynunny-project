export const config = {
  database: {
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production",
    expiresIn: "7d",
  },
  email: {
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    user: process.env.SMTP_USER || "your-ethereal-username",
    pass: process.env.SMTP_PASS || "your-ethereal-password",
    from: process.env.SMTP_FROM || "noreply@mynunny.com",
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "your-cloud-name",
    apiKey: process.env.CLOUDINARY_API_KEY || "your-api-key",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "your-api-secret",
  },
};
