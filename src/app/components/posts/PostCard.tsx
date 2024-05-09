import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@root/sanity/lib/image";
import { shimmer, toBase64 } from "@/lib/image";
import { GetPostQueryResult } from "@root/sanity.types";

interface Props {
  post: GetPostQueryResult;
}

const basePath = "/posts";

function PostCard({ post }: Props) {
  if (!post) return null;
  const { _id, slug, mainImage, publishedAt, title } = post;
  return (
    <Link key={_id} href={`${basePath}/${slug}`} className="group text-sm">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75 dark:border-gray-800">
        <Image
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(450, 560)
          )}`}
          src={urlForImage(mainImage!.asset!)}
          alt={mainImage?.alt || "Post image"}
          width={450}
          height={560}
          className="h-72 w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-2">{publishedAt?.slice(0, 10)}</p>
    </Link>
  );
}

export default PostCard;
