import React from "react";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          this.setState({ lastLoginFailed: true, isLoading: false });
        });
    } else if (this.state.firstTry) {
      localStorage.removeItem("ip");
      this.setState({
        lastLoginFailed: false,
        isLoading: false,
        firstTry: false,
      });
    } else {
      this.setState({ lastLoginFailed: true, isLoading: false });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Home
          data={this.state.data}
          requestClockUpdate={this.requestClockUpdate}
        />
      );
    } else {
      return (
        <Login
          isLoading={this.state.isLoading}
          lastLoginFailed={this.state.lastLoginFailed}
          setIp={this.setIp}
        />
      );
    }
  }
}

export default App;
