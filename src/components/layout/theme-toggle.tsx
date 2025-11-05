"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  variant?: "ghost" | "outline" | "secondary";
  className?: string;
};

export function ThemeToggle({ variant = "ghost", className }: ThemeToggleProps) {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      aria-label="Toggle theme"
      type="button"
      size="icon"
      variant={variant}
      className={cn("relative h-9 w-9", className)}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      <SunMedium
        className={cn(
          "size-5 transition-all",
          mounted ? "rotate-0 scale-100" : "-rotate-90 scale-0",
          currentTheme === "dark" && "-rotate-90 scale-0"
        )}
      />
      <MoonStar
        className={cn(
          "absolute size-5 transition-all",
          mounted ? "rotate-0 scale-100" : "rotate-90 scale-0",
          currentTheme !== "dark" && "rotate-90 scale-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
