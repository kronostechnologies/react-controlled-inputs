import Input from './input';
import f from '../utils/formatter';
import { CURRENCY_INPUT_CLASSNAME } from '../utils/constants';

class CurrencyInput extends Input {
    constructor(props) {
        super(props);
        this.formatter = new f(props.locale);
    }

    format(value) {
        this.formatter.locale = this.props.locale;
        return this.formatter.formatCurrency(value);
    }

    getInputClassName() {
        return CURRENCY_INPUT_CLASSNAME;
    }
}

export default CurrencyInput;
