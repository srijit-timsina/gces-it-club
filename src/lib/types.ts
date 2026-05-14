// ============================================
// Type definitions for all Google Sheets data
// ============================================

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
  register_link: string;
  status: "upcoming" | "past" | "ongoing";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  year: string;
  branch: string;
  bio: string;
  image_url: string;
  github: string;
  linkedin: string;
  email: string;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  link: string;
  description: string;
  tags: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  active: string | boolean;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  order: number;
}

export interface FormEntry {
  id: string;
  form_name: string;
  form_url: string;
  description: string;
  active: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  year: string;
  branch: string;
  bio: string;
  image_url: string;
  github: string;
  linkedin: string;
  website: string;
  email: string;
  order: number;
}
