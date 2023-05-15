import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

// Import your screens/components for the Home tab
import FeedScreen from '../Screens/FeedScreen';
import CommentScreen from '../Screens/CommentScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={FeedScreen} />
            <Stack.Screen
                options={({ navigation }) => ({
                    ...TransitionPresets.ModalPresentationIOS, // Apply modal transition
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        // Custom header button to close the modal
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ marginRight: 10 }}>Close</Text>
                        </TouchableOpacity>
                    ),
                })}
                name="Comments"
                component={CommentScreen}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;