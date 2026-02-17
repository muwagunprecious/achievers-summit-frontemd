const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendTicketEmail } = require('../lib/email-service');

async function testEmail() {
    console.log('--- Email Test Script ---');
    console.log('Host:', process.env.EMAIL_HOST);
    console.log('Port:', process.env.EMAIL_PORT);
    console.log('User:', process.env.EMAIL_USER);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('❌ Credentials not found in .env file!');
        process.exit(1);
    }

    const dummyData = {
        email: 'ademuwagunremi60@gmail.com',
        fullName: 'Test User (Direct Script Fix)',
        ticketType: 'Regular',
        ticketId: 'TEST-SCRIPT-' + Math.floor(Math.random() * 1000),
        pdfBuffer: Buffer.from('Dummy PDF Content') // Just for testing
    };

    try {
        console.log(`Sending test email to ${dummyData.email}...`);
        await sendTicketEmail(dummyData);
        console.log('✅ Test email sent successfully!');
    } catch (error) {
        console.error('❌ Test email failed:');
        console.error(error);
        process.exit(1);
    }
}

testEmail();
