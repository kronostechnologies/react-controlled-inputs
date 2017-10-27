import { describe, it } from 'mocha';
import { expect } from 'chai';
import formatter from '../../src/utils/formatter';

import {
    EN, FR,
    VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_FR_FORMATTED_THOUSAND_MONEY_VALUE,
    VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_EN_FORMATTED_THOUSAND_MONEY_VALUE,
    VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING,
    VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_UNFORMATTED_NUMERIC_STRING,
    VALID_UNFORMATTED_NUMERIC_VALUE,
    VALID_EN_FORMATTED_MONEY_VALUE,
    VALID_FR_FORMATTED_MONEY_VALUE
} from '../../src/utils/constants';

describe('Formatter ::', () => {
    describe('formatMoney', () => {
        describe('(EN)', () => {
            const f = new formatter(EN);

            it('should display the dollar sign as the first character', () => {
                expect(f.formatMoney(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_NUMERIC_STRING)).to.be.equal(VALID_EN_FORMATTED_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_MONEY_VALUE);
            });
        });

        describe('(FR)', () => {
            it('should display the dollar sign as the last character', () => {
                expect(f.formatMoney(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_NUMERIC_STRING)).to.be.equal(VALID_FR_FORMATTED_MONEY_VALUE);
                expect(f.formatMoney(VALID_UNFORMATTED_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_MONEY_VALUE);
            });
        });
    });
});
