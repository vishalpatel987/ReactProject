

import React,{ createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 5 sec loader + data fetch
  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // remove clicked card from current view and pull one from next page
  const removeAndFill = (id, page, pageSize) => {
    setPosts((prev) => {
      const arr = [...prev];
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize; // next page starts here
      const r = arr.findIndex((p) => p.id === id);
      if (r === -1) return arr;

      if (r >= startIndex && r < endIndex && endIndex < arr.length) {
        const [next] = arr.splice(endIndex, 1); // take 1st of next page
        arr.splice(r, 1);                       // remove clicked
        arr.splice(r, 0, next);                 // fill the hole
      } else {
        // last page or no item to pull
        arr.splice(r, 1);
      }
      return arr;
    });
  };

  return (
    <PostContext.Provider value={{ posts, loading, removeAndFill }}>
      {children}
    </PostContext.Provider>
  );
};
export const usePosts = () => useContext(PostContext);