import _ from 'lodash';
import { EN, FR } from './constants';

class formatter {
    constructor(locale = EN) {
        this.locale = locale;
    }

    _frenchReplace = value => _.trim(value.replace('-', '').replace(',', '\u00A0').replace('.', ','), '.,');
    _englishReplace = value => _.trim(value.replace('-', '').replace(' ', ',').replace('\u00A0', ','), '.,');
    _isPositive = value => parseFloat((value + '').replace(',', '.')) >= 0;

    noFormat = value => value;

    parseAmount = amount => parseFloat(parseFloat(amount).toFixed(2));

    formatNumber(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        let _value = value;
        if(_value % 1 !== 0 && fixed_decimals && typeof _value === 'number') {
            _value = _value.toFixed(2);
        }

        switch(this.locale) {
            case FR:
                return this._frenchReplace(this.addThousandSeparator(_value, '\u00A0'));
            case EN:
            default:
                return this._englishReplace(this.addThousandSeparator(_value, ','));
        }
    }

    formatCurrency(value, fixed_decimals = true) {
        if(value === '' || _.isNil(value)) {
            return '';
        }

        const coated_value = this.formatNumber(value, fixed_decimals);
        switch(this.locale) {
            case FR:
                if(this._isPositive(value)) {
                    return `${coated_value}\u00A0$`;
                }
                return `(${coated_value})\u00A0$`;
            case EN:
            default:
                if(this._isPositive(value)) {
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

const frenchFormatter = new formatter(FR);
const englishFormatter = new formatter(EN);

export default formatter;
export { frenchFormatter, englishFormatter };
