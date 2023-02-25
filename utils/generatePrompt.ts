export const generatePrompt = (keywords: string) => {
  return `You will be provided keywords or phrases from a doctors appointment. 
  You will have to compose a complete summary of the appointment using all of the provided keywords. 
  Use present tense for the patients symptoms and evaluation. 
  Group and reorder keywords where necessary. 
  Reword the keywords when necessary for better grammatical style and correctness.
  
  Keywords: ${keywords}`;
};
