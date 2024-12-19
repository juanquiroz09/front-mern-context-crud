import { createContext, useContext, useEffect, useState } from "react";
import {
  getPostsRequest,
  deletePostRequest,
  createPostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  if (!context) throw new Error("Post Provider is missing");
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getPostsRequest();
        setPosts(res.data);
      } catch (error) {
        setError("Error fetching posts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      if (res.status === 204) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post);
      setPosts((prevPosts) => [...prevPosts, res.data]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error getting post:", error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      setPosts((prevPosts) =>
        prevPosts.map((item) => (item._id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        deletePost,
        createPost,
        getPost,
        updatePost,
        loading,
        error,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
