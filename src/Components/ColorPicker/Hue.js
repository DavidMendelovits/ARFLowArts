import React from 'react'
import {
    Animated,
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

export default class Hue extends React.Component {
    constructor (props) {
        super (props)
        this.startPos = 
        this.hueColors = [
            '#ff0000',
            '#ffff00',
            '#00ff00',
            '#00ffff',
            '#0000ff',
            '#ff00ff',
            '#ff0000',
        ]
        this.firePressEvent = this.firePressEvent.bind(this)
        // this.sliderX = new Animated.Value(props.barWidth * props.hue / 360)
        // this.panResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: () => true,
        //     onStartShouldSetPanResponderCapture: () => true,
        //     onMoveShouldSetPanResponder: () => true,
        //     onMoveShouldSetPanResponderCapture: () => true,
        //     onPanResponderGrant: (evt, gestureState) => {
        //         const { hue } = this.props
        //         this.dragStartValue = hue
        //         this.fireDragEvent('onDragStart', 'start', gestureState)
        //     },
        //     onPanResponderMove: (evt, gestureState) => {
        //         console.log('onPanResponder Move: ')
        //         this.fireDragEvent('onDragMove', 'start', gestureState);
        //     },
        //     onPanResponderTerminationRequest: () => true,
        //     onPanResponderRelease: (evt, gestureState) => {
        //         this.fireDragEvent('onDragTerminate', 'start', gestureState)
        //     },
        //     onPanResponderTerminate: (evt, gestureState) => {
        //         this.fireDragEvent('onDragTerminate', 'start', gestureState)
        //     },
        //     onShouldBlockNativeResponder: () => true
        // })

        this.sliderStart = new Animated.Value(props.barWidth * (props.startHue) / 360)
        this.panResponderStartRange = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true, 
            onPanResponderGrant: (evt, gestureState) => {
                const { startHue } = this.props
                this.dragStartValue = startHue
                this.fireDragEvent('onDragStart', 'start', gestureState)

            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('onPanResponder Move: ')
                this.fireDragEvent('onDragMove', 'start', gestureState);
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.fireDragEvent('onDragTerminate', 'start', gestureState)
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.fireDragEvent('onDragTerminate', 'start', gestureState)
            },
            onShouldBlockNativeResponder: () => true 
        })

        this.sliderEnd = new Animated.Value(props.barWidth * (props.endHue) / 360)
        this.panResponderEndRange = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true, 
            onPanResponderGrant: (evt, gestureState) => {
                const { endHue } = this.props
                this.dragStartValue = endHue
                // this.fireDragEvent('onDragStart', 'end', gestureState)

            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('onPanResponder Move: ')
                const hue = this.computeHueValueDrag(gestureState)
                console.log('hue: ', hue)
                this.fireDragEvent('onDragMove', 'end', gestureState);
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.fireDragEvent('onDragTerminate', 'end', gestureState)
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.fireDragEvent('onDragTerminate', 'end', gestureState)
            },
            onShouldBlockNativeResponder: () => true 
        })
    }
    componentDidUpdate (prevProps) {
        const { hue, barWidth, startHue, endHue } = this.props
        console.log('component Did update: ', prevProps, this.props)
        if (prevProps.endHue !== endHue) {
            console.log('end hue is differentQ')
            this.sliderEnd.setValue(barWidth * endHue / 360)
        } else if (prevProps.startHue !== startHue) {
            this.sliderStart.setValue(barWidth * startHue / 360)
        } else if (prevProps.hue !== hue || prevProps.barWidth !== barWidth) {
            // this.sliderX.setValue(barWidth * hue / 360)
            // this.sliderEnd.setValue(barWidth * endHue / 360)
        }
    }
    getContainerStyle () {
        const { sliderSize, barWidth, containerStyle } = this.props
        const paddingTop = sliderSize / 2
        const paddingLeft = sliderSize - (barWidth > 0)
                                        ? (sliderSize - barWidth) / 2
                                        : 0
        return [
            styles.container,
            containerStyle,
            {
                paddingTop,
                paddingBottom: paddingTop,
                paddingLeft,
                paddingRight: paddingLeft
            }
        ]
    }
    getCurrentColor () {
        const { hue } = this.props
        return chroma.hsl(hue, 1, 0.5).hex()
    }
    getColor (target) {
        const { startHue, endHue } = this.props
        console.log('getColor', '\ntarget: ', target, startHue, endHue)
        if (target === 'end') {
            return chroma.hsl(endHue, 1, 0.5).hex()
        } else {
            return chroma.hsl(startHue, 1, 0.5).hex()
        }
    }
    getEndColor (_hue) {
        const { hue } = _hue
    }

    computeHueValueDrag (gestureState, target) {
        console.log('hueValueDrag: ')
        const { dx } = gestureState
        console.log('dx: ', dx)
        const { barWidth } = this.props
        const { dragStartValue } = this
        const diff = dx / barWidth
        const updatedHue = normalizeValue(dragStartValue / 360 + diff) * 360
        let returnHue
        if (target === 'start') {
            returnHue = (updatedHue < (this.props.endHue - 5))
                            ? updatedHue
                            : Math.max(this.props.endHue - 5, 0)
        } else {
            returnHue = (updatedHue > (this.props.startHue + 5))
                            ? updatedHue
                            : Math.min(360, this.props.startHue + 5)
        }
        return returnHue
    }

    computeHueValuePress (e) {
        console.log('hueValuepress: ')
        const { nativeEvent } = e
        console.log('native event: ', nativeEvent)
        const { locationX } = nativeEvent
        const { barWidth } = this.props
        const updatedHue = normalizeValue(locationX / barWidth) * 360
        return updatedHue
    }
    fireDragEvent (eventName, target, gestureState) {
        console.log('fireDragEvent: ', eventName, target)
        const { [eventName]: event } = this.props
        if (event) {
            event({
                hue: this.computeHueValueDrag(gestureState, target),
                gestureState,
                target
            })
        }
    }
    firePressEvent (e) {
        const { onPress } = this.props
        if (onPress) {
            onPress({
                hue: this.computeHueValuePress(e),
                nativeEvent: e.nativeEvent
            })
        }
    }
    
    render() {
        const { hueColors } = this
        const {
            sliderSize,
            barWidth,
            barHeight,
            borderRadius
        } = this.props
        return (
            <View style={this.getContainerStyle()}>
                <TouchableWithoutFeedback>
                    <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={hueColors}
                        style={{borderRadius}}
                    >
                        <View style={{width: barWidth, height: barHeight}} />
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <Animated.View
                    {...this.panResponderStartRange.panHandlers}
                    style={[
                        styles.slider,
                        {
                            width: sliderSize,
                            height: sliderSize,
                            borderRadius: sliderSize / 2,
                            borderWidth: sliderSize / 10,
                            backgroundColor: this.getColor('start'),
                            transform: [{
                                translateX: this.sliderStart
                            }]
                        }
                    ]}
                />
                <Animated.View
                    {...this.panResponderEndRange.panHandlers}
                    style={[
                        styles.slider,
                        {
                            width: sliderSize,
                            height: sliderSize,
                            borderRadius: sliderSize / 2,
                            borderWidth: sliderSize / 10,
                            backgroundColor: this.getColor('end'),
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
        alignItems: 'center'
    },
    slider: {
        left: 0,
        position: 'absolute',
        borderColor: '#fff'
    }
})

Hue.propTypes = {
    containerStyle: ViewPropTypes.style,
    borderRadius: PropTypes.number,
    hue: PropTypes.number,
    startHue: PropTypes.number,
    endHue: PropTypes.number,
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    sliderSize: PropTypes.number,
    onDragStart: PropTypes.func,
    onDragMove: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragTerminate: PropTypes.func,
    onPress: PropTypes.func,
}

Hue.defaultProps = {
    containerStyle: {},
    borderRadius: 0,
    hue: 0,
    startHue: 0,
    endHue: 1,
    barWidth: 250,
    barHeight: 12,
    sliderSize: 24,
    onDragStart: null,
    onDragMove: null,
    onDragEnd: null,
    onDragTerminate: null,
    onPress: null
}