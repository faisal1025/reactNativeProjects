
import React, { useState } from 'react'

import {View, Text, StyleSheet, Alert} from 'react-native'
import {TextInput, Title, HelperText, Button} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import {addBudget} from '../../store/slices/BudgetSlice'


const AddBudget = ({navigation}) => {
  const [name, setName] = useState('')
  const [planned, setPlanned] = useState('')
  const [actual, setActual] = useState('')
  const budgets = useSelector((state) => state.budget.budgets)
  const dispatch = useDispatch();

  const isValidate = () =>{
    if(name === ''){
      alert('Name can not be empty');
      return false;
    }else if(planned === ''){
      alert('Planned Amount can not be empty');
      return false;
    }else if(actual === ''){
      alert('Actual amount can not be empty');
      return false;
    }else if(isNaN(planned)){
      alert('Enter a valid planned amount in number');
      return false;
    }else if(isNaN(actual)){
      alert('Enter a valid actual amount in number');
      return false;
    }else{
      return true;
    }
  }

  const SubmitEvent = (e) => {
    if(isValidate()){
      dispatch(addBudget({
        name: name,
        planned: planned,
        actual: actual
      }))
      Alert.alert('Success', 'Added Successfully');
      setActual('');
      setName('');
      setPlanned('');
    }

  }

  return (
    <View style={style.entry}>
      <Title style={style.heading}>Budget Entry</Title>
      <View style = {style.formStyle}>
        <View style = {style.fieldStyle}>
          <Text style={style.label}>Name of the Item</Text>
          <TextInput
            mode='outlined'
            style={{backgroundColor: 'white'}}
            activeOutlineColor='darkgrey'
            textColor='black'
            value={name}
            onChangeText={(e) => setName(e)} 
          />
        </View>
        <View style = {style.fieldStyle}>
          <Text style={style.label}>Planned Amount</Text>
          <TextInput 
            mode='outlined'
            style={{backgroundColor: 'white'}}
            activeOutlineColor='darkgrey'
            textColor='black'
            value={planned}
            onChangeText={(e) => setPlanned(e)}
          />
        </View>
        <View style = {style.fieldStyle}>
          <Text style={style.label}>Actual Amount</Text>
          <TextInput 
            mode='outlined'
            style={{backgroundColor: 'white'}}
            activeOutlineColor='darkgrey'
            textColor='black'
            value={actual}
            onChangeText={(e) => setActual(e)}
          />
        </View>
      </View>
      <View style={{marginBottom: 5}}>
        <Button
          mode='contained'
          buttonColor='skyblue'
          textColor='black'
          onPress={(e) => SubmitEvent(e)}
        >Add Budget</Button>
      </View>
      <View>
        <Button
          mode='contained'
          buttonColor='#ffb74d'
          textColor='black'
          onPress={() => {navigation.navigate('Budget List', {
                budgets: budgets,
            });
          }}
          
        >Budget List</Button>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    entry: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 28,
      justifyContent: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      color: 'lightslategrey',
      textAlign: 'center',
    },
    label: {
      color: 'rgba(153, 134, 134, 1)',
      fontWeight: '400',
    },
    inputFeild:{
      color: '#eeeeee'
    },
    fieldStyle:{
      margin: 4,
      padding: 4,
    },
    formStyle:{
      justifyContent: 'center',
      margin: 35,
    },
})

export default AddBudget

