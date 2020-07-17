import React from "react";
import AppTemplate from "../ui/AppTemplate";
import axios from "axios";

class S3 extends React.Component {
   constructor() {
      super();
      this.state = {
         photoUploadText: "Choose a file",
      };
   }

   setPhotoUploadText(e) {
      const text = e.target.value;
      this.setState({ photoUploadText: text });
   }

   saveProfile() {
      const user = {};
      axios
         .post("/api/v1/test-users", user)
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   render() {
      return (
         <AppTemplate>
            <h3 className="mt-6">S3 Demo</h3>
            <h2>Update user profile</h2>
            <label htmlFor="username">Create a username</label>
            <input
               className="form-control form-control-sm mb-6"
               type="text"
               id="username"
            />

            <div className="custom-file mb-6">
               <input
                  type="file"
                  className="custom-file-input"
                  id="photo-upload"
                  onChange={(e) => {
                     this.setPhotoUploadText(e);
                  }}
               />
               <label className="custom-file-label" htmlFor="photo-upload">
                  {this.state.photoUploadText}
               </label>
            </div>

            <button
               className="btn btn-success float-right"
               onClick={() => {
                  this.saveProfile();
               }}
            >
               Save your profile
            </button>
         </AppTemplate>
      );
   }
}

export default S3;
