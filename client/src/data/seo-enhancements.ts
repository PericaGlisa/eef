export type FaqItem = {
  question: string;
  answer: string;
};

export type InternalLinkItem = {
  label: string;
  path: string;
};

export type ServiceSeoDetails = {
  lastUpdated: string;
  faqs: FaqItem[];
  relatedReferences: InternalLinkItem[];
  internalLinks: InternalLinkItem[];
};

export type SolutionSeoDetails = {
  lastUpdated: string;
  faqs: FaqItem[];
};

export type NewsSeoDetails = {
  relatedLinks: InternalLinkItem[];
  faqs: FaqItem[];
};

const serviceSeoDetailsSr: Record<string, ServiceSeoDetails> = {
  inzenjering: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Eko Rashlada - ULO Komore", path: "/eko-rashlada/ulo-komore" },
      { label: "Konsalting", path: "/usluge/konsalting" },
      { label: "Energetska Revizija", path: "/usluge/energetska-revizija" }
    ],
    faqs: [
      {
        question: "Da li radite kompletno projektovanje rashladnog sistema?",
        answer:
          "Da, obuhvatamo idejno i izvođačko projektovanje rashladnih sistema sa tehničkom dokumentacijom i predlogom optimalne opreme.",
      },
      {
        question: "Koje rashladne fluide podržavate u projektima?",
        answer:
          "Projektujemo sisteme sa freonima, amonijakom i CO2 rešenjima, u skladu sa tehnološkim zahtevima objekta i ciljevima energetske efikasnosti.",
      },
      {
        question: "Da li je moguća optimizacija postojećeg projekta?",
        answer:
          "Da, radimo reviziju i unapređenje postojećih projekata kako bi se smanjili troškovi i povećala pouzdanost sistema.",
      },
    ],
  },
  izvodjenje: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Inženjering", path: "/usluge/inzenjering" },
      { label: "Servis", path: "/usluge/servis" }
    ],
    faqs: [
      {
        question: "Da li nudite izvođenje po principu ključ u ruke?",
        answer:
          "Da, realizujemo kompletnu montažu i puštanje u rad rashladnih postrojenja po principu ključ u ruke.",
      },
      {
        question: "Kako planirate rokove realizacije?",
        answer:
          "Rokove planiramo na osnovu opsega radova, logistike i dostupnosti opreme, sa jasnim fazama i kontrolom kvaliteta.",
      },
      {
        question: "Da li obezbeđujete dokumentaciju nakon puštanja u rad?",
        answer:
          "Da, korisniku predajemo relevantnu tehničku dokumentaciju i smernice za bezbedan i efikasan rad sistema.",
      },
    ],
  },
  servis: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Izvođenje Radova", path: "/usluge/izvodjenje" },
      { label: "Energetska Revizija", path: "/usluge/energetska-revizija" }
    ],
    faqs: [
      {
        question: "Da li servis pokriva preventivno i korektivno održavanje?",
        answer:
          "Da, servisni obuhvat uključuje redovno preventivno održavanje, dijagnostiku kvarova i korektivne intervencije prema stanju sistema.",
      },
      {
        question: "Da li radite preventivno održavanje?",
        answer:
          "Da, preventivni servis obuhvata redovne kontrole, merenja, podešavanja i predloge za optimizaciju rada opreme.",
      },
      {
        question: "Koliko brzo izlazite na teren?",
        answer:
          "Vreme izlaska zavisi od lokacije i hitnosti, ali je cilj da se intervencija organizuje u najkraćem mogućem roku.",
      },
    ],
  },
  "energetska-revizija": {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Servis", path: "/usluge/servis" },
      { label: "Konsalting", path: "/usluge/konsalting" }
    ],
    faqs: [
      {
        question: "Šta obuhvata energetska revizija rashladnog sistema?",
        answer:
          "Energetska revizija uključuje analizu potrošnje, identifikaciju gubitaka i preporuke mera za povećanje efikasnosti sistema.",
      },
      {
        question: "Da li energetska revizija uključuje plan mera za optimizaciju?",
        answer:
          "Da, nakon analize dobijate prioritetni plan tehničkih mera za smanjenje potrošnje i povećanje efikasnosti rada sistema.",
      },
      {
        question: "Da li revizija može da se radi bez prekida proizvodnje?",
        answer:
          "U najvećem broju slučajeva da, jer se analiza planira u fazama koje minimalno utiču na redovan rad postrojenja.",
      },
    ],
  },
  konsalting: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Inženjering", path: "/usluge/inzenjering" },
      { label: "Eko Rashlada", path: "/eko-rashlada" }
    ],
    faqs: [
      {
        question: "Kada je najbolje uključiti konsalting tim?",
        answer:
          "Najbolje je uključiti nas u ranoj fazi projekta kako bi se izabrao optimalan koncept sistema i izbegli kasniji troškovi korekcija.",
      },
      {
        question: "Da li pomažete pri izboru rashladnog fluida?",
        answer:
          "Da, pomažemo pri izboru fluida na osnovu namene objekta, efikasnosti, bezbednosti i regulatornih zahteva.",
      },
      {
        question: "Da li konsultacije uključuju usaglašenost sa propisima?",
        answer:
          "Da, konsalting obuhvata i smernice za tehničku i regulatornu usaglašenost sistema.",
      },
    ],
  },
  sigurnost: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Reference Agrounija", path: "/reference/agrounija" },
      { label: "Sve reference", path: "/reference" },
    ],
    internalLinks: [
      { label: "Dokumentacija - Sertifikati", path: "/dokumentacija/sertifikati" },
      { label: "O Nama", path: "/o-nama" }
    ],
    faqs: [
      {
        question: "Koje standarde bezbednosti primenjujete?",
        answer:
          "Primena standarda zavisi od tipa projekta, ali radimo prema važećim međunarodnim i lokalnim bezbednosnim zahtevima.",
      },
      {
        question: "Da li nudite planove za prevenciju incidenata?",
        answer:
          "Da, pripremamo protokole i preporuke koji smanjuju rizik od zastoja i incidentnih situacija u radu sistema.",
      },
      {
        question: "Da li bezbednosni paket uključuje procedure za incidentne situacije?",
        answer:
          "Da, pripremamo procedure i operativne smernice za reagovanje u incidentnim situacijama, uz jasne korake za minimizaciju rizika.",
      },
    ],
  },
};

const serviceSeoDetailsEn: Record<string, ServiceSeoDetails> = {
  inzenjering: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Eco Cooling - ULO Rooms", path: "/en/eco-cooling/ulo-rooms" },
      { label: "Consulting", path: "/en/services/consulting" },
      { label: "Energy Audit", path: "/en/services/energy-audit" }
    ],
    faqs: [
      {
        question: "Do you provide complete refrigeration system design?",
        answer:
          "Yes, we cover conceptual and execution design of refrigeration systems with technical documentation and proposals for optimal equipment.",
      },
      {
        question: "Which refrigerants do you support in projects?",
        answer:
          "We design systems with freons, ammonia, and CO2 solutions, in accordance with the technological requirements of the facility and energy efficiency goals.",
      },
      {
        question: "Is it possible to optimize an existing project?",
        answer:
          "Yes, we review and improve existing projects to reduce costs and increase system reliability.",
      },
    ],
  },
  izvodjenje: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Engineering", path: "/en/services/engineering" },
      { label: "Service", path: "/en/services/maintenance" }
    ],
    faqs: [
      {
        question: "Do you offer turnkey execution?",
        answer:
          "Yes, we carry out complete installation and commissioning of refrigeration plants on a turnkey basis.",
      },
      {
        question: "How do you plan realization deadlines?",
        answer:
          "Deadlines are planned based on the scope of work, logistics, and equipment availability, with clear phases and quality control.",
      },
      {
        question: "Do you provide documentation after commissioning?",
        answer:
          "Yes, we hand over relevant technical documentation and guidelines for safe and efficient system operation to the user.",
      },
    ],
  },
  servis: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Execution", path: "/en/services/execution" },
      { label: "Energy Audit", path: "/en/services/energy-audit" }
    ],
    faqs: [
      {
        question: "Does service cover preventive and corrective maintenance?",
        answer:
          "Yes, the service scope includes regular preventive maintenance, fault diagnostics, and corrective interventions according to the system condition.",
      },
      {
        question: "Do you perform preventive maintenance?",
        answer:
          "Yes, preventive service includes regular checks, measurements, adjustments, and proposals for optimizing equipment operation.",
      },
      {
        question: "How quickly do you respond on-site?",
        answer:
          "Response time depends on location and urgency, but the goal is to organize the intervention in the shortest possible time.",
      },
    ],
  },
  "energetska-revizija": {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Service", path: "/en/services/maintenance" },
      { label: "Consulting", path: "/en/services/consulting" }
    ],
    faqs: [
      {
        question: "What does an energy audit of a refrigeration system include?",
        answer:
          "An energy audit includes consumption analysis, identification of losses, and recommendations for measures to increase system efficiency.",
      },
      {
        question: "Does the energy audit include an optimization plan?",
        answer:
          "Yes, after the analysis you receive a prioritized plan of technical measures to reduce consumption and increase system efficiency.",
      },
      {
        question: "Can the audit be done without interrupting production?",
        answer:
          "In most cases yes, because the analysis is planned in phases that minimally affect the regular operation of the plant.",
      },
    ],
  },
  konsalting: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Engineering", path: "/en/services/engineering" },
      { label: "Eco Cooling", path: "/en/eco-cooling" }
    ],
    faqs: [
      {
        question: "When is the best time to involve the consulting team?",
        answer:
          "It is best to involve us in the early phase of the project so that the optimal system concept can be chosen and later correction costs avoided.",
      },
      {
        question: "Do you help with refrigerant selection?",
        answer:
          "Yes, we help with fluid selection based on the facility's purpose, efficiency, safety, and regulatory requirements.",
      },
      {
        question: "Does consulting include compliance with regulations?",
        answer:
          "Yes, consulting includes guidelines for technical and regulatory compliance of the system.",
      },
    ],
  },
  sigurnost: {
    lastUpdated: "2026-03-23",
    relatedReferences: [
      { label: "Agrounija Reference", path: "/en/references/agrounija" },
      { label: "All References", path: "/en/references" },
    ],
    internalLinks: [
      { label: "Documentation - Certificates", path: "/en/documentation/certificates" },
      { label: "About Us", path: "/en/about" }
    ],
    faqs: [
      {
        question: "What safety standards do you apply?",
        answer:
          "Standard application depends on the project type, but we work according to applicable international and local safety requirements.",
      },
      {
        question: "Do you offer incident prevention plans?",
        answer:
          "Yes, we prepare protocols and recommendations that reduce the risk of downtime and incident situations in system operation.",
      },
      {
        question: "Does the safety package include incident response procedures?",
        answer:
          "Yes, we prepare procedures and operational guidelines for responding to incident situations, with clear steps for risk minimization.",
      },
    ],
  },
};

const solutionSeoDetailsSr: Record<string, SolutionSeoDetails> = {
  "rashladne-komore": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Koji temperaturni režimi su dostupni za rashladne komore?",
        answer:
          "Izvodimo plusne i minusne režime rada, uz prilagođavanje parametara tipu robe i potrebnoj dinamici skladištenja.",
      },
      {
        question: "Da li su komore prilagodljive postojećem objektu?",
        answer:
          "Da, projektujemo i izvodimo komore prema raspoloživom prostoru i logističkim uslovima objekta.",
      },
    ],
  },
  "tuneli-za-smrzavanje": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Da li tuneli podržavaju brzo smrzavanje bez gubitka kvaliteta?",
        answer:
          "Da, sistemi su projektovani za brzo i kontrolisano smrzavanje koje čuva kvalitet proizvoda.",
      },
      {
        question: "Kako se definiše kapacitet tunela?",
        answer:
          "Kapacitet određujemo prema tipu proizvoda, ulaznoj temperaturi i ciljnim tehnološkim uslovima procesa.",
      },
    ],
  },
  "ulo-komore": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Šta je prednost ULO tehnologije?",
        answer:
          "ULO režim omogućava značajno duže čuvanje voća i povrća uz kontrolu kvaliteta i usporavanje procesa zrenja.",
      },
      {
        question: "Da li nudite opremu za kontrolisanu atmosferu i monitoring?",
        answer:
          "Da, rešenje uključuje kontrolu O2/CO2/N2 parametara i nadzor rada kroz namensku automatiku.",
      },
    ],
  },
  "rashladni-agregati": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Da li agregate projektujete po meri objekta?",
        answer:
          "Da, agregati se projektuju i izrađuju prema zahtevima korisnika radi optimalnog kapaciteta i efikasnosti.",
      },
      {
        question: "Koje kompresorske tehnologije podržavate?",
        answer:
          "Primarno koristimo klipne, vijčane i skrol kompresore, uz odgovarajuću automatiku za stabilan rad sistema.",
      },
    ],
  },
  cileri: {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Za koje procese su čileri najpogodniji?",
        answer:
          "Čileri su pogodni za procese koji zahtevaju pouzdano hlađenje vode ili glikola u industrijskim i komercijalnim uslovima.",
      },
      {
        question: "Da li je moguć daljinski nadzor čilera?",
        answer:
          "Da, upravljanje i monitoring se mogu integrisati kroz odgovarajuće sisteme automatike i daljinskog pristupa.",
      },
    ],
  },
  "elektro-ormani": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Šta obuhvata SCADA i centralni nadzor?",
        answer:
          "SCADA obezbeđuje prikaz, praćenje i alarmiranje ključnih parametara postrojenja lokalno i daljinski.",
      },
      {
        question: "Da li je moguće prilagođavanje prava pristupa korisnicima?",
        answer:
          "Da, sistem podržava korisničke role i različite nivoe dozvola prema organizaciji rada klijenta.",
      },
    ],
  },
  termoizolacija: {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Koje tipove termoizolacionih panela i vrata nudite?",
        answer:
          "Nudimo više tipova panela i hladioničkih vrata, uz izbor proizvođača i konfiguracije prema projektu.",
      },
      {
        question: "Da li radite i montažu termoizolacije?",
        answer:
          "Da, isporuka može biti sa ili bez montaže, uz stručno izvođenje i kontrolu kvaliteta na lokaciji.",
      },
    ],
  },
};

const solutionSeoDetailsEn: Record<string, SolutionSeoDetails> = {
  "rashladne-komore": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "What temperature ranges are available for cold rooms?",
        answer:
          "We execute positive and negative temperature modes, with parameter adaptation to the type of goods and required storage dynamics.",
      },
      {
        question: "Can the rooms be adapted to an existing facility?",
        answer:
          "Yes, we design and execute rooms according to the available space and logistical conditions of the facility.",
      },
    ],
  },
  "tuneli-za-smrzavanje": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Do the tunnels support rapid freezing without quality loss?",
        answer:
          "Yes, the systems are designed for fast and controlled freezing that preserves product quality.",
      },
      {
        question: "How is tunnel capacity defined?",
        answer:
          "We determine capacity according to the product type, inlet temperature, and target technological process conditions.",
      },
    ],
  },
  "ulo-komore": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "What is the advantage of ULO technology?",
        answer:
          "ULO mode enables significantly longer storage of fruits and vegetables with quality control and slowing of the ripening process.",
      },
      {
        question: "Do you offer controlled atmosphere equipment and monitoring?",
        answer:
          "Yes, the solution includes control of O2/CO2/N2 parameters and operation monitoring through dedicated automation.",
      },
    ],
  },
  "rashladni-agregati": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "Do you design units tailored to the facility?",
        answer:
          "Yes, units are designed and manufactured according to user requirements for optimal capacity and efficiency.",
      },
      {
        question: "Which compressor technologies do you support?",
        answer:
          "We primarily use reciprocating, screw, and scroll compressors, with appropriate automation for stable system operation.",
      },
    ],
  },
  cileri: {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "For which processes are chillers most suitable?",
        answer:
          "Chillers are suitable for processes requiring reliable cooling of water or glycol in industrial and commercial conditions.",
      },
      {
        question: "Is remote chiller monitoring possible?",
        answer:
          "Yes, control and monitoring can be integrated through appropriate automation systems and remote access.",
      },
    ],
  },
  "elektro-ormani": {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "What does SCADA and central supervision include?",
        answer:
          "SCADA provides display, monitoring, and alarming of key plant parameters locally and remotely.",
      },
      {
        question: "Is it possible to customize user access rights?",
        answer:
          "Yes, the system supports user roles and different permission levels according to the client's work organization.",
      },
    ],
  },
  termoizolacija: {
    lastUpdated: "2026-03-23",
    faqs: [
      {
        question: "What types of thermal insulation panels and doors do you offer?",
        answer:
          "We offer several types of panels and cold room doors, with a choice of manufacturer and configuration according to the project.",
      },
      {
        question: "Do you also perform thermal insulation installation?",
        answer:
          "Yes, delivery can be with or without installation, with professional execution and quality control on-site.",
      },
    ],
  },
};

const newsSeoDetailsSr: Record<number, NewsSeoDetails> = {
  1: {
    relatedLinks: [
      { label: "Usluga projektovanja", path: "/usluge/inzenjering" },
      { label: "Rešenje rashladne komore", path: "/eko-rashlada/rashladne-komore" },
    ],
    faqs: [
      {
        question: "Da li EEF sarađuje sa akademskim institucijama?",
        answer:
          "Da, kroz stručne posete, donacije opreme i razmenu znanja aktivno sarađujemo sa obrazovnim institucijama.",
      },
      {
        question: "Koja je vrednost ove saradnje za industriju?",
        answer:
          "Saradnja doprinosi razvoju stručnog kadra i unapređenju primene savremenih tehnologija u industrijskom hlađenju.",
      },
    ],
  },
  2: {
    relatedLinks: [
      { label: "Usluga izvođenja", path: "/usluge/izvodjenje" },
      { label: "Rashladni agregati", path: "/eko-rashlada/rashladni-agregati" },
    ],
    faqs: [
      {
        question: "Da li EEF realizuje kompletne projekte u prehrambenoj industriji?",
        answer:
          "Da, realizujemo projektovanje i izvođenje rashladnih sistema za pogone prehrambene industrije različitih kapaciteta.",
      },
      {
        question: "Da li je moguće daljinsko praćenje sistema?",
        answer:
          "Da, sistemi mogu biti integrisani sa naprednim monitoring rešenjima za lokalni i udaljeni nadzor.",
      },
    ],
  },
  3: {
    relatedLinks: [
      { label: "Usluga konsaltinga", path: "/usluge/konsalting" },
      { label: "Čileri", path: "/eko-rashlada/cileri" },
    ],
    faqs: [
      {
        question: "Da li EEF radi modernizaciju postojećih sistema?",
        answer:
          "Da, modernizujemo postojeće sisteme i prilagođavamo ih novim procesnim zahtevima proizvodnje.",
      },
      {
        question: "Koje benefite donosi ovakav tip modifikacije?",
        answer:
          "Povećava se stabilnost procesa, smanjuje energetska potrošnja i čuva kvalitet proizvoda tokom obrade.",
      },
    ],
  },
  4: {
    relatedLinks: [
      { label: "Usluga sigurnosti", path: "/usluge/sigurnost" },
      { label: "Termoizolacija", path: "/eko-rashlada/termoizolacija" },
    ],
    faqs: [
      {
        question: "Da li EEF radi specijalizovane rashladne režime za posebne namene?",
        answer:
          "Da, projektujemo i izvodimo režime hlađenja prilagođene specifičnim procesima i osetljivim materijalima.",
      },
      {
        question: "Kako se obezbeđuje stabilnost režima u takvim prostorima?",
        answer:
          "Kroz preciznu regulaciju, adekvatnu opremu i redovan nadzor ključnih parametara rada sistema.",
      },
    ],
  },
  5: {
    relatedLinks: [
      { label: "Usluga konsaltinga", path: "/usluge/konsalting" },
      { label: "ULO komore", path: "/eko-rashlada/ulo-komore" },
    ],
    faqs: [
      {
        question: "Da li EEF implementira rešenja za voće i povrće?",
        answer:
          "Da, fokusirani smo na rešenja za prijem, sortiranje, pothladu i dugoročno skladištenje voća i povrća.",
      },
      {
        question: "Da li nudite podršku pri izboru tehnologije i opreme?",
        answer:
          "Da, pružamo stručnu podršku u izboru tehnologije, opreme i procesnih parametara.",
      },
    ],
  },
  6: {
    relatedLinks: [
      { label: "Usluga servisa", path: "/usluge/servis" },
      { label: "Rashladne komore", path: "/eko-rashlada/rashladne-komore" },
    ],
    faqs: [
      {
        question: "Da li EEF radi komore za smrznutu robu?",
        answer:
          "Da, realizujemo minusne komore sa režimima prilagođenim zahtevima skladištenja smrznutih proizvoda.",
      },
      {
        question: "Da li je moguće ugovoriti kontinuirano održavanje sistema?",
        answer:
          "Da, kroz servisne modele obezbeđujemo preventivno i korektivno održavanje prema potrebama korisnika.",
      },
    ],
  },
  7: {
    relatedLinks: [
      { label: "Usluga energetske revizije", path: "/usluge/energetska-revizija" },
      { label: "Elektro ormani i CNSU", path: "/eko-rashlada/elektro-ormani" },
    ],
    faqs: [
      {
        question: "Da li EEF primenjuje nove industrijske trendove u projektima?",
        answer:
          "Da, kontinuirano pratimo tehnološke novine i primenjujemo proverena rešenja u realnim projektima.",
      },
      {
        question: "Kako stručni skupovi utiču na kvalitet rešenja?",
        answer:
          "Doprineli su razmeni iskustava, boljoj optimizaciji sistema i unapređenju tehničke podrške klijentima.",
      },
    ],
  },
  8: {
    relatedLinks: [
      { label: "Usluga izvođenja", path: "/usluge/izvodjenje" },
      { label: "Tuneli za smrzavanje", path: "/eko-rashlada/tuneli-za-smrzavanje" },
    ],
    faqs: [
      {
        question: "Da li EEF radi kompleksne sisteme za prijem i smrzavanje voća?",
        answer:
          "Da, projektujemo i izvodimo kompletna postrojenja za prijem, smrzavanje i skladištenje voća.",
      },
      {
        question: "Da li se rešenja prilagođavaju kapacitetu hladnjače?",
        answer:
          "Da, dimenzionisanje i oprema se definišu prema željenom kapacitetu i tehnološkom procesu objekta.",
      },
    ],
  },
};

const newsSeoDetailsEn: Record<number, NewsSeoDetails> = {
  1: {
    relatedLinks: [
      { label: "Engineering Service", path: "/en/services/engineering" },
      { label: "Cold Room Solution", path: "/en/eco-cooling/cold-rooms" },
    ],
    faqs: [
      {
        question: "Does EEF collaborate with academic institutions?",
        answer:
          "Yes, through professional visits, equipment donations, and knowledge exchange, we actively collaborate with educational institutions.",
      },
      {
        question: "What is the value of this collaboration for the industry?",
        answer:
          "The collaboration contributes to the development of professional staff and the advancement of modern technology applications in industrial refrigeration.",
      },
    ],
  },
  2: {
    relatedLinks: [
      { label: "Execution Service", path: "/en/services/execution" },
      { label: "Cooling Units", path: "/en/eco-cooling/cooling-units" },
    ],
    faqs: [
      {
        question: "Does EEF implement complete projects in the food industry?",
        answer:
          "Yes, we carry out design and execution of refrigeration systems for food industry plants of various capacities.",
      },
      {
        question: "Is remote system monitoring possible?",
        answer:
          "Yes, systems can be integrated with advanced monitoring solutions for local and remote supervision.",
      },
    ],
  },
  3: {
    relatedLinks: [
      { label: "Consulting Service", path: "/en/services/consulting" },
      { label: "Chillers", path: "/en/eco-cooling/chillers" },
    ],
    faqs: [
      {
        question: "Does EEF modernize existing systems?",
        answer:
          "Yes, we modernize existing systems and adapt them to new production process requirements.",
      },
      {
        question: "What benefits does this type of modification bring?",
        answer:
          "Process stability is increased, energy consumption is reduced, and product quality is preserved during processing.",
      },
    ],
  },
  4: {
    relatedLinks: [
      { label: "Safety Service", path: "/en/services/safety" },
      { label: "Thermal Insulation", path: "/en/eco-cooling/thermal-insulation" },
    ],
    faqs: [
      {
        question: "Does EEF design specialized refrigeration regimes for special purposes?",
        answer:
          "Yes, we design and execute cooling regimes adapted to specific processes and sensitive materials.",
      },
      {
        question: "How is regime stability ensured in such spaces?",
        answer:
          "Through precise regulation, adequate equipment, and regular monitoring of key system operating parameters.",
      },
    ],
  },
  5: {
    relatedLinks: [
      { label: "Consulting Service", path: "/en/services/consulting" },
      { label: "ULO Rooms", path: "/en/eco-cooling/ulo-rooms" },
    ],
    faqs: [
      {
        question: "Does EEF implement solutions for fruits and vegetables?",
        answer:
          "Yes, we focus on solutions for receiving, sorting, pre-cooling, and long-term storage of fruits and vegetables.",
      },
      {
        question: "Do you offer support in selecting technology and equipment?",
        answer:
          "Yes, we provide professional support in selecting technology, equipment, and process parameters.",
      },
    ],
  },
  6: {
    relatedLinks: [
      { label: "Service", path: "/en/services/maintenance" },
      { label: "Cold Rooms", path: "/en/eco-cooling/cold-rooms" },
    ],
    faqs: [
      {
        question: "Does EEF build rooms for frozen goods?",
        answer:
          "Yes, we realize negative temperature rooms with regimes adapted to the storage requirements of frozen products.",
      },
      {
        question: "Is it possible to contract continuous system maintenance?",
        answer:
          "Yes, through service models we provide preventive and corrective maintenance according to user needs.",
      },
    ],
  },
  7: {
    relatedLinks: [
      { label: "Energy Audit Service", path: "/en/services/energy-audit" },
      { label: "Electrical Cabinets & SCADA", path: "/en/eco-cooling/electrical-cabinets" },
    ],
    faqs: [
      {
        question: "Does EEF apply new industry trends in projects?",
        answer:
          "Yes, we continuously follow technological innovations and apply proven solutions in real projects.",
      },
      {
        question: "How do professional gatherings affect the quality of solutions?",
        answer:
          "They have contributed to the exchange of experiences, better system optimization, and improved technical support for clients.",
      },
    ],
  },
  8: {
    relatedLinks: [
      { label: "Execution Service", path: "/en/services/execution" },
      { label: "Freezing Tunnels", path: "/en/eco-cooling/freezing-tunnels" },
    ],
    faqs: [
      {
        question: "Does EEF design complex systems for receiving and freezing fruit?",
        answer:
          "Yes, we design and execute complete plants for receiving, freezing, and storing fruit.",
      },
      {
        question: "Are solutions adapted to the cold store capacity?",
        answer:
          "Yes, sizing and equipment are defined according to the desired capacity and technological process of the facility.",
      },
    ],
  },
};

export function getServiceSeoDetails(isEnglish: boolean): Record<string, ServiceSeoDetails> {
  return isEnglish ? serviceSeoDetailsEn : serviceSeoDetailsSr;
}

export function getSolutionSeoDetails(isEnglish: boolean): Record<string, SolutionSeoDetails> {
  return isEnglish ? solutionSeoDetailsEn : solutionSeoDetailsSr;
}

export function getNewsSeoDetails(isEnglish: boolean): Record<number, NewsSeoDetails> {
  return isEnglish ? newsSeoDetailsEn : newsSeoDetailsSr;
}

// Backward-compatible static exports (Serbian default)
export const serviceSeoDetails = serviceSeoDetailsSr;
export const solutionSeoDetails = solutionSeoDetailsSr;
export const newsSeoDetails = newsSeoDetailsSr;
