import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  Text,
  StyleSheet,
  View,
} from 'react-native';




const TopBanner = (props: {
  titleName: Title;
}) => {
  return (
    <View style={styles.headerLayout}>
      <View style={styles.menuIcon}>
        <Icon
            name='three-bars'
            size={35}
            color='#000'
        />
      </View>
      <View style={styles.titleBox}>
        <Text style={styles.titleName}>{props.titleName}
        </Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerLayout: {
    height: 50,
    flexDirection: "row",
    backgroundColor: '#d3d3d3',
    display: 'flex',
  },
  menuIcon: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  titleBox: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleName: {
    fontSize: 24,
    fontWeight: '600',
  }
});


export default TopBanner;
