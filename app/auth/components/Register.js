import { View, TextInput, StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ setProcess }) => {

    const [errorMsg, setErrorMsg] = useState('')
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const router = useRouter()

    const sendRegisterData = async () => {
        try {
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                    confirmPassword: confirmationPassword
                })
            })

            const responseData = await response.json(); // Save response data to a variable
            console.log(responseData); // Log the response data

            if (response.ok) {
                await AsyncStorage.setItem('userID', responseData);
                router.push('/home/feed');
            } else if (response.status === 400) {
                setErrorMsg(responseData.msg);
            }
        } catch (err) {
            console.log(err, '55');
        }
    };

    return (
        <View style={styles.loginForm}>
            <Text>Register</Text>
            <TextInput
                onChangeText={e => {
                    setMail(e)
                }}
                style={styles.input}
                editable
                placeholder='johndoe@mail.com'
                placeholderTextColor="#808080"
            />

            <TextInput
                onChangeText={e => {
                    setPassword(e)
                }}
                secureTextEntry={true}
                style={styles.input}
                editable
                placeholder='Password'
                placeholderTextColor="#808080"
            />

            <TextInput
                onChangeText={e => {
                    setConfirmationPassword(e)
                }}
                secureTextEntry={true}
                style={styles.input}
                editable
                placeholder='Confirm password'
                placeholderTextColor="#808080"
            />

            <Button
                onPress={() => sendRegisterData()}
                title='Create Account' />

            <Text style={styles.error}>
                {errorMsg}
            </Text>

            <Text>
                Already registered?
            </Text>

            <TouchableOpacity onPress={() => {
                setProcess('login')
            }} style={styles.appButtonContainer}>
                <Text style={styles.login}>Sign in</Text>
            </TouchableOpacity>

        </View>
    );
}



const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    error: {
        color: 'red'
    }
})

export default Register;