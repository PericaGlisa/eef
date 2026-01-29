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

export const internationalLocations: InternationalReference[] = [
  {
    country: "CRNA GORA",
    projects: [
      {
        city: "BIJELO POLJE",
        client: "MESOPROMET",
        year: "2002",
        description: "Klanica i prerada mesa kapaciteta 500 tona."
      },
      {
        city: "PODGORICA",
        client: "AD PLANTAŽE",
        year: "2004",
        description: "Skladište 3000 tona – prelazak sa amonijaka na freonsku instalaciju."
      },
      {
        city: "PODGORICA",
        client: "LEDO",
        year: "2017",
        description: "Lager komora za sladoled zapremine 1750 m³ i rekonstrukcija tri postojeće lager komore po 600 m³."
      },
      {
        city: "DANILOVGRAD",
        client: "MINI PANI",
        year: "2014",
        description: "Rashladne komore za testo – distributivni centar."
      }
    ]
  },
  {
    country: "BOSNA I HERCEGOVINA",
    projects: [
      {
        city: "BANJA LUKA",
        client: "GLOBEX TABAK",
        year: "2014",
        description: "Rashladna komora za mlečne proizvode."
      },
      {
        city: "BANJA LUKA",
        client: "KRAJINA KLAS",
        year: "2016",
        description: "Rashladna instalacija kontinualnog tunela za smrzavanje bageta kapaciteta 6000 kom/h."
      },
      {
        city: "BANJA LUKA",
        client: "KRAJINA KLAS",
        year: "2019",
        description: "Rashladna instalacija kontinualnog tunela za smrzavanje testa kapaciteta 600 kg/h."
      },
      {
        city: "BANJA LUKA",
        client: "KRAJINA KLAS",
        year: "2021",
        description: "Spiralni šoker za testo, kapaciteta smrzavanja 900 kg/h."
      },
      {
        city: "VELIKA KLADUŠA",
        client: "BAŠO",
        year: "2015",
        description: "Tunel za smrzavanje maline kapaciteta 8 tona na dan, lager komora i prostor prerade."
      },
      {
        city: "BUGOJNO",
        client: "STARNET",
        year: "2016",
        description: "Hladnjača sa tunelom kapaciteta 40 tona na dan i pothladom 25 tona."
      },
      {
        city: "BRATUNAC",
        client: "OPZ MB FRUITS",
        year: "2016",
        description: "Hladnjača sa tunelom kapaciteta 12 tona na dan i lager komorom 110 tona."
      },
      {
        city: "BRATUNAC",
        client: "OPZ MB FRUITS",
        year: "2017",
        description: "Proširenje kapaciteta hladnjače (tunel 22 t/11 h, lager komora 400 tona, prostor za preradu)."
      },
      {
        city: "BIJELJINA",
        client: "VIMERA",
        year: "2015",
        description: "Rashladna komora za mlečne proizvode."
      },
      {
        city: "BIJELJINA",
        client: "RAKIĆ KOMERC",
        year: "2019",
        description: "Hladnjača za prijem, rashlađivanje i čuvanje jaja."
      },
      {
        city: "ROGATICA",
        client: "CONTE-CO",
        year: "2016",
        description: "Hladnjača sa tunelom kapaciteta 6 tona na dan, lager komorom 130 tona i preradom."
      },
      {
        city: "SREBRENICA",
        client: "FH SREBRENA MALINA",
        year: "2017",
        description: "Hladnjača sa tunelom kapaciteta 6 tona na dan, lager komorom 100 tona i predprostorom."
      },
      {
        city: "SREBRENICA",
        client: "SREBRENIČANKA",
        year: "2017",
        description: "Rekonstrukcija kontinualnog tunela za smrzavanje pomfrita kapaciteta 2000 kg/h."
      }
    ]
  },
  {
    country: "HRVATSKA",
    projects: [
      {
        city: "VINKOVCI",
        client: "VINKA AD",
        year: "2017",
        description: "Tunel za smrzavanje maline kapaciteta 20 tona na dan."
      },
      {
        city: "KONAVLE",
        client: "BIO KONAVLE",
        year: "2016",
        description: "Hladnjača za povrće."
      }
    ]
  },
  {
    country: "SLOVENIJA",
    projects: [
      {
        city: "AJDOVŠČINA",
        client: "FRUCTAL",
        year: "2014",
        description: "Hladno skladište za sirovine u procesu proizvodnje bezalkoholnih napitaka zapremine 26000 m³."
      }
    ]
  },
  {
    country: "SEVERNA MAKEDONIJA",
    projects: [
      {
        city: "SKOPLJE",
        client: "FORNETTI ILINDEN",
        year: "2010",
        description: "Distribuciona hladnjača."
      }
    ]
  },
  {
    country: "POLJSKA",
    projects: [
      {
        city: "TARNOGROD",
        client: "BIOCONCEPT GARDENIA",
        year: "2016",
        description: "Tuneli za smrzavanje maline."
      }
    ]
  }
];
