
const fs = require('fs');

// Approximate bounds for Serbia SVG (based on previous calibration)
const BOUNDS = {
  minLat: 41.7,
  maxLat: 46.3, // Slightly adjusted to fit Subotica better
  minLon: 18.7,
  maxLon: 23.1
};

// Coordinate mapping function
function getCoordinates(lat, lon) {
  // Simple linear interpolation
  const x = (lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon) * 100;
  const y = (BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat) * 100;
  
  // Squeeze factor (0.92) applied in previous turns, likely to center/fit within SVG viewbox padding
  // But let's stick to the raw linear first, or apply a slight padding.
  // Previous successful mapping: Subotica (24, 8), Nis (69, 63)
  // My linear calc with above bounds:
  // Subotica (46.10, 19.66):
  // y = (46.3 - 46.10) / 4.6 * 100 = 0.2 / 4.6 * 100 = 4.3% (Close to 8)
  // x = (19.66 - 18.7) / 4.4 * 100 = 0.96 / 4.4 * 100 = 21.8% (Close to 24)
  // Nis (43.32, 21.89):
  // y = (46.3 - 43.32) / 4.6 * 100 = 2.98 / 4.6 * 100 = 64.7% (Close to 63)
  // x = (21.89 - 18.7) / 4.4 * 100 = 3.19 / 4.4 * 100 = 72.5% (Close to 69)
  
  // It seems fairly consistent. I will apply a small offset/scaling to match exactly if needed, 
  // but for now raw calc + manual tweak for layout is best.
  // Actually, I'll just use these bounds as they are reasonably close.
  
  return { 
    x: Math.round(x), 
    y: Math.round(y) 
  };
}

const cityCoords = {
  "Sombor": { lat: 45.77, lon: 19.12 },
  "Riđica": { lat: 45.99, lon: 19.10 },
  "Subotica": { lat: 46.10, lon: 19.66 },
  "Kanjiža": { lat: 46.06, lon: 20.05 },
  "Bačka Palanka": { lat: 45.25, lon: 19.40 },
  "Bački Petrovac": { lat: 45.36, lon: 19.59 },
  "Vrbas": { lat: 45.57, lon: 19.64 },
  "Srbobran": { lat: 45.55, lon: 19.79 },
  "Bečej": { lat: 45.61, lon: 20.03 },
  "Novi Bečej": { lat: 45.60, lon: 20.13 },
  "Kikinda": { lat: 45.83, lon: 20.46 },
  "Nova Crnja": { lat: 45.66, lon: 20.68 },
  "Novi Sad": { lat: 45.26, lon: 19.83 },
  "Irig": { lat: 45.10, lon: 19.86 },
  "Dobrodol": { lat: 45.05, lon: 19.93 }, // Approx
  "Inđija": { lat: 45.05, lon: 20.08 },
  "Krčedin": { lat: 45.14, lon: 20.13 },
  "Slankamen": { lat: 45.12, lon: 20.25 },
  "Šašinci": { lat: 44.96, lon: 19.74 },
  "Ruma": { lat: 45.00, lon: 19.82 },
  "Vojka": { lat: 44.93, lon: 20.15 },
  "Nova Pazova": { lat: 44.94, lon: 20.21 },
  "Vršac": { lat: 45.12, lon: 21.30 },
  "Loznica": { lat: 44.53, lon: 19.22 },
  "Šabac": { lat: 44.76, lon: 19.69 },
  "Subotište": { lat: 44.85, lon: 19.98 },
  "Šimanovci": { lat: 44.87, lon: 20.09 },
  "Ugrinovci": { lat: 44.88, lon: 20.18 },
  "Pančevo": { lat: 44.87, lon: 20.64 }
};

const rawData = [
  {
    city: "Sombor",
    projects: [
      { title: "SOMBOLED", desc: "Lager komora gotovih mlečnih proizvoda.", client: "Somboled (2015)" }
    ]
  },
  {
    city: "Riđica",
    projects: [
      { title: "APPLE WORLD", desc: "ULO hladnjača za jabuku kapaciteta 4500 tona.", client: "Apple World (2017)" }
    ]
  },
  {
    city: "Subotica",
    projects: [
      { title: "MINI PANI", desc: "Rashladni tunel za testo.", client: "Mini Pani (2009)" },
      { title: "COCA COLA HBC – Fabrika Fresh & Co", desc: "Skladišni prostor za sirovine namenjene proizvodnji bezalkoholnih napitaka.", client: "Coca Cola HBC (2012)" }
    ]
  },
  {
    city: "Kanjiža",
    projects: [
      { title: "TISACOOP", desc: "Logistički distributivni centar, lagerske komore – hibridni sistem.", client: "Tisacoop (2012)" }
    ]
  },
  {
    city: "Bačka Palanka",
    projects: [
      { title: "NECTAR d.o.o.", desc: "Rashladne komore za voće i voćne baze.", client: "Nectar (2006)" },
      { title: "NECTAR d.o.o.", desc: "Komore za višnju.", client: "Nectar (2008)" },
      { title: "NECTAR d.o.o.", desc: "Rekonstrukcija komore za pothladu višnje kapaciteta 65 tona na dan.", client: "Nectar (2013)" }
    ]
  },
  {
    city: "Bački Petrovac",
    projects: [
      { title: "CONTAKT TRADE", desc: "Rashladne komore za jaja.", client: "Contakt Trade (2008)" },
      { title: "CONTAKT TRADE", desc: "Rashladne komore za jaja.", client: "Contakt Trade (2011)" }
    ]
  },
  {
    city: "Vrbas",
    projects: [
      { title: "AGRIMAX", desc: "Rashladna komora za semenski kukuruz.", client: "Agrimax (2014)" }
    ]
  },
  {
    city: "Srbobran",
    projects: [
      { title: "SCOM", desc: "Lager komore sa minusnim režimom (6 komora) i alternativnim režimom rada (2 komore) ukupne zapremine 26000 m³, hodnik, ekspedit i mašinska sala – rekonstrukcija bivše hladnjače ELAN (prelazak sa amonijaka na freon).", client: "Scom (2014)" }
    ]
  },
  {
    city: "Bečej",
    projects: [
      { title: "TRIVIT", desc: "Rashladna instalacija za pogon prerade u okviru fabrike za proizvodnju pekarskih proizvoda.", client: "Trivit (2015)" }
    ]
  },
  {
    city: "Novi Bečej",
    projects: [
      { title: "PRO-MES", desc: "Kompletna rashladna oprema za novu klanicu i hladnjaču za meso.", client: "Pro-Mes (2016)" }
    ]
  },
  {
    city: "Kikinda",
    projects: [
      { title: "BANINI", desc: "Čiler za hlađenje u procesu proizvodnje.", client: "Banini (2006)" },
      { title: "BANINI", desc: "Čiler za hlađenje u procesu proizvodnje.", client: "Banini (2009)" }
    ]
  },
  {
    city: "Nova Crnja",
    projects: [
      { title: "FU BANAT", desc: "Čiler za hlađenje u procesu proizvodnje.", client: "Fu Banat (2011)" }
    ]
  },
  {
    city: "Novi Sad",
    projects: [
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Klanica i prerada mesa kapaciteta 750 tona.", client: "IM Matijević (2002)" },
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Nova klanica sa preradom mesa kapaciteta 100 tona na dan.", client: "IM Matijević (2006)" },
      { title: "NEOPLANTA A.D.", desc: "Skladište gotovih proizvoda.", client: "Neoplanta (2008)" },
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Sistem za pločaste zamrzivače 9 tona na 3 sata.", client: "IM Matijević (2009)" },
      { title: "FRUTTICOM d.o.o.", desc: "Rashladne komore za voće i povrće.", client: "Frutticom (2010)" },
      { title: "MISTRAL KOMERC d.o.o.", desc: "Rashladne komore za jaja.", client: "Mistral Komerc (2010)" },
      { title: "ŠTRAND d.o.o.", desc: "Prerada mesa.", client: "Štrand (2010)" },
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Skladišni prostor za smrznutu robu kapaciteta 2000 tona.", client: "IM Matijević (2010)" },
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Rashladne komore za hlađenje kože, komore za hlađenje svinjskih polutki i pogon za pandlovanje u okviru projekta proširenja kapaciteta klanice.", client: "IM Matijević (2013)" },
      { title: "AGRO STAPAR", desc: "Lager komore za čuvanje krompira.", client: "Agro Stapar (2015)" },
      { title: "INDUSTRIJA MESA MATIJEVIĆ", desc: "Kompletna rashladna oprema u okviru projekta proširenja kapaciteta prerade.", client: "IM Matijević (2016)" }
    ]
  },
  {
    city: "Irig",
    projects: [
      { title: "VINARIJA KOVAČEVIĆ", desc: "Hladnjača za rashlađivanje i čuvanje grožđa u procesu proizvodnje vina.", client: "Vinarija Kovačević (2017)" },
      { title: "INTERPROM", desc: "Lager komora za smrzavanje i čuvanje višnje.", client: "Interprom (2019)" },
      { title: "INTERPROM", desc: "Hladnjača za skladištenje jabuke.", client: "Interprom (2019)" }
    ]
  },
  {
    city: "Dobrodol",
    projects: [
      { title: "BERRY ICE FRUITS", desc: "Hladnjača sa četiri tunela i lager komorama za čuvanje borovnice kapaciteta 235 tona.", client: "Berry Ice Fruits (2021)" }
    ]
  },
  {
    city: "Inđija",
    projects: [
      { title: "ESCA FOOD SOLUTION", desc: "Proizvodnja hamburgera za McDonald’s.", client: "Esca Food Solution (2003)" },
      { title: "IZOTERM PLAMA d.o.o.", desc: "Čiler za hlađenje u procesu proizvodnje.", client: "Izoterm Plama (2010)" },
      { title: "MNG Plastik Gogić", desc: "Čiler za hlađenje alata za brizganje plastike.", client: "MNG Plastik Gogić (2012)" },
      { title: "MNG Plastik Gogić", desc: "Čiler za hlađenje alata za brizganje plastike.", client: "MNG Plastik Gogić (2013)" },
      { title: "TERRA PRODUCTION", desc: "Rashladne komore za prijem, rashlađivanje i čuvanje voća i povrća.", client: "Terra Production (2018)" }
    ]
  },
  {
    city: "Krčedin",
    projects: [
      { title: "AGROUNIJA", desc: "ULO hladnjača za jabuku kapaciteta 3500 tona (faza I).", client: "Agrounija (2017)" },
      { title: "AGROUNIJA", desc: "ULO hladnjača za jabuku kapaciteta 4000 tona (faza II).", client: "Agrounija (2018)" }
    ]
  },
  {
    city: "Slankamen",
    projects: [
      { title: "SLANKAMENKA", desc: "ULO hladnjača za jabuku kapaciteta 1700 tona.", client: "Slankamenka (2006)" },
      { title: "SLANKAMENKA", desc: "Proširenje kapaciteta ULO hladnjače za 4 komore (faza II).", client: "Slankamenka (2016)" }
    ]
  },
  {
    city: "Šašinci",
    projects: [
      { title: "Klanica NEDELJKOVIĆ", desc: "Klanica i prerada mesa.", client: "Nedeljković (2002)" }
    ]
  },
  {
    city: "Ruma",
    projects: [
      { title: "SIGMA AZ", desc: "Hladnjača za voće i povrće kapaciteta 1000 tona.", client: "Sigma AZ (2004)" },
      { title: "SIGMA AZ", desc: "Hladnjača za voće i povrće kapaciteta 1000 tona.", client: "Sigma AZ (2006)" },
      { title: "SIGMA AZ", desc: "Kontinualni tunel 2 tone na sat.", client: "Sigma AZ (2010)" }
    ]
  },
  {
    city: "Vojka",
    projects: [
      { title: "FORMA-BM", desc: "ULO hladnjača za jabuku kapaciteta 1500 tona.", client: "Forma-BM (2020)" }
    ]
  },
  {
    city: "Nova Pazova",
    projects: [
      { title: "MOTOPLAST", desc: "Čiler za hlađenje u procesu prerade plastičnih masa.", client: "Motoplast (2017)" }
    ]
  },
  {
    city: "Vršac",
    projects: [
      { title: "CELANOVA AGRO", desc: "ULO hladnjača za jabuku kapaciteta 4000 tona.", client: "Celanova Agro (2020)" },
      { title: "CELANOVA AGRO", desc: "Proširenje kapaciteta ULO hladnjače za jabuku za 6.000 tona dodatnog kapaciteta.", client: "Celanova Agro (2021)" }
    ]
  },
  {
    city: "Loznica",
    projects: [
      { title: "FROZEN FRUIT", desc: "Hladnjača za malinu kapaciteta 500 tona.", client: "Frozen Fruit (2002)" },
      { title: "LEDENA LOZICA", desc: "Hladnjača sa dva tunela kapaciteta po 20 tona na dan, dve lager komore kapaciteta 250 tona, pothladom i preradom.", client: "Ledena Lozica (2016)" }
    ]
  },
  {
    city: "Šabac",
    projects: [
      { title: "POCERSKA JAGODA", desc: "Rashladna komora za pothladu i čuvanje jagode.", client: "Pocerska Jagoda (2018)" }
    ]
  },
  {
    city: "Subotište",
    projects: [
      { title: "INDUSTRIJA MESA ĐURĐEVIĆ", desc: "Dogradnja hladnjače, tuneli i prostori sa minusnom temperaturom.", client: "IM Đurđević (2020)" },
      { title: "INDUSTRIJA MESA ĐURĐEVIĆ", desc: "Novi objekat sa pogonom za preradu mesa i prostorom za rashlađivanje.", client: "IM Đurđević (2021)" }
    ]
  },
  {
    city: "Šimanovci",
    projects: [
      { title: "MOMO TREJD", desc: "Skladišta zamrznutih proizvoda i skladišta za voće i povrće.", client: "Momo Trejd (2007)" },
      { title: "NATURACOOP d.o.o.", desc: "Skladište povrća.", client: "Naturacoop (2007)" },
      { title: "MOMO TRADE d.o.o.", desc: "Skladišta zamrznutih proizvoda.", client: "Momo Trade (2008)" },
      { title: "NATURACOOP d.o.o.", desc: "Rashladne komore za voće i povrće.", client: "Naturacoop (2008)" },
      { title: "CHEMICAL AGROSAVA", desc: "Čiler za hlađenje u procesu proizvodnje.", client: "Chemical Agrosava (2011)" },
      { title: "CHEMICAL AGROSAVA", desc: "Regalne lager komore za čuvanje rashlađene i smrznute robe.", client: "Chemical Agrosava (2021)" },
      { title: "CHEMICAL AGROSAVA", desc: "Čiler za hlađenje u procesu proizvodnje hrane za kućne ljubimce.", client: "Chemical Agrosava (2021)" }
    ]
  },
  {
    city: "Ugrinovci",
    projects: [
      { title: "RALU logistika", desc: "Rashladna komora za čuvanje smrznutih namirnica.", client: "RALU Logistika (2022)" }
    ]
  },
  {
    city: "Pančevo",
    projects: [
      { title: "VASILJEVIĆ I SIN", desc: "Rashladna komora za mlečne proizvode.", client: "Vasiljević i Sin (2014)" }
    ]
  }
];

const processedLocations = rawData.map(loc => {
  const coords = cityCoords[loc.city] || { x: 50, y: 50 }; // Default center if missing
  const { x, y } = getCoordinates(coords.lat, coords.lon);
  
  return {
    id: loc.city.toLowerCase().replace(/[\sšđčćž]+/g, '-').replace(/[^a-z0-9-]/g, ''),
    city: loc.city,
    x,
    y,
    projects: loc.projects
  };
});

const output = `export const locations: Location[] = ${JSON.stringify(processedLocations, null, 2)};`;
console.log(output);
