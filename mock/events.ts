export interface CityEvent {
  id: number;
  type: string;
  title: string;
  location: string;
  timestamp: Date;
  severity: string;
  summary: string;
  reporter: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  coordinates: { x: number; y: number };
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  image: string | null;
  tags: string[];
  customEmoji: string;
}

export const mockEvents: CityEvent[] = [
  // ... Copy the full mockEvents array from dashboard.tsx here ...
] 