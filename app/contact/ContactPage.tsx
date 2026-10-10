'use client';

import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FeaturePlugs from "@/components/FeaturePlugs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, BookOpen, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const res = await fetch("https://formspree.io/f/xkoqybww", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Eroare la trimitere");
      setSubmitted(true);
      toast({
        title: "Mesaj trimis!",
        description: "Vă vom contacta în curând.",
      });
    } catch {
      toast({
        title: "Eroare",
        description: "Nu s-a putut trimite mesajul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHeader
        kicker="Contact"
        title="Scrie-ne"
        intro="Întrebări despre ateliere, înscrieri sau organizarea unui atelier în orașul tău. Răspundem de obicei în câteva zile."
      />

      <section className="container-site py-16 md:py-20">
        <div className="editorial-grid">
          <div className="col-head">
            <p className="num-label">Mesaj</p>
            <h2 className="section-title">Cum te putem ajuta?</h2>
            <span className="copper-rule" />
            <p className="text-[17px] leading-relaxed text-ink-2">
              Completează formularul. Mesajul ajunge direct la echipa de organizare.
            </p>
          </div>

          <div className="col-body max-w-xl">
            {submitted ? (
              <div className="flex flex-col gap-4 border-t-2 border-royal pt-6">
                <p className="kicker text-copper">Trimis</p>
                <h3 className="font-display text-[28px] font-medium leading-tight">Mulțumim!</h3>
                <p className="text-[17px] leading-relaxed text-ink-2">
                  Mesajul tău a fost trimis. Te vom contacta în curând.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="self-start">
                  Trimite alt mesaj
                </Button>
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nume *</Label>
                  <Input id="name" name="name" placeholder="Numele tău" required autoComplete="name" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="adresa@email.com" required autoComplete="email" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+40 ..." autoComplete="tel" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Mesajul tău *</Label>
                  <Textarea id="message" name="message" placeholder="Scrie mesajul tău aici..." rows={6} required />
                </div>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading ? "Se trimite..." : (
                    <>
                      Trimite mesajul <Send className="ml-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
