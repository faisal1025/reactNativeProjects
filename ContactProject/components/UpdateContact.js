import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, IconButton, TextInput, Title } from 'react-native-paper'
import { openDatabase } from 'react-native-sqlite-storage'

let db = openDatabase({ name: 'ContactDatabase.db' });

const UpdateContact = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [landline, setLandline] = useState('')
  const [imageUri, setImageUri] = useState('')
  const id = route.params?.id;

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    launchImageLibrary(options, res=>{
      if(res.didCancel){
        console.log('User has closed the process');
      }else if(res.errorCode){
        console.log('SOme error came', res.errorMessage);
      }else{
        const source = 'data:image/jpeg;base64, ' + res.assets[0].base64;
        setImageUri(source)
      }
    });
    
  }

  const getUser = id => {
    db.transaction((txn)=> {
      txn.executeSql(
        'SELECT * FROM table_user where id=?',
        [id],
        (tx, res) => {
          if(res.rows.length === 1){
            var temp = res.rows.item(0);
            setName(temp.name)
            setMobile(String(temp.mobile))
            setLandline(String(temp.landline))
            setImageUri(temp.pic)
          }
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  const updateUser = (id) => {
    db.transaction((txn) => {
      txn.executeSql(
        'UPDATE table_user SET name = ?, mobile = ?, landline = ?, pic = ? where id = ?',
        [name, mobile, landline, imageUri, id],
        (tx, res) => {
          if(res.rowsAffected === 1){
            Alert.alert('Success', 'Contact updated successfully', 
              [
                {
                  text: 'ok',
                  onPress: () => navigation.navigate('Drawer'),
                }
              ],
              {cancelable: false}
            );
          }else{
            Alert.alert('Faliure', 'Updation Failed')
          }
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  useEffect(() => {
    getUser(id);
  }, [isFocused])

  const formSubmit = () => {
    if (name === '' || mobile === '' || landline === '' || imageUri === '') {
      Alert.alert('Required', 'Any fields can not be empty')
      return;
    }else if(isNaN(mobile) && mobile.length != 10){
      Alert.alert('Wrong Input', 'Mobile must be a number of 10 digit')
      return;
    }else if(isNaN(landline) && landline.length != 10){
      Alert.alert('Wrong Input', 'Landline must be a number of 10 digit')
      return;
    }
    updateUser(id);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formStyle}>
        <View style={styles.fieldStyle}>
          <TouchableOpacity style={styles.imageInput} onPress={() => { openGallery() }}>
            {
              imageUri ? 
              <ImageBackground source={{uri: imageUri}} style={styles.imageStyle} borderRadius={100}>
                <IconButton icon={'camera'} />
              </ImageBackground>  : 
              <IconButton icon={'camera'} />
            }
            
          </TouchableOpacity>
        </View>
        <View style={styles.fieldStyle}>
          <Title style={{ width: '20%' }}>Name</Title>
          <TextInput
            style={{ width: '60%' }}
            mode='outlined'
            activeOutlineColor='skyblue'
            value={name}
            onChangeText={(value) => { setName(value) }}
          />
        </View>
        <View style={styles.fieldStyle}>
          <Title style={{ width: '20%' }}>Mobile</Title>
          <TextInput
            style={{ width: '60%' }}
            mode='outlined'
            activeOutlineColor='skyblue'
            value={mobile}
            onChangeText={(value) => { setMobile(value) }}
          />
        </View>
        <View style={styles.fieldStyle}>
          <Title style={{ width: '20%' }}>Landline</Title>
          <TextInput
            mode='outlined'
            style={{ width: '60%' }}
            activeOutlineColor='skyblue'
            value={landline}
            onChangeText={(value) => setLandline(value)}
          />
        </View>
      </View>
      <Button
        style={styles.buttonStyle}
        mode='contained'
        buttonColor='purple'
        onPress={() => formSubmit()}
      >Save</Button>
    </SafeAreaView>
  )
}

export default UpdateContact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '16%'
  },
  formStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 40
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  imageInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    width: 120,
    height: 120
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 120,
    height: 120
  }
})

