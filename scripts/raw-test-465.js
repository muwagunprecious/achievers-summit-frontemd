const net = require('net');

console.log('--- START RAW SOCKET TEST ---');
console.log('Connecting to mail.eainternational.net:465...');

const client = net.connect(465, 'mail.eainternational.net', () => {
    console.log('TCP Connection established connected');
});

client.on('data', (data) => {
    console.log('RECEIVED DATA:', data.toString());
    console.log('HEX:', data.toString('hex'));
});

client.on('error', (err) => {
    console.error('SOCKET ERROR:', err.message);
});

client.on('end', () => {
    console.log('Connection closed by server');
});

setTimeout(() => {
    console.log('Timeout reached (20s). Destroying socket.');
    client.destroy();
    console.log('--- END RAW SOCKET TEST ---');
}, 20000);
