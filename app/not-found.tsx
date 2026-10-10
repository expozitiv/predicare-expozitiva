import Link from "next/link";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <section className="container-site py-24 md:py-32">
        <div className="max-w-xl flex flex-col gap-5">
          <p className="kicker text-copper">Eroare 404</p>
          <h1 className="font-display text-[40px] md:text-[56px] leading-[1.05] font-medium tracking-[-0.02em]">
            Pagina nu există
          </h1>
          <span className="copper-rule" />
          <p className="text-lg leading-relaxed text-ink-2">
            Adresa pe care ai deschis-o nu duce nicăieri. Poate a fost mutată sau scrisă greșit.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/">Înapoi acasă</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/evenimente">Vezi evenimentele</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
