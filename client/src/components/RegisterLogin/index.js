import React, { Component } from "react";
import { Container, Paper, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Grid, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

class RegisterLogin extends Component {
  state = { email: "", password: "", errors: [] };

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

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        console.log(response);
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            errors: ["Failed to login, try again."],
          });
        }
      });
    } else {
      this.setState({
        errors: ["Form is not valid."],
      });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  render() {
    return (
      <Container maxWidth="sm" component={Paper}>
        <Box m={5}>
          <form>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h2">Login</Typography>
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
                  name="email"
                  label="Email"
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
                  label="Password"
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
              <Grid item container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={this.submitForm}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Link
                    to="/register"
                    component={() => {
                      return (
                        <Button
                          variant="contained"
                          color="primary"
                          href="/register"
                          p={4}
                        >
                          Register
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

export default connect(mapStateToPtops)(RegisterLogin);
