import React from 'react'
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    PanResponder,
    Animated,
    ViewPropTypes
} from 'react-native'
import Video from 'react-native-video'
// import Sample from '../assets/backflip1.mp4'
import FilePicker from './FilePicker'

export default class Player extends React.Component {
    constructor (props) {
        super (props)
        this.onBuffer = this.onBuffer.bind(this)
        this.onError = this.onError.bind(this)
        this.onEnd = this.onError.bind(this)
        this.onProgress = this.onProgress.bind(this)
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
        return (
            <View style={styles.container}>
                <Video
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
               />
               <View>
                   <TouchableWithoutFeedback>
                       <View />
                   </TouchableWithoutFeedback>
               </View>
               <View>
                   <FilePicker style={styles.picker}/>
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