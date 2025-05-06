// server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: `contact@linkerx.dev`,
      to: ['support@linkerx.dev'],
      subject,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ message: 'Email sent via Resend!', data });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: 'Failed to send email via Resend' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
