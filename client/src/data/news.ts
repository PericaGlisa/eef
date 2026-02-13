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
  }
];