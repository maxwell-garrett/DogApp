import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TopBanner from './TopBanner';
import RowElement from './RowElement';
import {getData} from './Storage';

const Home = ({ navigation }) => {
  const [rows, changeRows] = useState([]);

  const updateRows = () => {
    getData('rows')
     .then(rawData => JSON.parse(rawData))
     .then(data => changeRows(data))
  }

  useEffect(() => {
    updateRows()
    })

  const listElements = rows.map((obj) => <RowElement key={obj.uuid} obj={obj} updateRows={updateRows}/>)

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#294F50'}}>
      <StatusBar barStyle='light-content'/>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {listElements}
      </ScrollView>

      <View style={styles.plus}>
        <Icon.Button
            name='plus'
            size={45}
            color='#000'
            backgroundColor='#F8ECEC'
            onPress={() => {
              navigation.navigate('AddNew');
            }}
        >
          <Text>Add new tracker</Text>
        </Icon.Button>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  plus: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
});

export default Home;
