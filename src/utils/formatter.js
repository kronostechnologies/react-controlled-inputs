import _ from 'lodash';
import { EN, FR } from './constants';

class formatter {
    constructor(lang = EN) {
        this.lang = lang;
    }

    _frenchReplace = value => value.replace('-', '').replace('.', ',');
    _englishReplace = value => value.replace('-', '');
    _isPositive = value => parseFloat((value + '').replace(',', '.')) >= 0;

    noFormat = value => value;

    parseAmount = amount => parseFloat(parseFloat(amount).toFixed(2));

    formatMoney(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        let _value = value;
        if(_value % 1 !== 0 && fixed_decimals && typeof _value === 'number') {
            _value = _value.toFixed(2);
        }

        let coated_value;
        switch(this.lang) {
            case FR:
                coated_value = this._frenchReplace(this.addThousandSeparator(_value, '\u00A0'));
                if(this._isPositive(_value)) {
                    return `${coated_value}\u00A0$`;
                }
                return `(${coated_value})\u00A0$`;
            case EN:
            default:
                coated_value = this._englishReplace(this.addThousandSeparator(_value, ','));
                if(this._isPositive(_value)) {
                    return `$${coated_value}`;
                }
                return `$(${coated_value})`;
        }
    }

    formatPercent(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        let _value = value;
        if(_value % 1 !== 0 && fixed_decimals && typeof _value === 'number') {
            _value = _value.toFixed(2);
        }
        const coated_value = this._frenchReplace(this.addThousandSeparator(_value, ' '));
        if(this._isPositive(_value)) {
            return `${coated_value} %`;
        }
        return `(${coated_value}) %`;
    }

    addThousandSeparator(value, separator) {
        const number = (value + '').split('.');
        const rgx = /(\d+)(\d{3})/;
        let x1 = number[0];
        const decimals = number.length >= 2 ? '.' + number[1] : '';
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, `$1${separator}$2`);
        }
        return x1 + decimals;
    }

    formatNumericUserInput(value) {
        if(typeof value === 'string' && !value.match(/[a-z]/i) && value.slice(value.length - 1) !== ',') {
            const parsed_value = parseFloat(value.replace(',', '.'));
            if(!_.isNaN(parsed_value)) {
                return parsed_value;
            }
        }
        return value;
    }
}

export default formatter;
