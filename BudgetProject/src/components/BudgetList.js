import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Card, Title } from 'react-native-paper';

const BudgetList = ({ route }) => {
  
  const {budgets} = route.params;

  return (
    <View style={styles.container}> 
        <View style={styles.listBox}>
            {
                budgets.length > 0 ?
                <FlatList style = {{width: '100%'}}
                    data={budgets}
                    renderItem={({item}) => {
                        return (
                            <Card style={styles.item} key={item.id}>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.content}>
                                    <Text style={styles.buddy}>Planned Amount: {item.plannedAmount}</Text>
                                    <Text style={styles.buddy}>Actual Amount: {item.actualAmount}</Text>
                                </View>
                            </Card>
                        );
                    }}
                /> :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text>No any budgets</Text>
                </View>
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    heading: {
        fontWeight: 'bold',
        color: 'lightslategrey',
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10        
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        paddingBottom: 20,
    },
    item: {
        backgroundColor: '#b2ebf2',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5
    },
    listBox: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    content: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buddy: {
        fontSize: 12,
        color: 'black'
    }
})

export default BudgetList
