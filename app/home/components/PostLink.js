import { ScrollView, Text, StyleSheet, Image, StatusBar, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';


const PostLink = ({ postImage, setRenderMode, postId, setPostId }) => {

    const navigation = useNavigation()

    const clickHandler = () => {
        setRenderMode("details")
        setPostId(postId)
    }

    return (

        <View style={styles.postContainer} >
            <Image
                style={styles.postImage}
                source={{ uri: postImage }} />
        </View>



    )


}

const styles = StyleSheet.create({
    postImage: {
        height: 110,
        width: 110,
        borderRadius: 10,



    },
    postContainer: {
        paddingTop: 20,
        width: 110,
        height: 110
    }
})

export default PostLink