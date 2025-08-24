export interface Note {
  id: string;
  title: string;
  isPinned?: boolean;
  content: string | null;
  color: string | null;
  imagesIds: string[];
  images: File[];
  created_at: Date;
  updated_at: Date;
  user: string;
}
