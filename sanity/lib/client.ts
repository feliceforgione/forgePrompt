import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn, apiKey } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: apiKey,
  perspective: process.env.NODE_ENV === "development" ? "raw" : "published",
});
