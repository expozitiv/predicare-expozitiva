'use client';

import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FeaturePlugs from "@/components/FeaturePlugs";
import SubscribeForm from "@/components/SubscribeForm";
import { BookOpen, Calendar } from "lucide-react";

const benefits = [
  {
    title: "Evenimente viitoare",
    desc: "Fii primul care află despre atelierele de predicare expozitivă din zona ta.",
  },
  {
    title: "Resurse noi",
    desc: "Primești notificări când publicăm ghiduri, articole sau materiale de studiu.",
  },
  {
    title: "Comunitate",
    desc: "Conectează-te cu alți predicatori pasionați de studiul Scripturii.",
  },
];

const AbonarePage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Layout>
      <PageHeader
        kicker="Abonare"
        title="Află de următorul atelier"
        intro="Trimitem un email de câteva ori pe an: înainte de fiecare atelier și când apar resurse noi. Fără spam, dezabonare oricând."
      />

      <section className="container-site py-16 md:py-20">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">Ce primești</p>
            <h2 className="section-title">Noutăți din ateliere</h2>
            <span className="copper-rule" />
            <ul className="flex flex-col">
              {benefits.map((b, i) => (
                <li key={b.title} className={`py-4 ${i === 0 ? "border-t-2 border-royal" : "border-t border-rule"}`}>
                  <p className="font-semibold text-[17px]">{b.title}</p>
                  <p className="text-[15px] leading-relaxed text-ink-3">{b.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-body max-w-md">
            {submitted ? (
              <div className="flex flex-col gap-4 border-t-2 border-royal pt-6">
                <p className="kicker text-copper">Abonat</p>
                <h3 className="font-display text-[28px] font-medium leading-tight">Mulțumim pentru abonare!</h3>
                <p className="text-[17px] leading-relaxed text-ink-2">
                  Vei primi pe email noutăți despre atelierele de predicare expozitivă, resurse utile și
                  evenimente viitoare.
                </p>
                <FeaturePlugs
                  heading="Între timp, explorează"
                  subtext="Descoperă resursele noastre sau vezi următoarele ateliere."
                  plugs={[
                    { title: "Vezi resursele", description: "", to: "/resurse", icon: BookOpen },
                    { title: "Vezi evenimente", description: "", to: "/evenimente", icon: Calendar, variant: "outline" },
                  ]}
                />
              </div>
            ) : (
              <SubscribeForm layout="stacked" onSuccess={() => setSubmitted(true)} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AbonarePage;
