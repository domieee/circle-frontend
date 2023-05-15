import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator.js';


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <NavigationContainer>
            <StatusBar
                barStyle="dark-content" // Customize the style of the status bar (e.g., light-content, dark-content)
                backgroundColor="#fff" // Customize the background color of the status bar
            />
            {!isAuthenticated ? <AuthNavigator isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} /> : <TabNavigator />}

        </NavigationContainer>
    )
}

export default App

const style = StyleSheet.create({
    flex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})