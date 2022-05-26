import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Post = ({ id, user_id, title, created_at, content, reload }) => {
  let dateCropped = created_at.date.slice(0, 16);
  const [isSaving, setIsSaving] = useState(false);
  const [titleUpd, setTitleUpd] = useState(title);
  const [contentUpd, setContentUpd] = useState('');

  const handleUpdate = (e) => {
    setIsSaving(true);
    axios
      .patch(`/api/account/${id}`, {
        title: titleUpd,
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
    console.log('Delete clicked');
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
      <form method="post" className="p-3 m-3 bg-white rounded">
        <input type="hidden" name="id"></input>
        <h3>{title}</h3>
        <h4 name="timestamp">{dateCropped}</h4>
        <textarea
          className="form-control-plaintext"
          name="content"
          defaultValue={content}
          onChange={(e) => {
            setContentUpd(e.target.value);
          }}
        ></textarea>
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
      </form>
    </div>
  );
};
export default Post;
