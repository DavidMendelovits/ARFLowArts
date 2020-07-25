import React from 'react';
import {
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Hue from './Hue';
import Saturation from './Saturation'
import RangeSlider from './RangeSlider';

export default class ColorPicker extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            hue: 0,
            sat: 0,
            val: 1,
            startHue: 50,
            endHue: 100,
            startSaturation: 0.25,
            endSaturation: 0.75,
            startValue: 0.40,
            endValue: 0.60
        }
    // this.saturationValuePicker = React.createRef()
        this.onHueChange = this.onHueChange.bind(this)
        this.onSaturationChange = this.onSaturationChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this)
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
    onSaturationChange ({saturation, target}) {
        console.log('ON SATURATION CHANGE')
        console.log('saturation: ', saturation)
        if (target === 'start') {
            console.log('target : ', target)
            this.setState({startSaturation: saturation})
        } else {
            this.setState({endSaturation: saturation})
        }
        console.log('state: ', this.state)
    }
    onValueChange ({value, target}) {
        console.log('------------------------------------------\n\n\n\n')
        console.log('value: ', value)
        if (target === 'start') {
            this.setState({startValue: value})
        } else {
            this.setState({endValue: value})
        }
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
        const { hue, sat, val, startHue, endHue, startSaturation, endSaturation, startValue, endValue } = this.state
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
                    onDragMove={this.onSaturationChange}
                    hue={hue}
                    value={val}
                    saturation={sat}
                    start={startSaturation}
                    end={endSaturation}
                />
                <RangeSlider
                    // hue={hue}
                    // value={val}
                    // saturation={sat}
                    onDragMove={this.onValueChange}
                    start={startValue}
                    end={endValue}
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