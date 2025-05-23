import { defineType, defineField, defineArrayMember } from "sanity";
import {
  HighlightIcon,
  ThLargeIcon,
  BulbOutlineIcon,
  CodeIcon,
} from "@sanity/icons";

import youtubeEmbed from "./youtubeEmbed";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        {
          title: "CodeLine",
          value: "pre",
          component: (props) => <pre>{props.children}</pre>,
        },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Highlight",
            value: "highlight",
            icon: HighlightIcon,
            component: (props) => (
              <span className="highlightTextColor">{props.children}</span>
            ),
          },
          {
            title: "Alert",
            value: "alert",
            icon: BulbOutlineIcon,
            component: (props) => (
              <div className="alertBlock">{props.children}</div>
            ),
          },
          {
            title: "BackTicks",
            value: "backticks",
            icon: CodeIcon,
            component: (props) => (
              <span className="backtick">{props.children}</span>
            ),
          },
          //{ title: "Code", value: "code" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineArrayMember({
      name: "code",
      title: "Code",
      type: "code",
      options: {
        withFilename: true,
      },
    }),
    defineArrayMember({
      name: "table",
      type: "table",
      icon: ThLargeIcon,
    }),
    defineArrayMember({
      type: "youtubeEmbed",
      title: "YouTube Embed",
    }),
  ],
});
