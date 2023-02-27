export default interface generationService {
  generate: (keywords: string) => Promise<string>;
}
