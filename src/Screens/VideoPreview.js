import React from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    PanResponder,
    Animated,
    ViewPropTypes
} from 'react-native'
// import Sample from '../assets/backflip1.mp4'
import VideoPreview from '../Components/VideoPreview'
import MediaPicker from 'react-native-image-picker'

export default class Player extends React.Component {
    state = {
        videoSource: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    }
    constructor (props) {
        super (props)
        this.onBuffer = this.onBuffer.bind(this)
        this.onError = this.onError.bind(this)
        this.onEnd = this.onError.bind(this)
        this.onProgress = this.onProgress.bind(this)
        this.selectVideo = this.selectVideo.bind(this)
    }
    selectVideo () {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        }

        MediaPicker.showImagePicker(options, res => {
            console.log('video selected! -> ', res)

            if (res.didCancel) {
                console.log('CANCELLED!')
            } else if (res.error) {
                console.log('ERROR: ', res.error)
            } else if (res.customButton) {
                console.log('custom button used: ', res.customButton)
            } else {
                this.setState({
                    videoSource: res.uri
                })
            }
        })
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

    render () {
        const { videoSource } = this.state
        return (
            <View style={styles.container}>
                <VideoPreview source={videoSource} />
               <View>
                   <TouchableWithoutFeedback onPress={this.selectVideo.bind(this)}>
                       <View>
                           <Text>Select a video!</Text>
                       </View>
                   </TouchableWithoutFeedback>
               </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // flex: .8,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    video: {
        flex: 1
        // flexDirection:'column'
        // position: 'relative'
    },
    picker: {
        flex: .2
        // justifyContent: 'flex-end',
        // right: 0
    }
})