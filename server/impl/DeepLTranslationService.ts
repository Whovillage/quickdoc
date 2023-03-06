import TranslationService from "../service/TranslationService";

interface DeepLResponse {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
}

export default class DeepLTranslationServiceImpl implements TranslationService {
  translateKeywords = async (keywords: string[]) => {
    const keywordString = keywords.join("; ");

    const errorMsg: string = "Failed to translate keywords";
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response: Response = await fetch(
        "https://api-free.deepl.com/v2/translate",
        {
          method: "POST",
          headers: {
            Authorization: useRuntimeConfig().deepLApiKey,
          },
          body: new URLSearchParams({
            text: keywordString,
            target_lang: "EN-US",
            source_lang: "ET",
          }),
          signal,
        }
      );

      if (!response.ok) {
        let err = await response.json();
        console.log(err);
        throw new Error(errorMsg);
      }

      const translated: DeepLResponse = await response.json();
      return translated.translations[0].text;
    } catch (error) {
      console.log(error);
      throw new Error(errorMsg);
    }
  };

  translateSummary = async (
    summary: string,
    source_lang: string = "EN",
    target_lang: string = "FI"
  ) => {
    const errorMsg: string = "Failed to translate summary";
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response: Response = await fetch(
        "https://api-free.deepl.com/v2/translate",
        {
          method: "POST",
          headers: {
            Authorization: useRuntimeConfig().deepLApiKey,
          },
          body: new URLSearchParams({
            text: summary,
            target_lang,
            source_lang,
          }),
          signal,
        }
      );

      if (!response.ok) {
        let err = await response.json();
        console.log(err);
        throw new Error(errorMsg);
      }

      const translated: DeepLResponse = await response.json();
      return translated.translations[0].text;
    } catch (error) {
      console.log(error);
      throw new Error(errorMsg);
    }
  };
}
