"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type Inputs = {
  name: string;
  email: string;
  comment: string;
};

interface Props {
  postId: string;
}

function AddComment({ postId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { name, email, comment } = data;
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ name, email, comment, postId }),
    });
    console.log(response);
    if (!response.ok) {
      console.log("Failed to add comment");
      return;
    }
    reset();
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="addcomment">
        <AccordionTrigger>
          <p className="text-xl font-bold">Leave Comment</p>
        </AccordionTrigger>
        <AccordionContent>
          <form
            className="flex flex-col gap-4 border shadow-sm px-8 py-6 rounded mb-10"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register("name", { required: true })}
              className="formCommentInput"
            />
            {errors.name && (
              <p className="formErrorMessage">Name is required.</p>
            )}

            <label htmlFor="email">
              Email <span className="text-xs">(will not be published)</span>
            </label>
            <input
              id="email"
              className="formCommentInput"
              {...register("email", {
                required: true,
                pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              })}
            />
            {errors.email && (
              <p className="formErrorMessage">Valid email is required.</p>
            )}

            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              className="formCommentInput"
              {...register("comment", { required: true, minLength: 10 })}
            />
            {errors.comment && (
              <p className="formErrorMessage">Minumum 10 characters.</p>
            )}
            <input
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Submitting..." : "Submit"}
              className={`cursor-pointer bg-purple-900 text-white rounded py-2 hover:bg-purple-700 ${isSubmitting && "opacity-50"}`}
            />
          </form>
        </AccordionContent>{" "}
      </AccordionItem>
    </Accordion>
  );
}

export default AddComment;
