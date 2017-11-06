import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import f from '../utils/formatter';
import {
    EN, FR,
    INPUT_CLASSNAME
} from '../utils/constants';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: this.parseValue(props.value),
            failed_validations: [],
            last_submitted_value: 0
        };

        this.formatter = new f(props.locale.toUpperCase());

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

    componentWillReceiveProps(nextProps) {
        const nextState = {};
        if(nextProps.value !== this.props.value) {
            nextState.value = this.parseValue(nextProps.value);
        }
        this.setState(nextState);
    }

_setFocusedFlag(bool) {
    this.setState({
        focused: bool
    });
}

_getValueToDisplay = () => (this.state.focused
    ? this.state.value
    : this.format(this.state.value));

    parseValue(value) {
        return value;
    }

    format(value) {
        return this.formatter.noFormat(value);
    }

    onChange(e) {
        const nextState = { value: e.target.value };
        if(!_.isNil(e.target.value)) {
            nextState.last_submitted_value = e.target.value;
        }
        this.setState(nextState);
        this.props.onChange(e);
    }

    onFocus(e) {
        this._setFocusedFlag(true);
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
        this._setFocusedFlag(false);
        if(this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    filterUnwantedProps() {
        const props = _.assign({}, this.props);
        delete props.locale;
        delete props.validations;
        delete props.className;
        return props;
    }

    getInputClassName() {
        return INPUT_CLASSNAME;
    }

    render() {
        const props = this.filterUnwantedProps();
        const class_name_separator = this.props.className ? ' ' : '';
        return (
            <div className="react-input-container" id={this.props.id ? `${this.props.id}-container` : ''}>
                <input
                    {...props}
                    className={_.join([this.props.className, this.getInputClassName()], class_name_separator)}
                    value={this._getValueToDisplay()}
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
