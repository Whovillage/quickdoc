import TranslationService from "../TranslationService";
import AppConfig from "../AppConfig";
import GenerationService from "../GenerationService";

export default defineEventHandler(async (event) => {
  const keywords = await readBody(event);
  console.log(keywords);

  const translator: TranslationService = AppConfig.translationService;
  const generator: GenerationService = AppConfig.generationService;
  try {
    const translation = await translator.translateKeywords(keywords);
    console.log(translation);
    const englishSummary = await generator.generate(translation);
    console.log(englishSummary);
    const finnishSummary = await translator.translateSummary(englishSummary);
    console.log(finnishSummary);
    const finalSummary = await translator.translateSummary(
      finnishSummary,
      "FI",
      "ET"
    );
    return finalSummary;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to translate keywords",
    });
  }
});
