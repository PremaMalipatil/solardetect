export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface VerificationResult {
  solarInstalled: boolean;
  confidence: number;
  roofType: 'Flat' | 'Sloped' | 'Other' | 'Unknown';
  boundingBox: BoundingBox | null;
  reasoning: string;
  timestamp: string;
}

export interface BatchItem {
  id: string;
  lat: number;
  lng: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  imageUrl: string;
  result?: VerificationResult;
}

export type NavItem = 'dashboard' | 'single' | 'batch' | 'docs';