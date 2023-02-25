export default interface TranslationService {
  translate: (keywords: string) => Promise<string>;
}
