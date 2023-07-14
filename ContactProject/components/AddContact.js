import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native'
import { Button, IconButton, TextInput, Title } from 'react-native-paper'
import { openDatabase } from 'react-native-sqlite-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
let db = openDatabase({ name: 'ContactDatabase.db' });


const AddContact = ({ navigation }) => {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [landline, setLandline] = useState('')
  const [imageUri, setImageUri] = useState('')

  const saveUser = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (name, mobile, landline, pic) VALUES (?,?,?,?)',
        [name, mobile, landline, imageUri],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact Saved Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Drawer'),
                },
              ],
              { cancelable: false },
            );
          } else alert('Registration Failed');
        },
        error => {
          console.log(error);
        },
      );
    });
  };

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
    saveUser();
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
          <Title style={{ width: '20%', color: 'black' }}>Name</Title>
          <TextInput
            style={{ width: '60%', backgroundColor: 'white' }}
            mode='outlined'
            activeOutlineColor='darkgrey'
            textColor='black'
            value={name}
            onChangeText={(value) => { setName(value) }}
            />
        </View>
        <View style={styles.fieldStyle}>
          <Title style={{ width: '20%', color: 'black' }}>Mobile</Title>
          <TextInput
            style={{ width: '60%', backgroundColor: 'white' }}
            mode='outlined'
            activeOutlineColor='darkgrey'
            textColor='black'
            value={mobile}
            onChangeText={(value) => { setMobile(value) }}
            />
        </View>
        <View style={styles.fieldStyle}>
          <Title style={{ width: '20%', color: 'black' }}>Landline</Title>
          <TextInput
            style={{ width: '60%', backgroundColor: 'white' }}
            mode='outlined'
            activeOutlineColor='darkgrey'
            textColor='black'
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

export default AddContact

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
    bottom: 5,
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

