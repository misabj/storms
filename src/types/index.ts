export type ProjectCategory = "APARTMENT" | "COMMERCIAL" | "LUXURY";
export type ProjectStatus = "DRAFT" | "ACTIVE" | "COMPLETED";
export type ProjectPhase = "DESIGN" | "CONSTRUCTION" | "COMPLETED";
export type UnitStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type TeamDepartment = "DIRECTORS" | "ARCHITECTS" | "CONSTRUCTION" | "ADMINISTRATION";

export interface ProjectImage {
  id: number;
  imagePath: string;
  altText: string;
  type: "GALLERY" | "RENDER" | "EXTERIOR" | "INTERIOR" | "FLOOR_PLAN" | "OTHER";
  sortOrder: number;
}

export interface Unit {
  id: number;
  name: string;
  unitNumber: string;
  floor: string;
  rooms: number | null;
  area: number;
  orientation: string;
  price: number | null;
  pricePerSquareMeter?: number | null;
  showPrice: boolean;
  status: UnitStatus;
  description?: string;
  image?: string;
  floorPlanImage?: string;
  roomAreas?: UnitRoom[];
}

export interface UnitRoom {
  id: number;
  name: string;
  area: number;
}

export interface FloorPlan {
  id: number;
  title: string;
  image: string;
  description?: string;
  sortOrder: number;
}

export interface Project {
  id: number;
  category: ProjectCategory;
  status: ProjectStatus;
  phase?: ProjectPhase;
  title: string;
  subtitle: string;
  slug: string;
  shortDescription: string;
  description: string;
  address: string;
  city: string;
  locationDescription: string;
  heroImage: string;
  mapAddress: string;
  latitude?: number | null;
  longitude?: number | null;
  featured: boolean;
  showInNavigation: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  titleEn?: string;
  subtitleEn?: string;
  shortDescriptionEn?: string;
  descriptionEn?: string;
  locationDescriptionEn?: string;
  seoTitleEn?: string;
  seoDescriptionEn?: string;
  images: ProjectImage[];
  units: Unit[];
  floorPlans: FloorPlan[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department?: TeamDepartment;
  photo: string;
  description?: string;
  sortOrder: number;
  active: boolean;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  contactHeading: string;
  contactText: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  footerText: string;
}

export type InquiryCategory = "APARTMENT" | "COMMERCIAL" | "LUXURY";
export type InquiryStatus = "NEW" | "READ" | "ARCHIVED";

export interface Inquiry {
  id: number;
  category: InquiryCategory;
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: "sr" | "en";
  sourcePath: string;
  status: InquiryStatus;
  createdAt: Date | string;
}
