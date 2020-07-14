import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";

class CreateAnswer extends React.Component {
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

   setCreatableCard() {
      console.log("UPDATE_CREATABLE_CARD");
      this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id: getUuid(),
            answer: "",
            imagery: "",
            userId: "",
            createdAt: Date.now(),
            nextAttemptAt: 0, //
            lastAttemptAt: Date.now(),
            totalSuccessfulAttempts: 0,
            level: 1,
         },
      });
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

            <button
               className={classnames(
                  "btn btn-outline-primary btn-lg ml-4 float-right",
                  {
                     disabled: this.checkHasInvalidCharCount(),
                  }
               )}
               onClick={() => {
                  this.setCreatableCard();
               }}
            >
               Next
            </button>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(CreateAnswer);
