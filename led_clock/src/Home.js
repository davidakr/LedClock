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
            <Grid item xs={12}>
              Brightness
            </Grid>
            <Grid item xs={12}>
              <Slider
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

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <div className="box red"></div>
              </Grid>
              <Grid item xs={6}>
                Red
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <div className="box green"></div>
              </Grid>
              <Grid item xs={6}>
                Green
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <div className="box blue"></div>
              </Grid>
              <Grid item xs={6}>
                Blue
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
              <div className="LED">LED Color</div>
              </Grid>

              <Grid item xs={9}>
                <div
                  style={{
                    background:
                      "rgb(" +
                      this.state.red_rgb +
                      "," +
                      this.state.green_rgb +
                      "," +
                      this.state.blue_rgb +
                      ")",
                    width: "100%",
                    height: "40px",
                    border: "1px solid black",
                  }}
                ></div>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Home;
