import React from 'react'
import {
    View,
    Stylesheet,
    ViewPropTypes,
    PanResponder,
    TouchableWithoutFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import normalizeValue from './utils'

export default class SaturationRange extends React.Component {
    constructor (props) {
        super (props)

    }

    render () {
        const colors = [
            '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ff0000',
        ]
        return (
            <View style={styles.containerStyle}>
                <LinearGradient colors={colors} />
            </View>
        )
    }
}

SaturationRange.propTypes = {
    containerStyle: ViewPropTypes.style,
    borderRadius: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragTerminate: PropTypes.func,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider: {
      top: 0,
      left: 0,
      position: 'absolute',
      borderColor: '#fff',
    },
});