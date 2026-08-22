/**
 * Fallback content. Every value here is overridable with an environment
 * variable (see CONTENT.md / .env.example) — nothing in the components reads
 * this file directly, they read config/content.ts, which merges env over these.
 */
import type { Award, Capability, Film, Photo, TimelineEntry } from "@/config/types";

export const defaultSite = {
  name: "Helena Wreford",
  role: "Filmmaker & Photographer",
  tagline:
    "Wildlife storytelling for screen and print, by a zoologist behind the camera.",
  location: "London, United Kingdom",
  email: "helenawreford@live.com",
  url: "https://helenawreford.com",
  availability: "Available for commissions and crew work",
  heroHeadline: ["Helena", "Wreford"],
  heroImage: "/images/puffin.jpg",
};

export const defaultSocials = [
  { label: "Instagram", href: "https://www.instagram.com/helswreford/?hl=en" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hels-wreford-2500971b1/",
  },
];

export const defaultAbout = {
  intro:
    "I am a zoologist who tells stories with a camera. My work moves between wildlife film and stills, pointing the same instinct for patience, light and behaviour at two different screens.",
  body: [
    "I graduated from the University of Bristol with a BSc in Zoology, writing my dissertation on the impact of artificial light at night on marine species, and serving as Vice-President of the Wildlife Film Society.",
    "Since then I have worked as a researcher, drone pilot, camera operator and editor, from the cliffs of Skomer Island to the surf coast of Costa Rica, most recently training on Sony VENICE 2 cameras in virtual production.",
    "I have made work for National Geographic and Plimsoll Productions, for traditional broadcast and for YouTube, building a career in factual television around natural history and adventure.",
    "I care about making science feel close enough to touch: films and photographs that give an audience a reason to look twice, and then to look after.",
  ],
  quote:
    "The goal is never the animal in frame. It is the moment somebody decides they care about it.",
  portrait: "/images/girls.jpg",
};

export const defaultCapabilities: Capability[] = [
  {
    title: "Direction & Camera",
    description:
      "Shooting on Sony A7 IV and VENICE 2, from observational wildlife sequences to interview-led documentary. Kit room experience rigging and operating RED, FX6 and Sony A7S bodies, and DJI Ronin gimbals on shoots.",
  },
  {
    title: "Aerial (A2 CofC)",
    description:
      "Certified drone pilot, flying coastline, canopy and city for wildlife documentary and commercial work.",
  },
  {
    title: "Underwater",
    description:
      "Qualified scuba diver shooting marine subjects, with a research background in marine ecology.",
  },
  {
    title: "Research & Story",
    description:
      "Development research, contributor outreach and scripting: finding the narrative before the camera turns over.",
  },
  {
    title: "Edit & Post",
    description:
      "Cutting short-form documentary and social campaigns, including grade and sound finishing.",
  },
  {
    title: "Science Communication",
    description:
      "Translating peer-reviewed research into work that a general audience will actually watch and read.",
  },
];

export const defaultTimeline: TimelineEntry[] = [
  {
    period: "2024 to present",
    title: "Researcher",
    organisation: "WildReach Productions",
    detail:
      "Pitching stories about the relationships between people and wildlife, and working with contributors to find the narrative behind them.",
  },
  {
    period: "2025",
    title: "Camera Operator, Virtual Production",
    organisation: "Skills Bootcamp, Sony VENICE 2",
    detail:
      "Training across the virtual production pipeline: Unreal Engine, camera tracking, plate playback and real-time content.",
  },
  {
    period: "2021 to 2024",
    title: "BSc Zoology",
    organisation: "University of Bristol",
    detail:
      "Animal communication and marine ecology. Dissertation on artificial light at night. Vice-President, Wildlife Film Society.",
  },
  {
    period: "2021 to 2022",
    title: "Drone Pilot, Researcher, Editor",
    organisation: "Bristol: A Hidden Eden",
    detail:
      "Aerial photography and research for a Wildlife Film Society production about the city's overlooked wildlife.",
  },
  {
    period: "2021",
    title: "Content Creator",
    organisation: "Dreamsea Surf Camp, Costa Rica",
    detail:
      "Two months on site filming, photographing and running social storytelling for an audience of 50,000+.",
  },
];

export const defaultAwards: Award[] = [
  {
    title: "Communicating Science Through Filmmaking",
    detail: "Winner, judged by BBC Planet Earth III producers",
    year: "2023",
  },
  {
    title: "Future Leap Wildlife Photographer Exhibition",
    detail: "Shortlisted and exhibited",
    year: "2023",
  },
];

export const defaultFilms: Film[] = [
  {
    slug: "bristol-a-hidden-eden",
    title: "Bristol: A Hidden Eden",
    role: "Drone Pilot · Researcher · Editor",
    year: "2022",
    format: "Documentary short",
    description:
      "A city read as an ecosystem: peregrines on tower blocks, foxes on terraces, and the green corridors nobody notices.",
    poster: "/images/puffin.jpg",
    stills: ["/images/volcano.jpg", "/images/fish.jpg"],
    body: [
      "Produced with the University of Bristol Wildlife Film Society, Bristol: A Hidden Eden looks for wilderness inside a city that assumes it has none.",
      "I flew the aerial sequences, ran the research and cut the film, mapping the routes urban animals take through Bristol, then finding the light that made those routes visible on screen.",
    ],
  },
  {
    slug: "sony-venice-2-virtual-production",
    title: "Virtual Production: Sony VENICE 2",
    role: "Camera Operator",
    year: "2025",
    format: "Skills Bootcamp",
    description:
      "Training on Sony's VENICE 2 across the full virtual production pipeline, from Unreal Engine plates to real-time capture.",
    poster: "/images/camera.jpg",
    stills: [],
    link: "https://pro.sony/en_AU/products/digital-cinema-cameras/venice2/",
    body: [
      "A bootcamp in virtual production: combining computer-generated environments with live action, and learning the pipeline that connects them, from Unreal Engine and camera tracking to plate playback and real-time content.",
      "Operating VENICE 2 gave me a working knowledge of high-end cinema camera bodies and the discipline that comes with them, which I now bring to documentary sets.",
    ],
  },
  {
    slug: "wildreach-development",
    title: "Human / Wildlife",
    role: "Researcher",
    year: "2024 to present",
    format: "Development, WildReach Productions",
    description:
      "Ongoing development research into the relationships people build with the animals they live alongside.",
    poster: "/images/yak.jpg",
    stills: ["/images/girls.jpg"],
    body: [
      "Development work for WildReach Productions: pitching story ideas built around the relationships between people and wildlife, and speaking to contributors to find the ones worth filming.",
      "The research runs ahead of the camera. The strongest sequences usually exist as a conversation months before they exist as a shot.",
    ],
  },
  {
    slug: "dreamsea-costa-rica",
    title: "Dreamsea, Costa Rica",
    role: "Content Creator",
    year: "2021",
    format: "Branded social campaign",
    description:
      "Two months on the Pacific coast filming, photographing and writing for a surf camp's 50,000-strong audience.",
    poster: "/images/fish.jpg",
    stills: ["/images/butterfly.jpg"],
    body: [
      "Living on site for two months, I shot and cut daily content (surf, jungle, the people passing through) and managed the channels it went out on.",
      "It taught me to work quickly and alone: one camera, one drone, and a story that had to be finished before the light went.",
    ],
  },
];

export const defaultPhotos: Photo[] = [
  {
    id: "1",
    title: "Hanging In There",
    location: "Philippines",
    year: "2023",
    src: "/images/butterfly.jpg",
    caption: "A Pipevine Swallowtail, holding on through the afternoon heat.",
  },
  {
    id: "2",
    title: "Spotted Something",
    location: "Skomer Island, Wales",
    year: "2023",
    src: "/images/puffin.jpg",
    caption: "A puffin on the cliff edge, seconds before the burrow run.",
  },
  {
    id: "3",
    title: "Morning Commute",
    location: "Nepal",
    year: "2022",
    src: "/images/yak.jpg",
    caption: "A working yak on the trail above the treeline.",
  },
  {
    id: "4",
    title: "Conflicting Contrasts",
    location: "Guatemala",
    year: "2022",
    src: "/images/volcano.jpg",
    caption: "A gentle eruption, watched from a ridge at first light.",
  },
  {
    id: "5",
    title: "What's The Gossip",
    location: "Nepal",
    year: "2022",
    src: "/images/girls.jpg",
    caption: "Two girls catching up on the news of the town.",
  },
  {
    id: "6",
    title: "Yin & Yang",
    location: "Croatia",
    year: "2023",
    src: "/images/fish.jpg",
    caption: "The perfect balance, found underwater.",
  },
  {
    id: "7",
    title: "Tiny Forest Takeover",
    location: "Australia",
    year: "",
    src: "/images/mushrooms.jpg",
    caption:
      "Bright red mushrooms clustering along the twisted roots of an old tree.",
  },
  {
    id: "8",
    title: "Mountain Companions",
    location: "Nepal",
    year: "",
    src: "/images/nepal.jpg",
    caption: "Yaks and their owner beneath snow-covered Himalayan giants.",
  },
  {
    id: "9",
    title: "Still Waters",
    location: "Slovenia",
    year: "",
    src: "/images/island.jpg",
    caption: "Lake Bled's island church, surrounded by alpine scenery.",
  },
  {
    id: "10",
    title: "Nemo & Co",
    location: "Philippines",
    year: "",
    src: "/images/clown-fish.jpg",
    caption: "A family of clown fish protecting their eggs.",
  },
  {
    id: "11",
    title: "Lost in Thought",
    location: "Nepal",
    year: "",
    src: "/images/monkey.jpg",
    caption: "A monkey perched on the steps in Kathmandu.",
  },
  {
    id: "12",
    title: "Built for the Cloud Line",
    location: "Peru",
    year: "",
    src: "/images/south-america.jpg",
    caption: "Terraces stepping down from Machu Picchu, Huayna Picchu behind.",
  },
];
