import type { Project, SiteSettings, TeamMember } from "@/types";

const images = {
  dobra: "/images/projects/dobracina-21/hero-v2.png",
  dorcol: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90",
  office: "/images/projects/k-district-office/hero.webp",
  lux: "/images/lux/penthouse-blue-hour.webp",
  old: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2200&q=90",
};
const specialAssets: Record<string, Record<string, string>> = {
  "dobracina-21": { hero: "/images/projects/dobracina-21/hero-v2.png", "plan-2d": "/images/projects/dobracina-21/plan-2d-v2.png", "plan-3d": "/images/projects/dobracina-21/plan-3d-v2.png" },
  "skyline-penthouse": { hero: "/images/lux/penthouse-blue-hour.webp", gallery: "/images/lux/penthouse-dining.webp", "plan-2d": "/images/lux/penthouse-plan-2d.webp", "plan-3d": "/images/lux/penthouse-plan-3d.webp" },
  "aurora-sky-villa": { hero: "/images/projects/aurora-sky-villa/hero-v2.png", gallery: "/images/projects/aurora-sky-villa/gallery-v2.png", "plan-3d": "/images/projects/aurora-sky-villa/plan-3d-v2.png" },
  "nocturne-private-spa": { hero: "/images/projects/nocturne-private-spa/hero-v2.png", gallery: "/images/projects/nocturne-private-spa/gallery-v2.png", "plan-3d": "/images/projects/nocturne-private-spa/plan-3d-v2.png" },
  "atrium-works": { "plan-3d": "/images/projects/atrium-works/plan-3d-v2.png" },
};
const asset=(slug:string,file:string)=>specialAssets[slug]?.[file] ?? `/images/projects/${slug}/${file}.webp`;
const projectVisuals=(id:number,slug:string,title:string)=>[
  {id:id*10+1,imagePath:asset(slug,"hero"),altText:`${title} — enterijer`,type:"INTERIOR" as const,sortOrder:1},
  ...(specialAssets[slug]?.gallery ? [{id:id*10+2,imagePath:asset(slug,"gallery"),altText:`${title} — galerija`,type:"INTERIOR" as const,sortOrder:2}] : []),
  {id:id*10+3,imagePath:asset(slug,"plan-2d"),altText:`${title} — 2D osnova`,type:"FLOOR_PLAN" as const,sortOrder:3},
  {id:id*10+4,imagePath:asset(slug,"plan-3d"),altText:`${title} — 3D prikaz`,type:"FLOOR_PLAN" as const,sortOrder:4},
];
const projectPlans=(id:number,slug:string)=>[
  {id:id*10+4,title:"Arhitektonska 2D osnova",image:asset(slug,"plan-2d"),sortOrder:1},
  {id:id*10+5,title:"3D prostorni prikaz",image:asset(slug,"plan-3d"),sortOrder:2},
];

export const demoProjects: Project[] = [
  {
    id: 1, category: "APARTMENT", status: "ACTIVE", title: "Dobračina 21", subtitle: "Savremeni ritam Dorćola", slug: "dobracina-21",
    shortDescription: "Promišljeno stanovanje u istorijskom jezgru Beograda.",
    description: "Dobračina 21 spaja mir intimnog doma sa energijom Dorćola. Precizne proporcije, prirodni materijali i obilje dnevnog svetla oblikuju arhitekturu koja traje.",
    address: "Dobračina 21", city: "Beograd", locationDescription: "Na nekoliko koraka od Dunava, kulturnih institucija i najživljih gradskih ulica.", heroImage: images.dobra,
    mapAddress: "Dobračina 21, Beograd", latitude: 44.8218, longitude: 20.4619, featured: true, showInNavigation: true, sortOrder: 1,
    images: projectVisuals(1,"dobracina-21","Dobračina 21"),
    units: [
      { id: 1, name: "Stan A01", unitNumber: "A01", floor: "2. sprat", rooms: 3, area: 78.5, orientation: "Istok / Zapad", price: 320000, showPrice: true, status: "AVAILABLE", image: images.dorcol },
      { id: 2, name: "Stan A04", unitNumber: "A04", floor: "4. sprat", rooms: 4, area: 112, orientation: "Jug / Istok", price: null, showPrice: false, status: "AVAILABLE", image: images.dobra },
    ], floorPlans: projectPlans(1,"dobracina-21"),
  },
  {
    id: 2, category: "COMMERCIAL", status: "ACTIVE", title: "K District Office", subtitle: "Prostor za ideje", slug: "k-district-office",
    shortDescription: "Fleksibilan poslovni prostor projektovan za novi način rada.", description: "Otvorene osnove, vrhunska infrastruktura i reprezentativan karakter u poslovnom srcu grada.",
    address: "Dunavski kej 23", city: "Beograd", locationDescription: "Odlična povezanost sa centralnim poslovnim zonama.", heroImage: images.office, mapAddress: "Dunavski kej 23, Beograd", latitude: 44.828, longitude: 20.455,
    featured: true, showInNavigation: true, sortOrder: 2, images: projectVisuals(2,"k-district-office","K District Office"),
    units: [{ id: 3, name: "Lokal L02", unitNumber: "L02", floor: "Prizemlje", rooms: null, area: 146, orientation: "Ulična strana", price: null, showPrice: false, status: "AVAILABLE", image: images.office }], floorPlans: projectPlans(2,"k-district-office"),
  },
  {
    id: 3, category: "LUXURY", status: "ACTIVE", title: "Skyline Penthouse", subtitle: "Privatni horizont Beograda", slug: "skyline-penthouse",
    shortDescription: "Jedinstvena rezidencija sa panoramskim pogledom na grad i reke.", description: "Monumentalna, ali intimna rezidencija. Taktilni materijali, diskretna tehnologija i pogled koji postaje deo svakodnevnog života.",
    address: "Savski trg", city: "Beograd", locationDescription: "Iznad nove gradske promenade, sa direktnim pogledom na Savu.", heroImage: images.lux, mapAddress: "Savski trg, Beograd", latitude: 44.8062, longitude: 20.4474,
    featured: true, showInNavigation: true, sortOrder: 3, images: projectVisuals(3,"skyline-penthouse","Skyline Penthouse"), units: [], floorPlans: projectPlans(3,"skyline-penthouse"),
  },
  {
    id:5,category:"APARTMENT",status:"ACTIVE",title:"Vračar Park",subtitle:"Dom okrenut zelenilu",slug:"vracar-park",shortDescription:"Savremena rezidencija sa privatnim vrtom u tihom delu Vračara.",description:"Vračar Park donosi toplinu prirodnih materijala i neočekivanu količinu zelenila u samo srce grada. Svaka osnova pažljivo balansira privatnost, svetlo i otvoren životni prostor.",address:"Nebojšina 18",city:"Beograd",locationDescription:"Mirna rezidencijalna ulica, nekoliko minuta od Hrama Svetog Save i Kalenić pijace.",heroImage:asset("vracar-park","hero"),mapAddress:"Nebojšina 18, Beograd",latitude:44.7948,longitude:20.4687,featured:true,showInNavigation:true,sortOrder:2,images:projectVisuals(5,"vracar-park","Vračar Park"),units:[{id:51,name:"Stan B03",unitNumber:"B03",floor:"3. sprat",rooms:3,area:96.4,orientation:"Jug / Zapad",price:410000,showPrice:true,status:"AVAILABLE",image:asset("vracar-park","hero")}],floorPlans:projectPlans(5,"vracar-park")
  },
  {
    id:6,category:"APARTMENT",status:"ACTIVE",title:"Riverside Residence",subtitle:"Svetlo iznad reke",slug:"riverside-residence",shortDescription:"Prostrani gradski stanovi sa panoramskim pogledom na Savu.",description:"Riverside Residence kombinuje čiste linije, velike raspone i duboke terase. Enterijeri su oblikovani da prate dnevno svetlo i pogled koji se ne ponavlja.",address:"Bulevar Nikole Tesle 12",city:"Beograd",locationDescription:"Direktno uz kej, sa brzom vezom prema centru i poslovnoj zoni Novog Beograda.",heroImage:asset("riverside-residence","hero"),mapAddress:"Bulevar Nikole Tesle 12, Beograd",latitude:44.8165,longitude:20.4321,featured:true,showInNavigation:true,sortOrder:3,images:projectVisuals(6,"riverside-residence","Riverside Residence"),units:[{id:61,name:"Stan C08",unitNumber:"C08",floor:"8. sprat",rooms:4,area:138.2,orientation:"Reka / Jug",price:590000,showPrice:true,status:"AVAILABLE",image:asset("riverside-residence","hero")}],floorPlans:projectPlans(6,"riverside-residence")
  },
  {
    id:7,category:"COMMERCIAL",status:"ACTIVE",title:"Gallery 27",subtitle:"Prostor kao izložba",slug:"gallery-27",shortDescription:"Reprezentativan retail prostor u istorijskom centru grada.",description:"Gallery 27 je svetao, prilagodljiv prostor galerijskog karaktera, projektovan za premium retail, showroom ili kulturni program.",address:"Kneza Mihaila 27",city:"Beograd",locationDescription:"Najprometnija pešačka zona grada, na nekoliko koraka od Kalemegdana.",heroImage:asset("gallery-27","hero"),mapAddress:"Kneza Mihaila 27, Beograd",latitude:44.8171,longitude:20.4562,featured:false,showInNavigation:true,sortOrder:5,images:projectVisuals(7,"gallery-27","Gallery 27"),units:[{id:71,name:"Galerijski lokal",unitNumber:"G27",floor:"Prizemlje",rooms:null,area:214,orientation:"Pešačka zona",price:null,showPrice:false,status:"AVAILABLE",image:asset("gallery-27","hero")}],floorPlans:projectPlans(7,"gallery-27")
  },
  {
    id:8,category:"COMMERCIAL",status:"ACTIVE",title:"Atrium Works",subtitle:"Nova kultura rada",slug:"atrium-works",shortDescription:"Fleksibilan poslovni kampus organizovan oko zelenog atrijuma.",description:"Atrium Works spaja fokus, saradnju i dobrobit. Dvovisinski zajednički prostori, zelenilo i modularne kancelarije stvaraju radno okruženje nove generacije.",address:"Omladinskih brigada 88",city:"Beograd",locationDescription:"U srcu poslovne zone Novog Beograda, sa direktnim pristupom glavnim saobraćajnicama.",heroImage:asset("atrium-works","hero"),mapAddress:"Omladinskih brigada 88, Beograd",latitude:44.8093,longitude:20.4083,featured:false,showInNavigation:true,sortOrder:6,images:projectVisuals(8,"atrium-works","Atrium Works"),units:[{id:81,name:"Office 3A",unitNumber:"3A",floor:"3. sprat",rooms:null,area:368,orientation:"Atrijum / Zapad",price:null,showPrice:false,status:"AVAILABLE",image:asset("atrium-works","hero")}],floorPlans:projectPlans(8,"atrium-works")
  },
  {
    id:9,category:"LUXURY",status:"ACTIVE",title:"Aurora Sky Villa",subtitle:"Rezidencija iznad grada",slug:"aurora-sky-villa",shortDescription:"Duplex sky-villa sa dvovisinskim salonom i privatnom terasom.",description:"Aurora je arhitektonska rezidencija za kolekcionare prostora. Dramatičan kamen, tamno drvo i precizno svetlo stvaraju atmosferu privatnog kluba iznad grada.",address:"Bulevar Vudroa Vilsona 16",city:"Beograd",locationDescription:"Iznad Savske promenade, uz potpuno kontrolisanu privatnost i panoramu grada.",heroImage:asset("aurora-sky-villa","hero"),mapAddress:"Bulevar Vudroa Vilsona 16, Beograd",latitude:44.8045,longitude:20.4452,featured:true,showInNavigation:true,sortOrder:8,images:projectVisuals(9,"aurora-sky-villa","Aurora Sky Villa"),units:[],floorPlans:projectPlans(9,"aurora-sky-villa")
  },
  {
    id:10,category:"LUXURY",status:"ACTIVE",title:"Nocturne Private Spa",subtitle:"Privatni ritual grada",slug:"nocturne-private-spa",shortDescription:"Penthouse sa privatnim wellness paviljonom i noćnim pogledom.",description:"Nocturne je tamna, taktilna rezidencija sa privatnim bazenom, spa zonom i salonima oblikovanim kao niz intimnih scena.",address:"Tolstojeva 24",city:"Beograd",locationDescription:"Diskretna adresa na Dedinju, okružena zelenilom i diplomatskim rezidencijama.",heroImage:asset("nocturne-private-spa","hero"),mapAddress:"Tolstojeva 24, Beograd",latitude:44.7798,longitude:20.4526,featured:false,showInNavigation:true,sortOrder:9,images:projectVisuals(10,"nocturne-private-spa","Nocturne Private Spa"),units:[],floorPlans:projectPlans(10,"nocturne-private-spa")
  },
  {
    id:11,category:"APARTMENT",status:"COMPLETED",title:"Kalemegdan Courtyard",subtitle:"Dvorište u srcu grada",slug:"kalemegdan-courtyard",shortDescription:"Urbana rezidencija organizovana oko mirnog privatnog vrta.",description:"Kalemegdan Courtyard spaja preciznu kamenu fasadu, intiman pejzaž i savremene stanove oblikovane za istorijsko jezgro grada.",address:"Cara Uroša 18",city:"Beograd",locationDescription:"Donji Dorćol, između Kalemegdana i Dunava.",heroImage:"/images/completed/kalemegdan-courtyard.png",mapAddress:"Cara Uroša 18, Beograd",latitude:44.8234,longitude:20.4553,featured:false,showInNavigation:false,sortOrder:11,images:[{id:111,imagePath:"/images/completed/kalemegdan-courtyard.png",altText:"Kalemegdan Courtyard",type:"EXTERIOR",sortOrder:1}],units:[],floorPlans:[]
  },
  {
    id:12,category:"COMMERCIAL",status:"COMPLETED",title:"Danube Gate",subtitle:"Nova gradska kapija",slug:"danube-gate",shortDescription:"Poslovno-stambena zgrada sa aktivnim prizemljem uz Dunav.",description:"Danube Gate je završen gradski blok snažnog identiteta, sa fleksibilnim poslovnim prizemljem, dubokim lođama i fasadom od opeke.",address:"Dunavski kej 9",city:"Beograd",locationDescription:"Na spoju Dorćola, marine i dunavskog šetališta.",heroImage:"/images/completed/danube-gate.png",mapAddress:"Dunavski kej 9, Beograd",latitude:44.8287,longitude:20.4564,featured:false,showInNavigation:false,sortOrder:12,images:[{id:121,imagePath:"/images/completed/danube-gate.png",altText:"Danube Gate",type:"EXTERIOR",sortOrder:1}],units:[],floorPlans:[]
  },
  {
    id:13,category:"LUXURY",status:"COMPLETED",title:"Senjak Terraces",subtitle:"Arhitektura u krošnjama",slug:"senjak-terraces",shortDescription:"Butik rezidencije sa velikim ozelenjenim terasama.",description:"Senjak Terraces je kolekcija mirnih rezidencija uklopljenih u padinu, sa kamenom, drvetom i pejzažom kao ravnopravnim delovima arhitekture.",address:"Vase Pelagića 32",city:"Beograd",locationDescription:"Zelena padina Senjaka sa diskretnim pristupom gradu.",heroImage:"/images/completed/senjak-terraces.png",mapAddress:"Vase Pelagića 32, Beograd",latitude:44.7875,longitude:20.4348,featured:false,showInNavigation:false,sortOrder:13,images:[{id:131,imagePath:"/images/completed/senjak-terraces.png",altText:"Senjak Terraces",type:"EXTERIOR",sortOrder:1}],units:[],floorPlans:[]
  },
  {
    id: 4, category: "APARTMENT", status: "COMPLETED", title: "Vračar Gardens", subtitle: "Arhitektura mirne ulice", slug: "vracar-gardens",
    shortDescription: "Završena urbana rezidencija sa privatnim vrtovima.", description: "Kuća savremenog izraza, oblikovana u dijalogu sa kontekstom Vračara.", address: "Vračar", city: "Beograd", locationDescription: "Rezidencijalno susedstvo u blizini Hrama Svetog Save.", heroImage: images.old, mapAddress: "Vračar, Beograd", latitude: 44.799, longitude: 20.475,
    featured: false, showInNavigation: false, sortOrder: 4, images: [{ id: 6, imagePath: images.old, altText: "Vračar Gardens", type: "EXTERIOR", sortOrder: 1 }], units: [], floorPlans: [],
  },
];

export const demoTeam: TeamMember[] = [
  { id: 1, name: "Aleksandar Stojanović", role: "Osnivač i direktor", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=85", sortOrder: 1, active: true },
  { id: 2, name: "Milica Ristić", role: "Direktorka razvoja", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85", sortOrder: 2, active: true },
  { id: 3, name: "Nikola Marković", role: "Rukovodilac izgradnje", photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1200&q=85", sortOrder: 3, active: true },
];

export const demoSettings: SiteSettings = {
  companyName: "STORMS", phone: "+381 11 455 20 20", email: "office@storms.rs", address: "Beograd, Srbija", instagram: "https://instagram.com", linkedin: "https://linkedin.com", facebook: "",
  contactHeading: "Razgovarajmo o prostoru koji ostaje.", contactText: "Za informacije o projektima, dostupnim jedinicama i saradnji, naš tim vam je na raspolaganju.",
  aboutTitle: "Gradimo vrednost koja traje", aboutSubtitle: "Preciznost u svakom detalju", aboutDescription: "STORMS je investiciona i građevinska kompanija posvećena stvaranju savremenih prostora visokog kvaliteta. Od izbora lokacije do poslednjeg detalja, svaki projekat razvijamo sa istom pažnjom prema arhitekturi, funkciji i dugoročnoj vrednosti.",
  aboutImage: "/images/about/material-studio.png", footerText: "Arhitektura. Izgradnja. Vrednost.",
};
