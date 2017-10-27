import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Sin } from '../../src/utils/validation/rules';

describe('Rules engine ::', () => {
    describe('Given a SIN', () => {
        const test_cases = [
            { sin: '111222333', valid: false },
            { sin: '111 222 333', valid: false },
            { sin: '131222333', valid: true },
            { sin: '338768997', valid: true },
            { sin: '33876899', valid: false },
            { sin: '338 768 997', valid: true }
        ];

        test_cases.forEach((test_case) => {
            it(`${test_case.sin} should be ${test_case.valid ? 'valid' : 'invalid'}`, () => {
                const result = Sin.test(test_case.sin);

                expect(result).to.be.equal(test_case.valid);
            });
        });
    });
});
