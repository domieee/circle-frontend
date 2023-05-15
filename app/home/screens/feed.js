import { ScrollView, Text, StyleSheet, StatusBar, View, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post.js'
import { TouchableOpacity } from 'react-native-gesture-handler';
import profileDetails from './postDetails.js'
import { useRouter } from 'expo-router';



const Feed = () => {

    const router = useRouter()

    const scrollViewRef = useRef(null)
    const [user, setUser] = useState()
    const [feed, setFeed] = useState([])

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [scrollPosition, setScrollPosition] = useState(0);

    const [reload, setReload] = useState(false)

    // const handleScroll = (event) => {
    //     const { contentOffset } = event.nativeEvent;
    //     setScrollPosition(contentOffset.y);
    //     if (scrollPosition < 18) {
    //         setReload(true)
    //         console.log(reload)
    //         scrollViewRef.current.scrollTo({ y: 20, animated: true })
    //     } else {
    //         setReload(false)
    //     }
    // };

    const fetchFeed = async () => {
        console.log("rerender")
        try {
            const userID = await AsyncStorage.getItem('userID');
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/get-feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                }),
            });
            setUser(userID)
            const feed = await response.json();
            setFeed(prevFeed => [...prevFeed, ...feed])
            setIsLoading(false)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    const renderPost = ({ item }) => {
        return (
            <>
                <Stack.Navigator>
                    <Stack.Screen name="Profile" component={Feed} />
                    <Stack.Screen name="Settings" component={profileDetails} />
                </Stack.Navigator>
                <Post
                    profileImage={item.creatorAvatarSmall}
                    postImage={item.postImage}
                    userName={item.postCreator}
                    jobTitle={item.postCreatorJob}
                    likes={item.likes}
                    comments={item.comments.length.toString()}
                />
                {/* <TouchableOpacity onPress={ }>
                    <Text>asdasds</Text>
                </TouchableOpacity> */}
            </>
        );
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            setPage(prevPage => prevPage + 1);
            fetchFeed();
        }
    };

    const renderFooter = () => {
        return isLoading ? (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#999999" />
            </View>
        ) : null;
    };

    return (
        <>
            <FlatList
                style={styles.postContainer}
                data={feed}
                renderItem={renderPost}
                keyExtractor={item => item._id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
            {isLoading && <ActivityIndicator />}
            {/* {
                <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentOffset={{ y: 20 }} onScroll={handleScroll} overScrollMode="always" style={styles.scrollView}>
                    {feed.map((post) => {

                        return (
                            <View style={styles.postContainer} key={post._id}>
                                <Post
                                    profileImage={post.creatorAvatarSmall}
                                    postImage={post.postImage}
                                    userName={post.postCreator}
                                    jobTitle={post.postCreatorJob}
                                    likes={post.likes}
                                    comments={(post.comments.length).toString()}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            } */}
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginTop: 20,
        paddingTop: 20
    },
    postContainer: {
        paddingTop: 20
    },
    placeHolder: {
        height: 50,
    }
})

export default Feed