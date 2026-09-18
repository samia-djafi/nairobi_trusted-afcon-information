import { Language } from '@/types';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  nav: {
    home: string;
    askAi: string;
    browse: string;
    explainThis: string;
    saved: string;
    howItWorks: string;
    reportIssue: string;
    emergency: string;
    privacyNote: string;
    searchPlaceholder: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    askCta: string;
    browseCta: string;
    quickSearchPlaceholder: string;
    askButton: string;
    trendingSearches: string;
    trustedSourcedFrom: string;
  };
  categories: {
    title: string;
    subtitle: string;
    transport: string;
    venues: string;
    safety: string;
    publicServices: string;
  };
  trustLoop: {
    title: string;
    subtitle: string;
    find: { title: string; desc: string };
    understand: { title: string; desc: string };
    verify: { title: string; desc: string };
    act: { title: string; desc: string };
  };
  badges: {
    verified: string;
    recentlyUpdated: string;
    unverified: string;
    couldNotVerify: string;
    verifiedDesc: string;
    recentlyUpdatedDesc: string;
    unverifiedDesc: string;
    couldNotVerifyDesc: string;
  };
  emergencyBanner: {
    badge: string;
    text: string;
    cta: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    brandName: 'Nairobi — Trusted AFCON Info',
    brandTagline: 'Civic verification platform for AFCON 2027 in Nairobi',
    nav: {
      home: 'Home',
      askAi: 'Ask AI',
      browse: 'Browse Info',
      explainThis: 'Explain This',
      saved: 'Saved',
      howItWorks: 'How It Works',
      reportIssue: 'Report an Issue',
      emergency: 'Emergency Contacts',
      privacyNote: 'No account required. Saved items are stored on this device only.',
      searchPlaceholder: 'Search official AFCON info...',
    },
    hero: {
      badge: 'Official Civic Trust System • AFCON 2027 Nairobi',
      title: 'Trusted Information for Nairobi During',
      titleHighlight: 'AFCON 2027',
      subtitle: 'Find, understand, verify, and act on official transport, venue, safety, and civic notices across the capital city.',
      askCta: 'Ask a Question',
      browseCta: 'Browse Verified Info',
      quickSearchPlaceholder: 'e.g. Is the road to Talanta Stadium open today?',
      askButton: 'Ask Question',
      trendingSearches: 'Popular Inquiries:',
      trustedSourcedFrom: 'Verified across public official institutions:',
    },
    categories: {
      title: 'Explore by Category',
      subtitle: 'Structured civic guidance curated directly from accredited Kenyan and continental bodies.',
      transport: 'Transport & Mobility',
      venues: 'Venue Information',
      safety: 'Safety & Assistance',
      publicServices: 'Public Services',
    },
    trustLoop: {
      title: 'The Trust Methodology',
      subtitle: 'Every piece of information follows a 4-step civic integrity loop.',
      find: { title: '1. FIND', desc: 'Ask in plain language or browse structured categories.' },
      understand: { title: '2. UNDERSTAND', desc: 'Read straightforward summaries without confusing bureaucratic jargon.' },
      verify: { title: '3. VERIFY', desc: 'Inspect the issuing authority, publication timestamp, and freshness status.' },
      act: { title: '4. ACT', desc: 'Take immediate action with verified phone lines, travel corridors, and official links.' },
    },
    badges: {
      verified: 'Verified',
      recentlyUpdated: 'Recently Updated',
      unverified: 'Unverified',
      couldNotVerify: 'Could Not Verify',
      verifiedDesc: 'Confirmed against an official source within a defined freshness window.',
      recentlyUpdatedDesc: 'Verified, but official details were modified recently. Review key dates.',
      unverifiedDesc: 'Found in public reports but not yet officially confirmed by an accredited body.',
      couldNotVerifyDesc: 'No credible official source exists. Beware of rumors.',
    },
    emergencyBanner: {
      badge: 'Immediate Danger?',
      text: 'In an emergency, do not wait for a search result.',
      cta: 'Call 999 / 112 Directly',
    },
  },
  sw: {
    brandName: 'Nairobi — Habari Rasmi za AFCON',
    brandTagline: 'Jukwaa la kuaminika la wananchi kwa AFCON 2027 jijini Nairobi',
    nav: {
      home: 'Nyumbani',
      askAi: 'Uliza AI',
      browse: 'Vinjari Habari',
      explainThis: 'Fafanua Hii',
      saved: 'Zilizohifadhiwa',
      howItWorks: 'Jinsi Inavyofanya Kazi',
      reportIssue: 'Ripoti Shida',
      emergency: 'Nambari za Dharura',
      privacyNote: 'Hakuna akaunti inayohitajika. Taarifa huhifadhiwa kwenye kifaa hiki pekee.',
      searchPlaceholder: 'Tafuta habari rasmi za AFCON...',
    },
    hero: {
      badge: 'Mfumo Rasmi wa Kuaminika • AFCON 2027 Nairobi',
      title: 'Habari za Kuaminika Jijini Nairobi Wakati wa',
      titleHighlight: 'AFCON 2027',
      subtitle: 'Tafuta, elewa, thibitisha, na chukua hatua kuhusu usafiri, viwanja, usalama, na huduma za umma jijini.',
      askCta: 'Uliza Swali',
      browseCta: 'Vinjari Habari Zilizothibitishwa',
      quickSearchPlaceholder: 'mfano: Je, barabara ya kuelekea Uwanja wa Talanta imefungwa leo?',
      askButton: 'Uliza Swali',
      trendingSearches: 'Maswali Yanayoulizwa Sana:',
      trustedSourcedFrom: 'Imethibitishwa kutoka asasi rasmi za kiserikali:',
    },
    categories: {
      title: 'Chunguza kwa Kitengo',
      subtitle: 'Mwongozo wa kiraia uliopangiliwa moja kwa moja kutoka asasi zilizoidhinishwa nchini Kenya.',
      transport: 'Usafiri na Uhamaji',
      venues: 'Taarifa za Viwanja',
      safety: 'Usalama na Msaada',
      publicServices: 'Huduma za Umma',
    },
    trustLoop: {
      title: 'Mwenendo Wetu wa Uaminifu',
      subtitle: 'Kila habari hufuata mchakato wa hatua 4 wa ukweli na uwazi.',
      find: { title: '1. TAFUTA', desc: 'Uliza kwa lugha ya kawaida au vinjari kategoria zilizopangwa.' },
      understand: { title: '2. ELEWA', desc: 'Soma maelezo rahisi bila maneno magumu ya kiofisi.' },
      verify: { title: '3. THIBITISHA', desc: 'Kagua taasisi iliyotoa tangazo, tarehe, na hadhi ya uhalali.' },
      act: { title: '4. CHUKUA HATUA', desc: 'Chukua hatua haraka kupitia njia rasmi za simu, mwelekeo, na viungo halisi.' },
    },
    badges: {
      verified: 'Imethibitishwa',
      recentlyUpdated: 'Imeboreshwa Karibuni',
      unverified: 'Haijathibitishwa',
      couldNotVerify: 'Haikuweza Kuthibitishwa',
      verifiedDesc: 'Imethibitishwa na chanzo rasmi ndani ya muda uliowekwa.',
      recentlyUpdatedDesc: 'Imethibitishwa, lakini maelezo yalibadilika karibuni.',
      unverifiedDesc: 'Imeripotiwa lakini bado haijathibitishwa na idara husika.',
      couldNotVerifyDesc: 'Hakuna chanzo rasmi kilichopatikana. Epuka uvumi.',
    },
    emergencyBanner: {
      badge: 'Dharura ya Papo Hapo?',
      text: 'Wakati wa dharura, usisubiri majibu ya utafutaji.',
      cta: 'Piga 999 / 112 Moja kwa Moja',
    },
  },
  fr: {
    brandName: 'Nairobi — Infos AFCON Certifiées',
    brandTagline: 'Plateforme civique d’information certifiée pour la CAN 2027 à Nairobi',
    nav: {
      home: 'Accueil',
      askAi: 'Demander à l’IA',
      browse: 'Parcourir',
      explainThis: 'Expliquer un texte',
      saved: 'Favoris',
      howItWorks: 'Fonctionnement',
      reportIssue: 'Signaler un problème',
      emergency: 'Urgences',
      privacyNote: 'Aucun compte requis. Vos favoris restent sur cet appareil uniquement.',
      searchPlaceholder: 'Rechercher des informations officielles...',
    },
    hero: {
      badge: 'Système Civique de Confiance • CAN 2027 Nairobi',
      title: 'Informations Vérifiées à Nairobi Pendant la',
      titleHighlight: 'CAN 2027',
      subtitle: 'Trouvez, comprenez, vérifiez et agissez sur les transports, les stades, la sécurité et les services publics.',
      askCta: 'Poser une Question',
      browseCta: 'Parcourir les Infos',
      quickSearchPlaceholder: 'ex. La route vers le stade Talanta est-elle fermée aujourd’hui ?',
      askButton: 'Poser la Question',
      trendingSearches: 'Recherches populaires :',
      trustedSourcedFrom: 'Informations certifiées auprès des institutions officielles :',
    },
    categories: {
      title: 'Explorer par Catégorie',
      subtitle: 'Guide civique directement extrait des sources officielles kenyanes et continentales.',
      transport: 'Transports & Mobilité',
      venues: 'Informations des Stades',
      safety: 'Sécurité & Assistance',
      publicServices: 'Services Publics',
    },
    trustLoop: {
      title: 'Méthodologie de Confiance',
      subtitle: 'Chaque information suit notre cycle en 4 étapes pour garantir la fiabilité.',
      find: { title: '1. TROUVER', desc: 'Posez votre question en langage simple ou parcourez nos rubriques.' },
      understand: { title: '2. COMPRENDRE', desc: 'Lisez des synthèses claires sans jargon administratif complexe.' },
      verify: { title: '3. VÉRIFIER', desc: 'Inspectez l’institution source, la date et le niveau de certification.' },
      act: { title: '4. AGIR', desc: 'Passez à l’action grâce à des contacts directs et des itinéraires vérifiés.' },
    },
    badges: {
      verified: 'Vérifié',
      recentlyUpdated: 'Mis à Jour Récemment',
      unverified: 'Non Vérifié',
      couldNotVerify: 'Non Vérifiable',
      verifiedDesc: 'Confirmé auprès d’une source officielle dans la période de validité.',
      recentlyUpdatedDesc: 'Vérifié, mais les détails ont été modifiés récemment.',
      unverifiedDesc: 'Rapporté publiquement mais non encore confirmé par une autorité.',
      couldNotVerifyDesc: 'Aucune source crédible trouvée. Attention aux rumeurs.',
    },
    emergencyBanner: {
      badge: 'Urgence Vitale ?',
      text: 'En cas d’urgence, n’attendez pas le résultat d’une recherche.',
      cta: 'Appelez le 999 / 112 Directement',
    },
  },
};
