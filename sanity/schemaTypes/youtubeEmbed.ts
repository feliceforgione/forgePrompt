import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

export default defineType({
  name: "youtubeEmbed",
  title: "YouTube Embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      title: "YouTube Video URL",
      type: "url",
      description:
        "Paste the full YouTube video URL here (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),
  ],
  // Optional: Add a preview so it looks better in the studio
  preview: {
    select: {
      url: "url",
    },
    prepare(selection) {
      const { url } = selection;
      // Basic attempt to get the video ID for the title
      const videoIdMatch = url
        ? url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
          )
        : null;
      const videoId = videoIdMatch ? videoIdMatch[1] : "Invalid URL";
      return {
        title:
          videoId !== "Invalid URL"
            ? `YouTube Embed: ${videoId}`
            : "YouTube Embed (Invalid URL)",
        subtitle: url,
        // You could fetch a thumbnail here in a real-world scenario, but it's more complex
      };
    },
  },
});
