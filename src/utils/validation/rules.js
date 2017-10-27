import _ from 'lodash';
import moment from 'moment';
import AbstractRule from './abstract-rule';

class Required extends AbstractRule {
    constructor() {
        super('VALIDATIONS__REQUIRED');

        this.test = (value) => {
            if(value === undefined || value === null || value === '') {
                return false;
            }
            const str = String(value).replace(/\s/g, '');
            return str.length > 0;
        };
    }
}

class Numeric extends AbstractRule {
    constructor() {
        super('VALIDATIONS__NUMERIC');

        this.test = value => (_.isNumber(value) || !_.isNaN(value));
    }
}

class Age extends AbstractRule {
    constructor() {
        super('VALIDATIONS__AGE');

        this.test = value => value >= 0 && value <= 130 && !_.isNaN(value);
    }
}

class Regex extends AbstractRule {
    constructor() {
        super('');

        this.test = (value, rule) => {
            const matches = (value + '').match(new RegExp(rule));
            return matches && matches.length > 0;
        };
    }
}

class Min extends AbstractRule {
    constructor() {
        super('VALIDATIONS__MIN');

        this.test = (value, min) => value >= min;
    }
}

class Max extends AbstractRule {
    constructor() {
        super('VALIDATIONS__MAX');

        this.test = (value, max) => value <= max;
    }
}

class Integer extends AbstractRule {
    constructor() {
        super('VALIDATIONS__INTEGER');

        this.test = value => String(parseInt(value, 10)) === String(value);
    }
}

class Positive extends AbstractRule {
    constructor() {
        super('VALIDATIONS__POSITIVE');

        this.test = value => value >= 0;
    }
}

class GreaterThanZero extends AbstractRule {
    constructor() {
        super('VALIDATIONS__GREATER_THAN_ZERO');

        this.test = value => value > 0;
    }
}

class Between extends AbstractRule {
    constructor() {
        super('VALIDATIONS__BETWEEN');

        this.test = (value, min, max) => value >= min && value <= max;
    }
}

class Date extends AbstractRule {
    constructor() {
        super('VALIDATIONS__DATE');

        this.test = value => _.isEmpty(value) || moment(value, 'YYYY-MM-DD', true).isValid();
    }
}

class GreaterThanAge extends AbstractRule {
    constructor() {
        super('VALIDATIONS__ALIVE');

        this.test = (value, age) => value >= age;
    }
}

// Source https://gist.github.com/badsyntax/719800
const QTEXT = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
const DTEXT = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
const ATOM = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
const QUOTED_PAIR = '\\x5c[\\x00-\\x7f]';
const DOMAIN_LITERAL = '\\x5b(' + DTEXT + '|' + QUOTED_PAIR + ')*\\x5d';
const QUOTED_STRING = '\\x22(' + QTEXT + '|' + QUOTED_PAIR + ')*\\x22';
const SUB_DOMAIN = '(' + ATOM + '|' + DOMAIN_LITERAL + ')';
const WORD = '(' + ATOM + '|' + QUOTED_STRING + ')';
const DOMAIN = SUB_DOMAIN + '(\\x2e' + SUB_DOMAIN + ')*';
const LOCAL_PART = WORD + '(\\x2e' + WORD + ')*';
const ADDR_SPEC = LOCAL_PART + '\\x40' + DOMAIN;
const EMAIL_REGEX = '^' + ADDR_SPEC + '$';

class EmailRule extends AbstractRule {
    constructor() {
        super('INVALID_EMAIL_FORMAT');

        this.test = value => _.isEmpty(value) || new RegExp(EMAIL_REGEX).test(value);
    }
}

// Details : https://www.hackcanada.com/canadian/other/sin.html
class SinRule extends AbstractRule {
    constructor() {
        super('INVALID_SIN');

        this.test = (value) => {
            if(value === '' || value === '*** *** ***') {
                return true;
            }

            const sin = value.replace(/\s/g, '');
            if(sin.length !== 9) {
                return false;
            }

            const total =
                _.chain([1, 2, 1, 2, 1, 2, 1, 2, 1])
                    .map((factor, i) => {
                        let tmp = parseInt(sin.charAt(i), 10) * factor;
                        if(tmp >= 10) {
                            tmp -= 9;
                        }
                        return tmp;
                    })
                    .sum()
                    .value();

            return total > 0 && total % 10 === 0;
        };
    }
}


module.exports = {
    Required: new Required(),
    Numeric: new Numeric(),
    Age: new Age(),
    Regex: new Regex(),
    Min: new Min(),
    Max: new Max(),
    Integer: new Integer(),
    Positive: new Positive(),
    GreaterThanZero: new GreaterThanZero(),
    Between: new Between(),
    Date: new Date(),
    GreaterThanAge: new GreaterThanAge(),
    Sin: new SinRule(),
    Email: new EmailRule()
};
