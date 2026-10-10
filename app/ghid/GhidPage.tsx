'use client';

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FeaturePlugs from "@/components/FeaturePlugs";
import { ArrowUp, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const tocItems = [
  { id: "introducere", label: "Introducere" },
  {
    id: "structura",
    label: "1. Structura pasajului",
    sub: [{ id: "genuri", label: "1.1 Cum să înțelegem genurile literare" }],
  },
  { id: "context", label: "2. Contextul pasajului" },
  { id: "ideea-autorului", label: "3. Ideea centrală a autorului" },
  { id: "legatura", label: "4. Legătura cu Evanghelia" },
  { id: "ideea-predicii", label: "5. Ideea centrală a predicii" },
  { id: "aplicatii", label: "6. Aplicații" },
  { id: "titlu-schita", label: "7. Titlu și schița predicii" },
  { id: "intrebari", label: "Alte întrebări frecvente" },
];

const allIds = tocItems.flatMap((i) => [i.id, ...(i.sub?.map((s) => s.id) ?? [])]);

const GhidPage = () => {
  const [activeId, setActiveId] = useState<string>("introducere");

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Cuprinsul urmărește secțiunea aflată în partea de sus a ecranului.
  useEffect(() => {
    const sections = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Layout>
      <PageHeader
        kicker="Resurse · Ghid de pregătire"
        title="Ghid de pregătire a fișei de lucru"
        intro="Cei 7 pași ai fișei, explicați pe rând, cu întrebările pe care le primim cel mai des de la participanți."
      />

      <section className="container-site py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-x-20 items-start">
          {/* Cuprins */}
          <nav aria-label="Cuprins" className="lg:sticky lg:top-24 flex flex-col">
            <p className="kicker mb-3">Cuprins</p>
            {tocItems.map((item) => (
              <div key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn("toc-link", activeId === item.id && "toc-link-active")}
                >
                  {item.label}
                </a>
                {item.sub?.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#${sub.id}`}
                    className={cn("toc-link pl-7", activeId === sub.id && "toc-link-active")}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            ))}
            <a
              href="https://fisa.predicare-expozitiva.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-royal hover:text-copper transition-colors"
            >
              <FileText size={16} /> Fișa interactivă ↗
            </a>
          </nav>

          {/* Conținut */}
          <article className="max-w-[680px] space-y-14 [&_.section-title]:text-[30px] md:[&_.section-title]:text-[36px]">
            {/* Introducere */}
            <section className="scroll-mt-24" id="introducere">
              <h2 className="section-title">Introducere</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p>
                  Pregătirea unei fișe de lucru pentru grupul tău mic poate fi o
                  sarcină dificilă, mai ales dacă participi pentru prima dată la
                  un astfel de Seminar de predicare expozitivă. Așteptarea
                  noastră de la tine este să muncești cu sârguință și să dai tot
                  ce ai mai bun. Totodată, nu am vrea să fii peste măsură de
                  stresat ori speriat cu privire la ceea ce se va întâmpla
                  atunci când va trebui să-ți prezinți munca în grupul tău mic.
                </p>
                <p>
                  Bineînțeles că cea mai bună modalitate de a înțelege
                  conceptele din Fișa de lucru pentru pregătirea predicii este
                  să participi la un seminar. Dacă ești la prima participare, nu
                  ne vom aștepta să le fi înțeles pe toate. Acest document
                  clarifică o parte din terminologie și intenția întrebărilor de
                  pe fișa de lucru. De asemenea, poți vizita site-ul
                  organizației și poți audia o parte din înregistrările audio de
                  la seminarele anterioare pentru a te ajuta în pregătire.
                </p>
              </div>
            </section>

            {/* 1. Structura */}
            <section className="scroll-mt-24" id="structura">
              <h2 className="section-title">
                1. În ce fel a structurat autorul acest pasaj?
              </h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Te rugăm a) să arăți structura sub formă de secțiuni, alături
                  de versetele aferente și b) să explici strategiile pe care
                  le-ai folosit pentru a identifica această structură. Pe ce
                  pune accent această structură?
                </p>
                <p>
                  Structura (sau modalitatea de organizare) folosită de autor
                  este un fel de a vorbi despre forma sau conformația unui pasaj
                  biblic. Dincolo de suprafața oricărui pasaj se află o așezare
                  interioară a materialului și o aranjare logică pe care autorul
                  a folosit-o pentru a organiza pasajul. Te poți gândi la
                  aceasta ca fiind schița autorului. Iar fiecare parte a
                  pasajului joacă un rol în această schiță. Atunci când îți
                  cerem să identifici structura unui pasaj, de fapt ne așteptăm
                  să identifici acea alcătuire interioară. Ar putea fi o
                  structură gramaticală sau logică (obișnuită într-un discurs),
                  sau ar putea fi o intrigă, o comparație între personaje sau un
                  procedeu literar (obișnuit într-o narațiune), sau ar putea fi
                  împărțirea pasajului pe strofe (cum e cazul într-o poezie).
                  Indiferent cum vei deduce structura autorului, va trebui să
                  indici secțiunile pasajului, inclusiv numerele versetelor. Te
                  rugăm să reții că folosim conceptul de structură pentru a ne
                  referi la organizarea unui pasaj. Când ne referim la structura
                  unei cărți întregi, este mai potrivit termenul de
                  macrostructură.
                </p>
                <p>
                  De reținut că structura va dezvălui un accent pe care autorul
                  îl pune și pe care l-a comunicat prin intermediul structurii.
                  Acesta este motivul pentru care înțelegerea derulării
                  pasajului, nu doar a părților, este atât de important.
                  Gândește-te la structură și la modul în care părțile se
                  relaționează între ele. Pune întrebările <em>de ce</em> și{" "}
                  <em>cum</em> pentru a vedea dacă poți identifica accentul pus
                  de autor.
                </p>
                <p>
                  În cele din urmă, explică în ce fel ai ajuns la acea structură
                  sau ce strategii ai folosit pentru a o găsi. Vrem să vedem
                  raționamentul din spatele muncii tale și felul în care încerci
                  să identifici accentul dintr-un pasaj.
                </p>
              </div>
            </section>

            {/* 1.1 Genuri literare */}
            <section className="scroll-mt-24" id="genuri">
              <h3 className="section-subtitle">
                1.1 Cum să înțelegem genurile literare sau tipurile de texte?
              </h3>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p>
                  Genurile literare sunt forme de literatură care au
                  caracteristici distincte și, ca urmare, necesită anumite
                  strategii specifice de lecturare. Cei mai mulți oameni nu ar
                  citi un ziar la fel cum ar citi un roman, o rețetă, o
                  scrisoare, sau versurile unui cântec. Biblia conține mai multe
                  genuri literare diferite, printre care istorie a Vechiului
                  Testament, literatură profetică, literatură de înțelepciune,
                  literatură apocaliptică, evanghelii, fapte ale apostolilor și
                  epistole. Deși fiecare seminar se va concentra asupra unui gen
                  literar, și de regulă asupra unei cărți specifice
                  reprezentativă pentru genul literar respectiv, întrebările din
                  fișa de lucru se bazează pe principii și, prin urmare, se
                  aplică la orice gen literar.
                </p>
                <p>
                  Tipurile de texte sunt ușor diferite de genurile literare.
                  Ambele sunt categorii de literatură, de aceea poate fi puțină
                  dificilă înțelegerea deosebirii dintre ele. Genurile literare
                  sunt o categorie mai mare și înțelegerea lor presupune
                  înțelegerea unor aspecte precum conținutul, locul în istorie,
                  forma de literatură și scopul retoric. Tipurile de texte,
                  însă, se referă doar la forma textului din pasaj – de aceea
                  ele au o importanță vitală pentru deslușirea structurii. În
                  Biblie se găsesc trei tipuri majore de texte:{" "}
                  <strong>narațiunea</strong> (sau relatarea),{" "}
                  <strong>discursul</strong> (sau cuvântarea) și{" "}
                  <strong>poezia</strong>. Este important de precizat că fiecare
                  dintre aceste tipuri de texte este prezent în cadrul fiecărui
                  gen literar. Cu alte cuvinte, întâlnim narațiuni, discursuri
                  și poezii în fiecare dintre genurile literare enumerate mai
                  sus. Fiecare tip de text are structuri specifice și necesită
                  strategii specifice pentru a le identifica. Bineînțeles, ar
                  trebui să începi întotdeauna prin a citi și a reciti pasajul
                  (într-o traducere literală) și apoi să încerci să identifici
                  tipul de text. Odată ce ți-ai făcut o idee despre tipul de
                  text, utilizează următoarele strategii:
                </p>

                <div className="space-y-6 ghid-box ghid-box-first">
                  <div>
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Pentru discurs (sau cuvântare):
                    </h4>
                    <p>
                      Acest tip de text este cel mai des întâlnit în
                      discursurile din cărțile istorice ale Vechiului Testament
                      sau din epistole (care, cel mai probabil, au fost
                      predicate). De obicei, este vorba de o singură persoană
                      care vorbește și tinde să urmeze o desfășurare logică. Ca
                      atare, pentru a găsi structura unui discurs, trebuie să
                      urmărești logica sau raționamentul pasajului. Ai putea
                      încerca să faci o analiză gramaticală (cum ar fi
                      identificarea verbelor sau observarea modului în care
                      unele propoziții și idei le sunt subordonate altor
                      propoziții sau idei dominante), precum și trasarea
                      fluxului ideilor (similar cu procedeul schițării sub forma
                      unui arc) sau analiza discursului. Cuvintele cheie și
                      cuvintele de tranziție sunt, de asemenea, foarte
                      importante, mai ales pentru că te ajută să observi
                      caracteristicile gramaticale și sintactice ale pasajului.
                      Și, ca în cazul oricărui tip de text, vei dori să acorzi o
                      atenție deosebită procedeului de repetiție.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Pentru narațiune (sau relatare):
                    </h4>
                    <p>
                      Acest tip de text se găsește mai ales în cărțile istorice
                      ale Vechiului Testament, în unele dintre cărțile
                      profetice, precum și în evanghelii și în Faptele
                      Apostolilor. Structurile din narațiuni tind să se învârtă
                      în jurul unor aspecte precum intriga (sau arcul narativ),
                      personajele (similaritate și contrast) sau alte procedee
                      literare (e.g., momentul din zi, schimbarea locului).
                      Poate că cea mai întâlnită trăsătură literară este
                      intriga, care are o formă distinctivă:
                    </p>
                    <ol className="mt-2 space-y-1 list-decimal list-inside ml-2">
                      <li>
                        cadrul (care include prezentarea personajelor, timpul,
                        locul)
                      </li>
                      <li>
                        conflictul (sau amplificarea acțiunii, un incident
                        declanșator care necesită o corectare sau soluționare)
                      </li>
                      <li>
                        punctul culminant (punctul de cotitură al relatării,
                        momentul din care este pusă în mișcare rezolvarea și de
                        la care aceasta devine necesară sau inevitabilă)
                      </li>
                      <li>
                        rezolvarea (implementarea efectivă a soluției în cadrul
                        conflictului)
                      </li>
                      <li>
                        cadrul cel nou (sau stază, schimbarea intervenind din
                        pricina arcului narativ, care deschide calea pentru
                        următorul arc narativ)
                      </li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Pentru poezie:
                    </h4>
                    <p>
                      Acest tip de text se găsește în întreaga Biblie, dar mai
                      ales în literatura de înțelepciune, în cea profetică și în
                      cea apocaliptică. Secretul pentru a descoperi structura
                      într-o poezie este înțelegerea modului în care
                      funcționează strofele. Multe traduceri ale Bibliei împart
                      poeziile în strofe, de obicei introducând spații verticale
                      între rânduri. Cu toate acestea, editorii nu au
                      întotdeauna dreptate (și nici nu văd la fel lucrurile)! Ai
                      putea încerca să identifici modul de împărțire în strofe
                      prin a observa repetițiile, schimbările de imagini, cele
                      la nivelul vocii/punctului de vedere/persoanei (e.g.,
                      persoana întâi, a doua, a treia), schimbări ale tipului de
                      paralelism (i.e. modul în care versurile se raportează
                      unele la altele în perechi sau triplete) sau alte procedee
                      literare (e.g., alfabetice).
                    </p>
                  </div>
                </div>

                <p>
                  După cum s-a menționat mai sus, unul dintre primele lucruri pe
                  care trebuie să le faci este să încerci să identifici tipul de
                  text. O dificultate frecventă în identificarea tipului de text
                  este găsirea unui dialog (adesea în narațiuni). Dialogurile
                  sunt, în sens tehnic, narațiuni. Un narator relatează
                  interacțiunea dintre două persoane. Cu toate acestea, trebuie
                  să îți pui o întrebare suplimentară: Oare acest dialog
                  funcționează ca o narațiune sau ca un discurs? Uneori,
                  prezența unui al doilea interlocutor nu se datorează, de
                  pildă, rolului său în dezvoltarea unei intrigi, ci, de fapt,
                  acesta îi adresează vorbitorului principal o întrebare sau un
                  comentariu care să îl ajute în cadrul unui discurs funcțional.
                  Ca atare, nu îți fie teamă să tratezi un dialog ca pe un
                  discurs, dacă socotești că ai motive.
                </p>
              </div>
            </section>

            {/* 2. Context */}
            <section className="scroll-mt-24" id="context">
              <h2 className="section-title">
                2. Cum contribuie contextul la înțelegerea acestui pasaj?
              </h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Te rugăm să iei în considerare: a) contextul literar (pasajele
                  care sunt așezate înainte și după cel de față), b) contextul
                  istoric (împrejurările destinatarilor), c) contextul cultural
                  (detalii relevante despre cum trăiau oamenii din locul și
                  vremea respectivă) și d) contextul biblic (citate/aluzii sau
                  legături istorice cu alte cărți pe care le face autorul). Te
                  rugăm să le incluzi doar pe cele care sunt relevante pentru
                  înțelegerea pasajului.
                </p>
                <p>
                  Pentru fiecare gen literar, cel mai bun mod de identificare a
                  contextului literar (și al întregii cărți) este să citești
                  întreaga carte de câteva ori. Fă-ți o idee despre temele și
                  argumentele majore ale întregii cărți. Fă-ți o idee despre
                  arcul narativ și despre argumentele din secțiunile majore.
                  Dar, mai ales, continuă să citești! Un aspect semnificativ în
                  înțelegerea poziționării pasajului tău este să te uiți la
                  pasajul anterior și cel ulterior. Ce legătură au acestea cu
                  pasajul tău? Poți identifica o discuție mai amplă sau un
                  subiect mai larg care le domină și care ar putea să te ajute
                  să înțelegi pasajul tău?
                </p>
                <p>
                  Pentru contextul istoric, ar fi bine să iei în considerare
                  următoarele:
                </p>

                <div className="space-y-3">
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Istoria Vechiului Testament
                    </h4>
                    <p>
                      Atunci când analizezi contextul istoric al unei cărți,
                      trebuie mai întâi să identifici (cât mai bine posibil)
                      autorul original și destinatarii cărții. Acest lucru poate
                      fi dificil de stabilit în secțiunea istorică a Vechiului
                      Testament, dar poți estima o dată aproximativă a scrierii.
                      De exemplu, contextul în care se derulează cartea Rut este
                      „pe vremea judecătorilor." Cu toate acestea, din moment ce
                      cartea relatează finalizarea evenimentelor incluse, cu
                      siguranță că ea a fost scrisă mai târziu decât atunci când
                      au avut loc evenimentele propriu-zise. În cazul cărții
                      Rut, ea nu putea fi scrisă în formă finală decât cel mai
                      devreme după nașterea regelui David, deoarece acesta este
                      menționat la sfârșitul cărții. Așadar, contextul istoric
                      este datat cel mai devreme după instaurarea monarhiei.
                      Găsirea unor referințe din alte cărți din Vechiul
                      Testament care acoperă sau abordează aceeași perioadă
                      istorică a publicului inițial ar putea fi, de asemenea,
                      utilă (de exemplu, în scrierile profeților sau în alte
                      cărți istorice).
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Literatura de înțelepciune
                    </h4>
                    <p>
                      Cărțile de înțelepciune sunt, în cea mai mare parte,
                      oarecum separate de contextul lor istoric. Cântarea
                      Cântărilor și Iov, de exemplu, nu ne oferă niciun indiciu
                      despre locul lor în istoria lui Israel. Există câteva
                      indicii utile în Proverbe, dar este mai puțin limpede că
                      acest tip de context ar avea vreun rol în carte. Așadar,
                      întreabă-te ce poți învăța din Scriptură despre contextul
                      istoric, dar nu te grăbi, ci fii prudent în a-ți baza
                      interpretările pe acest context.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Literatura profetică și apocaliptică
                    </h4>
                    <p>
                      Cărțile profetice și apocaliptice ale Vechiului Testament
                      sunt, în cea mai mare parte, integrate în istoria lui
                      Israel din cărțile istorice ale Vechiului Testament. S-ar
                      putea să găsești referiri utile la anumite persoane,
                      profeți și regi ai lui Israel și Iuda, în special în 1 și
                      2 Împărați. Ar putea fi foarte util să te uiți la domnia
                      unui anumit rege și să îți faci o idee despre problemele
                      cu care se confruntă Israel și Iuda pentru a înțelege
                      obiectivele pe care le urmăresc profeții în cărțile
                      profetice. Nu uita că primele împliniri ale profețiilor se
                      găsesc aproape întotdeauna în istoria lui Israel și a lui
                      Iuda.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Epistolele
                    </h4>
                    <p>
                      Cea mai bună sursă pentru contextul istoric al unei
                      epistole este, în general, epistola însăși. Cercetează
                      începutul și sfârșitul scrisorii pentru a găsi indicii
                      despre situația istorică particulară. Caută în întreaga
                      epistolă referiri la persoane sau locuri menționate cu
                      numele. Îndeosebi în epistolele pauline uită-te la
                      trăsăturile distinctive ale oponenților sau ale
                      învățăturilor false. Întreabă-te: „Ce lucruri se petrec în
                      orașul/regiunea destinatarilor?" De asemenea, cercetează
                      pasajele conexe. De exemplu, dacă studiezi 2 Corinteni,
                      probabil 1 Corinteni îți vor oferi câteva indicii utile.
                      Dacă parcurgi 2 Timotei, atunci este posibil ca deopotrivă
                      1 Timotei și Efeseni să te ajute. Și, în final, Faptele
                      Apostolilor este o resursă foarte folositoare. Caută
                      referințele corespunzătoare locurilor și persoanele
                      menționate în Faptele Apostolilor. Aceste detalii istorice
                      vor fi rareori cheia pentru a desluși un pasaj, dar
                      aproape întotdeauna vor contribui la așezarea situației
                      respective din epistolă în context.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Evangheliile/Faptele Apostolilor
                    </h4>
                    <p>
                      Evangheliile sunt puțin mai complicate deoarece știm
                      foarte puțin despre autori (nu uitați că, tehnic vorbind,
                      evangheliile sunt anonime, deși tradițiile paternității
                      lor sunt foarte vechi și probabil autentice) sau, mai
                      important, avem doar speculații cu privire la locul unde
                      au fost scrise și cui i-au fost adresate. De fapt, este
                      foarte probabil ca evangheliile să fi fost gândite spre a
                      fi distribuite la scară largă în întreaga zonă
                      mediteraneeană antică și, prin urmare, nu ar trebui legate
                      de situația particulară a unei biserici anumite dintr-un
                      loc anumit. Ca să o spunem clar, această sugestie se
                      referă în întregime la contextul istoric al evangheliilor.
                      Aspectele referitoare la domeniul studiilor biblice numit
                      Isus cel istoric, precum și cele referitoare la contextul
                      cultural al zonei mediteraneene antice sunt încă foarte
                      relevante și ar trebui reconstruite din însuși textul
                      evangheliilor.
                    </p>
                  </div>
                </div>

                <p>
                  În ceea ce privește <strong>contextul cultural</strong>,
                  trebuie să luăm în considerare cadrul din viața de zi cu zi a
                  oamenilor/personajelor din carte și modul în care aceasta va
                  fi fost înțeleasă de publicul inițial. Acesta se deosebește de
                  contextul istoric prin faptul că nu se referă la un anumit
                  public dintr-un anumit loc și timp, ci la detaliile vieții pe
                  care oamenii/personajele din text le aveau în comun. Astfel,
                  de exemplu, citirea unei pilde agrare din evanghelii ar putea
                  necesita înțelegerea anumitor realități agricole sau economice
                  care i-ar fi caracterizat atât pe oamenii din pildă (și din
                  pasaj), cât și pe primii destinatari ai evangheliei
                  respective. Sau, pentru a face legătura cu un exemplu
                  anterior, pentru a înțelege contextul cultural din cartea Rut
                  ai putea să te uiți în Judecători, deoarece situația în care
                  se află personajele din carte este „pe vremea judecătorilor."
                  Aceasta înseamnă că, dacă vei parcurge cartea Judecători, vei
                  afla cum era viața atunci când s-a derulat istorisirea vieții
                  lui Rut. Orice lucru care poate fi extras din textul
                  propriu-zis al Bibliei este, desigur, de încredere. Orice
                  informație care necesită cunoștințe extra-biblice ar trebui
                  tratată cu o anumită doză de scepticism.
                </p>
                <p>
                  Pentru <strong>contextul biblic</strong>, trebuie să te uiți
                  foarte atent în pasaj. Oare autorul face referire la un
                  eveniment istoric anterior surprins în Biblie? Cu alte
                  cuvinte, citează sau face aluzie autorul la un pasaj scris
                  anterior? Reține că acest lucru face parte din exegeză, deci
                  ne întrebăm ce corelări ar fi putut aștepta autorul în mod
                  rezonabil ca să fie făcute de primii săi destinatari. Nu
                  căutăm conexiuni teologice (e.g., autorul menționează harul,
                  așa că haideți să ne uităm la alte trei pasaje care vorbesc
                  despre har). Acest demers face parte din reflecția teologică
                  și va fi inclus la întrebarea 4. Aici, căutăm referirile pe
                  care le face autorul la alte părți din Biblie (fie prin citare
                  directă, fie printr-o aluzie mai generală). Întoarce-te la ele
                  și citește-le. Și, nu uita care este cea mai importantă
                  întrebare: <em>De ce?</em> De ce a ales autorul să facă
                  această legătură biblică? Ce anume din acel eveniment sau
                  istorisire, ori din contextul acelui pasaj a captat atenția
                  autorului? Care este scopul autorului încât face o astfel de
                  conexiune?
                </p>
              </div>
            </section>

            {/* 3. Ideea centrala a autorului */}
            <section className="scroll-mt-24" id="ideea-autorului">
              <h2 className="section-title">3. Ideea centrală a autorului</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Care este ideea centrală pe care o argumentează autorul
                  înaintea ascultătorilor săi? (într-o singură propoziție
                  scurtă)
                </p>
                <p>
                  Ideea principală a autorului este un mod de a vorbi despre
                  scopul unui pasaj în ansamblu. Aceasta poate fi descriptivă
                  sau prescriptivă. Nu este o simplă declarație rezumativă. Ci,
                  mai degrabă, este ideea de care autorul încearcă să își
                  convingă publicul. Atunci când lucrezi la articularea ideii
                  centrale a autorului, te rugăm să ții cont că ea 1) trebuie să
                  fie suficient de specifică pasajului, astfel încât să provină
                  în mod clar din pasajul respectiv (și nu din oricare alt
                  pasaj), 2) se adresează primului public (vom ajunge mai târziu
                  la cititorii moderni) și 3) trebuie să fie o singură
                  propoziție scurtă și clară, și să surprindă logica pasajului.
                  Scopul NU este să înghesui cât mai multe informații din pasaj
                  în enunțul tău sau să rezumi pasajul, ci mai degrabă să te
                  concentrezi cât mai clar posibil pe ideea centrală și pe
                  scopul principal. Adesea, ideea centrală a unui pasaj nu este
                  doar o simplă afirmație descriptivă. Mai degrabă, ar putea fi
                  formulată sub forma unui imperativ deoarece ideea centrală a
                  autorului este o chemare la acțiune. În orice caz, sperăm că
                  vei include cea mai bună încercare de a formula ideea centrală
                  ca o modalitate de a demonstra că înțelegi și poți articula
                  punctul central al pasajului și obiectivul sau aserțiunea
                  autorului în argumentarea acesteia.
                </p>
              </div>
            </section>

            {/* 4. Legatura cu Evanghelia */}
            <section className="scroll-mt-24" id="legatura">
              <h2 className="section-title">4. Legătura cu Evanghelia</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Care este legătura dintre acest pasaj și Evanghelia Domnului
                  Isus Cristos? Care parte a Evangheliei este avută în vedere?
                </p>
                <p>
                  Presupoziția de la temelia acestor două întrebări este ideea
                  că fiecare parte a Bibliei și fiecare pasaj din Scriptură au
                  legătură într-un fel sau altul cu Evanghelia lui Isus Cristos
                  (cf. Luca 24:13-49). Prima întrebare vizează felul în care
                  pasajul tău – sau chiar ce părți ale pasajului tău – sunt
                  legate de Evanghelie. Textul tău ar putea anticipa Evanghelia.
                  Ar putea fi o privire înapoi și o reflecție asupra
                  Evangheliei. Ceea ce este important aici este ca legătura să
                  fie legitimă și dictată de text. Vrem să evităm
                  subiectivismului alegoriei sau supra-spiritualizarea pasajelor
                  noastre. Pentru aceasta, ar fi bine să iei în considerare
                  câteva strategii:
                </p>

                <div className="space-y-3">
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Referirea explicită
                    </h4>
                    <p>
                      Aceasta este strategia cel mai ușor de observat, deoarece,
                      uneori, Evanghelia lui Isus Cristos este chiar în pasaj,
                      fiind afirmată direct. Acest lucru se întâmplă ocazional
                      în evanghelii, dar mai frecvent în epistole. Doar
                      asigură-te că tratezi Evanghelia așa cum a făcut-o
                      autorul.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Împlinirea profetică
                    </h4>
                    <p>
                      Uneori, cea mai bună legătură este făcută explicit, dar
                      făcând conexiunea cu o profeție sau cu împlinirea ei
                      găsită în altă parte în Biblie. În scrierile profetice, de
                      exemplu, sunt enunțate profeții mesianice care au atât o
                      împlinire istorică apropiată, cât și una finală în Isus.
                      Adesea, evangheliile, Faptele Apostolilor și epistolele
                      oferă o privire retrospectivă asupra unor astfel de
                      profeții. Atunci când găsești în pasajul tău o asemenea
                      conexiune, cumpănește ca să vezi dacă acesta este un mod
                      de a face legătura cu Evanghelia.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Traiectoria istorică
                    </h4>
                    <p>
                      Aceasta este una dintre strategiile cel mai greu de
                      folosit deoarece necesită o înțelegere destul de bună a
                      istoriei răscumpărării. Fiecare dintre pasajele noastre
                      descrie ceva ce are o valoare istorică răscumpărătoare pe
                      o linie temporală a întregii istorii, de la creație la
                      noua creație. În centrul acestei cronologii se află
                      moartea și învierea lui Isus. Ca atare, pasajul tău ar
                      putea include un fel de anticipare istorică, un indicator
                      din istorie apropiat de moartea și învierea lui Isus
                      (indicând înainte sau înapoi). Ai putea gândi în ere sau
                      epoci ale istoriei mântuirii și să te întrebi ce rol joacă
                      pasajul tău pe traiectoria istoriei care țintește crucea
                      și învierea.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Tipologia
                    </h4>
                    <p>
                      O analogie este un set larg de comparații (atât de
                      similaritate, cât și de contrast) între două concepte.
                      Tipologia este un fel de analogie folosit în literatura
                      biblică. Prin ea se pot compara oameni, obiecte,
                      instituții sau alte lucruri. De reținut că există o
                      progresie în comparația făcută, comparație în care
                      importanța persoanei, obiectului sau evenimentului final
                      sporește într-un anumit fel. Cu alte cuvinte, un element
                      tipologic este un tipar sau o umbră care, într-un fel,
                      indică spre o expresie finală a acestuia. Și, în scopul
                      conectării la Evanghelie, elementul tipologic este o umbră
                      proiectată de o anumită fațetă a Evangheliei. Moise a fost
                      un profet important care L-a anticipat pe Cristos,
                      Profetul suprem. David a fost un rege bun care L-a anunțat
                      pe Domnul Isus, Regele suprem. Este demn de remarcat că,
                      în analogii și tipologii, întotdeauna sunt prezente
                      similarități și discrepanțe.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Teme biblice teologice
                    </h4>
                    <p>
                      Temele sunt idei mai ample care, la rândul lor, se
                      dezvoltă progresiv de-a lungul Bibliei. În acest fel, ele
                      pot fi considerate ca urmând strategia traiectoriei
                      istorice, precum și îmbinând seturi mari de conexiuni
                      tipologice multiple. Printre temele majore se numără
                      împărăția, exodul și exilul, preotul și Templul, precum și
                      legământul. Există și altele. Cercetează să vezi dacă
                      vreuna dintre aceste teme este prezentă în pasajul tău și,
                      drept urmare, gândește-te la modul în care această temă te
                      pune din nou în legătură cu Evanghelia lui Isus Cristos.
                    </p>
                  </div>
                  <div className="ghid-box">
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      Învățătura bazată pe Evanghelie
                    </h4>
                    <p>
                      Uneori, pasajul tău gravitează în jurul unei acțiuni
                      etice. Poate fi greu de identificat Evanghelia harului în
                      pasaje care se pretează la un mesaj care reclamă
                      ascultare. Într-o astfel de situație este important să
                      înțelegi ordinea corectă a ideilor. Atunci când suntem
                      mântuiți, ni se face parte de dreptatea lui Cristos
                      (justificarea), o dreptate care depinde de credință (Fil.
                      3:8-9; cf. 2 Cor. 5:21). Faptele neprihănirii nu ne
                      mântuiesc, dar ele sunt modul în care ni se poruncește să
                      trăim în credință pentru binele nostru (sfințire), după ce
                      am fost mântuiți. Atunci când întâlnim învățături sau
                      cerințe etice pe care Dumnezeu le face poporului Său,
                      trebuie să înțelegem aceste cerințe în lumina Evangheliei.
                      Așadar, ai putea căuta în context idei teologice
                      fundamentale care să ofere fundamentul Evangheliei pentru
                      etică. Ai putea să te gândești că etica ridică o întrebare
                      sau prezintă o problemă la care Evanghelia răspunde sau pe
                      care o rezolvă.
                    </p>
                  </div>
                </div>

                <p>
                  În general, cel mai bun mod de a demonstra legitimitatea unei
                  conexiuni cu Evanghelia, în special în Vechiul Testament, este
                  să te asiguri că ai un pasaj (complementar cu al tău) care
                  conduce la această conexiune. Altfel spus, asigură-te că
                  prezinți legături ale Evangheliei din Biblie, nu doar concepte
                  teologice abstracte legate vag între ele.
                </p>
                <p>
                  Pe lângă evidențierea legăturilor, trebuie să meditezi și
                  asupra părții din Evanghelie care este vizată. Cu alte
                  cuvinte, de care aspect al Evangheliei se leagă pasajul tău?
                  Sau ce unghi al Evangheliei abordează textul tău? După cum
                  te-ai putea aștepta, Evanghelia este atât un concept
                  incredibil de simplu, cât și unul complex și multifațetat.
                  Desigur că{" "}
                  <strong>
                    miezul Evangheliei este moartea și învierea Domnului Isus
                  </strong>{" "}
                  ca ispășire substitutivă pentru păcatul uman, prin care se
                  oferă viața veșnică în relația cu Dumnezeu. Dar există și alte
                  unghiuri ale Evangheliei care ar putea fi relevante pentru
                  pasajul tău, inclusiv întruparea, înălțarea, a doua venire,
                  precum și viața, minunile și învățăturile lui Cristos. Există,
                  de asemenea, implicații ale Evangheliei, precum pocăința,
                  credința și ascultarea. Și mai există și rezultate ale
                  Evangheliei, cum ar fi iertarea păcatelor și viața veșnică.
                  Oricare dintre acestea ar putea fi să constituie cea mai
                  solidă și legitimă legătură textuală a pasajului tău cu
                  conceptul de Evanghelie.
                </p>
              </div>
            </section>

            {/* 5. Ideea centrala a predicii */}
            <section className="scroll-mt-24" id="ideea-predicii">
              <h2 className="section-title">5. Ideea centrală a predicii</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Care este ideea centrală pe care tu o vei argumenta înaintea
                  ascultătorilor tăi? (într-o singură propoziție scurtă)
                </p>
                <p>
                  Ideea centrală a predicii este afirmația fundamentală pe care
                  tu, vorbitorul de azi, vrei să-i convingi pe ascultătorii tăi
                  să o primească. În cadrul predicării expozitive și
                  învățăturii, în mod cert va fi strâns legată de ideea centrală
                  a autorului gândită pentru destinatarii săi și va lua în
                  considerare legătura cu Evanghelia. Ai putea să te gândești la
                  ea ca fiind cea mai elementară idee pe care vrei să-i convingi
                  pe ascultătorii tăi să o primească. Aceasta trebuie să fie
                  bine gândită și, probabil, formulată pe baza unor raționamente
                  (depinzând de premisele și argumentele pe care este construit
                  textul).
                </p>
              </div>
            </section>

            {/* 6. Aplicatii */}
            <section className="scroll-mt-24" id="aplicatii">
              <h2 className="section-title">6. Aplicații</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Ce aplicații vei face? Gândește-te la cei mântuiți și la cei
                  nemântuiți.
                </p>
                <p>
                  Aplicațiile (și implicațiile) vor fi, de asemenea, probabil
                  legate de ideea centrală a predicii tale. Ai putea avea mai
                  multe aplicații sau doar una. Ai putea să le enunți pe
                  parcursul predicii tale sau doar la sfârșit. Dar folosește-ți
                  munca de până la acest punct din fișa de lucru pentru a
                  extrage din text aplicațiile primare (și secundare) ale
                  textului și stabilește-ți felul în care le vei argumenta. În
                  plus, aceste aplicații ar trebui adaptate la categorii
                  specifice de ascultători: cei mântuiți și cei nemântuiți,
                  ținând astfel cont de raportarea pasajului tău la Evanghelie,
                  și nu doar de semnificația acestuia pentru primii destinatari.
                </p>
              </div>
            </section>

            {/* 7. Titlu si schita */}
            <section className="scroll-mt-24" id="titlu-schita">
              <h2 className="section-title">7. Titlu și schița predicii</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="ghid-prose space-y-5">
                <p className="ghid-q">
                  Care este titlul predicii tale și schița predicii tale?
                </p>
                <p>
                  Titlul unei predici este o frază scurtă și simplă prin care se
                  încearcă surprinderea ideii centrale a predicii. Este o
                  modalitate de a focaliza gândirea ascultătorilor asupra a ceea
                  ce trebuie să rețină în urma ascultării predicii. Astfel, el
                  ar trebui să fie mai succint și mai precis decât o simplă
                  afirmare a ideii tale centrale. De asemenea, ar trebui să fie
                  pătrunzător sau antrenant. Trebuie să capteze atenția
                  ascultătorilor și să le stârnească interesul. Ca atare,
                  probabil ar trebui formulat într-un limbaj actual și
                  accesibil. La urma urmei, este cea dintâi modalitate retorică
                  de a încerca să îți convingi ascultătorii.
                </p>
                <p>
                  Schița unei predici este numită uneori schiță homiletică. Este
                  pur și simplu un mod de organizare a predicii sau a mesajului
                  tău. Ea ar trebui să derive din munca pe care ai făcut-o
                  asupra pasajului și cel mai probabil va avea legătură cu
                  structura acestuia. După cum ideea centrală a predicii tale
                  este legată de ideea centrală a autorului, tot astfel modul în
                  care îți organizezi materialul pentru a-ți formula ideea
                  centrală (schița ta) ar trebui să aibă legătură cu modul în
                  care autorul și-a argumentat ideea sa (structura sa). Dar, ca
                  și în cazul ideii centrale a predicii tale, trebuie să ții
                  cont atât de ascultătorii tăi, cât și de legătura cu
                  Evanghelia.
                </p>
                <p>
                  În timp ce structurarea pasajului este o muncă de culise,
                  întocmirea schiței homiletice este determinată și pregătită
                  pentru a-ți ajuta ascultătorii să urmărească prezentarea
                  pasajului pentru ascultătorii din biserica ta. Chiar dacă unii
                  ar putea include informații detaliate într-o schiță
                  homiletică, schița ta homiletică pentru prezentarea de la
                  Seminarul de predicare expozitivă trebuie să cuprindă strict
                  schița – titlurile pe care le-ai putea pune diviziunilor
                  predicii tale.
                </p>
                <p>
                  Poate că te întrebi: „Chiar trebuie să scriu o schiță
                  homiletică?" Da, se așteaptă de la tine să scrii una. Cei care
                  slujesc îndeplinesc o mulțime de roluri didactice. Unii se
                  găsesc în contexte de predicare sau de învățare în care le-ar
                  fi utilă o schiță homiletică. Alți învățători conduc lucrări
                  ale bisericii locale, redactează programe de studiu,
                  instruiesc lideri laici, etc. Indiferent de modul în care te
                  îndeletnicești cu slujirea din Cuvânt, este incredibil de
                  important să gândești homiletic!
                </p>
                <div className="ghid-box text-sm text-ink-3 space-y-2 mt-6">
                  <p>
                    <sup>1</sup> O precizare: Pe parcursul acestui document
                    folosim termenul <em>predică</em> pentru a ne referi la
                    mesajul sau sesiunea de învățare de care se ocupă un
                    predicator sau un învățător. Suntem conștienți că, în unele
                    contexte, femeile se simt incomod să utilizeze această
                    terminologie pentru a se referi la ce se întâmplă când
                    femeile le învață pe alte femei. Te rog să ții cont că am
                    redactat acest document avându-i în vedere pe păstorii
                    bărbați, iar modul în care noi întrebuințăm termenul de mai
                    sus nu vrea să indice un anumit lucru despre sexe.
                    Declarația noastră doctrinară este clară în privința a ceea
                    ce noi credem despre chestiuni de sexe și lucrare.
                  </p>
                  <p>
                    <sup>2</sup> În versiunea pentru femei a fișei de lucru,
                    întrebarea sună astfel: „Care este titlul discursului tău și
                    schița discursului tău?"
                  </p>
                </div>
              </div>
            </section>

            {/* Alte intrebari frecvente */}
            <section className="scroll-mt-24" id="intrebari">
              <h2 className="section-title">Alte întrebări frecvente</h2>
              <div className="gold-divider mt-3 mb-6" />
              <div className="space-y-6">
                {[
                  {
                    q: "Care este diferența dintre ideea centrală a autorului și ideea mea centrală (și aplicațiile)?",
                    a: "Dacă ideea centrală a autorului (întrebarea 3) se adresează publicului inițial al autorului, atunci ideea ta centrală și aplicațiile tale (întrebarea 5) sunt modul nostru de a vorbi despre scopul pasajului pentru ascultătorii noștri de astăzi. Un alt mod de a înțelege diferența este că ideea centrală a autorului înseamnă aplicarea pasajului la ei/atunci, iar ideea ta centrală înseamnă aplicarea pasajului la noi/acum.",
                  },
                  {
                    q: "Cum ar trebui să arate fișa mea de lucru și de ce trebuie să aduc mai multe exemplare?",
                    a: "Fișa ta de lucru trebuie să includă răspunsurile tale la întrebările indicate. Pentru discuțiile din grupurile mici va fi cel mai util dacă vei aduce cu tine o fișă de o singură pagină (față-verso, de preferat scris la computer). Arta de-a fi clar și concis este neprețuită pentru predicatori și învățători! Furnizarea de copii pentru grupul tău mic va face interacțiunea mai fructuoasă întrucât ceilalți participanți îți vor putea evalua munca.",
                  },
                  {
                    q: "Cum ar trebui să fie prezentarea mea în fața grupului meu mic?",
                    a: "Prezentarea ta de cinci minute va consta în simpla expunere a conținutului de pe fișa ta de lucru, inclusiv schița predicii tale. Discuția care va urma se va baza pe această muncă în speranța că te vei alege cu unu-două lucruri asupra căror să mai lucrezi. Nu putem să intrăm și în a-ți evalua selectarea ilustrațiilor, tonul sau viteza cu care vorbești în public, etc. Dar, ne vom focaliza asupra abilităților necesare pentru a studia un pasaj cu scopul de a-l înțelege corect și a-l transmite eficient.",
                  },
                  {
                    q: "Sunt la prima participare. Cum ar trebui să mă pregătesc dacă nu am fost instruit în prealabil?",
                    a: "Ne bucurăm că participi la Seminarul de predicare expozitivă! Acest document și resursele de pe site-ul nostru sunt menite să te ajute să te pregătești. Ne-ar plăcea să avem cu toții ocazia să ascultăm instrucțiunile înainte de a ne face pregătirea de acasă, dar aceasta ar însemna să participăm la un astfel de seminar de trei zile fără să ne pregătim. Am constatat că nu putem crește cu adevărat în modul nostru de a-i învăța pe alții decât dacă ne aducem propria muncă și o lăsăm ca alții să o evalueze. Așadar, indiferent că participi pentru prima dată sau nu, toți îți vor spune că rămâne ceva de învățat de la fiecare seminar.",
                  },
                  {
                    q: "De ce nu puneți la dispoziție modelul unei fișe de lucru completată?",
                    a: `Am constatat că se întâmplă două lucruri atunci când oferim modele de a răspunde la cerințe. În primul rând, se limitează domeniul de aplicare a răspunsurilor pe care le dau participanții. Cu alte cuvinte, fără să vrea, participanții se mărginesc prea mult stând în limitele (tipurilor de) răspunsuri pe care le oferim în modelul unei fișe de lucru. Am prefera ca, în cadrul discuțiilor din grupul mic, să lucrăm la cultivarea discernământului necesar pentru a face o astfel de muncă, nu să limităm munca de la început. În al doilea rând, uneori, participanții privesc răspunsurile pe care le dăm pe modelul unei fișe de lucru ca fiind ceea ce noi considerăm „răspunsurile corecte." Sperăm că și noi continuăm să progresăm și că vom face o muncă și mai bună pe fișele noastre de lucru de fiecare dată când abordăm un pasaj. Cu siguranță nu dorim ca cineva să creadă că am ajuns desăvârșiți în prezentarea unui anumit pasaj. Și noi suntem încă în creștere!`,
                  },
                  {
                    q: "Ce se întâmplă dacă greșesc?",
                    a: "Aceasta este ultima întrebare inclusă aici, dar adesea este prima la care se gândesc toți. Este în regulă să fii emoționat. Cu toții ne facem griji cu privire la a mânui bine Cuvântul lui Dumnezeu. În calitate de creștini, recunoaștem că procesul de învățare este continuu. Întotdeauna putem fi scoși din zona de confort în modalități noi. O parte din speranța care însoțește sesiunile de instruire interactivă și aceste discuții în grupuri mici este că și instructorii și conducătorii grupurilor mici învață, la rândul lor, lucruri noi. Conducătorii grupurilor mici cultivă un mediu colegial în care fiecare va fi încurajat și ajutat să crească. Cei mai mulți dintre noi nu suntem obișnuiți cu a ne fi evaluată munca de alții, dar cu toții vom descoperi că este ceva neprețuit în a ne ajuta să creștem ca predicatori și învățători. Așadar, bucură-te de acest seminar!",
                  },
                ].map((faq) => (
                  <div
                    key={faq.q}
                    className="ghid-box"
                  >
                    <h4 className="font-body text-[17px] font-semibold text-foreground mb-1">
                      {faq.q}
                    </h4>
                    <p className="text-[17px] leading-relaxed text-ink-2">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Back to top */}
            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="arrow-link"
              >
                <ArrowUp size={16} /> Înapoi la început
              </button>
            </div>

            <FeaturePlugs
              heading="Continuă pregătirea"
              subtext="Completează fișa online sau verifică următoarele ateliere."
              plugs={[
                {
                  title: "Fișa interactivă",
                  description: "",
                  to: "https://fisa.predicare-expozitiva.ro",
                  icon: FileText,
                },
                {
                  title: "Vezi evenimente",
                  description: "",
                  to: "/evenimente",
                  icon: Calendar,
                  variant: "outline",
                },
              ]}
            />
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default GhidPage;
