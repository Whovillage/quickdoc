import TranslationService from "../service/TranslationService";
import AppConfig from "../AppConfig";
import GenerationService from "../service/GenerationService";
import disclaimers from "../textAssets/disclaimers";
import crypto from "crypto";
import memory from "../persistence/memory";
import flushtoDB from "~~/utils/flushToDB";

export default defineEventHandler(async (event) => {
  console.log("Generating summary");
  const { keywords, useDisclaimers, inputLanguage, outputLanguage, username } =
    await readBody(event);

  if (username !== "nobetohter") {
    throw createError({
      statusCode: 403,
      message: "Failed to translate keywords",
    });
  }

  const translator: TranslationService = AppConfig.translationService;
  const generator: GenerationService = AppConfig.generationService;
  try {
    const translation = await translator.translateKeywords(keywords);
    console.log("DeepL:", translation);
    const englishSummary = await generator.generate(translation);
    console.log(englishSummary);
    const finnishSummary = await translator.translateSummary(englishSummary);
    console.log(finnishSummary);
    let finalSummary = await translator.translateSummary(
      finnishSummary,
      "FI",
      "ET"
    );

    const newEntry = {
      id: crypto.randomBytes(16).toString("hex"),
      keywords: keywords,
      translation: translation,
      englishSummary: englishSummary,
      finnishSummary: finnishSummary,
      finalSummary: finalSummary,
    };

    memory.translations.push(newEntry);
    flushtoDB(memory);

    if (useDisclaimers) finalSummary += `\n${disclaimers.return}`;
    return { id: newEntry.id, text: finalSummary };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to translate keywords",
    });
  }
});
