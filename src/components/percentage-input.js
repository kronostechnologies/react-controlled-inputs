import NumberInput from './number-input';
import f from '../utils/formatter';
import { PERCENTAGE_INPUT_CLASSNAME } from '../utils/constants';

class PercentageInput extends NumberInput {
    constructor(props) {
        super(props);
        this.formatter = new f(props.locale.toUpperCase());
    }

    format(value) {
        this.formatter.locale = this.props.locale.toUpperCase();
        return this.formatter.formatPercent(value);
    }

    getInputClassName() {
        return PERCENTAGE_INPUT_CLASSNAME;
    }
}

export default PercentageInput;
