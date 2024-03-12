import dotenv from 'dotenv'
import Joi from 'joi'
import path from 'path'

const envFilePath = path.join(__dirname, '../../.env')
dotenv.config({ path: envFilePath })

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
  DEV_APP_PORT: Joi.number().default(3000),
  PORT: Joi.number().default(3000),
  DB_CONNECTION: Joi.string().required().description('Mongo DB url'),
  SALT_ROUND: Joi.number().default(12),
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  EMAIL_SENDER: Joi.string().required().description('Email Sender'),
  SENDGRID_API_KEY: Joi.string().required().description('send_grid api key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    .default(30)
    .description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    .default(30)
    .description('days after which refresh tokens expire'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description('minutes after which reset password token expires'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description('minutes after which verify email token expires'),
  TWILIO_ACCOUNT_SID: Joi.string().required().description('twilio account sid'),
  TWILIO_AUTH_TOKEN: Joi.string().required().description('twilio auth token'),
  SENDER_PHONE_NUMBER: Joi.string().required().description('sender phone number'),
  AVATAR_BUCKET_NAME: Joi.string().required().description("AWS S3 User avatar Bucket Name"),
  LESSONS_BUCKET_NAME: Joi.string().required().description("AWS S3 Lessons Attachement"),
  TASKS_BUCKET_NAME: Joi.string().required().description("AWS S3 Tasks Attachements bucket name"),
  AWS_ACCESS_KEY_ID: Joi.string().required().description("AWS Access Key ID"),
  AWS_SECRET_ACCESS_KEY: Joi.string().required().description("AWS Secret Access Key"),
}).unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default {
  env: envVars.NODE_ENV,
  devAppPort: envVars.DEV_APP_PORT,
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
  baseUrl: `http://localhost:${envVars.PORT}`,
  saltRound: envVars.SALT_ROUND,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  sendGridApiKey: envVars.SENDGRID_API_KEY,
  emailSender: envVars.EMAIL_SENDER,
  twilio: {
    accountSid: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    senderPhoneNumber: envVars.SENDER_PHONE_NUMBER,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    avatarBucketName: envVars.AVATAR_BUCKET_NAME,
    tasksAttachmentsBucketName: envVars.TASKS_BUCKET_NAME,
    lessonsAttachmentsBucketName: envVars.LESSONS_BUCKET_NAME,

  }
}