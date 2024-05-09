import { shimmer, toBase64 } from "@/lib/image";
import { GetPostQueryResult } from "@root/sanity.types";
import { urlForImage } from "@root/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/app/components/icons";
interface Props {
  post: GetPostQueryResult;
}

const basePath = "/posts";

function PostListCard({ post }: Props) {
  if (!post) return null;
  const { _id, slug, mainImage, publishedAt, title, tags, excerpt } = post;
  return (
    <Link
      key={_id}
      href={`${basePath}/${slug}`}
      className="group text-sm sm:flex sm: items-start"
    >
      <div className="basis-1/4 grow aspect-w-1 w-full sm:h-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
        {mainImage ? (
          <Image
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(225, 280)
            )}`}
            src={urlForImage(mainImage!.asset!)}
            alt={post.mainImage?.alt || "Post image"}
            width={225}
            height={280}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full object-cover object-center">
            {Icons.defaultImagePlaceholder({})}{" "}
          </div>
        )}
      </div>
      <div className="basis-3/4 p-2 md:px-6 ">
        <h3 className="font-medium text-center sm:text-left">{title}</h3>
        <div className="mt-1  hidden sm:block">
          <p>{publishedAt?.slice(0, 10)}</p>
          <p className="mt-2">{excerpt}</p>
          <p className="mt-2 italix text-sm">
            {tags?.slice(0, 3).map((tag) => (
              <span key={tag._id} className="mr-1 ">
                #{tag.title}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostListCard;
