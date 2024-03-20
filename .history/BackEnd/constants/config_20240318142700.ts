require('dotenv').config()
export const config = {
  SECRET_KEY: process.env.SECRET_KEY_JWT || '',
  EXPIRE_ACCESS_TOKEN: 7 * 24 * 60 * 60,
  EXPIRE_REFRESH_TOKEN: 100 * 24 * 60 * 60,
}
// 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").

export const FOLDER_UPLOAD = 'upload'

export const FOLDERS = {
  PRODUCT: 'product',
  AVATAR: 'avatar',
}

export const ROUTE_IMAGE = 'images'

const MailConfig = {
  MAILER: process.env.MAIL_MAILER,
  HOST: process.env.MAIL_HOST,
  PORT: process.env.MAIL_PORT, // Sửa lại 'MAIL_MAILER' thành 'MAIL_PORT'
  USERNAME: process.env.MAIL_USERNAME,
  PASSWORD: process.env.MAIL_PASSWORD,
  ENCRYPTION: process.env.MAIL_ENCRYPTION,
  FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  FROM_NAME: process.env.MAIL_FROM_NAME,
}

export default MailConfig
