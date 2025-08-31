import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function sendEmailWithTemplate(to: string, subject: string, templateId: string, dynamicTemplateData: object) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  const fromEmail = process.env.FROM_EMAIL || '';

  const msg = {
    to: to, // Change to your recipient
    from: fromEmail, // Change to your verified sender
    subject: subject,
    templateId: templateId,
    dynamicTemplateData: dynamicTemplateData,
  }
  
  console.log(msg);

  try {
    await sgMail.send(msg);
    console.log('Email sent with template successfully');
  } catch (error) {
    console.error('Error sending email with template:', error);
    throw error; // Re-throw error so it can be handled by the calling function
  }
}
