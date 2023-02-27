import DeepLTranslationService from "./impl/DeepLTranslationService";
import OpenAIGenerationService from "./impl/OpenAIGenerationService";

export default {
  translationService: new DeepLTranslationService(),
  generationService: new OpenAIGenerationService(),
};
