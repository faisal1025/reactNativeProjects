import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Divider, IconButton, Menu, Text } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'ContactDatabase.db' });

const Element = ({ item, getData, navigation }) => {

    const deleteUser = id => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM  table_user where id=?',
                [id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        getData();
                    } else {
                        alert('Please insert a valid User Id');
                    }
                },
            );
        });
    };

    const toggleFavorite = (isFav, id) => {
        db.transaction((txn) => {
            txn.executeSql('UPDATE table_user SET isFav = ? where id = ?', [!isFav, id],
                (tx, response) => {
                    if (response.rowsAffected > 0) {
                        getData();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        })
    };

    const deleteButton = () => {
        return (
            <View style={{backgroundColor: 'pink', width: 100 }}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', height: '100%'}} onPress={() => {deleteUser(item.id); }}>
                    <Text>Delete</Text>
                    <FontAwesome5 name={'trash'} />
                </TouchableOpacity>
            </View>
        )
    }

    const editButton = () => {
        return (
            <View style={{backgroundColor: 'skyblue',width: 100 }}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%', height: '100%'}} onPress={() => { navigation.navigate('Update Existing Contact', { id: item.id }) }} >
                    <Text>Update</Text>
                    <FontAwesome5 name={'edit'} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <Swipeable renderLeftActions={deleteButton} renderRightActions={editButton}>
                <Card.Title
                    key={item.id}
                    title={item.name}
                    subtitle={item.mobile}
                    left={(props) => <Avatar.Image {...props} source={{ uri: item.pic }} />}
                    right={(props) => {
                        return (
                            <IconButton {...props} icon='star' iconColor={item.isFav ? 'orange' : 'grey'} onPress={() => { toggleFavorite(item.isFav, item.id) }} />
                        );
                    }}
                />
            </Swipeable>
        </>
    )
}

export default Element
