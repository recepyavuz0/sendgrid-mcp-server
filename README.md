# SendGrid MCP Server

🚀 **Model Context Protocol (MCP) server with SendGrid API integration**

This project is an MCP server that enables AI assistants (Claude, ChatGPT, etc.) to send emails, manage templates, and track statistics using the SendGrid's API v3.

## 🌟 Features

### 📧 Email Operations
- **Single Email Sending**: Send emails in plain text or HTML format
- **Batch Email Sending**: Send emails to multiple recipients simultaneously
- **Template-based Emails**: Send dynamic emails using pre-built templates
- **Scheduled Emails**: Schedule emails to be sent at a future date and time

### 📋 Template Management
- **Template Listing**: View existing email templates
- **Template Creation**: Create new dynamic email templates

### 📊 Statistics and Reporting
- **Email Statistics**: View email statistics for specific date ranges
- **Detailed Reports**: Get daily, weekly, or monthly reports

## 🛠️ Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/recepyavuz0/sendgrid-mcp-server.git
cd sendgrid-mcp-server
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Environment Variables
Create a `.env` file in the project root directory:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_verified_sender_email@domain.com
```

**Important Notes:**
- `SENDGRID_API_KEY`: API key obtained from your SendGrid account
- `FROM_EMAIL`: Verified sender email address in SendGrid

#### 4. Build the Project
```bash
npm run build
```

## 🔧 Usage

### Standalone Execution
```bash
npm start
```

### Usage with MCP Client
The MCP server works over stdin/stdout. You can use it with various clients:

## 🎯 Client Integrations

### 🖱️ Usage with Cursor IDE

To use the MCP server in Cursor:

1. Go to **Cursor Settings** > **Extensions** > **MCP** section
2. Add a new MCP server:
```json
{
  "sendgrid-api-mcp-server": {
    "command": "node",
    "args": ["sendgrid-api-mcp-server"],
    "env": {
      "SENDGRID_API_KEY": "your_api_key",
      "FROM_EMAIL": "your_email@domain.com"
    }
  }
}
```

3. Restart Cursor
4. Now you can send emails in Chat:

**Example Usage:**
```
"Send a project meeting reminder to john@example.com"
"Send an HTML welcome message to user@test.com"
```

### 🤖 Usage with Claude Desktop

For usage in Claude Desktop application:

1. Edit your Claude configuration file (`~/.claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "sendgrid-api-mcp-server": {
      "command": "node",
      "args": ["sendgrid-api-mcp-server"],
      "env": {
        "SENDGRID_API_KEY": "your_api_key",
        "FROM_EMAIL": "your_email@domain.com"
      }
    }
  }
}
```

2. Restart Claude Desktop
3. Give email commands directly in chat

### 🔗 Other MCP Clients

This MCP server is compatible with the following clients since it uses the standard MCP protocol:

- **Zed Editor**
- **VS Code MCP Extension**
- **Continue.dev**
- **Custom MCP clients**

Similar configuration structure is used for each client.

## 📚 Available Tools

### 1. `sendEmail` - Send Email
Basic email sending functionality.

**Parameters:**
- `to`: Recipient email address
- `subject`: Email subject
- `text`: Email text
- `html`: HTML format (optional)

**Example Usage:**
```
"Send a meeting reminder to ali@example.com: 'We'll meet tomorrow at 2:00 PM.'"
```

### 2. `sendEmailWithTemplate` - Template-based Email
Send dynamic emails using pre-built templates.

**Parameters:**
- `to`: Recipient email address
- `subject`: Email subject
- `templateId`: SendGrid template ID
- `dynamicData`: Template variables

**Example Usage:**
```
"Send email to user@test.com using template d-123456789 with data: {name: 'John', company: 'ABC Corp'}"
```

### 3. `sendBatchEmails` - Batch Email
Send emails to multiple recipients simultaneously.

**Parameters:**
- `toList`: List of recipient email addresses
- `subject`: Email subject
- `text`: Email text
- `html`: HTML format (optional)

**Example Usage:**
```
"Send new feature announcement to john@test.com, jane@test.com, bob@test.com"
```

### 4. `listTemplates` - List Templates
View existing email templates.

**Example Usage:**
```
"List existing email templates"
```

### 5. `getStats` - Email Statistics
Get email statistics for a specific date range.

**Parameters:**
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `aggregated_by`: Grouping (day/week/month)

**Example Usage:**
```
"Show email statistics for January 2024"
```

### 6. `scheduleEmail` - Scheduled Email
Schedule an email to be sent at a future date.

**Parameters:**
- `to`: Recipient email address
- `subject`: Email subject
- `text`: Email text
- `send_at`: Unix timestamp (seconds)
- `html`: HTML format (optional)

**Example Usage:**
```
"Schedule a meeting reminder to user@test.com for tomorrow at 10:00 AM"
```

### 7. `createTemplate` - Create Template
Create a new dynamic email template.

**Parameters:**
- `name`: Template name
- `subject`: Email subject template
- `html_body`: HTML content (with {{variable}} format)
- `plain_body`: Plain text content

**Example Usage:**
```
"Create a welcome-email template with {{name}} and {{company}} variables"
```

## 💡 Usage Examples

### Simple Email Sending
```
AI: "Send an invoice reminder to customer@company.com"
```

### Dynamic Email with Template
```
AI: "Send monthly newsletter to all customers using template d-123456789"
```

### Batch Email Campaign
```
AI: "Send new policy announcement to team@company.com, sales@company.com, support@company.com"
```

### Statistics Tracking
```
AI: "Generate this month's email performance report"
```

### Scheduled Campaign
```
AI: "Schedule weekly meeting reminder to entire team for Monday 9:00 AM"
```
