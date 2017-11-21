import _ from 'lodash';

import Input from './input';
import f from '../utils/formatter';
import SyntheticEvent from '../utils/synthetic-event';
import { NUMBER_INPUT_CLASSNAME } from '../utils/constants';

class NumberInput extends Input {
    constructor(props) {
        super(props);
        this.formatter = new f(props.locale.toUpperCase());
    }

    format(value) {
        this.formatter.locale = this.props.locale.toUpperCase();
        return this.formatter.formatNumber(value);
    }

    parseValue(value) {
        if(this._isGoingToBeDecimal(value)) {
            return value;
        }
        return _.isNaN(parseFloat(value)) ? value : parseFloat(value);
    }

    getInputClassName() {
        return NUMBER_INPUT_CLASSNAME;
    }

    onChange(e) {
        e.target.value = e.target.value.replace(',', '.');
        if(e.target.value !== '' && !this._isGoingToBeDecimal(e.target.value) && !_.isNaN(Number(e.target.value))) {
            const event = SyntheticEvent(e);
            event.target.value = parseFloat(e.target.value);
            super.onChange(event);
            return;
        }
        super.onChange(e);
    }

    _isGoingToBeDecimal(value) {
        return _.endsWith(value, ',') || _.endsWith(value, '.');
    }
}

export default NumberInput;
