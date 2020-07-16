import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class CreateImagery extends React.Component {
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

   async updateCreatableCard() {
      if (!this.checkHasInvalidCharCount()) {
         console.log("UPDATING CREATABLE CARD");
         const creatableCard = { ...this.props.creatableCard };
         creatableCard.imagery = this.state.imageryText;

         await this.props.dispatch({
            type: actions.UPDATE_CREATABLE_CARD,
            payload: creatableCard,
         });
         // save to the database (make an API call)
         axios
            .post("/api/v1/memory-cards", this.props.creatableCard)
            .then(() => {
               console.log("Memory Card created");
               // TODO: Display success overlay
               // Clear creatableCard from redux
               this.props.dispatch({
                  type: actions.UPDATE_CREATABLE_CARD,
                  payload: {},
               });
               // route to "/create-answer"
               this.props.history.push("/create-answer");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide after 5 seconds
            });
      }
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
                  {this.props.creatableCard.answer}
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
               onClick={() => {
                  this.updateCreatableCard();
               }}
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

function mapStateToProps(state) {
   return { creatableCard: state.creatableCard };
}

export default connect(mapStateToProps)(CreateImagery);
