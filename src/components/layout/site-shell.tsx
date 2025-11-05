import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { PropsWithChildren } from "react";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-background via-background to-muted/30">
        {children}
      </main>
      <Footer />
    </div>
  );
}
