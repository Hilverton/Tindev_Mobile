import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';
import General from './pages/General';

import DrawerComponent from './components/DrawerComponent';

const mainNavigation = createDrawerNavigator({
    Index: {
      screen: Main,
    },
    Likes: {
      screen: General,
    }, 
    Dislikes: {
      screen: General,
    },
    Matchs: {
      screen: General,
    }
  }, 
  {
    contentComponent: DrawerComponent
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main: {
      screen: mainNavigation,
    }
    //Main
  })
);