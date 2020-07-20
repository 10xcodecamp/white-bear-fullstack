import React from "react";
import editIcon from "../../icons/edit.svg";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard(memoryCard) {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/all-cards",
         },
      });
      this.props.history.push("/edit");
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <div className="d-flex align-items-start mb-5">
            <div className="app-card flex-fill">
               <div className="card">
                  <div className="card-body bg-primary">
                     {this.props.card.imagery}
                  </div>
               </div>

               <div className="card">
                  <div className="card-body bg-secondary">
                     {this.props.card.answer}
                  </div>
               </div>
            </div>

            <button
               className="btn btn-link ml-4 d-flex mt-n2"
               onClick={() => {
                  this.storeEditableCard(memoryCard);
               }}
            >
               <img
                  src={editIcon}
                  className="d-inline"
                  style={{ marginTop: "2px", marginRight: "8px" }}
                  width="20px"
                  alt=""
               />
               Edit
            </button>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default withRouter(connect(mapStateToProps)(MemoryCard));
