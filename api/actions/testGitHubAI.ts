import { askGitHubAI } from '../github-ai';

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  try {
    const testPrompt = 'What is the capital of France?';
    logger.info(`Testing GitHub AI with prompt: ${testPrompt}`);
    
    const response = await askGitHubAI(testPrompt);
    
    logger.info(`GitHub AI response received: ${JSON.stringify(response)}`);
    
    return {
      success: true,
      prompt: testPrompt,
      response: response
    };
  } catch (error) {
    logger.error(`Error testing GitHub AI: ${error}`);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
