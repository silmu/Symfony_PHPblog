import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const hideButtons = true;

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  const fetchPublicPosts = () => {
    axios
      .get(`/api`)
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        // console.log('Axios error: ', error);
      });
  };
  return (
    <>
      <h1 className="text-center">Home feed</h1>
      {posts.map((post, key) => {
        return (
          <Post
            {...post}
            key={key}
            reload={fetchPublicPosts}
            hideButtons={hideButtons}
          />
        );
      })}
    </>
  );
};
export default Homepage;
