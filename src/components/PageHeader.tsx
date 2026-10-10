import { ReactNode } from "react";

interface PageHeaderProps {
  kicker?: string;
  title: string;
  /** Paragraf introductiv, în dreapta titlului pe desktop. */
  intro?: ReactNode;
  children?: ReactNode;
}

/*
 * Antet de pagină tipografic, pe bandă albastru royal.
 * Înlocuiește fostul HeroBanner cu fotografie stock.
 */
const PageHeader = ({ kicker, title, intro, children }: PageHeaderProps) => (
  <section className="bg-royal text-white">
    <div className="container-site py-14 md:py-16">
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-8 md:items-end">
        <div className={`${intro ? "md:col-span-7" : "md:col-span-10"} flex flex-col gap-4`}>
          {kicker && <p className="kicker text-royal-light">{kicker}</p>}
          <h1 className="font-display text-[40px] md:text-[56px] leading-[1.05] font-medium tracking-[-0.02em] text-white text-balance">
            {title}
          </h1>
          <span className="copper-rule bg-copper-light" />
        </div>
        {intro && (
          <p className="md:col-start-8 md:col-span-5 text-lg leading-relaxed text-royal-pale">
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  </section>
);

export default PageHeader;
