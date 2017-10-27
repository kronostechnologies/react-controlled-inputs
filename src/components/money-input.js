import React from 'react';
import Input from './input';

import {
    EN, FR
} from '../utils/constants';

class MoneyInput extends Input {
    format = (value) => {
        switch(this.props.lang) {
            case FR:
                return value + ' $';
            case EN:
            default:
                return '$' + value;
        }
    }
}

export default MoneyInput;
