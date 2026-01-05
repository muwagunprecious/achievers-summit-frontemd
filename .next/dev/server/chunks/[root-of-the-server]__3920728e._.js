module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/prisma.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const prismaClientSingleton = ()=>{
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
};
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
const __TURBOPACK__default__export__ = prisma;
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/lib/pdf-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateTicketPDF",
    ()=>generateTicketPDF
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__ = __turbopack_context__.i("[externals]/pdf-lib [external] (pdf-lib, cjs, [project]/node_modules/pdf-lib)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/index.js [app-route] (ecmascript)");
;
;
async function generateTicketPDF({ fullName, ticketType, ticketId }) {
    console.log(`[PDF-SERVICE] Generating PDF using pdf-lib for ${fullName} (${ticketId})`);
    try {
        // Create a new PDFDocument
        const pdfDoc = await __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["PDFDocument"].create();
        // Add a page (A6 roughly is 298 x 420 points)
        const page = pdfDoc.addPage([
            297,
            420
        ]);
        const { width, height } = page.getSize();
        // Standard Fonts
        const helveticaBold = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["StandardFonts"].HelveticaBold);
        const helveticaBoldOblique = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["StandardFonts"].HelveticaBoldOblique);
        const helvetica = await pdfDoc.embedFont(__TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["StandardFonts"].Helvetica);
        // --- Background ---
        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(0.1, 0.1, 0.1)
        });
        // Accent Bar
        page.drawRectangle({
            x: 0,
            y: height - 10,
            width,
            height: 10,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 0.55, 0)
        });
        // --- Brand Header ---
        page.drawText('ACHIEVERS SUMMIT', {
            x: 20,
            y: height - 45,
            size: 18,
            font: helveticaBold,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        page.drawText('2026', {
            x: 220,
            y: height - 45,
            size: 18,
            font: helveticaBoldOblique,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 0.55, 0)
        });
        // --- Content ---
        page.drawText('OFFICIAL EVENT TICKET', {
            x: 20,
            y: height - 75,
            size: 10,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        // Horizontal Line
        page.drawRectangle({
            x: 20,
            y: height - 85,
            width: width - 40,
            height: 1,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        // Attendee Info
        page.drawText('ATTENDEE', {
            x: 20,
            y: height - 110,
            size: 8,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 0.55, 0)
        });
        page.drawText(fullName.toUpperCase(), {
            x: 20,
            y: height - 130,
            size: 16,
            font: helveticaBold,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        page.drawText('CATEGORY', {
            x: 20,
            y: height - 160,
            size: 8,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 0.55, 0)
        });
        page.drawText(ticketType.toUpperCase(), {
            x: 20,
            y: height - 180,
            size: 14,
            font: helveticaBold,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        page.drawText('TICKET ID', {
            x: 20,
            y: height - 210,
            size: 8,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 0.55, 0)
        });
        page.drawText(ticketId, {
            x: 20,
            y: height - 230,
            size: 14,
            font: helveticaBold,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        // --- QR Code ---
        const qrData = JSON.stringify({
            id: ticketId,
            name: fullName,
            category: ticketType,
            event: 'Achievers Summit 2026'
        });
        const qrCodeDataURL = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toDataURL(qrData, {
            margin: 1,
            color: {
                dark: '#ffffff',
                light: '#1a1a1a'
            }
        });
        const qrImageBytes = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
        const qrImage = await pdfDoc.embedPng(qrImageBytes);
        page.drawImage(qrImage, {
            x: 180,
            y: height - 230,
            width: 90,
            height: 90
        });
        // --- Footer ---
        page.drawRectangle({
            x: 0,
            y: 0,
            width,
            height: 60,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(0.05, 0.05, 0.05)
        });
        page.drawText('VENUE', {
            x: 20,
            y: 35,
            size: 8,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(0.4, 0.4, 0.4)
        });
        page.drawText('Victoria Island, Lagos', {
            x: 20,
            y: 20,
            size: 10,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        page.drawText('DATE', {
            x: 180,
            y: 35,
            size: 8,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(0.4, 0.4, 0.4)
        });
        page.drawText('31 March - 01 April', {
            x: 180,
            y: 20,
            size: 10,
            font: helvetica,
            color: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pdf$2d$lib__$5b$external$5d$__$28$pdf$2d$lib$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$29$__["rgb"])(1, 1, 1)
        });
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    } catch (error) {
        console.error('[PDF-SERVICE] Error generating PDF with pdf-lib:', error);
        throw error;
    }
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/email-service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendTicketEmail",
    ()=>sendTicketEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
;
console.log('[EMAIL-SERVICE] Initializing with user:', process.env.EMAIL_USER);
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
async function sendTicketEmail({ email, fullName, ticketType, ticketId, pdfBuffer }) {
    console.log(`[EMAIL-SERVICE] Attempting to send email to ${email} for ticket ${ticketId}`);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('[EMAIL-SERVICE] Missing SMTP credentials in environment variables');
        throw new Error('Email configuration missing');
    }
    const mailOptions = {
        from: `"Achievers Summit" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🎟️ Your Achievers Summit 2026 Ticket Is Ready!',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #1a1a1a; padding: 40px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; font-style: italic;">ACHIEVERS SUMMIT <span style="color: #ff8c00;">2026</span></h1>
                </div>
                
                <div style="padding: 40px; background-color: #ffffff; color: #333333;">
                    <h2 style="color: #1a1a1a; margin-top: 0;">Hello ${fullName},</h2>
                    <p style="line-height: 1.6; font-size: 16px;">Thank you for registering for <strong>Achievers Summit 2026</strong>.</p>
                    <p style="line-height: 1.6; font-size: 16px;">We are delighted to confirm your participation at this prestigious leadership and innovation summit taking place at <strong>Victoria Island, Lagos</strong>.</p>
                    <p style="line-height: 1.6; font-size: 16px;">Your personalized ticket has been successfully generated and attached to this email as a PDF document.</p>
                    
                    <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #ff8c00;">
                        <h3 style="margin-top: 0; color: #1a1a1a; text-transform: uppercase; font-size: 14px; letter-spacing: 2px;">Ticket Summary</h3>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>Ticket Category:</strong> ${ticketType}</p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>Ticket ID:</strong> ${ticketId}</p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>Event Date:</strong> 31 March – 1 April 2026</p>
                        <p style="margin: 8px 0; font-size: 15px;"><strong>Venue:</strong> Victoria Island, Lagos</p>
                    </div>
                    
                    <p style="line-height: 1.6; font-size: 14px; font-style: italic; color: #666;">Please keep this ticket safe and present it (digitally or printed) at the venue for entry.</p>
                </div>
                
                <div style="padding: 30px; background-color: #1a1a1a; text-align: center; color: #999; font-size: 12px;">
                    <p style="margin: 0 0 10px 0;">Achievers Summit Team</p>
                    <p style="margin: 0;">
                        <a href="https://achieverssummit.com" style="color: #ff8c00; text-decoration: none;">Official Website</a> | 
                        <a href="#" style="color: #ff8c00; text-decoration: none;">Instagram</a> | 
                        <a href="#" style="color: #ff8c00; text-decoration: none;">Twitter</a>
                    </p>
                </div>
            </div>
        `,
        attachments: [
            {
                filename: `Achievers_Summit_2026_Ticket_${ticketId}.pdf`,
                content: pdfBuffer
            }
        ]
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('[EMAIL-SERVICE] Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('[EMAIL-SERVICE] SMTP Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            stack: error.stack
        });
        throw error;
    }
}
}),
"[project]/app/api/tickets/create/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pdf-service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/email-service.js [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const { fullName, email, phone, ticketType } = await req.json();
        if (!fullName || !email || !ticketType) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing required fields'
            }, {
                status: 400
            });
        }
        // 1. Get Ticket Category to confirm price/validity
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].ticketCategory.findFirst({
            where: {
                name: ticketType
            }
        });
        if (!category) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid ticket category'
            }, {
                status: 400
            });
        }
        // 2. Generate Unique Ticket ID
        const generateTicketId = ()=>{
            const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
            return `AS2026-${randomPart}`;
        };
        let ticketId = generateTicketId();
        let isUnique = false;
        let retries = 0;
        while(!isUnique && retries < 5){
            const check = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].eventTicket.findUnique({
                where: {
                    ticketId
                }
            });
            if (!check) isUnique = true;
            else {
                ticketId = generateTicketId();
                retries++;
            }
        }
        if (!isUnique) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Failed to generate unique ticket ID'
            }, {
                status: 500
            });
        }
        // 3. Create Ticket Record in DB
        const newTicket = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].eventTicket.create({
            data: {
                fullName,
                email,
                phone: phone || '',
                ticketType: category.name,
                ticketPrice: String(category.price),
                ticketId,
                reference: `INSTANT-${ticketId}`,
                status: 'VALID',
                purchaseDate: new Date()
            }
        });
        // 4. Generate PDF
        console.log('Generating PDF for:', ticketId);
        const pdfBuffer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateTicketPDF"])({
            fullName,
            ticketType: category.name,
            ticketId
        });
        // 5. Send Email
        console.log('Sending email to:', email);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$email$2d$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sendTicketEmail"])({
                email,
                fullName,
                ticketType: category.name,
                ticketId,
                pdfBuffer
            });
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Email delivery failed:', emailError);
            // We return success for ticket generation but mention email failure if needed, 
            // or just follow user instruction for "Email Delivery Failure" popup handling.
            // For the API, we'll return a specific flag if email failed.
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ...newTicket,
                emailSent: false,
                error: 'Email delivery failed'
            }, {
                status: 201
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...newTicket,
            emailSent: true,
            pdfBase64: pdfBuffer.toString('base64')
        }, {
            status: 201
        });
    } catch (error) {
        console.error('Error in instant ticket issuance:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3920728e._.js.map