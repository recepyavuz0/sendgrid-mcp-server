import sgClient from "@sendgrid/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function createTemplate(name: string, subject: string, html_body: string, plain_body: string) {
  sgClient.setApiKey(process.env.SENDGRID_API_KEY || "");

  try {
    const templateRequest = {
      method: "POST",
      url: "/v3/templates",
      body: {
        name: name,
        generation: "dynamic",
      },
    };

    // Create Dynamic Template
    const [templateResponse, templateBody] = await sgClient.request(
      templateRequest as any
    );
    const templateId = templateBody.id;

    // Create Template Version for Dynamic Template
    const versionRequest = {
      method: "POST",
      url: `/v3/templates/${templateId}/versions`,
      body: {
        active: 1,
        name: `${name} v1`,
        subject,
        html_content: html_body,
        plain_content: plain_body,
        editor: "code",
      },
    };

    const [versionResponse, versionBody] = await sgClient.request(
      versionRequest as any
    );


    return {
      templateId,
      versionId: versionBody.id,
    };
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
} 
