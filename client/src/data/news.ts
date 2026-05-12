export interface NewsItem {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  desc: string;
  content: string;
  image?: string;
  tags?: string[];
}

export function formatNewsDate(dateStr: string, isEnglish: boolean): string {
  if (!isEnglish) return dateStr;
  
  // Input: "28. JAN 2026"
  const match = dateStr.match(/(\d{1,2})\.\s*([A-Z]{3})\s*(\d{4})/);
  if (!match) return dateStr;
  
  const day = match[1];
  const monthRaw = match[2];
  const year = match[3];
  
  const monthMap: Record<string, string> = {
    JAN: "Jan", FEB: "Feb", MAR: "Mar", APR: "Apr", MAY: "May", JUN: "Jun",
    JUL: "Jul", AUG: "Aug", SEP: "Sep", OCT: "Oct", NOV: "Nov", DEC: "Dec"
  };
  
  const month = monthMap[monthRaw] || monthRaw;
  return `${month} ${day}, ${year}`;
}

const newsItemsSr: NewsItem[] = [
  {
    id: 1,
    slug: "svecana-sednica-masinskog-fakulteta",
    date: "28. JAN 2026",
    category: "Događaji",
    title: "Svečana sednica Saveta Mašinskog fakulteta, Univerziteta u Beogradu",
    desc: "Ove nedelje delegacija Eko Elektrofrigo d.o.o. imala je čast i zadovoljstvo da prisustvuje svečanoj sednici Saveta Mašinskog fakulteta, Univerziteta u Beogradu.",
    content: `Ove nedelje delegacija Eko Elektrofrigo d.o.o. imala je čast i zadovoljstvo da prisustvuje svečanoj sednici Saveta Mašinskog fakulteta, Univerziteta u Beogradu. Tom prilikom, na predlog katedre za termotehniku, Eko Elektrofrigo d.o.o. je uručena zahvalnica za podršku u unapređenju laboratorijskih kapaciteta i nastavnog procesa, kroz donaciju opreme i ogranizovanje stručnih studentskih poseta.
    
Pored organizacije studentskih poseta industrijskim rashladnim postrojenjima, ove godine Eko Elektrofrigo d.o.o. je donirao i rashladnu komoru Mašinskom fakultetu u Beogradu, koja se nalazi u laboratoriji katedre za termotehniku.
    
Zahvaljujemo se i radujemo ponovnoj saradnji!`,
    image: "/assets/blog1.webp",
    tags: ["#eef", "#refrigeration"]
  },
  {
    id: 2,
    slug: "zavrseni-radovi-zitostok-velika-plana",
    date: "25. JAN 2026",
    category: "Projekti",
    title: "Završeni radovi na novom objektu investitora Žitostok d.o.o. u Velikoj Plani",
    desc: "Tokom ovog meseca završeni su radovi Eko Elektrofrigo d.o.o. na novom objektu investitora Žitostok d.o.o. u Velikoj Plani. Pogon za preradu živinskog mesa je kompletno pokriven rashladnim instalacijama.",
    content: `Tokom ovog meseca završeni su radovi Eko Elektrofrigo d.o.o. na novom objektu investitora Žitostok d.o.o. u Velikoj Plani. Pogon za preradu živinskog mesa je kompletno pokriven rashladnim instalacijama koje su projektovane i izvedene od strane Eko Elektrofrigo d.o.o.
    
Rashladni sistemi su podeljeni u tri celine. Plusni sistem je povezan na jedan centralni agregat i dva kondenzatora smeštena iznad mašinske sale. Obuhvata dve lager komore za skladištenje živinskog mesa, ekspeditnu prostoriju, pakeraj, predprostor tunela, kao i prostorije za kosti i separaciju mesa.
    
Minusni sistem obuhvata dve minusne lager komore, a tunelski sistem klasičan tunel za smrzavanje mesa. Oba sistema imaju zasebne agregate smeštene unutar posebnih mašinskih sala, kao i kondenzatore pozicionirane na fasadi objekta.
    
Svi kompresori su proizvođača BITZER, a automatika Danfoss. Isparivači i kondenzatori su LU-VE Group, osim tunelskog. Kao dodatna oprema, ugrađen je Danfoss sistem za monitoring System Manager. Sistem je potpuno fleksibilan i omogućava kako lokalno, tako i daljinsko praćenje rada rashladne instalacije, sa grafičkim prikazom svih radnih i mernih tačaka.`,
    image: "/assets/blog2.webp",
    tags: ["#projects", "#industrial"]
  },
  {
    id: 3,
    slug: "modifikacija-masine-sortiranje-tresnja-delta-agrar-zajecar",
    date: "01. JUN 2026",
    category: "Modernizacija",
    title: "Modifikacija mašine za sortiranje trešnje u hladnjači kompanije Delta Agrar u Zaječaru",
    desc: "Jun je započet radovima Eko Elektrofrigo d.o.o. na modifikaciji napredne MAF RODA AGROBOTIC mašine za sortiranje trešnje u hladnjači kompanije Delta Agrar u Zaječaru.",
    content: `Jun je započet radovima Eko Elektrofrigo d.o.o. na modifikaciji napredne MAF RODA AGROBOTIC mašine za sortiranje trešnje u hladnjači kompanije Delta Agrar u Zaječaru.
    
Modifikovan sistem, pomoću ''Falling Film Chiller'', obezbeđuje hlađenje vodenih puteva kojima trešnja prolazi kroz deo za sortiranje. Time se sprečava porast temperature ohlađenog ploda trešnje.
    
Medijum za hlađenje je etilen glikol, koji se obezbeđuje iz postojećeg sistema hlađenja, takođe projektovanog i izvedenog od strane Eko Elektrofrigo d.o.o.`,
    image: "/assets/blog3.webp",
    tags: ["#refrigeration", "#technology"]
  },
  {
    id: 4,
    slug: "minusna-komora-arhiv-rgz-zemun",
    date: "18. FEB 2026",
    category: "Projekti",
    title: "Minusna komora za arhivsku građu u novoj zgradi Arhiva Republičkog geodetskog zavoda",
    desc: "Fleksibilnost u projektovanju i izvođenju, bez obzira na prostorna ograničenja, izbor rashladnog sredstva, tip skladištene robe i logističke zahteve, predstavlja naš zaštitni znak.",
    content: `Fleksibilnost u projektovanju i izvođenju, bez obzira na prostorna ograničenja, izbor rashladnog sredstva, tip skladištene robe i logističke zahteve, predstavlja naš zaštitni znak. Novootvorena zgrada Arhiva Republičkog geodetskog zavoda, otvorena u Zemun polju, pored prostorija za smeštaj arhivske građe, sadrži i specijalizovane prostorije za dezinfekciju i restauraciju arhivske građe, u koje spada i minusna rashladna komora. Eko Elektrofrigo d.o.o.`,
    image: "/assets/blog4.webp",
    tags: ["#refrigeration", "#projects", "#archive"]
  },
  {
    id: 5,
    slug: "maf-roda-agrobotic-poljoprivredni-sajam-novi-sad",
    date: "18. FEB 2026",
    category: "Događaji",
    title: "Zajedno sa kompanijom MAF RODA AGROBOTIC na 89. Međunarodnom poljoprivrednom sajmu u Novom Sadu",
    desc: "Veliko nam je zadovoljstvo da vas pozovemo da nas posetite na 89. Međunarodnom poljoprivrednom sajmu u Novom Sadu.",
    content: `Veliko nam je zadovoljstvo da vas pozovemo da nas posetite na 89. Međunarodnom poljoprivrednom sajmu u Novom Sadu. Ove godine nastupamo zajedno sa našim partnerima, kompanijom MAF RODA AGROBOTIC, svetskim liderom u tehnologijama za sortiranje i pakovanje voća i povrća. 
    
    Očekujemo vas u Hali 1, gde ćemo vam predstaviti najnovija rešenja i inovacije u industriji. Dođite da razmenimo iskustva i dogovorimo buduću saradnju!`,
    image: "/assets/blog5.webp",
    tags: ["#eef", "#mafroda", "#novisadfair", "#agriculture"]
  },
  {
    id: 6,
    slug: "ralu-logistika-srbija-minusna-komora",
    date: "18. FEB 2026",
    category: "Projekti",
    title: "RALU Logistika Srbija - Nova minusna komora",
    desc: "U sastavni deo usluga koje Eko Elektrofrigo nudi, spadaju i rashladne komore. Naša ponuda obuhvata rashladne komore za skladištenje svih tipova proizvoda.",
    content: `U sastavni deo usluga koje Eko Elektrofrigo nudi, spadaju i rashladne komore vrhunskog kvaliteta. Naša ponuda obuhvata projektovanje i izvođenje rashladnih komora za skladištenje svih tipova proizvoda, a naše dugogodišnje iskustvo i stručno znanje garantuju najadekvatnija rešenja pri različitim temperaturnim uslovima i zahtevima.
    
    Sa ponosom objavljujemo da je ovog meseca u kompaniji RALU Logistika Srbija uspešno završena i puštena u rad nova minusna komora za čuvanje smrznute robe, čime smo još jednom potvrdili našu posvećenost kvalitetu i pouzdanosti.`,
    image: "/assets/blog6.webp",
    tags: ["#refrigeration", "#logistics", "#coldstorage", "#projects"]
  },
  {
    id: 7,
    slug: "danfoss-eer-summit-industrijsko-hladjenje-2022",
    date: "18. FEB 2026",
    category: "Događaji",
    title: "Učesnici internacionalnog samita \"EER Summit for Industrial Refrigeration's Distributors 2022\"",
    desc: 'Predstavnici Eko Elektrofrigo d.o.o. bili su učesnici internacionalnog samita "EER Summit for Industrial Refrigeration\'s Distributors 2022", čiji domaćin je bila kompanija Danfoss.',
    content: `Representatives of Eko Elektrofrigo d.o.o. were participants in the international summit "EER Summit for Industrial Refrigeration's Distributors 2022", hosted by Danfoss. On the occasion of the opening of the new factory in Poland, company Danfoss organized a two-day event that included lectures and trainings in the field of industrial refrigeration, as well as a visit to the factory itself and a tour of production. 
    
    On the first day of the summit, new Danfoss products were discussed, as well as their advantages and possible applications. Participants also had the opportunity to expand their knowledge about the most commonly applied systems in the world of industrial refrigeration. The next day, a visit to the newly opened Danfoss factory was arranged, where the entire production could be seen firsthand. 
    
    After that, a tour of the old part of production was organized, followed by a workshop where participants could get acquainted with all the benefits of Danfoss's new products through practical examples. The crown of this event certainly remains the exchange of best practices, experiences, and new acquaintances, which always bring the possibility of new potential collaborations and improvement.`,
    image: "/assets/blog7.webp",
    tags: ["#danfoss", "#summit", "#refrigeration", "#education"]
  },
  {
    id: 8,
    slug: "sirogojno-company-isporuka-opreme-bajina-basta",
    date: "18. FEB 2026",
    category: "Projekti",
    title: 'Isporuka opreme za "Sirogojno Company" d.o.o. i početak izvođačkih radova',
    desc: 'Isporuka rashladnog agregata sa šest BITZER vijčanih kompresora i kompletnom Danfoss automatikom. Agregat je namenjen hladnjači za prijem, smrzavanje i čuvanje jagodičastog voća u okolini Bajine Bašte.',
    content: `Isporuka rashladnog agregata sa šest BITZER vijčanih kompresora i kompletnom Danfoss automatikom. Agregat je namenjen hladnjači za prijem, smrzavanje i čuvanje jagodičastog voća u okolini Bajine Bašte. 
    
    "Sirogojno Company" d.o.o. je investitor ovog objekta koji sadrži četiri stacionarna tunela, lager komoru, prostor za pothladu svežeg voća, kao i ekspedit i predprostor za manipulaciju robom. Montažni radovi mogu da počnu.`,
    image: "/assets/blog8.webp",
    tags: ["#sirogojnocompany", "#bitzer", "#danfoss", "#coldstorage", "#fruits"]
  }
];

const newsItemsEn: NewsItem[] = [
  {
    id: 1,
    slug: "ceremonial-session-council-faculty-mechanical-engineering",
    date: "28. JAN 2026",
    category: "Events",
    title: "Ceremonial Session of the Council of the Faculty of Mechanical Engineering, University of Belgrade",
    desc: "This week, the delegation of Eko Elektrofrigo d.o.o. had the honor and pleasure of attending the ceremonial session of the Council of the Faculty of Mechanical Engineering, University of Belgrade.",
    content: `This week, the delegation of Eko Elektrofrigo d.o.o. had the honor and pleasure of attending the ceremonial session of the Council of the Faculty of Mechanical Engineering, University of Belgrade. On that occasion, upon the proposal of the Department of Thermal Engineering, Eko Elektrofrigo d.o.o. was presented with a letter of appreciation for its support in improving laboratory capacities and the teaching process, through equipment donations and the organization of professional student visits.
    
In addition to organizing student visits to industrial refrigeration plants, this year Eko Elektrofrigo d.o.o. also donated a cold room to the Faculty of Mechanical Engineering in Belgrade, which is located in the laboratory of the Department of Thermal Engineering.
    
We thank them and look forward to future cooperation!`,
    image: "/assets/blog1.webp",
    tags: ["#eef", "#refrigeration"]
  },
  {
    id: 2,
    slug: "completed-works-zitostok-velika-plana",
    date: "25. JAN 2026",
    category: "Projects",
    title: "Completed Works on the New Facility of Investor Žitostok d.o.o. in Velika Plana",
    desc: "This month, Eko Elektrofrigo d.o.o. completed works on the new facility of investor Žitostok d.o.o. in Velika Plana. The poultry meat processing plant is fully covered by refrigeration installations.",
    content: `This month, Eko Elektrofrigo d.o.o. completed works on the new facility of investor Žitostok d.o.o. in Velika Plana. The poultry meat processing plant is fully covered by refrigeration installations designed and executed by Eko Elektrofrigo d.o.o.
    
The refrigeration systems are divided into three parts. The positive temperature system is connected to one central unit and two condensers located above the machine room. It includes two storage rooms for poultry meat, an expedition room, a packing area, a tunnel pre-room, as well as rooms for bones and meat separation.
    
The negative temperature system includes two negative temperature storage rooms, and the tunnel system is a classic meat freezing tunnel. Both systems have separate units located within special machine rooms, as well as condensers positioned on the building facade.
    
All compressors are from BITZER, and the automation is from Danfoss. Evaporators and condensers are from LU-VE Group, except for the tunnel. As additional equipment, a Danfoss System Manager monitoring system was installed. The system is fully flexible and enables both local and remote monitoring of the refrigeration installation, with a graphical display of all operating and measurement points.`,
    image: "/assets/blog2.webp",
    tags: ["#projects", "#industrial"]
  },
  {
    id: 3,
    slug: "modification-cherry-sorting-machine-delta-agrar-zajecar",
    date: "01. JUN 2026",
    category: "Modernization",
    title: "Modification of the Cherry Sorting Machine in the Cold Store of Delta Agrar Company in Zaječar",
    desc: "June began with works by Eko Elektrofrigo d.o.o. on the modification of the advanced MAF RODA AGROBOTIC cherry sorting machine in the cold store of Delta Agrar company in Zaječar.",
    content: `June began with works by Eko Elektrofrigo d.o.o. on the modification of the advanced MAF RODA AGROBOTIC cherry sorting machine in the cold store of Delta Agrar company in Zaječar.
    
The modified system, using a "Falling Film Chiller", provides cooling of the water paths through which the cherries pass through the sorting section. This prevents the temperature rise of the pre-cooled cherry fruit.
    
The cooling medium is ethylene glycol, which is provided from the existing cooling system, also designed and executed by Eko Elektrofrigo d.o.o.`,
    image: "/assets/blog3.webp",
    tags: ["#refrigeration", "#technology"]
  },
  {
    id: 4,
    slug: "negative-temperature-room-archive-rgz-zemun",
    date: "18. FEB 2026",
    category: "Projects",
    title: "Negative Temperature Room for Archival Materials in the New Building of the Archive of the Republic Geodetic Authority",
    desc: "Flexibility in design and execution, regardless of space limitations, choice of refrigerant, type of stored goods, and logistical requirements, is our trademark.",
    content: `Flexibility in design and execution, regardless of space limitations, choice of refrigerant, type of stored goods, and logistical requirements, is our trademark. The newly opened building of the Archive of the Republic Geodetic Authority, opened in Zemun Polje, in addition to rooms for storing archival materials, also contains specialized rooms for disinfection and restoration of archival materials, including a negative temperature refrigeration room. Eko Elektrofrigo d.o.o.`,
    image: "/assets/blog4.webp",
    tags: ["#refrigeration", "#projects", "#archive"]
  },
  {
    id: 5,
    slug: "maf-roda-agrobotic-agricultural-fair-novi-sad",
    date: "18. FEB 2026",
    category: "Events",
    title: "Together with MAF RODA AGROBOTIC at the 89th International Agricultural Fair in Novi Sad",
    desc: "We are delighted to invite you to visit us at the 89th International Agricultural Fair in Novi Sad.",
    content: `We are delighted to invite you to visit us at the 89th International Agricultural Fair in Novi Sad. This year we are exhibiting together with our partners, MAF RODA AGROBOTIC, a world leader in technologies for sorting and packaging fruits and vegetables. 
    
    We look forward to seeing you in Hall 1, where we will present the latest solutions and innovations in the industry. Come and exchange experiences and arrange future cooperation!`,
    image: "/assets/blog5.webp",
    tags: ["#eef", "#mafroda", "#novisadfair", "#agriculture"]
  },
  {
    id: 6,
    slug: "ralu-logistika-srbija-negative-temperature-room",
    date: "18. FEB 2026",
    category: "Projects",
    title: "RALU Logistika Srbija - New Negative Temperature Room",
    desc: "Cold rooms are part of the services offered by Eko Elektrofrigo. Our offer includes cold rooms for storing all types of products.",
    content: `Cold rooms of top quality are part of the services offered by Eko Elektrofrigo. Our offer includes the design and execution of cold rooms for storing all types of products, and our many years of experience and expertise guarantee the most adequate solutions at different temperature conditions and requirements.
    
    We are proud to announce that this month, at RALU Logistika Srbija, a new negative temperature room for storing frozen goods was successfully completed and commissioned, once again confirming our commitment to quality and reliability.`,
    image: "/assets/blog6.webp",
    tags: ["#refrigeration", "#logistics", "#coldstorage", "#projects"]
  },
  {
    id: 7,
    slug: "danfoss-eer-summit-industrial-refrigeration-2022",
    date: "18. FEB 2026",
    category: "Events",
    title: 'Participants of the International Summit "EER Summit for Industrial Refrigeration\'s Distributors 2022"',
    desc: 'Representatives of Eko Elektrofrigo d.o.o. were participants in the international summit "EER Summit for Industrial Refrigeration\'s Distributors 2022", hosted by Danfoss.',
    content: `Representatives of Eko Elektrofrigo d.o.o. were participants in the international summit "EER Summit for Industrial Refrigeration's Distributors 2022", hosted by Danfoss. On the occasion of the opening of the new factory in Poland, Danfoss organized a two-day event that included lectures and trainings in the field of industrial refrigeration, as well as a visit to the factory itself and a tour of production. 
    
    On the first day of the summit, new Danfoss products were discussed, as well as their advantages and possible applications. Participants also had the opportunity to expand their knowledge about the most commonly applied systems in the world of industrial refrigeration. The next day, a visit to the newly opened Danfoss factory was arranged, where the entire production could be seen firsthand. 
    
    After that, a tour of the old part of production was organized, followed by a workshop where participants could get acquainted with all the benefits of Danfoss's new products through practical examples. The crown of this event certainly remains the exchange of best practices, experiences, and new acquaintances, which always bring the possibility of new potential collaborations and improvement.`,
    image: "/assets/blog7.webp",
    tags: ["#danfoss", "#summit", "#refrigeration", "#education"]
  },
  {
    id: 8,
    slug: "sirogojno-company-equipment-delivery-bajina-basta",
    date: "18. FEB 2026",
    category: "Projects",
    title: 'Equipment Delivery for "Sirogojno Company" d.o.o. and Start of Execution Works',
    desc: 'Delivery of a refrigeration unit with six BITZER screw compressors and complete Danfoss automation. The unit is intended for a cold store for receiving, freezing, and storing berries in the vicinity of Bajina Bašta.',
    content: `Delivery of a refrigeration unit with six BITZER screw compressors and complete Danfoss automation. The unit is intended for a cold store for receiving, freezing, and storing berries in the vicinity of Bajina Bašta. 
    
    "Sirogojno Company" d.o.o. is the investor of this facility, which contains four stationary tunnels, a storage room, a pre-cooling area for fresh fruit, as well as an expedition and pre-room for goods handling. Installation works can begin.`,
    image: "/assets/blog8.webp",
    tags: ["#sirogojnocompany", "#bitzer", "#danfoss", "#coldstorage", "#fruits"]
  }
];

export function getNewsItems(isEnglish: boolean): NewsItem[] {
  return isEnglish ? newsItemsEn : newsItemsSr;
}

// Backward-compatible static export (Serbian default)
export const newsItems = newsItemsSr;
