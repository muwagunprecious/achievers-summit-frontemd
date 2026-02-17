const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
    console.log('--- START SMTP TEST (IP DIRECT) ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Host: 64.29.17.1 (mail.eainternational.net)');
    console.log('Port: 465');
    console.log('User: info@eainternational.net');

    const transporter = nodemailer.createTransport({
        host: '64.29.17.1',
        port: 465,
        secure: true,
        auth: {
            user: 'info@eainternational.net',
            pass: 'ChairmanAgida1203'
        },
        tls: {
            rejectUnauthorized: false,
            // Try forcing TLSv1.2 explicitly
            minVersion: 'TLSv1.2',
            servername: 'mail.eainternational.net'
        },
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000,
        logger: true,
        debug: true
    });

    console.log('Initiating transporter.verify()...');
    try {
        await transporter.verify();
        console.log('✅ Connection successful!');
    } catch (err) {
        console.error('❌ Connection failed:');
        console.error('Code:', err.code);
        console.error('Full Error:', err);
    }
    console.log('--- END SMTP TEST ---');
}

test().catch(err => {
    console.error('Global error:', err);
});
