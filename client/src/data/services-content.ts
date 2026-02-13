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

export const servicesContent: ServiceItem[] = [
  {
    id: "engineering",
    title: "Projektovanje",
    shortDesc: "Inženjerska podrška i projektovanje najsavremenijih rashladnih sistema.",
    icon: DraftingCompass,
    image: "/assets/service-engineering.webp",
    features: ["26 godina iskustva", "Tim od 8 inženjera", "CO2 i NH3 rešenja", "3D Modelovanje"],
    fullContent: `
      <p>Uz 26 godina iskustva i tim od 8 inženjera, veliki broj ozbiljnih referenci, garantuje se najviši nivo kvaliteta inženjering usluga projektovanja.</p>
      <p>Uz kreativan timski rad, cilj je da pomognemo našim klijentima da ostvare svoje zahteve, dodajući vrednost kroz tehničku iznovrsnost i efikasnu organizaciju.</p>
      <p>Nudimo kompletnu projektnu dokumentaciju, jasno izrađenu i prilagođenu mogućim narednim fazama. U bilo kom trenutku smo dovoljno fleksibilni da se prilagodimo promenama u Vašim zahtevima i pružimo Vam savršeno odgovarajuće rešenje.</p>
      <p>Projektujemo sisteme sa različitim rashladnim fluidima, od freona i amonijaka, do najsavremenijih CO2 rešenja.</p>
    `
  },
  {
    id: "execution",
    title: "Izvođenje",
    shortDesc: "Stručna montaža i puštanje u rad po principu ključ u ruke.",
    icon: Factory,
    image: "/assets/service-execution.webp",
    features: ["Montaža ključ u ruke", "Brza realizacija", "Stručan tim", "Testiranje sistema"],
    fullContent: `
      <p>Eko Elektrofrigo poseduje stručan tim koji će u najkraćem mogućem roku završiti montažu, garantujući najbolji kvalitet.</p>
      <p>Naša izvođačka ekipa radnika se upoznaje sa sistemom tokom njegovog razvoja, kao i okolnim uslovima i prostorom koji je dostupan na lokaciji.</p>
      <p>Planiramo puštanje u rad Vašeg sistema unapred i uzimamo u obzir ovaj zadatak tokom najranijih faza projektovanja. Ovo osigurava efikasnu ugradnju i nesmetano puštanje u rad.</p>
      <p>Naše dugogodišnje iskustvo predstavlja garant za realizaciju svakog Vašeg zahteva. Takođe, sa pouzdanim, profesionalnim timom saradnika nudimo realizaciju najsavremenijih projekata hladnjača po principu “ključ u ruke”. Naše reference govore za nas!</p>
    `
  },
  {
    id: "maintenance",
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
    id: "energy-audit",
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
    id: "consulting",
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
    id: "safety",
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
