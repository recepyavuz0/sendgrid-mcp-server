#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { sendEmail } from "./tools/sendEmail.js";
import { sendEmailWithTemplate } from "./tools/sendEmailWithTemplate.js";
import { sendBatchEmails } from "./tools/sendBatchEmails.js";
import { listTemplates } from "./tools/listTemplates.js";
import { getStats } from "./tools/getStats.js";
import { scheduleEmail } from "./tools/scheduleEmail.js";
import { createTemplate } from "./tools/createTemplate.js";

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

// e.g "["example.ex@gmail.com","example2.ex@gmail.com"] adresine toplantı hatırlatması gönder: 'Yarın 14:00’te görüşürüz.'"
// e.g "example1234@gmail.com, example.ex@gmail.com, denemehesap@gmail.com mail adreslerine güzel bir heml formatında "bizi tercih ettiğiniz için teşekkür ederiz" mesajı içeren mail gönder"
server.registerTool(
  'sendBatchEmails',
  {
    title: 'Send Batch Emails',
    description: 'Send the same email to multiple recipients at once',
    inputSchema: {
      toList: z.array(z.string()).describe('List of recipient emails (e.g., ["example.ex@gmail.com","example2.ex@gmail.com"])'),
      subject: z.string().describe('The subject of the email'),
      text: z.string().describe('The body of the email'),
      html: z.string().optional().describe('The HTML body of the email (optional)')
    }
  },
  async ({ toList, subject, text, html }) => {
    await sendBatchEmails(toList, subject, text, html);
    return {
      content: [{ 
        type: "text", 
        text: `Batch email sent to ${toList.length} recipients` 
      }]
    };
  }
);

// e.g "bana email template listesini gösterir misin?"
// e.g "denemehesap@gmail.com mail adresine event şablonunu kullanarak bir mail atar mısın? (önce templateList ile liste çekilir ardından template kullanılarak mail atılır)"
server.registerTool(
  'listTemplates',
  {
    title: 'List Email Templates',
    description: 'Fetches the list of available email templates'
  },
  async () => {
    const templates = await listTemplates();
    return {
      content: [{
        type: 'text',
        text: `Templates:\n${templates.map((t: any) => `- ${t.name} (${t.id})`).join('\n')}`
      }]
    };
  }
);

// e.g "2025 ağustos ayına ait mail raporlarını gösterir misin?"
server.registerTool(
  'getStats',
  {
    title: 'Get Email Stats',
    description: 'Get email stats and reports over a date range',
    inputSchema: {
      start_date: z.string().describe('Start date in YYYY-MM-DD format'),
      end_date: z.string().describe('End date in YYYY-MM-DD format'),
      aggregated_by: z.enum(['day', 'week', 'month']).optional().describe('Aggregated by day, week, or month')
    }
  },
  async ({ start_date, end_date, aggregated_by }) => {
    const stats = await getStats(start_date, end_date, aggregated_by);
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify(stats, null, 2) 
      }]
    };
  }
);

// e.g "1 eylül 2025 tarihine saat 01:10 saatine "Toplantı detayları ..." isimli bir mail planlar mısın?(planlanan  mail Activity sayfasında görünür)"
server.registerTool(
  'scheduleEmail',
  {
    title: 'Schedule Email',
    description: 'Schedule an email to be sent at a specific time',
    inputSchema: {
      to: z.string(),
      subject: z.string(),
      text: z.string(),
      html: z.string().optional(),
      send_at: z.number().describe('UNIX timestamp (seconds) for when to send')
    }
  },
  async ({ to, subject, text, html, send_at }) => {
    await scheduleEmail(to, subject, text, send_at, html );
    return {
      content: [{ 
        type: "text", 
        text: `Email scheduled for ${to} at ${new Date(send_at * 1000).toISOString()}` 
      }]
    };
  }
);

// e.g "price-plan-template isminde bir içeriğinde plan, price, features parametreleri olan html formatında güzel bir tasarımlı template oluşturur musun?" (oluşturulan template sendrid panelinde dynamic template sayfasında görünür)
server.registerTool(
  'createTemplate',
  {
    title: 'Create Email Template with Custom Fields',
    description: 'Create a new dynamic email template with fields like email and expire_date',
    inputSchema: {
      name: z.string().describe('The name of the template'),
      subject: z.string().describe('The subject of the template'),
      html_body: z.string().describe('HTML content with {{email}}, {{expire_date}}, etc.'),
      plain_body: z.string().describe('Plain content with {{email}}, {{expire_date}}, etc.')
    }
  },
  async ({ name, subject, html_body, plain_body }) => {
    const { templateId } = await createTemplate( name, subject, html_body, plain_body );
    return {
      content: [{ 
        type: "text", 
        text: `Template created with ID: ${templateId}` 
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