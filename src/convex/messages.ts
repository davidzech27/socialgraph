import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").collect();
  },
});

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", { body: args.body });
    return messageId;
  },
});
