import React, { useState, useEffect } from 'react'
import {Alert, FlatList, StyleSheet, View} from 'react-native'
import { Avatar, Button, Card, Divider, FAB, IconButton, Menu, Searchbar, Text} from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {openDatabase} from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Element from './Element';

let db = openDatabase({name: 'ContactDatabase.db'});


const ContactList = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userList, setUserList] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => {
    // console.log('this is query = ', query)
    if(query === ''){
      setUserList(userAll)
      return
    }
    let temp = userAll.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
    setUserList(temp)
  };
  
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS table_user', []);
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, pic BLOB, name VARCHAR(20), mobile INT(10), landline INT(10), isFav BOOLEAN DEFAULT \'0\' NOT NULL)',
              [],
            );
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        console.log('length ', results.rows.length);
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
    createTables();
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

export default ContactList;