import { client } from "@root/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { name, email, comment, postId } = data;
  if (!name || !email || !comment || !postId) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const commentData = {
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
    };
    const newComment = await client.create(commentData);
    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}
