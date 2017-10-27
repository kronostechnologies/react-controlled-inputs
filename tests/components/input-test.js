import React from 'react';
import chai, { expect } from 'chai';
import 'jsdom-global/register';
import { mount } from 'enzyme';
// import sinon from 'sinon';
import { afterEach, before, beforeEach, describe, it } from 'mocha';
import chaiEnzyme from 'chai-enzyme';
import JSDOM_G from 'jsdom-global';

import {
    Input,
    MoneyInput
} from '../../src/index';

import {
    EN, FR,
    VALID_UNFORMATTED_NUMERIC_VALUE,
    VALID_UNFORMATTED_NUMERIC_STRING, // Since we can't efficiently retrieve the input's value as an actual number
    VALID_FR_FORMATTED_NUMERIC_VALUE,
    VALID_EN_FORMATTED_NUMERIC_VALUE,
    VALID_TEXT_VALUE
} from '../../src/utils/constants';

chai.use(chaiEnzyme());

let cleanup;
let text_input;
let numeric_input;
let text_wrappper;
let numeric_wrapper;
const dummyChange = () => {};

beforeEach(() => {
    cleanup = () => JSDOM_G();
});

afterEach(() => cleanup());

describe('Inputs ::', () => {
    describe('Given any Input', () => {
        beforeEach(() => {
            text_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
            text_input = text_wrappper.find('input').node;
        });

        it('when focusing, should select the entire value', () => {
            text_input.focus();
            text_wrappper.find('input').prop('onFocus')();
            setTimeout(() => {
                expect(text_input.selectionStart).to.equal(0);
                expect(text_input.selectionEnd).to.equal(text_input.value.length);
            }, 0);
        });
    });

    describe('Given a regular Input', () => {
        beforeEach(() => {
            numeric_wrapper = mount(<Input value={VALID_UNFORMATTED_NUMERIC_VALUE} onChange={dummyChange} />);
            text_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
            numeric_input = numeric_wrapper.find('input').node;
            text_input = text_wrappper.find('input').node;
        });

        it('when focused, should display the actual value', () => {
            numeric_wrapper.find('input').prop('onFocus')();
            numeric_input.focus();
            text_input.focus();

            expect(numeric_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            expect(text_input.value).to.equal(VALID_TEXT_VALUE);
        });

        it('when not focused, should display the actual value', () => {
            expect(numeric_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            expect(text_input.value).to.equal(VALID_TEXT_VALUE);
        });
    });

    describe('Given a Money Input', () => {
        describe('(EN), ', () => {
            beforeEach(() => {
                numeric_wrapper = mount(<MoneyInput value={VALID_UNFORMATTED_NUMERIC_VALUE} lang={EN} onChange={dummyChange} />);
                text_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
                numeric_input = numeric_wrapper.find('input').node;
                text_input = text_wrappper.find('input').node;
            });

            it('when focused, should display the actual value', () => {
                numeric_wrapper.find('input').prop('onFocus')();
                numeric_input.focus();

                expect(numeric_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            });

            it('when not focused, should display the correctly formatted number', () => {
                expect(numeric_input.value).to.equal(VALID_EN_FORMATTED_NUMERIC_VALUE);
            });
        });

        describe('(FR), ', () => {
            beforeEach(() => {
                numeric_wrapper = mount(<MoneyInput value={VALID_UNFORMATTED_NUMERIC_VALUE} lang={FR} onChange={dummyChange} />);
                text_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
                numeric_input = numeric_wrapper.find('input').node;
                text_input = text_wrappper.find('input').node;
            });

            it('when focused, should display the actual value', () => {
                numeric_input.focus();
                numeric_wrapper.find('input').prop('onFocus')();

                expect(numeric_wrapper.state('focused')).to.be.true;
                expect(numeric_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            });

            it('when not focused, should display the correctly formatted number', () => {
                expect(numeric_input.value).to.equal(VALID_FR_FORMATTED_NUMERIC_VALUE);
            });

            // it('if input contains ",", then should keep ","', () => {
                // const wrapper = mount(<PercentageInput onChange={dummy} value={'1,15'} />);

                // expect(wrapper).to.have.state('value').equal('1,15');
            // });
        });
    });
});
