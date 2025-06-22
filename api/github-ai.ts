// import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
// import { AzureKeyCredential } from '@azure/core-auth';

// // GitHub AI configuration
// const ENDPOINT = 'https://models.github.ai/inference';
// const MODEL = 'gpt-4o-mini';

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];
const GITHUB_TOKEN = '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'//process.env.GITHUB_TOKEN;

const ENDPOINT = "https://models.github.ai/inference";
const MODEL = "openai/gpt-4.1";

if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN environment variable is required');
}

// Create the client
// const client = new ModelClient(ENDPOINT, new AzureKeyCredential(GITHUB_TOKEN));

export interface GitHubAIOptions {
  temperature?: number;
  top_p?: number;
}

/**
 * Ask GitHub AI a question and get a response
 * @param prompt - The prompt to send to the AI
 * @param options - Optional parameters for temperature and top_p
 * @returns The AI response message content
 */
// export async function askGitHubAI(
//   prompt: string,
//   options: GitHubAIOptions = {}
// ): Promise<string> {
//   const { temperature = 0.7, top_p = 0.95 } = options;

//   if (!prompt || !MODEL || !ENDPOINT || !GITHUB_TOKEN) {
//     throw new Error(`No response content received from GitHub AI ${prompt} ${MODEL} ${ENDPOINT} ${GITHUB_TOKEN}`);
//   }
//   try {
//     const response = await client.path("/chat/completions").post({
//       body: {
//         messages: [
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         model: MODEL,
//         temperature,
//         top_p,
//         max_tokens: 1000,
//       },
//     });

//     if (isUnexpected(response)) {
//       throw new Error(`GitHub AI API error: ${response.status} - ${response.body?.error?.message || 'Unknown error'}`);
//     }

//     const choice = response.body.choices?.[0];
//     if (!choice?.message?.content) {
//       throw new Error('No response content received from GitHub AI');
//     }

//     return choice.message.content;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Failed to get response from GitHub AI: ${error.message}`);
//     }
//     throw new Error('Failed to get response from GitHub AI: Unknown error');
//   }
// }

export async function askGitHubAI() {

  const client = ModelClient(
    ENDPOINT,
    new AzureKeyCredential(GITHUB_TOKEN),
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "What is the capital of France?" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: MODEL
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

askGitHubAI().catch((err) => {
  console.error("The sample encountered an error:", err);
});