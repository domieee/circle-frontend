import { View, Text, TextInput, Image, StyleSheet, Button } from 'react-native'
import React from 'react'


const RegisterDetails = ({ isAuthenticated, setIsAuthenticated }) => {
    return (
        <View style={styles.centered}>
            <Image
                style={styles.avatar}
                source={require('../assets/img/placeholder.png')} />
            <Button title='Choose image' />
            <Text>Tell a bit more about you!</Text>
            <TextInput
                numberOfLines={1}
                style={styles.input}
                editable
                placeholder='Embracing life at any moment!'
                placeholderTextColor="#808080"
            />
            <TextInput
                autoCapitalize='characters'
                style={styles.input}
                editable
                placeholder='Product Implementation Specialist'
                placeholderTextColor="#808080"
            />
            <TextInput
                style={styles.input}
                editable
                keyboardType='numeric'
                placeholder='123-456-789'
                placeholderTextColor="#808080"
            />
            <TextInput
                style={styles.input}
                editable
                keyboardType='url'
                placeholder='www.janedoe.com'
                placeholderTextColor="#808080"
            />
            <Button title='Submit' onPress={() => setIsAuthenticated(true)} />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    }
})

export default RegisterDetails