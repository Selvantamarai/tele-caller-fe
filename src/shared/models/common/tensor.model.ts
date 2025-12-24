export interface ObjectSuggestions {
  stability?: string;
  multiObject?: string;
  background?: string;
  glare?: string;
  corners?: string;
  distance?: string;
  orientation?: string;
  tilt?: string;
  verticalCentering?: string;
  horizontalCentering?: string;
  size?: string;
  cropping?: string;
  occlusion?: string;

  // 👇 Important fix (allows dynamic indexing)
  [key: string]: string | undefined;
}



export interface ObjectItem {
  confidence: number;
  tagId: string;
  tagName: string;
  tagColor?: string;
  type: string;
  originalHeight: number;
  originalWidth: number;
  points: number[][];
  suggestions?: ObjectSuggestions;  // << ADDED
}

export interface FrameQuality {
  blurScore: number;
  brightness: number;
  lightingSuggestion: string;
}

export interface FrameResponse {
  objects: ObjectItem[];
  frameQuality: FrameQuality;
}
