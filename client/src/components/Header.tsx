import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Moon, Sun, Lock, BookOpen } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <a className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5 cursor-pointer hover:bg-primary/20 transition-colors">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">FHE Protected</span>
            </a>
          </Link>
          <h1 className="text-lg font-bold hidden sm:block">Encrypted Intent Protocol</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/docs">
            <a className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Docs</span>
            </a>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
