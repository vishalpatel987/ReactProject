import React from "react";
import { usePosts } from "../context/PostContext";

export default function Card({ post, page, pageSize }) {
  const { removeAndFill } = usePosts();

  return (
    <div className="relative bg-white shadow-md rounded-2xl p-4 w-72">
      <button
        aria-label="remove"
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl leading-none"
        onClick={() => removeAndFill(post.id, page, pageSize)}
      >
        ×
      </button>

      <h2 className="font-bold text-lg mb-2">
        {post.title.slice(0, 40)}{post.title.length > 40 ? "…" : ""}
      </h2>
      <p className="text-sm text-gray-600 mb-3">
        {post.body.slice(0, 90)}{post.body.length > 90 ? "…" : ""}
      </p>
      <p className="text-xs text-gray-400">{new Date().toUTCString()}</p>
    </div>
  );
}



