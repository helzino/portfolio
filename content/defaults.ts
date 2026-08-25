/**
 * Fallback content. Every value here is overridable with an environment
 * variable (see CONTENT.md / .env.example) — nothing in the components reads
 * this file directly, they read config/content.ts, which merges env over these.
 */
import type { Capability, Film, Photo, Showreel } from "@/config/types";

export const defaultSite = {
  name: "Helena Wreford",
  role: "Researcher & Camera Assistant",
  tagline: "Visual storytelling through screen and print.",
  location: "London, United Kingdom",
  email: "helenawreford@live.com",
  url: "https://helenawreford.com",
  availability: "Available for bookings",
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
    "My work moves between documentary film & TV and stills, carrying the same instinct for light and story into both.",
  body: [
    "I have loved cameras since saving up for a GoPro Hero 3 as a kid. I would film anything. From a narrated tour of the vegetable patch to ducks in the park. I just loved being able to capture the world and life around me.",
    "Alongside that came a love for the natural world, something my Zoology degree at the University of Bristol only cemented. I have always been drawn to experiencing new things, exploring, and being outside my comfort zone. It is the combination of these elements that is the heart of who I am, and it is what drives me in my career.",
    "That drive has taken me from research and hands-on technical work into the world of networks, including roles at National Geographic and ITV's Plimsoll Productions, across linear broadcast as well as YouTube and digital spaces. I have gained experience across a variety of areas of the industry and, most importantly, had the opportunity to work alongside great people at every stage of the creative process.",
    "Photography is another part of what I do. I love documenting moments and human connections, from festivals and events to portraits. I am always keen to push my capabilities, meet new people and find new moments to capture.",
    "Above all, I care about telling stories that can have a positive impact on the world. Stories that showcase people pushing the boundaries of what is possible, bring attention to the things that matter, and connect audiences with ideas, places and people they might never otherwise encounter.",
  ],
  portrait: "/images/clown-fish.jpg",
  // The frame on the home page, which is a 4:5 crop and stands on its own
  // rather than introducing her, so it need not be the portrait above.
  previewImage: "/images/uk-countryside.jpg",
};

export const defaultCapabilities: Capability[] = [
  {
    title: "Research & Story",
    description:
      "Story development, contributor outreach and fact-checking, all supported by a scientific background in Zoology from the University of Bristol.",
  },
  {
    title: "Camera & Shooting",
    description:
      "Camera assisting and shooting experience across Sony systems, from the A7 IV to VENICE 2 training, on documentary and interview-led formats.",
  },
  {
    title: "Aerial (A2 CofC)",
    description:
      "Certified drone pilot, flying coastline, canopy and city for documentary shorts and commercial work.",
  },
  {
    title: "Technical Knowledge",
    description:
      "Technical experience preparing production kit across major camera systems (RED, ARRI, Sony, Canon), lens sets, lighting and sound for a wide range of productions.",
  },
  {
    title: "Underwater",
    description:
      "Qualified PADI Advanced Open Water diver, trained in underwater photography.",
  },
  {
    title: "Edit & Post",
    description:
      "Confident using Adobe platforms to cut short-form documentary, BTS and digital content.",
  },
  {
    title: "Photography",
    description:
      "Wildlife, landscape, event and portrait work, shot on location, on set and at events.",
  },
];

export const defaultFilms: Film[] = [
  {
    title: "XO Rental",
    role: "Kit Technician",
    year: "2026",
    format: "Role",
    description:
      "Preparing and checking camera, lens, lighting and sound packages across major systems for productions going out on location.",
    poster: "",
  },
  {
    title: "National Geographic",
    role: "Production Intern",
    year: "2025",
    format: "Role",
    description:
      "Working across linear broadcast and digital output, from the Amsterdam summit floor to the edit.",
    poster: "/images/national-geographic.jpg",
  },
  {
    title: "Plimsoll Productions",
    role: "Trainee",
    year: "2025",
    format: "Role",
    description:
      "Natural history and factual production with ITV's Plimsoll, across research, kit and the day-to-day of the floor.",
    poster: "",
  },
  {
    title: "Virtual Production: Sony VENICE 2",
    role: "Camera Operator",
    year: "2024",
    format: "Skills Bootcamp",
    description:
      "Training on Sony's VENICE 2 across the full virtual production pipeline, from Unreal Engine plates to real-time capture.",
    poster: "",
  },
];

/**
 * The showreel that opens the home page. Paste the ordinary YouTube or Vimeo
 * link — lib/video.ts turns it into a player URL. Leaving url empty hides the
 * section entirely, so the page is never left with an empty frame.
 */
export const defaultShowreel: Showreel = {
  url: "https://vimeo.com/1220108812",
  title: "",
  eyebrow: "Cinematography showreel",
  caption: "A glance into life down my lens.",
  // The reel's own title card, pulled from Vimeo at 1920x1080.
  poster: "/images/showreel-poster.jpg",
};

/**
 * Photography, grouped by what is in the frame. Events and People are filled
 * from public/images/events and public/images/people; the filter only offers a
 * category once at least one photograph carries it.
 */
export const defaultPhotos: Photo[] = [
  {
    id: "1",
    title: "Spotted Something",
    category: "Nature",
    location: "Skomer Island, Wales",
    year: "2023",
    src: "/images/puffin.jpg",
    caption: "A puffin on the cliff edge, seconds before the burrow run.",
  },
  {
    id: "2",
    title: "Highs & Lows",
    category: "Nature",
    location: "Philippines",
    year: "2023",
    src: "/images/butterfly.jpg",
    caption: "Two birdwings, one settled on a leaf and one still in the air.",
  },
  {
    id: "3",
    title: "Full Tilt",
    category: "Events",
    location: "Boomtown, Hampshire",
    year: "",
    src: "/images/events/boomtown-crowd.jpg",
    caption: "The view from behind the decks, main stage, mid-afternoon.",
  },
  {
    id: "4",
    title: "Two Grooms",
    category: "People",
    location: "London",
    year: "",
    src: "/images/people/two-grooms.jpg",
    caption: "A pause between the ceremony and the party, on concrete.",
  },
  {
    id: "5",
    title: "Conflicting Contrasts",
    category: "Nature",
    location: "Guatemala",
    year: "2022",
    src: "/images/volcano.jpg",
    caption: "A gentle eruption, watched from a ridge at first light.",
  },
  {
    id: "6",
    title: "First Light",
    category: "Nature",
    location: "United Kingdom",
    year: "",
    src: "/images/uk-countryside.jpg",
    caption: "Mist sitting in the valley at dawn, one window still lit.",
  },
  {
    id: "7",
    title: "Yin & Yang",
    category: "Nature",
    location: "Croatia",
    year: "2023",
    src: "/images/fish.jpg",
    caption: "The perfect balance, found underwater.",
  },
  {
    id: "8",
    title: "Nemo & Co",
    category: "Nature",
    location: "Philippines",
    year: "",
    src: "/images/clown-fish.jpg",
    caption: "A family of clown fish protecting their eggs.",
  },
  {
    id: "9",
    title: "Lost in Thought",
    category: "Nature",
    location: "Nepal",
    year: "",
    src: "/images/monkey.jpg",
    caption: "A monkey perched on the steps in Kathmandu.",
  },
  {
    id: "10",
    title: "Morning Commute",
    category: "Nature",
    location: "Nepal",
    year: "2022",
    src: "/images/yak.jpg",
    caption: "A working yak on the trail above the treeline.",
  },
  {
    id: "11",
    title: "Mountain Companions",
    category: "Nature",
    location: "Nepal",
    year: "",
    src: "/images/nepal.jpg",
    caption: "Yaks and their owner beneath snow-covered Himalayan giants.",
  },
  {
    id: "12",
    title: "Tiny Forest Takeover",
    category: "Nature",
    location: "Australia",
    year: "",
    src: "/images/mushrooms.jpg",
    caption:
      "Bright red mushrooms clustering along the twisted roots of an old tree.",
  },
  {
    id: "13",
    title: "Still Waters",
    category: "Nature",
    location: "Slovenia",
    year: "",
    src: "/images/island.jpg",
    caption: "Lake Bled's island church, surrounded by alpine scenery.",
  },
  {
    id: "14",
    title: "Built for the Cloud Line",
    category: "Nature",
    location: "Peru",
    year: "",
    src: "/images/south-america.jpg",
    caption: "Terraces stepping down from Machu Picchu, Huayna Picchu behind.",
  },
  {
    id: "15",
    title: "Last Light",
    category: "Events",
    location: "Boomtown, Hampshire",
    year: "",
    src: "/images/events/last-light.jpg",
    caption: "Hands up as the sun goes down over the valley.",
  },
  {
    id: "16",
    title: "Wall of Colour",
    category: "Events",
    location: "",
    year: "",
    src: "/images/events/main-stage.jpg",
    caption: "Cued up in front of a stage-height LED wall.",
  },
  {
    id: "17",
    title: "Forest Decks",
    category: "Events",
    location: "",
    year: "",
    src: "/images/events/forest-decks.jpg",
    caption: "A timber stage under the trees, one record into the next.",
  },
  {
    id: "18",
    title: "After Dark",
    category: "Events",
    location: "",
    year: "",
    src: "/images/events/after-dark.jpg",
    caption: "A lit sculpture in the woods, lasers cutting through the canopy.",
  },
  {
    id: "19",
    title: "What's The Gossip",
    category: "People",
    location: "Nepal",
    year: "2022",
    src: "/images/girls.jpg",
    caption: "Two girls catching up on the news of the town.",
  },
  {
    id: "20",
    title: "Bracken",
    category: "People",
    location: "",
    year: "",
    src: "/images/people/bracken.jpg",
    caption: "Waterproofs on, waist-deep in ferns, waiting out the weather.",
  },
  {
    id: "21",
    title: "In the Crowd",
    category: "People",
    location: "",
    year: "",
    src: "/images/people/in-the-crowd.jpg",
    caption: "Caught grinning on the way through the woods.",
  },
  {
    id: "22",
    title: "A Moment Out",
    category: "People",
    location: "",
    year: "",
    src: "/images/people/a-moment-out.jpg",
    caption: "Sat back against a tree while the night carries on around her.",
  },
];
