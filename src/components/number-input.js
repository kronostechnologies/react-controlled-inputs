import Input from './input';
import f from '../utils/formatter';

class NumberInput extends Input {
    constructor(props) {
        super(props);
        this.formatter = new f(props.locale);
    }

    format(value) {
        this.formatter.locale = this.props.locale;
        return this.formatter.formatNumber(value);
    }
}

export default NumberInput;
