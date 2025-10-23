import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    profilePhotoUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  conversations: defineTable({
    anonymousUserId: v.id("users"),
    knownUserId: v.id("users"),
  })
    .index("by_anonymous_user", ["anonymousUserId"])
    .index("by_known_user", ["knownUserId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    authorId: v.id("users"),
    body: v.string(),
  }).index("by_conversation", ["conversationId"]),
});
