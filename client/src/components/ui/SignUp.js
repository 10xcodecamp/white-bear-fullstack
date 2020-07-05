import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      // Create user obj
      const user = {
         id: getUuid(),
         email: emailInput,
         password: passwordInput,
         createdAt: Date.now(),
      };
      console.log("Created user object for POST: ", user);
      // post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            console.log(res.data);
            // Update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <div className="col-xl-5 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body text-dark text-sans">
                  <h2 className="card-title text-serif">Nice to meet you</h2>
                  <p className="mb-4">Sign up for White Bear. Free forever.</p>

                  {this.state.isDisplayingInputs && (
                     <>
                        <p className="text-success mb-4">
                           Let's get you signed up!
                        </p>

                        <label htmlFor="signup-email-input">
                           Email address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "mb-2": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="signup-email-input"
                        />
                        {this.state.hasEmailError && (
                           <p className="text-danger">
                              {this.state.emailError}
                           </p>
                        )}

                        <div className="mb-4"></div>

                        <label htmlFor="signup-password-input">
                           Create a password
                           <br />
                           <span className="text-muted">
                              Must be at least 9 characters
                           </span>
                        </label>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "mb-2": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="signup-password-input"
                        />
                        {this.state.hasPasswordError && (
                           <p className="text-danger">
                              {this.state.passwordError}
                           </p>
                        )}
                        <div className="mb-5"></div>

                        <button
                           to="/create-answer"
                           className="btn btn-success btn-block"
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           Let's Go
                        </button>
                     </>
                  )}

                  {!this.state.isDisplayingInputs && (
                     <button
                        className="btn btn-success btn-block"
                        onClick={() => {
                           this.showInputs();
                        }}
                     >
                        Sign up
                     </button>
                  )}
               </div>
            </div>
            <p className="text-white lead mt-6">
               A flashcard app that uses the latest in scientific research on
               memory.
            </p>
            <p className="text-white lead mt-4">
               White Bear uses a custom "spaced repetition" algorithm to test
               you on cards before you forget them.
            </p>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(SignUp));
