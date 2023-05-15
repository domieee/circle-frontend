import { View, StyleSheet, Image, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/img/circle_logo.png'
import * as Keychain from 'react-native-keychain';
import { createStackNavigator } from '@react-navigation/stack';

const Onboarding = ({ navigation }) => {
    // const router = useRouter()

    // const router = useRouter()


    useEffect(() => {
        const getToken = () => {
            setTimeout(async () => {
                if (AsyncStorage !== undefined) {
                    try {
                        const user = await AsyncStorage.getItem('user');
                        if (user !== null) {
                            console.log('User logged in')

                        } else {
                            console.log('User isn`t logged in')
                            navigation.navigate('Login')
                        }
                    } catch (err) {
                        console.log('Error retrieving token: ', err)
                    }
                } else {
                    console.log('Undefined')
                }
            }, 1000)
        }
        getToken();
    }, [])

    return (
        <View
            style={styles.center}>
            <Text>asdasds</Text>
            {/* <Image
                source={require('../assets/img/circle_logo.png')}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Onboarding