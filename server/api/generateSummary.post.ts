import TranslationService from "../service/TranslationService";
import AppConfig from "../AppConfig";
import GenerationService from "../service/GenerationService";
import disclaimers from "../textAssets/disclaimers";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  console.log("Generating summary");
  const errorMsg = "Failed to generate summary";
  const { keywords, useDisclaimers, inputLanguage, outputLanguage, username } =
    await readBody(event);

  if (username !== "nobetohter") {
    throw createError({
      statusCode: 403,
      message: errorMsg,
    });
  }

  const translator: TranslationService = AppConfig.translationService;
  const generator: GenerationService = AppConfig.generationService;
  const db = AppConfig.db;

  try {
    const translation = await translator.translateKeywords(keywords);
    console.log("DeepL:", translation);
    const englishSummary = await generator.generate(translation);
    console.log(englishSummary);
    const finnishSummary = await translator.translateSummary(englishSummary);
    console.log(finnishSummary);
    let estonianSummary = await translator.translateSummary(
      finnishSummary,
      "FI",
      "ET"
    );

    const id = crypto.randomBytes(16).toString("hex");

    console.log("Võtmesõnad: ", keywords.join("; "));

    const { error } = await db.from("translations").insert([
      {
        string_id: id,
        keywords: keywords.join(";"),
        translation: translation,
        english_summary: englishSummary,
        finnish_summary: finnishSummary,
        estonian_summary: estonianSummary,
      },
    ]);

    if (error) {
      console.log("Database error", error);
      throw createError({
        statusCode: 500,
        message: errorMsg,
      });
    }

    if (useDisclaimers) estonianSummary += `\n${disclaimers.return}`;
    return { id: id, text: estonianSummary };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: errorMsg,
    });
  }
});
