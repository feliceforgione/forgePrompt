import { IComment } from "@/app/hooks/getPosts";
import React from "react";

interface Props {
  comments: IComment[] | undefined;
}

function AllComments({ comments = [] }: Props) {
  return (
    <div className="mb-3">
      <h3 className="text-center border-b-2 py-2">All Comments</h3>
      {comments.length === 0 && <p>No comments yet</p>}
      {comments.map((comment) => (
        <div key={comment?._id} className="border-b py-2 border-gray-400/50">
          <p>
            <strong>{comment?.name}</strong>
            <span className="pl-2 text-sm text-gray-500">
              {new Date(comment?._createdAt).toLocaleString()}
            </span>
          </p>
          <p>{comment?.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default AllComments;
