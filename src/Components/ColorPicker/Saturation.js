import React from 'react'

import {
    View,
    TouchableWithoutFeedback,
    ViewPropTypes,
    PanResponder,
    StyleSheet,
  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import normalizeValue from './utils';
  
export default class Saturation extends React.Component {
    constructor (props) {
        super (props)
        this.firePressEvent = this.firePressEvent.bind(this)
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
              const { saturation, value } = this.props;
              this.dragStartValue = {
                saturation,
                value,
              };
              this.fireDragEvent('onDragStart', gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
              this.fireDragEvent('onDragMove', gestureState);
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (evt, gestureState) => {
              this.fireDragEvent('onDragEnd', gestureState);
            },
            onPanResponderTerminate: (evt, gestureState) => {
              this.fireDragEvent('onDragTerminate', gestureState);
            },
            onShouldBlockNativeResponder: () => true,
        })
    }
    getCurrentColor () {
        const { hue, saturation, value } = this.props
        return chroma.hsv(hue, saturation, value).hex()
    }
    computeSatValDrag (gestureState) {
        const { dx } = gestureState
        const { width } = this.props
        const { saturation, value } = this.dragStartValue
        const diff = dx / width
        return {
            saturation: normalizeValue(saturation + diff)
        }
    }
    computeSatValPress (e) {
        const { nativeEvent } = e
        const { locationX } = nativeEvent
        const { width } = this.props
        return {
            saturation: normalizeValue(locationX / width)
        }
    }
    fireDragEvent (eventName, gestureState) {
        const { [eventName]: event } = this.props
        if (event) {
            event({
                ...this.computeSatValDrag(gestureState),
                gestureState
            })
        }
    }
    firePressEvent (e) {
        const { onPress } = this.props
        if (onPress) {
            onPress({
                ...this.computeSatValPress(e),
                nativeEvent: e.nativeEvent
            })
        }
    }
    render () {
        const {
            width,
            height,
            sliderSize,
            hue,
            value,
            saturation,
            containerStyle,
            borderRadius
        } = this.props
        return (
            <View
                style={[
                    styles.container,
                    containerStyle,
                    {
                        height: height,
                        width: width
                    }
                ]}
            >
                <TouchableWithoutFeedback onPress={this.firePressEvent}>
                    <LinearGradient
                        style={{
                            borderRadius
                        }}
                        colors={[
                            '#fff',
                            chroma.hsl(hue, 1, 0.5).hex()
                        ]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        >
                            <View
                                style={{
                                    height: height,
                                    width: width
                                }}
                            />
                        </LinearGradient>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        top: 0,
        left: 0,
        position: 'absolute',
        borderColor: '#fff'
    }
})
Saturation.propTypes = {
    containerStyle: ViewPropTypes.style,
    borderRadius: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    sliderSize: PropTypes.number,
    hue: PropTypes.number,
    saturation: PropTypes.number,
    value: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragTerminate: PropTypes.func,
    onPress: PropTypes.func,
}

Saturation.defaultProps = {
    containerStyle: {},
    borderRadius: 0,
    width: 250,
    height: 12,
    sliderSize: 24,
    hue: 0,
    saturation: 1,
    value: 1,
    onDragStart: null,
    onDragMove: null,
    onDragEnd: null,
    onDragTerminate: null,
    onPress: null,
}