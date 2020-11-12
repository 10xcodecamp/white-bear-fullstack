import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import saveIcon from "../../icons/save.svg";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";
import axios from "axios";

class Edit extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: this.props.editableCard.card.answer,
         imageryText: this.props.editableCard.card.imagery,
         isDeleteChecked: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0 ||
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
   }

   toggleDeleteButton() {
      this.setState({ isDeleteChecked: !this.state.isDeleteChecked });
   }

   saveCard() {
      if (!this.checkHasInvalidCharCount()) {
         const memoryCard = { ...this.props.editableCard.card };
         memoryCard.answer = this.state.answerText;
         memoryCard.imagery = this.state.imageryText;

         // db PUT this card in our axios req
         axios
            .put(`/api/v1/memory-cards/${memoryCard.id}`, memoryCard) // /api/v1/memory-cards/cd9883ff-fd1a-463d-8c46-cf78a785f4c3
            .then(() => {
               console.log("Memory Card updated");

               // Update Redux queue
               const cards = [...this.props.queue.cards];
               cards[this.props.queue.index] = memoryCard;
               this.props.dispatch({
                  type: actions.UPDATE_QUEUED_CARDS,
                  payload: cards,
               });

               // TODO: on success, fire success overlay
               this.props.history.push(this.props.editableCard.prevRoute);
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide after 5 seconds
            });
      } else {
         console.log("INVALID char counts");
      }
   }

   deleteCard() {
      const memoryCard = { ...this.props.editableCard.card };
      // query db to delete card
      axios
         .delete(`/api/v1/memory-cards/${memoryCard.id}`)
         .then((res) => {
            console.log(res.data);
            const deletableCard = this.props.editableCard.card;
            console.log("deletableCard: ", deletableCard);
            const cards = this.props.queue.cards;
            console.log("queue cards: ", cards);
            const filteredCards = without(cards, deletableCard); // Not filtering the deletable card from filteredCards
            console.log("filteredCards: ", filteredCards);
            this.props.dispatch({
               type: actions.UPDATE_QUEUED_CARDS,
               payload: filteredCards,
            });
            const index = this.props.queue.index;
            console.log({ index });
            // TODO: Display success overlay
            if (this.props.editableCard.prevRoute === "/review-answer") {
               if (filteredCards[index] === undefined) {
                  this.props.history.push("/review-empty");
               } else {
                  this.props.history.push("/review-imagery");
               }
            }
            if (this.props.editableCard.prevRoute === "/all-cards") {
               this.props.history.push("/all-cards");
            }
         })
         .catch((err) => {
            console.log(err.response.data);
            // TODO: Display error overlay
         });
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">Edit card</p>

            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="card">
                     <div className="card-body bg-primary lead">
                        <textarea
                           rows="4"
                           defaultValue={this.props.editableCard.card.imagery}
                           onChange={(e) => this.setImageryText(e)}
                        ></textarea>
                     </div>
                  </div>

                  <div className="card">
                     <div className="card-body bg-secondary lead">
                        <textarea
                           rows="4"
                           defaultValue={this.props.editableCard.card.answer}
                           onChange={(e) => this.setAnswerText(e)}
                        ></textarea>
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
                        Top: {this.state.imageryText.length}/{MAX_CARD_CHARS}
                     </span>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.answerText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        Bottom: {this.state.answerText.length}/{MAX_CARD_CHARS}
                     </span>
                  </p>

                  <div className="clearfix"></div>

                  <Link
                     to={this.props.editableCard.prevRoute}
                     className="btn btn-link"
                  >
                     Discard changes
                  </Link>

                  <button
                     className={classnames(
                        "btn btn-primary btn-lg ml-4 float-right",
                        { disabled: this.checkHasInvalidCharCount() }
                     )}
                     id="save-card"
                     onClick={() => {
                        this.saveCard();
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

                  <p className="text-center lead text-muted mt-6 mb-4">
                     Card properties
                  </p>

                  <div className="row mb-5">
                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Created on:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Last attempt:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Next attempt:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                     <div className="col-5 col-sm-3">
                        <p className="text-muted">Consecutives:</p>
                     </div>
                     <div className="col-7 col-sm-9">
                        <p>
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </p>
                     </div>
                  </div>
                  <div className="custom-control custom-checkbox mb-4">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id="show-delete"
                        checked={this.state.isDeleteChecked}
                        onChange={() => {
                           this.toggleDeleteButton();
                        }}
                     />
                     <label
                        className="custom-control-label"
                        htmlFor="show-delete"
                     >
                        Show delete button
                     </label>
                  </div>
                  {this.state.isDeleteChecked && (
                     <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                           this.deleteCard();
                        }}
                     >
                        Delete this card
                     </button>
                  )}
               </>
            )}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit);
