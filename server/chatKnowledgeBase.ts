export const KNOWLEDGE_BASE = {
  COMPANY_PROFILE: {
    name: "Eko Elektrofrigo d.o.o.",
    founded: "1996. godine",
    history: "Osnovana je 1996. godine kao mala porodična firma sa vizijom da unapredi rashladne tehnologije u Srbiji. Danas, sa preko 30 godina iskustva (uključujući ekspertizu osnivača i tima), postali smo vodeći partner za industrijske i komercijalne rashladne sisteme u regionu.",
    specialization: "Kompletan ciklus: konsultacije, projektovanje, instalacija po sistemu 'ključ u ruke', stručni servis i optimizacija postojećih sistema.",
    mission: "Pružanje prilagođenih, pouzdanih rešenja koja smanjuju troškove i štite životnu sredinu, koristeći savremene rashladne medijume poput CO2, amonijaka i freona.",
    values: ["Pouzdanost", "Inovativnost", "Briga o klijentima", "Kontinuirana obuka tima"],
    industries: ["Poljoprivreda", "Logistika", "Prerada hrane", "Velike hladnjače", "Specijalizovani tuneli za brzo zamrzavanje"]
  },
  
  KEY_PARTNERS: [
    {
      brand: "Bitzer",
      role: "Distributer za Srbiju",
      details: "Bitzer Group već 86 godina daje ključan doprinos inovativnim proizvodima i uslugama iz oblasti tehnologije hlađenja i klimatizacije. Vodeći svetski proizvođač kompresora prepoznatljivih po efikasnosti i pouzdanosti."
    },
    {
      brand: "Danfoss",
      role: "Distributer za Srbiju",
      details: "Vodeći svetski proizvođač automatike za industriju hlađenja i klimatizacije. Program 'Climate Solutions za hlađenje' obuhvata široku paletu ventila, kontrolera, senzora i kompresora."
    },
    {
      brand: "Alfa Laval",
      role: "Generalni Zastupnik i Distributer",
      details: "80 godina inovacija u prenosu toplote. Pločasti izmenjivači toplote optimizovani za vrhunske performanse, maksimalnu pouzdanost i najmanji ekološki otisak."
    },
    {
      brand: "Alfa Lu-Ve",
      role: "Distributer za Srbiju",
      details: "Višedecenijsko iskustvo u proizvodnji vazdušnih hladnjaka i kondenzatora. Proizvodi sertifikovani od strane EUROVENTa, bazirani na konkretnim uslovima primene."
    },
    {
      brand: "Güven Soğutma (GVN)",
      role: "Premium Partner",
      details: "Vodeći brend u proizvodnji posuda pod visokim pritiskom i rashladne opreme (resiveri, separatori ulja, filteri). Preko 35 godina iskustva garantuje najviši kvalitet."
    },
    {
      brand: "Isolcell",
      role: "Lider u Kontrolisanoj Atmosferi",
      details: "Pionir u oblasti kontrolisane atmosfere sa preko 60 godina iskustva. Proizvođač najkvalitetnije opreme za ULO sisteme gde je precizna kontrola presudna."
    }
  ],

  DEPARTMENTS: {
    PRODAJA: {
      title: "Prodaja",
      focus: "Ponude, cene i komercijala.",
      contact: "prodaja@eef.rs",
      staff: [
        { name: "Bojana Vezmar", phone: "0648222625", email: "vezmar.bojana@eef.rs" },
        { name: "Nikola Damnjanović", phone: "0648222606", email: "damnjanovic.nikola@eef.rs" },
        { name: "Branko Radišić", phone: "0648222613", email: "radisic.branko@eef.rs" }
      ],
      action: "Usmeri korisnika ovde ako želi da kupi opremu, traži ponudu ili ima komercijalna pitanja."
    },
    TEHNICKA_PODRSKA: {
      title: "Tehnička Podrška",
      focus: "Inženjering i projektovanje.",
      contact: "tehnika@eef.rs",
      action: "Usmeri korisnika ovde za tehničke proračune, projektovanje i inženjerska rešenja."
    },
    SERVIS: {
      title: "Servis",
      focus: "Prijava kvara i održavanje.",
      contact: "servis@eef.rs",
      action: "Usmeri korisnika ovde ako ima kvar na sistemu ili mu treba redovno održavanje."
    },
    OPSTE_INFO: {
      title: "Opšte Informacije",
      focus: "Administracija i ostalo.",
      contact: "office@eef.rs",
      action: "Za sve administrativne upite i opšte informacije o kompaniji."
    }
  },
  CONTACT_INFO: {
    address: "Svetolika Nikačevića 11, 11000 Beograd, Srbija",
    working_hours: "Ponedeljak – Petak: 7:30 - 15:30",
    phones: [
      { label: "Centrala 1", number: "+381 11 375 72 87" },
      { label: "Centrala 2", number: "+381 11 375 72 88" }
    ]
  },

  EKO_RASHALDE_SOLUTIONS: {
    OVERVIEW: "Sveobuhvatna rešenja dizajnirana za maksimalnu efikasnost, održivost i pouzdanost. Ekspertiza pokriva svaki aspekt industrijskog hlađenja, od skladištenja do automatizacije.",
    STORAGE_TECHNOLOGY: {
      title: "Skladišna Tehnologija - Očuvanje kvaliteta i svežine",
      categories: [
        {
          name: "Rashladne Komore",
          description: "Industrijske komore svih dimenzija (plusne i minusne) sa preciznom kontrolom temperature i vlažnosti.",
          features: ["Panelna gradnja", "Hermetička vrata", "HACCP standard"]
        },
        {
          name: "Tuneli za Smrzavanje",
          description: "Sistemi za brzo smrzavanje (šokiranje) proizvoda koji čuvaju ćelijsku strukturu, ukus i nutritivne vrednosti.",
          features: ["-40°C režim", "Inverter ventilatori", "Kontinuirani rad"]
        },
        {
          name: "Komore sa kontrolisanom atmosferom – ULO",
          description: "Ultra Low Oxygen tehnologija za dugotrajno čuvanje voća i povrća usporavanjem procesa zrenja.",
          features: ["Kontrola atmosfere", "CO2 scrubberi", "Azot generatori"]
        }
      ]
    },
    REFRIGERATION_TECH: {
      title: "Rashladna Tehnika - Srce svakog sistema",
      categories: [
        {
          name: "Rashladni Agregati",
          description: "Visokoefikasni sistemi dizajnirani za uštedu energije, koristeći ekološke freone i CO2 tehnologiju.",
          features: ["Bitzer kompresori", "CO2 transkritični", "Povrat toplote", "Tihi rad"]
        },
        {
          name: "Čileri",
          description: "Sistemi za indirektno hlađenje fluida (voda/glikol) idealni za procesnu industriju i klimatizaciju velikih objekata.",
          features: ["Free cooling", "Hidraulički moduli", "Precizna kontrola", "Visok EER/SEER"]
        }
      ]
    },
    INFRASTRUCTURE_CONTROL: {
      title: "Infrastruktura & Kontrola - Automatizacija i optimizacija procesa",
      categories: [
        {
          name: "Elektro Ormani & CNSU",
          description: "Kompletna automatika i centralni nadzorni sistemi upravljanja za potpunu kontrolu i optimizaciju.",
          features: ["PLC upravljanje", "SCADA sistemi", "Daljinski nadzor", "Sistemi alarmiranja"]
        },
        {
          name: "Termoizolacija",
          description: "Vrhunska izolaciona rešenja uključujući panele i hladionička vrata za minimalne toplotne gubitke.",
          features: ["PIR/PUR paneli", "Hladionička vrata", "Sanitarne lajsne", "Vatrootpornost"]
        }
      ]
    }
  },

  SERVICES: {
    OVERVIEW: "Sveobuhvatna inženjerska podrška: od idejnog rešenja i projektovanja, preko stručne montaže, do pouzdanog servisa i održavanja. Vaš pouzdan partner u hladnom lancu.",
    LIST: [
      {
        name: "Inženjering & Projektovanje",
        description: "Od idejnog rešenja do izvođačkog projekta. Tim inženjera koristi najsavremenije softverske alate za proračun termodinamike i 3D modelovanje.",
        tools: ["3D Modelovanje", "Termodinamika", "AutoCAD", "Revit"]
      },
      {
        name: "Izvođenje Radova",
        description: "Montaža industrijskih sistema po principu 'ključ u ruke'. Preciznost u svakom varu, sigurnost u svakom spoju.",
        features: ["Sertifikovani Varioci", "Ključ u Ruke", "Montaža cevovoda"]
      },
      {
        name: "Servis & Održavanje",
        description: "Daljinski monitoring i preventivno održavanje. Efikasna podrška servisnih ekipa.",
        features: ["Tehnička Podrška", "Originalni Delovi", "Redovni servisi"]
      },
      {
        name: "Energetska Revizija",
        description: "Detaljna analiza potrošnje i ROI proračuni za maksimalnu uštedu.",
        standards: ["ROI Analiza", "ISO 50001", "Merenje potrošnje"]
      },
      {
        name: "Konsalting",
        description: "Stručno savetovanje za odabir freona i tranziciju na prirodne rashladne fluide.",
        expertise: ["CO2 Sistemi", "Amonijak", "Studije izvodljivosti"]
      },
      {
        name: "Sigurnost & Kvalitet",
        description: "Implementacija najviših standarda bezbednosti i kvaliteta u rashladnoj tehnici.",
        standards: ["HACCP", "Bezbednost", "ISO 9001"]
      }
    ]
  },

  RESTRICTIONS: {
    FORBIDDEN_TOPICS: [
      "Cene proizvoda i usluga (uvek usmeri na prodaju)",
      "Popusti i specijalne pogodnosti (usmeri na prodaju)",
      "Politika, religija i kontroverzne društvene teme",
      "Saveti o kućnim aparatima (frižideri, klime za stanove) - fokus je isključivo na B2B i industriji",
      "Lična pitanja o zaposlenima",
      "Poređenje sa konkurencijom na negativan način"
    ],
    MANDATORY_BEHAVIOR: [
      "Uvek koristi profesionalan inženjerski ton",
      "Ako je tema van HVAC/hlađenja, ljubazno odbij odgovor",
      "Za svaki upit o kupovini ili kvaru, obavezno daj e-mail odgovarajućeg departmana",
      "Naglašavaj energetsku efikasnost i ekološku održivost (CO2, Amonijak)"
    ]
  },

  FAQ: [
    {
      q: "Da li radite projektovanje?",
      a: "Da, posedujemo sopstveni inženjerski tim sa licencama za projektovanje najsloženijih termotehničkih sistema."
    },
    {
      q: "Koji je rok isporuke za Bitzer kompresore?",
      a: "Zavisi od modela, ali kao ovlašćeni distributeri imamo veliki lager najčešćih modela za brzu isporuku."
    }
  ]
};
