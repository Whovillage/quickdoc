export const generatePrompt = (keywords: string) => {
  return `You will be provided keywords or phrases from a doctors appointment. 
  You will have to compose a complete summary of the appointment using ALL of the provided keywords. 
  Use present tense for the patient's symptoms and evaluation. 
  Use pronouns and "the patient" to refer to the patient.
  Group and reorder keywords where they belong together, for example different drugs the patient is taking or different symptoms.
  Reword the keywords when necessary for better grammatical style and correctness.
  Do not add any additional information to the summary. 
  Only use information provided in the keywords.
  Do not talk about further treatment or future plans.
  Do not use the word "reported" or "report".
  
  Keywords: ${keywords}`;
};
