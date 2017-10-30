import React, { Component } from 'react';
import PropTypes from 'prop-types';
import f from '../utils/formatter';
import {
    EN, FR
} from '../utils/constants';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            value: props.value,
            failed_validations: []
        };

        this.formatter = new f(props.locale);

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    static propTypes = {
        type: PropTypes.string,
        locale: PropTypes.oneOf([EN, FR])
    }

    static defaultProps = {
        type: 'text',
        locale: EN
    }

    format(value) {
        return this.formatter.noFormat(value);
    }

    getValueToDisplay = () => (this.state.focused
    ? this.state.value
    : this.format(this.state.value));

    setFocusedFlag(bool) {
        this.setState({
            focused: bool
        });
    }

    onChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    }

    onFocus(e) {
        this.setFocusedFlag(true);
        if(this.input &&
            this.input.setSelectionRange &&
            this.input.type !== 'number' // Chrome version > 33 throws error accessing selection on number inputs
        ) {
            const pos = ('' + this.input.value).length;
            setTimeout(() => {
                this.input.setSelectionRange(0, pos);
            }, 0); // This will defer to the end of the event queue which is required for the blink engine (chromium).
        }
        if(this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    onBlur(e) {
        this.setFocusedFlag(false);
        if(this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    render() {
        return (
            <div>
                <input
                    {...this.props}
                    value={this.getValueToDisplay()}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    ref={(node) => {
                        this.input = node;
                    }}
                />
            </div>
        );
    }
}

export default Input;
