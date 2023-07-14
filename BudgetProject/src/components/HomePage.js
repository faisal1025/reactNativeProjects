import React, { useEffect, useState } from 'react'

import {View, StyleSheet, StatusBar} from 'react-native'

import { Title } from 'react-native-paper';

import AddBudget from './AddBudget';

const HomePage = ({navigation}) => {
  const [showComponent, setShowComponent] = useState(false);
  useEffect(()=>{
    setInterval(()=>{
      setShowComponent(!showComponent)
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
          {showComponent ? (<AddBudget navigation={navigation}/>) : (<Title style={styles.heading}>HOME BUDGET</Title>)}
          <StatusBar style="auto" />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    color: 'cadetblue',
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});
export default HomePage


