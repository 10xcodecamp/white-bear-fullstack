import React from "react";
import AppTemplate from "../ui/AppTemplate";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS, defaultLevel } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";
import getNextAttemptAt from "../../utils/getNextAttemptAt";

class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: this.props.creatableCard.answer || "",
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
      if (!this.checkHasInvalidCharCount()) {
         console.log("UPDATE_CREATABLE_CARD");
         const currentTime = Date.now();
         this.props.dispatch({
            type: actions.UPDATE_CREATABLE_CARD,
            payload: {
               // the card itself
               id: getUuid(),
               answer: this.state.answerText,
               imagery: "",
               userId: this.props.currentUser.id,
               createdAt: currentTime,
               nextAttemptAt: getNextAttemptAt(defaultLevel, Date.now()),
               lastAttemptAt: currentTime,
               totalSuccessfulAttempts: 0,
               level: 1,
            },
         });
         this.props.history.push("/create-imagery");
      }
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
                     defaultValue={this.state.answerText}
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
   return {
      currentUser: state.currentUser,
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateAnswer);
