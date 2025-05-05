import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'support@linkerx.dev',      // replace with your Zoho email
    pass: '@Riku022498',  // use an app-specific password
  },
});
