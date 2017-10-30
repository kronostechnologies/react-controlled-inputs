import Input from './input';
import f from '../utils/formatter';

class PercentageInput extends Input {
    constructor(props) {
        super(props);
        this.formatter = new f(props.locale);
    }

    format(value) {
        this.formatter.locale = this.props.locale;
        return this.formatter.formatPercent(value);
    }
}

export default PercentageInput;
