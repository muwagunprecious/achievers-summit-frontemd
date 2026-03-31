export interface ScheduleSession {
  id: string;
  time: string;
  stage: string;
  title: string;
  subtitle?: string;
  tag: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  label: string;
  sessions: ScheduleSession[];
}

export interface HighlightBlock {
  id: string;
  title: string;
  subtitle: string;
  time?: string;
  type: "highlight";
}

export type ScheduleItem = TimeSlot | HighlightBlock;

export interface StageInfo {
  number: string;
  name: string;
  bullets: string[];
}

export interface TrackInfo {
  number: string;
  name: string;
  description: string;
}

export const stages: StageInfo[] = [
  {
    number: "01",
    name: "MAIN STAGE",
    bullets: [
      "Primary keynotes & plenary panels",
      "Main programme - All 5000+ attendees",
      "Opening & closing ceremonies",
    ],
  },
  {
    number: "02",
    name: "BREAKOUT STAGE 1",
    bullets: [
      "Track 01 - Technology, AI & Innovation",
      "Track 05 - Business, Finance & Entrepreneurship",
    ],
  },
  {
    number: "03",
    name: "BREAKOUT STAGE 2",
    bullets: [
      "Track 04 - Governance, Policy & Civic Leadership",
      "Track 02 - Media, Content & Storytelling",
    ],
  },
  {
    number: "04",
    name: "BREAKOUT STAGE 3",
    bullets: [
      "Track 06 - Leadership, Education & The Future of Work",
      "Track 03 - Creative Economy, Design & Culture",
    ],
  },
];

export const tracks: TrackInfo[] = [
  {
    number: "01",
    name: "Technology, AI & Innovation",
    description:
      "Artificial intelligence, emerging technologies, digital infrastructure, cybersecurity, data sovereignty and Africa's technology leadership agenda.",
  },
  {
    number: "02",
    name: "Media, Content & Digital Storytelling",
    description:
      "Digital media, content creation, podcasting, broadcast journalism, newsletters, video storytelling and sustainable African media businesses.",
  },
  {
    number: "03",
    name: "Creative Economy, Design & Culture",
    description:
      "Fashion, music, film, gaming, design, sport and the economic infrastructure underpinning Africa's cultural and creative industries.",
  },
  {
    number: "04",
    name: "Governance, Policy & Civic Leadership",
    description:
      "Public policy, democracy, anti-corruption, civic technology, diaspora engagement and transformative political and institutional leadership.",
  },
  {
    number: "05",
    name: "Business, Finance & Entrepreneurship",
    description:
      "Entrepreneurship, startup capital, corporate finance, AfCFTA trade strategy, investment structuring and women in African business.",
  },
  {
    number: "06",
    name: "Leadership, Education & The Future of Work",
    description:
      "Leadership philosophy, education reform, future of work, talent development, automation readiness and purpose-driven career architecture.",
  },
];

export const additionalInfo = [
  { label: "CSR INITIATIVE", value: "Makoko community foodbank drive" },
  { label: "EXHIBITION FLOOR", value: "Brand activations & exhibitor hall" },
  {
    label: "VIRTUAL ATTENDANCE",
    value: "25,000+ virtual delegates across Africa & the diaspora",
  },
] as const;

export const day1Schedule: ScheduleItem[] = [
  {
    id: "d1-1",
    time: "8:00 AM",
    label: "MORNING - MAIN STAGE ONLY",
    sessions: [
      {
        id: "d1-1-1",
        time: "8:00 AM",
        stage: "MAIN STAGE - ALL ATTENDEES",
        title: "Venue Opens",
        subtitle: "Accreditation, Badge Collection & Welcome Packs",
        tag: "REGISTRATION",
      },
    ],
  },
  {
    id: "d1-2",
    time: "8:30 AM",
    label: "MORNING - MAIN STAGE ONLY",
    sessions: [
      {
        id: "d1-2-1",
        time: "8:30 AM",
        stage: "MAIN STAGE - ALL ATTENDEES",
        title: "Welcome & Pre-Summit Networking",
        tag: "NETWORKING",
      },
    ],
  },
  {
    id: "d1-3",
    time: "9:00 AM",
    label: "OPENING CEREMONY",
    sessions: [
      {
        id: "d1-3-1",
        time: "9:00 AM",
        stage: "MAIN STAGE",
        title: "Official Opening Ceremony",
        subtitle: "Welcome, Dignitaries & Invocation",
        tag: "CEREMONY",
      },
    ],
  },
  {
    id: "d1-4",
    time: "9:30 AM",
    label: "KEYNOTES",
    sessions: [
      {
        id: "d1-4-1",
        time: "9:30 AM",
        stage: "MAIN STAGE - 5000+ ATTENDEES",
        title:
          "Convener's Welcome Address: The Achievers Summit Vision & State of Africa",
        tag: "KEYNOTE",
      },
    ],
  },
  {
    id: "d1-5",
    time: "10:00 AM",
    label: "OPENING KEYNOTE",
    sessions: [
      {
        id: "d1-5-1",
        time: "10:00 AM",
        stage: "MAIN STAGE",
        title: "Africa at the Crossroads - The Leadership Imperative",
        tag: "KEYNOTE",
      },
    ],
  },
  {
    id: "d1-h1",
    title: "FOUR STAGES ACTIVATE",
    subtitle:
      "Main Stage + Breakout Stages 1, 2 & 3 - all sessions are now running in parallel",
    time: "10:30 AM",
    type: "highlight",
  },
  {
    id: "d1-6",
    time: "10:30 AM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d1-6-1",
        time: "10:30 AM",
        stage: "MAIN STAGE",
        title:
          "The African Investment Thesis: Raising Capital through Venture, Angel & Private Equity",
        tag: "PANEL",
      },
      {
        id: "d1-6-2",
        time: "10:30 AM",
        stage: "BREAKOUT 1: TECH & AI",
        title: "AI Tools for African Entrepreneurs: From Prompt to Product",
        tag: "WORKSHOP",
      },
      {
        id: "d1-6-3",
        time: "10:30 AM",
        stage: "BREAKOUT 2: GOVERNANCE",
        title: "Youth, Governance & the Future of African Governance",
        tag: "PANEL",
      },
      {
        id: "d1-6-4",
        time: "10:30 AM",
        stage: "BREAKOUT 3: LEADERSHIP",
        title: "High-performance Habits: The Architecture of Sustainable Success",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d1-7",
    time: "11:00 AM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d1-7-1",
        time: "11:00 AM",
        stage: "MAIN STAGE",
        title:
          "Building for One Billion: Mindset of the Exceptional Founder & Leader",
        tag: "FIRESIDE",
      },
      {
        id: "d1-7-2",
        time: "11:00 AM",
        stage: "BREAKOUT 1: TECH & AI",
        title:
          "Fintech, Blockchain & the Architecture of African Financial Services",
        tag: "PANEL",
      },
      {
        id: "d1-7-3",
        time: "11:00 AM",
        stage: "BREAKOUT 2: MEDIA",
        title:
          "Broadcasting, Podcasting & Youtubing: The New Era of Long-form Content",
        tag: "PANEL",
      },
      {
        id: "d1-7-4",
        time: "11:00 AM",
        stage: "BREAKOUT 3: CREATIVE",
        title:
          "Design & Fashion Thinking for African Markets: Building Products That Fit Culture",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d1-h2",
    title: "NETWORKING LUNCH. EXHIBITION FLOOR FULLY ACTIVE",
    subtitle:
      "1 hour - sponsored lunch - open floor networking - exhibition demos, sampling & brand activations - facilitated speed networking tables",
    time: "11:40 AM",
    type: "highlight",
  },
  {
    id: "d1-8",
    time: "12:40 PM",
    label: "4 STAGES - AFTERNOON ROUND 1",
    sessions: [
      {
        id: "d1-8-1",
        time: "12:40 PM",
        stage: "MAIN STAGE",
        title: "Women in Power: Ambition, Action & Access in Modern Africa",
        tag: "PANEL",
      },
      {
        id: "d1-8-2",
        time: "12:40 PM",
        stage: "BREAKOUT 1: BUSINESS",
        title:
          "Pan-African Trade & the AfCFTA Opportunity: A Practical Business Briefing",
        tag: "PANEL",
      },
      {
        id: "d1-8-3",
        time: "12:40 PM",
        stage: "BREAKOUT 2: GOVERNANCE",
        title:
          "Civic Technology & Citizen Participation: Can Apps Fix Governance?",
        tag: "FIRESIDE",
      },
      {
        id: "d1-8-4",
        time: "12:40 PM",
        stage: "BREAKOUT 3: LEADERSHIP",
        title: "The Future of Work: Remote, Hybrid & the Gig Economy in Africa",
        tag: "WORKSHOP",
      },
    ],
  },
  {
    id: "d1-9",
    time: "1:05 PM",
    label: "4 STAGES - AFTERNOON ROUND 1",
    sessions: [
      {
        id: "d1-9-1",
        time: "1:05 PM",
        stage: "MAIN STAGE",
        title:
          "Becoming the Leader You Dream To Be: Building the Mindset, Discipline, and Confidence for Global Influence",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-9-2",
        time: "1:05 PM",
        stage: "BREAKOUT 1: MEDIA & STORYTELLING",
        title:
          "Monetising African Narratives: IP Rights, Licensing & Global Distribution",
        tag: "WORKSHOP",
      },
      {
        id: "d1-9-3",
        time: "1:05 PM",
        stage: "BREAKOUT 2: GOVERNANCE & POLICY",
        title:
          "Fighting Systemic Corruption: Ideology and Character of the Emerging Leader",
        tag: "PANEL SESSION",
      },
      {
        id: "d1-9-4",
        time: "1:05 PM",
        stage: "BREAKOUT 3: CREATIVE ECONOMY",
        title:
          "Music, Film & Comedy: How African Culture Became a Global Economic Force",
        tag: "PANEL SESSION",
      },
    ],
  },
  {
    id: "d1-h3",
    title: "FOUR STAGES ACTIVATE",
    subtitle: "Afternoon Round 2 - all stages active",
    time: "01:45 PM",
    type: "highlight",
  },
  {
    id: "d1-10",
    time: "1:45 PM",
    label: "4 STAGES - AFTERNOON ROUND 2",
    sessions: [
      {
        id: "d1-10-1",
        time: "1:45 PM",
        stage: "MAIN STAGE",
        title:
          "Building Entrepreneurial Ecosystems for Global Impact: Innovation, Policy, and Youth-Led Transformation",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-10-2",
        time: "1:45 PM",
        stage: "BREAKOUT 1: TECH & AI",
        title: "Africa's SaaS Revolution: Products Built for the Continent",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-10-3",
        time: "1:45 PM",
        stage: "BREAKOUT 2: BUSINESS & FINANCE",
        title: "Passion, Purpose or Paycheck: What Should Drive Your Decisions?",
        tag: "PANEL SESSION",
      },
      {
        id: "d1-10-4",
        time: "1:45 PM",
        stage: "BREAKOUT 3: LEADERSHIP & EDUCATION",
        title: "Financial Literacy & Wealth Architecture: Building Assets in Africa",
        tag: "FIRESIDE CHAT",
      },
    ],
  },
  {
    id: "d1-11",
    time: "2:10 PM",
    label: "4 STAGES - AFTERNOON ROUND 2",
    sessions: [
      {
        id: "d1-11-1",
        time: "2:10 PM",
        stage: "MAIN STAGE",
        title: "Reinventing Yourself: Navigating Transitions in Career, Skill and Life",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-11-2",
        time: "2:10 PM",
        stage: "BREAKOUT 1: TECH & AI",
        title: "Tech Ecosystems in Africa: Who's Winning & What It Takes to Compete",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-11-3",
        time: "2:10 PM",
        stage: "BREAKOUT 2: MEDIA & STORYTELLING",
        title: "African Media in the AI Age: Opportunity, Threat or Transformation?",
        tag: "PANEL SESSION",
      },
      {
        id: "d1-11-4",
        time: "2:10 PM",
        stage: "BREAKOUT 3: LEADERSHIP & EDUCATION",
        title: "Purpose, Calling & the Anatomy of a Meaningful Career",
        tag: "FIRESIDE CHAT",
      },
    ],
  },
  {
    id: "d1-h4",
    title: "PLENARY KEYNOTE + 3 CONCURRENT BREAKOUTS",
    subtitle: "Main stage - breakout stages 1, 2 & 3",
    time: "02:35 PM",
    type: "highlight",
  },
  {
    id: "d1-12",
    time: "2:35 PM",
    label: "PLENARY KEYNOTE - 3 CONCURRENT BREAKOUTS",
    sessions: [
      {
        id: "d1-12-1",
        time: "2:35 PM",
        stage: "MAIN STAGE",
        title:
          "Dream Big, Start Small, Finish Strong: Lessons from a Life of Purpose and Excellence",
        tag: "KEYNOTE",
      },
      {
        id: "d1-12-2",
        time: "2:35 PM",
        stage: "BREAKOUT 1: GOVERNANCE & POLICY",
        title: "Fixing the Political Eco-system: Government & Citizens Role",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-12-3",
        time: "2:35 PM",
        stage: "BREAKOUT 2: LEADERSHIP & EDUCATION",
        title:
          "Scaling African Enterprises Across Borders: Currency Risk, Culture & Capital",
        tag: "PANEL SESSION",
      },
      {
        id: "d1-12-4",
        time: "2:35 PM",
        stage: "BREAKOUT 3: MEDIA & STORYTELLING",
        title: "The Art of Storytelling: Creating High Value Content",
        tag: "PANEL SESSION",
      },
    ],
  },
  {
    id: "d1-h5",
    title: "INVESTOR PANEL + STARTUP PITCH SHOWCASE + BREAKOUT",
    subtitle: "Main stage - breakout stages 1, 2 & 3",
    time: "03:05 PM",
    type: "highlight",
  },
  {
    id: "d1-13",
    time: "3:05 PM",
    label: "INVESTOR PANEL - STARTUP PITCH SHOWCASE - BREAKOUT",
    sessions: [
      {
        id: "d1-13-1",
        time: "3:05 PM",
        stage: "MAIN STAGE",
        title:
          "Redefining the African Narrative: Faith, Identity, and Leadership in Nation Building",
        tag: "KEYNOTE",
      },
      {
        id: "d1-13-2",
        time: "3:05 PM",
        stage: "BREAKOUT 1: PITCH SHOWCASE",
        title: "Africa's Next Big Ideas: Live Startup Pitch Showcase",
        tag: "SHOWCASE",
      },
      {
        id: "d1-13-3",
        time: "3:05 PM",
        stage: "BREAKOUT 2: CREATIVE ECONOMY",
        title: "The Business of Influence: Creators, Culture & Digital Power",
        tag: "FIRESIDE CHAT",
      },
      {
        id: "d1-13-4",
        time: "3:05 PM",
        stage: "BREAKOUT 3: BUSINESS & FINANCE",
        title: "Forex & Crypto in Africa: Opportunities, Risks & Regulations",
        tag: "PANEL SESSION",
      },
    ],
  },
  {
    id: "d1-h6",
    title: "PANEL SESSION",
    subtitle: "Main stage & breakout sessions",
    time: "03:35 PM",
    type: "highlight",
  },
  {
    id: "d1-14",
    time: "3:35 PM",
    label: "MAIN STAGE & BREAKOUT SESSIONS",
    sessions: [
      {
        id: "d1-14-1",
        time: "3:35 PM",
        stage: "MAIN STAGE",
        title: "Audience Q&A - Segment A",
        tag: "Q&A",
      },
      {
        id: "d1-14-2",
        time: "3:35 PM",
        stage: "BREAKOUT SESSIONS",
        title: "Audience Q&A - Segment B",
        tag: "Q&A",
      },
    ],
  },
  {
    id: "d1-h7",
    title: "ACHIEVERS SUMMIT 2027 - OFFICIAL UNVEILING",
    subtitle: "Unveiling",
    time: "04:20 PM",
    type: "highlight",
  },
];

export const day2Schedule: ScheduleItem[] = [
  {
    id: "d2-1",
    time: "9:00 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-1-1",
        time: "9:00 AM",
        stage: "MAIN STAGE",
        title: "Day 2 Opening Address - Good Morning Africa, Are You Ready?",
        tag: "ADDRESS",
      },
    ],
  },
  {
    id: "d2-2",
    time: "9:15 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-2-1",
        time: "9:15 AM",
        stage: "MAIN STAGE",
        title:
          "How To Acquire To Grow Big, Stabilize, Build and Multiply Legacy",
        tag: "KEYNOTE",
      },
    ],
  },
  {
    id: "d2-3",
    time: "9:45 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-3-1",
        time: "9:45 AM",
        stage: "MAIN STAGE",
        title: "Audience Q&A - Segment A",
        tag: "Q&A",
      },
    ],
  },
  {
    id: "d2-4",
    time: "10:00 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-4-1",
        time: "10:00 AM",
        stage: "MAIN STAGE",
        title: "The Achievers in Residence",
        tag: "SPECIAL",
      },
    ],
  },
  {
    id: "d2-5",
    time: "10:30 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-5-1",
        time: "10:30 AM",
        stage: "MAIN STAGE",
        title: "The Founders Playbook - Segment A",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d2-6",
    time: "11:00 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d2-6-1",
        time: "11:00 AM",
        stage: "MAIN STAGE",
        title:
          "Fireside Chat with Your Favourite Content Creators: Digital Storytelling and Monetisation",
        tag: "FIRESIDE",
      },
    ],
  },
  {
    id: "d2-h1",
    title: "DAY 2 PANEL SITTING",
    subtitle: "Main stage - all attendees",
    time: "11:30 AM",
    type: "highlight",
  },
  {
    id: "d2-7",
    time: "11:30 AM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d2-7-1",
        time: "11:30 AM",
        stage: "MAIN STAGE",
        title: "The Power of Vision: Envisioning a Life of Meeting",
        tag: "KEYNOTE",
      },
      {
        id: "d2-7-2",
        time: "11:30 AM",
        stage: "BREAKOUT 1",
        title: "Audience Q&A - Segment B",
        tag: "Q&A",
      },
    ],
  },
  {
    id: "d2-8",
    time: "12:00 PM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d2-8-1",
        time: "12:00 PM",
        stage: "MAIN STAGE",
        title: "Conversations About Advocacy in Parenting and Education",
        tag: "PANEL",
      },
      {
        id: "d2-8-2",
        time: "12:00 PM",
        stage: "BREAKOUT 1",
        title: "Grassroots Innovation: Using Technology for Community Development",
        tag: "WORKSHOP",
      },
    ],
  },
  {
    id: "d2-9",
    time: "12:30 PM",
    label: "SPECIAL SESSION",
    sessions: [
      {
        id: "d2-9-1",
        time: "12:30 PM",
        stage: "MAIN STAGE",
        title: "Smart Conversations About Advocacy in Education Funding",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d2-h2",
    title: "MIDPOINT AWARDS PROGRAMME",
    subtitle: "Awards ceremony celebrating outstanding African achievers",
    time: "01:00 PM",
    type: "highlight",
  },
  {
    id: "d2-10",
    time: "1:30 PM",
    label: "AFTERNOON",
    sessions: [
      {
        id: "d2-10-1",
        time: "1:30 PM",
        stage: "MAIN STAGE",
        title: "Moving photography of all 500 accredited Package",
        tag: "SPECIAL",
      },
    ],
  },
];

export const day3Schedule: ScheduleItem[] = [
  {
    id: "d3-1",
    time: "9:00 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d3-1-1",
        time: "9:00 AM",
        stage: "MAIN STAGE",
        title: "Photography/Media & Welcome",
        tag: "REGISTRATION",
      },
    ],
  },
  {
    id: "d3-2",
    time: "9:15 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d3-2-1",
        time: "9:15 AM",
        stage: "MAIN STAGE",
        title: "Convener's Year in Focus - Verification 2026 in Review",
        tag: "ADDRESS",
      },
    ],
  },
  {
    id: "d3-3",
    time: "9:30 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d3-3-1",
        time: "9:30 AM",
        stage: "MAIN STAGE",
        title: "Panel: Manager",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d3-4",
    time: "10:00 AM",
    label: "MORNING - MAIN STAGE",
    sessions: [
      {
        id: "d3-4-1",
        time: "10:00 AM",
        stage: "MAIN STAGE",
        title:
          "The Founders & Builders: In-Depth Builder-Focus Maker-Maps",
        tag: "PANEL",
      },
    ],
  },
  {
    id: "d3-h1",
    title: "DISCOVERY, SPEAKERS & PITCHES",
    subtitle: "Main stage - breakout stages",
    time: "10:30 AM",
    type: "highlight",
  },
  {
    id: "d3-5",
    time: "10:30 AM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d3-5-1",
        time: "10:30 AM",
        stage: "MAIN STAGE",
        title: "Main Stage Keynote on Philanthropy & Volunteering",
        tag: "KEYNOTE",
      },
      {
        id: "d3-5-2",
        time: "10:30 AM",
        stage: "BREAKOUT 1",
        title:
          "Startup pitch contest: Startups/Foundations Offering Solutions",
        tag: "PITCH",
      },
    ],
  },
  {
    id: "d3-6",
    time: "11:00 AM",
    label: "4 STAGES - PARALLEL SESSIONS",
    sessions: [
      {
        id: "d3-6-1",
        time: "11:00 AM",
        stage: "MAIN STAGE",
        title:
          "Panel on Social Innovation and Impact: Entrepreneurship as Problem-Solving",
        tag: "PANEL",
      },
      {
        id: "d3-6-2",
        time: "11:00 AM",
        stage: "BREAKOUT 1",
        title: "Community Innovation Award: Advocate for the Underclass",
        tag: "AWARD",
      },
    ],
  },
  {
    id: "d3-h2",
    title: "GALA & AWARD NIGHT BEGINS",
    subtitle: "Red carpet, cocktails, dinner",
    time: "06:00 PM",
    type: "highlight",
  },
  {
    id: "d3-7",
    time: "7:00 PM",
    label: "GALA NIGHT",
    sessions: [
      {
        id: "d3-7-1",
        time: "7:00 PM",
        stage: "MAIN STAGE",
        title: "TAS Africa 100 Awards: 100 Most Influential Achievers",
        tag: "AWARDS",
      },
      {
        id: "d3-7-2",
        time: "7:00 PM",
        stage: "MAIN STAGE",
        title: "Special Category Awards & Recognition",
        tag: "AWARDS",
      },
    ],
  },
  {
    id: "d3-8",
    time: "9:00 PM",
    label: "CLOSING",
    sessions: [
      {
        id: "d3-8-1",
        time: "9:00 PM",
        stage: "MAIN STAGE",
        title: "Achievers Concert & Closing Entertainment",
        tag: "ENTERTAINMENT",
      },
    ],
  },
];
