import React from "react";
import AppTemplate from "../ui/AppTemplate";

class S3 extends React.Component {
   render() {
      return (
         <AppTemplate>
            <h1>S3 Demo - User Profile</h1>
            <label for="username">Create a username</label>
            <input
               className="form-control form-control-sm mb-4"
               type="text"
               id="username"
            />
            {/* <label for="username">Upload your profile photo</label>
            <input
               className="form-control-file"
               type="file"
               id="photo-upload"
            /> */}

            <div class="custom-file">
               <input type="file" class="custom-file-input" id="customFile" />
               <label class="custom-file-label" for="customFile">
                  Choose file
               </label>
            </div>
         </AppTemplate>
      );
   }
}

export default S3;
