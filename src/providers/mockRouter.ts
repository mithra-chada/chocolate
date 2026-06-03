import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  product: t.router({
    list: t.procedure
      .input(
        z.object({
          featured: z.boolean().optional(),
          category: z.string().optional(),
          search: z.string().optional(),
          sort: z.enum(["newest", "price_asc", "price_desc", "rating"]).optional(),
        }).optional()
      )
      .query(() => {
        return [] as any;
      }),
    bySlug: t.procedure
      .input(
        z.object({
          slug: z.string(),
        })
      )
      .query(() => {
        return null as any;
      }),
  }),
  blog: t.router({
    list: t.procedure
      .input(
        z.union([
          z.object({
            category: z.string().optional(),
          }),
          z.string()
        ]).optional()
      )
      .query(() => {
        return [] as any;
      }),
    bySlug: t.procedure
      .input(
        z.object({
          slug: z.string(),
        })
      )
      .query(() => {
        return null as any;
      }),
  }),
  message: t.router({
    create: t.procedure
      .input(
        z.object({
          name: z.string(),
          email: z.string(),
          phone: z.string().optional(),
          type: z.enum(["gift", "chef", "wholesale", "other"]),
          message: z.string(),
        })
      )
      .mutation(() => {
        return { success: true };
      }),
  }),
  order: t.router({
    create: t.procedure
      .input(
        z.object({
          sessionId: z.string(),
          customerName: z.string(),
          customerEmail: z.string(),
          customerPhone: z.string().optional(),
          shippingAddress: z.string(),
          shippingMethod: z.string(),
          items: z.array(
            z.object({
              productId: z.number(),
              quantity: z.number(),
              price: z.number(),
              productName: z.string(),
              variant: z.string().optional(),
            })
          ),
          subtotal: z.number(),
          shippingCost: z.number(),
          total: z.number(),
          giftWrap: z.boolean(),
          giftMessage: z.string().optional(),
        })
      )
      .mutation(() => {
        return { success: true, orderNumber: "" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
