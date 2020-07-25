import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ViewPropTypes,
  PanResponder,
  StyleSheet,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import normalizeValue from './utils';

export default class RangeSlider extends React.Component {
    constructor (props) {
        super (props)
        this.firePressEvent = this.firePressEvent.bind(this)
        this.sliderStart = new Animated.Value(props.width * props.start)
        this.panResponderStart = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
              const { start } = this.props;
              this.dragStartValue = start 
              this.fireDragEvent('onDragStart', 'start', gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
              this.fireDragEvent('onDragMove', 'start', gestureState);
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (evt, gestureState) => {
              this.fireDragEvent('onDragEnd', 'start', gestureState);
            },
            onPanResponderTerminate: (evt, gestureState) => {
              this.fireDragEvent('onDragTerminate', 'start', gestureState);
            },
            onShouldBlockNativeResponder: () => true,
        })
        this.sliderEnd = new Animated.Value(props.width * props.end)
        this.panResponderEnd = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt, gestureState) => {
              const { end } = this.props;
              this.dragStartValue = end
              this.fireDragEvent('onDragStart', 'end', gestureState);
            },
            onPanResponderMove: (evt, gestureState) => {
              this.fireDragEvent('onDragMove', 'end', gestureState);
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (evt, gestureState) => {
              this.fireDragEvent('onDragEnd', 'end', gestureState);
            },
            onPanResponderTerminate: (evt, gestureState) => {
              this.fireDragEvent('onDragTerminate', 'end', gestureState);
            },
            onShouldBlockNativeResponder: () => true,
        })
    }
    componentDidUpdate (prevProps) {
        const {start, end, width} = this.props
        if (prevProps.end !== end) {
            this.sliderEnd.setValue(width * end)
        } else if (prevProps.start !== start) {
            this.sliderStart.setValue(width * start) 
        } 
        
    }
    getCurrentColor () {
        const { hue, saturation, value } = this.props
        return chroma.hsv(hue, saturation, value).hex()
    }
    computeValueDrag (gestureState, target) {
        const { dx } = gestureState
        const { width, start, end } = this.props
        const { value } = this.dragStartValue
        const diff = dx / width
        const updatedValue = normalizeValue(this.dragStartValue + diff)
        let returnValue
        if (target === 'start') {
            returnValue = (updatedValue < (end - 0.02))
                            ? updatedValue
                            : Math.max(end - 0.02)
        } else {
            returnValue = (updatedValue > (start + 0.02))
                            ? updatedValue
                            : Math.min(start + 0.02)
        }
        console.log('computeValueDrag: ', target, returnValue)
        return returnValue
    }
    computeValuePress (e) {
        const { nativeEvent } = event
        const { locationX } = nativeEvent
        const { width } = this.props
        return normalizeValue(locationX / width)
    }
    fireDragEvent (eventName, target, gestureState) {
        const { [eventName]: event } = this.props
        if (event) {
            event({
                value: this.computeValueDrag(gestureState, target),
                gestureState,
                target
            })
        }
    }
    firePressEvent (e) {
        const { onPress } = this.props
        if (onPress) {
            onPress({
                ...this.computeValuePress(e),
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
            borderRadius,

        } = this.props
        const spectrum = [
            '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ff0000',
        ]
        const values = [
            '#fff',
            'rgba(0, 0, 0, 0)',
            '#000',
        ]
        return (
            <View
                style={[
                    styles.container,
                    containerStyle,
                    {
                        height: height + sliderSize,
                        width: width + sliderSize
                    }
                ]}
            >
                <TouchableWithoutFeedback onPress={this.firePressEvent}>
                    <LinearGradient
                        style={{
                            borderRadius
                        }}
                        colors={spectrum}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                        <LinearGradient
                            style={{width: width, height: height}}
                            colors={values}
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
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <Animated.View
                    {...this.panResponderStart.panHandlers}
                    style={[
                        styles.slider,
                        {
                            width: sliderSize,
                            height: sliderSize,
                            borderRadius: sliderSize / 2,
                            borderWidth: sliderSize / 10, 
                            borderColor: '#000',
                            backgroundColor: ('#fff'),
                            transform: [{
                                translateX: this.sliderStart
                            }]
                        }
                    ]}
                />
                <Animated.View
                    {...this.panResponderEnd.panHandlers}
                    style={[
                        styles.slider,
                        {
                            width: sliderSize,
                            height: sliderSize,
                            borderRadius: sliderSize / 2,
                            borderWidth: sliderSize / 10, 
                            borderColor: '#000',
                            backgroundColor: ('#fff'),
                            transform: [{
                                translateX: this.sliderEnd
                            }]
                        }
                    ]}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    slider: {
      left: 0,
      position: 'absolute',
      borderColor: '#fff',
    },
  });
  
RangeSlider.propTypes = {
    containerStyle: ViewPropTypes.style,
    borderRadius: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    sliderSize: PropTypes.number,
    hue: PropTypes.number,
    saturation: PropTypes.number,
    value: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragTerminate: PropTypes.func,
    onPress: PropTypes.func,
};
  
RangeSlider.defaultProps = {
    containerStyle: {},
    borderRadius: 0,
    width: 250,
    height: 12,
    sliderSize: 24,
    hue: 0,
    saturation: 1,
    value: 1,
    start: 0.4,
    end: 0.6,
    onDragStart: null,
    onDragMove: null,
    onDragEnd: null,
    onDragTerminate: null,
    onPress: null,
};
  