import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import Swal from 'sweetalert2';
import axios from 'axios';

const Account = () => {
  const [posts, setPosts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [user_id, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageSrc, setImageSrc] = useState({});

  useEffect(() => {
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
      <form id="newpost" className="p-3 m-3 bg-white rounded">
        <label htmlFor="title"></label>
        <input
          id="title"
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title"
          className="form-control mb-3"
        ></input>
        <textarea
          className="form-control mb-1"
          name="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <div>
          <button
            disabled={isSaving}
            onClick={handlePost}
            name="addpost"
            className="btn btn-dark"
          >
            Add
          </button>
          <button className="btn btn-outline-dark" id="canceladd">
            Cancel
          </button>
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
                accept="image/png, image/jpeg"
                name="postImage"
                onChange={(e) => {
                  setImageSrc(URL.createObjectURL(e.target.files[0]));
                  console.log(URL.createObjectURL(e.target.files[0]));
                }}
                // hidden
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
      <img src={imageSrc} style={{ width: 100 }} />
      {posts.map((post, key) => {
        return <Post {...post} key={key} reload={fetchPosts} />;
      })}
    </div>
  );
};
export default Account;
