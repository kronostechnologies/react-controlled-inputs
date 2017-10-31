import React from 'react';
import chai, { expect } from 'chai';
import 'jsdom-global/register';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { afterEach, beforeEach, describe, it } from 'mocha';
import chaiEnzyme from 'chai-enzyme';
import JSDOM_G from 'jsdom-global';

import {
    Input,
    CurrencyInput
} from '../../src/index';

import {
    EN, FR,
    VALID_UNFORMATTED_NUMERIC_VALUE,
    VALID_UNFORMATTED_NUMERIC_STRING, // Since we can't efficiently retrieve the input's value as an actual number
    VALID_FR_FORMATTED_CURRENCY_VALUE,
    VALID_EN_FORMATTED_CURRENCY_VALUE,
    VALID_TEXT_VALUE
} from '../../src/utils/constants';

chai.use(chaiEnzyme());

let cleanup;
let txt_input;
let num_input;
let txt_wrappper;
let num_wrapper;
const dummyChange = () => {};

beforeEach(() => {
    cleanup = () => JSDOM_G();
});

afterEach(() => cleanup());

describe('Inputs ::', () => {
    describe('Given any Input', () => {
        beforeEach(() => {
            txt_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
            txt_input = txt_wrappper.find('input').node;
        });

        it('when focusing, should select the entire value', (done) => {
            txt_input.focus();
            txt_wrappper.find('input').prop('onFocus')();
            setTimeout(() => {
                expect(txt_input.selectionStart).to.equal(0);
                expect(txt_input.selectionEnd).to.equal(txt_input.value.length);
                done();
            }, 0);
        });

        it('when typing, should call the onChange passed as props', () => {
            const spy = sinon.spy();
            txt_wrappper.setProps({ onChange: spy });
            txt_wrappper.find('input').prop('onChange')({ target: { value: VALID_UNFORMATTED_NUMERIC_VALUE } });

            expect(spy.callCount).to.be.equal(1);
            expect(txt_wrappper.state('value')).to.be.equal(VALID_UNFORMATTED_NUMERIC_VALUE);
        });

        it('when focusing, should call the onFocus passed as props if specified', () => {
            const spy = sinon.spy();
            txt_wrappper.setProps({ onFocus: spy });
            txt_wrappper.find('input').prop('onFocus')();

            expect(spy.callCount).to.be.equal(1);
            expect(txt_wrappper.state('focused')).to.be.true;
        });

        it('when leaving the input, should call the onBlur passed as props if specified', () => {
            const spy = sinon.spy();
            txt_wrappper.setProps({ onBlur: spy });
            txt_wrappper.find('input').prop('onBlur')();

            expect(spy.callCount).to.be.equal(1);
            expect(txt_wrappper.state('focused')).to.be.false;
        });

        it('container, should have the correct className and id', () => {
            txt_wrappper.setProps({ className: 'testing', id: 'testing-id' });

            expect(txt_wrappper.find('div').hasClass('react-input-container')).to.be.true;
            expect(txt_wrappper.find('div')).prop('id').to.equal('testing-id-container');
        });

        it('should have the correct className and id', () => {
            txt_wrappper.setProps({ className: 'testing', id: 'testing-id' });

            expect(txt_wrappper.find('input').prop('className')).to.equal('testing');
            expect(txt_wrappper.find('input').prop('id')).to.equal('testing-id');
        });
    });

    describe('Given a regular Input', () => {
        beforeEach(() => {
            num_wrapper = mount(<Input value={VALID_UNFORMATTED_NUMERIC_VALUE} onChange={dummyChange} />);
            txt_wrappper = mount(<Input value={VALID_TEXT_VALUE} onChange={dummyChange} />);
            num_input = num_wrapper.find('input').node;
            txt_input = txt_wrappper.find('input').node;
        });

        it('when focused, should display the actual value', () => {
            num_wrapper.find('input').prop('onFocus')();
            num_input.focus();
            txt_input.focus();

            expect(num_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            expect(txt_input.value).to.equal(VALID_TEXT_VALUE);
        });

        it('when not focused, should display the actual value', () => {
            expect(num_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            expect(txt_input.value).to.equal(VALID_TEXT_VALUE);
        });
    });

    describe('Given a Currency Input', () => {
        describe('(EN), ', () => {
            beforeEach(() => {
                num_wrapper = mount(<CurrencyInput value={VALID_UNFORMATTED_NUMERIC_VALUE} locale={EN} onChange={dummyChange} />);
                num_input = num_wrapper.find('input').node;
            });

            it('when focused, should display the actual value', () => {
                num_wrapper.find('input').prop('onFocus')();
                num_input.focus();

                expect(num_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            });

            it('when not focused, should display the correctly formatted number', () => {
                expect(num_input.value).to.equal(VALID_EN_FORMATTED_CURRENCY_VALUE);
            });
        });

        describe('(FR), ', () => {
            beforeEach(() => {
                num_wrapper = mount(<CurrencyInput value={VALID_UNFORMATTED_NUMERIC_VALUE} locale={FR} onChange={dummyChange} />);
                num_input = num_wrapper.find('input').node;
            });

            it('when focused, should display the actual value', () => {
                num_input.focus();
                num_wrapper.find('input').prop('onFocus')();

                expect(num_wrapper.state('focused')).to.be.true;
                expect(num_input.value).to.equal(VALID_UNFORMATTED_NUMERIC_STRING);
            });

            it('when not focused, should display the correctly formatted number', () => {
                expect(num_input.value).to.equal(VALID_FR_FORMATTED_CURRENCY_VALUE);
            });
        });
    });
});
