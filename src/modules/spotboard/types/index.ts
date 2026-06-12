export interface SpotboardPhoto {
  id: string;
  photo_id: string;
  user_id: string;
  location?: string;
  camera_make?: string;
  camera_model?: string;
  likes_count: number;
  created_at: string;
  url?: string;
  caption?: string;
}

export interface SpotboardRating {
  id: string;
  photo_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface PhotoUploadData {
  name: string;
  title: string;
  location: string;
  description: string;
  rating: number;
  comment?: string;
  file?: File | Blob;
}
