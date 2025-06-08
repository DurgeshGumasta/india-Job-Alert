import axios from "axios";
import pdfParse from "pdf-parse";
import { ActionOptions } from "gadget-server";

interface JobPostingData {
  postName?: string;
  advertisementNumber?: string;
  applicationStartDate?: string;
  applicationEndDate?: string;
  feePaymentLastDate?: string;
  feeGeneral?: number;
  feeSc?: number;
  feeSt?: number;
  feeEws?: number;
  vacancyTotal?: number;
  educationalQualification?: string;
}

interface ExtractionResult {
  data: JobPostingData;
  isComplete: boolean;
}

const extractWithRegex = (text: string): ExtractionResult => {
  const data: JobPostingData = {};
  
  // Extract post name
  const postNameMatch = text.match(/(?:Name of the Post|Post Name)\s*:?\s*([^\n\r]+)/i);
  if (postNameMatch) {
    data.postName = postNameMatch[1].trim();
  }

  // Extract advertisement number
  const advNumMatch = text.match(/(?:Advertisement No\.|CEN No\.|Notification No\.)\s*:?\s*([^\n\r]+)/i);
  if (advNumMatch) {
    data.advertisementNumber = advNumMatch[1].trim();
  }

  // Extract application start date
  const startDateMatch = text.match(/(?:Opening date of on-line application|Application starts?)\s*:?\s*(\d{2}[-\/]\d{2}[-\/]\d{4})/i);
  if (startDateMatch) {
    const dateStr = startDateMatch[1].replace(/[-\/]/g, '-');
    data.applicationStartDate = new Date(dateStr).toISOString();
  }

  // Extract application end date
  const endDateMatch = text.match(/(?:Closing date of on-line application|Last date for application|Application ends?)\s*:?\s*(\d{2}[-\/]\d{2}[-\/]\d{4})/i);
  if (endDateMatch) {
    const dateStr = endDateMatch[1].replace(/[-\/]/g, '-');
    data.applicationEndDate = new Date(dateStr).toISOString();
  }

  // Extract fee payment last date
  const feePaymentMatch = text.match(/(?:Last date for payment of fee|Fee payment till)\s*:?\s*(\d{2}[-\/]\d{2}[-\/]\d{4})/i);
  if (feePaymentMatch) {
    const dateStr = feePaymentMatch[1].replace(/[-\/]/g, '-');
    data.feePaymentLastDate = new Date(dateStr).toISOString();
  }

  // Extract fees
  const generalFeeMatch = text.match(/(?:General|UR)\s*(?:category)?\s*:?\s*(?:Rs\.?)?\s*(\d+)/i);
  if (generalFeeMatch) {
    data.feeGeneral = parseFloat(generalFeeMatch[1]);
  }

  const scFeeMatch = text.match(/SC\s*(?:category)?\s*:?\s*(?:Rs\.?)?\s*(\d+)/i);
  if (scFeeMatch) {
    data.feeSc = parseFloat(scFeeMatch[1]);
  }

  const stFeeMatch = text.match(/ST\s*(?:category)?\s*:?\s*(?:Rs\.?)?\s*(\d+)/i);
  if (stFeeMatch) {
    data.feeSt = parseFloat(stFeeMatch[1]);
  }

  const ewsFeeMatch = text.match(/EWS\s*(?:category)?\s*:?\s*(?:Rs\.?)?\s*(\d+)/i);
  if (ewsFeeMatch) {
    data.feeEws = parseFloat(ewsFeeMatch[1]);
  }

  // Extract total vacancy
  const vacancyMatch = text.match(/(?:Total\s*)?(?:Vacancy|Vacancies)\s*:?\s*(\d+)/i);
  if (vacancyMatch) {
    data.vacancyTotal = parseInt(vacancyMatch[1]);
  }

  // Extract educational qualification
  const qualificationMatch = text.match(/(?:Educational Qualification|Eligibility)\s*:?\s*([^\n\r]{20,200})/i);
  if (qualificationMatch) {
    data.educationalQualification = qualificationMatch[1].trim();
  }

  // Check if extraction is complete (at least 6 out of 11 fields should be extracted)
  const extractedFields = Object.values(data).filter(value => value !== undefined).length;
  const isComplete = extractedFields >= 6;

  return { data, isComplete };
};

const fallbackWithGPT = async (text: string, openai: any, logger: any): Promise<JobPostingData> => {
  const prompt = `
Extract job posting information from the following RRB (Railway Recruitment Board) notification text. 
Return the information in JSON format with these exact field names:

{
  "postName": "string - name of the post/position",
  "advertisementNumber": "string - advertisement/CEN number", 
  "applicationStartDate": "ISO date string - when applications open",
  "applicationEndDate": "ISO date string - when applications close",
  "feePaymentLastDate": "ISO date string - last date for fee payment",
  "feeGeneral": "number - application fee for General category",
  "feeSc": "number - application fee for SC category", 
  "feeSt": "number - application fee for ST category",
  "feeEws": "number - application fee for EWS category",
  "vacancyTotal": "number - total number of vacancies",
  "educationalQualification": "string - educational requirements"
}

Only include fields where you can find clear information. Use null for missing information.
Convert dates to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).

Text to analyze:
${text}
`;

  logger.info("Calling OpenAI GPT-4 for fallback extraction");

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert at extracting structured data from Indian government job notifications."
      },
      {
        role: "user", 
        content: prompt
      }
    ],
    temperature: 0.1,
    max_tokens: 1500
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  // Parse JSON response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from OpenAI response");
  }

  return JSON.parse(jsonMatch[0]);
};

export const run: ActionRun = async ({ params, logger, connections }) => {
  const { pdfUrl } = params;
  
  if (!pdfUrl) {
    throw new Error("PDF URL is required");
  }

  logger.info(`Starting PDF parsing for URL: ${pdfUrl}`);

  // Download and parse PDF
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });

  const dataBuffer = Buffer.from(response.data);
  const pdfData = await pdfParse(dataBuffer);

  logger.info(`Successfully extracted ${pdfData.text.length} characters from PDF`);

  // Try regex extraction first
  logger.info("Attempting regex extraction");
  const regexResult = extractWithRegex(pdfData.text);
  
  logger.info(`Regex extraction completed. Fields extracted: ${Object.keys(regexResult.data).length}, Complete: ${regexResult.isComplete}`);

  let finalData = regexResult.data;

  // Fallback to GPT if regex extraction is incomplete
  if (!regexResult.isComplete && connections.openai) {
    logger.info("Regex extraction incomplete, falling back to GPT-4");
    
    const gptData = await fallbackWithGPT(pdfData.text, connections.openai, logger);
    
    // Merge GPT results with regex results, preferring non-null GPT values
    finalData = { ...regexResult.data };
    Object.entries(gptData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        finalData[key as keyof JobPostingData] = value;
      }
    });
    
    logger.info(`GPT extraction completed. Combined fields: ${Object.keys(finalData).length}`);
  } else if (!regexResult.isComplete) {
    logger.warn("Regex extraction incomplete and no OpenAI connection available");
  } else {
    logger.info("Regex extraction was sufficient, skipping GPT fallback");
  }

  logger.info("PDF parsing completed successfully", { extractedData: finalData });

  return {
    success: true,
    extractedData: finalData,
    extractionMethod: regexResult.isComplete ? "regex" : "hybrid"
  };
};

export const params = {
  pdfUrl: {
    type: "string"
  }
};

export const options: ActionOptions = {
  timeoutMS: 300000 // 5 minutes timeout for PDF processing and GPT calls
};
