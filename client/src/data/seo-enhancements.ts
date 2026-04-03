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
  internalLinks: InternalLinkItem[]; // Dodato za internal linking
};

export type SolutionSeoDetails = {
  lastUpdated: string;
  faqs: FaqItem[];
};

export type NewsSeoDetails = {
  relatedLinks: InternalLinkItem[];
  faqs: FaqItem[];
};

export const serviceSeoDetails: Record<string, ServiceSeoDetails> = {
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

export const solutionSeoDetails: Record<string, SolutionSeoDetails> = {
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

export const newsSeoDetails: Record<number, NewsSeoDetails> = {
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
