import React from 'react'
import {
    View,
    Stylesheet
} from 'react-native'
import ColorPicker from '../Components/ColorPicker'

export default class Proto extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            hue: 0,
            sat: 0,
            val: 1
        }
        // this.onSatValPickerChange = this.onSatValPickerChange.bind(this)
        // this.onHuePickerChange = this.onHuePickerChange.bind(this)
    }
    // onSatValPickerChange ({ saturation, value }) {
    //     this.setState
    // }


    render () {
        const { hue, sat, val } = this.state
        return (
            <View>
                <ColorPicker
                    huePickerHue={hue}
                    onHuePickerDragMove={this.onHuePickerChange}
                    onHuePickerPress={this.onHuePickerChange}
                />
            </View>
        )
    }

}