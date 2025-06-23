// server.js (ES Module Version)

import 'dotenv/config'; // Loads .env variables
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import * as openpgp from 'openpgp';

// --- SETUP ---
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const pgpPublicKey = process.env.PGP_PUBLIC_KEY;
const destinationEmail = process.env.DESTINATION_EMAIL;

// Replicate __dirname functionality in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARE ---
app.use(express.json());

// --- API ENDPOINT ---
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, project, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const messageContent = `From: ${name} <${email}>\nProject: ${project}\n\n${message}`;

    const publicKey = await openpgp.readKey({ armoredKey: pgpPublicKey });
    const encryptedMessage = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: messageContent }),
      encryptionKeys: publicKey,
    });

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [destinationEmail],
      subject: `New Encrypted Message from ${name}`,
      text: encryptedMessage,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Failed to send email.' });
    }

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// --- SERVE REACT APP ---
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- START SERVER ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
