export interface Project {
  title: string;
  desc: string;
  client?: string;
}

export interface Location {
  id: string;
  city: string;
  x: number;
  y: number;
  projects: Project[];
}

export const locations: Location[] = [
  {
    "id": "sombor",
    "city": "Sombor",
    "x": 8.765557083906494,
    "y": 15.537900191938661,
    "projects": [
      {
        "title": "SOMBOLED",
        "desc": "Lager komora gotovih mlečnih proizvoda.",
        "client": "SOMBOLED"
      }
    ]
  },
  {
    "id": "ridjica",
    "city": "Riđica",
    "x": 8.491059147180257,
    "y": 12.309366602687161,
    "projects": [
      {
        "title": "APPLE WORLD",
        "desc": "ULO hladnjača za jabuku kapaciteta 4500 tona.",
        "client": "APPLE WORLD"
      }
    ]
  },
  {
    "id": "subotica",
    "city": "Subotica",
    "x": 21.529711141678217,
    "y": 8.328982725527876,
    "projects": [
      {
        "title": "MINI PANI",
        "desc": "Rashladni tunel za testo.",
        "client": "MINI PANI"
      },
      {
        "title": "COCA COLA HBC – Fabrika Fresh & Co",
        "desc": "Skladišni prostor za sirovine namenjene proizvodnji bezalkoholnih napitaka.",
        "client": "COCA COLA HBC – Fabrika Fresh & Co"
      }
    ]
  },
  {
    "id": "kanjiza",
    "city": "Kanjiža",
    "x": 30.450894085282005,
    "y": 8.992380038387727,
    "projects": [
      {
        "title": "TISACOOP",
        "desc": "Logistički distributivni centar, lagerske komore – hibridni sistem.",
        "client": "TISACOOP"
      }
    ]
  },
  {
    "id": "backa-palanka",
    "city": "Bačka Palanka",
    "x": 15.170508940852828,
    "y": 27.103126679462626,
    "projects": [
      {
        "title": "NECTAR d.o.o.",
        "desc": "Rashladne komore za voće i voćne baze.",
        "client": "NECTAR d.o.o."
      },
      {
        "title": "NECTAR d.o.o.",
        "desc": "Komore za višnju.",
        "client": "NECTAR d.o.o."
      },
      {
        "title": "NECTAR d.o.o.",
        "desc": "Rekonstrukcija komore za pothladu višnje kapaciteta 65 tona na dan.",
        "client": "NECTAR d.o.o."
      }
    ]
  },
  {
    "id": "backi-petrovac",
    "city": "Bački Petrovac",
    "x": 19.699724896836326,
    "y": 24.692783109405035,
    "projects": [
      {
        "title": "CONTAKT TRADE",
        "desc": "Rashladne komore za jaja.",
        "client": "CONTAKT TRADE"
      },
      {
        "title": "CONTAKT TRADE",
        "desc": "Rashladne komore za jaja.",
        "client": "CONTAKT TRADE"
      }
    ]
  },
  {
    "id": "vrbas",
    "city": "Vrbas",
    "x": 20.84346629986253,
    "y": 20.049001919385727,
    "projects": [
      {
        "title": "AGRIMAX",
        "desc": "Rashladna komora za semenski kukuruz.",
        "client": "AGRIMAX"
      }
    ]
  },
  {
    "id": "srbobran",
    "city": "Srbobran",
    "x": 24.343314993122473,
    "y": 20.491266794625744,
    "projects": [
      {
        "title": "SCOM",
        "desc": "Lager komore sa minusnim režimom (6 komora) i alternativnim režimom rada (2 komore) ukupne zapremine 26000 m³, hodnik, ekspedit i mašinska sala – rekonstrukcija bivše hladnjače ELAN (prelazak sa amonijaka na freon).",
        "client": "SCOM"
      }
    ]
  },
  {
    "id": "becej",
    "city": "Bečej",
    "x": 29.90189821182953,
    "y": 18.87700000000008,
    "projects": [
      {
        "title": "TRIVIT",
        "desc": "Rashladna instalacija za pogon prerade u okviru fabrike za proizvodnju pekarskih proizvoda.",
        "client": "TRIVIT"
      }
    ]
  },
  {
    "id": "novi-becej",
    "city": "Novi Bečej",
    "x": 32.0521320495186,
    "y": 19.38560460652587,
    "projects": [
      {
        "title": "PRO-MES",
        "desc": "Kompletna rashladna oprema za novu klanicu i hladnjaču za meso.",
        "client": "PRO-MES"
      }
    ]
  },
  {
    "id": "kikinda",
    "city": "Kikinda",
    "x": 39.646574965612146,
    "y": 14.29955854126689,
    "projects": [
      {
        "title": "BANINI",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "BANINI"
      },
      {
        "title": "BANINI",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "BANINI"
      }
    ]
  },
  {
    "id": "nova-crnja",
    "city": "Nova Crnja",
    "x": 44.633287482806104,
    "y": 17.83767754318616,
    "projects": [
      {
        "title": "FU BANAT",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "FU BANAT"
      }
    ]
  },
  {
    "id": "novi-sad",
    "city": "Novi Sad",
    "x": 25.258308115543322,
    "y": 26.926220729366584,
    "projects": [
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Klanica i prerada mesa kapaciteta 750 tona.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      },
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Nova klanica sa preradom mesa kapaciteta 100 tona na dan.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      },
      {
        "title": "NEOPLANTA A.D.",
        "desc": "Skladište gotovih proizvoda.",
        "client": "NEOPLANTA A.D."
      },
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Sistem za pločaste zamrzivače 9 tona na 3 sata.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      },
      {
        "title": "FRUTTICOM d.o.o.",
        "desc": "Rashladne komore za voće i povrće.",
        "client": "FRUTTICOM d.o.o."
      },
      {
        "title": "MISTRAL KOMERC d.o.o.",
        "desc": "Rashladne komore za jaja.",
        "client": "MISTRAL KOMERC d.o.o."
      },
      {
        "title": "ŠTRAND d.o.o.",
        "desc": "Prerada mesa.",
        "client": "ŠTRAND d.o.o."
      },
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Skladišni prostor za smrznutu robu kapaciteta 2000 tona.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      },
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Rashladne komore za hlađenje kože, komore za hlađenje svinjskih polutki i pogon za pandlovanje u okviru projekta proširenja kapaciteta klanice.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      },
      {
        "title": "AGRO STAPAR",
        "desc": "Lager komore za čuvanje krompira.",
        "client": "AGRO STAPAR"
      },
      {
        "title": "INDUSTRIJA MESA MATIJEVIĆ",
        "desc": "Kompletna rashladna oprema u okviru projekta proširenja kapaciteta prerade.",
        "client": "INDUSTRIJA MESA MATIJEVIĆ"
      }
    ]
  },
  {
    "id": "irig",
    "city": "Irig",
    "x": 25.875928473177495,
    "y": 30.66335892514388,
    "projects": [
      {
        "title": "VINARIJA KOVAČEVIĆ",
        "desc": "Hladnjača za rashlađivanje i čuvanje grožđa u procesu proizvodnje vina.",
        "client": "VINARIJA KOVAČEVIĆ"
      },
      {
        "title": "INTERPROM",
        "desc": "Lager komora za smrzavanje i čuvanje višnje.",
        "client": "INTERPROM"
      },
      {
        "title": "INTERPROM",
        "desc": "Hladnjača za skladištenje jabuke.",
        "client": "INTERPROM"
      }
    ]
  },
  {
    "id": "dobrodol",
    "city": "Dobrodol",
    "x": 27.93466299862449,
    "y": 30.88449136276389,
    "projects": [
      {
        "title": "BERRY ICE FRUITS",
        "desc": "Hladnjača sa četiri tunela i lager komorama za čuvanje borovnice kapaciteta 235 tona.",
        "client": "BERRY ICE FRUITS"
      }
    ]
  },
  {
    "id": "indjija",
    "city": "Inđija",
    "x": 30.90839064649246,
    "y": 31.547888675623913,
    "projects": [
      {
        "title": "ESCA FOOD SOLUTION",
        "desc": "Proizvodnja hamburgera za McDonald’s.",
        "client": "ESCA FOOD SOLUTION"
      },
      {
        "title": "IZOTERM PLAMA d.o.o.",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "IZOTERM PLAMA d.o.o."
      },
      {
        "title": "MNG Plastik Gogić",
        "desc": "Čiler za hlađenje alata za brizganje plastike.",
        "client": "MNG Plastik Gogić"
      },
      {
        "title": "MNG Plastik Gogić",
        "desc": "Čiler za hlađenje alata za brizganje plastike.",
        "client": "MNG Plastik Gogić"
      },
      {
        "title": "TERRA PRODUCTION",
        "desc": "Rashladne komore za prijem, rashlađivanje i čuvanje voća i povrća.",
        "client": "TERRA PRODUCTION"
      }
    ]
  },
  {
    "id": "krcedin",
    "city": "Krčedin",
    "x": 32.0521320495186,
    "y": 29.77882917466402,
    "projects": [
      {
        "title": "AGROUNIJA",
        "desc": "ULO hladnjača za jabuku kapaciteta 3500 tona (faza I).",
        "client": "AGROUNIJA"
      },
      {
        "title": "AGROUNIJA",
        "desc": "ULO hladnjača za jabuku kapaciteta 4000 tona (faza II).",
        "client": "AGROUNIJA"
      }
    ]
  },
  {
    "id": "slankamen",
    "city": "Slankamen",
    "x": 34.56836313617605,
    "y": 29.9999616122842,
    "projects": [
      {
        "title": "SLANKAMENKA",
        "desc": "ULO hladnjača za jabuku kapaciteta 1700 tona.",
        "client": "SLANKAMENKA"
      },
      {
        "title": "SLANKAMENKA",
        "desc": "Proširenje kapaciteta ULO hladnjače za 4 komore (faza II).",
        "client": "SLANKAMENKA"
      }
    ]
  },
  {
    "id": "sasinci",
    "city": "Šašinci",
    "x": 23.359697386519983,
    "y": 33.31694817658346,
    "projects": [
      {
        "title": "Klanica „NEDELJKOVIĆ",
        "desc": "Klanica i prerada mesa.",
        "client": "Klanica „NEDELJKOVIĆ"
      }
    ]
  },
  {
    "id": "ruma",
    "city": "Ruma",
    "x": 24.983810178817148,
    "y": 32.47664491362757,
    "projects": [
      {
        "title": "SIGMA AZ",
        "desc": "Hladnjača za voće i povrće kapaciteta 1000 tona.",
        "client": "SIGMA AZ"
      },
      {
        "title": "SIGMA AZ",
        "desc": "Hladnjača za voće i povrće kapaciteta 1000 tona.",
        "client": "SIGMA AZ"
      },
      {
        "title": "SIGMA AZ",
        "desc": "Kontinualni tunel 2 tone na sat.",
        "client": "SIGMA AZ"
      }
    ]
  },
  {
    "id": "vojka",
    "city": "Vojka",
    "x": 32.50962861072906,
    "y": 34.20147792706332,
    "projects": [
      {
        "title": "FORMA-BM",
        "desc": "ULO hladnjača za jabuku kapaciteta 1500 tona.",
        "client": "FORMA-BM"
      }
    ]
  },
  {
    "id": "nova-pazova",
    "city": "Nova Pazova",
    "x": 33.0,
    "y": 33.0,
    "projects": [
      {
        "title": "MOTOPLAST",
        "desc": "Čiler za hlađenje u procesu prerade plastičnih masa.",
        "client": "MOTOPLAST"
      }
    ]
  },
  {
    "id": "vrsac",
    "city": "Vršac",
    "x": 58.8156808803302,
    "y": 29.9999616122842,
    "projects": [
      {
        "title": "CELANOVA AGRO",
        "desc": "ULO hladnjača za jabuku kapaciteta 4000 tona.",
        "client": "CELANOVA AGRO"
      },
      {
        "title": "CELANOVA AGRO",
        "desc": "Proširenje kapaciteta ULO hladnjače za jabuku za 6.000 tona dodatnog kapaciteta.",
        "client": "CELANOVA AGRO"
      }
    ]
  },
  {
    "id": "loznica",
    "city": "Loznica",
    "x": 11.327537826685077,
    "y": 42.95832245681382,
    "projects": [
      {
        "title": "FROZEN FRUIT",
        "desc": "Hladnjača za malinu kapaciteta 500 tona.",
        "client": "FROZEN FRUIT"
      },
      {
        "title": "LEDENA LOZICA",
        "desc": "Hladnjača sa dva tunela kapaciteta po 20 tona na dan, dve lager komore kapaciteta 250 tona, pothladom i preradom.",
        "client": "LEDENA LOZICA"
      }
    ]
  },
  {
    "id": "sabac",
    "city": "Šabac",
    "x": 21.987207702888675,
    "y": 37.96072936660278,
    "projects": [
      {
        "title": "POCERSKA JAGODA",
        "desc": "Rashladna komora za pothladu i čuvanje jagode.",
        "client": "POCERSKA JAGODA"
      }
    ]
  },
  {
    "id": "subotiste",
    "city": "Subotište",
    "x": 28.620907840440236,
    "y": 35.97053742802304,
    "projects": [
      {
        "title": "INDUSTRIJA MESA „ĐURĐEVIĆ",
        "desc": "Dogradnja hladnjače, tuneli i prostori sa minusnom temperaturom.",
        "client": "INDUSTRIJA MESA „ĐURĐEVIĆ"
      },
      {
        "title": "INDUSTRIJA MESA „ĐURĐEVIĆ",
        "desc": "Novi objekat sa pogonom za preradu mesa i prostorom za rashlađivanje.",
        "client": "INDUSTRIJA MESA „ĐURĐEVIĆ"
      }
    ]
  },
  {
    "id": "simanovci",
    "city": "Šimanovci",
    "x": 31.137138927097684,
    "y": 35.5282725527832,
    "projects": [
      {
        "title": "MOMO TREJD",
        "desc": "Skladišta zamrznutih proizvoda i skladišta za voće i povrće.",
        "client": "MOMO TREJD"
      },
      {
        "title": "NATURACOOP d.o.o.",
        "desc": "Skladište povrća.",
        "client": "NATURACOOP d.o.o."
      },
      {
        "title": "MOMO TRADE d.o.o.",
        "desc": "Skladišta zamrznutih proizvoda.",
        "client": "MOMO TRADE d.o.o."
      },
      {
        "title": "NATURACOOP d.o.o.",
        "desc": "Rashladne komore za voće i povrće.",
        "client": "NATURACOOP d.o.o."
      },
      {
        "title": "CHEMICAL AGROSAVA",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "CHEMICAL AGROSAVA"
      },
      {
        "title": "CHEMICAL AGROSAVA",
        "desc": "Regalne lager komore za čuvanje rashlađene i smrznute robe.",
        "client": "CHEMICAL AGROSAVA"
      },
      {
        "title": "CHEMICAL AGROSAVA",
        "desc": "Čiler za hlađenje u procesu proizvodnje hrane za kućne ljubimce.",
        "client": "CHEMICAL AGROSAVA"
      }
    ]
  },
  {
    "id": "ugrinovci",
    "city": "Ugrinovci",
    "x": 33.195873452544745,
    "y": 35.307140115163186,
    "projects": [
      {
        "title": "RALU logistika",
        "desc": "Rashladna komora za čuvanje smrznutih namirnica.",
        "client": "RALU logistika"
      }
    ]
  },
  {
    "id": "pancevo",
    "city": "Pančevo",
    "x": 43.94704264099036,
    "y": 35.59461228406915,
    "projects": [
      {
        "title": "VASILJEVIĆ I SIN",
        "desc": "Rashladna komora za mlečne proizvode.",
        "client": "VASILJEVIĆ I SIN"
      }
    ]
  },
  {
    "id": "koceljeva",
    "city": "Koceljeva",
    "x": 24.86943603851444,
    "y": 44.46202303262957,
    "projects": [
      {
        "title": "TRESA INVEST",
        "desc": "Hladnjača za prijem, rashlađivanje i čuvanje borovnice.",
        "client": "TRESA INVEST"
      }
    ]
  },
  {
    "id": "dobanovci",
    "city": "Dobanovci",
    "x": 33.5,
    "y": 37.0,
    "projects": [
      {
        "title": "A&P d.o.o.",
        "desc": "Rashladna komora za sirovine.",
        "client": "A&P d.o.o."
      },
      {
        "title": "NELT",
        "desc": "Rashladne instalacije komora za sirovine u okviru fabrike dečije hrane.",
        "client": "NELT"
      }
    ]
  },
  {
    "id": "beograd",
    "city": "Beograd",
    "x": 39.532200825309566,
    "y": 36.70027447216884,
    "projects": [
      {
        "title": "SI-MARKET",
        "desc": "Hladnjača magacina veleprodaje.",
        "client": "SI-MARKET"
      },
      {
        "title": "VETFARM",
        "desc": "Hladnjača magacina veleprodaje medikamenata.",
        "client": "VETFARM"
      },
      {
        "title": "PUERTO SEGURO",
        "desc": "Lager komora za sladoled.",
        "client": "PUERTO SEGURO"
      },
      {
        "title": "BLING",
        "desc": "Skladišni prostor za smrznutu robu.",
        "client": "BLING"
      },
      {
        "title": "GE-RA-CO COMPANY",
        "desc": "Rashladne komore za lekove.",
        "client": "GE-RA-CO COMPANY"
      },
      {
        "title": "M-ĐENIĆ",
        "desc": "Hladnjača za sezonsko povrće.",
        "client": "M-ĐENIĆ"
      },
      {
        "title": "POLIMARK",
        "desc": "Lager komora u okviru distributivnog magacina zapremine 4650 m³.",
        "client": "POLIMARK"
      },
      {
        "title": "AGROEXIM",
        "desc": "Rashladna komora za sadni materijal.",
        "client": "AGROEXIM"
      },
      {
        "title": "INTERPROM",
        "desc": "Lager komore i pothlada kruške.",
        "client": "INTERPROM"
      },
      {
        "title": "MORSAL",
        "desc": "Rashladne komore za čuvanje kolača.",
        "client": "MORSAL"
      },
      {
        "title": "ATLANTIC ŠTARK“ d.o.o.",
        "desc": "Čiler za hlađenje uređaja FROZEN CONE.",
        "client": "ATLANTIC ŠTARK“ d.o.o."
      }
    ]
  },
  {
    "id": "surcin",
    "city": "Surčin",
    "x": 36.0,
    "y": 38.5,
    "projects": [
      {
        "title": "KOTEKS d.o.o.",
        "desc": "Klanica i prerada mesa.",
        "client": "KOTEKS d.o.o."
      },
      {
        "title": "KOTEKS d.o.o.",
        "desc": "Goveđa klanica i prerada mesa.",
        "client": "KOTEKS d.o.o."
      }
    ]
  },
  {
    "id": "batajnica",
    "city": "Batajnica",
    "x": 36.5,
    "y": 34.5,
    "projects": [
      {
        "title": "MODULOR",
        "desc": "Minusna komora za arhivsku građu.",
        "client": "MODULOR"
      }
    ]
  },
  {
    "id": "ljubovija",
    "city": "Ljubovija",
    "x": 14.73588720770294,
    "y": 50.60950479846444,
    "projects": [
      {
        "title": "ZADRUGAR",
        "desc": "Tri nova rashladna tunela za smrzavanje maline, nove lager komore i sistem za preradu.",
        "client": "ZADRUGAR"
      }
    ]
  },
  {
    "id": "valjevo",
    "city": "Valjevo",
    "x": 26.402049518569466,
    "y": 48.796218809980765,
    "projects": [
      {
        "title": "LUSAMBO",
        "desc": "Rashladna komora za cveće.",
        "client": "LUSAMBO"
      },
      {
        "title": "AGRANELA",
        "desc": "Komora za pothladu jagodičastog voća.",
        "client": "AGRANELA"
      }
    ]
  },
  {
    "id": "divci",
    "city": "Divci",
    "x": 29.23852819807435,
    "y": 48.02225527831099,
    "projects": [
      {
        "title": "KLANICA A.D. – LUTRA GROUP",
        "desc": "Klanica i prerada mesa.",
        "client": "KLANICA A.D. – LUTRA GROUP"
      }
    ]
  },
  {
    "id": "sopot",
    "city": "Sopot",
    "x": 42.23143053645118,
    "y": 43.290021113243746,
    "projects": [
      {
        "title": "KABINET",
        "desc": "Rashladna komora za čuvanje sirovina u procesu proizvodnje piva.",
        "client": "KABINET"
      },
      {
        "title": "KABINET",
        "desc": "Čiler za hlađenje piva u procesu proizvodnje.",
        "client": "KABINET"
      }
    ]
  },
  {
    "id": "grocka",
    "city": "Grocka",
    "x": 45.456781292984935,
    "y": 39.88458157389638,
    "projects": [
      {
        "title": "DUDA Invest",
        "desc": "Hladnjača za prijem, rashlađivanje i čuvanje jabuke i trešnje.",
        "client": "DUDA Invest"
      }
    ]
  },
  {
    "id": "smederevo",
    "city": "Smederevo",
    "x": 50.35199449793676,
    "y": 40.12782725527837,
    "projects": [
      {
        "title": "FRUVITA",
        "desc": "Rashladne komore za voće i voćne baze.",
        "client": "FRUVITA"
      },
      {
        "title": "FRUVITA",
        "desc": "Čiler za hlađenje u procesu proizvodnje.",
        "client": "FRUVITA"
      },
      {
        "title": "FRUVITA",
        "desc": "Rashladne komore za voće i voćne baze.",
        "client": "FRUVITA"
      }
    ]
  },
  {
    "id": "bajina-basta",
    "city": "Bajina Bašta",
    "x": 19.17360385144436,
    "y": 55.43019193857963,
    "projects": [
      {
        "title": "MLEKARA SPASOJEVIĆ",
        "desc": "Komora za rashlađivanje kapaciteta 20 tona gotovih proizvoda. Rekonstrukcija sistema bazena ledene vode.",
        "client": "MLEKARA SPASOJEVIĆ"
      },
      {
        "title": "SIROGOJNO COMPANY “ d.o.o.",
        "desc": "Hladnjača sa četiri tunela i lager komorama za jagodičasto voće.",
        "client": "SIROGOJNO COMPANY “ d.o.o."
      }
    ]
  },
  {
    "id": "kosjeric",
    "city": "Kosjerić",
    "x": 26.95104539202206,
    "y": 54.85524760076771,
    "projects": [
      {
        "title": "JPL SPECIAL d.o.o.",
        "desc": "Projekat rekonstrukcije i dogradnja hladnjače.",
        "client": "JPL SPECIAL d.o.o."
      }
    ]
  },
  {
    "id": "gornja-dobrinja",
    "city": "Gornja Dobrinja",
    "x": 30.862640990371386,
    "y": 56.1599289827256,
    "projects": [
      {
        "title": "HIBRID",
        "desc": "Rashladni tunel 25 tona na dan, rekonstrukcija i dogradnja hladnjače.",
        "client": "HIBRID"
      }
    ]
  },
  {
    "id": "arandjelovac",
    "city": "Aranđelovac",
    "x": 41.88830811554336,
    "y": 47.978028790786844,
    "projects": [
      {
        "title": "GREENY",
        "desc": "ULO hladnjača za jabuku kapaciteta 1800 tona (faza II).",
        "client": "GREENY"
      }
    ]
  },
  {
    "id": "mladenovac",
    "city": "Mladenovac",
    "x": 44.976409903713915,
    "y": 45.0148541266795,
    "projects": [
      {
        "title": "MLEKARA GRANICE",
        "desc": "Rashladna komora za rashlađivanje i čuvanje jogurta i kisele pavlake.",
        "client": "MLEKARA GRANICE"
      }
    ]
  },
  {
    "id": "uzice",
    "city": "Užice",
    "x": 25.48705639614861,
    "y": 57.973214971209295,
    "projects": [
      {
        "title": "TRGOAGENT",
        "desc": "Hladnjača za malinu kapaciteta 300 tona.",
        "client": "TRGOAGENT"
      }
    ]
  },
  {
    "id": "takovo",
    "city": "Takovo",
    "x": 37.381966987620366,
    "y": 53.81592514395397,
    "projects": [
      {
        "title": "SWISSLION",
        "desc": "Prerada mesa.",
        "client": "SWISSLION"
      }
    ]
  },
  {
    "id": "topola",
    "city": "Topola",
    "x": 44.77053645116925,
    "y": 49.17214395393483,
    "projects": [
      {
        "title": "BLAZNAVA",
        "desc": "Hladnjača za malinu kapaciteta 300 tona.",
        "client": "BLAZNAVA"
      }
    ]
  },
  {
    "id": "rupeljevo",
    "city": "Rupeljevo",
    "x": 27.5,
    "y": 60.0,
    "projects": [
      {
        "title": "MALINA PRODUKT",
        "desc": "Hladnjača za malinu kapaciteta 1500 tona.",
        "client": "MALINA PRODUKT"
      },
      {
        "title": "MALINA PRODUKT",
        "desc": "Hladnjača za malinu kapaciteta 2000 tona, faza II.",
        "client": "MALINA PRODUKT"
      }
    ]
  },
  {
    "id": "pozega",
    "city": "Požega",
    "x": 29.87902338376896,
    "y": 57.0,
    "projects": [
      {
        "title": "FRIGO PAUN",
        "desc": "Hladnjača za malinu kapaciteta 300 tona.",
        "client": "FRIGO PAUN"
      },
      {
        "title": "EUROFRIGO",
        "desc": "Hladnjača za malinu kapaciteta 1800 tona, faza II.",
        "client": "EUROFRIGO"
      },
      {
        "title": "AGROZORA",
        "desc": "Proširenje hladnjače za jagodičasto voće.",
        "client": "AGROZORA"
      },
      {
        "title": "BARBE SEAFOOD",
        "desc": "Kompletna rashladna oprema hladnjače i pogona za preradu ribe.",
        "client": "BARBE SEAFOOD"
      }
    ]
  },
  {
    "id": "lucani",
    "city": "Lučani",
    "x": 33.5,
    "y": 57.840535508637394,
    "projects": [
      {
        "title": "AGROPARTNER D.O.O.",
        "desc": "Projekat rekonstrukcije i dogradnje hladnjače.",
        "client": "AGROPARTNER D.O.O."
      },
      {
        "title": "AGROPARTNER D.O.O.",
        "desc": "Projekat rekonstrukcije i dogradnje hladnjače.",
        "client": "AGROPARTNER D.O.O."
      },
      {
        "title": "AGROPARTNER D.O.O.",
        "desc": "Lager komora za smrznutu malinu zapremine 2750 m³.",
        "client": "AGROPARTNER D.O.O."
      },
      {
        "title": "AGROPARTNER",
        "desc": "Hladnjača sa tunelom kapaciteta 24 tona na dan.",
        "client": "AGROPARTNER"
      },
      {
        "title": "AGROPARTNER D.O.O.",
        "desc": "Lager komora za skladištenje zamrznutog voća.",
        "client": "AGROPARTNER D.O.O."
      }
    ]
  },
  {
    "id": "cacak",
    "city": "Čačak",
    "x": 37.061719394773064,
    "y": 57.17713819577737,
    "projects": [
      {
        "title": "MIRALEX",
        "desc": "Skladišni prostor za smrznutu robu kapaciteta 1500 tona.",
        "client": "MIRALEX"
      }
    ]
  },
  {
    "id": "zajecar",
    "city": "Zaječar",
    "x": 81.09576341127932,
    "y": 56.95600575815736,
    "projects": [
      {
        "title": "DELTA AGRAR",
        "desc": "ULO hladnjača za jabuku kapaciteta 6.000 tona.",
        "client": "DELTA AGRAR"
      }
    ]
  },
  {
    "id": "arilje",
    "city": "Arilje",
    "x": 31.274387895460837,
    "y": 60.20665259117084,
    "projects": [
      {
        "title": "RS KOMERC",
        "desc": "Skladište jabuke kapaciteta 200 tona.",
        "client": "RS KOMERC"
      },
      {
        "title": "FRUCOM",
        "desc": "Tri rashladna tunela za smrzavanje maline kapaciteta 3x50 tona na dan.",
        "client": "FRUCOM"
      },
      {
        "title": "FRUCOM",
        "desc": "Skladišni prostor za smrznutu robu kapaciteta 1500 tona.",
        "client": "FRUCOM"
      },
      {
        "title": "FRUCOM",
        "desc": "Skladišni prostor za smrznutu robu kapaciteta 2000 tona.",
        "client": "FRUCOM"
      },
      {
        "title": "NECTAR d.o.o.",
        "desc": "Hladnjača sa tunelom za smrzavanje maline kapaciteta 30 tona na dan, lager komore 9400 m³, pothlada i prostor za preradu maline.",
        "client": "NECTAR d.o.o."
      }
    ]
  },
  {
    "id": "guca",
    "city": "Guča",
    "x": 34.31674002751032,
    "y": 59.72016122840685,
    "projects": [
      {
        "title": "VALLETTA d.o.o.",
        "desc": "Skladište mleka i mlečnih proizvoda.",
        "client": "VALLETTA d.o.o."
      }
    ]
  },
  {
    "id": "vica",
    "city": "Viča",
    "x": 34.79711141678135,
    "y": 61.06906909788854,
    "projects": [
      {
        "title": "AGROPARTNER",
        "desc": "Hladnjača sa tunelom kapaciteta 16 tona na dan, lager komorom zapremine 1750 m³.",
        "client": "AGROPARTNER"
      }
    ]
  },
  {
    "id": "vrdila",
    "city": "Vrdila",
    "x": 43.67254470426418,
    "y": 60.449898272552836,
    "projects": [
      {
        "title": "MONDI FOODS",
        "desc": "Hladnjača za malinu kapaciteta 1500 tona.",
        "client": "MONDI FOODS"
      },
      {
        "title": "MONDI FOODS",
        "desc": "Hladnjača za malinu kapaciteta 2000 tona, faza II.",
        "client": "MONDI FOODS"
      }
    ]
  },
  {
    "id": "ivanjica",
    "city": "Ivanjica",
    "x": 34.29386519944988,
    "y": 64.01013051823409,
    "projects": [
      {
        "title": "FLORA",
        "desc": "Hladnjača za malinu kapaciteta 1000 tona.",
        "client": "FLORA"
      },
      {
        "title": "AGROMARKET",
        "desc": "Hladnjača za malinu kapaciteta 1000 tona.",
        "client": "AGROMARKET"
      },
      {
        "title": "FLORA",
        "desc": "Rashladni tunel kapaciteta 25 tona na dan.",
        "client": "FLORA"
      },
      {
        "title": "AGROMARKET",
        "desc": "Rashladni tunel kapaciteta 36 tona na dan.",
        "client": "AGROMARKET"
      },
      {
        "title": "FLORA",
        "desc": "Hladnjača za malinu kapaciteta 800 tona.",
        "client": "FLORA"
      },
      {
        "title": "FRIGOSPAS",
        "desc": "Hladnjača sa tunelom za smrzavanje maline kapaciteta 15 tona na dan, lager komorom i prostorom prerade.",
        "client": "FRIGOSPAS"
      }
    ]
  },
  {
    "id": "blace",
    "city": "Blace",
    "x": 58.54118294360391,
    "y": 70.33451823416519,
    "projects": [
      {
        "title": "FRIGO FRUIT",
        "desc": "Proširenje hladnjače za jagodičasto voće, kapaciteta 1200 tona.",
        "client": "FRIGO FRUIT"
      }
    ]
  },
  {
    "id": "knjazevac",
    "city": "Knjaževac",
    "x": 80.70689133425044,
    "y": 64.38605566218816,
    "projects": [
      {
        "title": "DŽERVIN",
        "desc": "Rashladne instalacije lager komora ukupnog kapaciteta 5500 tona. Uređaji za kontinualno procesno predhlađenje višnje kapaciteta 6000 kg/h.",
        "client": "DŽERVIN"
      }
    ]
  },
  {
    "id": "novi-pazar",
    "city": "Novi Pazar",
    "x": 40.790316368638294,
    "y": 73.78418426103653,
    "projects": [
      {
        "title": "MARELA",
        "desc": "Skladište sladoleda.",
        "client": "MARELA"
      }
    ]
  },
  {
    "id": "pirot",
    "city": "Pirot",
    "x": 82,
    "y": 74,
    "projects": [
      {
        "title": "TIGAR TYRES",
        "desc": "Rashladna komora za čuvanje sirovina u procesu proizvodnje automobilskih guma.",
        "client": "TIGAR TYRES (2013. godina)"
      },
      {
        "title": "TIGAR TYRES",
        "desc": "Rashladna komora za čuvanje nebutilnih smesa u procesu proizvodnje automobilskih guma.",
        "client": "TIGAR TYRES (2015. godina)"
      }
    ]
  },
  {
    "id": "pristina",
    "city": "Priština",
    "x": 54,
    "y": 85,
    "projects": [
      {
        "title": "FORNETTI",
        "desc": "Hladnjača za smeštaj pekarskih proizvoda.",
        "client": "FORNETTI (2011. godina)"
      }
    ]
  },
  {
    "id": "prizren",
    "city": "Prizren",
    "x": 44,
    "y": 95,
    "projects": [
      {
        "title": "KAJMAK",
        "desc": "Skladište sladoleda.",
        "client": "KAJMAK (2007. godina)"
      },
      {
        "title": "A.M.G.",
        "desc": "Skladišni prostor za smrznutu robu.",
        "client": "A.M.G. (2007. godina)"
      },
      {
        "title": "MEKA NPT",
        "desc": "Skladišni prostor za smrznutu robu.",
        "client": "MEKA NPT (2008. godina)"
      },
      {
        "title": "A.M.G.",
        "desc": "Skladišni prostor za smrznutu robu.",
        "client": "A.M.G. (2008. godina)"
      }
    ]
  }
];