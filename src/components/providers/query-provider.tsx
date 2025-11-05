"use client";

import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState, type PropsWithChildren } from "react";

type QueryProviderProps = PropsWithChildren<{
  devtools?: boolean;
}>;

export function QueryProvider({ children, devtools = true }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    const onFocus = (isFocused: boolean) => {
      focusManager.setFocused(isFocused);
    };
    const onVisibilityChange = () => {
      onFocus(!document.hidden);
    };
    window.addEventListener("visibilitychange", onVisibilityChange, false);
    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange, false);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
