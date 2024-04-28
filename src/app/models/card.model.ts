export interface Card {
  id: string;
  name: string;
  supertype?: string;
  types?: string[];
  imageUrl?: string;
  count: number;
}
