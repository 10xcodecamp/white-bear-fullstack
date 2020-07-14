import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         imageryText: "",
      };
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }
   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">
               Add memorable imagery
            </p>

            <div className="card">
               <div className="card-body bg-primary lead">
                  <textarea
                     rows="6"
                     autoFocus={true}
                     onChange={(e) => this.setImageryText(e)}
                  ></textarea>
               </div>
            </div>

            <div className="card">
               <div className="card-body bg-secondary lead">
                  The European languages are members of the same family. Their
                  separate existence is a myth. For science, music, sport, etc,
                  Europe uses the same vocabulary. The languages only differ in
                  their grammar,.
               </div>
            </div>

            <p className="float-right mt-2 mb-5 text-muted">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.imageryText.length}/{MAX_CARD_CHARS}
               </span>
            </p>

            <div className="clearfix"></div>

            <Link to="create-answer" className="btn btn-link">
               Back to answer
            </Link>

            <button
               className={classnames(
                  "btn btn-primary btn-lg ml-4 float-right",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
            >
               <img
                  src={saveIcon}
                  width="20px"
                  style={{ marginBottom: "2px", marginRight: "8px" }}
                  alt=""
               />
               Save
            </button>
         </AppTemplate>
      );
   }
}
