import { 
  DraftingCompass, Factory, Wrench, BarChart3, Lightbulb, ShieldCheck,
  LucideIcon 
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullContent: string;
  icon: LucideIcon;
  features: string[];
  image?: string;
}

const servicesContentSr: ServiceItem[] = [
  {
    id: "inzenjering",
    title: "Projektovanje",
    shortDesc: "Inženjerska podrška i projektovanje najsavremenijih rashladnih sistema.",
    icon: DraftingCompass,
    image: "/assets/service-engineering.webp",
    features: ["30+ godina iskustva", "350+ završenih projekata", "8+ inženjera", "3D Modelovanje"],
    fullContent: `
      <p>Uz 30+ godina iskustva, 350+ završenih projekata i tim od 8+ inženjera, garantuje se najviši nivo kvaliteta inženjering usluga projektovanja.</p>
      <p>Uz kreativan timski rad, cilj je da pomognemo našim klijentima da ostvare svoje zahteve, dodajući vrednost kroz tehničku iznovrsnost i efikasnu organizaciju.</p>
      <p>Nudimo kompletnu projektnu dokumentaciju, jasno izrađenu i prilagođenu mogućim narednim fazama. U bilo kom trenutku smo dovoljno fleksibilni da se prilagodimo promenama u Vašim zahtevima i pružimo Vam savršeno odgovarajuće rešenje.</p>
      <p>Projektujemo sisteme sa različitim rashladnim fluidima, od freona i amonijaka, do najsavremenijih CO2 rešenja.</p>
    `
  },
  {
    id: "izvodjenje",
    title: "Izvođenje",
    shortDesc: "Stručna montaža i puštanje u rad po principu ključ u ruke.",
    icon: Factory,
    image: "/assets/service-execution.webp",
    features: ["Montaža ključ u ruke", "Brza realizacija", "Stručan tim", "Testiranje sistema"],
    fullContent: `
      <p>Eko Elektrofrigo poseduje stručan tim koji će u najkraćem mogućem roku završiti montažu, garantujući najbolji kvalitet.</p>
      <p>Naša izvođačka ekipa radnika se upoznaje sa sistemom tokom njegovog razvoja, kao i okolnim uslovima i prostorom koji je dostupan na lokaciji.</p>
      <p>Planiramo puštanje u rad Vašeg sistema unapred i uzimamo u obzir ovaj zadatak tokom najranijih faza projektovanja. Ovo osigurava efikasnu ugradnju i nesmetano puštanje u rad.</p>
      <p>Naše dugogodišnje iskustvo predstavlja garant za realizaciju svakog Vašeg zahteva. Takođe, sa pouzdanim, profesionalnim timom saradnika nudimo realizaciju najsavremenijih projekata hladnjača po principu "ključ u ruke". Naše reference govore za nas!</p>
    `
  },
  {
    id: "servis",
    title: "Servis",
    shortDesc: "Održavanje 24/7 i servisna podrška za maksimalnu pouzdanost.",
    icon: Wrench,
    image: "/assets/service-maintenance.webp",
    features: ["Podrška 24/7", "Preventivno održavanje", "Brz odziv", "Originalni delovi"],
    fullContent: `
      <p>Naši servisni tehničari u redovnim intervalima proveravaju Vaš sistem na licu mesta. Registrujemo najvažnije vrednosti merenja, prilagođavamo sve parametre sistema kako bismo maksimizirali efikasnost i poboljšavamo kvalitet Vašeg rashladnog sistema.</p>
      <p>Tokom ovih pregleda vršimo sve zakonske inspekcije, uključujući zakonski usklađenu dokumentaciju. Na ovaj način sprečavamo kvarove i osiguravamo da Vaš sistem neprekidno pruža maksimalne performanse uz minimum uložene energije.</p>
      <p>Poznajemo Vaš sistem i brzo reagujemo kako bismo odmah osigurali Vašu proizvodnju. Naša hitna služba dostupna je 24/7. Izlazimo na teren u najkraćem mogućem roku. To je nešto čime se ponosimo i čime se izdvajamo od drugih.</p>
    `
  },
  {
    id: "energetska-revizija",
    title: "Energetska Revizija",
    shortDesc: "Analiza efikasnosti i ROI studije za smanjenje troškova.",
    icon: BarChart3,
    image: "/assets/service-energy.webp",
    features: ["ROI Analiza", "Merenje potrošnje", "Identifikacija gubitaka", "Optimizacija troškova"],
    fullContent: `
      <p>Energetska efikasnost je ključ održivog poslovanja. Naš tim stručnjaka vrši detaljnu analizu vaših postojećih sistema kako bi identifikovao mesta gubitaka i potencijale za uštedu.</p>
      <p>Kroz precizna merenja i napredne proračune, nudimo konkretna rešenja koja smanjuju potrošnju energije uz zadržavanje ili poboljšanje performansi.</p>
      <p>Izrađujemo detaljne studije isplativosti (ROI) za svaku predloženu meru, dajući vam jasnu sliku o povratu investicije.</p>
      <p>Naš cilj je da vaš sistem učinimo ekološki prihvatljivijim i ekonomski isplativijim, produžavajući mu radni vek uz minimalne operativne troškove.</p>
    `
  },
  {
    id: "konsalting",
    title: "Konsalting",
    shortDesc: "Stručno savetovanje za izbor optimalnih rashladnih rešenja.",
    icon: Lightbulb,
    image: "/assets/service-consulting.webp",
    features: ["Izbor tehnologije", "Zakonska regulativa", "Ekološki standardi", "Studije izvodljivosti"],
    fullContent: `
      <p>Donošenje pravih odluka u ranoj fazi projekta može vam uštedeti značajne resurse u budućnosti. Eko Elektrofrigo pruža usluge stručnog savetovanja pri izboru optimalnih rashladnih rešenja za vaše specifične potrebe.</p>
      <p>Bilo da planirate novi pogon ili modernizaciju postojećeg, pomažemo vam da se snađete u kompleksnom svetu rashladnih tehnologija, zakonskih regulativa i ekoloških standarda.</p>
      <p>Naše iskustvo sa različitim rashladnim fluidima (NH3, CO2, freoni) omogućava nam da objektivno sagledamo prednosti i mane svakog sistema i preporučimo onaj koji najbolje odgovara vašim tehnološkim i budžetskim zahtevima.</p>
    `
  },
  {
    id: "sigurnost",
    title: "Sigurnost",
    shortDesc: "Implementacija najviših standarda bezbednosti i kvaliteta.",
    icon: ShieldCheck,
    image: "/assets/service-safety.webp",
    features: ["ISO Standardi", "Bezbednosni protokoli", "Detekcija curenja", "Pravna usklađenost"],
    fullContent: `
      <p>Bezbednost vašeg pogona i zaposlenih je naš apsolutni prioritet. Primenjujemo najstrože međunarodne standarde i sigurnosne protokole u svim fazama rada, od projektovanja do održavanja.</p>
      <p>Naši sistemi su opremljeni naprednim sigurnosnim mehanizmima i detektorima curenja, a naši inženjeri su obučeni za rad sa svim vrstama rashladnih fluida, uključujući i one sa specifičnim bezbednosnim zahtevima poput amonijaka.</p>
      <p>Pored tehničke sigurnosti, garantujemo i pravnu sigurnost kroz potpunu usklađenost sa važećim zakonima i propisima o zaštiti životne sredine i bezbednosti na radu. Vaš miran san je deo naše usluge.</p>
    `
  }
];

const servicesContentEn: ServiceItem[] = [
  {
    id: "inzenjering",
    title: "Engineering & Design",
    shortDesc: "Engineering support and design of the most advanced refrigeration systems.",
    icon: DraftingCompass,
    image: "/assets/service-engineering.webp",
    features: ["30+ years of experience", "350+ completed projects", "8+ engineers", "3D Modeling"],
    fullContent: `
      <p>With 30+ years of experience, 350+ completed projects, and a team of 8+ engineers, we guarantee the highest level of quality in engineering design services.</p>
      <p>Through creative teamwork, our goal is to help our clients achieve their requirements, adding value through technical excellence and efficient organization.</p>
      <p>We offer complete project documentation, clearly prepared and adapted to possible subsequent phases. At any time, we are flexible enough to adapt to changes in your requirements and provide you with a perfectly suited solution.</p>
      <p>We design systems with various refrigerants, from freon and ammonia to the most modern CO2 solutions.</p>
    `
  },
  {
    id: "izvodjenje",
    title: "Execution",
    shortDesc: "Professional installation and commissioning on a turnkey basis.",
    icon: Factory,
    image: "/assets/service-execution.webp",
    features: ["Turnkey installation", "Fast realization", "Expert team", "System testing"],
    fullContent: `
      <p>Eko Elektrofrigo has an expert team that will complete the installation in the shortest possible time, guaranteeing the best quality.</p>
      <p>Our execution team of workers becomes familiar with the system during its development, as well as with the surrounding conditions and space available at the location.</p>
      <p>We plan the commissioning of your system in advance and take this task into account during the earliest design phases. This ensures efficient installation and smooth commissioning.</p>
      <p>Our many years of experience are a guarantee for the realization of every request. Also, with a reliable, professional team of collaborators, we offer the realization of the most modern cold storage projects on a turnkey basis. Our references speak for us!</p>
    `
  },
  {
    id: "servis",
    title: "Service",
    shortDesc: "24/7 maintenance and service support for maximum reliability.",
    icon: Wrench,
    image: "/assets/service-maintenance.webp",
    features: ["24/7 support", "Preventive maintenance", "Fast response", "Original parts"],
    fullContent: `
      <p>Our service technicians check your system on-site at regular intervals. We register the most important measurement values, adjust all system parameters to maximize efficiency, and improve the quality of your refrigeration system.</p>
      <p>During these inspections, we carry out all statutory inspections, including legally compliant documentation. In this way, we prevent breakdowns and ensure that your system continuously delivers maximum performance with minimum energy input.</p>
      <p>We know your system and react quickly to immediately secure your production. Our emergency service is available 24/7. We go out on the field in the shortest possible time. That is something we are proud of and that sets us apart from others.</p>
    `
  },
  {
    id: "energetska-revizija",
    title: "Energy Audit",
    shortDesc: "Efficiency analysis and ROI studies for cost reduction.",
    icon: BarChart3,
    image: "/assets/service-energy.webp",
    features: ["ROI Analysis", "Consumption measurement", "Loss identification", "Cost optimization"],
    fullContent: `
      <p>Energy efficiency is the key to sustainable business. Our team of experts performs a detailed analysis of your existing systems to identify areas of loss and potential savings.</p>
      <p>Through precise measurements and advanced calculations, we offer concrete solutions that reduce energy consumption while maintaining or improving performance.</p>
      <p>We prepare detailed feasibility studies (ROI) for each proposed measure, giving you a clear picture of the return on investment.</p>
      <p>Our goal is to make your system more environmentally acceptable and economically viable, extending its service life with minimal operating costs.</p>
    `
  },
  {
    id: "konsalting",
    title: "Consulting",
    shortDesc: "Professional advisory for selecting optimal refrigeration solutions.",
    icon: Lightbulb,
    image: "/assets/service-consulting.webp",
    features: ["Technology selection", "Legal regulations", "Environmental standards", "Feasibility studies"],
    fullContent: `
      <p>Making the right decisions in the early phase of a project can save you significant resources in the future. Eko Elektrofrigo provides professional advisory services for selecting optimal refrigeration solutions for your specific needs.</p>
      <p>Whether you are planning a new facility or modernizing an existing one, we help you navigate the complex world of refrigeration technologies, legal regulations, and environmental standards.</p>
      <p>Our experience with various refrigerants (NH3, CO2, freons) enables us to objectively assess the advantages and disadvantages of each system and recommend the one that best suits your technological and budgetary requirements.</p>
    `
  },
  {
    id: "sigurnost",
    title: "Safety",
    shortDesc: "Implementation of the highest safety and quality standards.",
    icon: ShieldCheck,
    image: "/assets/service-safety.webp",
    features: ["ISO Standards", "Safety protocols", "Leak detection", "Legal compliance"],
    fullContent: `
      <p>The safety of your facility and employees is our absolute priority. We apply the strictest international standards and safety protocols in all phases of work, from design to maintenance.</p>
      <p>Our systems are equipped with advanced safety mechanisms and leak detectors, and our engineers are trained to work with all types of refrigerants, including those with specific safety requirements such as ammonia.</p>
      <p>In addition to technical safety, we also guarantee legal safety through full compliance with applicable laws and regulations on environmental protection and workplace safety. Your peace of mind is part of our service.</p>
    `
  }
];

export function getServicesContent(isEnglish: boolean): ServiceItem[] {
  return isEnglish ? servicesContentEn : servicesContentSr;
}

// Backward-compatible static export (Serbian default)
export const servicesContent = servicesContentSr;
