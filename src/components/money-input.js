import Input from './input';
import formatter from '../utils/formatter';
import {
    EN, FR
} from '../utils/constants';

class MoneyInput extends Input {
    format = formatter.formatMoney;
}

export default MoneyInput;
