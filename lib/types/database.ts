// Types mirror supabase/schema.sql exactly.
// If you change the SQL schema, update these too (or generate via
// `npx supabase gen types typescript` once your project is linked).

export type ContentStatus = "draft" | "pending" | "published" | "rejected";

export type UserRole = "general_user" | "business_owner" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string | null;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  social_links: Record<string, string>;
  hours: Record<string, string>;
  cover_image_url: string | null;
  gallery: string[];
  verified: boolean;
  status: ContentStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export type PlaceType =
  | "heritage"
  | "landmark"
  | "palace"
  | "museum"
  | "resort"
  | "nature"
  | "hidden_gem";

export interface Place {
  id: string;
  name: string;
  slug: string;
  type: PlaceType;
  description: string | null;
  address: string | null;
  cover_image_url: string | null;
  gallery: string[];
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  submitted_by: string | null;
  title: string;
  slug: string;
  event_date: string; // ISO date
  event_time: string | null;
  location: string | null;
  organizer: string | null;
  description: string | null;
  ticket_url: string | null;
  cover_image_url: string | null;
  status: ContentStatus;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export type StoryCategory =
  | "heritage"
  | "people"
  | "business"
  | "food"
  | "travel"
  | "community"
  | "history";

export interface Story {
  id: string;
  author_id: string | null;
  title: string;
  slug: string;
  category: StoryCategory;
  cover_image_url: string | null;
  excerpt: string | null;
  body: string | null;
  published_at: string | null;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
}

export type PartnershipType = "business" | "sponsor" | "organization" | "community";

export interface Partnership {
  id: string;
  org_name: string;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  type: PartnershipType;
  message: string | null;
  status: "new" | "reviewed" | "closed";
  created_at: string;
}

// Minimal typed shape passed to @supabase/ssr's generic client.
// Extend this if you want full type-safe query builders.
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      businesses: { Row: Business; Insert: Partial<Business>; Update: Partial<Business> };
      places: { Row: Place; Insert: Partial<Place>; Update: Partial<Place> };
      events: { Row: Event; Insert: Partial<Event>; Update: Partial<Event> };
      stories: { Row: Story; Insert: Partial<Story>; Update: Partial<Story> };
      partnerships: { Row: Partnership; Insert: Partial<Partnership>; Update: Partial<Partnership> };
    };
  };
}
