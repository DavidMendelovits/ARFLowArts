/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Video from './src/Screens/Video'
import CameraScreen from './src/Screens/CameraSceen';
import Picker from './src/Screens/Picker'
import ColorPicker from './src/Components/ColorPicker';
class App extends Component {
  render() {
    return (
      // <CameraScreen />
      // <ColorPicker />
      // <HuePicker />
      <View>
        {/* <ColorPicker /> */}
        <Video  source={{uri: "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}}
                ref={(ref) => {
                  this.player = ref
                }}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                style={styles.video}
        />
        {/* <Picker /> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  video: {
    display: flex,
    width: '100%'
  }, 
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;