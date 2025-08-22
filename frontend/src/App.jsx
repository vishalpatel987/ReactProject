import React from "react";
import { useState } from "react";
import { usePosts } from "./context/PostContext";
import Loader from "./components/Loader";
import Card from "./components/Card";

export default function App() {
  const { posts, loading } = usePosts();
  const [page, setPage] = useState(1);
  const pageSize = 6;

  if (loading) return <Loader />;

  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const visible = posts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Wireframe</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {visible.map((post) => (
          <Card key={post.id} post={post} page={page} pageSize={pageSize} />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`px-3 py-2 rounded-lg ${
              n === page ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}