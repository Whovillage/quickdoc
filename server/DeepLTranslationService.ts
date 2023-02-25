import TranslationService from "./TranslationService";

interface DeepLResponse {
  translations: {
    detected_source_language: string;
    text: string;
  }[];
}

export default class DeepLTranslationServiceImpl implements TranslationService {
  translate = async (keywords: string) => {
    keywords.trim();
    keywords = keywords.replace(/(\r|\n|\r)/gm, ", ");

    console.log(keywords);

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
            text: keywords,
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
}
