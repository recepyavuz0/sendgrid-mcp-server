import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function scheduleEmail(to: string, subject: string, text: string, send_at: number, html?: string) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const fromEmail = process.env.FROM_EMAIL || '';

  const msg = {
    to: to,
    from: fromEmail,
    subject: subject,
    text: text,
    html: html || '<strong>MCPden denemeler sonucu gönderilen mail</strong>',
    send_at: send_at,
    mail_settings: {
      sandboxMode: {
        enable: false,
      },
    },
  }
  
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email scheduled:', error);
    throw error;
  }
}
