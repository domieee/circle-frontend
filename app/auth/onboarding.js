import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/img/circle_logo.png'
import * as Keychain from 'react-native-keychain';

const Onboarding = () => {
    const router = useRouter()

    useEffect(() => {
        const getToken = () => {
            setTimeout(async () => {
                if (AsyncStorage !== undefined) {
                    try {
                        const user = await AsyncStorage.getItem('user');
                        if (user !== null) {
                            console.log('User logged in')
                            router.push('/home/feed')
                        } else {
                            console.log('User isn`t logged in')
                            router.push('/auth/validation')
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
            <Image
                source={require('../assets/img/circle_logo.png')}
            />
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