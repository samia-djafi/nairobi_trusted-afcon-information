import { OfficialAnnouncement } from '@/types';

export const OFFICIAL_ANNOUNCEMENTS: OfficialAnnouncement[] = [
  {
    id: 'announcement-transit-reroute',
    title: 'Nairobi County Executive Gazette #104/2026: CBD Matatu Termini Re-Routing During AFCON Fixtures',
    institution: 'Nairobi City County & Traffic Police Headquarters',
    date: '14 Sep 2026',
    category: 'transport',
    status: 'verified',
    sourceUrl: 'https://nairobi.go.ke/gazette/2026-104-transport-reroute',
    originalText: `PURSUANT TO SECTION 47 OF THE NAIROBI CITY COUNTY TRANSPORT MANAGEMENT ACT, 2024, NOTICE IS HEREBY GIVEN THAT ON ALL DESIGNATED MATCH DAYS OF THE 36TH EDITION OF THE TOTALENERGIES CONFEDERATION OF AFRICAN FOOTBALL (CAF) AFRICA CUP OF NATIONS 2027:
1. All Public Service Vehicles (PSVs) plying the Ngong Road, Langata Road, and Mombasa Road corridors are hereby prohibited from terminating at Kencom and Ambassador bus stops between the hours of 1100 hours and 2300 hours.
2. Termini for Thika Superhighway PSVs (SACCOs including Super Metro, Forward, and Lopha) shall temporarily relocate to Green Park Terminus and Railways Club Grounds to preserve Central CBD pedestrian flows.
3. Designated Match Shuttle vehicles bearing official LOC Barcode Credentials are exempt from this restriction. Any non-compliant commercial conveyance shall be subject to immediate immobilisation and statutory impound penalties pursuant to Section 52.`,
    plainExplanation: 'On match days, regular Matatus that normally drop passengers at Kencom and Ambassador in the center of town are moved to Green Park Terminus and the Railways Club. This clears space for safe walking corridors and official tournament fan buses.',
    keyPoints: [
      'Normal city buses/matatus will NOT drop passengers at Kencom or Ambassador on match days from 11:00 AM to 11:00 PM.',
      'Passengers must board and disembark at Green Park Terminus or Nairobi Railways Club.',
      'Only official tournament shuttles with special barcoded permits can enter the central stadium loop.',
      'Towing and fines apply to unauthorized matatus entering restricted zones.'
    ],
    whoIsAffected: 'All daily commuters, fans, and Matatu operators traveling into or through Nairobi CBD on AFCON match days.',
    whenItApplies: 'Every match day from 11:00 AM to 11:00 PM throughout the AFCON tournament period.',
    requiredAction: 'If you take a Matatu into town on a match day, plan your journey through Green Park or Railways Station instead of Kencom, or switch to the free tournament fan shuttles.',
  },
  {
    id: 'announcement-moh-health-protocol',
    title: 'Ministry of Health Directive #44/2026: AFCON Border Health & Vaccination Screening Protocol',
    institution: 'Ministry of Health Kenya (Port Health Directorate)',
    date: '08 Sep 2026',
    category: 'public_services',
    status: 'verified',
    sourceUrl: 'https://health.go.ke/directives/afcon-border-health-44',
    originalText: `IN ACCORDANCE WITH THE PUBLIC HEALTH ACT (CAP 242) AND THE INTERNATIONAL HEALTH REGULATIONS (IHR 2005), THE MINISTRY OF HEALTH HEREBY DIRECTS ALL INBOUND TRAVELERS AND SPECTATORS ENTERING THE REPUBLIC OF KENYA FOR THE TOTALENERGIES AFCON 2027 TO OBSERVE THE FOLLOWING STATUTORY REQUIREMENTS:
1. Proof of Yellow Fever vaccination administered at least ten (10) calendar days prior to port arrival is strictly mandatory for all travelers arriving from or transiting for greater than 12 hours through endemic zones.
2. Inbound spectators must furnish a completed digital health declaration via the Jitenge AFCON Portal (jitenge.health.go.ke) within seventy-two (72) hours prior to embarkation.
3. Rapid vaccination stations will be maintained at Jomo Kenyatta International Airport (JKIA), Kisumu International Airport, and Moyale Border Post at a subsidized cost of USD $15 for non-citizens lacking valid certificates.`,
    plainExplanation: 'If you are coming into Kenya from a country with yellow fever risk, you must have your Yellow Fever vaccine card. You must also fill out the free online Jitenge Health Form before your flight. If you forgot your yellow fever shot, you can get vaccinated right at JKIA airport for $15.',
    keyPoints: [
      'Yellow fever certificate is mandatory if traveling from or through risk countries (must be taken at least 10 days before).',
      'Everyone flying into Kenya must fill out the free online Jitenge AFCON form before boarding.',
      'Free from COVID-19 PCR testing or quarantine requirements.',
      'Emergency yellow fever shots are available 24/7 at JKIA Terminal 1A for $15 if you arrive without one.'
    ],
    whoIsAffected: 'All international visitors, football fans, media delegations, and returning residents flying into Kenya for AFCON.',
    whenItApplies: 'Immediate effect, active 24/7 at all Kenyan border entry points throughout the tournament.',
    requiredAction: 'Fill out the Jitenge form online at jitenge.health.go.ke within 3 days of your flight and keep your yellow fever card with your passport.',
  },
  {
    id: 'announcement-talanta-gate-rules',
    title: 'Sports Kenya & CAF Notice #18: Talanta Sports City Fan Access & Prohibited Articles Order',
    institution: 'Sports Kenya & CAF Safety Committee',
    date: '11 Sep 2026',
    category: 'venues',
    status: 'verified',
    sourceUrl: 'https://sportskenya.org/talanta-safety-announcement-18',
    originalText: `IN ACCORDANCE WITH CAF STADIUM CODE ARTICLE 14 AND THE NATIONAL SPORTS ACT, SPECTATOR ENTRY TO TALANTA SPORTS CITY (JAMHURI GROUNDS) IS GOVERNED BY THE FOLLOWING MANDATORY OPERATIONAL RESTRICTIONS:
1. Turnstiles will open precisely five (5) hours prior to official kickoff and will securely lock forty-five (45) minutes prior to kickoff for opening ceremonies. No late admission is permitted under any circumstances.
2. Prohibited Items: Umbrellas exceeding 30cm collapsed length; solid metal or glass water containers; sound amplifiers or megaphones exceeding 85 decibels; commercial recording paraphernalia; laser pointers; pets and domestic animals.
3. Permitted Items: Small transparent bags (under 21x30cm), personal cell phones, prescription drugs in manufacturer packaging, non-pointed cultural horn instruments (Vuvuzela) measuring under 40cm made of pliable plastic.`,
    plainExplanation: 'Gates at Talanta Sports City open 5 hours before the match and lock 45 minutes before kickoff. Big backpacks, glass bottles, metal umbrellas, and laser pointers are banned. Clear small bags and plastic vuvuzelas are welcome.',
    keyPoints: [
      'Gates open 5 hours before kickoff; they CLOSE 45 minutes before kickoff—do not arrive late!',
      'No backpacks or large bags; only small clear bags or clutches allowed.',
      'No glass, cans, or metal umbrellas.',
      'Plastic vuvuzelas under 40cm are allowed.',
      'Every ticket holder must show original photo ID matching the name on their digital ticket.'
    ],
    whoIsAffected: 'All ticket holders attending matches at Talanta Sports City.',
    whenItApplies: 'All match days at Talanta Sports City.',
    requiredAction: 'Arrive at least 2 hours before kickoff, bring your original ID, leave big bags at home, and bring only transparent personal pouches.',
  }
];
