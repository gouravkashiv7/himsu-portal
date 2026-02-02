"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster, toast } from "react-hot-toast";
import { useTheme } from "next-themes";

const InitialThemeToast = () => {
  const { theme, resolvedTheme } = useTheme();
  const hasRun = React.useRef(false);

  React.useEffect(() => {
    if (!hasRun.current) {
      // slight delay to ensure hydration matches
      setTimeout(() => {
        const current =
          theme === "system" ? `System (${resolvedTheme})` : theme;
        toast.success(`Theme Selected: ${current}`, {
          id: "initial-theme-toast",
          icon: "🎨",
        });
      }, 1000);
      hasRun.current = true;
    }
  }, [theme, resolvedTheme]);

  return null;
};

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a client needed for React Query (if we use it now or later)
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
        themes={["light", "dark", "brand"]}
      >
        {children}
        <InitialThemeToast />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!bg-background !text-foreground !border !border-border !shadow-lg",
            duration: 3000,
          }}
        />
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
