import React from "react";
import "./App.css";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu";
import Alert from '@material-ui/lab/Alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "home",
      ip: "",
      data: "",
      loggedIn: false,
      isLoading: false,
      lastLoginFailed: false,
      firstTry: true,
      URL: "",
    };
    this.requestClockUpdate = this.requestClockUpdate.bind(this);
  }

  componentDidMount() {
    if (this.state.firstTry) {
      var ip = localStorage.getItem("ip");
      if (ip != null) {
        this.setState({ ip: localStorage.getItem("ip") }, () => {
          this.requestClockUpdate();
        });
      } else {
        this.requestClockUpdate();
      }
    }
  }

  setIp = (ipAdress) => {
    this.setState({ ip: ipAdress }, () => {
      this.requestClockUpdate();
    });
  };

  setMenu = (event, newValue) => {
    this.setState({ menu: newValue })
  };

  requestClockUpdate(url) {
    if (typeof url === "undefined") {
      url = "";
    }

    if (this.state.ip !== "") {
      this.setState({ isLoading: true });
      axios
        .get("http://" + this.state.ip + url, { timeout: 5000 })
        .then((result) => {
          this.setState({ data: result.data, isLoading: false });
          if (this.state.data.NAME === "WallClock") {
            this.setState({ loggedIn: true });
            localStorage.setItem("ip", this.state.ip);
          }
        })
        .catch((error) => {
          this.setState({ lastLoginFailed: true, isLoading: false, loggedIn: false});
        });
    } else if (this.state.firstTry) {
      localStorage.removeItem("ip");
      this.setState({
        lastLoginFailed: false,
        isLoading: false,
      });
    } else {
      this.setState({ lastLoginFailed: true, isLoading: false });
    }
  }

  render() {
    if (this.state.menu === "home") {
      return (
        <div>
          {!this.state.loggedIn && <Alert severity="error">Connection not yet established!</Alert>}
          <Home
            data={this.state.data}
            requestClockUpdate={this.requestClockUpdate}
            loggedIn={this.state.loggedIn}
          />
          <Menu
            setMenu={this.setMenu}
          />
        </div>

      );
    } else {
      return (
        <div>
          {!this.state.loggedIn && <Alert severity="error">Connection not yet established!</Alert>}
          <Login
            isLoading={this.state.isLoading}
            loggedIn={this.state.loggedIn}
            setIp={this.setIp}
          />
          <Menu
            setMenu={this.setMenu}
          />
        </div>
      );
    }
  }
}

export default App;
