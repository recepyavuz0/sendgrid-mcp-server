import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { sendEmail } from "./tools/sendEmail.js";
import { sendEmailWithTemplate } from "./tools/sendEmailWithTemplate.js";

// Create server instance
const server = new McpServer({
  name: "sendgrid-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});


// e.g "ali.deneme@gmail.com adresine toplantı hatırlatması gönder: 'Yarın 14:00’te görüşürüz.'"
// e.g "ali.deneme@gmail.com adresine toplantı hatırlatması mailini html formatında gönder: 'Yarın 14:00’te görüşürüz.'"

server.registerTool(
  'sendEmail', 
  {
  title: 'Send Email',
  description: 'send an email to customer',
  inputSchema: {
    to: z.string().describe('The email address of the recipient'),
    subject: z.string().describe('The subject of the email'),
    text: z.string().describe('The body of the email'),
    html: z.string().optional().describe('The HTML body of the email (optional)')
  }},
  async ({to, subject, text, html}) => {
    console.log(to, subject, text, html);
    await sendEmail(to, subject, text, html);
    return {
    content: [{
      type: "text",
      text: "Email sent successfully to " + to
    }]
  };
},
);

// e.g "ali.deneme@gmail.com adresine şifre sıfırlama şablonu ile mail gönder: Link: https://example.com/reset-password?token=123456"
// e.g "ali.deneme@gmail.com adresine d-11111111111111 template idsini kullanarak mail gönder. detay olarak name, company, date, bilgisi gönder"
server.registerTool(
  'sendEmailWithTemplate',
  {
    title: 'Send Email with Template',
    description: 'Send an email using a pre-defined dynamic template',
    inputSchema: {
      to: z.string().describe('Recipient email address'),
      subject: z.string().describe('The subject of the email'),
      templateId: z.string().describe('The ID of the SendGrid template'),
      dynamicData: z.record(z.any()).describe('Dynamic data object with key-value pairs to populate the template (e.g., {name: "John", price: 299, isActive: true})')
    }
  },
  async ({ to, subject, templateId, dynamicData }) => {
    await sendEmailWithTemplate(to, subject, templateId, dynamicData);
    return {
      content: [{ 
        type: "text", 
        text: `Template email sent to ${to}` 
      }]
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server is running...");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});