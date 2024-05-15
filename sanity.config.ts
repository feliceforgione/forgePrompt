/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin

    structureTool({
      structure: (S) =>
        S.list()
          .title("Base")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !["siteSettings"].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    table(),
  ],
});
