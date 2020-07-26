/** @format */

import React from 'react';
import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video'

import ImagePicker from 'react-native-image-picker';

export default class FilePicker extends React.Component {
  state = {
    avatarSource: null,
    videoSource: null,
  };

  constructor(props) {
    super(props);
    this.onBuffer = this.onBuffer.bind(this)
    this.onError = this.onError.bind(this)
    this.onEnd = this.onError.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
    this.displayPreview = this.displayPreview.bind(this)
  }
  onBuffer (arg) {
    // console.log("SAmple:", Sample )
    console.log('---------\n')
    console.log('onBuffer: ', arg)
    }
    onError (err) {
        console.log('---------\n')
        console.log('onError: ', err)
    }
    onEnd (end) {
        console.log('---------\n')
        console.log('onEnd: ', end)
    }
    onProgress (data) {
        console.log('onProgress: ', data)
    }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          videoSource: response.uri,
        });
      }
    });
  }

  displayPreview () {
    const {videoSource} = this.state
    if (videoSource) {
        return (
            <Video
            source={{uri: "`${this.state.videoSource}`"}}
            ref={(ref) => {
                this.player = ref
            }}
            onBuffer={this.onBuffer}
            onEnd={this.onEnd}
            onError={this.onError}
            onProgress={this.onProgress}
            controls
            style={StyleSheet.absoluteFill}
            /> 
        )
    }
    return (
        <View>
            <Text>
                SORRY!
            </Text>
        </View>
    )
  }


  render() {
    let preview = null
    if (this.state.videoSource) {
        preview =   `<Video
                        source={{uri: '${this.state.videoSource}'}}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        onBuffer={this.onBuffer}
                        onEnd={this.onEnd}
                        onError={this.onError}
                        onProgress={this.onProgress}
                        controls
                        style={StyleSheet.absoluteFill}
                    />`
    } else {
        // preview = ``
    }
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View
            style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            {this.state.avatarSource === null ? (
              <Text>Select a Photo</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        {this.state.videoSource && (
          <Text style={{margin: 8, textAlign: 'center'}}>
            {this.state.videoSource}
          </Text>
        )}
        {/* <Video
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
            ref={(ref) => {
                this.player = ref
            }}
            onBuffer={this.onBuffer}
            onEnd={this.onEnd}
            onError={this.onError}
            onProgress={this.onProgress}
            controls
            style={StyleSheet.absoluteFill}
        /> */}
        {this.displayPreview}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: .5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  video: {

  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});