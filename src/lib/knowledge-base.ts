import { AFCONInfoItem, NotificationAlert, Language, Category } from '@/types';

export const AFCON_KNOWLEDGE_BASE: AFCONInfoItem[] = [
  {
    id: 'talanta-road-closures',
    title: 'Is the road to Talanta Sports City closed on match days?',
    category: 'transport',
    summary: 'Ngong Road remains open for regular traffic, but the direct Jamhuri access loops are restricted to accredited AFCON shuttle buses and emergency vehicles only on match days.',
    fullAnswer: 'According to the Kenya National Highways Authority (KeNHA) and Nairobi City County, Ngong Road dual carriageway will operate under managed lane controls during match days at Talanta Sports City. Private vehicles without pre-booked stadium VIP or disabled parking passes are diverted at the Adams Arcade and Dagoretti Corner junctions. Spectators are strongly advised to utilize the official Park-and-Ride shuttle services operating from Nairobi Railways Club and the Carnivore Grounds.',
    status: 'verified',
    statusReason: 'Official gazette notice verified against KeNHA Transit Advisory #2026/08.',
    source: {
      institution: 'Kenya National Highways Authority (KeNHA)',
      department: 'Nairobi Urban Roads & Traffic Control Directorate',
      publishedDate: '12 Sep 2026',
      lastVerifiedDate: '18 Sep 2026',
      sourceUrl: 'https://kenha.co.ke/advisories/afcon2027-talanta-traffic',
      officialDocReference: 'KENHA/TRF/AFCON-TAL/04',
      auditTrail: [
        { stage: 'Published by KeNHA', timestamp: '12 Sep 2026, 09:00 EAT', note: 'Public gazette notice posted.' },
        { stage: 'Verified by Civic Monitor', timestamp: '15 Sep 2026, 14:30 EAT', note: 'Confirmed with Nairobi County Traffic Marshals.' },
        { stage: 'Freshness Check', timestamp: '18 Sep 2026, 08:00 EAT', note: 'No route amendments issued. Status remains Verified.' }
      ]
    },
    nextSteps: [
      { label: 'View Shuttle Pick-Up Points', actionType: 'route', target: '/browse?category=transport', isPrimary: true },
      { label: 'Official KeNHA Notice', actionType: 'link', target: 'https://kenha.co.ke' },
      { label: 'Report Traffic Incident', actionType: 'report', target: '/report?type=safety&venue=talanta' }
    ],
    tags: ['transport', 'talanta', 'roads', 'ngong-road', 'shuttle', 'closures'],
    relatedQuestionIds: ['free-public-transport', 'talanta-parking-rules', 'expressway-fan-shuttles'],
    lastUpdatedRelative: '6 hours ago'
  },
  {
    id: 'free-public-transport',
    title: 'Is public transport free on AFCON match days?',
    category: 'transport',
    summary: 'Public transport on standard Matatus is not free, but Nairobi Commuter Rail and official AFCON Fan Shuttles are 100% free for verified match ticket holders.',
    fullAnswer: 'Regular privately-operated Matatus (such as Super Metro, City Shuttle, and Forward Travellers) charge standard zoned fares. However, the Government of Kenya in partnership with the AFCON Local Organising Committee provides free tournament transit on the Nairobi Commuter Rail (between Nairobi Central Station and Kasarani / Dandora Hubs) and official electric Fan Shuttles running between designated CBD staging points and stadium gates. You must show a valid digital or printed match ticket for that day.',
    status: 'verified',
    statusReason: 'Joint press communique confirmed by Kenya Railways Corporation and the Ministry of Transport.',
    source: {
      institution: 'Ministry of Roads and Transport / Kenya Railways',
      department: 'AFCON Transport Liaison Office',
      publishedDate: '01 Sep 2026',
      lastVerifiedDate: '17 Sep 2026',
      sourceUrl: 'https://transport.go.ke/afcon-fan-mobility-protocols',
      officialDocReference: 'MRT/AFCON/MOU-2026-B',
      auditTrail: [
        { stage: 'MOU Ratified', timestamp: '01 Sep 2026', note: 'Kenya Railways & CAF agreement finalized.' },
        { stage: 'Ticketing Integration Verified', timestamp: '17 Sep 2026', note: 'QR ticket scanners installed at Central Station.' }
      ]
    },
    nextSteps: [
      { label: 'Train Schedule & Stations', actionType: 'route', target: '/browse?category=transport', isPrimary: true },
      { label: 'Kenya Railways Official Portal', actionType: 'link', target: 'https://krc.co.ke' }
    ],
    tags: ['transport', 'matatu', 'train', 'free', 'tickets', 'shuttles'],
    relatedQuestionIds: ['talanta-road-closures', 'expressway-fan-shuttles', 'kasarani-train-link'],
    lastUpdatedRelative: '1 day ago'
  },
  {
    id: 'emergency-contacts-hotline',
    title: 'What are the official emergency numbers during AFCON 2027 in Nairobi?',
    category: 'safety',
    summary: 'The primary national emergency line is 999 or 112. For rapid medical evacuation, Kenya Red Cross operates 1199 (toll-free). The AFCON Fan Safety Operations Centre is reach at 0800 724 999.',
    fullAnswer: 'Kenya has consolidated emergency dispatch for the tournament. In any immediate life-safety or security emergency, dial 999 or 112 from any mobile carrier (free of charge). For direct paramedic and ambulance assistance, call the Kenya Red Cross Society on 1199. For tourists and international fans needing embassy liaison or consular safety reporting, the Diplomatic Police & Tourist Safety Bureau hotline is +254 20 2222181.',
    status: 'verified',
    statusReason: 'Verified directly with the National Police Service & Kenya Red Cross Disaster Management team.',
    source: {
      institution: 'National Police Service & Kenya Red Cross Society',
      department: 'Joint Operations Command Centre (JOCC Nairobi)',
      publishedDate: '15 Aug 2026',
      lastVerifiedDate: '18 Sep 2026',
      sourceUrl: 'https://nationalpolice.go.ke/afcon-safety-command',
      officialDocReference: 'NPS/OPS/AFCON/2026-EMG',
      auditTrail: [
        { stage: 'Emergency Protocol Deployed', timestamp: '15 Aug 2026', note: 'Tri-agency toll-free lines activated.' },
        { stage: 'Weekly Test Call Verification', timestamp: '18 Sep 2026', note: 'Average answering latency: 4.2 seconds.' }
      ]
    },
    nextSteps: [
      { label: 'Open Emergency Dial Directory', actionType: 'call', target: '/emergency', isPrimary: true },
      { label: 'Call 999 Direct', actionType: 'call', target: 'tel:999' },
      { label: 'Call Red Cross 1199', actionType: 'call', target: 'tel:1199' }
    ],
    tags: ['safety', 'emergency', 'police', 'ambulance', 'hotline', 'red-cross'],
    relatedQuestionIds: ['stadium-medical-posts', 'lost-found-safety', 'report-issue'],
    lastUpdatedRelative: '3 hours ago'
  },
  {
    id: 'kasarani-gate-bag-policy',
    title: 'Can I bring water bottles, bags, or power banks into Kasarani Stadium?',
    category: 'venues',
    summary: 'Bags larger than A4 size (approx. 21cm x 30cm) and non-sealed glass or metal liquid containers are strictly forbidden. Sealed transparent plastic bottles (up to 500ml) and small power banks are permitted.',
    fullAnswer: 'Under CAF and Kenya Stadium Safety regulations, all attendees must pass through security magnetometers and bag-check scanners at Kasarani Gates A, B, C, and D. Allowed items: Small clutch bags or clear bags under 21cm x 30cm, small cell phone power banks (under 20,000 mAh), sealed plastic water bottles up to 500ml (caps will be removed at gates), prescription medication in original containers. Prohibited items: Backpacks, umbrellas with pointed metal tips, flags on wooden poles exceeding 1 meter, commercial video cameras, flares, and outside alcohol.',
    status: 'verified',
    statusReason: 'Updated in accordance with CAF Tournament Safety Manual Article 14.',
    source: {
      institution: 'CAF / Sports Kenya',
      department: 'Stadium Security & Access Operations',
      publishedDate: '05 Sep 2026',
      lastVerifiedDate: '16 Sep 2026',
      sourceUrl: 'https://sportskenya.org/kasarani-afcon-guidelines',
      officialDocReference: 'SK/KAS/SEC-REG-09',
      auditTrail: [
        { stage: 'Manual Approved by CAF', timestamp: '05 Sep 2026', note: 'Standardised with continental safety criteria.' },
        { stage: 'Inspectorate Drill', timestamp: '16 Sep 2026', note: 'Checkpoints audited with GSU & private stewards.' }
      ]
    },
    nextSteps: [
      { label: 'Full Prohibited Items List', actionType: 'route', target: '/browse?category=venues', isPrimary: true },
      { label: 'Luggage Storage Lockers', actionType: 'route', target: '/browse?category=venues' }
    ],
    tags: ['venues', 'kasarani', 'security', 'bags', 'water', 'prohibited-items'],
    relatedQuestionIds: ['talanta-parking-rules', 'id-requirements-stadium', 'emergency-contacts-hotline'],
    lastUpdatedRelative: '2 days ago'
  },
  {
    id: 'id-requirements-stadium',
    title: 'Do I need a National ID or Passport to enter AFCON stadiums?',
    category: 'venues',
    summary: 'Yes. Every match ticket is digitally linked to an identity document. Kenyan citizens must present original National ID, Alien ID, or Maisha Card; international visitors must present their Passport.',
    fullAnswer: 'To eradicate ticket scalping and ensure stadium accountability, the CAF Local Organising Committee enforces nominal ticketing. The name on your digital match ticket QR code must match your government-issued photo identification. Copies or mobile screenshots of IDs are not accepted at the primary turnstiles unless registered through the official eCitizen / Maisha Namba digital portal.',
    status: 'verified',
    statusReason: 'Verified by Ministry of Interior and National Administration Directive.',
    source: {
      institution: 'Ministry of Interior / AFCON LOC',
      department: 'Immigration & Civil Registration Desk',
      publishedDate: '20 Aug 2026',
      lastVerifiedDate: '17 Sep 2026',
      sourceUrl: 'https://interior.go.ke/afcon-id-verification-mandate',
      officialDocReference: 'MININT/SEC/AFCON/012',
      auditTrail: [
        { stage: 'Directive Issued', timestamp: '20 Aug 2026', note: 'Gazetted by Cabinet Secretary.' },
        { stage: 'System Sync Check', timestamp: '17 Sep 2026', note: 'Turnstile scanners connected to eCitizen registry.' }
      ]
    },
    nextSteps: [
      { label: 'Check Ticket Name Matching', actionType: 'link', target: 'https://cafonline.com' },
      { label: 'Foreign Fan Consular Help', actionType: 'route', target: '/browse?category=public_services' }
    ],
    tags: ['venues', 'tickets', 'id', 'passport', 'maisha-card', 'regulations'],
    relatedQuestionIds: ['kasarani-gate-bag-policy', 'fan-zone-uhuru-park', 'talanta-parking-rules'],
    lastUpdatedRelative: '1 day ago'
  },
  {
    id: 'expressway-fan-shuttles',
    title: 'How does the Nairobi Expressway AFCON Fan Shuttle operate?',
    category: 'transport',
    summary: 'Dedicated express electric buses run non-stop along the Nairobi Expressway between Jomo Kenyatta International Airport (JKIA), Museum Hill (CBD), and Kasarani / Talanta interchange hubs.',
    fullAnswer: 'The Nairobi Expressway Authority (Moja EV / KeNHA) has designated Lane 1 as an exclusive AFCON Rapid Transit corridor during tournament days. Electric high-capacity buses depart every 7 minutes during peak hours (3 hours before and after matches). Journey time from JKIA to Westlands/Museum Hill is reduced to 18 minutes, and Westlands to Kasarani bypass is under 22 minutes. Ticket holders travel at subsidized capped fares or free with matchday transit passes.',
    status: 'recently_updated',
    statusReason: 'Route timetable revised on 17 Sep 2026 to increase evening departure frequency following late fixture kick-offs.',
    source: {
      institution: 'Moja Expressway / KeNHA',
      department: 'Transit Operations Bureau',
      publishedDate: '28 Aug 2026',
      lastVerifiedDate: '17 Sep 2026',
      sourceUrl: 'https://nairobiexpressway.ke/afcon-transit-lanes',
      officialDocReference: 'MOJA/AFCON/2026/TIM-03',
      auditTrail: [
        { stage: 'Initial Timetable', timestamp: '28 Aug 2026', note: 'Initial bus schedule launched.' },
        { stage: 'Route Adjustment', timestamp: '17 Sep 2026', note: 'Added 40 additional electric articulated buses for evening matches.' }
      ]
    },
    nextSteps: [
      { label: 'Expressway Shuttle Timetable', actionType: 'route', target: '/browse?category=transport', isPrimary: true },
      { label: 'Expressway Official Portal', actionType: 'link', target: 'https://nairobiexpressway.ke' }
    ],
    tags: ['transport', 'expressway', 'shuttle', 'airport', 'jkia', 'bus'],
    relatedQuestionIds: ['talanta-road-closures', 'free-public-transport', 'kasarani-train-link'],
    lastUpdatedRelative: '18 hours ago'
  },
  {
    id: 'fan-zone-uhuru-park',
    title: 'Are there official AFCON Fan Zones in Nairobi for non-ticket holders?',
    category: 'public_services',
    summary: 'Yes, Nairobi City County has established three free official Fan Parks: Uhuru Park (Central), Nairobi Arboretum (Westlands), and Jacaranda Grounds (Eastlands).',
    fullAnswer: 'For fans without stadium match tickets, the County Government of Nairobi operates vibrant, family-friendly AFCON Fan Festivals. Uhuru Park features two 80-meter 4K LED screens, licensed food and handicraft stalls, live performances by Kenyan and continental artists, secure children play zones, and free municipal Wi-Fi. Entry is 100% free with airport-style security screening at park perimeters.',
    status: 'verified',
    statusReason: 'Confirmed by Nairobi City County Department of Sports, Youth and Social Services.',
    source: {
      institution: 'Nairobi City County Government',
      department: 'Department of Talents, Skills & Sports',
      publishedDate: '08 Sep 2026',
      lastVerifiedDate: '16 Sep 2026',
      sourceUrl: 'https://nairobi.go.ke/afcon-fan-festivals',
      officialDocReference: 'NCC/TSS/AFCON/FZ-2026',
      auditTrail: [
        { stage: 'Fan Park Locations Announced', timestamp: '08 Sep 2026', note: 'Three venues gazetted.' },
        { stage: 'Security & Sanitation Audit', timestamp: '16 Sep 2026', note: 'County Inspectorate approved lighting & emergency exits.' }
      ]
    },
    nextSteps: [
      { label: 'View Fan Festival Schedules', actionType: 'route', target: '/browse?category=public_services', isPrimary: true },
      { label: 'Nairobi County Civic Portal', actionType: 'link', target: 'https://nairobi.go.ke' }
    ],
    tags: ['public_services', 'fan-zones', 'uhuru-park', 'celebration', 'screens', 'music'],
    relatedQuestionIds: ['health-entry-requirements', 'emergency-contacts-hotline', 'id-requirements-stadium'],
    lastUpdatedRelative: '2 days ago'
  },
  {
    id: 'health-entry-requirements',
    title: 'What health inoculations or certificates are required for AFCON visitors?',
    category: 'public_services',
    summary: 'Yellow fever vaccination certificate is mandatory for travelers arriving from endemic areas. No COVID-19 quarantine or PCR testing is currently required.',
    fullAnswer: 'The Ministry of Health Kenya requires proof of Yellow Fever vaccination if arriving from countries with risk of yellow fever transmission (certificate valid if administered at least 10 days prior). All international attendees must complete the free online "Jitenge AFCON" Health Declaration via the Ministry portal before boarding their flights. Polio vaccination boosters are advised but not compulsory for incoming fans.',
    status: 'verified',
    statusReason: 'Ministry of Health Disease Surveillance & Port Health Advisory #44/2026.',
    source: {
      institution: 'Ministry of Health Kenya (MoH)',
      department: 'Port Health & Disease Surveillance Division',
      publishedDate: '10 Aug 2026',
      lastVerifiedDate: '15 Sep 2026',
      sourceUrl: 'https://health.go.ke/afcon-port-health-guidelines',
      officialDocReference: 'MOH/DSR/AFCON/V-2',
      auditTrail: [
        { stage: 'Advisory Published', timestamp: '10 Aug 2026', note: 'WHO collaborative review complete.' },
        { stage: 'Border Re-check', timestamp: '15 Sep 2026', note: 'JKIA digital scanner systems validated.' }
      ]
    },
    nextSteps: [
      { label: 'Complete Jitenge Health Form', actionType: 'link', target: 'https://health.go.ke' },
      { label: 'Nearest Travel Clinic Locations', actionType: 'route', target: '/browse?category=public_services' }
    ],
    tags: ['public_services', 'health', 'yellow-fever', 'vaccine', 'airport', 'entry'],
    relatedQuestionIds: ['emergency-contacts-hotline', 'stadium-medical-posts'],
    lastUpdatedRelative: '3 days ago'
  },
  {
    id: 'talanta-parking-rules',
    title: 'Can I park my private car inside Talanta Sports City?',
    category: 'venues',
    summary: 'No unreserved parking is allowed within 1.5 km of Talanta Sports City on match days. Private cars must use designated Park-and-Ride facilities.',
    fullAnswer: 'Due to dense residential surroundings along Ngong Road and Jamhuri Park, private vehicle parking at Talanta Sports City is strictly reserved for tournament broadcast vans, accredited team coaches, FIFA/CAF VIP delegations, and holders of pre-purchased Accessibility (PWD) vehicle badges. Spectator vehicles will be towed if parked on roadsides or pavements along Ngong Road, Jamhuri Estate, or Kibera Link Road. Use the Carnivore Grounds or Langata Park-and-Ride with shuttle connections.',
    status: 'verified',
    statusReason: 'Nairobi City County Traffic By-laws & AFCON Security Order.',
    source: {
      institution: 'Nairobi City County & Traffic Police',
      department: 'Parking & Traffic Enforcement Unit',
      publishedDate: '03 Sep 2026',
      lastVerifiedDate: '16 Sep 2026',
      sourceUrl: 'https://nairobi.go.ke/parking/talanta-afcon-restrictions',
      officialDocReference: 'NCC/TRF/2026-TAL-PARK',
      auditTrail: [
        { stage: 'Traffic Notice Issued', timestamp: '03 Sep 2026', note: 'By-law enacted for AFCON duration.' },
        { stage: 'Signage Deployed', timestamp: '16 Sep 2026', note: 'Tow-away zone signs erected along Ngong Road.' }
      ]
    },
    nextSteps: [
      { label: 'View Park-and-Ride Map', actionType: 'route', target: '/browse?category=transport', isPrimary: true },
      { label: 'Book PWD Parking Space', actionType: 'link', target: 'https://sportskenya.org' }
    ],
    tags: ['venues', 'parking', 'talanta', 'cars', 'towing', 'transport'],
    relatedQuestionIds: ['talanta-road-closures', 'free-public-transport', 'kasarani-gate-bag-policy'],
    lastUpdatedRelative: '2 days ago'
  },
  {
    id: 'stadium-medical-posts',
    title: 'Where can I find first aid or medical assistance inside the stadiums?',
    category: 'safety',
    summary: 'Every stadium has 8 triage stations staffed by Kenya Red Cross paramedics, St John Ambulance, and doctors from Kenyatta National Hospital and Nairobi Hospital.',
    fullAnswer: 'Medical aid is stationed at every quadrant of Kasarani, Talanta, and Nyayo stadiums: Level 1 concourse behind Gates 2, 6, 11, and 18; Level 2 upper tiers; and pitch-side emergency resuscitation bays. In addition, mobile roaming two-person paramedic teams patrol aisles. In case of heat stroke, fainting, or acute medical illness, alert any safety steward in orange vests or wave to the roaming Red Cross officers. Medical care at first-aid posts is completely free of charge.',
    status: 'verified',
    statusReason: 'Accredited by the Kenya Medical Practitioners and Dentists Council (KMPDC).',
    source: {
      institution: 'Kenya Red Cross & Ministry of Health',
      department: 'AFCON Medical Services Sub-Committee',
      publishedDate: '29 Aug 2026',
      lastVerifiedDate: '18 Sep 2026',
      sourceUrl: 'https://redcross.or.ke/afcon-medical-stations',
      officialDocReference: 'KRCS/MED/AFCON-2026/01',
      auditTrail: [
        { stage: 'Medical Plan Gazetted', timestamp: '29 Aug 2026', note: 'Hospital corridors designated.' },
        { stage: 'Defibrillator Inspection', timestamp: '18 Sep 2026', note: 'All 36 AED units verified operational.' }
      ]
    },
    nextSteps: [
      { label: 'Emergency Quick Dial (1199)', actionType: 'call', target: 'tel:1199', isPrimary: true },
      { label: 'View Venue Safety Layout', actionType: 'route', target: '/browse?category=safety' }
    ],
    tags: ['safety', 'medical', 'first-aid', 'red-cross', 'hospital', 'stadium'],
    relatedQuestionIds: ['emergency-contacts-hotline', 'lost-found-safety', 'kasarani-gate-bag-policy'],
    lastUpdatedRelative: '4 hours ago'
  },
  {
    id: 'nyayo-stadium-walking-corridor',
    title: 'Can I walk from Nairobi CBD / Railways Station to Nyayo Stadium?',
    category: 'transport',
    summary: 'Yes, an exclusive 1.8km pedestrian "Pamoja Fan Walkway" connects Nairobi Central Railway Station directly to Nyayo Stadium via Aerodrome Road.',
    fullAnswer: 'The County Government of Nairobi and National Police Service have designated a fully pedestrianized, well-lit ceremonial walkway between Nairobi Central Railway Station / Haile Selassie Avenue and Nyayo National Stadium. The route is monitored by 24/7 CCTV and foot patrols, with water misting stations and live cultural percussion bands during match afternoons. Walking time is approximately 14 to 18 minutes at normal pace.',
    status: 'verified',
    statusReason: 'Nairobi Urban Walkability Initiative gazette #88/2026.',
    source: {
      institution: 'Nairobi City County Urban Mobility Directorate',
      department: 'Non-Motorised Transport (NMT) Section',
      publishedDate: '06 Sep 2026',
      lastVerifiedDate: '17 Sep 2026',
      sourceUrl: 'https://nairobi.go.ke/nyayo-fan-walkway',
      officialDocReference: 'NCC/NMT/AFCON-NYAYO-03',
      auditTrail: [
        { stage: 'Pedestrian Corridor Open', timestamp: '06 Sep 2026', note: 'Paving & solar lighting completed.' },
        { stage: 'Safety Marshalling Briefing', timestamp: '17 Sep 2026', note: '120 marshals stationed.' }
      ]
    },
    nextSteps: [
      { label: 'Walking Route & Accessibility Map', actionType: 'route', target: '/browse?category=transport', isPrimary: true },
      { label: 'Nairobi Central Station Hub Info', actionType: 'route', target: '/browse?category=transport' }
    ],
    tags: ['transport', 'nyayo', 'walking', 'cbd', 'railways', 'pedestrian'],
    relatedQuestionIds: ['free-public-transport', 'expressway-fan-shuttles', 'fan-zone-uhuru-park'],
    lastUpdatedRelative: '1 day ago'
  },
  {
    id: 'matatu-fare-capping-rumor',
    title: 'Has the government banned Matatus from raising fares during the tournament?',
    category: 'transport',
    summary: 'While the Ministry of Transport and NTSA issued a stern advisory against exploitative fare surges, there is no blanket price control law on privately owned Matatus.',
    fullAnswer: 'Reports claiming that privately operated Matatus will face automatic vehicle impoundment for fares higher than standard off-peak rates are partially unverified. While the National Transport and Safety Authority (NTSA) negotiated a Code of Conduct with major SACCO federations (such as Matatu Owners Association and 2NK / Super Metro) pledging not to exceed a 25% surge limit, Matatus remain privately owned and dynamic pricing is common during rain or high congestion. For strictly fixed or zero-cost travel, use the official AFCON Fan Shuttles and Kenya Railways train.',
    status: 'unverified',
    statusReason: 'No formal statutory price-capping order has been enacted in the Kenya Gazette, despite verbal statements by transport officials.',
    source: {
      institution: 'National Transport and Safety Authority (NTSA)',
      department: 'Public Service Vehicle (PSV) Regulation Board',
      publishedDate: '11 Sep 2026',
      lastVerifiedDate: '17 Sep 2026',
      sourceUrl: 'https://ntsa.go.ke/advisories/matatu-code-of-conduct',
      officialDocReference: 'NTSA/PSV/ADV/2026-09',
      auditTrail: [
        { stage: 'Stakeholder Meeting', timestamp: '11 Sep 2026', note: 'Voluntary code signed by 42 SACCOs.' },
        { stage: 'Civic Fact-Check', timestamp: '17 Sep 2026', note: 'Confirmed non-binding status under Kenyan Competition Law.' }
      ]
    },
    nextSteps: [
      { label: 'Report Unfair Matatu Overcharging', actionType: 'report', target: '/report?type=incorrect_info', isPrimary: true },
      { label: 'Official Free Shuttle Options', actionType: 'route', target: '/browse?category=transport' }
    ],
    tags: ['transport', 'matatu', 'fares', 'ntsa', 'sacco', 'rumor', 'unverified'],
    relatedQuestionIds: ['free-public-transport', 'expressway-fan-shuttles'],
    lastUpdatedRelative: '1 day ago'
  },
  {
    id: 'lost-found-safety',
    title: 'What should I do if I lose a personal item or get separated from children at the stadium?',
    category: 'safety',
    summary: 'Visit the Child Protection & Lost Property desk located next to the primary Police Post at each stadium gate. All children can be issued a free digital tracking wristband at entrance turnstiles.',
    fullAnswer: 'The National Police Service in conjunction with UNICEF and Nairobi City County operates dedicated Family & Safety Booths at Kasarani (Gate 1), Talanta (Gate 3), and Nyayo (Gate 2). At entry, parents can request a complimentary waterproof wristband inscribed with the guardian phone number. If separated, stewards immediately broadcast to all gate marshals and initiate an automated perimeter search. Recovered items (passports, phones, wallets) are logged in the central civic registry within 30 minutes.',
    status: 'verified',
    statusReason: 'Standard Operating Protocol verified with National Police Child Protection Unit.',
    source: {
      institution: 'National Police Service (NPS)',
      department: 'Child Protection & Public Safety Unit',
      publishedDate: '14 Sep 2026',
      lastVerifiedDate: '18 Sep 2026',
      sourceUrl: 'https://nationalpolice.go.ke/afcon-child-safety-protocols',
      officialDocReference: 'NPS/CPU/AFCON/2026-04',
      auditTrail: [
        { stage: 'Child Safety Protocol Activated', timestamp: '14 Sep 2026', note: 'Equipped 150 safety booths.' },
        { stage: 'System Audit', timestamp: '18 Sep 2026', note: 'Tested wristband scanning across all 3 stadiums.' }
      ]
    },
    nextSteps: [
      { label: 'Report Lost Item / Person', actionType: 'report', target: '/report?type=safety', isPrimary: true },
      { label: 'Call Police Desk Directly', actionType: 'call', target: 'tel:0202222181' }
    ],
    tags: ['safety', 'children', 'lost-found', 'police', 'stadium', 'family'],
    relatedQuestionIds: ['emergency-contacts-hotline', 'stadium-medical-posts', 'id-requirements-stadium'],
    lastUpdatedRelative: '5 hours ago'
  }
];

// Swahili Localized Knowledge Base Dictionary
const SW_KNOWLEDGE_OVERRIDE: Record<string, Partial<AFCONInfoItem>> = {
  'talanta-road-closures': {
    title: 'Je, barabara ya kuelekea Uwanja wa Talanta imefungwa siku za mechi?',
    summary: 'Barabara ya Ngong inabaki wazi kwa magari ya kawaida, lakini njia za Jamhuri zinaruhusu tu mabasi rasmi ya AFCON na magari ya dharura.',
    fullAnswer: 'Kulingana na Mamlaka ya Barabara za Kitaifa (KeNHA) na Kaunti ya Jiji la Nairobi, barabara ya Ngong itasimamiwa kwa njia maalum siku za mechi katika Uwanja wa Talanta. Magari ya kibinafsi yasiyo na vibali vya maegesho ya VIP yataelekezwa njia nyingine katika makutano ya Adams Arcade na Dagoretti Corner.',
    statusReason: 'Ilani rasmi ya gazeti la serikali imethibitishwa kutoka Tangazo la KeNHA #2026/08.',
  },
  'free-public-transport': {
    title: 'Je, usafiri wa umma ni bure siku za mechi za AFCON?',
    summary: 'Usafiri wa matatu za kawaida si bure, lakini treni ya jiji (Nairobi Commuter Rail) na mabasi rasmi ya mashabiki wa AFCON ni 100% bure ukiwa na tiketi ya mechi.',
    fullAnswer: 'Matatu za kawaida za kibinafsi zinatoza nauli za kawaida. Hata hivyo, Serikali ya Kenya kwa ushirikiano na Kamati ya Maandalizi ya AFCON inatoa usafiri wa bure kwenye Treni ya Jiji na mabasi rasmi ya umeme kati ya CBD na viwanja. Lazima uonyeshe tiketi halali ya mechi ya siku hiyo.',
    statusReason: 'Taarifa ya pamoja imethibitishwa na Shirika la Reli la Kenya na Wizara ya Uchukuzi.',
  },
  'emergency-contacts-hotline': {
    title: 'Nambari rasmi za dharura wakati wa AFCON 2027 Nairobi ni zipi?',
    summary: 'Nambari kuu ya dharura ya kitaifa ni 999 au 112. Kwa huduma ya haraka ya matibabu, Msalaba Mwekundu Kenya una nambari ya bure 1199.',
    fullAnswer: 'Kenya imeunganisha mifumo ya dharura kwa mashindano haya. Katika dharura yoyote ya maisha au usalama, piga 999 au 112 bure kutoka mtandao wowote wa simu. Kwa ambulensi ya moja kwa moja, piga Msalaba Mwekundu kwa 1199. Kwa watalii na mashabiki wa kimataifa, kitengo cha Polisi wa Kidiplomasia ni +254 20 2222181.',
    statusReason: 'Imethibitishwa moja kwa moja na Jeshi la Polisi na Kitengo cha Maafa cha Msalaba Mwekundu Kenya.',
  },
  'kasarani-gate-bag-policy': {
    title: 'Je, ninaweza kuingia na chupa za maji, mikoba, au chaja za simu Uwanja wa Kasarani?',
    summary: 'Mikoba mikubwa kuliko saizi ya A4 na vyombo vya chuma au kioo vimepigwa marufuku. Chupa za plastiki zilizofungwa (hadi 500ml) na chaja ndogo zinaruhusiwa.',
    fullAnswer: 'Chini ya kanuni za CAF na Usalama wa Viwanja nchini Kenya, wahudhuriaji wote wanapaswa kupitia mashine za ukaguzi kwenye milango ya Kasarani. Vitu vinavyoruhusiwa: Mikoba midogo, chaja ndogo za simu chini ya 20,000 mAh, na chupa za maji za plastiki za 500ml.',
    statusReason: 'Imeboreshwa kulingana na Mwongozo wa Usalama wa Mashindano ya CAF Kifungu cha 14.',
  },
};

// French Localized Knowledge Base Dictionary
const FR_KNOWLEDGE_OVERRIDE: Record<string, Partial<AFCONInfoItem>> = {
  'talanta-road-closures': {
    title: 'La route vers le stade Talanta est-elle fermée les jours de match ?',
    summary: 'Ngong Road reste ouverte à la circulation normale, mais les boucles directes de Jamhuri sont réservées aux navettes officielles et aux véhicules d’urgence.',
    fullAnswer: 'Selon la KeNHA et le Comté de Nairobi, Ngong Road fera l’objet de régulations spéciales les jours de match au stade Talanta. Les véhicules particuliers sans laissez-passer VIP ou PMR sont déviés aux carrefours d’Adams Arcade et Dagoretti Corner.',
    statusReason: 'Avis officiel vérifié auprès de l’avis de transit KeNHA n° 2026/08.',
  },
  'free-public-transport': {
    title: 'Les transports publics sont-ils gratuits les jours de match de la CAN ?',
    summary: 'Les matatus standards restent payants, mais le train urbain et les navettes officielles CAN sont 100% gratuits sur présentation du billet de match.',
    fullAnswer: 'Les matatus privés appliquent leurs tarifs normaux. En revanche, le Gouvernement du Kenya et le Comité d’Organisation assurent la gratuité sur le train urbain de Nairobi et sur les navettes électriques reliant le centre-ville aux stades pour les détenteurs de billets.',
    statusReason: 'Communiqué de presse conjoint confirmé par Kenya Railways et le Ministère des Transports.',
  },
  'emergency-contacts-hotline': {
    title: 'Quels sont les numéros d’urgence officiels pendant la CAN 2027 à Nairobi ?',
    summary: 'Le numéro national d’urgence est le 999 ou le 112. Pour les urgences médicales et ambulances, la Croix-Rouge dispose du 1199 (gratuit).',
    fullAnswer: 'Le Kenya a centralisé les secours pour la compétition. En cas de menace vitale ou d’urgence sécuritaire, composez le 999 ou le 112 depuis n’importe quel opérateur. Pour une ambulance rapide, appelez la Croix-Rouge au 1199.',
    statusReason: 'Vérifié auprès de la Police Nationale et de la Croix-Rouge du Kenya.',
  },
  'kasarani-gate-bag-policy': {
    title: 'Peut-on apporter des bouteilles d’eau, des sacs ou des batteries externes à Kasarani ?',
    summary: 'Les sacs dépassant le format A4 et les contenants en verre ou métal sont strictement interdits. Les bouteilles en plastique scellées (500 ml max) sont autorisées.',
    fullAnswer: 'Conformément aux règlements de la CAF et de la sécurité des stades kényans, tous les spectateurs passent par des scanners de sécurité. Articles autorisés : petits sacs transparents, petites batteries externes (< 20 000 mAh) et bouteilles d’eau plastique scellées.',
    statusReason: 'Mis à jour selon le Manuel de Sécurité des Tournois CAF, Article 14.',
  },
};

export const RECENT_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'notif-1',
    title: 'Talanta Sports City: Ngong Road Traffic Diversions Active Today',
    summary: 'Managed lane controls in effect from 11:00 AM. Use Carnivore Park-and-Ride shuttles.',
    category: 'transport',
    institution: 'Kenya National Highways Authority (KeNHA)',
    timestamp: '2 hours ago',
    status: 'verified',
    targetId: 'talanta-road-closures',
    isEmergency: false,
    read: false
  },
  {
    id: 'notif-2',
    title: 'Safety Alert: Kasarani Stadium Gate D Turnstile Update',
    summary: 'Gate D scanners upgraded. Spectators with Section 4 tickets may now also use Gate C.',
    category: 'venues',
    institution: 'Sports Kenya & CAF',
    timestamp: '4 hours ago',
    status: 'recently_updated',
    targetId: 'kasarani-gate-bag-policy',
    isEmergency: false,
    read: false
  },
  {
    id: 'notif-3',
    title: 'Free Commuter Rail Match Express Confirmed for Kenya vs Ivory Coast',
    summary: 'Trains depart Nairobi Central every 15 minutes starting at 1:00 PM with free travel for match ticket holders.',
    category: 'transport',
    institution: 'Kenya Railways Corporation',
    timestamp: '7 hours ago',
    status: 'verified',
    targetId: 'free-public-transport',
    isEmergency: false,
    read: false
  },
  {
    id: 'notif-4',
    title: 'Health Advisory: Free Yellow Fever Checkpoint at JKIA Terminal 1A',
    summary: 'Incoming international fans who missed vaccination in home countries can receive certified inoculation upon arrival.',
    category: 'public_services',
    institution: 'Ministry of Health Kenya',
    timestamp: '1 day ago',
    status: 'verified',
    targetId: 'health-entry-requirements',
    isEmergency: false,
    read: true
  }
];

export const CATEGORIES_CONFIG = [
  {
    id: 'transport' as const,
    title: 'Transport & Mobility',
    shortTitle: 'Transport',
    icon: 'Car',
    description: 'Nairobi Expressway shuttles, Matatu SACCOs, Commuter Rail, road diversions, and park-and-ride.',
    count: 4,
    color: 'earth'
  },
  {
    id: 'venues' as const,
    title: 'Venue Information',
    shortTitle: 'Venues',
    icon: 'Stadium',
    description: 'Talanta Sports City, Kasarani, Nyayo stadiums, entry gates, bag policies, ticketing, and accessibility.',
    count: 3,
    color: 'sun'
  },
  {
    id: 'safety' as const,
    title: 'Safety & Assistance',
    shortTitle: 'Safety',
    icon: 'ShieldAlert',
    description: 'Emergency hotlines (999, 112, 1199), medical stations, lost & found, tourist protection, and police posts.',
    count: 3,
    color: 'ember'
  },
  {
    id: 'public_services' as const,
    title: 'Public Services',
    shortTitle: 'Public Services',
    icon: 'Building2',
    description: 'Uhuru Park & Arboretum fan festivals, e-visa, health inoculation guidelines, and clean water stations.',
    count: 2,
    color: 'rift'
  }
];

export const TRUSTED_INSTITUTIONS = [
  { name: 'Kenya National Highways Authority', acronym: 'KeNHA', role: 'National Roads & Traffic Control', verifiedCount: 14 },
  { name: 'National Police Service Kenya', acronym: 'NPS', role: 'Security & Public Order', verifiedCount: 22 },
  { name: 'Confederation of African Football', acronym: 'CAF', role: 'Tournament Organising Committee', verifiedCount: 31 },
  { name: 'Nairobi City County Government', acronym: 'NCCG', role: 'Municipal Services & Fan Festivals', verifiedCount: 18 },
  { name: 'Kenya Red Cross Society', acronym: 'KRCS', role: 'Emergency Medical & Disaster Response', verifiedCount: 19 },
  { name: 'Ministry of Health Kenya', acronym: 'MoH', role: 'Port Health & Disease Surveillance', verifiedCount: 11 },
  { name: 'Kenya Railways Corporation', acronym: 'KRC', role: 'Commuter Train Match Shuttles', verifiedCount: 9 },
  { name: 'National Transport and Safety Authority', acronym: 'NTSA', role: 'Public Service Vehicle Regulation', verifiedCount: 12 }
];

/**
 * Returns the knowledge base localized into the user's selected language
 */
export function getLocalizedKnowledgeBase(lang: Language = 'en'): AFCONInfoItem[] {
  if (lang === 'en') return AFCON_KNOWLEDGE_BASE;

  const overrides = lang === 'sw' ? SW_KNOWLEDGE_OVERRIDE : FR_KNOWLEDGE_OVERRIDE;
  return AFCON_KNOWLEDGE_BASE.map((item) => {
    const override = overrides[item.id];
    if (!override) return item;
    return {
      ...item,
      ...override,
    };
  });
}

/**
 * Returns localized notifications
 */
export function getLocalizedNotifications(lang: Language = 'en'): NotificationAlert[] {
  if (lang === 'en') return RECENT_NOTIFICATIONS;

  if (lang === 'sw') {
    return [
      {
        id: 'notif-1',
        title: 'Talanta Sports City: Mabadiliko ya Barabara ya Ngong Yanaanza Leo',
        summary: 'Udhibiti wa njia unaanza saa 5:00 asubuhi. Tumia maegesho ya Carnivore Park-and-Ride.',
        category: 'transport',
        institution: 'Mamlaka ya Barabara Kuu (KeNHA)',
        timestamp: 'Masaa 2 yaliyopita',
        status: 'verified',
        targetId: 'talanta-road-closures',
        isEmergency: false,
        read: false
      },
      {
        id: 'notif-2',
        title: 'Tahadhari ya Usalama: Mabadiliko ya Lango D Kasarani',
        summary: 'Mashine za lango D zimeboreshwa. Wenye tiketi za Sehemu ya 4 wanaweza kutumia Lango C pia.',
        category: 'venues',
        institution: 'Sports Kenya & CAF',
        timestamp: 'Masaa 4 yaliyopita',
        status: 'recently_updated',
        targetId: 'kasarani-gate-bag-policy',
        isEmergency: false,
        read: false
      },
      {
        id: 'notif-3',
        title: 'Treni Maalum ya Mashabiki Imethibitishwa kwa Mechi ya Kenya dhidi ya Ivory Coast',
        summary: 'Treni zitaondoka Nairobi Central kila baada ya dakika 15 kuanzia saa 7:00 mchana bure kwa wenye tiketi.',
        category: 'transport',
        institution: 'Shirika la Reli la Kenya',
        timestamp: 'Masaa 7 yaliyopita',
        status: 'verified',
        targetId: 'free-public-transport',
        isEmergency: false,
        read: false
      },
      {
        id: 'notif-4',
        title: 'Ushauri wa Afya: Chanjo ya Homa ya Manjano Bure Uwanja wa Ndege wa JKIA',
        summary: 'Mashabiki wa kimataifa waliokosa chanjo nchini mwao wanaweza kuchanjwa rasmi wanapowasili.',
        category: 'public_services',
        institution: 'Wizara ya Afya Kenya',
        timestamp: 'Siku 1 iliyopita',
        status: 'verified',
        targetId: 'health-entry-requirements',
        isEmergency: false,
        read: true
      }
    ];
  }

  // French
  return [
    {
      id: 'notif-1',
      title: 'Stade Talanta : Déviations Actives sur Ngong Road Aujourd’hui',
      summary: 'Voies régulées dès 11h00. Utilisez les navettes relais depuis le parking du Carnivore.',
      category: 'transport',
      institution: 'Autorité des Autoroutes du Kenya (KeNHA)',
      timestamp: 'Il y a 2 heures',
      status: 'verified',
      targetId: 'talanta-road-closures',
      isEmergency: false,
      read: false
    },
    {
      id: 'notif-2',
      title: 'Alerte Sécurité : Mise à Jour des Tourniquets Porte D à Kasarani',
      summary: 'Scanners de la porte D modernisés. Les détenteurs de billets Section 4 peuvent aussi entrer par la porte C.',
      category: 'venues',
      institution: 'Sports Kenya & CAF',
      timestamp: 'Il y a 4 heures',
      status: 'recently_updated',
      targetId: 'kasarani-gate-bag-policy',
      isEmergency: false,
      read: false
    },
    {
      id: 'notif-3',
      title: 'Train Spécial Supporters Confirmé pour Kenya vs Côte d’Ivoire',
      summary: 'Départs toutes les 15 minutes depuis Nairobi Central dès 13h00, gratuit sur présentation du billet.',
      category: 'transport',
      institution: 'Société des Chemins de Fer du Kenya',
      timestamp: 'Il y a 7 heures',
      status: 'verified',
      targetId: 'free-public-transport',
      isEmergency: false,
      read: false
    },
    {
      id: 'notif-4',
      title: 'Avis Sanitaire : Vaccin Fièvre Jaune Disponible à l’Aéroport JKIA',
      summary: 'Les supporters internationaux n’ayant pas reçu le vaccin dans leur pays peuvent se faire vacciner à l’arrivée.',
      category: 'public_services',
      institution: 'Ministère de la Santé du Kenya',
      timestamp: 'Il y a 1 jour',
      status: 'verified',
      targetId: 'health-entry-requirements',
      isEmergency: false,
      read: true
    }
  ];
}

/**
 * Returns localized categories
 */
export function getLocalizedCategories(lang: Language = 'en') {
  if (lang === 'sw') {
    return [
      {
        id: 'transport' as const,
        title: 'Usafiri na Uhamaji',
        shortTitle: 'Usafiri',
        icon: 'Car',
        description: 'Mabasi ya barabara kuu, matatu za SACCO, treni ya jiji, mabadiliko ya njia na maegesho.',
        count: 4,
        color: 'earth'
      },
      {
        id: 'venues' as const,
        title: 'Taarifa za Viwanja',
        shortTitle: 'Viwanja',
        icon: 'Stadium',
        description: 'Viwanja vya Talanta, Kasarani, Nyayo, milango, sera ya mikoba, tiketi na urahisi wa kuingia.',
        count: 3,
        color: 'sun'
      },
      {
        id: 'safety' as const,
        title: 'Usalama na Msaada',
        shortTitle: 'Usalama',
        icon: 'ShieldAlert',
        description: 'Nambari za dharura (999, 112, 1199), zahanati, vitu vilivyopotea, ulinzi wa watalii na vituo vya polisi.',
        count: 3,
        color: 'ember'
      },
      {
        id: 'public_services' as const,
        title: 'Huduma za Umma',
        shortTitle: 'Huduma za Umma',
        icon: 'Building2',
        description: 'Maeneo ya sherehe ya mashabiki Uhuru Park, viza ya mtandaoni, miongozo ya chanjo na maji safi.',
        count: 2,
        color: 'rift'
      }
    ];
  }

  if (lang === 'fr') {
    return [
      {
        id: 'transport' as const,
        title: 'Transports & Mobilité',
        shortTitle: 'Transports',
        icon: 'Car',
        description: 'Navettes de la voie rapide, coopératives de matatus, train urbain, déviations et parkings relais.',
        count: 4,
        color: 'earth'
      },
      {
        id: 'venues' as const,
        title: 'Informations des Stades',
        shortTitle: 'Stades',
        icon: 'Stadium',
        description: 'Stades Talanta, Kasarani, Nyayo, portes d’accès, règles relatives aux sacs, billetterie et accessibilité.',
        count: 3,
        color: 'sun'
      },
      {
        id: 'safety' as const,
        title: 'Sécurité & Secours',
        shortTitle: 'Sécurité',
        icon: 'ShieldAlert',
        description: 'Lignes d’urgence (999, 112, 1199), postes médicaux, objets trouvés, protection des touristes et police.',
        count: 3,
        color: 'ember'
      },
      {
        id: 'public_services' as const,
        title: 'Services Publics',
        shortTitle: 'Services Publics',
        icon: 'Building2',
        description: 'Festivals de supporters à Uhuru Park, visa électronique, exigences vaccinales et points d’eau potable.',
        count: 2,
        color: 'rift'
      }
    ];
  }

  return CATEGORIES_CONFIG;
}
