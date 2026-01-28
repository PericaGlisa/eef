
const fs = require('fs');

const rawText = `Sombor
„SOMBOLED“ (2015. godina)
Lager komora gotovih mlečnih proizvoda.
Riđica
„APPLE WORLD“ (2017. godina)
ULO hladnjača za jabuku kapaciteta 4500 tona.
Subotica
„MINI PANI“ (2009. godina)
Rashladni tunel za testo.
„COCA COLA HBC – Fabrika Fresh & Co“ (2012. godina)
Skladišni prostor za sirovine namenjene proizvodnji bezalkoholnih napitaka.
Kanjiža
„TISACOOP“ (2012. godina)
Logistički distributivni centar, lagerske komore – hibridni sistem.
Bačka Palanka
„NECTAR d.o.o.“ (2006. godina)
Rashladne komore za voće i voćne baze.
„NECTAR d.o.o.“ (2008. godina)
Komore za višnju.
„NECTAR d.o.o.“ (2013. godina)
Rekonstrukcija komore za pothladu višnje kapaciteta 65 tona na dan.
Bački Petrovac
„CONTAKT TRADE“ (2008. godina)
Rashladne komore za jaja.
„CONTAKT TRADE“ (2011. godina)
Rashladne komore za jaja.
Vrbas
„AGRIMAX“ (2014. godina)
Rashladna komora za semenski kukuruz.
Srbobran
„SCOM“ (2014. godina)
Lager komore sa minusnim režimom (6 komora) i alternativnim režimom rada (2 komore) ukupne zapremine 26000 m³, hodnik, ekspedit i mašinska sala – rekonstrukcija bivše hladnjače ELAN (prelazak sa amonijaka na freon).
Bečej
„TRIVIT“ (2015. godina)
Rashladna instalacija za pogon prerade u okviru fabrike za proizvodnju pekarskih proizvoda.
Novi Bečej
„PRO-MES“ (2016. godina)
Kompletna rashladna oprema za novu klanicu i hladnjaču za meso.
Kikinda
„BANINI“ (2006. godina)
Čiler za hlađenje u procesu proizvodnje.
„BANINI“ (2009. godina)
Čiler za hlađenje u procesu proizvodnje.
Nova Crnja
„FU BANAT“ (2011. godina)
Čiler za hlađenje u procesu proizvodnje.
Novi Sad
„INDUSTRIJA MESA MATIJEVIĆ“ (2002. godina)
Klanica i prerada mesa kapaciteta 750 tona.
„INDUSTRIJA MESA MATIJEVIĆ“ (2006. godina)
Nova klanica sa preradom mesa kapaciteta 100 tona na dan.
„NEOPLANTA A.D.“ (2008. godina)
Skladište gotovih proizvoda.
„INDUSTRIJA MESA MATIJEVIĆ“ (2009. godina)
Sistem za pločaste zamrzivače 9 tona na 3 sata.
„FRUTTICOM d.o.o.“ (2010. godina)
Rashladne komore za voće i povrće.
„MISTRAL KOMERC d.o.o.“ (2010. godina)
Rashladne komore za jaja.
„ŠTRAND d.o.o.“ (2010. godina)
Prerada mesa.
„INDUSTRIJA MESA MATIJEVIĆ“ (2010. godina)
Skladišni prostor za smrznutu robu kapaciteta 2000 tona.
„INDUSTRIJA MESA MATIJEVIĆ“ (2013. godina)
Rashladne komore za hlađenje kože, komore za hlađenje svinjskih polutki i pogon za pandlovanje u okviru projekta proširenja kapaciteta klanice.
„AGRO STAPAR“ (2015. godina)
Lager komore za čuvanje krompira.
„INDUSTRIJA MESA MATIJEVIĆ“ (2016. godina)
Kompletna rashladna oprema u okviru projekta proširenja kapaciteta prerade.
Irig
„VINARIJA KOVAČEVIĆ“ (2017. godina)
Hladnjača za rashlađivanje i čuvanje grožđa u procesu proizvodnje vina.
„INTERPROM“ (2019. godina)
Lager komora za smrzavanje i čuvanje višnje.
„INTERPROM“ (2019. godina)
Hladnjača za skladištenje jabuke.
Dobrodol
„BERRY ICE FRUITS“ (2021. godina)
Hladnjača sa četiri tunela i lager komorama za čuvanje borovnice kapaciteta 235 tona.
Inđija
„ESCA FOOD SOLUTION“ (2003. godina)
Proizvodnja hamburgera za McDonald’s.
„IZOTERM PLAMA d.o.o.“ (2010. godina)
Čiler za hlađenje u procesu proizvodnje.
„MNG Plastik Gogić“ (2012. godina)
Čiler za hlađenje alata za brizganje plastike.
„MNG Plastik Gogić“ (2013. godina)
Čiler za hlađenje alata za brizganje plastike.
„TERRA PRODUCTION“ (2018. godina)
Rashladne komore za prijem, rashlađivanje i čuvanje voća i povrća.
Krčedin
„AGROUNIJA“ (2017. godina)
ULO hladnjača za jabuku kapaciteta 3500 tona (faza I).
„AGROUNIJA“ (2018. godina)
ULO hladnjača za jabuku kapaciteta 4000 tona (faza II).
Slankamen
„SLANKAMENKA“ (2006. godina)
ULO hladnjača za jabuku kapaciteta 1700 tona.
„SLANKAMENKA“ (2016. godina)
Proširenje kapaciteta ULO hladnjače za 4 komore (faza II).
Šašinci
Klanica „NEDELJKOVIĆ“ (2002. godina)
Klanica i prerada mesa.
Ruma
„SIGMA AZ“ (2004. godina)
Hladnjača za voće i povrće kapaciteta 1000 tona.
„SIGMA AZ“ (2006. godina)
Hladnjača za voće i povrće kapaciteta 1000 tona.
„SIGMA AZ“ (2010. godina)
Kontinualni tunel 2 tone na sat.
Vojka
„FORMA-BM“ (2020. godina)
ULO hladnjača za jabuku kapaciteta 1500 tona.
Nova Pazova
„MOTOPLAST“ (2017. godina)
Čiler za hlađenje u procesu prerade plastičnih masa.
Vršac
„CELANOVA AGRO“ (2020. godina)
ULO hladnjača za jabuku kapaciteta 4000 tona.
„CELANOVA AGRO“ (2021. godina)
Proširenje kapaciteta ULO hladnjače za jabuku za 6.000 tona dodatnog kapaciteta.
Loznica
„FROZEN FRUIT“ (2002. godina)
Hladnjača za malinu kapaciteta 500 tona.
„LEDENA LOZICA“ (2016. godina)
Hladnjača sa dva tunela kapaciteta po 20 tona na dan, dve lager komore kapaciteta 250 tona, pothladom i preradom.
Šabac
„POCERSKA JAGODA“ (2018. godina)
Rashladna komora za pothladu i čuvanje jagode.
Subotište
INDUSTRIJA MESA „ĐURĐEVIĆ“ (2020. godina)
Dogradnja hladnjače, tuneli i prostori sa minusnom temperaturom.
INDUSTRIJA MESA „ĐURĐEVIĆ“ (2021. godina)
Novi objekat sa pogonom za preradu mesa i prostorom za rashlađivanje.
Šimanovci
„MOMO TREJD“ (2007. godina)
Skladišta zamrznutih proizvoda i skladišta za voće i povrće.
„NATURACOOP d.o.o.“ (2007. godina)
Skladište povrća.
„MOMO TRADE d.o.o.“ (2008. godina)
Skladišta zamrznutih proizvoda.
„NATURACOOP d.o.o.“ (2008. godina)
Rashladne komore za voće i povrće.
„CHEMICAL AGROSAVA“ (2011. godina)
Čiler za hlađenje u procesu proizvodnje.
„CHEMICAL AGROSAVA“ (2021. godina)
Regalne lager komore za čuvanje rashlađene i smrznute robe.
„CHEMICAL AGROSAVA“ (2021. godina)
Čiler za hlađenje u procesu proizvodnje hrane za kućne ljubimce.
Ugrinovci
„RALU logistika“ (2022. godina)
Rashladna komora za čuvanje smrznutih namirnica.
Pančevo
„VASILJEVIĆ I SIN“ (2014. godina)
Rashladna komora za mlečne proizvode.
Koceljeva
„TRESA INVEST“ (2020. godina)
Hladnjača za prijem, rashlađivanje i čuvanje borovnice.
Dobanovci
„A&P d.o.o.“ (2013. godina)
Rashladna komora za sirovine.
„NELT“ (2017. godina)
Rashladne instalacije komora za sirovine u okviru fabrike dečije hrane.
Beograd
„SI-MARKET“ (2002. godina)
Hladnjača magacina veleprodaje.
„VETFARM“ (2003. godina)
Hladnjača magacina veleprodaje medikamenata.
„PUERTO SEGURO“ (2004. godina)
Lager komora za sladoled.
„BLING“ (2006. godina)
Skladišni prostor za smrznutu robu.
„GE-RA-CO COMPANY“ (2012. godina)
Rashladne komore za lekove.
„M-ĐENIĆ“ (2014. godina)
Hladnjača za sezonsko povrće.
„POLIMARK“ (2015. godina)
Lager komora u okviru distributivnog magacina zapremine 4650 m³.
„AGROEXIM“ (2015. godina)
Rashladna komora za sadni materijal.
„INTERPROM“ (2016. godina)
Lager komore i pothlada kruške.
„MORSAL“ (2020. godina)
Rashladne komore za čuvanje kolača.
„ATLANTIC ŠTARK“ d.o.o. (2020. godina)
Čiler za hlađenje uređaja FROZEN CONE.
Surčin
„KOTEKS d.o.o.“ (2008. godina)
Klanica i prerada mesa.
„KOTEKS d.o.o.“ (2010. godina)
Goveđa klanica i prerada mesa.
Batajnica
„MODULOR“ (2022. godina)
Minusna komora za arhivsku građu.
Ljubovija
„ZADRUGAR“ (2012. godina)
Tri nova rashladna tunela za smrzavanje maline, nove lager komore i sistem za preradu.
Valjevo
„LUSAMBO“ (2012. godina)
Rashladna komora za cveće.
„AGRANELA“ (2016. godina)
Komora za pothladu jagodičastog voća.
Divci
„KLANICA A.D. – LUTRA GROUP“ (2008. godina)
Klanica i prerada mesa.
Sopot
„KABINET“ (2013. godina)
Rashladna komora za čuvanje sirovina u procesu proizvodnje piva.
„KABINET“ (2013. godina)
Čiler za hlađenje piva u procesu proizvodnje.
Grocka
„DUDA Invest“ (2019. godina)
Hladnjača za prijem, rashlađivanje i čuvanje jabuke i trešnje.
Smederevo
„FRUVITA“ (2006. godina)
Rashladne komore za voće i voćne baze.
„FRUVITA“ (2007. godina)
Čiler za hlađenje u procesu proizvodnje.
„FRUVITA“ (2009. godina)
Rashladne komore za voće i voćne baze.
Bajina Bašta
„MLEKARA SPASOJEVIĆ“ (2018. godina)
Komora za rashlađivanje kapaciteta 20 tona gotovih proizvoda. Rekonstrukcija sistema bazena ledene vode.
„SIROGOJNO COMPANY “ d.o.o. (2020. godina)
Hladnjača sa četiri tunela i lager komorama za jagodičasto voće.
Kosjerić
„JPL SPECIAL d.o.o.“ (2010. godina)
Projekat rekonstrukcije i dogradnja hladnjače.
Gornja Dobrinja
„HIBRID“ (2011. godina)
Rashladni tunel 25 tona na dan, rekonstrukcija i dogradnja hladnjače.
Aranđelovac
„GREENY“ (2019. godina)
ULO hladnjača za jabuku kapaciteta 1800 tona (faza II).
Mladenovac
„MLEKARA GRANICE“ (2019. godina)
Rashladna komora za rashlađivanje i čuvanje jogurta i kisele pavlake.
Užice
„TRGOAGENT“ (2002. godina)
Hladnjača za malinu kapaciteta 300 tona.
Takovo
„SWISSLION“ (2010. godina)
Prerada mesa.
Topola
„BLAZNAVA“ (2003. godina)
Hladnjača za malinu kapaciteta 300 tona.
Rupeljevo
„MALINA PRODUKT“ (2002. godina)
Hladnjača za malinu kapaciteta 1500 tona.
„MALINA PRODUKT“ (2003. godina)
Hladnjača za malinu kapaciteta 2000 tona, faza II.
Požega
„FRIGO PAUN“ (2002. godina)
Hladnjača za malinu kapaciteta 300 tona.
„EUROFRIGO“ (2003. godina)
Hladnjača za malinu kapaciteta 1800 tona, faza II.
„AGROZORA“ (2006. godina)
Proširenje hladnjače za jagodičasto voće.
„BARBE SEAFOOD“ (2015. godina)
Kompletna rashladna oprema hladnjače i pogona za preradu ribe.
Lučani
„AGROPARTNER D.O.O.“ (2007. godina)
Projekat rekonstrukcije i dogradnje hladnjače.
„AGROPARTNER D.O.O.“ (2008. godina)
Projekat rekonstrukcije i dogradnje hladnjače.
„AGROPARTNER D.O.O.“ (2015. godina)
Lager komora za smrznutu malinu zapremine 2750 m³.
„AGROPARTNER“ (2016. godina)
Hladnjača sa tunelom kapaciteta 24 tona na dan.
„AGROPARTNER D.O.O.“ (2018. godina)
Lager komora za skladištenje zamrznutog voća.
Čačak
„MIRALEX“ (2003. godina)
Skladišni prostor za smrznutu robu kapaciteta 1500 tona.
Zaječar
„DELTA AGRAR“ (2021. godina)
ULO hladnjača za jabuku kapaciteta 6.000 tona.
Arilje
„RS KOMERC“ (2001. godina)
Skladište jabuke kapaciteta 200 tona.
„FRUCOM“ (2006. godina)
Tri rashladna tunela za smrzavanje maline kapaciteta 3x50 tona na dan.
„FRUCOM“ (2009. godina)
Skladišni prostor za smrznutu robu kapaciteta 1500 tona.
„FRUCOM“ (2010. godina)
Skladišni prostor za smrznutu robu kapaciteta 2000 tona.
„NECTAR d.o.o.“ (2013. godina)
Hladnjača sa tunelom za smrzavanje maline kapaciteta 30 tona na dan, lager komore 9400 m³, pothlada i prostor za preradu maline.
Guča
„VALLETTA d.o.o.“ (2007. godina)
Skladište mleka i mlečnih proizvoda.
Viča
„AGROPARTNER“ (2016. godina)
Hladnjača sa tunelom kapaciteta 16 tona na dan, lager komorom zapremine 1750 m³.
Vrdila
„MONDI FOODS“ (2002. godina)
Hladnjača za malinu kapaciteta 1500 tona.
„MONDI FOODS“ (2003. godina)
Hladnjača za malinu kapaciteta 2000 tona, faza II.
Ivanjica
„FLORA“ (2004. godina)
Hladnjača za malinu kapaciteta 1000 tona.
„AGROMARKET“ (2004. godina)
Hladnjača za malinu kapaciteta 1000 tona.
„FLORA“ (2009. godina)
Rashladni tunel kapaciteta 25 tona na dan.
„AGROMARKET“ (2010. godina)
Rashladni tunel kapaciteta 36 tona na dan.
„FLORA“ (2011. godina)
Hladnjača za malinu kapaciteta 800 tona.
„FRIGOSPAS“ (2015. godina)
Hladnjača sa tunelom za smrzavanje maline kapaciteta 15 tona na dan, lager komorom i prostorom prerade.
Blace
„FRIGO FRUIT“ (2003. godina)
Proširenje hladnjače za jagodičasto voće, kapaciteta 1200 tona.
Knjaževac
„DŽERVIN“ (2017. godina)
Rashladne instalacije lager komora ukupnog kapaciteta 5500 tona. Uređaji za kontinualno procesno predhlađenje višnje kapaciteta 6000 kg/h.
Novi Pazar
„MARELA“ (2006. godina)
Skladište sladoleda.`;

const coordinates = {
  "Sombor": { lat: 45.774, lon: 19.112 },
  "Riđica": { lat: 45.92, lon: 19.10 },
  "Subotica": { lat: 46.10, lon: 19.67 },
  "Kanjiža": { lat: 46.07, lon: 20.06 },
  "Bačka Palanka": { lat: 45.251, lon: 19.392 },
  "Bački Petrovac": { lat: 45.36, lon: 19.59 },
  "Vrbas": { lat: 45.57, lon: 19.64 },
  "Srbobran": { lat: 45.550, lon: 19.793 },
  "Bečej": { lat: 45.623, lon: 20.036 },
  "Novi Bečej": { lat: 45.60, lon: 20.13 },
  "Kikinda": { lat: 45.830, lon: 20.462 },
  "Nova Crnja": { lat: 45.67, lon: 20.68 },
  "Novi Sad": { lat: 45.259, lon: 19.833 },
  "Irig": { lat: 45.09, lon: 19.86 },
  "Dobrodol": { lat: 45.08, lon: 19.95 },
  "Inđija": { lat: 45.05, lon: 20.08 },
  "Krčedin": { lat: 45.13, lon: 20.13 },
  "Slankamen": { lat: 45.12, lon: 20.24 }, // Novi Slankamen
  "Šašinci": { lat: 44.97, lon: 19.75 },
  "Ruma": { lat: 45.008, lon: 19.821 },
  "Vojka": { lat: 44.93, lon: 20.15 },
  "Nova Pazova": { lat: 44.94, lon: 20.21 },
  "Vršac": { lat: 45.12, lon: 21.30 },
  "Loznica": { lat: 44.534, lon: 19.224 },
  "Šabac": { lat: 44.76, lon: 19.69 },
  "Subotište": { lat: 44.85, lon: 19.98 },
  "Šimanovci": { lat: 44.87, lon: 20.09 },
  "Ugrinovci": { lat: 44.88, lon: 20.18 },
  "Pančevo": { lat: 44.867, lon: 20.650 },
  "Koceljeva": { lat: 44.466, lon: 19.816 },
  "Dobanovci": { lat: 44.826, lon: 20.222 },
  "Beograd": { lat: 44.817, lon: 20.457 },
  "Surčin": { lat: 44.793, lon: 20.283 },
  "Batajnica": { lat: 44.907, lon: 20.278 },
  "Ljubovija": { lat: 44.188, lon: 19.373 },
  "Valjevo": { lat: 44.270, lon: 19.883 },
  "Divci": { lat: 44.305, lon: 20.007 },
  "Sopot": { lat: 44.519, lon: 20.575 },
  "Grocka": { lat: 44.673, lon: 20.716 },
  "Smederevo": { lat: 44.662, lon: 20.930 },
  "Bajina Bašta": { lat: 43.970, lon: 19.567 },
  "Kosjerić": { lat: 43.996, lon: 19.907 },
  "Gornja Dobrinja": { lat: 43.937, lon: 20.078 },
  "Aranđelovac": { lat: 44.307, lon: 20.560 },
  "Mladenovac": { lat: 44.441, lon: 20.695 },
  "Užice": { lat: 43.855, lon: 19.843 },
  "Takovo": { lat: 44.043, lon: 20.363 },
  "Topola": { lat: 44.253, lon: 20.686 },
  "Rupeljevo": { lat: 43.792, lon: 19.983 },
  "Požega": { lat: 43.847, lon: 20.035 },
  "Lučani": { lat: 43.861, lon: 20.133 },
  "Čačak": { lat: 43.891, lon: 20.349 },
  "Zaječar": { lat: 43.901, lon: 22.274 },
  "Arilje": { lat: 43.754, lon: 20.096 },
  "Guča": { lat: 43.776, lon: 20.229 },
  "Viča": { lat: 43.715, lon: 20.250 },
  "Vrdila": { lat: 43.743, lon: 20.638 },
  "Ivanjica": { lat: 43.582, lon: 20.228 },
  "Blace": { lat: 43.296, lon: 21.288 },
  "Knjaževac": { lat: 43.565, lon: 22.257 },
  "Novi Pazar": { lat: 43.140, lon: 20.512 }
};

const lines = rawText.split('\n');
const locations = [];
let currentLocation = null;

// Parse text
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (coordinates[line]) {
    const cityId = line.toLowerCase().replace(/ /g, '-').replace(/č/g, 'c').replace(/ć/g, 'c').replace(/š/g, 's').replace(/đ/g, 'dj').replace(/ž/g, 'z');
    
    let existingLoc = locations.find(l => l.id === cityId);
    if (existingLoc) {
      currentLocation = existingLoc;
    } else {
      currentLocation = {
        id: cityId,
        city: line,
        x: 0,
        y: 0,
        projects: []
      };
      locations.push(currentLocation);
    }
  } else if (currentLocation) {
    if (line.includes('godina)')) {
      const match = line.match(/^(.*)\((\d{4})\.\s*godina\)$/);
      let title = line;
      let client = "";
      
      if (match) {
        title = match[1].trim(); 
        title = title.replace(/^„/, '').replace(/“$/, '').replace(/"/g, '');
        client = title; 
      }
      
      let desc = "";
      while (i + 1 < lines.length) {
        const nextLine = lines[i+1].trim();
        if (coordinates[nextLine] || nextLine.includes('godina)')) {
          break;
        }
        desc += (desc ? " " : "") + nextLine;
        i++;
      }
      
      currentLocation.projects.push({
        title: title, 
        desc: desc,
        client: client
      });
    }
  }
}

// Calculate coordinates
// Calibrated to match rs-all.json UTM Zone 34 projection and SVG viewBox 0 0 727 1042
// Map Transform: translate(103.0, 896.9) scale(0.08492 -0.08492)
// SVG_X = 166.30 * lon - 3114.60
// SVG_Y = -230.42 * lat + 10709.15

locations.forEach(loc => {
  const coord = coordinates[loc.city];
  if (coord) {
    const svgX = 166.30 * coord.lon - 3114.60;
    const svgY = -230.42 * coord.lat + 10709.15;
    
    // Convert to percentage of viewBox (727 x 1042)
    loc.x = (svgX / 727) * 100;
    loc.y = (svgY / 1042) * 100;
  }
});

// Generate TS output
const tsOutput = `export interface Project {
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

export const locations: Location[] = ${JSON.stringify(locations, null, 2)};`;
fs.writeFileSync('client/src/components/references/locations.ts', tsOutput);
console.log("File written to client/src/components/references/locations.ts");
