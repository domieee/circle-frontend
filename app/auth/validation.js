import { SafeAreaView, TextInput, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login.js'

const validation = () => {

    const router = useRouter()

    const [process, setProcess] = React.useState('register');

    useEffect(() => {
        const deleteKey = async () => {
            try {
                await AsyncStorage.removeItem('userID');
            } catch (error) {
                console.log(error)
            }
        }
        deleteKey()
    }, [])

    return (
        <>
            <SafeAreaView
                style={styles.center}>
                <Image
                    source={require('../assets/img/circle_logo.png')}
                />
                {process === 'register' ?
                    <Register process={process} setProcess={setProcess} />
                    :
                    <Login process={process} setProcess={setProcess} />
                }
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',

    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    login: {
        fontSize: 10
    },
    center: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default validation

