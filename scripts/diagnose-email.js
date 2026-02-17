const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function diagnose() {
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const port = Number(process.env.EMAIL_PORT);

    console.log(`Diagnosing connection to ${host}:${port} (SSL: ${port === 465})`);

    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465,
        auth: {
            user: user,
            pass: pass,
        },
        tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1'
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
        logger: true,
        debug: true
    });

    try {
        console.log('Starting verification...');
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully!');
    } catch (error) {
        console.error('❌ SMTP verification failed:');
        console.error(error);
    }
}

diagnose();
