import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../components/Post';
import Swal from 'sweetalert2';
import axios from 'axios';

const Account = () => {
  const [username, setUsername] = useState(useParams().username);
  const [posts, setPosts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('logged_in'));
  const [publicPost, setPublicPost] = useState(0);
  const navigate = useNavigate();

  //Set post public or private on click
  const togglePublic = (e) => {
    e.target.checked ? setPublicPost(1) : setPublicPost(0);
  };

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('logged_in'));
    if (sessionStorage.getItem('logged_in') == 'false') {
      navigate('/login');
    }
    //Check if logged in
    // console.log('Account: Logged in:', sessionStorage.getItem('logged_in'));
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get(`/api/account/${username}`)
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log('Axios error: ', error.response.data);
      });
  };

  const handlePost = () => {
    setIsSaving(true);
    let formData = new FormData();

    formData.append('user_id', posts[0].user_id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageSrc);
    formData.append('public_post', publicPost);
    axios
      .post('/api/account', formData)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Post created successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        //Clear data
        setTitle('');
        setContent('');
        setImageSrc('');
        setPublicPost(0);
        //Rerender posts list
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
      <h1 className="text-center">Personal page</h1>
      <h2 className="text-center">Welcome back, {username}!</h2>
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
          <div className="form-check">
            <input
              type="checkbox"
              name="make_public"
              className="form-check-input"
              onClick={(e) => togglePublic(e)}
            />
            <label htmlFor="make_public" className="form-check-label">
              Make the post public
            </label>
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
              Reset
            </button>
          </div>
        </div>
      </form>
      {posts.map((post, key) => {
        return (
          <Post {...post} key={key} reload={fetchPosts} username={username} />
        );
      })}
    </div>
  );
};
export default Account;
