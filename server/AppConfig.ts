import DeepLTranslationService from "./DeepLTranslationService";
import OpenAIGenerationService from "./OpenAIGenerationService";

export default {
  translationService: new DeepLTranslationService(),
  generationService: new OpenAIGenerationService(),
};
