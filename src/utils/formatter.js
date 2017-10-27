import _ from 'lodash';
import { EN, FR } from './constants';

class Formatter {
    constructor(lang = EN) {
        this.lang = lang;
    }

    _frenchSugarCoat(coated_value) {
        return coated_value
            .replace('-', '')
            .replace('.', ',');
    }

    _englishSugarCoat(coated_value) {
        return coated_value
            .replace('-', '');
    }

    formatMoney(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        let _value = value;
        if(_value % 1 !== 0 && fixed_decimals && typeof _value === 'number') {
            _value = _value.toFixed(2);
        }

        switch(this.lang) {
            case FR:
            
            case EN:
            default:
        }

        let coated_value;
        if(this.lang === FR) {
            coated_value = this._frenchSugarCoat(this.addThousandSeparator(_value, '\u00A0'));
            if(parseFloat((_value + '').replace(',', '.')) >= 0) {
                return `${coated_value}\u00A0$`;
            }
            return `(${coated_value})\u00A0$`;
        }

        coated_value = this._englishSugarCoat(this.addThousandSeparator(_value, ','));
        if(parseFloat((_value + '').replace(',', '.')) >= 0) {
            return `$${coated_value}`;
        }
        return `$(${coated_value})`;
    }

    formatPercent(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        let _value = value;
        if(_value % 1 !== 0 && fixed_decimals && typeof _value === 'number') {
            _value = _value.toFixed(2);
        }
        const coated_value = this._frenchSugarCoat(this.addThousandSeparator(_value, ' '));
        if(parseFloat((_value + '').replace(',', '.')) >= 0) {
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

    parseAmount(amount) {
        return parseFloat(parseFloat(amount).toFixed(2));
    }
}

export default Formatter;
