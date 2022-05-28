import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import Swal from 'sweetalert2';
import axios from 'axios';

const Account = () => {
  const [posts, setPosts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [user_id, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('logged_in'));
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('logged_in'));
    if (sessionStorage.getItem('logged_in') == 'false') {
      navigate('/login');
      console.log('Account trying to redirect');
    }
    //Check if logged in
    console.log('Account: Logged in:', sessionStorage.getItem('logged_in'));
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('/api/account')
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log('Axios error: ', error.response.data);
      });
  };

  const handlePost = () => {
    console.log('Posting');
    setIsSaving(true);
    let formData = new FormData();
    setUserId(1);
    formData.append('user_id', user_id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageSrc);
    axios
      .post('/api/account', formData)
      .then((response) => {
        console.log('Post success: ', response);
        Swal.fire({
          icon: 'success',
          title: 'Post created successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        fetchPosts();
      })
      .catch((error) => {
        console.log('Axios error: ', error);
        Swal.fire({
          icon: 'error',
          title: 'An error occured',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  return (
    <div>
      <h1 className="text-center">Welcome back!</h1>
      <form id="newpost" className="p-3 mx-auto bg-white rounded card">
        <img
          src={
            imageSrc
              ? imageSrc
              : 'https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80'
          }
          className="p-3 card-img-top"
        />
        <div className="card-body">
          <label htmlFor="title"></label>
          <input
            id="title"
            type="text"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="form-control mb-3 card-title"
            required
          ></input>
          <textarea
            className="form-control mb-1 card-text"
            name="content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Share your thoughts here..."
            required
          ></textarea>
          {/*........ Image as a link ...........*/}
          <div>
            <label htmlFor="imageInput">Add a link to an image:</label>
            <input
              type="text"
              className="form-control p-2"
              name="imageInput"
              onChange={(e) => {
                setImageSrc(e.target.value);
              }}
            ></input>
          </div>
          {/*........ Buttons ...........*/}
          <div>
            <input
              type="submit"
              disabled={isSaving}
              onClick={handlePost}
              name="addpost"
              className="btn btn-dark"
              value="Add a new post"
            />
            <button
              type="reset"
              className="btn btn-outline-dark"
              id="canceladd"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {posts.map((post, key) => {
        return <Post {...post} key={key} reload={fetchPosts} />;
      })}
    </div>
  );
};
export default Account;
