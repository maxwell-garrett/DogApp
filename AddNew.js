import React from 'react';
import {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import uuid from 'react-native-uuid';

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {storeData, getData} from './Storage';

const AddNew = (props) => {
  /*<Countdown initialStart={Date.now()}></Countdown>*/
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Stopwatch', value: 'stopwatch'},
    {label: 'Counter', value: 'counter'}
  ]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#294F50'}}>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setValue={setValue}
      setItems={setItems}
      setOpen={setOpen}
      style={styles.input}
      />

      <CounterFields selected={value} navigation={props.navigation}/>
      <StopwatchFields selected={value} navigation={props.navigation}/>
    </SafeAreaView>
  );
};



const StopwatchFields = (props) => {
  if (props.selected != 'stopwatch') {
    return null
  }

  const [fieldName, onChangeFieldName] = useState("");
  const [rows, changeRows] = useState([]);
  const obj = {uuid: uuid.v4(), type: 'stopwatch', name: fieldName, initialStart: Date.now()};


  useEffect(() => {
    getData('rows')
     .then(rawData => JSON.parse(rawData))
     .then(data => changeRows(data))
    })

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFieldName}
        value={fieldName}
        placeholder="Enter stopwatch name"
        placeholderTextColor='#000'
        />

      <View style={styles.submit}>
        <Icon.Button
            name='check'
            size={45}
            color='#000'
            backgroundColor='#F8ECEC'
            onPress={() => {
              const tempRow = rows.concat(obj)
              storeData(tempRow)
              props.navigation.navigate('Home');
            }}
        >
          <Text>Submit</Text>
        </Icon.Button>
      </View>
    </View>
  );
}


const CounterFields = (props) => {
  /**/
  if (props.selected != 'counter') {
    return null
  }

  const [fieldName, onChangeFieldName] = useState("");
  const [emoji, onChangeEmoji] = useState("");
  const [resetHour, onChangeResetHour] = useState("00");
  const [resetMinute, onChangeResetMinute] = useState("00");
  const [rows, changeRows] = useState([]);
  const obj = {uuid: uuid.v4(),
                type: 'counter',
                name: fieldName,
                emoji: emoji,
                resetHour: resetHour,
                resetMinute: resetMinute,
                numEmojis: 0};

  useEffect(() => {
    getData('rows')
     .then(rawData => JSON.parse(rawData))
     .then(data => changeRows(data))
    })

  return (
    <View style={styles.sectionContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeFieldName}
        value={fieldName}
        placeholder="Enter counter name"
        placeholderTextColor='#000'
        />
      <TextInput
          style={styles.input}
          onChangeText={onChangeEmoji}
          value={emoji}
          placeholder="Enter emoji to represent count"
          maxLength={1}
          placeholderTextColor='#000'
          />
      <View style={styles.row}>
        <Text style={styles.inputTimeLabel}>
        Enter reset time hours:minutes
        </Text>
        <TextInput
            style={styles.inputTime}
            onChangeText={onChangeResetHour}
            value={resetHour}
            maxLength={2}
            placeholderTextColor='#000'
            keyboardType={"numeric"}
            />
        <Text style={styles.semicolon}>
        :
        </Text>
        <TextInput
            style={styles.inputTime}
            onChangeText={onChangeResetMinute}
            value={resetMinute}
            maxLength={2}
            placeholderTextColor='#000'
            keyboardType={"numeric"}
            />
      </View>

      <View style={styles.submit}>
        <Icon.Button
            name='check'
            size={45}
            color='#000'
            backgroundColor='#F8ECEC'
            onPress={() => {
              const tempRow = rows.concat(obj)
              storeData(tempRow)
              props.navigation.navigate('Home');
            }}
        >
          <Text>Submit</Text>
        </Icon.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: '#F8ECEC',
    borderBottomColor: '#294F50',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  input: {
    color: '#000',
    backgroundColor: '#F8ECEC',
    borderColor: '#000',
    borderBottomColor: '#294F50',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputTime: {
    color: '#000',
    borderColor: '#000',
    flex: 2,
    textAlign: 'center',
  },
  semicolon: {
    color: '#000',
    borderColor: '#000',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputTimeLabel: {
    color: '#000',
    borderColor: '#000',
    flex: 10,
    alignSelf: 'center',
  },
  sectionContainer: {
    flex: 1,
  },
  submit: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
});

export default AddNew;
