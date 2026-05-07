export interface InternationalProject {
  city: string;
  client: string;
  year: string;
  description: string;
}

export interface InternationalReference {
  country: string;
  projects: InternationalProject[];
}

export function getInternationalLocations(isEnglish: boolean): InternationalReference[] {
  return [
    {
      country: isEnglish ? "MONTENEGRO" : "CRNA GORA",
      projects: [
        {
          city: "BIJELO POLJE",
          client: "MESOPROMET",
          year: "2002",
          description: isEnglish
            ? "Slaughterhouse and meat processing facility, 500 ton capacity."
            : "Klanica i prerada mesa kapaciteta 500 tona."
        },
        {
          city: "PODGORICA",
          client: "AD PLANTAŽE",
          year: "2004",
          description: isEnglish
            ? "3,000 ton storage – conversion from ammonia to freon installation."
            : "Skladište 3000 tona – prelazak sa amonijaka na freonsku instalaciju."
        },
        {
          city: "PODGORICA",
          client: "LEDO",
          year: "2017",
          description: isEnglish
            ? "Storage chamber for ice cream, volume 1,750 m³, and reconstruction of three existing storage chambers of 600 m³ each."
            : "Lager komora za sladoled zapremine 1750 m³ i rekonstrukcija tri postojeće lager komore po 600 m³."
        },
        {
          city: "DANILOVGRAD",
          client: "MINI PANI",
          year: "2014",
          description: isEnglish
            ? "Refrigeration chambers for dough – distribution center."
            : "Rashladne komore za testo – distributivni centar."
        }
      ]
    },
    {
      country: isEnglish ? "BOSNIA AND HERZEGOVINA" : "BOSNA I HERCEGOVINA",
      projects: [
        {
          city: "BANJA LUKA",
          client: "GLOBEX TABAK",
          year: "2014",
          description: isEnglish
            ? "Refrigeration chamber for dairy products."
            : "Rashladna komora za mlečne proizvode."
        },
        {
          city: "BANJA LUKA",
          client: "KRAJINA KLAS",
          year: "2016",
          description: isEnglish
            ? "Refrigeration installation for continuous baguette freezing tunnel, capacity 6,000 pcs/h."
            : "Rashladna instalacija kontinualnog tunela za smrzavanje bageta kapaciteta 6000 kom/h."
        },
        {
          city: "BANJA LUKA",
          client: "KRAJINA KLAS",
          year: "2019",
          description: isEnglish
            ? "Refrigeration installation for continuous dough freezing tunnel, capacity 600 kg/h."
            : "Rashladna instalacija kontinualnog tunela za smrzavanje testa kapaciteta 600 kg/h."
        },
        {
          city: "BANJA LUKA",
          client: "KRAJINA KLAS",
          year: "2021",
          description: isEnglish
            ? "Spiral shock freezer for dough, freezing capacity 900 kg/h."
            : "Spiralni šoker za testo, kapaciteta smrzavanja 900 kg/h."
        },
        {
          city: "VELIKA KLADUŠA",
          client: "BAŠO",
          year: "2015",
          description: isEnglish
            ? "Raspberry freezing tunnel, capacity 8 tons per day, storage chamber and processing area."
            : "Tunel za smrzavanje maline kapaciteta 8 tona na dan, lager komora i prostor prerade."
        },
        {
          city: "BUGOJNO",
          client: "STARNET",
          year: "2016",
          description: isEnglish
            ? "Cold store with tunnel capacity 40 tons per day and pre-cooling 25 tons."
            : "Hladnjača sa tunelom kapaciteta 40 tona na dan i pothladom 25 tona."
        },
        {
          city: "BRATUNAC",
          client: "OPZ MB FRUITS",
          year: "2016",
          description: isEnglish
            ? "Cold store with tunnel capacity 12 tons per day and storage chamber 110 tons."
            : "Hladnjača sa tunelom kapaciteta 12 tona na dan i lager komorom 110 tona."
        },
        {
          city: "BRATUNAC",
          client: "OPZ MB FRUITS",
          year: "2017",
          description: isEnglish
            ? "Cold store capacity expansion (tunnel 22 t/11 h, storage chamber 400 tons, processing area)."
            : "Proširenje kapaciteta hladnjače (tunel 22 t/11 h, lager komora 400 tona, prostor za preradu)."
        },
        {
          city: "BIJELJINA",
          client: "VIMERA",
          year: "2015",
          description: isEnglish
            ? "Refrigeration chamber for dairy products."
            : "Rashladna komora za mlečne proizvode."
        },
        {
          city: "BIJELJINA",
          client: "RAKIĆ KOMERC",
          year: "2019",
          description: isEnglish
            ? "Cold store for receiving, cooling and storing eggs."
            : "Hladnjača za prijem, rashlađivanje i čuvanje jaja."
        },
        {
          city: "ROGATICA",
          client: "CONTE-CO",
          year: "2016",
          description: isEnglish
            ? "Cold store with tunnel capacity 6 tons per day, storage chamber 130 tons and processing area."
            : "Hladnjača sa tunelom kapaciteta 6 tona na dan, lager komorom 130 tona i preradom."
        },
        {
          city: "SREBRENICA",
          client: "FH SREBRENA MALINA",
          year: "2017",
          description: isEnglish
            ? "Cold store with tunnel capacity 6 tons per day, storage chamber 100 tons and pre-chamber."
            : "Hladnjača sa tunelom kapaciteta 6 tona na dan, lager komorom 100 tona i predprostorom."
        },
        {
          city: "SREBRENICA",
          client: "SREBRENIČANKA",
          year: "2017",
          description: isEnglish
            ? "Reconstruction of continuous French fries freezing tunnel, capacity 2,000 kg/h."
            : "Rekonstrukcija kontinualnog tunela za smrzavanje pomfrita kapaciteta 2000 kg/h."
        }
      ]
    },
    {
      country: isEnglish ? "CROATIA" : "HRVATSKA",
      projects: [
        {
          city: "VINKOVCI",
          client: "VINKA AD",
          year: "2017",
          description: isEnglish
            ? "Raspberry freezing tunnel, capacity 20 tons per day."
            : "Tunel za smrzavanje maline kapaciteta 20 tona na dan."
        },
        {
          city: "KONAVLE",
          client: "BIO KONAVLE",
          year: "2016",
          description: isEnglish
            ? "Vegetable cold store."
            : "Hladnjača za povrće."
        }
      ]
    },
    {
      country: isEnglish ? "SLOVENIA" : "SLOVENIJA",
      projects: [
        {
          city: "AJDOVŠČINA",
          client: "FRUCTAL",
          year: "2014",
          description: isEnglish
            ? "Cold storage for raw materials in the production process of non-alcoholic beverages, volume 26,000 m³."
            : "Hladno skladište za sirovine u procesu proizvodnje bezalkoholnih napitaka zapremine 26000 m³."
        }
      ]
    },
    {
      country: isEnglish ? "NORTH MACEDONIA" : "SEVERNA MAKEDONIJA",
      projects: [
        {
          city: "SKOPLJE",
          client: "FORNETTI ILINDEN",
          year: "2010",
          description: isEnglish
            ? "Distribution cold store."
            : "Distribuciona hladnjača."
        }
      ]
    },
    {
      country: isEnglish ? "POLAND" : "POLJSKA",
      projects: [
        {
          city: "TARNOGROD",
          client: "BIOCONCEPT GARDENIA",
          year: "2016",
          description: isEnglish
            ? "Raspberry freezing tunnels."
            : "Tuneli za smrzavanje maline."
        }
      ]
    }
  ];
}
