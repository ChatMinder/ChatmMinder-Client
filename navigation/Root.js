import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Drawers from './Drawers';
// import Stack from './Stack';
import CalenderDaily from '../screens/CalenderDaily';

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Drawers" component={Drawers} />
    {/* <Nav.Screen name="Stack" component={Stack} /> */}
    <Nav.Screen name="CalenderDaily" component={CalenderDaily} />
  </Nav.Navigator>
);

export default Root;
