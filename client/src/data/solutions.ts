import { Snowflake, Wind, Box, Server, Droplets, Zap, Thermometer } from "lucide-react";

export interface SolutionItem {
  id: string;
  title: string;
  image: string;
  shortDesc: string;
  fullContent: string;
  specs: string[];
  icon: typeof Snowflake;
}

const solutionsDataSr: SolutionItem[] = [
  {
    id: "rashladne-komore",
    title: "Rashladne Komore",
    image: "/assets/portfolio-cold-room.webp",
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
    image: "/assets/portfolio-freezing-tunnel.webp",
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
    image: "/assets/portfolio-ulo.webp",
    shortDesc: "Ultra Low Oxygen tehnologija za dugotrajno čuvanje voća i povrća usporavanjem procesa zrenja.",
    fullContent: `
      <p class="mb-6">Koncept ULO komora se zasniva na održavanju kontrolisane atmosfere u komorama. Skraćenica ULO potiče od "Ultra Low Oxygen", što u prevodu znači ekstremno nizak nivo kiseonika. Kontrolisana atmosfera omogućava produženo čuvanje voća i povrća. Kako bi se to postiglo, podrazumeva se kvalitetno izvođenje samih komora u smislu gasne nepropusnosti, hermetičnosti i korišćenja namenski dizajniranih elemenata (ULO hladioničkih vrata, prozora za nadzor i servis, uvodnika za cev i kablove...).</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Sistem je koncipiran tako da kontroliše:</h3>
      
      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">O2 (Kiseonik)</h4>
        <p>Snižavanje sadržaja kiseonika usporava disanje voća i omogućava duži period čuvanja. Međutim, prenizak sadržaj kiseonika dovodi do "gušenja" ploda, pa je zbog toga potrebno obezbediti adekvatno provetravanje da bi se osiguralo da nivo kiseonika u hladnjači ne padne suviše nisko.</p>
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

      <h3 class="text-2xl font-bold text-[#171A54] mb-4">DCA – "Dynamic Control Atmosphere"</h3>
      <p class="mb-6">Predstavlja sistem patentiran od strane kompanije Isolcell i zasniva se na čuvanju voća u režimu ispod 1% O2, što ga razlikuje od ULO načina čuvanja voća. Na ovaj način se produžava period čuvanja voća u kontrolisanoj atmosferi čak i do 12 meseci, dok se sprečavaju neželjene bolesti na samom plodu tokom perioda čuvanja. Ono što izdvaja samu DCA tehnologiju kod Isolcella jeste da nema ugrožavanja rada usled ljudskog faktora, jer se ceo sistem prati software-om nakon zatvaranja komore na početku sezone i uspostavljanja režima.</p>

      <p class="mb-6 font-medium">Eko Elektrofrigo ima značajne reference u projektovanju i izvođenju ULO hladnjača, a naše dragoceno iskustvo koristimo za razradu narednih projekata. Budite deo poslovnog sveta budućnosti – postanite naš poslovni partner, jer mi smo spremni da odgovorimo na sve Vaše zahteve u pogledu kvaliteta.</p>
    `,
    specs: ["Kontrola atmosfere", "CO2 scrubberi", "Azot generatori", "Smart monitoring"],
    icon: Box
  },
  {
    id: "rashladni-agregati",
    title: "Rashladni Agregati",
    image: "/assets/portfolio-aggregates.webp",
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
    image: "/assets/portfolio-chillers.webp",
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
    image: "/assets/portfolio-electrical.webp",
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
    image: "/assets/portfolio-insulation.webp",
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

const solutionsDataEn: SolutionItem[] = [
  {
    id: "rashladne-komore",
    title: "Cold Rooms",
    image: "/assets/portfolio-cold-room.webp",
    shortDesc: "Industrial rooms of all dimensions (positive and negative temperature) with precise temperature and humidity control for maximum freshness.",
    fullContent: `
      <p class="mb-6">Cold rooms are storage spaces in which a specific temperature is artificially generated in order to store goods for a longer period of time. Our offer includes cold rooms for storing all types of products, such as vegetables, fruits, dairy products, meat... Regardless of the products stored in them, these rooms slow down chemical and biological processes in food through cooling, thereby controlling spoilage and quality loss.</p>
      <p class="mb-6">Through storage, the shelf life of fresh foods such as meat, vegetables, and fruits can be extended by several days through cooling, or several weeks or months through freezing. Our experience and knowledge guarantee the most adequate solutions for all types of goods at different temperature conditions.</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Benefits we offer:</h3>
      <ul class="list-disc pl-6 space-y-2 text-[#171A54]/80">
        <li>Modern equipment integrated into a system designed according to the specific requirements of the investor</li>
        <li>Precise temperature control guarantees reliable storage of goods</li>
        <li>Flexibility in design and execution regardless of space limitations, choice of refrigerant, type of stored goods, and logistical requirements</li>
        <li>Environmentally acceptable solutions, energy efficient and economical</li>
        <li>SCADA system for measuring, monitoring, and controlling processes in our cooling systems</li>
        <li>Regardless of room size, we meet the predicted deadlines for completion of works</li>
        <li>Warranty up to five years</li>
      </ul>
    `,
    specs: ["Panel construction", "Hermetic doors", "HACCP standard", "LED lighting"],
    icon: Snowflake
  },
  {
    id: "tuneli-za-smrzavanje",
    title: "Freezing Tunnels",
    image: "/assets/portfolio-freezing-tunnel.webp",
    shortDesc: "Systems for rapid freezing (shock freezing) of products that preserve cellular structure, taste, and nutritional values.",
    fullContent: `
      <p class="mb-6">Quick-freezing tunnels enable instant freezing of products and have wide application in the world of industrial cooling. However, it is not enough to simply freeze the product. The freezing technology must be such that it preserves the quality, taste, and texture of the product. This is where the knowledge and experience of Eko Elektrofrigo stands out.</p>
      <p class="mb-6">Our offer includes both continuous refrigeration tunnels and batch tunnels. They are intended for all types of products. With our equipment, we guarantee tunnels without thawing during the freezing process, with no dependence on external temperature, product humidity, and product inlet temperature. The declared capacity of the tunnel we offer is for non-pre-cooled goods.</p>
    `,
    specs: ["-40°C mode", "Inverter fans", "Continuous operation", "Fluidization"],
    icon: Wind
  },
  {
    id: "ulo-komore",
    title: "Controlled Atmosphere Rooms – ULO",
    image: "/assets/portfolio-ulo.webp",
    shortDesc: "Ultra Low Oxygen technology for long-term storage of fruits and vegetables by slowing down the ripening process.",
    fullContent: `
      <p class="mb-6">The concept of ULO rooms is based on maintaining a controlled atmosphere inside the rooms. The abbreviation ULO comes from "Ultra Low Oxygen", which means extremely low oxygen level. Controlled atmosphere enables extended storage of fruits and vegetables. To achieve this, quality execution of the rooms themselves is required in terms of gas tightness, hermetic sealing, and the use of specially designed elements (ULO cold room doors, inspection and service windows, cable and pipe entries...).</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">The system is designed to control:</h3>
      
      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">O2 (Oxygen)</h4>
        <p>Lowering the oxygen content slows down fruit respiration and enables a longer storage period. However, too low an oxygen content leads to "suffocation" of the fruit, which is why adequate ventilation must be provided to ensure that the oxygen level in the cold room does not drop too low.</p>
      </div>

      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">CO2 (Carbon Dioxide)</h4>
        <p>During respiration, fruits and vegetables convert oxygen into carbon dioxide. If the CO2 level is too high, it can damage the fruits, which is why it is necessary to eliminate it.</p>
      </div>

      <div class="mb-6">
        <h4 class="text-xl font-bold text-primary mb-2">N2 (Nitrogen)</h4>
        <p>To reach the stage of slowed fruit respiration, sometimes more than three weeks are needed, and during that time the fruit breathes normally, consuming a large amount of energy. Therefore, it is recommended to reduce the oxygen in the cold room in a faster and controlled way – by injecting nitrogen (N2).</p>
      </div>

      <p class="mb-6">Since the quality of the equipment itself is crucial for atmosphere control, we have chosen equipment from the leader in this field, the company Isolcell. Isolcell is a pioneer in this field and has been manufacturing the highest quality equipment for over 60 years.</p>

      <h3 class="text-2xl font-bold text-[#171A54] mb-4">DCA – "Dynamic Control Atmosphere"</h3>
      <p class="mb-6">This is a system patented by Isolcell and is based on storing fruit in a regime below 1% O2, which distinguishes it from the ULO method of fruit storage. In this way, the fruit storage period in a controlled atmosphere is extended by up to 12 months, while preventing unwanted diseases on the fruit itself during the storage period. What sets DCA technology apart at Isolcell is that there is no risk of operation disruption due to human error, as the entire system is monitored by software after the room is closed at the beginning of the season and the regime is established.</p>

      <p class="mb-6 font-medium">Eko Elektrofrigo has significant references in the design and execution of ULO cold stores, and we use our valuable experience for the development of future projects. Become part of the business world of the future – become our business partner, because we are ready to respond to all your quality requirements.</p>
    `,
    specs: ["Atmosphere control", "CO2 scrubbers", "Nitrogen generators", "Smart monitoring"],
    icon: Box
  },
  {
    id: "rashladni-agregati",
    title: "Cooling Units",
    image: "/assets/portfolio-aggregates.webp",
    shortDesc: "Highly efficient cooling systems designed for energy savings, using eco-friendly refrigerants and CO2 technology.",
    fullContent: `
      <p class="mb-6">The design and manufacture of refrigeration units is a specialty of Eko Elektrofrigo. They are characterized by an industrial design that, in addition to aesthetic appearance, enables easy access and service. Our units are primarily equipped with reciprocating, screw, and scroll compressors from the manufacturer Bitzer. In addition, we install reciprocating and scroll compressors from Danfoss. The complete automation on the refrigeration unit is from the Danish manufacturer Danfoss.</p>
      <p class="mb-6">All units are designed and manufactured according to the user's requirements and dimensions in order to achieve maximum performance. In accordance with our energy efficiency policy, our systems ensure a high COP in operation.</p>
      <p class="mb-6 font-bold text-primary">Eko Elektrofrigo offers solutions for freon, ammonia, and CO2 installations.</p>
    `,
    specs: ["Bitzer compressors", "CO2 transcritical", "Heat recovery", "Quiet operation"],
    icon: Server
  },
  {
    id: "cileri",
    title: "Chillers",
    image: "/assets/portfolio-chillers.webp",
    shortDesc: "Systems for indirect cooling of fluids (water/glycol) ideal for process industry and air conditioning of large facilities.",
    fullContent: `
      <p class="mb-6">A liquid chiller is a device manufactured for cooling water or a mixture of glycol and water, which is used in a technological process. An air-cooled condenser is also used as part of our chiller. The main quality of Eko Elektrofrigo is that we fully adapt to the investor's requirements and offer the possibility of designing and manufacturing a unique chiller for the given needs.</p>
      
      <p class="mb-6">The chiller operation is fully automatic, controlled by Danfoss processors that maintain the set parameters of chilled water by regulating the compressor capacity, so no permanently trained person is required to operate the chiller.</p>
      
      <p class="mb-6">After installation, we perform a functional test of the equipment in compliance with all professional protocols, as well as the first commissioning of the equipment before handing it over to the user. We provide the investor with instructions for operating and maintaining our equipment, as well as training for personnel designated by the investor.</p>
    `,
    specs: ["Free cooling", "Hydraulic modules", "Precise control", "High EER/SEER"],
    icon: Droplets
  },
  {
    id: "elektro-ormani",
    title: "Electrical Cabinets & SCADA",
    image: "/assets/portfolio-electrical.webp",
    shortDesc: "Complete automation and central supervisory control systems for full control and optimization of system operation.",
    fullContent: `
      <p class="mb-6">The command and distribution electrical cabinets manufactured by Eko Elektrofrigo are efficiently and logically structured for powering and controlling refrigeration equipment. Each control cabinet is individually planned by our specialized electrical department, and in our well-equipped electrical workshop we connect them ourselves. All main components are carefully and precisely labeled, with mandatory compliance with all legal standards.</p>
      
      <p class="mb-6">The equipment we install in our electrical cabinets is from renowned world manufacturers such as Danfoss, Schrack, Schneider, and others. Depending on the customer's requirements, we manufacture cabinets of various sizes.</p>
      
      <p class="mb-6">During commissioning, our support service actively gets involved. In addition to training users to operate the equipment, we also provide useful advice for preventing breakdowns. If conditions specific to the investor change during the system's life cycle, we offer the possibility of adapting the control programming.</p>
      
      <h3 class="text-2xl font-bold text-[#171A54] mb-4">Supervisory control and data acquisition (SCADA)</h3>
      <p class="mb-6">The supervisory control and data acquisition system known as SCADA serves to enable the user to easily display the processes currently taking place in the facility, i.e., the plant.</p>
      
      <p class="mb-6">The user has the ability to track data via a PC computer in the facility itself or at some remote location, as well as on a mobile phone/tablet. The data is presented in the form of a graphical display on the computer monitor, where all important operating parameters of the equipment in the plant can be seen in a simple and clear way. In addition to viewing current data, it is possible to display historical data in the form of graphs or tables, in various formats for printing. In case of a breakdown of any machine in the plant, the system alerts the user immediately, in the form of a graphical alarm display for the specific problem, alarm text, and location data. In addition to the immediate alarm, it is possible to set up remote notification via e-mail.</p>
      
      <p class="mb-6">Also, user access is personalized and protected, so that multiple users with different permissions can simultaneously monitor the SCADA system operation. It is possible to specially assign rights and permissions for each user, so that for example the plant manager has the right to monitor data and change equipment operating parameters, while the maintenance worker can only monitor without the ability to change parameters.</p>
      
      <p class="mb-6">The SCADA system also enables subsequent networking of existing equipment in the plant, with the only condition that the process equipment has some form of communication with the outside world (communication protocol), thereby raising the process operation in the plant to a higher level in terms of control and supervision. In case of short power outages, the SCADA system continues to function so that there is no interruption in data logging.</p>
      
      <p class="mb-6">With its advanced capabilities, the SCADA system quickly pays for itself financially, primarily through savings in time and costs for process control, while reducing the possibility of errors in operation and leading to optimization of production processes.</p>
    `,
    specs: ["PLC control", "SCADA systems", "Remote monitoring", "Alarming 24/7"],
    icon: Zap
  },
  {
    id: "termoizolacija",
    title: "Thermal Insulation",
    image: "/assets/portfolio-insulation.webp",
    shortDesc: "Top-quality insulation solutions including panels and cold room doors that ensure minimal heat losses.",
    fullContent: `
      <p class="mb-6">Eko Elektrofrigo also has thermal insulation panels and thermal insulation doors from renowned European manufacturers in its equipment assortment. We are able to offer delivery of thermal insulation equipment from the manufacturer of the investor's choice or according to our recommendation, with or without installation, in accordance with the user's requirements.</p>
      
      <p class="mb-6">Panel assembly is performed by a vertical stacking system, and in this way cold room spaces are formed. Installation is carried out by skilled personnel with many years of experience, which guarantees top quality and durability of the completed facility.</p>
      
      <p class="mb-6">Also, our offer includes cold room doors. We supply and install cold room doors of various dimensions and types, manufactured by renowned European manufacturers specialized in the production of doors for cold rooms in the commercial and industrial sectors. The standard types of cold room doors used in the refrigeration industry are sliding and swing doors, and they can be made with or without heaters, depending on the type of cooled space where they are installed, in accordance with the user's requirements.</p>
    `,
    specs: ["PIR/PUR panels", "Cold room doors", "Sanitary flashings", "Fire resistance"],
    icon: Thermometer
  }
];

export function getSolutionsData(isEnglish: boolean): SolutionItem[] {
  return isEnglish ? solutionsDataEn : solutionsDataSr;
}

// Backward-compatible static export (Serbian default)
export const solutionsData = solutionsDataSr;
