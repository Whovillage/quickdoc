import { generatePrompt } from "~~/utils/generatePrompt";
import GenerationService from "../service/GenerationService";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: useRuntimeConfig().openAIApiKey,
});
const openai = new OpenAIApi(configuration);

export default class OpenAIGenerationService implements GenerationService {
  async generate(keywords: string): Promise<string> {
    const errorMsg = "No completion generated.";
    const propmt = generatePrompt(keywords);

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: propmt,
        temperature: 0.2,
        max_tokens: 400,
        frequency_penalty: 1.0,
        presence_penalty: 0,
      });
      let summary = completion.data.choices[0].text;
      if (summary) {
        return summary.trim();
      }
      throw new Error(errorMsg);
    } catch (error) {
      console.log(error);
      throw new Error(errorMsg);
    }
  }
}
