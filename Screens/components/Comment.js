import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Comment = ({ commentCreatorAvatar, commentCreator, commentCreatorJob, comment, likes, postId }) => {

    const [likedStatus, setLikedStatus] = useState(false)

    const likedLogo = likedStatus ? require('../../assets/img/heart_filled.png') : require('../../assets/img/heart_outlined.png')


    const likeHandler = () => {
        if (!likedStatus) {
            fetch("https://circle-backend-2-s-guettner.vercel.app/api/v1/increase-comment-likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: postId,
                })
            }).then(() => { setLikedStatus(prev => !prev) })
        }
    }

    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentCreatorContainer}>
                <Image style={styles.commentCreatorAvatar} source={{ uri: commentCreatorAvatar }} />
                <View>
                    <Text>
                        {commentCreator}
                    </Text>
                    <Text>
                        {commentCreatorJob}
                    </Text>
                </View>
            </View>
            <Text>
                {comment}
            </Text>
            <Text>
                {commentCreatorJob}
            </Text>
            <View>
                <TouchableOpacity onPress={likeHandler}>
                    <Image source={likedLogo} />
                </TouchableOpacity>
                <Text>
                    {likes}
                </Text>
            </View>

        </View>
    );
}

export default Comment;

const styles = StyleSheet.create({
    commentCreatorAvatar: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginRight: 20,
    },
    commentCreatorContainer: {
        flexDirection: "row",

    },
    commentContainer: {
        borderWidth: 1,
        borderColor: "lightgrey",
        padding: 10
    }
});