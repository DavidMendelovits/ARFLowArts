import React from 'react';
import {
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Hue from './Hue';
import Saturation from './Saturation'
import Value from './Value';

export default class ColorPicker extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            hue: 0,
            sat: 0,
            val: 1,
            startHue: 0,
            endHue: 100
        }
        this.startHue = 0
        this.endHue = 50
    // this.saturationValuePicker = React.createRef()
        this.onHueChange = this.onHueChange.bind(this)
        this.colorPicker = React.createRef()
        this.satPicker = React.createRef()

    }
    onHueChange ({ hue, target }) {
        console.log('ColorPicker - onHueChange: ', hue)
        console.log('target: ', target)
        console.log('state: ', this.state)
        if (target === 'start') {
            this.setState({ startHue: hue })
        } else if (target === 'end') {
            this.setState({ endHue: hue })
        }
        console.log('state: ', this.state)
    }
    getCurrentColor () {
        // return this.saturationValuePicker.current.getCurrentColor()
        const { hue, saturation, value } = this.props;
        return chroma.hsv(
          hue,
          saturation,
          value,
        ).hex();
    }
    componentDidMount () {
        console.log("picker mounted")
    }
    render() {
        const { hue, sat, val, startHue, endHue } = this.state
        const {
            containerStyle,
            huePickerContainerStyle,
            huePickerBorderRadius,
            huePickerHue,
            huePickerBarWidth,
            huePickerBarHeight,
            huePickerSliderSize,
            onHuePickerDragStart,
            onHuePickerDragMove,
            onHuePickerDragEnd,
            onHuePickerDragTerminate,
            onHuePickerPress,
            satValPickerContainerStyle,
            satValPickerBorderRadius,
            satValPickerSize,
            satValPickerSliderSize,
            satValPickerHue,
            satValPickerSaturation,
            satValPickerValue,
            onSatValPickerDragStart,
            onSatValPickerDragMove,
            onSatValPickerDragEnd,
            onSatValPickerDragTerminate,
            onSatValPickerPress
        } = this.props
        return(
            <View style={[styles.container, containerStyle]}>
                <Hue
                    // containerStyle={styles.container}
                    // containerStyle={huePickerContainerStyle}
                    // borderRadius={huePickerBorderRadius}
                    // hue={0}
                    // barWidth=
                    hue={hue}
                    startHue={startHue}
                    endHue={endHue}
                    onDragStart={onHuePickerDragStart}
                    onDragMove={this.onHueChange}
                    onDragEnd={onHuePickerDragEnd}
                    onDragTerminate={onHuePickerDragTerminate}
                    onPress={this.onHueChange}
                />
                <Saturation 
                    ref={this.satPicker}
                    hue={hue}
                    value={val}
                    saturation={sat}
                />
                <Value
                    hue={hue}
                    value={val}
                    saturation={sat}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

ColorPicker.propTypes = {
    containerStyle: ViewPropTypes.style,
    huePickerContainerStyle: ViewPropTypes.style,
    huePickerBorderRadius: PropTypes.number,
    huePickerHue: PropTypes.number,
    huePickerBarWidth: PropTypes.number,
    huePickerBarHeight: PropTypes.number,
    huePickerSliderSize: PropTypes.number,
    onHuePickerDragStart: PropTypes.func,
    onHuePickerDragMove: PropTypes.func,
    onHuePickerDragEnd: PropTypes.func,
    onHuePickerDragTerminate: PropTypes.func,
    onHuePickerPress: PropTypes.func,
    satValPickerContainerStyle: ViewPropTypes.style,
    satValPickerBorderRadius: PropTypes.number,
    satValPickerSize: PropTypes.number,
    satValPickerSliderSize: PropTypes.number,
    satValPickerHue: PropTypes.number,
    satValPickerSaturation: PropTypes.number,
    satValPickerValue: PropTypes.number,
    onSatValPickerDragStart: PropTypes.func,
    onSatValPickerDragMove: PropTypes.func,
    onSatValPickerDragEnd: PropTypes.func,
    onSatValPickerDragTerminate: PropTypes.func,
    onSatValPickerPress: PropTypes.func,
}
ColorPicker.defaultProps = {
    containerStyle: {},
    huePickerContainerStyle: {},
    huePickerBorderRadius: 0,
    huePickerHue: 0,
    huePickerBarWidth: 12,
    huePickerBarHeight: 200,
    huePickerSliderSize: 24,
    onHuePickerDragStart: null,
    onHuePickerDragMove: null,
    onHuePickerDragEnd: null,
    onHuePickerDragTerminate: null,
    onHuePickerPress: null,
    satValPickerContainerStyle: {},
    satValPickerBorderRadius: 0,
    satValPickerSize: 200,
    satValPickerSliderSize: 24,
    satValPickerHue: 0,
    satValPickerSaturation: 1,
    satValPickerValue: 1,
    onSatValPickerDragStart: null,
    onSatValPickerDragMove: null,
    onSatValPickerDragEnd: null,
    onSatValPickerDragTerminate: null,
    onSatValPickerPress: null,
  }