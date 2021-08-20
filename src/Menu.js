import React from "react";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

class Menu extends React.Component {

  render() {
    return (
      <div>
        <BottomNavigation id="bottom_menu"
        onChange={this.props.setMenu}
        >
        <BottomNavigationAction label="SettingsBrightness" value="home" icon={<WatchLaterIcon />} />
        <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default Menu;
