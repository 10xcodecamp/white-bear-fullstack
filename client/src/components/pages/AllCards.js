import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";
const userId = "6781066b-a2a5-4670-b473-213eb446b101";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         memoryCards: [],
         order: "memory_cards.created_at%20DESC",
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setSearchTerm() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      this.setState({ searchTerm: lowerCasedInput }, () => {
         this.setMemoryCards();
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            this.setState({ memoryCards: res.data });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   render() {
      return (
         <AppTemplate>
            <div className="row my-4">
               <div className="col-8">
                  <input
                     className="form-control form-control-sm"
                     type="text"
                     placeholder="Search for a word"
                     id="search-input"
                  />
               </div>
               <div className="col-4">
                  <button
                     className="btn btn-primary btn-block btn-sm"
                     onClick={() => this.setSearchTerm()}
                  >
                     Search
                  </button>
               </div>
            </div>

            <div className="row my-4 no-gutters">
               <div className="col-4">
                  <p className="text-muted mt-1">Sort cards by</p>
               </div>
               <div className="col-8">
                  <select
                     value={this.state.order}
                     className="form-control form-control-sm"
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value="memory_cards.created_at%20DESC">
                        Most recent
                     </option>
                     <option value="memory_cards.created_at%20ASC">
                        Oldest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC%2C%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20DESC%2C%20memory_cards.created_at%20DESC">
                        Easiest
                     </option>
                  </select>
               </div>
            </div>

            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
