import TagsCloud from "../components/TagsCloud";
import { getTags } from "../hooks/getTags";

export const revalidate = 60; // nextjs will revalidate this page every 60 seconds

async function Page() {
  const tags = await getTags();

  return (
    <div className="h-[60svh] flex items-center justify-center">
      {tags.length === 0 ? (
        <span className="text-2xl font-bold capitalize"> No tags found</span>
      ) : (
        <TagsCloud tags={tags} />
      )}
    </div>
  );
}

export default Page;
