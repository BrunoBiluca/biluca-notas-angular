export interface Note {
  id: string;
  title: string;
  content: string | null;
  color: string | null;
  created_at: Date;
  updated_at: Date;
  user: string;
}
