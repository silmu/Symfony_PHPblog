import React from 'react';
import Post from '../components/Post';

const Account = () => {
  return (
    <div>
      <h1 id="welcome">Welcome back!</h1>
      <form id="newpost" method="post" className="post">
        <label htmlFor="title"></label>
        <input id="title" type="text" name="title" placeholder="Title"></input>
        <textarea className="post-content" name="content"></textarea>
        <div>
          <input
            type="submit"
            value="Add"
            name="addpost"
            className="btn-primary"
          ></input>
          <input
            type="button"
            value="Cancel"
            className="btn-second"
            id="canceladd"
          ></input>
          <label htmlFor="file-upload"></label>
          <input type="file" />
        </div>
      </form>
      <Post />
    </div>
  );
};
export default Account;
