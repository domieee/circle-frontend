import { ScrollView, View, TextField, TextInput, Text, Button, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [shouldRender, setShouldRender] = useState(true);
    const [endOfData, setEndOfData] = useState(false);

    const fetchUserList = async () => {
        try {
            const userID = await AsyncStorage.getItem('userID');
            console.log(userID)
            const response = await fetch('https://circle-backend-2-s-guettner.vercel.app/api/v1/following-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userID,
                }),
            })
            if (users.length === 0) {
                setEndOfData(true);
            }
            if (response.ok) {
                const users = await response.json();
                setUsers(prevUsers => [...prevUsers, ...users])
            } else {
                console.log(`Error fetching data: ${response.status}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserList();
    }, []);

    const renderUsers = ({ item, index }) => {
        const user = item
        return (
            < View style={styles.userContainer} >
                < View >
                    <Text>{user.fullName}</Text>
                    <Text>{user.jobTitle}</Text>
                </View >
                <Button title={user.followerStatus === 'not_following' ? 'Follwing' : 'Follow'} />
            </View >
        );
    };

    const handleLoadMore = () => {
        if (!isLoading) {
            setPage(prevPage => prevPage + 1);
            fetchUserList();
        }
    };

    const renderFooter = () => {
        if (endOfData) {
            return <Text>End of data reached</Text>;
        }
        return isLoading ? (
            <View style={styles.footer}>
                <ActivityIndicator size="small" color="#999999" />
            </View>
        ) : null;
    };

    useEffect(() => {
        if (users.length >= 20) {
            setShouldRender(false);
        }
    }, [users]);

    return (
        <>
            <SafeAreaView>
                <TextInput
                    placeholder='Search for users'
                    placeholderTextColor="#808080"
                    style={styles.input} />
                <FlatList
                    data={users.slice(0, shouldRender ? users * 20 : users.length)}
                    renderItem={renderUsers}
                    keyExtractor={(item, index) => item._id.toString() + '_' + index}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
                {isLoading && <ActivityIndicator />}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingInline: 20
    },
    input: {
        top: -10,
        paddingLeft: 20,
        height: 50,
        backgroundColor: '#fff'
    }
})

export default Search