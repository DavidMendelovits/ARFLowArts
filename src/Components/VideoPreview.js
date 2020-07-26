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
import PropTypes from 'prop-types'

export default class VideoPreview extends React.Component {
    constructor (props) {
        super (props)
        this.onBuffer = this.onBuffer.bind(this)
        this.onError = this.onError.bind(this)
        this.onEnd = this.onError.bind(this)
        this.onProgress = this.onProgress.bind(this)
    }

    componentDidUpdate (prevProps) {
        console.log('video preview updated!')

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
        const source = this.props.source
        return (
            <View style={styles.container}>
                <Video
                    source={{uri: source}}
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
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        justifyContent: 'center',
        width: 300,
        height: 200
    },
    video: {
        width: 300,
        height: 200
    }
})

VideoPreview.propTypes = {
    source: PropTypes.string
}

VideoPreview.defaultProps = {
    source: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
}