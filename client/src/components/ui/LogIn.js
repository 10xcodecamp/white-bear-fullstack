import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async validateAndLogInUser() {
      const emailInput = document.getElementById("login-email-input").value;
      const passwordInput = document.getElementById("login-password-input")
         .value;

      const user = {
         email: emailInput,
         password: passwordInput,
      };
      console.log("Created user object for POST: ", user);
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            const currentUser = res.data;
            console.log(currentUser);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            // redirect the user
            // this.props.history.push("/create-answer");
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
         <div className="col-xl-5 offset-xl-2 col-sm-6 col-12 mb-6">
            <div className="card">
               <div className="card-body text-dark text-sans">
                  <h2 className="card-title text-serif">Welcome back</h2>
                  <p className="mb-4">
                     Log in with your email address and password.
                  </p>

                  <label htmlFor="login-email-input">Email address</label>
                  <input
                     type="email"
                     className={classnames({
                        "form-control": true,
                        "mb-2": true,
                        "is-invalid": this.state.hasEmailError,
                     })}
                     id="login-email-input"
                  />

                  {this.state.hasEmailError && (
                     <p className="text-danger">{this.state.emailError}</p>
                  )}

                  <div className="mb-4"></div>

                  <label htmlFor="login-password-input">Password</label>
                  <input
                     type="password"
                     className={classnames({
                        "form-control": true,
                        "mb-2": true,
                        "is-invalid": this.state.hasPasswordError,
                     })}
                     id="login-password-input"
                  />
                  {this.state.hasPasswordError && (
                     <p className="text-danger">{this.state.passwordError}</p>
                  )}

                  <div className="mb-5"></div>

                  <button
                     className="btn btn-success float-right"
                     onClick={() => {
                        this.validateAndLogInUser();
                     }}
                  >
                     Log in
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(LogIn));
