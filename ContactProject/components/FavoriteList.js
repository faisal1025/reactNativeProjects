import React, { useState, useEffect } from 'react'
import {Alert, FlatList, StyleSheet, View} from 'react-native'
import { Avatar, Button, Card, Divider, FAB, IconButton, Menu, Searchbar, Text} from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {openDatabase} from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native';
import Element from './Element';

let db = openDatabase({name: 'ContactDatabase.db'});


const FavoriteList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    if(query === ''){
      setUserList(userAll)
      return
    }
    let temp = userAll.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
    setUserList(temp)
  };
  
  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user where isFav = 1', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i){
          temp.push(results.rows.item(i));
        }
        setUserList(temp);
        setUserAll(temp);
      });
    });
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return(
    <>
      <View style={{minHeight: '100%'}}>
        <Searchbar
          placeholder="Search"
          onChangeText={search => {
            onChangeSearch(search)
            setSearchQuery(search)
          }}
          value={searchQuery}
        />
        {
          userList.length > 0 ?
          <FlatList 
            style={{ }}
            data={userList}
            renderItem={({item}) => {
              return (
                <Element item={item} getData={getData} navigation={navigation}/>
              );
            }} 
          />:
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text variant='bodyLarge' style={{color: 'black'}}>No any Contacts</Text>
          </View>
        }
        

      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {navigation.navigate('Add New Contact')}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
  modelBox: {
    borderRadius: 8,
    borderColor: '#333',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 100,
    width: '50%'
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    borderBottomColor: '#ccc',
    paddingVertical: 7,
    alignItems: 'center'
  }
});

export default FavoriteList;