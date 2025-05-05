// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { transporter } from './mailer'; // Make sure this file exports a properly configured nodemailer transporter

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" ${email}`,
      to: 'support@linkerx.dev',
      subject,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
