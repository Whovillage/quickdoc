export const generatePrompt = (keywords: string) => {
  return `You will be provided keywords or phrases from a doctors appointment. 
  You will have to compose a complete summary of the appointment using ALL of the provided keywords. 
  Use present tense for the patient's symptoms and evaluation. 
  Do not start with "Today, ..."
  Use pronouns and "the patient" to refer to the patient.
  Group and reorder keywords where they belong together, for example different drugs the patient is taking or different symptoms.
  Reword the keywords when necessary for better grammatical style and correctness.
  
  Keywords: ${keywords}`;
};
