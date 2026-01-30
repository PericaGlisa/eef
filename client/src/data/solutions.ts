import { Snowflake, Wind, Box, Server, Droplets, Zap, Thermometer } from "lucide-react";

export const solutionsData = [
  {
    id: "rashladne-komore",
    title: "Rashladne Komore",
    image: "/assets/portfolio-cold-room.png",
    shortDesc: "Industrijske komore svih dimenzija (plusne i minusne) sa preciznom kontrolom temperature i vlažnosti za maksimalnu svežinu.",
    fullContent: `
      <p class="mb-6">Rashladne komore predstavljaju prostorije-skladišta u kojima se veštački generiše određena temperatura, kako bi se u njima skladištila roba duži vremenski period. Naša ponuda obuhvata rashladne komore za skladištenje svih tipova proizvoda, kao što su povrće, voće, mlečni proizvodi, meso.... Bez obzira na proizvode koji se u njima čuvaju, ove prostorije hlađenjem usporavaju hemijske i biološke procese u hrani, čime se kontroliše propadanje i gubitak kvaliteta.</p>
      <p class="mb-6">Kroz skladištenje, život svežih namirnica, kao što su meso, povrće i voće, može se produžiti nekoliko dana hlađenjem, odnosno nekoliko nedelja ili meseci zamrzavanjem. Naše iskustvo i znanje garantuju najadekvatnija rešenja za sve tipove robe, pri različitim temperaturnim uslovima.</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Benefite koje nudimo:</h3>
      <ul class="list-disc pl-6 space-y-2 text-[#171A54]/80">
        <li>Savremena oprema zaokružena u sistem koji se projektuje prema specifičnom zahtevu investitora</li>
        <li>Precizna kontrola temperature garantuje pouzdanost skladištenja robe</li>
        <li>Fleksibilnost u projektovanju i izvođenju bez obzira na prostorna ograničenja, izbor rashladnog sredstva, tip skladištene robe i logističke zahteve</li>
        <li>Ekološki prihvatljiva rešenja, energetski efikasna i ekonomična</li>
        <li>SCADA sistem za merenje, praćenje i kontrolu procesa u našim sistemima hlađenja</li>
        <li>Bez obzira na veličinu komore, ispunjavamo predviđene vremenske rokove za završetak radova</li>
        <li>Garancija do pet godina</li>
      </ul>
    `,
    specs: ["Panelna gradnja", "Hermetička vrata", "HACCP standard", "LED rasveta"],
    icon: Snowflake
  },
  {
    id: "tuneli-za-smrzavanje",
    title: "Tuneli za Smrzavanje",
    image: "/assets/portfolio-freezing-tunnel.png",
    shortDesc: "Sistemi za brzo smrzavanje (šokiranje) proizvoda koji čuvaju ćelijsku strukturu, ukus i nutritivne vrednosti.",
    fullContent: `
      <p class="mb-6">Tuneli za brzo smrzavanje omogućavaju trenutno zamrzavanje proizvoda i imaju široku primenu u svetu industrijskog hlađenja. Međutim, nije dovoljno samo zamrznuti proizvod. Tehnologija zamrzavanja mora biti takva da zadrži kvalitet, ukus i teksturu proizvoda. Ovde se ističe znanje i iskustvo koje poseduje Eko Elektrofrigo.</p>
      <p class="mb-6">U deo naše ponude spadaju kako protočni rashladni tuneli, tako i šaržni. Namenjeni su za sve vrste proizvoda. Sa našom opremom garantujemo tunele bez otapanja tokom procesa zamrzavanja, nema zavisnosti od spoljne temperature, vlažnosti robe i temperature unosa robe. Deklarisani kapacitet tunela koji nudimo jeste za nepothlađenu robu.</p>
    `,
    specs: ["-40°C režim", "Inverter ventilatori", "Kontinuirani rad", "Fluidizacija"],
    icon: Wind
  },
  {
    id: "ulo-komore",
    title: "Komore sa kontrolisanom atmosferom – ULO",
    image: "/assets/portfolio-ulo.png",
    shortDesc: "Ultra Low Oxygen tehnologija za dugotrajno čuvanje voća i povrća usporavanjem procesa zrenja.",
    fullContent: `
      <p class="mb-6">Koncept ULO komora se zasniva na održavanju kontrolisane atmosfere u komorama. Skraćenica ULO potiče od “Ultra Low Oxygen”, što u prevodu znači ekstremno nizak nivo kiseonika. Kontrolisana atmosfera omogućava produženo čuvanje voća i povrća. Kako bi se to postiglo, podrazumeva se kvalitetno izvođenje samih komora u smislu gasne nepropusnosti, hermetičnosti i korišćenja namenski dizajniranih elemenata (ULO hladioničkih vrata, prozora za nadzor i servis, uvodnika za cev i kablove...).</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Sistem je koncipiran tako da kontroliše:</h3>
      
      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">O2 (Kiseonik)</h4>
        <p>Snižavanje sadržaja kiseonika usporava disanje voća i omogućava duži period čuvanja. Međutim, prenizak sadržaj kiseonika dovodi do “gušenja” ploda, pa je zbog toga potrebno obezbediti adekvatno provetravanje da bi se osiguralo da nivo kiseonika u hladnjači ne padne suviše nisko.</p>
      </div>

      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">CO2 (Ugljen-dioksid)</h4>
        <p>Tokom disanja, voće i povrće pretvaraju kiseonik u ugljen-dioksid. Ako je nivo CO2 previsok, može oštetiti plodove, pa je zbog toga neophodno da se eliminiše.</p>
      </div>

      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">N2 (Azot)</h4>
        <p>Za dostizanje faze usporenog disanja voća, ponekad je potrebno i više od tri nedelje, a za to vreme voće diše normalno, pri čemu se troši velika količina energije. Zato je preporučljivo da se kiseonik u hladnjači smanjuje na brži i kontrolisan način – ubrizgavanjem azota (N2).</p>
      </div>

      <p class="mb-6">Kako je kvalitet same opreme presudan za kontrolu atmosfere, odlučili smo se za opremu lidera u ovoj oblasti, kompaniju Isolcell. Isolcell je pionir u ovoj oblasti i proizvođač najkvalitetnije opreme preko 60 godina.</p>

      <h3 class="text-2xl font-bold text-[#171A54] mb-4">DCA – “Dynamic Control Atmosphere”</h3>
      <p class="mb-6">Predstavlja sistem patentiran od strane kompanije Isolcell i zasniva se na čuvanju voća u režimu ispod 1% O2, što ga razlikuje od ULO načina čuvanja voća. Na ovaj način se produžava period čuvanja voća u kontrolisanoj atmosferi čak i do 12 meseci, dok se sprečavaju neželjene bolesti na samom plodu tokom perioda čuvanja. Ono što izdvaja samu DCA tehnologiju kod Isolcella jeste da nema ugrožavanja rada usled ljudskog faktora, jer se ceo sistem prati software-om nakon zatvaranja komore na početku sezone i uspostavljanja režima.</p>

      <p class="mb-6 font-medium">Eko Elektrofrigo ima značajne reference u projektovanju i izvođenju ULO hladnjača, a naše dragoceno iskustvo koristimo za razradu narednih projekata. Budite deo poslovnog sveta budućnosti – postanite naš poslovni partner, jer mi smo spremni da odgovorimo na sve Vaše zahteve u pogledu kvaliteta.</p>
    `,
    specs: ["Kontrola atmosfere", "CO2 scrubberi", "Azot generatori", "Smart monitoring"],
    icon: Box
  },
  {
    id: "rashladni-agregati",
    title: "Rashladni Agregati",
    image: "/assets/portfolio-aggregates.png",
    shortDesc: "Visokoefikasni rashladni sistemi dizajnirani za uštedu energije, koristeći ekološke freone i CO2 tehnologiju.",
    fullContent: `
      <p class="mb-6">Projektovanje i izrada rashladnih agregata predstavlja specijalnost Eko Elektrofriga. Odlikuju se industrijskim dizajnom koji, pored estetskog izgleda, omogućava lak pristup i servis. U našim agregatima prvenstveno su instalirani klipni, vijčani i skrol kompresori proizvođača Bitzer. Uz njih ugrađujemo i klipne i skrol kompresore kompanije Danfoss. Kompletna automatika na rashladnom agregatu je marke danskog proizvođača Danfoss.</p>
      <p class="mb-6">Svi agregati su projektovani i izrađeni prema zahtevu i meri korisnika u cilju maksimalnog učinka. U skladu sa politikom energetske efikasnosti naši sistemi obezbeđuju veliki COP u eksploataciji.</p>
      <p class="mb-6 font-bold text-primary">Eko Elektrofrigo nudi rešenja za freonske, amonijačne i CO2 instalacije.</p>
    `,
    specs: ["Bitzer kompresori", "CO2 transkritični", "Povrat toplote", "Tihi rad"],
    icon: Server
  },
  {
    id: "cileri",
    title: "Čileri",
    image: "/assets/portfolio-chillers.png",
    shortDesc: "Sistemi za indirektno hlađenje fluida (voda/glikol) idealni za procesnu industriju i klimatizaciju velikih objekata.",
    fullContent: `
      <p class="mb-6">Hladnjak tečnosti – čiler je uređaj proizveden za hlađenje vode ili mešavine glikola i vode, koja se koristi u tehnološkom procesu. Kao sastavni deo našeg čilera koristi se i vazdušni kondenzator. Glavni kvalitet Eko Elektrofriga jeste da se u potpunosti prilagođavamo zahtevima investitora i nudimo mogućnost projektovanja i proizvodnje jedinstvenog čilera za date potrebe.</p>
      
      <p class="mb-6">Rad čilera je u potpunosti automatski, vođen Danfoss procesorima koji održavaju zadate parametre hladne vode regulišući kapacitet kompresora, te samim tim za rukovanje čilerom nije potrebno stalno prisustvo posebno obučenog lica.</p>
      
      <p class="mb-6">Nakon montiranja vršimo funkcionalnu probu opreme uz poštovanje svih protokola struke, kao i prvo puštanje opreme u rad, pre predaje korisniku na korišćenje. Investitoru obezbeđujemo uputstvo za rukovanje i održavanje našom opremom, kao i obuku lica određenog od strane investitora.</p>
    `,
    specs: ["Free cooling", "Hidraulički moduli", "Precizna kontrola", "Visok EER/SEER"],
    icon: Droplets
  },
  {
    id: "elektro-ormani",
    title: "Elektro Ormani & CNSU",
    image: "/assets/portfolio-electrical.png",
    shortDesc: "Kompletna automatika i centralni nadzorni sistemi upravljanja za potpunu kontrolu i optimizaciju rada sistema.",
    fullContent: `
      <p class="mb-6">Komandno razvodni elektro ormani proizvođača Eko Elektrofrigo su efikasno i logično struktuirani za napajanje i upravljanje rashladnom opremom. Svaki upravljački orman individualno planira naše specijalizovano elektro odeljenje, a u našoj dobro opremljenoj elektro radionici ih sami povezujemo. Sve glavne komponente su pažljivo i precizno označene, uz obavezno poštovanje svih zakonskih normi.</p>
      
      <p class="mb-6">Oprema koju ugrađujemo u naše elektro ormane je renomiranih svetskih proizvođača, kao što su Danfoss, Schrack, Schneider i dr. U zavisnosti od zahteva kupca izrađujemo ormane različitih veličina.</p>
      
      <p class="mb-6">Prilikom puštanja u rad naša služba za podršku aktivno se uključuje. Uz osposobljavanje korisnika za korišćenje opreme, takođe pružamo korisne savete za prevenciju kvarova. Ako se uslovi specifični za investitora promene tokom životnog ciklusa sistema, nudimo mogućnost prilagođavanja kontrolnog programiranja.</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Supervisory control and data acquisition (SCADA)</h3>
      <p class="mb-6">Sistem nadgledanja i prikupljanja podataka poznat kao SCADA služi da korisniku na jednostavan način omogući prikaz procesa koji se trenutno odvijaju u objektu, odnosno postrojenju.</p>
      
      <p class="mb-6">Korisnik ima mogućnost praćenja podataka preko PC računara u samom objektu ili na nekom udaljenom mestu, kao i na mobilnom telefonu/tabletu. Podaci su dati u vidu grafičkog prikaza na monitoru računara, gde se na jednostavan i pregledan način vide svi bitni parametri rada opreme u postrojenju. Pored pregleda trenutnih podataka, moguće je prikazati i podatke iz istorije, u vidu grafikona ili tabela, u raznim formatima za štampu. U slučaju kvara neke od mašina u postrojenju, sistem alarmira korisnika na neposredan način, u vidu grafičkog prikaza alarma za konkretan problem, teksta alarma i podatka o lokaciji. Osim neposrednog alarma, moguće je podesiti i daljinsku dojavu preko e-maila.</p>
      
      <p class="mb-6">Takođe, korisnički pristup je personalizovan i zaštićen, tako da više korisnika sa različitim dozvolama može istovremeno da prati rad SCADA sistema. Moguće je posebno dodeliti prava i dozvole za svakog korisnika, tako da na primer menadžer postrojenja ima pravo da nadgleda podatke i menja parametre rada opreme, a radnik u održavanju može samo da nadgleda, bez mogućnosti promene parametara.</p>
      
      <p class="mb-6">SCADA sistem omogućuje i naknadno povezivanje u mrežu već postojeće opreme u postrojenju, uz jedini uslov da procesna oprema ima neki vid komunikacije sa spoljnim svetom (komunikacioni protokol), čime se odvijanje procesa u postrojenju podiže na viši nivo po pitanju kontrole i nadzora. U slučaju kraćih nestanaka struje, SCADA sistem i dalje funkcioniše tako da nema prekida u logovanju podataka.</p>
      
      <p class="mb-6">Svojim naprednim mogućnostima SCADA sistem se brzo finansijski otplaćuje, pre svega kroz uštedu vremena i troškova za kontrolu procesa, a smanjuje se i mogućnost za greškom u radu i dovodi do optimizacije procesa proizvodnje.</p>
    `,
    specs: ["PLC upravljanje", "SCADA sistemi", "Daljinski nadzor", "Alarming 24/7"],
    icon: Zap
  },
  {
    id: "termoizolacija",
    title: "Termoizolacija",
    image: "/assets/portfolio-insulation.png",
    shortDesc: "Vrhunska izolaciona rešenja uključujući panele i hladionička vrata koja osiguravaju minimalne toplotne gubitke.",
    fullContent: `
      <p class="mb-6">Kompanija Eko Elektrofrigo u svom asortimanu opreme ima i termoizolacione panele i termoizolaciona vrata renomiranih evropskih proizvođača. U mogućnosti smo da ponudimo isporuku termoizolacione opreme, proizvođača po želji investitora ili po našoj preporuci, sa ili bez ugradnje, u skladu sa zahtevima korisnika.</p>
      
      <p class="mb-6">Montaža panela se vrši sistemom vertikalnog slaganja i na taj način se formiraju prostori hladnjače. Ugradnju vrši stručno osoblje, sa dugogodišnjim iskustvom, što garantuje vrhunski kvalitet i trajnost izvedenog objekta.</p>
      
      <p class="mb-6">Takođe, u našoj ponudi se nalaze i hladionička vrata. Vršimo isporuku i montažu hladioničkih vrata različitih dimenzija i tipova, proizvedenih od strane renomiranih evropskih proizvođača, specijalizovanih za proizvodnju vrata za rashladne komore u komercijalnom i industrijskom sektoru. Standardni tipovi hladioničkih vrata koja se koriste u rashladnoj industriji su klizna i zaokretna, a mogu biti izvedena sa ili bez grejača, u zavisnosti od vrste hlađenog prostora gde se montiraju, a u skladu sa zahtevom korisnika.</p>
    `,
    specs: ["PIR/PUR paneli", "Hladionička vrata", "Sanitarne lajsne", "Vatrootpornost"],
    icon: Thermometer
  }
];
