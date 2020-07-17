import React from "react";
import AppTemplate from "../ui/AppTemplate";

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

            <button className="btn btn-success float-right">
               Save your profile
            </button>
         </AppTemplate>
      );
   }
}

export default S3;
