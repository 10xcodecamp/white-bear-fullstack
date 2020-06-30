import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: "",
      };
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else return false;
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">Add an answer</p>

            <div className="card">
               <div className="card-body bg-secondary lead">
                  <textarea
                     rows="6"
                     autoFocus={true}
                     onChange={(e) => this.setAnswerText(e)}
                  ></textarea>
               </div>
            </div>

            <p className="float-right mt-2 mb-5 text-muted">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>

            <div className="clearfix"></div>

            <Link
               to="create-imagery"
               className={classnames(
                  "btn btn-outline-primary btn-lg ml-4 float-right",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
               id="save-card"
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
