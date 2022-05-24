import React from 'react';

const Post = () => {
  return (
    <div>
      <form method="post" className="post">
        <input type="hidden" name="id"></input>
        <h3>Title</h3>
        <h4 name="timestamp">Timestamp</h4>
        <textarea className="post-content" name="content"></textarea>
        <div>
          <input
            type="submit"
            value="Update"
            name="updatepost"
            className="btn-primary"
          ></input>
          <input
            type="submit"
            value="Delete"
            name="deletepost"
            className="btn-second"
          ></input>
          <input type="submit" value="Cancel" className="btn-second"></input>
        </div>
      </form>
    </div>
  );
};
export default Post;
