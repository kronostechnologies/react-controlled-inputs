import _ from 'lodash';
import * as Rules from './rules/Rules.jsx';

const Validator = {

    validate(value, rule_list) {
        const rules = rule_list.split('|');
        const result = { is_valid: true, failed_validations: [] };

        _.each(rules, (rule) => {
            const validation_result = this.execRule(rule, value);
            if(typeof validation_result !== 'boolean') {
                result.is_valid &= false;
                result.failed_validations.push(validation_result);
            }
            else {
                result.is_valid &= validation_result;
            }
        });
        return result;
    },

    execRule(rule, value) {
        let min;
        let max;
        switch(true) {
            case rule === ' ':
                return true;
            case rule === 'force_invalid': // This one is for when an explication is given by other means.
                return false;
            case rule === 'required':
                return Rules.Required.validate(value) || Rules.Required.getErrorLabel();
            case rule === 'numeric':
                return Rules.Numeric.validate(value) || Rules.Numeric.getErrorLabel();
            case rule === 'age':
                return Rules.Age.validate(value) || Rules.Age.getErrorLabel();
            case rule === 'integer':
                return Rules.Integer.validate(value) || Rules.Integer.getErrorLabel();
            case rule === 'positive':
                return Rules.Positive.validate(value) || Rules.Positive.getErrorLabel();
            case rule === 'email':
                return Rules.Email.validate(value) || Rules.Email.getErrorLabel();
            case rule === 'sin':
                return Rules.Sin.validate(value) || Rules.Sin.getErrorLabel();
            case rule === 'date':
                return Rules.Date.validate(value) || Rules.Date.getErrorLabel();
            case /GreaterThanAge:(.*)/.test(rule):
                min = Number(rule.split(':')[1]);
                return Rules.GreaterThanAge.validate(value, min) || Rules.GreaterThanAge.getErrorLabel(min);
            case /min:(.*)/.test(rule): // Usage: min:45
                min = Number(rule.split(':')[1]);
                return Rules.Min.validate(value, min) || Rules.Min.getErrorLabel(min);
            case /max:(.*)/.test(rule): // Usage: max:45
                max = Number(rule.split(':')[1]);
                const val = Rules.Max.validate(value, max) || Rules.Max.getErrorLabel(max);
                return val;
            case /between:(.*)/.test(rule): // Usage: between:40:45
                min = Number(rule.split(':')[1]);
                max = Number(rule.split(':')[2]);
                return Rules.Between.validate(value, min, max) || Rules.Between.getErrorLabel(min, max);
            case /regex:(.*)/.test(rule): // Usage: regex:[.]*::MY_ERROR_LABEL
                const regex = rule.split(':')[1];
                Rules.Regex.error_label = rule.split(':')[3];
                return Rules.Regex.validate(value, regex) || Rules.Regex.getErrorLabel();
            case rule === 'greater_than_zero':
                return Rules.GreaterThanZero.validate(value) || Rules.GreaterThanZero.getErrorLabel();
            default:
                console.warn('Unrecognized rule type for validator');
                return true;
        }
    }
};

export default Validator;
