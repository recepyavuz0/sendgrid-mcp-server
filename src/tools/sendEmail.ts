import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const fromEmail = process.env.FROM_EMAIL || '';

  const msg = {
    to: to, 
    from: fromEmail, 
    subject: subject,
    text: text,
    html: html || '<strong>MCPden denemeler sonucu gönderilen mail</strong>',
  }
  
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
