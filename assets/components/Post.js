import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Post = (props) => {
  const {
    id,
    user_id,
    username,
    hideButtons,
    title,
    created_at,
    content,
    image,
    reload,
  } = props;
  let dateCropped = created_at?.date?.slice(0, 16);
  const [isSaving, setIsSaving] = useState(false);
  const [contentUpd, setContentUpd] = useState('');

  const handleUpdate = (e) => {
    setIsSaving(true);
    axios
      .patch(`/api/account/${id}`, {
        title: title,
        content: contentUpd,
      })
      .then((res) => {
        console.log('Update success: ', res.data);
        Swal.fire({
          icon: 'success',
          title: 'Post updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
        reload();
      })
      .catch((err) => {
        console.log('Update axios error: ', err);
        Swal.fire({
          icon: 'error',
          title: 'An error occured',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSaving(false);
      });
  };

  const handleDelete = () => {
    //Sweet alert warning message before delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, please delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/account/${id}`)
          .then((res) => {
            console.log('Delete response: ', res.data);
            Swal.fire({
              icon: 'success',
              title: 'Post deleted successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            reload();
          })
          .catch((err) => {
            console.log('Delete axios error: ', err);
            Swal.fire({
              icon: 'error',
              title: 'An error occured',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <div>
      <form
        // Hide a post if it's emoty.
        //Empty post is returned as a response to empty fetch all posts result and carries a user_id
        className={`p-3 mx-auto bg-white rounded card ${
          id == undefined ? 'hidden' : ''
        }`}
      >
        <div className="author p-3">{username}</div>
        <img src={image} className="p-3 card-img-top" />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <h4 name="timestamp">{dateCropped}</h4>
          <textarea
            // Text area is read only on homepage
            readOnly={hideButtons ? 'readOnly' : ''}
            className={`form-control-plaintext card-text ${
              hideButtons ? 'noSelection' : ''
            }`}
            name="content"
            defaultValue={content}
            onChange={(e) => {
              setContentUpd(e.target.value);
            }}
          ></textarea>
          {/* Buttons are hidden on homepage */}
          {hideButtons ? (
            ''
          ) : (
            <div>
              <input
                disabled={isSaving}
                type="button"
                value="Update"
                onClick={handleUpdate}
                className="btn btn-dark"
              ></input>
              <input
                type="button"
                value="Delete"
                onClick={handleDelete}
                className="btn btn-outline-dark"
              ></input>
              <input
                type="reset"
                value="Cancel"
                className="btn btn-outline-dark"
              ></input>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default Post;
