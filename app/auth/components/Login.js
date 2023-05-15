import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ setProcess }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    console.log('asdsd')

    const sendLoginData = async () => {
        try {
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                }),
            });
            if (response.ok) {
                const userID = await response.json();
                await AsyncStorage.setItem('userID', userID);
                router.push('../home/feed');
            } else if (response.statusCode === 400) {
                const error = await response.json();
                setErrorMsg(error.msg);
            }
        } catch (err) {
            console.log(err, errorMsg);
        }
    };

    return (
        <View style={styles.loginForm}>
            <Text>Login</Text>
            <TextInput
                onChangeText={(e) => setMail(e)}
                keyboardType="email-address"
                style={styles.input}
                editable
                placeholder="johndoe@mail.com"
                placeholderTextColor="#808080"
            />

            <TextInput
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={true}
                style={styles.input}
                editable
                placeholder="Password"
                placeholderTextColor="#808080"
            />

            <Button onPress={() => sendLoginData()} title="Login" />

            <Text>Not a member?</Text>

            <TouchableOpacity onPress={() => setProcess('register')} style={styles.appButtonContainer}>
                <Text style={styles.login}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    login: {
        fontSize: 10,
    },
});

export default Login;