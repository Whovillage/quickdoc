import TranslationService from "../TranslationService";
import AppConfig from "../AppConfig";
import GenerationService from "../GenerationService";

export default defineEventHandler(async (event) => {
  const keywords = await readBody(event);
  console.log(keywords);

  const translator: TranslationService = AppConfig.translationService;
  const generator: GenerationService = AppConfig.generationService;
  try {
    const translation = await translator.translate(keywords);
    console.log(translation);
    const summary = await generator.generate(translation);
    console.log(summary);
    return summary;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to translate keywords",
    });
  }
});
