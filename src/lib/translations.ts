import { Language } from '@/types';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
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
    privacyTitle: string;
    privacySession: string;
    searchPlaceholder: string;
    selectLanguage: string;
    nairobiClock: string;
    dropdown: {
      transportTitle: string;
      transportDesc: string;
      venuesTitle: string;
      venuesDesc: string;
      safetyTitle: string;
      safetyDesc: string;
      publicServicesTitle: string;
      publicServicesDesc: string;
    };
  };
  footer: {
    mission: string;
    hackathonBadge: string;
    languageLabel: string;
    colExplore: string;
    colTrust: string;
    colEmergency: string;
    methodologyLink: string;
    legendLink: string;
    sourcesLink: string;
    flagLink: string;
    immediateAssistance: string;
    nationalEmergency: string;
    redCrossEmergency: string;
    viewDirectory: string;
    institutionsHeader: string;
    disclaimerTitle: string;
    disclaimerText: string;
    craftedWithLove: string;
  };
  mobileNav: {
    home: string;
    ask: string;
    browse: string;
    saved: string;
  };
  floatingReport: {
    label: string;
    ariaLabel: string;
  };
  emergencyBanner: {
    badge: string;
    text: string;
    cta: string;
    dismiss: string;
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
    sampleQuestions: string[];
    trustedSourcedFrom: string;
  };
  stats: {
    stadiumsCount: string;
    stadiumsLabel: string;
    stadiumsDesc: string;
    sourcedPct: string;
    sourcedLabel: string;
    sourcedDesc: string;
    safetyHours: string;
    safetyLabel: string;
    safetyDesc: string;
    trustSteps: string;
    trustLabel: string;
    trustDesc: string;
  };
  monuments: {
    sportsMonument: {
      lowBandwidthTitle: string;
      lowBandwidthDesc: string;
      turnOn3D: string;
      lowDataMode: string;
      interactiveLabel: string;
    };
    monumentLoop: {
      kicc: { name: string; fullName: string; tagline: string };
      museum: { name: string; fullName: string; tagline: string };
      archives: { name: string; fullName: string; tagline: string };
      lowBandwidthTitle: string;
      lowBandwidthDesc: string;
      turnOn3D: string;
      lowDataMode: string;
      interactiveLabel: string;
    };
  };
  categories: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    transport: { title: string; desc: string };
    venues: { title: string; desc: string };
    safety: { title: string; desc: string };
    publicServices: { title: string; desc: string };
    exploreAllCta: string;
  };
  trustLoop: {
    sectionBadge: string;
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
  notifications: {
    drawerTitle: string;
    drawerSubtitle: string;
    markAllRead: string;
    viewAnswer: string;
    emergencyDirectoryCta: string;
    emptyText: string;
  };
  ask: {
    badge: string;
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    clearButton: string;
    askButton: string;
    streamingButton: string;
    scopeLabel: string;
    scopeAll: string;
    tryLabel: string;
    suggestedQuestions: Array<{ text: string; category: string }>;
    streamingWaitStatus: string;
    verifyingDatabase: string;
    tokensMetric: string;
    latencyMetric: string;
    saveButton: string;
    savedButton: string;
    shareButton: string;
    copiedButton: string;
    bridgeBannerTitle: string;
    bridgeBannerDesc: string;
    bridgeBannerCta: string;
    relatedInquiriesTitle: string;
    askThisQuestion: string;
    streamInterruptedTitle: string;
  };
  report: {
    badge: string;
    title: string;
    subtitle: string;
    emergencyBoxTitle: string;
    emergencyBoxText: string;
    emergencyBoxCta: string;
    categoryLabel: string;
    categories: Record<string, { label: string; desc: string }>;
    descriptionLabel: string;
    descriptionHint: string;
    descriptionPlaceholder: string;
    gpsSectionTitle: string;
    captureGpsButton: string;
    acquiringGpsButton: string;
    reacquireGpsButton: string;
    gpsVerifiedBadge: string;
    gpsHint: string;
    venueLabel: string;
    venuePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    mediaLabel: string;
    mediaLimit: string;
    uploadButton: string;
    uploadingButton: string;
    submitButton: string;
    submittingButton: string;
    disclaimerText: string;
    confirmationTitle: string;
    confirmationDesc: string;
    trackingNoLabel: string;
    ackIdLabel: string;
    routedDesksLabel: string;
    slaLabel: string;
    slaMinutesText: string;
    emergencyEscalationTitle: string;
    emergencyEscalationText: string;
    submitAnotherButton: string;
    returnHomeButton: string;
  };
  saved: {
    badge: string;
    title: string;
    subtitle: string;
    syncOnline: string;
    syncOffline: string;
    pendingSyncs: string;
    tabAll: string;
    tabAnswers: string;
    tabNotices: string;
    itemSavedOn: string;
    removeButton: string;
    reopenButton: string;
    emptyTitle: string;
    emptyDesc: string;
    askCta: string;
    browseCta: string;
  };
  browse: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterLabel: string;
    sortLabel: string;
    sortRecent: string;
    sortStatus: string;
    statusAll: string;
    showingCount: string;
    emptyTitle: string;
    emptyDesc: string;
    resetFilters: string;
  };
  explain: {
    badge: string;
    title: string;
    subtitle: string;
    sampleSelectorLabel: string;
    textareaLabel: string;
    textareaPlaceholder: string;
    analyzeButton: string;
    analyzingButton: string;
    resultBadge: string;
    plainSummaryTitle: string;
    keyPointsTitle: string;
    whoAffectedTitle: string;
    whenAppliesTitle: string;
    requiredActionTitle: string;
    sourceTitle: string;
    viewOriginalGazette: string;
    saveExplanation: string;
  };
  emergency: {
    badge: string;
    title: string;
    subtitle: string;
    callNowCta: string;
    tollFreeLabel: string;
    venuePostsTitle: string;
    venuePostsSubtitle: string;
    medicalFacilitiesTitle: string;
    guidelinesTitle: string;
    guidelines: string[];
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    loopTitle: string;
    loopSubtitle: string;
    loopSteps: Array<{ title: string; desc: string; detail: string }>;
    verificationTitle: string;
    verificationSubtitle: string;
    freshnessTitle: string;
    freshnessDesc: string;
    institutionsTitle: string;
    institutionsSubtitle: string;
  };
  cards: {
    sourceLabel: string;
    publishedLabel: string;
    verifiedLabel: string;
    viewAuditTrail: string;
    nextStepsTitle: string;
    helpfulPrompt: string;
    helpfulThankYou: string;
    readFullNotice: string;
  };
  unverified: {
    badge: string;
    title: string;
    queryLabel: string;
    whyTitle: string;
    whyExplanation: string;
    safeActionsTitle: string;
    safeActionAuthority: string;
    safeActionSocialWarning: string;
    callHelpdeskButton: string;
    visitPortalButton: string;
    reportDiscrepancyButton: string;
  };
  sourceExplorer: {
    modalTitle: string;
    authorityLabel: string;
    publishedLabel: string;
    verifiedLabel: string;
    docRefLabel: string;
    auditTrailHeader: string;
    viewOfficialSourceCta: string;
    reportDiscrepancyCta: string;
    closeCta: string;
  };
  errors: {
    networkOffline: string;
    rateLimitExceeded: string;
    queryTooShort: string;
    descriptionTooShort: string;
    gpsOutOfBounds: string;
    attachmentTooLarge: string;
    attachmentUnsupported: string;
    signatureFailed: string;
    streamFailed: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  // ========================================================================
  // ENGLISH
  // ========================================================================
  en: {
    brandName: 'Nairobi - Trusted AFCON Info',
    brandTagline: 'Civic verification platform for AFCON 2027 in Nairobi',
    metadata: {
      title: 'Nairobi — Trusted AFCON 2027 Information | Civic Trust System',
      description: 'The official civic trust information platform for AFCON 2027 in Nairobi. Find, understand, verify, and act on official transport, stadium, and safety notices.',
      keywords: ['AFCON 2027', 'Nairobi', 'Kenya', 'Talanta Sports City', 'Kasarani', 'Transport', 'Safety', 'KeNHA', 'CAF', 'NPS'],
      ogTitle: 'Nairobi — Trusted AFCON 2027 Information',
      ogDescription: 'Official civic trust platform for AFCON 2027 in Nairobi, Kenya.',
    },
    nav: {
      home: 'Home',
      askAi: 'Ask AI',
      browse: 'Browse Info',
      explainThis: 'Explain This',
      saved: 'Saved',
      howItWorks: 'How It Works',
      reportIssue: 'Report an Issue',
      emergency: 'Emergency Contacts',
      privacyNote: 'No account required. Saved items and reports are stored on this device only.',
      privacyTitle: 'Privacy-First Civic Session',
      privacySession: 'Anonymous session active • Device-only storage',
      searchPlaceholder: 'Search official AFCON info...',
      selectLanguage: 'Select Language',
      nairobiClock: 'Nairobi EAT',
      dropdown: {
        transportTitle: 'Transport & Mobility',
        transportDesc: 'Expressway, commuter rail, matatus',
        venuesTitle: 'Venues & Stadiums',
        venuesDesc: 'Talanta, Kasarani, Nyayo',
        safetyTitle: 'Safety & Assistance',
        safetyDesc: 'Emergency dispatch, medical posts',
        publicServicesTitle: 'Public Services',
        publicServicesDesc: 'Fan zones, e-visa, health checks',
      },
    },
    footer: {
      mission: 'An open civic information platform engineered to deliver verified, sourced, plain-language answers for Nairobi residents and visiting football fans during TotalEnergies AFCON 2027.',
      hackathonBadge: 'Built for the OSF × Andela Hackathon 2026',
      languageLabel: 'Language:',
      colExplore: 'Explore Platform',
      colTrust: 'Trust & Verification',
      colEmergency: 'Safety & Emergency',
      methodologyLink: 'Verification Methodology',
      legendLink: 'Badge Status Legend',
      sourcesLink: 'Accredited Source Roster',
      flagLink: 'Flag Incorrect Information',
      immediateAssistance: 'Immediate Assistance',
      nationalEmergency: 'National Emergency: 999 / 112',
      redCrossEmergency: 'Red Cross Ambulance: 1199',
      viewDirectory: 'View Full Emergency Directory →',
      institutionsHeader: 'Aggregated from accredited Kenyan public institutions:',
      disclaimerTitle: 'Civic Information Notice:',
      disclaimerText: 'Information is aggregated from verified public official sources. Always confirm critical travel and security decisions with official gazettes and security personnel on the ground.',
      craftedWithLove: 'Crafted for Nairobi & African Sport with',
    },
    mobileNav: {
      home: 'Home',
      ask: 'Ask AI',
      browse: 'Browse',
      saved: 'Saved',
    },
    floatingReport: {
      label: 'Report Issue',
      ariaLabel: 'Report an issue or safety hazard',
    },
    emergencyBanner: {
      badge: 'Immediate Danger?',
      text: 'In an emergency, do not wait for a search result.',
      cta: 'Call 999 / 112 Directly',
      dismiss: 'Dismiss safety banner',
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
      sampleQuestions: [
        'Is the road to Talanta Stadium open today?',
        'What is the official emergency number?',
        'Is public transport free with a match ticket?',
        'Can I bring water bottles into Kasarani?',
      ],
      trustedSourcedFrom: 'Verified across public official institutions:',
    },
    stats: {
      stadiumsCount: '3',
      stadiumsLabel: 'Host Stadiums',
      stadiumsDesc: 'Talanta, Kasarani, Nyayo',
      sourcedPct: '100%',
      sourcedLabel: 'Official Sourced',
      sourcedDesc: 'Public gazette backed',
      safetyHours: '24/7',
      safetyLabel: 'Safety Command',
      safetyDesc: 'Police & Red Cross 1199',
      trustSteps: '4-Step',
      trustLabel: 'Trust Loop',
      trustDesc: 'Find • Understand • Verify • Act',
    },
    monuments: {
      sportsMonument: {
        lowBandwidthTitle: 'Low-Bandwidth Mode',
        lowBandwidthDesc: 'Fast vector rendering active for battery & data savings.',
        turnOn3D: 'Turn On 3D Motion',
        lowDataMode: 'Low-Data Mode',
        interactiveLabel: 'Interactive 3D Living Monument • Move Cursor',
      },
      monumentLoop: {
        kicc: {
          name: 'KICC',
          fullName: 'Kenyatta International Convention Centre',
          tagline: "Nairobi's Architectural Crown",
        },
        museum: {
          name: 'National Museum',
          fullName: 'Nairobi National Museum',
          tagline: 'Heritage and Living Culture',
        },
        archives: {
          name: 'Kenya Archives',
          fullName: 'Kenya National Archives',
          tagline: 'CBD Historical Anchor',
        },
        lowBandwidthTitle: 'Low-Bandwidth Mode',
        lowBandwidthDesc: 'Fast vector rendering active.',
        turnOn3D: 'Turn On 3D',
        lowDataMode: 'Low-Data',
        interactiveLabel: 'Nairobi 3D Monument Loop • Move Cursor',
      },
    },
    categories: {
      sectionBadge: 'Categorized Directory',
      title: 'Explore by Category',
      subtitle: 'Structured civic guidance curated directly from accredited Kenyan and continental bodies.',
      transport: {
        title: 'Transport & Mobility',
        desc: 'Official shuttle routes, road closures, bus terminals, and parking protocols.',
      },
      venues: {
        title: 'Venue Information',
        desc: 'Gate opening times, prohibited items, accessibility, and stadium amenities.',
      },
      safety: {
        title: 'Safety & Assistance',
        desc: 'Emergency helplines, medical aid posts, police hubs, and crowd protocols.',
      },
      publicServices: {
        title: 'Public Services',
        desc: 'Consular aid, visa information, accredited clinics, and lost & found.',
      },
      exploreAllCta: 'Explore All Categories in Directory →',
    },
    trustLoop: {
      sectionBadge: 'Integrity Framework',
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
    notifications: {
      drawerTitle: 'Official Updates & Alerts',
      drawerSubtitle: 'AFCON 2027 Nairobi Live Dispatch',
      markAllRead: 'Mark read',
      viewAnswer: 'View Answer',
      emergencyDirectoryCta: 'Emergency Contacts Directory (999 / 112)',
      emptyText: 'No pending alerts. All civic corridors normal.',
    },
    ask: {
      badge: 'Real-Time Streaming Civic Q&A Intelligence',
      title: 'Ask Official AFCON 2027 Information',
      subtitle: 'Query in natural language. Responses stream in real-time with Server-Sent Events, verified against accredited Kenyan public authority gazettes with token provenance.',
      inputPlaceholder: 'Ask anything (e.g. Is public transport free with match ticket?)',
      clearButton: 'Clear',
      askButton: 'Ask AI',
      streamingButton: 'Streaming...',
      scopeLabel: 'Scope:',
      scopeAll: 'All Topics',
      tryLabel: 'Try:',
      suggestedQuestions: [
        { text: 'Is the road to Talanta Stadium closed on match days?', category: 'transport' },
        { text: 'Is public transport free on AFCON match days?', category: 'transport' },
        { text: 'Can I bring water bottles into Kasarani Stadium?', category: 'venues' },
        { text: 'What are the official emergency numbers during AFCON?', category: 'safety' },
        { text: 'Do I need a National ID or Passport to enter stadiums?', category: 'venues' },
        { text: 'What health inoculations or certificates are required for AFCON visitors?', category: 'public_services' },
      ],
      streamingWaitStatus: 'Contacting accredited civic intelligence engine...',
      verifyingDatabase: 'Cross-referencing accredited Kenyan public authority gazettes...',
      tokensMetric: 'tokens',
      latencyMetric: 'ms',
      saveButton: 'Save',
      savedButton: 'Saved',
      shareButton: 'Share',
      copiedButton: 'Copied',
      bridgeBannerTitle: 'Have a lengthy official announcement or legal gazette notice?',
      bridgeBannerDesc: 'Paste or select any gazette notice in our Explain This simplifier for an instant plain-language breakdown.',
      bridgeBannerCta: 'Open Explain This Tool →',
      relatedInquiriesTitle: 'Related Official Inquiries',
      askThisQuestion: 'Ask this question →',
      streamInterruptedTitle: 'Query Streaming Interrupted:',
    },
    report: {
      badge: 'Real-Time Local Authorities Dispatch Pipeline',
      title: 'Report an Issue or Safety Concern',
      subtitle: 'Submissions are cryptographically signed, timestamped, and dispatched directly to designated Kenyan public authority command centers (NPS, KeNHA, KRCS).',
      emergencyBoxTitle: 'Is there immediate danger or medical urgency?',
      emergencyBoxText: 'Do not wait for form processing. Call national emergency dispatch directly.',
      emergencyBoxCta: 'Call 999 / 112 / 1199 Now',
      categoryLabel: '1. Incident Category *',
      categories: {
        safety: {
          label: 'Safety Concern',
          desc: 'Active crowd hazard, perimeter breach, security risk, or medical urgency',
        },
        transport_hazard: {
          label: 'Transit / Road Hazard',
          desc: 'Road closure, matatu disruption, shuttle diversion, or gridlock',
        },
        incorrect_info: {
          label: 'Incorrect Official Information',
          desc: 'Discrepancy in timetable, ticket pricing, gate times, or venue rules',
        },
        broken_source: {
          label: 'Broken / Obsolete Source',
          desc: 'Official gazette link is dead, inaccessible, or contradictory',
        },
        other: {
          label: 'General Feedback / Inquiries',
          desc: 'Civic query, language translation request, or general observation',
        },
      },
      descriptionLabel: '2. Description of the issue *',
      descriptionHint: 'Minimum 5 characters',
      descriptionPlaceholder: "Describe the incident with specific facts (e.g. 'Route diversion on Thika Road near Kasarani Gate 2 due to fallen barrier')...",
      gpsSectionTitle: 'Precise Geospatial GPS Metadata',
      captureGpsButton: 'Capture Current Location',
      acquiringGpsButton: 'Acquiring GPS...',
      reacquireGpsButton: 'Re-acquire GPS',
      gpsVerifiedBadge: 'Nairobi Region Verified',
      gpsHint: "Optional: Click 'Capture Current Location' to append verified coordinates to the authority dispatch payload.",
      venueLabel: 'Venue or Landmark Name',
      venuePlaceholder: 'e.g. Kasarani Stadium, Gate 4',
      contactLabel: 'Contact Email or Phone',
      contactPlaceholder: 'For status updates or authority inquiries',
      mediaLabel: 'Media Attachments (Optional - Max 3)',
      mediaLimit: 'attached',
      uploadButton: 'Upload Photo / Evidence',
      uploadingButton: 'Hashing Attachment...',
      submitButton: 'Dispatch Report to Authorities',
      submittingButton: 'Dispatching...',
      disclaimerText: 'Payload is cryptographically signed and routed to accredited authorities.',
      confirmationTitle: 'Report Dispatched to Authorities',
      confirmationDesc: 'Your civic incident has been acknowledged and registered with the relevant emergency operations center.',
      trackingNoLabel: 'Official Tracking No:',
      ackIdLabel: 'Authority Ack ID:',
      routedDesksLabel: 'Routed Command Desks:',
      slaLabel: 'Response SLA:',
      slaMinutesText: 'Within {min} Minutes',
      emergencyEscalationTitle: 'Emergency Services Escalation:',
      emergencyEscalationText: 'For immediate life-safety or urgent field response, dial {hotline}.',
      submitAnotherButton: 'Submit Another Report',
      returnHomeButton: 'Return to Homepage',
    },
    saved: {
      badge: 'Dexie.js IndexedDB Architecture',
      title: 'Saved Information & Answers',
      subtitle: 'Access bookmarked transit routes, stadium rules, and verified AI answers even with zero internet connectivity.',
      syncOnline: 'Online & Cloud-Synced',
      syncOffline: 'Offline Mode • Stored Locally',
      pendingSyncs: 'Pending Syncs (Sync Now)',
      tabAll: 'All Saved',
      tabAnswers: 'Answers',
      tabNotices: 'Official Notices',
      itemSavedOn: 'Saved on',
      removeButton: 'Remove',
      reopenButton: 'Re-open full',
      emptyTitle: "You haven't saved anything yet.",
      emptyDesc: 'Bookmark any verified answer, transit advisory, or explained notice to preserve it locally in IndexedDB for 100% offline access.',
      askCta: 'Ask a Question',
      browseCta: 'Browse Information',
    },
    browse: {
      badge: 'Accredited Information Directory',
      title: 'Browse Verified AFCON Notices',
      subtitle: 'Inspect official announcements and operational directives categorized by domain with complete audit trails.',
      searchPlaceholder: 'Filter by keyword, topic, or venue...',
      filterLabel: 'Filter by Status:',
      sortLabel: 'Sort by:',
      sortRecent: 'Most Recent',
      sortStatus: 'Verification Status',
      statusAll: 'All Statuses',
      showingCount: 'Showing {count} official notices',
      emptyTitle: 'No matching records found',
      emptyDesc: 'Try adjusting your search keywords or switching category filters.',
      resetFilters: 'Reset all filters',
    },
    explain: {
      badge: 'Plain-Language Civic Notice Simplifier',
      title: 'Explain Official Notice or Gazette',
      subtitle: 'Paste complex administrative gazettes or select a tournament bulletin for an instant breakdown of key points, affected groups, and required actions.',
      sampleSelectorLabel: 'Choose an official notice preset:',
      textareaLabel: 'Or paste official administrative text below:',
      textareaPlaceholder: 'Paste gazette text, legal directive, or police traffic notice here...',
      analyzeButton: 'Explain in Plain Language',
      analyzingButton: 'De-bureaucratizing & Verifying...',
      resultBadge: 'Plain Language Breakdown',
      plainSummaryTitle: 'Plain-Language Summary',
      keyPointsTitle: 'Key Takeaways',
      whoAffectedTitle: 'Who Is Affected?',
      whenAppliesTitle: 'When Does It Apply?',
      requiredActionTitle: 'Required Citizen Action',
      sourceTitle: 'Issuing Authority & Verification',
      viewOriginalGazette: 'Inspect Official Gazette Link',
      saveExplanation: 'Bookmark Explanation',
    },
    emergency: {
      badge: 'Immediate Life-Safety Directory',
      title: 'Official AFCON 2027 Emergency Hotline',
      subtitle: 'Direct emergency telephone lines, stadium medical aid posts, and rapid response units across Nairobi with zero latency.',
      callNowCta: 'Call Direct Now',
      tollFreeLabel: 'Toll-free from any mobile network',
      venuePostsTitle: 'Stadium Medical Aid Posts & Triage Hubs',
      venuePostsSubtitle: 'On-site emergency first-aid stations operational on all match fixtures.',
      medicalFacilitiesTitle: 'Major Accredited Nairobi Trauma Centers',
      guidelinesTitle: 'Critical Match-Day Safety Protocols',
      guidelines: [
        'Always identify your nearest emergency gate exit as soon as you enter any stadium concourse.',
        'In case of crowd crush, move diagonally with the surge towards perimeter relief gates rather than pushing backwards.',
        'Carry physical photo identification (National ID or Passport) and your digital AFCON match credential at all times.',
        'Official medical first-responders wear high-visibility Kenya Red Cross / St. John Ambulance vests with accredited ID passes.',
      ],
    },
    howItWorks: {
      badge: 'Transparency & Methodology',
      title: 'How Civic Trust Works',
      subtitle: 'Nairobi — Trusted AFCON Info is an open civic verification system built to eliminate rumors and confusion during the 2027 Africa Cup of Nations in Nairobi.',
      loopTitle: 'FIND → UNDERSTAND → VERIFY → ACT',
      loopSubtitle: 'Every screen and interaction on this platform is structured around this 4-stage integrity principle.',
      loopSteps: [
        {
          title: '1. FIND',
          desc: 'Citizens and visitors ask natural language questions or browse structured categories.',
          detail: 'No search operators or bureaucratic terms needed. Instant natural language match.',
        },
        {
          title: '2. UNDERSTAND',
          desc: 'Administrative directives and legal gazettes are summarized into plain, direct language.',
          detail: 'Complex traffic diversion orders or gate regulations are parsed into simple action items.',
        },
        {
          title: '3. VERIFY',
          desc: 'Every item exposes its accredited issuing institution, publication date, and verification status.',
          detail: 'Complete audit trails showing who verified the item, when it was verified, and link to statutory source.',
        },
        {
          title: '4. ACT',
          desc: 'Direct phone numbers, GPS coordinates, route options, or official reporting tools.',
          detail: 'Zero dead ends. Direct one-click calls to emergency lines, route directions, and authority portals.',
        },
      ],
      verificationTitle: 'The Verification Badge System',
      verificationSubtitle: 'Four standardized states represent the freshness and credibility of every record.',
      freshnessTitle: 'Continuous Freshness Re-Verification',
      freshnessDesc: 'Every record has a maximum verification freshness window (typically 24 to 72 hours). When notices expire without re-confirmation, their badge automatically updates.',
      institutionsTitle: 'Accredited Source Registry',
      institutionsSubtitle: 'We only source civic directives from authorized Kenyan and continental regulatory bodies.',
    },
    cards: {
      sourceLabel: 'Source:',
      publishedLabel: 'Published:',
      verifiedLabel: 'Verified:',
      viewAuditTrail: 'View Full Source & Audit Trail',
      nextStepsTitle: 'Recommended Next Steps',
      helpfulPrompt: 'Was this answer helpful?',
      helpfulThankYou: 'Thank you for your civic feedback!',
      readFullNotice: 'Read Full Verified Notice',
    },
    unverified: {
      badge: 'Could Not Verify Source',
      title: "We couldn't verify this information from a reliable official source.",
      queryLabel: 'Inquiry:',
      whyTitle: 'Why this happened:',
      whyExplanation: 'Our civic integrity engine cross-references queries against official gazettes from KeNHA, the National Police Service, CAF, and Nairobi City County. We found no confirmed statutory notice or verified announcement matching this request.',
      safeActionsTitle: 'Recommended Safe Actions',
      safeActionAuthority: 'Check directly with the accredited authority:',
      safeActionSocialWarning: 'Do not rely on unverified social media claims or informal street rumors.',
      callHelpdeskButton: 'Call Official Helpdesk',
      visitPortalButton: 'Visit CAF Tournament Portal',
      reportDiscrepancyButton: 'Have an official link to suggest? Report it',
    },
    sourceExplorer: {
      modalTitle: 'Official Sourced Intelligence & Audit Trail',
      authorityLabel: 'Accredited Authority:',
      publishedLabel: 'Publication Date:',
      verifiedLabel: 'Last Verified Timestamp:',
      docRefLabel: 'Direct Gazette Document Reference:',
      auditTrailHeader: 'Audit Trail & Verification Chronology',
      viewOfficialSourceCta: 'View Official Gazette / Source Website',
      reportDiscrepancyCta: 'Report Discrepancy or Broken Link',
      closeCta: 'Done & Close',
    },
    errors: {
      networkOffline: 'Network connection unavailable. Operating in local offline mode.',
      rateLimitExceeded: 'Rate limit exceeded (15 queries/min). Please wait a moment before trying again.',
      queryTooShort: 'Inquiry is too short. Please provide at least 3 characters.',
      descriptionTooShort: 'Report description must be at least 5 characters long.',
      gpsOutOfBounds: 'Coordinates fall outside the Nairobi metropolitan boundary.',
      attachmentTooLarge: 'Attachment exceeds the 5MB size limit.',
      attachmentUnsupported: 'Media format is not supported. Please upload JPEG, PNG, WEBP, or PDF.',
      signatureFailed: 'Security verification failed: invalid client signature.',
      streamFailed: 'Streaming connection interrupted. Retrying...',
    },
  },

  // ========================================================================
  // KISWAHILI (National & Official Language in Kenya and East Africa)
  // ========================================================================
  sw: {
    brandName: 'Nairobi — Habari Rasmi za AFCON',
    brandTagline: 'Jukwaa la kuaminika la wananchi kwa AFCON 2027 jijini Nairobi',
    metadata: {
      title: 'Nairobi — Habari Rasmi za AFCON 2027 | Mfumo wa Kuaminika wa Kiraia',
      description: 'Jukwaa rasmi la taarifa za kuaminika za AFCON 2027 jijini Nairobi. Tafuta, elewa, thibitisha na chukua hatua kuhusu usafiri, viwanja na usalama.',
      keywords: ['AFCON 2027', 'Nairobi', 'Kenya', 'Uwanja wa Talanta', 'Kasarani', 'Usafiri', 'Usalama', 'KeNHA', 'CAF', 'Polisi'],
      ogTitle: 'Nairobi — Habari Rasmi za AFCON 2027',
      ogDescription: 'Jukwaa rasmi la taarifa za kuaminika za AFCON 2027 jijini Nairobi, Kenya.',
    },
    nav: {
      home: 'Nyumbani',
      askAi: 'Uliza AI',
      browse: 'Vinjari Habari',
      explainThis: 'Fafanua Hii',
      saved: 'Zilizohifadhiwa',
      howItWorks: 'Jinsi Inavyofanya Kazi',
      reportIssue: 'Ripoti Shida',
      emergency: 'Nambari za Dharura',
      privacyNote: 'Hakuna akaunti inayohitajika. Taarifa na ripoti huhifadhiwa kwenye kifaa hiki pekee.',
      privacyTitle: 'Kipindi cha Kiraia chenye Usiri',
      privacySession: 'Kipindi cha siri kinaendelea • Hifadhi ya kifaa pekee',
      searchPlaceholder: 'Tafuta habari rasmi za AFCON...',
      selectLanguage: 'Chagua Lugha',
      nairobiClock: 'Nairobi EAT',
      dropdown: {
        transportTitle: 'Usafiri na Uhamaji',
        transportDesc: 'Barabara kuu, treni ya jiji, matatu',
        venuesTitle: 'Viwanja na Michezo',
        venuesDesc: 'Talanta, Kasarani, Nyayo',
        safetyTitle: 'Usalama na Msaada',
        safetyDesc: 'Msaada wa haraka, vituo vya afya',
        publicServicesTitle: 'Huduma za Umma',
        publicServicesDesc: 'Maeneo ya mashabiki, viza, afya',
      },
    },
    footer: {
      mission: 'Jukwaa huru la taarifa za kiraia lililojengwa kutoa majibu yaliyothibitishwa, yenye vyanzo, na lugha nyepesi kwa wakazi wa Nairobi na mashabiki wanaotembelea wakati wa TotalEnergies AFCON 2027.',
      hackathonBadge: 'Imejengwa kwa ajili ya OSF × Andela Hackathon 2026',
      languageLabel: 'Lugha:',
      colExplore: 'Chunguza Jukwaa',
      colTrust: 'Uaminifu na Uhakiki',
      colEmergency: 'Usalama na Dharura',
      methodologyLink: 'Mbinu za Uhakiki',
      legendLink: 'Maelezo ya Beji',
      sourcesLink: 'Orodha ya Vyanzo Rasmi',
      flagLink: 'Ripoti Taarifa Zisizo Sahihi',
      immediateAssistance: 'Msaada wa Papo Hapo',
      nationalEmergency: 'Dharura ya Kitaifa: 999 / 112',
      redCrossEmergency: 'Ambulensi ya Msalaba Mwekundu: 1199',
      viewDirectory: 'Tazama Orodha Kamili ya Dharura →',
      institutionsHeader: 'Imekusanywa kutoka taasisi rasmi zilizoidhinishwa nchini Kenya:',
      disclaimerTitle: 'Ilani ya Taarifa za Kiraia:',
      disclaimerText: 'Taarifa zimekusanywa kutoka vyanzo rasmi vya kiserikali vilivyothibitishwa. Kila mara thibitisha safari muhimu na usalama kupitia matangazo ya gazeti rasmi na maafisa walioko uwanjani.',
      craftedWithLove: 'Imeandaliwa kwa ajili ya Nairobi na Michezo ya Afrika kwa',
    },
    mobileNav: {
      home: 'Nyumbani',
      ask: 'Uliza AI',
      browse: 'Vinjari',
      saved: 'Zilizohifadhiwa',
    },
    floatingReport: {
      label: 'Ripoti Shida',
      ariaLabel: 'Ripoti shida au hatari ya usalama',
    },
    emergencyBanner: {
      badge: 'Dharura ya Papo Hapo?',
      text: 'Wakati wa dharura, usisubiri majibu ya utafutaji.',
      cta: 'Piga 999 / 112 Moja kwa Moja',
      dismiss: 'Funga ilani ya usalama',
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
      sampleQuestions: [
        'Je, barabara ya kuelekea Uwanja wa Talanta imefungwa leo?',
        'Nambari rasmi ya dharura ni ipi?',
        'Je, usafiri wa umma ni bure ukiwa na tiketi ya mechi?',
        'Je, ninaweza kuingia na chupa za maji Kasarani?',
      ],
      trustedSourcedFrom: 'Imethibitishwa kutoka asasi rasmi za kiserikali:',
    },
    stats: {
      stadiumsCount: '3',
      stadiumsLabel: 'Viwanja Wenyeji',
      stadiumsDesc: 'Talanta, Kasarani, Nyayo',
      sourcedPct: '100%',
      sourcedLabel: 'Chanzo Rasmi',
      sourcedDesc: 'Kutoka gazeti rasmi la serikali',
      safetyHours: 'Masaa 24',
      safetyLabel: 'Kamandi ya Usalama',
      safetyDesc: 'Polisi & Msalaba Mwekundu 1199',
      trustSteps: 'Hatua 4',
      trustLabel: 'Mzunguko wa Uaminifu',
      trustDesc: 'Tafuta • Elewa • Thibitisha • Chukua Hatua',
    },
    monuments: {
      sportsMonument: {
        lowBandwidthTitle: 'Hali ya Data Chache',
        lowBandwidthDesc: 'Michoro mepesi inayohifadhi betri na bando la mtandao.',
        turnOn3D: 'Washa Mwonekano wa 3D',
        lowDataMode: 'Hali ya Data Chini',
        interactiveLabel: 'Mnara wa 3D Unaosogea • Sogeza Kipanya',
      },
      monumentLoop: {
        kicc: {
          name: 'KICC',
          fullName: 'Jengo la Mikutano la Kimataifa la Kenyatta',
          tagline: 'Taji la Usanifu wa Majengo Nairobi',
        },
        museum: {
          name: 'Makumbusho ya Kitaifa',
          fullName: 'Makumbusho ya Kitaifa ya Nairobi',
          tagline: 'Urithi na Utamaduni Hai',
        },
        archives: {
          name: 'Nyaraka za Kitaifa',
          fullName: 'Nyaraka za Kitaifa za Kenya',
          tagline: 'Kituo cha Kihistoria cha Katikati ya Jiji',
        },
        lowBandwidthTitle: 'Hali ya Data Chache',
        lowBandwidthDesc: 'Michoro mepesi imewashwa.',
        turnOn3D: 'Washa 3D',
        lowDataMode: 'Data Chini',
        interactiveLabel: 'Mzunguko wa Minara ya 3D Nairobi • Sogeza Kipanya',
      },
    },
    categories: {
      sectionBadge: 'Orodha ya Vitengo',
      title: 'Chunguza kwa Kitengo',
      subtitle: 'Mwongozo wa kiraia uliopangiliwa moja kwa moja kutoka asasi zilizoidhinishwa nchini Kenya.',
      transport: {
        title: 'Usafiri na Uhamaji',
        desc: 'Njia rasmi za mabasi, barabara zilizofungwa, stesheni na taratibu za kuegesha magari.',
      },
      venues: {
        title: 'Taarifa za Viwanja',
        desc: 'Saa za kufungua milango, vitu vilivyopigwa marufuku na huduma za uwanjani.',
      },
      safety: {
        title: 'Usalama na Msaada',
        desc: 'Nambari za dharura, vituo vya huduma ya kwanza, polisi na usimamizi wa umati.',
      },
      publicServices: {
        title: 'Huduma za Umma',
        desc: 'Usaidizi wa kitalii, taarifa za viza, zahanati na vitu vilivyopotea.',
      },
      exploreAllCta: 'Chunguza Vitengo Vyote Kwenye Orodha →',
    },
    trustLoop: {
      sectionBadge: 'Mfumo wa Ukweli',
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
    notifications: {
      drawerTitle: 'Taarifa Rasmi na Tahadhari',
      drawerSubtitle: 'Matangazo ya Moja kwa Moja ya AFCON 2027 Nairobi',
      markAllRead: 'Weka imesomwa',
      viewAnswer: 'Tazama Jibu',
      emergencyDirectoryCta: 'Orodha ya Nambari za Dharura (999 / 112)',
      emptyText: 'Hakuna tahadhari zilizopo. Njia zote ziko shwari.',
    },
    ask: {
      badge: 'Akili Bandia ya Maswali na Majibu Papo Hapo',
      title: 'Uliza Habari Rasmi za AFCON 2027',
      subtitle: 'Uliza kwa lugha ya kawaida. Majibu yanatiririka moja kwa moja kupitia Server-Sent Events, yakithibitishwa kutoka magazeti rasmi ya Kenya.',
      inputPlaceholder: 'Uliza lolote (mfano: Je, usafiri ni bure ukiwa na tiketi ya mechi?)',
      clearButton: 'Futa',
      askButton: 'Uliza AI',
      streamingButton: 'Inajibu...',
      scopeLabel: 'Eneo:',
      scopeAll: 'Mada Zote',
      tryLabel: 'Jaribu:',
      suggestedQuestions: [
        { text: 'Je, barabara ya kuelekea Uwanja wa Talanta imefungwa siku za mechi?', category: 'transport' },
        { text: 'Je, usafiri wa umma ni bure siku za mechi za AFCON?', category: 'transport' },
        { text: 'Je, ninaweza kuingia na chupa za maji kwenye Uwanja wa Kasarani?', category: 'venues' },
        { text: 'Nambari rasmi za dharura wakati wa AFCON ni zipi?', category: 'safety' },
        { text: 'Je, ninahitaji Kitambulisho cha Taifa au Pasipoti kuingia uwanjani?', category: 'venues' },
        { text: 'Ni chanjo au vyeti gani vya afya vinavyohitajika kwa wageni wa AFCON?', category: 'public_services' },
      ],
      streamingWaitStatus: 'Inawasiliana na mfumo rasmi wa akili bandia ya kiraia...',
      verifyingDatabase: 'Inakagua magazeti rasmi ya serikali ya Kenya...',
      tokensMetric: 'vipande',
      latencyMetric: 'ms',
      saveButton: 'Hifadhi',
      savedButton: 'Imehifadhiwa',
      shareButton: 'Sambaza',
      copiedButton: 'Imenakiliwa',
      bridgeBannerTitle: 'Una tangazo refu la kiserikali au agizo la kisheria?',
      bridgeBannerDesc: 'Weka au chagua tangazo lolote kwenye chombo chetu cha Kufafanua ili kupata maelezo rahisi mara moja.',
      bridgeBannerCta: 'Fungua Chombo cha Kufafanua →',
      relatedInquiriesTitle: 'Maswali Rasmi Yanayohusiana',
      askThisQuestion: 'Uliza swali hili →',
      streamInterruptedTitle: 'Mtiririko wa Jibu Umekatizwa:',
    },
    report: {
      badge: 'Mfumo Rasmi wa Kutuma Taarifa kwa Mamlaka',
      title: 'Ripoti Shida au Swala la Usalama',
      subtitle: 'Ripoti zinasainiwa kidijitali, zinawekwa alama ya wakati, na kutumwa moja kwa moja kwenye vituo vya amri vya mamlaka za Kenya (NPS, KeNHA, KRCS).',
      emergencyBoxTitle: 'Je, kuna hatari ya papo hapo au uhitaji wa daktari?',
      emergencyBoxText: 'Usisubiri jibu la fomu hii. Piga simu huduma za dharura za kitaifa mara moja.',
      emergencyBoxCta: 'Piga 999 / 112 / 1199 Sasa',
      categoryLabel: '1. Kitengo cha Tukio *',
      categories: {
        safety: {
          label: 'Swala la Usalama',
          desc: 'Hatari ya umati, uvunjifu wa uzio, hatari ya kiusalama au dharura ya matibabu',
        },
        transport_hazard: {
          label: 'Kikwazo cha Usafiri / Barabara',
          desc: 'Kufungwa kwa barabara, vurugu ya matatu, mabadiliko ya njia au msongamano',
        },
        incorrect_info: {
          label: 'Taarifa Isiyo Sahihi',
          desc: 'Tofauti kwenye ratiba, bei ya tiketi, saa za milango au sheria za uwanja',
        },
        broken_source: {
          label: 'Chanzo Kilichoharibika au cha Zamani',
          desc: 'Kiungo cha gazeti rasmi hakifanyi kazi, hakifikiwi au kinapingana',
        },
        other: {
          label: 'Maoni ya Jumla / Maswali',
          desc: 'Swali la kiraia, ombi la tafsiri au maoni ya jumla',
        },
      },
      descriptionLabel: '2. Maelezo ya shida au tukio *',
      descriptionHint: 'Angalau herufi 5',
      descriptionPlaceholder: "Eleza kile kilichotokea kwa ufasaha (mfano: 'Kizuizi cha barabara Thika karibu na lango la Kasarani 2 kimeanguka')...",
      gpsSectionTitle: 'Majira Sahihi ya Kijiografia (GPS)',
      captureGpsButton: 'Chukua Eneo la Sasa',
      acquiringGpsButton: 'Inatafuta GPS...',
      reacquireGpsButton: 'Tafuta GPS Tena',
      gpsVerifiedBadge: 'Eneo la Nairobi Limethibitishwa',
      gpsHint: "Hiari: Bonyeza 'Chukua Eneo la Sasa' ili kuambatanisha majira halisi kwenye ripoti ya mamlaka.",
      venueLabel: 'Jina la Uwanja au Eneo Maarufu',
      venuePlaceholder: 'mfano: Uwanja wa Kasarani, Lango 4',
      contactLabel: 'Barua Pepe au Nambari ya Simu',
      contactPlaceholder: 'Kwa ajili ya taarifa zaidi au mawasiliano ya mamlaka',
      mediaLabel: 'Vielelezo vya Picha / Nyaraka (Hiari - Upeo 3)',
      mediaLimit: 'zimeambatishwa',
      uploadButton: 'Pakia Picha / Kielelezo',
      uploadingButton: 'Inakagua Kielelezo...',
      submitButton: 'Tuma Ripoti kwa Mamlaka Rasmi',
      submittingButton: 'Inatuma...',
      disclaimerText: 'Taarifa inalindwa kidijitali na kupelekwa kwa mamlaka zilizoidhinishwa.',
      confirmationTitle: 'Ripoti Imetumwa kwa Mamlaka Kikamilifu',
      confirmationDesc: 'Ripoti yako imepokewa na kusajiliwa katika kituo husika cha operesheni za dharura.',
      trackingNoLabel: 'Nambari Rasmi ya Ufuatiliaji:',
      ackIdLabel: 'Kitambulisho cha Ithibati ya Mamlaka:',
      routedDesksLabel: 'Dawati Lililopokea:',
      slaLabel: 'Muda wa Kujibu (SLA):',
      slaMinutesText: 'Ndani ya Dakika {min}',
      emergencyEscalationTitle: 'Msaada wa Haraka wa Dharura:',
      emergencyEscalationText: 'Kwa dharura inayotishia maisha au usaidizi wa papo hapo, piga simu {hotline}.',
      submitAnotherButton: 'Tuma Ripoti Nyingine',
      returnHomeButton: 'Rudi Ukurasa Mkuu',
    },
    saved: {
      badge: 'Mfumo wa IndexedDB wa Dexie.js',
      title: 'Habari na Majibu Yaliyohifadhiwa',
      subtitle: 'Fikia njia za usafiri, sheria za viwanja, na majibu ya AI hata ukiwa bila mtandao kabisa.',
      syncOnline: 'Mtandaoni na Imesawazishwa',
      syncOffline: 'Hali ya Nje ya Mtandao • Kwenye Kifaa',
      pendingSyncs: 'Zinasubiri Kusawazishwa (Sawazisha Sasa)',
      tabAll: 'Zote Zilizohifadhiwa',
      tabAnswers: 'Majibu',
      tabNotices: 'Matangazo Rasmi',
      itemSavedOn: 'Ilihifadhiwa tarehe',
      removeButton: 'Ondoa',
      reopenButton: 'Fungua yote',
      emptyTitle: 'Hujahifadhi kitu chochote bado.',
      emptyDesc: 'Weka alama kwenye jibu lolote lililothibitishwa au tangazo ili kulihifadhi kwenye kifaa kwa matumizi ya bila mtandao.',
      askCta: 'Uliza Swali',
      browseCta: 'Vinjari Habari',
    },
    browse: {
      badge: 'Orodha ya Habari Zilizoidhinishwa',
      title: 'Vinjari Matangazo Yaliyothibitishwa ya AFCON',
      subtitle: 'Kagua matangazo rasmi na maagizo ya utendaji yaliyopangwa kwa vitengo na historia kamili ya uhakiki.',
      searchPlaceholder: 'Chuja kwa neno kuu, mada, au uwanja...',
      filterLabel: 'Chuja kwa Hadhi:',
      sortLabel: 'Panga kwa:',
      sortRecent: 'Mpya Zaidi',
      sortStatus: 'Hadhi ya Uhakiki',
      statusAll: 'Hadhi Zote',
      showingCount: 'Inaonyesha matangazo rasmi {count}',
      emptyTitle: 'Hakuna rekodi zilizopatikana',
      emptyDesc: 'Jaribu kubadilisha maneno ya utafutaji au ubadilishe kitengo cha uchujaji.',
      resetFilters: 'Rudisha vichungi vyote',
    },
    explain: {
      badge: 'Kirahisishi cha Matangazo ya Kiserikali',
      title: 'Fafanua Tangazo Rasmi au Gazeti la Serikali',
      subtitle: 'Bandika matangazo magumu ya kiserikali au chagua taarifa ya mashindano kupata maelezo mepesi ya vidokezo vikuu na hatua unazopaswa kuchukua.',
      sampleSelectorLabel: 'Chagua mfano wa tangazo rasmi:',
      textareaLabel: 'Au bandika maandishi rasmi ya kiutawala hapa chini:',
      textareaPlaceholder: 'Bandika maandishi ya gazeti la serikali au ilani ya polisi hapa...',
      analyzeButton: 'Fafanua kwa Lugha Rahisi',
      analyzingButton: 'Inachambua na Kuthibitisha...',
      resultBadge: 'Uchambuzi wa Lugha Nyepesi',
      plainSummaryTitle: 'Muhtasari wa Lugha Rahisi',
      keyPointsTitle: 'Mambo Muhimu ya Kujua',
      whoAffectedTitle: 'Nani Anayeathirika?',
      whenAppliesTitle: 'Inaanza Kutumika Lini?',
      requiredActionTitle: 'Hatua Inayotakiwa kwa Mwananchi',
      sourceTitle: 'Taasisi Iliyotoa na Uhakiki',
      viewOriginalGazette: 'Kagua Kiungo cha Gazeti Rasmi',
      saveExplanation: 'Hifadhi Ufafanuzi Huu',
    },
    emergency: {
      badge: 'Orodha ya Kulinda Maisha Papo Hapo',
      title: 'Nambari Rasmi za Dharura za AFCON 2027',
      subtitle: 'Nambari za simu za dharura za moja kwa moja, vituo vya matibabu uwanjani, na vitengo vya uokoaji jijini Nairobi bila ucheleweshaji.',
      callNowCta: 'Piga Simu Sasa Hivi',
      tollFreeLabel: 'Bure kutoka mtandao wowote wa simu',
      venuePostsTitle: 'Vituo vya Msaada wa Matibabu Viwanjani',
      venuePostsSubtitle: 'Vituo vya huduma ya kwanza vya uwanjani vinavyofanya kazi wakati wote wa mechi.',
      medicalFacilitiesTitle: 'Hospitali Kuu Zilizoidhinishwa Nairobi',
      guidelinesTitle: 'Miongozo Muhimu ya Usalama Siku ya Mechi',
      guidelines: [
        'Tambua mlango wa dharura ulio karibu nawe mara tu unapoingia uwanjani.',
        'Kukitokea msongamano mkubwa, sogea kuelekea pembeni mwa njia badala ya kusukuma kurudi nyuma.',
        'Beba kitambulisho chenye picha (Kitambulisho cha Taifa au Pasipoti) na tiketi yako ya kidijitali ya AFCON wakati wote.',
        'Wahudumu rasmi wa matibabu huvaa vizibao maalum vya Msalaba Mwekundu / St. John Ambulance vyenye vitambulisho rasmi.',
      ],
    },
    howItWorks: {
      badge: 'Uwazi na Mbinu Zetu',
      title: 'Jinsi Mfumo wa Kuaminika Unavyofanya Kazi',
      subtitle: 'Nairobi — Habari Rasmi za AFCON ni mfumo huru wa uhakiki wa kiraia uliojengwa kuondoa uvumi na mkanganyiko wakati wa Kombe la Mataifa ya Afrika 2027 jijini Nairobi.',
      loopTitle: 'TAFUTA → ELEWA → THIBITISHA → CHUKUA HATUA',
      loopSubtitle: 'Kila skrini na mwingiliano kwenye jukwaa hili umejengwa juu ya kanuni hizi 4 za uadilifu.',
      loopSteps: [
        {
          title: '1. TAFUTA',
          desc: 'Wananchi na wageni wanauliza maswali kwa lugha ya kawaida au kuvinjari vitengo vilivyopangwa.',
          detail: 'Hakuna haja ya maneno magumu ya kiofisi. Majibu ya papo hapo kwa lugha nyepesi.',
        },
        {
          title: '2. ELEWA',
          desc: 'Maagizo ya kiserikali na sheria zinarahisishwa kuwa lugha wazi na inayoeleweka.',
          detail: 'Maagizo ya mabadiliko ya barabara au sheria za viwanja yanabadilishwa kuwa vitendo rahisi.',
        },
        {
          title: '3. THIBITISHA',
          desc: 'Kila taarifa inaonyesha taasisi iliyoitoa, tarehe ya kuchapishwa, na hadhi ya uhakiki.',
          detail: 'Historia kamili inayoonyesha nani alithibitisha, lini, na kiungo cha gazeti rasmi.',
        },
        {
          title: '4. CHUKUA HATUA',
          desc: 'Nambari za simu za moja kwa moja, majira ya GPS, na viungo rasmi vya utendaji.',
          detail: 'Hakuna mwisho usio na majibu. Piga simu za dharura au pata mwelekeo kwa kubonyeza mara moja.',
        },
      ],
      verificationTitle: 'Mfumo wa Beji za Uhakiki',
      verificationSubtitle: 'Hadhi nne za viwango zinaeleza ukweli na usahihi wa kila taarifa.',
      freshnessTitle: 'Uhakiki wa Mara kwa Mara wa Upya wa Taarifa',
      freshnessDesc: 'Kila taarifa ina muda maalum wa kuhesabiwa kuwa mpya (kwa kawaida saa 24 hadi 72). Taarifa ikipitwa na wakati bila uthibitisho mpya, beji inabadilika kiotomatiki.',
      institutionsTitle: 'Orodha ya Asasi Zilizoidhinishwa',
      institutionsSubtitle: 'Tunatoa taarifa kutoka mamlaka halisi zilizoidhinishwa nchini Kenya na barani Afrika pekee.',
    },
    cards: {
      sourceLabel: 'Chanzo:',
      publishedLabel: 'Ilichapishwa:',
      verifiedLabel: 'Imethibitishwa:',
      viewAuditTrail: 'Tazama Chanzo Kamili na Historia',
      nextStepsTitle: 'Hatua Zinazopendekezwa Kufuata',
      helpfulPrompt: 'Je, jibu hili limekusaidia?',
      helpfulThankYou: 'Asante kwa maoni yako ya kiraia!',
      readFullNotice: 'Soma Tangazo Kamili Lililothibitishwa',
    },
    unverified: {
      badge: 'Haikuweza Kuthibitisha Chanzo',
      title: 'Hatujaweza kuthibitisha taarifa hii kutoka chanzo rasmi kinachoaminika.',
      queryLabel: 'Swali:',
      whyTitle: 'Kwa nini imekuwa hivi:',
      whyExplanation: 'Mfumo wetu unakagua maswali dhidi ya magazeti rasmi ya KeNHA, Jeshi la Polisi, CAF, na Serikali ya Kaunti ya Nairobi. Hatukupata tangazo rasmi linalolingana na ombi hili.',
      safeActionsTitle: 'Hatua Salama Zinazopendekezwa',
      safeActionAuthority: 'Wasiliana moja kwa moja na mamlaka husika:',
      safeActionSocialWarning: 'Usitegemee madai ya mitandao ya kijamii au uvumi usio na ushahidi.',
      callHelpdeskButton: 'Piga Dawati Rasmi la Msaada',
      visitPortalButton: 'Tembelea Tovuti ya CAF',
      reportDiscrepancyButton: 'Una kiungo rasmi cha kupendekeza? Kiripoti',
    },
    sourceExplorer: {
      modalTitle: 'Taarifa Rasmi Zilizoidhinishwa na Historia ya Uhakiki',
      authorityLabel: 'Mamlaka Iliyoidhinishwa:',
      publishedLabel: 'Tarehe ya Kuchapishwa:',
      verifiedLabel: 'Wakati Uliothibitishwa Mwisho:',
      docRefLabel: 'Kumbukumbu Rasmi ya Gazeti la Serikali:',
      auditTrailHeader: 'Historia ya Uhakiki na Mfuatano wa Matukio',
      viewOfficialSourceCta: 'Tazama Gazeti Rasmi / Tovuti ya Chanzo',
      reportDiscrepancyCta: 'Ripoti Tofauti au Kiungo Kisichofanya Kazi',
      closeCta: 'Imekamilika & Funga',
    },
    errors: {
      networkOffline: 'Mtandao haupatikani. Mfumo unafanya kazi nje ya mtandao.',
      rateLimitExceeded: 'Kikomo cha maombi kimefikiwa (maswali 15 kwa dakika). Tafadhali subiri kidogo.',
      queryTooShort: 'Swali ni fupi mno. Tafadhali andika angalau herufi 3.',
      descriptionTooShort: 'Maelezo ya ripoti lazima yawe na angalau herufi 5.',
      gpsOutOfBounds: 'Majira ya GPS yako nje ya eneo la jiji la Nairobi.',
      attachmentTooLarge: 'Kielelezo kimezidi kikomo cha ukubwa wa 5MB.',
      attachmentUnsupported: 'Aina ya faili haikubaliki. Tafadhali pakia JPEG, PNG, WEBP, au PDF.',
      signatureFailed: 'Uthibitisho wa kiusalama umeshindwa: sahihi ya kidijitali si sahihi.',
      streamFailed: 'Mtiririko wa mawasiliano umekatika. Inajaribu tena...',
    },
  },

  // ========================================================================
  // FRENCH (Official CAF Language & Visiting African Fans)
  // ========================================================================
  fr: {
    brandName: 'Nairobi — Infos AFCON Certifiées',
    brandTagline: 'Plateforme civique d’information certifiée pour la CAN 2027 à Nairobi',
    metadata: {
      title: 'Nairobi — Informations Officielles CAN 2027 | Système de Confiance Civique',
      description: 'Plateforme officielle d’information certifiée pour la CAN 2027 à Nairobi. Trouvez, comprenez, vérifiez et agissez sur les transports, les stades et la sécurité.',
      keywords: ['CAN 2027', 'AFCON 2027', 'Nairobi', 'Kenya', 'Stade Talanta', 'Kasarani', 'Transports', 'Sécurité', 'KeNHA', 'CAF', 'Police'],
      ogTitle: 'Nairobi — Informations Officielles CAN 2027',
      ogDescription: 'Plateforme civique de confiance pour la CAN 2027 à Nairobi, Kenya.',
    },
    nav: {
      home: 'Accueil',
      askAi: 'Demander à l’IA',
      browse: 'Parcourir',
      explainThis: 'Expliquer un texte',
      saved: 'Favoris',
      howItWorks: 'Fonctionnement',
      reportIssue: 'Signaler un problème',
      emergency: 'Urgences',
      privacyNote: 'Aucun compte requis. Vos favoris et signalements restent sur cet appareil uniquement.',
      privacyTitle: 'Session Civique Respectueuse de la Vie Privée',
      privacySession: 'Session anonyme active • Stockage local uniquement',
      searchPlaceholder: 'Rechercher des informations officielles...',
      selectLanguage: 'Choisir la langue',
      nairobiClock: 'Nairobi EAT',
      dropdown: {
        transportTitle: 'Transports & Mobilité',
        transportDesc: 'Voie rapide, train urbain, matatus',
        venuesTitle: 'Stades & Sites',
        venuesDesc: 'Talanta, Kasarani, Nyayo',
        safetyTitle: 'Sécurité & Secours',
        safetyDesc: 'Postes médicaux, urgences, police',
        publicServicesTitle: 'Services Publics',
        publicServicesDesc: 'Zones supporters, visa, santé',
      },
    },
    footer: {
      mission: 'Une plateforme civique ouverte conçue pour fournir des réponses vérifiées, sourcées et en langage clair aux résidents de Nairobi et aux supporters en visite pendant la TotalEnergies CAN 2027.',
      hackathonBadge: 'Développé pour le Hackathon OSF × Andela 2026',
      languageLabel: 'Langue :',
      colExplore: 'Explorer la Plateforme',
      colTrust: 'Confiance & Vérification',
      colEmergency: 'Sécurité & Urgences',
      methodologyLink: 'Méthodologie de Vérification',
      legendLink: 'Légende des Badges',
      sourcesLink: 'Registre des Sources Accréditées',
      flagLink: 'Signaler une Information Incorrecte',
      immediateAssistance: 'Assistance Immédiate',
      nationalEmergency: 'Urgences Nationales : 999 / 112',
      redCrossEmergency: 'Ambulance Croix-Rouge : 1199',
      viewDirectory: 'Consulter l’Annuaire Complet des Urgences →',
      institutionsHeader: 'Agrégé auprès des institutions publiques kényanes accréditées :',
      disclaimerTitle: 'Avis d’Information Civique :',
      disclaimerText: 'Les informations proviennent de sources publiques officielles certifiées. Confirmez toujours vos déplacements critiques auprès des arrêtés officiels et du personnel de sécurité sur place.',
      craftedWithLove: 'Créé pour Nairobi et le sport africain avec',
    },
    mobileNav: {
      home: 'Accueil',
      ask: 'Poser une question',
      browse: 'Parcourir',
      saved: 'Favoris',
    },
    floatingReport: {
      label: 'Signaler',
      ariaLabel: 'Signaler un problème ou un danger de sécurité',
    },
    emergencyBanner: {
      badge: 'Urgence Vitale ?',
      text: 'En cas d’urgence, n’attendez pas le résultat d’une recherche.',
      cta: 'Appelez le 999 / 112 Directement',
      dismiss: 'Fermer la bannière d’urgence',
    },
    hero: {
      badge: 'Système Civique de Confiance • CAN 2027 Nairobi',
      title: 'Informations Vérifiées à Nairobi Pendant la',
      titleHighlight: 'CAN 2027',
      subtitle: 'Trouvez, comprenez, vérifiez et agissez sur les transports, les stades, la sécurité et les services publics dans toute la capitale.',
      askCta: 'Poser une Question',
      browseCta: 'Parcourir les Infos',
      quickSearchPlaceholder: 'ex. La route vers le stade Talanta est-elle fermée aujourd’hui ?',
      askButton: 'Poser la Question',
      trendingSearches: 'Recherches populaires :',
      sampleQuestions: [
        'La route vers le stade Talanta est-elle fermée aujourd’hui ?',
        'Quel est le numéro officiel des urgences ?',
        'Les transports publics sont-ils gratuits avec un billet de match ?',
        'Peut-on apporter des bouteilles d’eau à Kasarani ?',
      ],
      trustedSourcedFrom: 'Informations certifiées auprès des institutions officielles :',
    },
    stats: {
      stadiumsCount: '3',
      stadiumsLabel: 'Stades Hôtes',
      stadiumsDesc: 'Talanta, Kasarani, Nyayo',
      sourcedPct: '100%',
      sourcedLabel: 'Sources Officielles',
      sourcedDesc: 'Conformes aux journaux officiels',
      safetyHours: '24h/24',
      safetyLabel: 'Centre de Sécurité',
      safetyDesc: 'Police & Croix-Rouge 1199',
      trustSteps: 'Cycle 4',
      trustLabel: 'Étapes de Confiance',
      trustDesc: 'Trouver • Comprendre • Vérifier • Agir',
    },
    monuments: {
      sportsMonument: {
        lowBandwidthTitle: 'Mode Faible Bande Passante',
        lowBandwidthDesc: 'Rendu vectoriel ultra-rapide pour préserver la batterie et les données mobiles.',
        turnOn3D: 'Activer l’Animation 3D',
        lowDataMode: 'Mode Économie',
        interactiveLabel: 'Monument Vivant 3D Interactif • Bougez le curseur',
      },
      monumentLoop: {
        kicc: {
          name: 'KICC',
          fullName: 'Centre International de Conférence Kenyatta',
          tagline: 'Couronne Architecturale de Nairobi',
        },
        museum: {
          name: 'Musée National',
          fullName: 'Musée National de Nairobi',
          tagline: 'Patrimoine et Culture Vivante',
        },
        archives: {
          name: 'Archives Nationales',
          fullName: 'Archives Nationales du Kenya',
          tagline: 'Ancrage Historique du Centre-Ville',
        },
        lowBandwidthTitle: 'Mode Faible Débit',
        lowBandwidthDesc: 'Affichage vectoriel rapide actif.',
        turnOn3D: 'Activer 3D',
        lowDataMode: 'Éco-Données',
        interactiveLabel: 'Boucle des Monuments 3D de Nairobi • Bougez le curseur',
      },
    },
    categories: {
      sectionBadge: 'Répertoire Thématique',
      title: 'Explorer par Catégorie',
      subtitle: 'Guide civique directement extrait des sources officielles kenyanes et continentales.',
      transport: {
        title: 'Transports & Mobilité',
        desc: 'Navettes officielles, fermetures de voies, terminaux de bus et consignes de stationnement.',
      },
      venues: {
        title: 'Informations des Stades',
        desc: 'Horaires d’ouverture des portes, objets interdits, accessibilité et services sur place.',
      },
      safety: {
        title: 'Sécurité & Assistance',
        desc: 'Lignes d’urgence, postes de secours médicaux, postes de police et gestion des foules.',
      },
      publicServices: {
        title: 'Services Publics',
        desc: 'Assistance consulaire, visas électroniques, centres de santé accrédités et objets trouvés.',
      },
      exploreAllCta: 'Consulter Toutes les Catégories de l’Annuaire →',
    },
    trustLoop: {
      sectionBadge: 'Cadre d’Intégrité',
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
    notifications: {
      drawerTitle: 'Mises à Jour & Alertes Officielles',
      drawerSubtitle: 'Flux en Direct de la CAN 2027 à Nairobi',
      markAllRead: 'Tout marquer comme lu',
      viewAnswer: 'Voir la Réponse',
      emergencyDirectoryCta: 'Annuaire des Contacts d’Urgence (999 / 112)',
      emptyText: 'Aucune alerte en attente. Tous les corridors sont fluides.',
    },
    ask: {
      badge: 'Intelligence Civique de Réponses en Streaming',
      title: 'Interroger les Informations Officielles de la CAN 2027',
      subtitle: 'Posez vos questions en langage naturel. Les réponses sont transmises en temps réel via Server-Sent Events, vérifiées auprès des gazettes officielles kényanes avec traçabilité des jetons.',
      inputPlaceholder: 'Posez votre question (ex. Les transports sont-ils gratuits avec un billet ?)',
      clearButton: 'Effacer',
      askButton: 'Demander à l’IA',
      streamingButton: 'Génération...',
      scopeLabel: 'Périmètre :',
      scopeAll: 'Tous les Sujets',
      tryLabel: 'Exemples :',
      suggestedQuestions: [
        { text: 'La route vers le stade Talanta est-elle fermée les jours de match ?', category: 'transport' },
        { text: 'Les transports publics sont-ils gratuits les jours de match de la CAN ?', category: 'transport' },
        { text: 'Peut-on apporter des bouteilles d’eau au stade Kasarani ?', category: 'venues' },
        { text: 'Quels sont les numéros d’urgence officiels pendant la CAN ?', category: 'safety' },
        { text: 'Faut-il une carte d’identité ou un passeport pour entrer dans les stades ?', category: 'venues' },
        { text: 'Quels vaccins ou certificats sanitaires sont exigés pour les visiteurs ?', category: 'public_services' },
      ],
      streamingWaitStatus: 'Connexion au moteur d’intelligence civique accrédité...',
      verifyingDatabase: 'Vérification croisée des gazettes officielles du Kenya...',
      tokensMetric: 'jetons',
      latencyMetric: 'ms',
      saveButton: 'Sauvegarder',
      savedButton: 'Enregistré',
      shareButton: 'Partager',
      copiedButton: 'Copié',
      bridgeBannerTitle: 'Vous disposez d’un avis officiel ou d’un décret légal complexe ?',
      bridgeBannerDesc: 'Collez ou sélectionnez un avis dans notre outil Simplificateur pour obtenir une explication claire et immédiate.',
      bridgeBannerCta: 'Ouvrir l’Outil de Simplification →',
      relatedInquiriesTitle: 'Questions Officielles Liées',
      askThisQuestion: 'Poser cette question →',
      streamInterruptedTitle: 'Flux de Réponse Interrompu :',
    },
    report: {
      badge: 'Ligne Directe de Signalement aux Autorités Locales',
      title: 'Signaler un Problème ou un Risque de Sécurité',
      subtitle: 'Les signalements sont signés cryptographiquement, horodatés et transmis directement aux centres de commandement des autorités kényanes (Police, KeNHA, Croix-Rouge).',
      emergencyBoxTitle: 'Danger immédiat ou urgence médicale vitale ?',
      emergencyBoxText: 'N’attendez pas le traitement d’un formulaire. Appelez immédiatement les secours d’urgence.',
      emergencyBoxCta: 'Appeler le 999 / 112 / 1199 Maintenant',
      categoryLabel: '1. Catégorie de l’Incident *',
      categories: {
        safety: {
          label: 'Sécurité Publique',
          desc: 'Mouvement de foule, brèche de périmètre, risque sécuritaire ou urgence médicale',
        },
        transport_hazard: {
          label: 'Danger Routier / Transport',
          desc: 'Fermeture de voie, blocage de matatus, déviation de navette ou congestion',
        },
        incorrect_info: {
          label: 'Information Officielle Incorrecte',
          desc: 'Erreur sur les horaires, les tarifs de billets, l’ouverture des portes ou le règlement',
        },
        broken_source: {
          label: 'Lien Mort ou Source Obsolète',
          desc: 'Le lien vers le journal officiel est introuvable, inaccessible ou contradictoire',
        },
        other: {
          label: 'Remarque Générale / Question',
          desc: 'Question citoyenne, demande de traduction ou suggestion générale',
        },
      },
      descriptionLabel: '2. Description précise de l’incident *',
      descriptionHint: '5 caractères minimum',
      descriptionPlaceholder: "Expliquez les faits constatés (ex. 'Déviation sur Thika Road près de la porte 2 de Kasarani suite à une barrière tombée')...",
      gpsSectionTitle: 'Métadonnées Géospatiales GPS de Précision',
      captureGpsButton: 'Capturer la Position Actuelle',
      acquiringGpsButton: 'Acquisition GPS en cours...',
      reacquireGpsButton: 'Recapturer la Position GPS',
      gpsVerifiedBadge: 'Zone Métropolitaine de Nairobi Confirmée',
      gpsHint: "Facultatif : Cliquez sur 'Capturer la Position Actuelle' pour joindre les coordonnées vérifiées au dossier transmis.",
      venueLabel: 'Nom du Stade ou Repère Géographique',
      venuePlaceholder: 'ex. Stade Kasarani, Porte 4',
      contactLabel: 'Email ou Téléphone de Contact',
      contactPlaceholder: 'Pour le suivi ou une demande de précision des autorités',
      mediaLabel: 'Pièces Jointes Médias (Facultatif - Max 3)',
      mediaLimit: 'jointes',
      uploadButton: 'Joindre Photo / Preuve',
      uploadingButton: 'Calcul de l’empreinte de sécurité...',
      submitButton: 'Transmettre le Rapport aux Autorités',
      submittingButton: 'Transmission sécurisée...',
      disclaimerText: 'Les données sont signées cryptographiquement et acheminées aux services officiels.',
      confirmationTitle: 'Rapport Transmis aux Autorités avec Succès',
      confirmationDesc: 'Votre signalement citoyen a été pris en compte et enregistré au centre des opérations d’urgence compétent.',
      trackingNoLabel: 'Numéro Officiel de Suivi :',
      ackIdLabel: 'Réf. d’Accusé de Réception :',
      routedDesksLabel: 'Centres de Commandement Destinataires :',
      slaLabel: 'Délai d’Intervention Garanti (SLA) :',
      slaMinutesText: 'Sous {min} Minutes',
      emergencyEscalationTitle: 'Recours d’Urgence Direct :',
      emergencyEscalationText: 'Pour une situation engageant le pronostic vital ou une intervention immédiate, composez le {hotline}.',
      submitAnotherButton: 'Soumettre un Autre Signalement',
      returnHomeButton: 'Retourner à l’Accueil',
    },
    saved: {
      badge: 'Architecture Locale Dexie.js IndexedDB',
      title: 'Informations & Réponses Sauvegardées',
      subtitle: 'Accédez à vos itinéraires de transport, règlements des stades et réponses IA même sans aucune connexion internet.',
      syncOnline: 'En Ligne & Synchronisé au Cloud',
      syncOffline: 'Mode Hors Ligne • Enregistré Localement',
      pendingSyncs: 'En Attente de Synchro (Synchroniser)',
      tabAll: 'Tous les Favoris',
      tabAnswers: 'Réponses',
      tabNotices: 'Avis Officiels',
      itemSavedOn: 'Enregistré le',
      removeButton: 'Supprimer',
      reopenButton: 'Consulter',
      emptyTitle: 'Vous n’avez encore rien enregistré.',
      emptyDesc: 'Ajoutez aux favoris toute réponse certifiée ou consigne de transport pour y accéder hors ligne à tout moment.',
      askCta: 'Poser une Question',
      browseCta: 'Parcourir les Informations',
    },
    browse: {
      badge: 'Répertoire Officiel Certifié',
      title: 'Consulter les Directives Officielles de la CAN',
      subtitle: 'Inspectez les annonces officielles et arrêtés opérationnels classés par thématique avec historique complet de vérification.',
      searchPlaceholder: 'Filtrer par mot-clé, sujet ou stade...',
      filterLabel: 'Filtrer par Statut :',
      sortLabel: 'Trier par :',
      sortRecent: 'Plus Récents',
      sortStatus: 'Niveau de Vérification',
      statusAll: 'Tous les Statuts',
      showingCount: 'Affichage de {count} avis officiels',
      emptyTitle: 'Aucun enregistrement correspondant',
      emptyDesc: 'Essayez d’ajuster vos termes de recherche ou de modifier les filtres thématiques.',
      resetFilters: 'Réinitialiser tous les filtres',
    },
    explain: {
      badge: 'Simplificateur d’Avis Administratifs',
      title: 'Expliquer un Décret ou un Avis Officiel',
      subtitle: 'Collez un arrêté administratif complexe ou choisissez un bulletin de la compétition pour obtenir une synthèse claire des points clés, des personnes concernées et des actions requises.',
      sampleSelectorLabel: 'Sélectionner un avis officiel prédéfini :',
      textareaLabel: 'Ou collez un texte administratif ci-dessous :',
      textareaPlaceholder: 'Collez ici le texte du journal officiel ou l’avis de circulation de la police...',
      analyzeButton: 'Expliquer en Langage Simple',
      analyzingButton: 'Simplification & Vérification...',
      resultBadge: 'Synthèse en Langage Clair',
      plainSummaryTitle: 'Synthèse Compréhensible',
      keyPointsTitle: 'Points Clés à Retenir',
      whoAffectedTitle: 'Qui Est Concerné ?',
      whenAppliesTitle: 'Quand Cela S’applique-t-il ?',
      requiredActionTitle: 'Action Citoyenne Requise',
      sourceTitle: 'Autorité Émettrice & Vérification',
      viewOriginalGazette: 'Consulter le Journal Officiel Source',
      saveExplanation: 'Enregistrer cette Explication',
    },
    emergency: {
      badge: 'Annuaire d’Urgence Vitale Immédiate',
      title: 'Urgences Officielles CAN 2027 à Nairobi',
      subtitle: 'Lignes directes d’urgence téléphonique, postes médicaux de stade et unités d’intervention rapide à Nairobi sans aucun délai.',
      callNowCta: 'Appeler Directement',
      tollFreeLabel: 'Numéro gratuit depuis tout opérateur mobile',
      venuePostsTitle: 'Postes Médicaux & Centres de Triage des Stades',
      venuePostsSubtitle: 'Postes de premiers secours opérationnels sur site pendant toutes les rencontres.',
      medicalFacilitiesTitle: 'Principaux Centres de Traumatologie Accrédités',
      guidelinesTitle: 'Consignes de Sécurité Critiques les Jours de Match',
      guidelines: [
        'Repérez toujours la sortie de secours la plus proche dès votre entrée dans l’enceinte du stade.',
        'En cas de mouvement de foule dense, déplacez-vous en diagonale vers les dégagements latéraux sans tenter de forcer à contre-courant.',
        'Conservez sur vous une pièce d’identité officielle physique (Carte d’Identité ou Passeport) ainsi que votre billet numérique CAN.',
        'Les secouristes officiels portent des gilets haute visibilité de la Croix-Rouge du Kenya ou de Saint-Jean avec badge accrédité.',
      ],
    },
    howItWorks: {
      badge: 'Transparence & Méthodologie',
      title: 'Comment Fonctionne la Confiance Civique',
      subtitle: 'Nairobi — Infos AFCON Certifiées est un système civique ouvert conçu pour éradiquer les fausses informations et la confusion pendant la Coupe d’Afrique des Nations 2027 à Nairobi.',
      loopTitle: 'TROUVER → COMPRENDRE → VÉRIFIER → AGIR',
      loopSubtitle: 'Chaque écran et chaque interaction sur cette plateforme s’articule autour de ce principe en 4 phases.',
      loopSteps: [
        {
          title: '1. TROUVER',
          desc: 'Citoyens et supporters posent leurs questions en langage naturel ou parcourent les catégories.',
          detail: 'Aucun terme technique ou jargon bureaucratique requis. Correspondance immédiate.',
        },
        {
          title: '2. COMPRENDRE',
          desc: 'Les arrêtés administratifs et décrets sont traduits en langage direct et limpide.',
          detail: 'Les déviations de circulation complexes ou les règlements d’accès sont résumés en actions simples.',
        },
        {
          title: '3. VÉRIFIER',
          desc: 'Chaque information affiche son institution émettrice, sa date et son niveau de fraîcheur.',
          detail: 'Traçabilité complète avec identité du vérificateur, horodatage et lien vers le texte de loi source.',
        },
        {
          title: '4. AGIR',
          desc: 'Numéros d’appel directs, coordonnées GPS, itinéraires ou signalement aux autorités.',
          detail: 'Aucune impasse. Appels en un clic vers les secours, guidage GPS et portails officiels.',
        },
      ],
      verificationTitle: 'Le Système des Badges de Vérification',
      verificationSubtitle: 'Quatre statuts normalisés reflètent l’actualité et la fiabilité de chaque fiche.',
      freshnessTitle: 'Re-Vérification Continue de la Fraîcheur des Données',
      freshnessDesc: 'Chaque notice est soumise à une période de validité stricte (généralement 24h à 72h). En l’absence de confirmation renouvelée, le badge se dégrade automatiquement.',
      institutionsTitle: 'Registre des Institutions Accréditées',
      institutionsSubtitle: 'Nous ne relayons que les directives émanant des organismes officiels kényans et continentaux.',
    },
    cards: {
      sourceLabel: 'Source :',
      publishedLabel: 'Publié le :',
      verifiedLabel: 'Vérifié le :',
      viewAuditTrail: 'Consulter la Source Complète et l’Audit',
      nextStepsTitle: 'Prochaines Étapes Recommandées',
      helpfulPrompt: 'Cette réponse vous a-t-elle été utile ?',
      helpfulThankYou: 'Merci pour votre retour citoyen !',
      readFullNotice: 'Lire l’Avis Officiel Vérifié',
    },
    unverified: {
      badge: 'Source Non Vérifiable',
      title: 'Nous n’avons pas pu vérifier cette information auprès d’une source officielle fiable.',
      queryLabel: 'Demande :',
      whyTitle: 'Pourquoi ce résultat :',
      whyExplanation: 'Notre moteur d’intégrité civique vérifie chaque requête auprès des gazettes officielles de KeNHA, de la Police Nationale, de la CAF et du Comté de Nairobi. Aucun avis officiel n’a confirmé cette demande.',
      safeActionsTitle: 'Comportements Sécurisés Recommandés',
      safeActionAuthority: 'Vérifiez directement auprès de l’autorité accréditée :',
      safeActionSocialWarning: 'Ne vous fiez pas aux rumeurs de rue ni aux publications non certifiées sur les réseaux sociaux.',
      callHelpdeskButton: 'Appeler l’Assistance Officielle',
      visitPortalButton: 'Visiter le Portail Officiel CAF',
      reportDiscrepancyButton: 'Vous disposez d’une source officielle ? Signalez-la',
    },
    sourceExplorer: {
      modalTitle: 'Renseignement Officiel Certifié & Piste d’Audit',
      authorityLabel: 'Autorité Accréditée :',
      publishedLabel: 'Date de Publication :',
      verifiedLabel: 'Dernier Horodatage Certifié :',
      docRefLabel: 'Référence Officielle de Publication :',
      auditTrailHeader: 'Piste d’Audit & Chronologie de Vérification',
      viewOfficialSourceCta: 'Consulter le Journal Officiel Source',
      reportDiscrepancyCta: 'Signaler une Divergence ou un Lien Mort',
      closeCta: 'Fermer la Fenêtre',
    },
    errors: {
      networkOffline: 'Connexion réseau indisponible. Fonctionnement en mode local hors ligne.',
      rateLimitExceeded: 'Limite de requêtes atteinte (15 questions/min). Veuillez patienter quelques instants.',
      queryTooShort: 'La question est trop courte. Veuillez saisir au moins 3 caractères.',
      descriptionTooShort: 'La description du signalement doit comporter au moins 5 caractères.',
      gpsOutOfBounds: 'Les coordonnées GPS se situent en dehors de la région métropolitaine de Nairobi.',
      attachmentTooLarge: 'Le fichier dépasse la limite autorisée de 5 Mo.',
      attachmentUnsupported: 'Format de fichier non pris en charge. Formats acceptés : JPEG, PNG, WEBP ou PDF.',
      signatureFailed: 'Échec de vérification de sécurité : signature client invalide.',
      streamFailed: 'La connexion de streaming a été interrompue. Nouvelle tentative en cours...',
    },
  },
};
