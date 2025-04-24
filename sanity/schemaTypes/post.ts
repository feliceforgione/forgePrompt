import { defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export const postSettings = defineType({
  name: "postSettings",
  title: "Post Settings",
  type: "object",
  fields: [
    defineField({
      name: "hideMainImage",
      title: "Hide Main Image",
      type: "boolean",
      description:
        "If enabled, the main image will not be displayed on the post page.",
    }),
    defineField({
      name: "hideTableOfContents",
      title: "Hide Table of Contents",
      type: "boolean",
      description:
        "If enabled, the table of contents will not be displayed on the post page.",
    }),
  ],
});

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required().error("Required"),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "postType",
      title: "Post Type",
      type: "string",
      options: {
        list: [
          { title: "Article", value: "article" },
          { title: "Tutorial", value: "tutorial" },
          { title: "Review", value: "review" },
        ],
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "date",
      options: {
        dateFormat: "MMM DD, YYYY",
      },
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) => Rule.max(300).error("Max 300 characters"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "settings",
      title: "Settings",
      type: "postSettings",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
