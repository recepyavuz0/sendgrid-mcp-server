import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function sendBatchEmails(toList: string[], subject: string, text: string, html?: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const fromEmail = process.env.FROM_EMAIL || '';

  const msg = {
    to: toList, // Change to your recipient
    from: fromEmail, // Change to your verified sender
    subject: subject,
    text: text,
    html: html || '<strong>MCPden denemeler sonucu gönderilen mail</strong>',
  }
  
  try {
    await sgMail.sendMultiple(msg);
  } catch (error) {
    console.error('Error sending email batch:', error);
    throw error; // Re-throw error so it can be handled by the calling function
  }
}
