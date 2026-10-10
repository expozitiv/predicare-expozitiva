'use client';

import Link from "next/link";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FeaturePlugs from "@/components/FeaturePlugs";
import { Calendar, Info } from "lucide-react";

const sections = [
  {
    num: "01",
    title: "Utile",
    items: [
      {
        title: "Ghid de pregătire",
        desc: "Pregătirea unei fișe de lucru pentru grupul tău mic poate fi provocatoare, mai ales dacă este primul tău atelier. Vrem să depui efort, însă nu dorim să te simți copleșit.",
        url: "/ghid",
        tag: "Citește",
      },
      {
        title: "Fișa interactivă",
        desc: "Completează online cei 7 pași ai fișei de lucru pentru predicarea expozitivă și generează PDF.",
        url: "https://fisa.predicare-expozitiva.ro",
        tag: "Extern ↗",
      },
    ],
  },
  {
    num: "02",
    title: "Cărți recomandate",
    items: [
      {
        title: "Predicarea Expozitivă · David Helm",
        desc: "Principii și practică în predicarea expozitivă. O resursă esențială.",
        url: "https://www.magnagratia.org/carti/096-expository-preaching-helm/",
        tag: "Carte ↗",
      },
      {
        title: "Predicarea convingătoare · Jeremy Meeks și David Helm",
        desc: "Urmarea volumului „Predicarea expozitivă”: cum construiești argumente convingătoare, simplifici mesajul și îl contextualizezi pentru ascultători.",
        url: "https://www.magnagratia.org/carti/491-persuasive-preaching-helm-meeksromanian",
        tag: "Carte ↗",
      },
      {
        title: "Seria „9Marks: Zidind Biserici Sănătoase”",
        desc: "Resurse biblice și practice pentru consolidarea bisericilor prin învățături esențiale despre sănătatea spirituală.",
        url: "https://www.magnagratia.org/serii/seria-9marks-zidind-biserici-sanatoase/",
        tag: "Serie ↗",
      },
    ],
  },
  {
    num: "03",
    title: "Podcasturi și site-uri",
    items: [
      {
        title: "Preacher's Talk",
        desc: "Discuții și interviuri despre meșteșugul predicării biblice.",
        url: "https://simeontrust.org/playlist/preachers-talk/",
        tag: "Podcast ↗",
      },
      {
        title: "The Simeon Trust",
        desc: "Echipare pentru predicarea expozitivă a Cuvântului lui Dumnezeu.",
        url: "https://simeontrust.org/",
        tag: "Site ↗",
      },
    ],
  },
];

const ResursePage = () => (
  <Layout>
    <PageHeader
      kicker="Resurse"
      title="Materiale pentru predicarea expozitivă"
      intro="Ghidul de pregătire, fișa interactivă, cărți și podcasturi recomandate de echipa atelierelor."
    />

    <section className="container-site py-16 md:py-20 flex flex-col gap-16">
      {sections.map((section) => (
        <div key={section.title} className="editorial-grid">
          <div className="col-head">
            <p className="num-label">{section.num} — {section.title}</p>
            <h2 className="section-title">{section.title}</h2>
            <span className="copper-rule" />
          </div>
          <div className="col-body">
            {section.items.map((item, i) => {
              const external = item.url.startsWith("http");
              const cls = `group list-row ${i === 0 ? "list-row-first" : ""} ${
                i === section.items.length - 1 ? "border-b border-rule" : ""
              }`;
              const inner = (
                <>
                  <span className="flex flex-col gap-1.5 min-w-0">
                    <span className="font-display text-[22px] font-medium leading-tight group-hover:text-royal transition-colors">
                      {item.title}
                    </span>
                    <span className="text-base leading-relaxed text-ink-3">{item.desc}</span>
                  </span>
                  <span className="kicker text-royal whitespace-nowrap">{item.tag}</span>
                </>
              );
              return external ? (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={item.url} href={item.url} className={cls}>{inner}</Link>
              );
            })}
          </div>
        </div>
      ))}

      <FeaturePlugs
        heading="Vrei să participi?"
        subtext="Verifică evenimentele viitoare sau află mai multe despre ateliere."
        plugs={[
          { title: "Vezi evenimente", description: "", to: "/evenimente", icon: Calendar },
          { title: "Despre ateliere", description: "", to: "/despre", icon: Info, variant: "outline" },
        ]}
      />
    </section>
  </Layout>
);

export default ResursePage;
