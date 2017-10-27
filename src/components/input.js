import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatter from '../utils/formatter';
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

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    static propTypes = {
        type: PropTypes.string,
        lang: PropTypes.oneOf([EN, FR])
    }

    static defaultProps = {
        type: 'text',
        lang: EN
    }

    format = formatter.noFormat;

    getValueToDisplay = () => (this.state.focused
    ? this.state.value
    : this.format(this.state.value));

    setFocusedFlag(bool) {
        this.setState({
            focused: bool
        });
    }

    onFocus() {
        this.setFocusedFlag(true);
        if(this.input &&
            this.input.setSelectionRange &&
            this.input.type !== 'number' // Chrome > 33 throws error accessing selection on number inputs
        ) {
            const pos = ('' + this.input.value).length;
            setTimeout(() => {
                this.input.setSelectionRange(0, pos);
            }, 0); // This will defer to the end of the event queue which is required for the blink engine (chromium).
        }
    }

    onBlur() {
        this.setFocusedFlag(false);
    }

    render() {
        return (
            <div>
                <input
                    {...this.props}
                    value={this.getValueToDisplay()}
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
