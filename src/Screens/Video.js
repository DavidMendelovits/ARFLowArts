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

export default class Video extends React.Component {
    constructor (props) {
        super (props)
        this.onBuffer = this.onBuffer.bind(this)
        this.onError = this.onError.bind(this)
        this.onEnd = this.onError.bind(this)
    }
    onBuffer (arg) {
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

    render () {
        return (
            <View style={styles.container}>
                <Video
                    source={{uri: "sample.mp4"}}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onEnd={this.onEnd}
                    onError={this.onError}
                    style={styles.video}
               />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    video: {
        width: '100%',
        flexDirection: 'center'
    }
})