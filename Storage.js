import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('rows', jsonValue)
  } catch (e) {
    // saving error
    console.log(value)
  }
}

const resetTimer = async (uuid, callback) => {
  getData('rows').then(
    (data) => JSON.parse(data)
  ).then(
    (data) => {
      const index = data.findIndex((obj) => uuid == obj.uuid)
      data[index].initialStart = Date.now();
      console.log(data[index])
      callback(data[index])
      storeData(data)
    })
}

const incrementCounter = async (uuid, callback) => {
  getData('rows').then(
    (data) => JSON.parse(data)
  ).then(
    (data) => {
      const index = data.findIndex((obj) => uuid == obj.uuid)
      data[index].numEmojis += 1
      callback(data[index])
      storeData(data)
    }
  )
}

const deleteRow = async (uuid, changeObj) => {
  getData('rows').then(
    (data) => JSON.parse(data)
  ).then(
    (data) => {
      data.splice(data.findIndex((obj) => uuid == obj.uuid),1)
      console.log(data)
      storeData(data)
    }
  ).then(() => {
    changeObj()
  }
  )
}

const getData = async (key) => {
  try {
    const jsonValue = AsyncStorage.getItem('rows')
    /*jsonValue != null ? changeRows(JSON.parse(jsonValue)) : null; */
    return jsonValue
  } catch(e) {
    // error reading value
    console.log("Error reading value")
  }
}

export {storeData, getData, resetTimer, incrementCounter, deleteRow};
