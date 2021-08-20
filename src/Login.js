import React from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class Login extends React.Component {
  state = {
    ip: "",
  };

  handleChange = (e) => {
    this.setState({ ip: e.target.value });
  };

  checkIP = (e) => {
    this.props.setIp(this.state.ip);
  };

  keyPress = (e) => {
    if (e.key === "Enter") {
      this.checkIP();
    }
  };

  render() {
    return (
      <div className="Login">
        <Container maxWidth="xs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="IP Address"
                variant="outlined"
                onChange={this.handleChange}
                onKeyDown={this.keyPress}
                value={this.props.ip}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12}>
              {!this.props.isLoading && (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={this.checkIP}
                  fullWidth={true}
                >
                  Test connection
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {this.props.isLoading && <CircularProgress />}
            </Grid>
            <Grid item xs={12}>
              {this.props.loggedIn && !this.props.isLoading && (
                <p id="success-msg">Connection established</p>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Login;
