import { defineField, defineType } from "sanity";
import { MessageCircle } from "lucide-react";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: MessageCircle,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
      validation: (rule) => [rule.required(), rule.email()],
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    }),
  ],
  preview: {
    select: {
      name: "name",
      date: "_createdAt",
      comment: "comment",
    },
    prepare(selection) {
      const { comment, name, date } = selection;
      return {
        title: `${new Date(date).toLocaleDateString()} - ${name}`,
        subtitle: comment.substring(0, 30),
      };
    },
  },
});
