import React from 'react';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const AddNew = (props) => {
  /*<Countdown initialStart={Date.now()}></Countdown>*/
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Stopwatch', value: 'stopwatch'},
    {label: 'Counter', value: 'counter'}
  ]);

  return (
    <SafeAreaView style={{flex:1}}>
      <DropDownPicker
      open={open}
      value={value}
      items={items}
      setValue={setValue}
      setItems={setItems}
      setOpen={setOpen}
      />

      <CounterFields selected={value} navigation={props.navigation}/>
    </SafeAreaView>
  );
};


const CounterFields = (props) => {
  /**/
  if (props.selected != 'counter') {
    return null
  }

  const [fieldName, onChangeFieldName] = useState("");
  const [emoji, onChangeEmoji] = useState("");
  const [resetHour, onChangeResetHour] = useState("00");
  const [resetMinute, onChangeResetMinute] = useState("00");

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
            onPress={() => {
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
    backgroundColor: '#FFFFFF',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  input: {
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
  },
  inputTime: {
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    flex: 2,
    textAlign: 'center',
  },
  semicolon: {
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputTimeLabel: {
    color: '#000',
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
    flex: 10,
    alignSelf: 'center',
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  submit: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
});

export default AddNew;
