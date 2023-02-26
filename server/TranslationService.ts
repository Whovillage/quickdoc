export default interface TranslationService {
  translateKeywords: (keywords: string) => Promise<string>;
  translateSummary: (
    summary: string,
    source_lang?: string,
    target_lang?: string
  ) => Promise<string>;
}
