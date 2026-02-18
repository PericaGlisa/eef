export interface NewsItem {
  id: number;
  date: string;
  category: string;
  title: string;
  desc: string;
  content: string;
  image?: string;
  tags?: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
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
    date: "18. FEB 2026",
    category: "Događaji",
    title: 'Učesnici internacionalnog samita "EER Summit for Industrial Refrigeration’s Distributors 2022"',
    desc: 'Predstavnici Eko Elektrofrigo d.o.o. bili su učesnici internacionalnog samita "EER Summit for Industrial Refrigeration\'s Distributors 2022", čiji domaćin je bila kompanija Danfoss.',
    content: `Predstavnici Eko Elektrofrigo d.o.o. bili su učesnici internacionalnog samita "EER Summit for Industrial Refrigeration's Distributors 2022", čiji domaćin je bila kompanija Danfoss. Povodom otvaranja nove fabrike u Poljskoj, kompanija Danfoss organizovala je dvodnevni događaj, koji je obuhvatao predavanja i treninge iz oblasti industrijskog hlađenja, kao i posetu samoj fabrici i obilazak proizvodnje. 
    
    Prvog dana samita govorilo se o novim Danfoss proizvodima, kao i njihovim prednostima i mogućoj primeni. Učesnici su takođe imali priliku da prošire svoje znanje o najčešće primenjivanim sistemima u svetu industrijskog hlađenja. Narednog dana priređena je poseta novootvorenoj Danfoss fabrici, gde se iz prve ruke mogla videti celokupna proizvodnja. 
    
    Nakon toga organizovan je i obilazak starog dela proizvodnje, a zatim i radionica, gde su se kroz praktične primere učesnici mogli upoznati sa svim benefitima novih proizvoda kompanije Danfoss. Kruna ovog događaja svakako ostaje razmena dobrih primera iz prakse, iskustava i nova poznanstva, koja uvek donose mogućnost za novim potencijalnim saradnjama i usavršavanjem.`,
    image: "/assets/blog7.webp",
    tags: ["#danfoss", "#summit", "#refrigeration", "#education"]
  },
  {
    id: 8,
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