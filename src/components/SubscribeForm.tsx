'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscribeFormProps {
  /** "inline": nume + email pe un rând (pagina principală). "stacked": pe pagina de abonare. */
  layout?: "inline" | "stacked";
  onSuccess?: () => void;
}

const SubscribeForm = ({ layout = "stacked", onSuccess }: SubscribeFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const email = formData.get("email") as string;
      const name = (formData.get("name") as string) || "";
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Eroare la abonare");
      }

      form.reset();
      toast({
        title: "Te-ai abonat cu succes!",
        description: "Vei primi noutăți despre atelierele noastre.",
      });
      onSuccess?.();
    } catch {
      toast({
        title: "Eroare",
        description: "Nu s-a putut finaliza abonarea. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inline = layout === "inline";

  return (
    <form
      onSubmit={handleSubmit}
      className={inline ? "flex flex-wrap gap-3 items-end" : "space-y-4"}
    >
      <div className={inline ? "flex-1 min-w-[160px] space-y-1.5" : "space-y-1.5"}>
        <Label htmlFor="sub-name">Nume</Label>
        <Input id="sub-name" name="name" placeholder="Numele tău" required autoComplete="name" />
      </div>
      <div className={inline ? "flex-1 min-w-[200px] space-y-1.5" : "space-y-1.5"}>
        <Label htmlFor="sub-email">Email</Label>
        <Input id="sub-email" name="email" type="email" placeholder="adresa@email.com" required autoComplete="email" />
      </div>
      <Button type="submit" disabled={loading} size={inline ? "default" : "lg"} className={inline ? "" : "w-full"}>
        {loading ? "Se procesează..." : (
          <>
            Abonează-mă <Mail className="ml-1" />
          </>
        )}
      </Button>
      {!inline && (
        <p className="text-xs text-center text-ink-3">Nu trimitem spam. Te poți dezabona oricând.</p>
      )}
    </form>
  );
};

export default SubscribeForm;
