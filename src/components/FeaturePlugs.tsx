import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

export interface FeaturePlug {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  /** "primary" pentru buton plin, "outline" pentru contur. Implicit: primul plin, restul contur. */
  variant?: "primary" | "outline";
}

interface FeaturePlugsProps {
  heading?: string;
  subtext?: string;
  plugs: FeaturePlug[];
}

const FeaturePlugs = ({ heading, subtext, plugs }: FeaturePlugsProps) => (
  <div className="mt-14 border-t-2 border-royal pt-8 grid gap-6 md:grid-cols-12 md:items-center">
    <div className="md:col-span-6 flex flex-col gap-2">
      {heading && <h3 className="section-subtitle">{heading}</h3>}
      {subtext && <p className="text-ink-2 text-[17px] leading-relaxed">{subtext}</p>}
    </div>
    <div className="md:col-start-8 md:col-span-5 flex flex-wrap gap-3 md:justify-end">
      {plugs.map((plug, i) => {
        const isPrimary = plug.variant ? plug.variant === "primary" : i === 0;
        return (
          <Button key={plug.to} asChild size="lg" variant={isPrimary ? "default" : "outline"}>
            {plug.to.startsWith("http") ? (
              <a href={plug.to} target="_blank" rel="noopener noreferrer">{plug.title}</a>
            ) : (
              <Link href={plug.to}>{plug.title}</Link>
            )}
          </Button>
        );
      })}
    </div>
  </div>
);

export default FeaturePlugs;
