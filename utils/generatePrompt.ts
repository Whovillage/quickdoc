export const generatePrompt = (keywords: string) => {
  return `You will be provided keywords or phrases from a doctors appointment. 
  You will have to compose a summary of the provided keywords and phrases. 
  Use present tense for the patient's symptoms and evaluation. 
  Alternate between pronouns and "the patient" to refer to the patient.
  Group and reorder keywords where they belong together, for example different drugs the patient is taking or different symptoms.
  Reword the keywords when necessary for better grammatical style and correctness.
  Do not add any keywords.
  Do not add any additional information.
  Do not add any symptoms.
  Do not talk about further treatment or future plans.
  Do not use the word "reported" or "report".
  
  Keywords: ${keywords}`;
};
