export interface ScientificPublication {
  id: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
  authors: string[];
  abstract: string;
  externalUrl?: string;
}

export interface BiologicalMechanism {
  id: string;
  targetReceptor: string;
  pathwayName: string;
  cellularEffects: string[];
  downstreamOutcomes: string[];
  diagramUrl?: string;
}

export interface ScienceArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "mechanism" | "synthesis" | "clinical-review" | "stability";
  publishedAt: string;
  readTimeMinutes: number;
  author: {
    name: string;
    credentials: string;
    avatarUrl?: string;
  };
  summary: string;
  content: string;
  tags: string[];
  relatedProducts: string[];
  publications: ScientificPublication[];
}
