import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

const PDF_TEXT_REPLACEMENTS: Record<string, string> = {
  "▪": " - ",
  "–": "-",
  "—": "-",
  "’": "'",
  "“": "\"",
  "”": "\"",
  "…": "...",
};

function sanitizePdfText(value: string) {
  return Array.from(String(value).normalize("NFKD"))
    .map((character) => {
      if (PDF_TEXT_REPLACEMENTS[character]) {
        return PDF_TEXT_REPLACEMENTS[character];
      }

      return /[\x20-\x7E]/.test(character) ? character : "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateTicketPdf(input: {
  fullName: string;
  ticketId: string;
  ticketPrice: string;
  ticketType: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([297, 420]);
  const { width, height } = page.getSize();

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const attendeeName = sanitizePdfText(input.fullName).toUpperCase();
  const ticketCategory = sanitizePdfText(input.ticketType).toUpperCase();
  const ticketPrice = sanitizePdfText(input.ticketPrice).toUpperCase();
  const ticketId = sanitizePdfText(input.ticketId);

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.02, 0.04, 0.07),
  });

  page.drawRectangle({
    x: 0,
    y: height - 10,
    width,
    height: 10,
    color: rgb(0.64, 0.78, 0.9),
  });

  page.drawText("ACHIEVERS SUMMIT", {
    x: 20,
    y: height - 45,
    size: 18,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("OFFICIAL EVENT TICKET", {
    x: 20,
    y: height - 75,
    size: 10,
    font: helvetica,
    color: rgb(1, 1, 1),
  });

  page.drawText("ATTENDEE", {
    x: 20,
    y: height - 110,
    size: 8,
    font: helvetica,
    color: rgb(1, 0.85, 0.4),
  });
  page.drawText(attendeeName, {
    x: 20,
    y: height - 130,
    size: 16,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("CATEGORY", {
    x: 20,
    y: height - 160,
    size: 8,
    font: helvetica,
    color: rgb(1, 0.85, 0.4),
  });
  page.drawText(ticketCategory, {
    x: 20,
    y: height - 180,
    size: 14,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("PRICE", {
    x: 20,
    y: height - 215,
    size: 8,
    font: helvetica,
    color: rgb(1, 0.85, 0.4),
  });
  page.drawText(ticketPrice, {
    x: 20,
    y: height - 232,
    size: 12,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("TICKET ID", {
    x: 180,
    y: height - 260,
    size: 8,
    font: helvetica,
    color: rgb(1, 0.85, 0.4),
  });
  page.drawText(ticketId, {
    x: 180,
    y: height - 275,
    size: 10,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  const qrData = JSON.stringify({
    category: input.ticketType,
    event: "Achievers Summit 2026",
    id: input.ticketId,
    name: input.fullName,
  });

  const qrCodeDataURL = await QRCode.toDataURL(qrData, {
    margin: 1,
    color: { dark: "#ffffff", light: "#050b11" },
  });
  const qrImageBytes = Buffer.from(qrCodeDataURL.split(",")[1] ?? "", "base64");
  const qrImage = await pdfDoc.embedPng(qrImageBytes);

  page.drawImage(qrImage, {
    x: 20,
    y: height - 380,
    width: 90,
    height: 90,
  });

  return Buffer.from(await pdfDoc.save());
}
