import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from '../utils/constants.js';

if (!EMAIL || !EMAIL_PASSWORD) {
    throw new Error('Email credentials not configured in environment variables');
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP connection error:', error);
    } else {
        console.log('✅ SMTP server is ready to take messages');
    }
});

export default transporter;