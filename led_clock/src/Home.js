import React from "react";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state_status: true,
      brightness_status: true,
      brightness_value: 0,
      red_rgb: 0,
      green_rgb: 0,
      blue_rgb: 0,
      data: this.props.data,
    };
  }

  componentDidMount() {
    this.setState({
      state_status: !!parseInt(this.state.data["STATE_STATUS"]) ? true : false,
      brightness_status: !!parseInt(this.state.data["BRIGHTNESS_STATUS"])
        ? false
        : true,
      brightness_value: this.state.data["BRIGHTNESS_VALUE"],
      red_rgb: this.state.data["RED_RGB"],
      green_rgb: this.state.data["GREEN_RGB"],
      blue_rgb: this.state.data["BLUE_RGB"],
    });
  }

  setURL() {
    var url = "/?";
    if (this.state.state_status) {
      url += "STATE_STATUS=1&";
    } else {
      url += "STATE_STATUS=0&";
    }

    if (this.state.brightness_status) {
      url += "BRIGHTNESS_STATUS=0&";
    } else {
      url += "BRIGHTNESS_STATUS=1&";
    }

    url += "BRIGHTNESS_VALUE=" + this.state.brightness_value + "&";
    url += "RED_RGB=" + this.state.red_rgb + "&";
    url += "GREEN_RGB=" + this.state.green_rgb + "&";
    url += "BLUE_RGB=" + this.state.blue_rgb;
    return url;
  }

  handleChange = (event, value) => {
    this.setState({ [event.target.id]: value }, () => {
      this.props.requestClockUpdate(this.setURL());
    });
  };

  render() {
    return (
      <div className="Home">
        <Container maxWidth="xs">
          <Grid container spacing={1}>
            <Grid item xs={10}>
              Status
            </Grid>
            <Grid item xs={2}>
              <Switch
                id="state_status"
                color="primary"
                checked={this.state.state_status}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={10}>
              Light Sensor
            </Grid>
            <Grid item xs={2}>
              <Switch
                id="brightness_status"
                color="primary"
                checked={this.state.brightness_status}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid id="brightness" item xs={12}>
              Brightness
            </Grid>
            <Grid item xs={1}>
                <svg class="bi bi-brightness-alt-high-fill ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4 11a4 4 0 1 1 8 0 .5.5 0 0 1-.5.5h-7A.5.5 0 0 1 4 11zm4-8a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM4.464 7.464a.5.5 0 0 1-.707 0L2.343 6.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/>
                </svg>
              </Grid>
            <Grid item xs={10}>
              <Slider
                id="brightness_slider"
                value={this.state.brightness_value}
                aria-labelledby="continuous-slider"
                min={0}
                max={255}
                disabled={this.state.brightness_status}
                onChange={(event, value) => {
                  this.setState({ brightness_value: value });
                }}
                onChangeCommitted={(event, value) => {
                  this.setState({ brightness_value: value }, () => {
                    this.props.requestClockUpdate(this.setURL());
                  });
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <svg class="bi bi-brightness-high-fill ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="4"/>
                <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid id="red" className="box" item xs={12}>
                Red
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-dash-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  id="red_rgb"
                  value={this.state.red_rgb}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={255}
                  onChange={(event, value) => {
                    this.setState({ red_rgb: value });
                  }}
                  onChangeCommitted={(event, value) => {
                    this.setState({ red_rgb: value }, () => {
                      this.props.requestClockUpdate(this.setURL());
                    });
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-plus-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid id="green" className="box" item xs={12}>
                Green
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-dash-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  id="green_rgb"
                  value={this.state.green_rgb}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={255}
                  onChange={(event, value) => {
                    this.setState({ green_rgb: value });
                  }}
                  onChangeCommitted={(event, value) => {
                    this.setState({ green_rgb: value }, () => {
                      this.props.requestClockUpdate(this.setURL());
                    });
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-plus-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid id="blue" className="box" item xs={12}>
                Blue
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-dash-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path fill-rule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </Grid>
              <Grid item xs={10}>
                <Slider
                  id="blue_rgb"
                  value={this.state.blue_rgb}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={255}
                  onChange={(event, value) => {
                    this.setState({ blue_rgb: value });
                  }}
                  onChangeCommitted={(event, value) => {
                    this.setState({ blue_rgb: value }, () => {
                      this.props.requestClockUpdate(this.setURL());
                    });
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <svg class="bi bi-plus-square ctrlBtns" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
                  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
                  <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;
