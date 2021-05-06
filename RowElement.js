import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import {resetTimer, incrementCounter} from './Storage'

const RowElement = (props) => {
  /*<Countdown initialStart={Date.now()}></Countdown>*/
  const [obj, changeObj] = useState(props.obj);
  return (
    <View style={styles.row}>
      <View style={styles.textBox}>
        <Text style={styles.text}>{obj.name}</Text>
      </View>
      <View style={styles.timerBox}>
        {obj.type == 'stopwatch' ?
          <Countdown initialStart={obj.initialStart}></Countdown> :
          <Emoji numberOfEmojis={obj.numEmojis} emoji={obj.emoji}></Emoji>}
      </View>
      <View style={styles.reloadBox}>
        {obj.type == 'stopwatch' ?
        <ReloadButton uuid={obj.uuid} callback={changeObj}/> :
        <IncrementButton uuid={obj.uuid} callback={changeObj}/>}
      </View>
    </View>
  );
};

const ReloadButton = (props) => {
  return (
    <Pressable onPress={() => resetTimer(props.uuid, props.callback)}>
      <Icon
          style={styles.reload}
          name='sync'
          size={35}
          color='#000'
      />
    </Pressable>
  )
}

const IncrementButton = (props) => {
  return (
    <Pressable onPress={() => incrementCounter(props.uuid, props.callback)}>
    <Icon
        style={styles.reload}
        name='arrow-up'
        size={35}
        color='#000'
    />
    </Pressable>
  )
}

class Emoji extends React.Component {
  constructor(props) {
    /**
    * Setup the date and state
    */
    super(props);
    const curDate = Date.now()
    this.state = { numberOfEmojis: props.numberOfEmojis, emoji: props.emoji};
  }

  render() {
    /**/
    const finalEmoji = this.state.emoji.repeat(this.state.numberOfEmojis)

    return (
      <Text style={styles.emoji}>
        {finalEmoji}
      </Text>
    );
  }
}

class Countdown extends React.Component {
  constructor(props) {
    /**
    * Setup the date and state
    */
    super(props);
    const curDate = Date.now()
    this.state = { initialStart: props.initialStart, seconds: curDate - props.initialStart};
    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.updateClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  updateClock() {
    const curDate = Date.now()
    this.setState((state, props) => {
      return {seconds: curDate - state.initialStart};
    });
  }

  convertMilliToTime() {
    let seconds = Math.floor(this.state.seconds / 1000);
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)
    seconds = seconds % 60
    minutes = minutes % 60
    hours = hours % 24
    return {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
    };
  }

  render() {
    const result = this.convertMilliToTime()

    let output = "";
    if (result.days > 0) {
      output = output.concat(result.days.toString(), ' Days ', result.hours.toString(),
      ":", result.minutes.toString(), ":", result.seconds.toString())
    } else {
      output = output.concat(result.hours.toString(), ":",
      result.minutes.toString(), ":", result.seconds.toString())
    }

    return (
      <Text style={styles.timer}>{output}</Text>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 70,
    flexDirection: "row",
    backgroundColor: '#0000FF',
    display: 'flex',
    justifyContent: 'center',
  },
  textBox: {
    flex: 5,
    paddingLeft: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: '400',
  },
  timerBox: {
    flex: 4,
    alignSelf: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: '400',
  },
  emoji: {
    fontSize: 24,
    fontWeight: '400',
  },
  reloadBox: {
    flex: 1,
    alignSelf: 'center',
  },
});


export default RowElement;
