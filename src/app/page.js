"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Blog Posts</h1>
      {error ? (
        <p className="text-red-600 font-medium text-lg">{error}</p>
      ) : posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Home;
