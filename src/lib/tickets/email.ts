import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const port = Number(process.env.EMAIL_PORT || 465);

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port,
    secure: process.env.EMAIL_SECURE
      ? process.env.EMAIL_SECURE === "true"
      : port === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });

  return transporter;
}

function getAppBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://achieversnewsite.vercel.app"
  ).replace(/\/$/, "");
}

function getSupportEmail() {
  return (
    process.env.REGISTRATION_SUPPORT_EMAIL ||
    process.env.EMAIL_FROM_EMAIL ||
    process.env.EMAIL_USER ||
    "info@achieverssummit.com.ng"
  );
}

function escapeHtml(value: unknown) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderTicketEmail(input: {
  fullName: string;
  ticketId: string;
  ticketPrice?: string;
  ticketType: string;
}) {
  const supportEmail = getSupportEmail();
  const ctaUrl = `${getAppBaseUrl()}/ticket-confirmation/${input.ticketId}`;

  return {
    subject: "Your Achievers Summit 2026 Ticket Is Ready",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 16px; overflow: hidden; background: #ffffff;">
        <div style="background: #050b11; padding: 36px 40px; color: #ffffff;">
          <p style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #a4c6e6;">Registration Confirmed</p>
          <h1 style="margin: 0; font-size: 30px; line-height: 1.15; font-weight: 800;">Your summit pass is ready.</h1>
        </div>
        <div style="padding: 36px 40px;">
          <p style="margin: 0 0 18px; font-size: 16px; color: #111111;">Hello ${escapeHtml(input.fullName)},</p>
          <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #444444;">Thank you for registering. Your participation has been confirmed and your ticket is attached to this email as a PDF.</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px;">Ticket Category</td>
              <td style="padding: 10px 0; color: #111; font-size: 14px; font-weight: 600; text-align: right;">${escapeHtml(input.ticketType)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px;">Ticket ID</td>
              <td style="padding: 10px 0; color: #111; font-size: 14px; font-weight: 600; text-align: right;">${escapeHtml(input.ticketId)}</td>
            </tr>
            ${
              input.ticketPrice
                ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-size: 14px;">Price</td>
                    <td style="padding: 10px 0; color: #111; font-size: 14px; font-weight: 600; text-align: right;">${escapeHtml(input.ticketPrice)}</td>
                  </tr>`
                : ""
            }
          </table>
          <div style="margin: 0 0 28px;">
            <a href="${escapeHtml(ctaUrl)}" style="display: inline-block; padding: 14px 22px; border-radius: 999px; background: #050b11; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700;">View Ticket</a>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666666;">Need help? Reply to this email or contact <a href="mailto:${escapeHtml(
            supportEmail,
          )}" style="color: #5f8fb9; text-decoration: none;">${escapeHtml(supportEmail)}</a>.</p>
        </div>
      </div>
    `,
    text: [
      "Your summit pass is ready.",
      "",
      `Hello ${input.fullName},`,
      "",
      "Thank you for registering. Your participation has been confirmed and your ticket is attached to this email as a PDF.",
      "",
      `Ticket Category: ${input.ticketType}`,
      `Ticket ID: ${input.ticketId}`,
      ...(input.ticketPrice ? [`Price: ${input.ticketPrice}`] : []),
      "",
      `View Ticket: ${ctaUrl}`,
      `Support: ${supportEmail}`,
    ].join("\n"),
  };
}

export async function sendTicketEmailSafely(input: {
  email: string;
  fullName: string;
  pdfBuffer?: Buffer;
  ticketId: string;
  ticketPrice?: string;
  ticketType: string;
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return {
      message:
        "Your registration was received successfully, but email is not configured.",
      provider: null,
      sent: false,
    };
  }

  try {
    const emailContent = renderTicketEmail(input);

    await getTransporter().sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || "Achievers Summit"}" <${
        process.env.EMAIL_FROM_EMAIL || process.env.EMAIL_USER
      }>`,
      to: input.email,
      replyTo: getSupportEmail(),
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      attachments: input.pdfBuffer
        ? [
            {
              filename: `Achievers_Summit_2026_Ticket_${input.ticketId}.pdf`,
              content: input.pdfBuffer,
              contentType: "application/pdf",
            },
          ]
        : undefined,
    });

    return {
      message: "A confirmation email has been sent to your email address.",
      provider: "smtp",
      sent: true,
    };
  } catch (error) {
    console.error("[EMAIL-SERVICE] Ticket email failed:", error);
    return {
      message:
        "Your registration was received successfully, but we could not send the confirmation email right now.",
      provider: null,
      sent: false,
    };
  }
}
