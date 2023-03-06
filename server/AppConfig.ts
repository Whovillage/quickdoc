import DeepLTranslationService from "./impl/DeepLTranslationService";
import OpenAIGenerationService from "./impl/OpenAIGenerationService";
import { createClient } from "@supabase/supabase-js";

export default {
  translationService: new DeepLTranslationService(),
  generationService: new OpenAIGenerationService(),
  db: createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
  ),
};
