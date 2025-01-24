import Link from "next/link";

const fetchPost = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
};

const PostDetails = async ({ params }) => {
  const { id } = params;
  const post = await fetchPost(id);

  return (
    <div className="container mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
        {post.title}
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.body}</p>
      <Link
        href="/"
        className="mt-4 inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 font-semibold rounded-lg text-sm text-center cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PostDetails;
