import sgClient from "@sendgrid/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function listTemplates() {
    sgClient.setApiKey(process.env.SENDGRID_API_KEY || "");

    const request = {
      method: "GET",
      url: "/v3/templates?generations=dynamic",
    };

    console.log(request);

    try {
      const [response, body] = await sgClient.request(request as any);
      console.log("Email list templates successfully");
      return body.templates;
    } catch (error) {
      console.error("Error sending email list templates:", error);
      throw error; // Re-throw error so it can be handled by the calling function
    }
}
