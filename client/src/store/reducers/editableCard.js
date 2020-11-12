import actions from "../actions";

export default function editableCard(editableCard = {}, action) {
   // type & payload
   let newEditableCard = { ...editableCard };
   switch (action.type) {
      case actions.STORE_EDITABLE_CARD:
         console.log(action.payload);
         newEditableCard.card = action.payload.card;
         newEditableCard.prevRoute = action.payload.prevRoute;
         console.log(newEditableCard);
         return newEditableCard; // new state
      default:
         return editableCard;
   }
}
