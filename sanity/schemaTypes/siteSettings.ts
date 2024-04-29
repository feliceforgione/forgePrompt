import { defineField, defineType } from "sanity";
import { Settings, Cog } from "lucide-react";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Cog,
  fields: [
    {
      name: "title",
      title: "Site Title",
      description: "This field is the title of your blog",
      type: "string",
    },
    {
      name: "description",
      title: "Site Description",
      description: "Used for meta decription tag for SEO",
      type: "text",
    },
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      description:
        "Used for social medial previews when linkign to the index page",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
