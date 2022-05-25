import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import axios from 'axios';

const Account = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('/api/account')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log('Axios error: ', error);
      });
  };
  return (
    <div>
      <h1 className="text-center">Welcome back!</h1>
      <form id="newpost" method="post" className="p-3 m-3 bg-white rounded">
        <label htmlFor="title"></label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-3"
        ></input>
        <textarea className="form-control mb-1" name="content"></textarea>
        <div>
          <input
            type="submit"
            value="Add"
            name="addpost"
            className="btn btn-dark"
          ></input>
          <input
            type="button"
            value="Cancel"
            className="btn btn-outline-dark"
            id="canceladd"
          ></input>
          {/*......... File input ..........*/}
          <div className="input-group mb-3 border rounded">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                hidden
              ></input>
              <label
                className="custom-file-label p-2"
                htmlFor="inputGroupFile01"
              >
                Choose file
              </label>
            </div>
            {/*...................*/}
          </div>
        </div>
      </form>
      {posts.map((post, key) => {
        return <Post {...post} key={key} />;
      })}
    </div>
  );
};
export default Account;
