import { OfficialAnnouncement, Language } from '@/types';

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

export function getLocalizedAnnouncements(lang: Language = 'en'): OfficialAnnouncement[] {
  if (lang === 'en') return OFFICIAL_ANNOUNCEMENTS;

  if (lang === 'sw') {
    return [
      {
        id: 'announcement-transit-reroute',
        title: 'Gazeti la Kaunti ya Nairobi #104/2026: Mabadiliko ya Vituo vya Matatu Wakati wa Mechi za AFCON',
        institution: 'Kaunti ya Jiji la Nairobi na Makao Makuu ya Polisi wa Trafiki',
        date: '14 Sep 2026',
        category: 'transport',
        status: 'verified',
        sourceUrl: 'https://nairobi.go.ke/gazette/2026-104-transport-reroute',
        originalText: OFFICIAL_ANNOUNCEMENTS[0].originalText,
        plainExplanation: 'Siku za mechi, matatu za kawaida zinazoshusha abiria Kencom na Ambassador katikati ya jiji zinahamishiwa Kituo cha Green Park na Uwanja wa Railways Club. Hii inatoa nafasi kwa njia salama za kutembea na mabasi rasmi ya mashabiki.',
        keyPoints: [
          'Mabasi ya kawaida na matatu HAWATASHUSHA abiria Kencom au Ambassador siku za mechi kuanzia saa 5:00 asubuhi hadi 5:00 usiku.',
          'Abiria wanapaswa kupanda na kushuka katika Kituo cha Green Park au Railways Club.',
          'Mabasi rasmi pekee yenye vibali maalum yataruhusiwa kuingia katikati ya njia za viwanja.',
          'Kuvuta na faini zitatumika kwa matatu yasiyotii maagizo.'
        ],
        whoIsAffected: 'Wasafiri wote wa kila siku, mashabiki, na wahudumu wa matatu wanaoingia katikati ya jiji la Nairobi.',
        whenItApplies: 'Kila siku ya mechi kuanzia saa 5:00 asubuhi hadi saa 5:00 usiku.',
        requiredAction: 'Panga safari yako kupitia Green Park au Stesheni ya Reli badala ya Kencom, au tumia mabasi ya bure ya mashabiki wa mashindano.'
      },
      {
        id: 'announcement-moh-health-protocol',
        title: 'Agizo la Wizara ya Afya #44/2026: Mwongozo wa Ukaguzi wa Afya na Chanjo Mpakani kwa AFCON',
        institution: 'Wizara ya Afya Kenya (Kitengo cha Afya Mpakani)',
        date: '08 Sep 2026',
        category: 'public_services',
        status: 'verified',
        sourceUrl: 'https://health.go.ke/directives/afcon-border-health-44',
        originalText: OFFICIAL_ANNOUNCEMENTS[1].originalText,
        plainExplanation: 'Ikiwa unakuja nchini Kenya kutoka nchi yenye hatari ya homa ya manjano, lazima uwe na kadi yako ya chanjo. Lazima pia ujaze fomu ya mtandaoni ya Jitenge kabla ya ndege. Ikiwa umesahau chanjo, unaweza kuchanjwa papo hapo uwanja wa ndege wa JKIA kwa $15.',
        keyPoints: [
          'Cheti cha homa ya manjano ni lazima kwa wanaosafiri kutoka maeneo yenye hatari (kichukuliwe angalau siku 10 kabla).',
          'Kila mtu anayesafiri kwa ndege lazima ajaze fomu ya mtandaoni ya Jitenge AFCON kabla ya kupanda ndege.',
          'Hakuna mahitaji ya vipimo vya PCR vya COVID-19 wala karantini.',
          'Chanjo za dharura za homa ya manjano zinapatikana masaa 24 JKIA Terminal 1A kwa $15.'
        ],
        whoIsAffected: 'Wageni wote wa kimataifa, mashabiki wa mpira, wanahabari, na wakazi wanaorejea nchini kwa ajili ya AFCON.',
        whenItApplies: 'Mara moja, masaa 24 katika vituo vyote vya kuingilia nchini Kenya.',
        requiredAction: 'Jaza fomu ya Jitenge mtandaoni kwenye jitenge.health.go.ke ndani ya siku 3 kabla ya ndege na weka kadi ya chanjo pamoja na pasipoti.'
      },
      {
        id: 'announcement-talanta-gate-rules',
        title: 'Ilani ya Sports Kenya na CAF #18: Sheria za Kuingia Uwanja wa Talanta na Vitu Vilivyopigwa Marufuku',
        institution: 'Sports Kenya na Kamati ya Usalama ya CAF',
        date: '11 Sep 2026',
        category: 'venues',
        status: 'verified',
        sourceUrl: 'https://sportskenya.org/talanta-safety-announcement-18',
        originalText: OFFICIAL_ANNOUNCEMENTS[2].originalText,
        plainExplanation: 'Milango katika Uwanja wa Talanta inafunguliwa masaa 5 kabla ya mechi na kufungwa dakika 45 kabla ya kuanza. Mikoba mikubwa, chupa za kioo, miavuli ya chuma, na leza zimepigwa marufuku. Mikoba midogo na vuvuzela za plastiki zinaruhusiwa.',
        keyPoints: [
          'Milango inafunguliwa masaa 5 kabla ya mechi; inafungwa dakika 45 kabla ya kuanza—usichelewe!',
          'Hakuna kubeba mikoba mikubwa ya mgongoni; mikoba midogo wazi pekee ndiyo inayoruhusiwa.',
          'Chupa za kioo, mikebe na miavuli yenye ncha kali haviruhusiwi.',
          'Vuvuzela za plastiki chini ya 40cm zinaruhusiwa.',
          'Kila mwenye tiketi lazima aonyeshe kitambulisho asili chenye picha kinachofanana na jina kwenye tiketi.'
        ],
        whoIsAffected: 'Wamiliki wote wa tiketi wanaohudhuria mechi katika Uwanja wa Talanta Sports City.',
        whenItApplies: 'Siku zote za mechi katika Uwanja wa Talanta.',
        requiredAction: 'Fika uwanjani angalau masaa 2 kabla ya mechi kuanza, beba kitambulisho asili, na acha mikoba mikubwa nyumbani.'
      }
    ];
  }

  // French
  return [
    {
      id: 'announcement-transit-reroute',
      title: 'Arrêté du Comté de Nairobi #104/2026 : Réacheminement des Terminus de Matatus du Centre-Ville',
      institution: 'Gouvernement du Comté de Nairobi & Police de la Circulation',
      date: '14 Sep 2026',
      category: 'transport',
      status: 'verified',
      sourceUrl: 'https://nairobi.go.ke/gazette/2026-104-transport-reroute',
      originalText: OFFICIAL_ANNOUNCEMENTS[0].originalText,
      plainExplanation: 'Les jours de match, les matatus qui déposent habituellement les passagers à Kencom et Ambassador sont redirigés vers le terminus de Green Park et le Railways Club. Cela libère l’espace pour les couloirs piétons et les navettes officielles.',
      keyPoints: [
        'Les matatus ordinaires NE DÉPOSERONT PAS de passagers à Kencom ou Ambassador les jours de match de 11h00 à 23h00.',
        'La montée et la descente des passagers s’effectuent obligatoirement à Green Park ou au Railways Club.',
        'Seules les navettes officielles de la CAN munies de badges à code-barres peuvent pénétrer dans la boucle centrale.',
        'Mise en fourrière et amendes strictes pour les véhicules non conformes.'
      ],
      whoIsAffected: 'Tous les usagers quotidiens, supporters et exploitants de matatus circulant vers le centre-ville de Nairobi.',
      whenItApplies: 'Tous les jours de match de 11h00 à 23h00 pendant toute la durée de la compétition.',
      requiredAction: 'Organisez votre trajet via Green Park ou la gare ferroviaire plutôt que Kencom, ou empruntez les navettes gratuites.'
    },
    {
      id: 'announcement-moh-health-protocol',
      title: 'Directive du Ministère de la Santé #44/2026 : Protocole Sanitaire et Vaccinal aux Frontières',
      institution: 'Ministère de la Santé du Kenya (Direction Sanitaire Portuaire)',
      date: '08 Sep 2026',
      category: 'public_services',
      status: 'verified',
      sourceUrl: 'https://health.go.ke/directives/afcon-border-health-44',
      originalText: OFFICIAL_ANNOUNCEMENTS[1].originalText,
      plainExplanation: 'Si vous venez au Kenya depuis un pays à risque de fièvre jaune, votre carnet de vaccination est obligatoire. Vous devez aussi remplir en ligne la fiche sanitaire gratuite Jitenge. Si vous n’êtes pas vacciné, vous pouvez l’être directement à l’aéroport JKIA pour 15 $.',
      keyPoints: [
        'Le certificat de fièvre jaune est obligatoire pour les voyageurs provenant de zones d’endémie (vaccin fait au moins 10 jours avant).',
        'Tous les passagers aériens doivent remplir le formulaire en ligne gratuit Jitenge AFCON avant l’embarquement.',
        'Aucun test PCR COVID-19 ni quarantaine exigés.',
        'Postes de vaccination d’urgence ouverts 24h/24 au Terminal 1A de JKIA au tarif subventionné de 15 $.'
      ],
      whoIsAffected: 'Tous les visiteurs internationaux, supporters, délégations de médias et résidents arrivant au Kenya pour la CAN.',
      whenItApplies: 'Application immédiate, 24h/24 à tous les postes frontaliers pendant le tournoi.',
      requiredAction: 'Remplissez le formulaire Jitenge sur jitenge.health.go.ke dans les 3 jours précédant votre vol et gardez votre carnet vaccinal avec votre passeport.'
    },
    {
      id: 'announcement-talanta-gate-rules',
      title: 'Avis Sports Kenya & CAF #18 : Règles d’Accès et Objets Interdits au Stade Talanta',
      institution: 'Sports Kenya & Commission de Sécurité de la CAF',
      date: '11 Sep 2026',
      category: 'venues',
      status: 'verified',
      sourceUrl: 'https://sportskenya.org/talanta-safety-announcement-18',
      originalText: OFFICIAL_ANNOUNCEMENTS[2].originalText,
      plainExplanation: 'Les portes du stade Talanta ouvrent 5 heures avant le coup d’envoi et ferment 45 minutes avant le match. Les grands sacs à dos, bouteilles en verre, parapluies métalliques et pointeurs laser sont interdits. Les petits sacs transparents et les vuvuzelas en plastique sont autorisés.',
      keyPoints: [
        'Les portes ouvrent 5h avant le coup d’envoi et FERMENT 45 minutes avant—n’arrivez pas en retard !',
        'Sacs à dos et grands sacs interdits ; seuls les petits sacs transparents ou pochettes sont admis.',
        'Verre, canettes et parapluies pointus strictement interdits.',
        'Vuvuzelas en plastique souple de moins de 40 cm autorisés.',
        'Chaque détenteur de billet doit présenter une pièce d’identité officielle originale correspondant au nom figurant sur le billet.'
      ],
      whoIsAffected: 'Tous les spectateurs assistant aux matchs au stade Talanta Sports City.',
      whenItApplies: 'Tous les jours de match au stade Talanta.',
      requiredAction: 'Arrivez au moins 2 heures avant le coup d’envoi, munissez-vous de votre pièce d’identité originale et laissez les gros sacs chez vous.'
    }
  ];
}
