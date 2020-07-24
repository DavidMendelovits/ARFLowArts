import React from 'react';
import { 
    Text, 
    StyleSheet, 
    View,
    TouchableWithoutFeedback,
    PanResponder,
    ViewPropTypes
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
    };
  }


  render() {
    const { hue, sat, val } = this.state;
    return (
      <View style={styles.container}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={[
             '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ff0000'
            ]}
            style={styles.linearGradient}
          >
          <Text style={styles.buttonText}>
              Hue picker
          </Text>
        </LinearGradient>
        <LinearGradient start={{x: 0, y: 0}} end={{x:1, y:0}} colors={['black', 'white']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
                Saturation Picker
            </Text>
        </LinearGradient>
        <LinearGradient start={{x: 0, y: 0}} end={{x:1, y:0}} colors={['black']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
                Value Picker
            </Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    // flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
});