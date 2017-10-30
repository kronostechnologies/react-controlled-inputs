import { describe, it } from 'mocha';
import { expect } from 'chai';
import formatter from '../../src/utils/formatter';

import {
    EN, FR,
    VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_FR_FORMATTED_THOUSAND_CURRENCY_VALUE,
    VALID_FR_FORMATTED_CURRENCY_DECIMAL_VALUE,
    VALID_FR_FORMATTED_THOUSAND_DECIMAL_VALUE,
    VALID_FR_FORMATTED_CURRENCY_VALUE,
    VALID_FR_FORMATTED_NUMERIC_STRING,
    VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING,
    VALID_UNFORMATTED_THOUSAND_DECIMAL_VALUE,
    VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_UNFORMATTED_NUMERIC_STRING,
    VALID_UNFORMATTED_NUMERIC_VALUE,
    VALID_EN_FORMATTED_NUMERIC_STRING,
    VALID_EN_FORMATTED_CURRENCY_VALUE,
    VALID_EN_FORMATTED_CURRENCY_DECIMAL_VALUE,
    VALID_EN_FORMATTED_THOUSAND_CURRENCY_VALUE,
    VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_EN_FORMATTED_THOUSAND_DECIMAL_VALUE
} from '../../src/utils/constants';

describe('Formatter ::', () => {
    describe('formatNumber', () => {
        describe('(EN)', () => {
            const f = new formatter(EN);

            it('should correctly format the value', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_NUMERIC_STRING);
            });

            it('should correctly format numbers recieved as string', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_UNFORMATTED_NUMERIC_STRING)).to.be.equal(VALID_EN_FORMATTED_NUMERIC_STRING);
            });

            it('should correctly format values > 1000 with a separator', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE);
            });

            it('should correctly handle decimals format', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_DECIMAL_VALUE)).to.be.equal(VALID_EN_FORMATTED_THOUSAND_DECIMAL_VALUE);
            });
        });

        describe('(FR)', () => {
            const f = new formatter(FR);

            it('should correctly format the value', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_NUMERIC_STRING);
            });

            it('should correctly format numbers recieved as string', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_NUMERIC_STRING)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_UNFORMATTED_NUMERIC_STRING)).to.be.equal(VALID_FR_FORMATTED_NUMERIC_STRING);
            });

            it('should correctly format values > 1000 with a separator', () => {
                expect(f.formatNumber(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_EN_FORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE);
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_NUMERIC_VALUE);
            });

            it('should correctly handle decimals format', () => {
                expect(f.formatNumber(VALID_UNFORMATTED_THOUSAND_DECIMAL_VALUE)).to.be.equal(VALID_FR_FORMATTED_THOUSAND_DECIMAL_VALUE);
            });
        });
    });

    describe('formatCurrency', () => {
        describe('(EN)', () => {
            const f = new formatter(EN);

            it('dollar sign should be in front of number', () => {
                const value = f.formatCurrency(VALID_UNFORMATTED_NUMERIC_VALUE);
                expect(value[0]).to.be.equal('$');
            });
        });

        describe('(FR)', () => {
            const f = new formatter(FR);

            it('dollar sign should be last character', () => {
                const value = f.formatCurrency(VALID_UNFORMATTED_NUMERIC_VALUE);
                expect(value[value.length - 1]).to.be.equal('$');
            });

            it('dollar sign should be preceded by a unicode non-breaking space', () => {
                const value = f.formatCurrency(VALID_UNFORMATTED_NUMERIC_VALUE);
                expect(value[value.length - 2]).to.be.equal('\u00A0');
            });
        });
    });

    describe('formatPercent', () => {
        const f = new formatter(FR);

        it('percent sign should be last character', () => {
            const value = f.formatPercent(VALID_UNFORMATTED_NUMERIC_VALUE);
            expect(value[value.length - 1]).to.be.equal('%');
        });
    });
});
