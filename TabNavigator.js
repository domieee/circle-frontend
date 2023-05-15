import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your stack navigators for each tab
import HomeStack from './Stacks/HomeStack';
import SearchScreen from './Screens/SearchScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack}
                options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;