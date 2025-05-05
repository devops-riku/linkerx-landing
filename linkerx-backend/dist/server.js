"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mailer_1 = require("./mailer"); // Make sure this file exports a properly configured nodemailer transporter
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await mailer_1.transporter.sendMail({
            from: `"${name}" ${email}`,
            to: 'support@linkerx.dev',
            subject,
            text: `From: ${name} <${email}>\n\n${message}`,
        });
        res.status(200).json({ message: 'Email sent successfully!' });
    }
    catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
