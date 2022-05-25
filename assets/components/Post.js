import React from 'react';

const Post = (props) => {
  const { id, user_id, title, created_at, content } = props;

  let date = created_at.date.slice(0, 16);
  return (
    <div>
      <form method="post" className="p-3 m-3 bg-white rounded">
        <input type="hidden" name="id"></input>
        <h3>{title}</h3>
        <h4 name="timestamp">{date}</h4>
        <textarea
          className="form-control-plaintext"
          name="content"
          defaultValue={content}
        ></textarea>
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
