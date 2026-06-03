import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";
import type { AppRouter } from "./mockRouter";
import type { ReactNode } from "react";
import { mockProducts, mockPosts } from "../mockData";

export const trpc = createTRPCReact<AppRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: "/api/trpc",
      transformer: superjson,
      async fetch(url, options) {
        const urlStr = typeof url === "string" ? url : (url as any).url || "";
        const pathname = urlStr.split("?")[0] || "";
        const path = pathname.replace(/^\/api\/trpc\/?/, "");

        let input: any = undefined;
        if (options?.method === "POST" && options?.body) {
          try {
            const rawInput = JSON.parse(options.body as string);
            input = rawInput.json !== undefined ? rawInput.json : rawInput;
          } catch (e) {
            console.error("Error parsing POST body:", e);
          }
        } else {
          const queryIndex = urlStr.indexOf("?");
          if (queryIndex !== -1) {
            const searchParams = new URLSearchParams(urlStr.slice(queryIndex));
            const inputParam = searchParams.get("input");
            if (inputParam) {
              try {
                const rawInput = JSON.parse(inputParam);
                input = rawInput.json !== undefined ? rawInput.json : rawInput;
              } catch (e) {
                console.error("Error parsing GET input:", e);
              }
            }
          }
        }

        let result: any = null;

        if (path === "product.list") {
          const { featured, category, search, sort } = input || {};
          let list = [...mockProducts];
          if (featured) {
            list = list.filter((p) => p.featured);
          }
          if (category) {
            list = list.filter((p) => p.category === category);
          }
          if (search) {
            const s = search.toLowerCase();
            list = list.filter(
              (p) =>
                p.name.toLowerCase().includes(s) ||
                p.description.toLowerCase().includes(s)
            );
          }
          if (sort === "price_asc") {
            list.sort((a, b) => a.price - b.price);
          } else if (sort === "price_desc") {
            list.sort((a, b) => b.price - a.price);
          } else if (sort === "rating") {
            list.sort((a, b) => b.rating - a.rating);
          } else {
            list.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          result = list;
        } else if (path === "product.bySlug") {
          const { slug } = input || {};
          result = mockProducts.find((p) => p.slug === slug) || null;
        } else if (path === "blog.list") {
          let category: string | undefined = undefined;
          if (typeof input === "string") {
            category = input;
          } else if (input && typeof input === "object") {
            category = input.category;
          }
          let list = [...mockPosts];
          if (category) {
            list = list.filter((p) => p.category === category);
          }
          result = list;
        } else if (path === "blog.bySlug") {
          const { slug } = input || {};
          result = mockPosts.find((p) => p.slug === slug) || null;
        } else if (path === "message.create") {
          result = { success: true };
        } else if (path === "order.create") {
          const orderNumber = "MC-" + Math.floor(100000 + Math.random() * 900000);
          result = { success: true, orderNumber };
        }

        const serialized = superjson.serialize(result);
        const responseBody = {
          result: {
            data: serialized,
          },
        };

        return new Response(JSON.stringify(responseBody), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    }),
  ],
});

export function TRPCProvider({ children }: { children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
