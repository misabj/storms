import type { Project } from "@/types";

export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const dictionary = {
  sr: {
    nav: { apartments: "Prodaja stanova", commercial: "Poslovni prostori", luxury: "Lux stanovi", completed: "Izvedeni projekti", about: "O nama", contact: "Kontakt", active: "Aktivni projekti" },
    home: { type: "Aktivan projekat", commercialType: "Poslovni prostor", luxuryType: "Lux rezidencija", view: "Pogledaj projekat", statement: "Prostor kao trajna vrednost", intro: "Ne gradimo samo kvadrate. Stvaramo promišljene prostore koji prirodno pripadaju gradu i ljudima koji u njima žive.", meet: "Upoznajte STORMS", projects: "Projekti", follow: "Budite u toku sa našom ponudom", find: "Pronađite prostor po svojoj meri.", apartments: "Stanovi", shops: "Lokali", luxury: "Lux" },
    common: { view: "Detaljnije", viewAll: "Pogledaj sve", portfolio: "Portfolio", information: "Informacije", location: "Lokacija", type: "Tip", status: "Status", city: "Grad", active: "Aktivan projekat", completed: "Izvedeno", gallery: "Galerija", plans: "Osnove", other: "Ostali projekti", previous: "Prethodni projekti", projectAbout: "O projektu", availableUnits: "Dostupne jedinice", priceOnRequest: "Cena na upit" },
    categories: {
      APARTMENT: { eyebrow: "Prodaja stanova", title: "Stanovanje sa karakterom.", intro: "Pažljivo odabrane lokacije, savremena arhitektura i funkcionalne osnove za život koji se menja sa vama.", featured: "Izdvojena lokacija" },
      COMMERCIAL: { eyebrow: "Poslovni prostori", title: "Prostor koji pokreće posao.", intro: "Fleksibilni, vidljivi i tehnički spremni prostori na lokacijama sa dugoročnom vrednošću.", featured: "Izdvojena lokacija" },
      LUXURY: { eyebrow: "Privatna kolekcija", title: "Rezidencije izvan očekivanog.", intro: "Retke adrese. Beskompromisni materijali. Privatnost oblikovana za život bez granica.", featured: "Signature rezidencija" },
    },
  },
  en: {
    nav: { apartments: "Apartments", commercial: "Commercial", luxury: "Luxury residences", completed: "Completed projects", about: "About", contact: "Contact", active: "Active projects" },
    home: { type: "Active project", commercialType: "Commercial space", luxuryType: "Luxury residence", view: "View project", statement: "Space as lasting value", intro: "We do not simply build square metres. We create considered places that belong naturally to the city and to the people who inhabit them.", meet: "Discover STORMS", projects: "Projects", follow: "Stay informed about our collection", find: "Find a place that feels entirely your own.", apartments: "Apartments", shops: "Commercial", luxury: "Luxury" },
    common: { view: "Discover", viewAll: "View all", portfolio: "Portfolio", information: "Information", location: "Location", type: "Type", status: "Status", city: "City", active: "Active project", completed: "Completed", gallery: "Gallery", plans: "Floor plans", other: "Other projects", previous: "Previous projects", projectAbout: "The project", availableUnits: "Available residences", priceOnRequest: "Price on request" },
    categories: {
      APARTMENT: { eyebrow: "Apartments for sale", title: "Homes with character.", intro: "Carefully selected locations, contemporary architecture and intelligent layouts designed to evolve with you.", featured: "Featured location" },
      COMMERCIAL: { eyebrow: "Commercial spaces", title: "Space that moves business forward.", intro: "Flexible, visible and technically prepared spaces in locations with enduring value.", featured: "Featured location" },
      LUXURY: { eyebrow: "The private collection", title: "Residences beyond expectation.", intro: "Rare addresses. Uncompromising materials. Privacy shaped for life without limits.", featured: "Signature residence" },
    },
  },
} as const;

const projectEn: Record<string, Partial<Project>> = {
  "dobracina-21": { title: "Dobračina 21", subtitle: "The contemporary rhythm of Dorćol", shortDescription: "Considered living in Belgrade's historic heart.", description: "Dobračina 21 brings together the calm of a private home and the energy of Dorćol. Precise proportions, natural materials and abundant daylight shape architecture made to endure.", locationDescription: "A few steps from the Danube, cultural institutions and the city's most vibrant streets." },
  "k-district-office": { title: "K District Office", subtitle: "A place for ideas", shortDescription: "Flexible commercial space designed for a new way of working.", description: "Open layouts, advanced infrastructure and a distinguished presence in the city's business core.", locationDescription: "Excellent connections to Belgrade's central business districts." },
  "skyline-penthouse": { title: "The Belgrade Penthouse", subtitle: "A private horizon", shortDescription: "An exceptional residence with uninterrupted views across the city and its rivers.", description: "Monumental yet intimate. A singular residence defined by tactile materials, discreet technology and a panorama that becomes part of daily life.", locationDescription: "Above the new riverside promenade, with expansive views towards the Sava and Danube." },
  "vracar-gardens": { title: "Vračar Gardens", subtitle: "Architecture for a quiet street", shortDescription: "A completed urban residence with private gardens.", description: "A contemporary home shaped in dialogue with the established character of Vračar.", locationDescription: "A residential neighbourhood moments from the Church of Saint Sava." },
  "vracar-park": { title:"Vračar Park",subtitle:"A home facing the garden",shortDescription:"A contemporary residence with a private garden in a quiet part of Vračar.",description:"Vračar Park brings natural materials and unexpected greenery into the heart of the city. Every layout balances privacy, daylight and open living space.",locationDescription:"A calm residential street moments from the Church of Saint Sava and Kalenić Market." },
  "riverside-residence": { title:"Riverside Residence",subtitle:"Light above the river",shortDescription:"Expansive city homes with panoramic views across the Sava.",description:"Riverside Residence combines clean lines, generous spans and deep terraces. Interiors follow the movement of daylight and a view that is never the same twice.",locationDescription:"Directly on the riverfront, with fast connections to the city centre and New Belgrade business district." },
  "gallery-27": { title:"Gallery 27",subtitle:"Space as exhibition",shortDescription:"A distinguished retail space in the historic centre.",description:"Gallery 27 is a bright, adaptable space with the clarity of a gallery, conceived for premium retail, showroom or cultural programmes.",locationDescription:"On the city's principal pedestrian street, moments from Kalemegdan." },
  "atrium-works": { title:"Atrium Works",subtitle:"A new culture of work",shortDescription:"A flexible business campus organised around a planted atrium.",description:"Atrium Works brings focus, collaboration and wellbeing together. Double-height shared spaces, greenery and modular offices create a new-generation workplace.",locationDescription:"At the heart of New Belgrade's business district with direct access to the city's main routes." },
  "aurora-sky-villa": { title:"Aurora Sky Villa",subtitle:"A residence above the city",shortDescription:"A duplex sky villa with a double-height salon and private terrace.",description:"Aurora is an architectural residence for collectors of space. Dramatic stone, dark timber and precise light create the atmosphere of a private club above the city.",locationDescription:"Above the Sava promenade, with complete privacy and an expansive city panorama." },
  "nocturne-private-spa": { title:"Nocturne Private Spa",subtitle:"A private urban ritual",shortDescription:"A penthouse with a private wellness pavilion and night panorama.",description:"Nocturne is a dark, tactile residence with a private pool, spa and salons shaped as a sequence of intimate scenes.",locationDescription:"A discreet Dedinje address surrounded by gardens and diplomatic residences." },
  "kalemegdan-courtyard": { title:"Kalemegdan Courtyard",subtitle:"A courtyard at the heart of the city",shortDescription:"An urban residence organised around a quiet private garden.",description:"Kalemegdan Courtyard brings together a precise stone facade, an intimate landscape and contemporary homes made for the historic city centre.",locationDescription:"Lower Dorćol, between Kalemegdan and the Danube." },
  "danube-gate": { title:"Danube Gate",subtitle:"A new urban gateway",shortDescription:"A mixed-use building with an active ground floor beside the Danube.",description:"Danube Gate is a completed city block with a distinct identity, flexible commercial frontage, deep loggias and a crafted brick facade.",locationDescription:"Where Dorćol, the marina and the Danube promenade meet." },
  "senjak-terraces": { title:"Senjak Terraces",subtitle:"Architecture among the trees",shortDescription:"Boutique residences with generous planted terraces.",description:"Senjak Terraces is a collection of calm homes embedded into the slope, where stone, timber and landscape are equal parts of the architecture.",locationDescription:"A green Senjak hillside with discreet access to the city." },
};

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "sr") return project;
  const fallback=projectEn[project.slug]||{};
  return { ...project, ...fallback, title:project.titleEn||fallback.title||project.title,subtitle:project.subtitleEn||fallback.subtitle||project.subtitle,shortDescription:project.shortDescriptionEn||fallback.shortDescription||project.shortDescription,description:project.descriptionEn||fallback.description||project.description,locationDescription:project.locationDescriptionEn||fallback.locationDescription||project.locationDescription,seoTitle:project.seoTitleEn||project.seoTitle,seoDescription:project.seoDescriptionEn||project.seoDescription };
}

export const paths = {
  category: { APARTMENT: "prodaja-stanova", COMMERCIAL: "poslovni-prostori", LUXURY: "lux-stanovi" },
} as const;
