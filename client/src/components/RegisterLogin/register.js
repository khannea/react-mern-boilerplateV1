import React, { Component } from "react";
import { Container, Button, Paper, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Grid, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    pseudo: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  displayErrors = (errors) => {
    return errors.map((error, i) => (
      <Grid item key={i}>
        <Typography color="secondary">{error}</Typography>
      </Grid>
    ));
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  isFormValid = () => {
    let errors = [];

    if (this.isFormEmpty(this.state)) {
      errors = ["Fill in all fields."];
    } else if (!this.isPasswordValid(this.state)) {
      errors = ["Password must be at least 6 characters long."];
    } else if (!this.isPasswordConfirmationValid(this.state)) {
      errors = ["Password and password confirmation is not the same."];
    }
    this.setState({ errors });
    if (errors.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ pseudo, email, password, passwordConfirmation }) => {
    return (
      !pseudo.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password }) => {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  };

  isPasswordConfirmationValid = ({ password, passwordConfirmation }) => {
    return password === passwordConfirmation;
  };

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      pseudo: this.state.pseudo,
      email: this.state.email,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };

    if (this.isFormValid()) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          console.log(response);
          if (response.payload.success) {
            // this.setState({ errors: [] });
            this.props.history.push("/login");
          } else {
            //         this.setState({ errors: ["Coudln't create this user."] });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <Container maxWidth="md" component={Paper}>
        <Box m={5}>
          <form>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h2">Create new account</Typography>
              </Grid>
              {this.state.errors.length > 0 && (
                <Grid item container direction="column">
                  {this.displayErrors(this.state.errors)}
                </Grid>
              )}
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  name="pseudo"
                  label="Pseudo"
                  defaultValue={this.state.pseudo}
                  onChange={(e) => this.handleChange(e)}
                  type="string"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    required: false,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  label="Your email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                  type="email"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    required: false,
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  name="password"
                  label="Your password"
                  defaultValue={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  type="password"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    required: false,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  size="small"
                  name="passwordConfirmation"
                  label="Password confirmation"
                  defaultValue={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                  type="password"
                  variant="outlined"
                  required
                  InputLabelProps={{
                    required: false,
                  }}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth={false}
                    type="submit"
                    color="primary"
                    onClick={this.submitForm}
                  >
                    Create
                  </Button>
                </Grid>
                <Grid item>
                  <Link
                    to="/login"
                    component={() => {
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          href="/login"
                          p={4}
                        >
                          Login
                        </Button>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    );
  }
}

function mapStateToPtops(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToPtops)(Register);
