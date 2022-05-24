import React from 'react';

const Post = () => {
  return (
    <div>
      <form method="post" className="p-3 m-3 bg-white rounded">
        <input type="hidden" name="id"></input>
        <h3>Title</h3>
        <h4 name="timestamp">Timestamp</h4>
        <textarea className="form-control-plaintext" name="content"></textarea>
        <div>
          <input
            type="submit"
            value="Update"
            name="updatepost"
            className="btn btn-dark"
          ></input>
          <input
            type="submit"
            value="Delete"
            name="deletepost"
            className="btn btn-outline-dark"
          ></input>
          <input
            type="submit"
            value="Cancel"
            className="btn btn-outline-dark"
          ></input>
        </div>
      </form>
    </div>
  );
};
export default Post;
