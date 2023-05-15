import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'

export default function Post({ profileImage, postImage, userName, jobTitle, likes, comments }) {

    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.imageProfile} source={{ uri: profileImage }} />
                <View>
                    <Text style={styles.text}>{userName}</Text>
                    <Text style={styles.text}>{jobTitle}</Text>
                </View>
            </View>
            <View style={styles.postImgContainer}>
                <Image style={styles.imagePost} source={{ uri: postImage }} />
                <View style={styles.postStats}>
                    <Text>{likes}</Text>
                    <Text>{comments}</Text>
                </View>
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    imageProfile: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 20,
    },
    postStats: {
        flex: 1,
        flexDirection: 'row',
        gap: 20
    },
    postImgContainer: {
        padding: 20,
    },
    imagePost: {
        width: 350,
        height: 300,
        borderRadius: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 10,
        paddingLeft: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    text: {
        height: 20,
    },
});