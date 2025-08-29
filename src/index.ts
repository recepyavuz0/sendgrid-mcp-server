import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { sendEmail } from "./tools/email.js";

// Create server instance
const server = new McpServer({
  name: "sendgrid-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

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
  }
},
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