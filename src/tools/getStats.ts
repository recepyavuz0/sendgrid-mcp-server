import sgClient from "@sendgrid/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export async function getStats(start_date: string, end_date: string, aggregated_by: string = "day") {
    sgClient.setApiKey(process.env.SENDGRID_API_KEY || '');

    const request = {
        method: "GET",
        url: `/v3/stats?start_date=${start_date}&end_date=${end_date}&aggregated_by=${aggregated_by}`,
    }
  
  console.log(request);

  try {
    const [response, body] = await sgClient.request(request as any);
    return body;
  } catch (error) {
    console.error('Error sending stats get stats:', error);
    throw error; // Re-throw error so it can be handled by the calling function
  }
}
