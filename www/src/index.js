import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Panel, ButtonGroup, Button } from 'react-bootstrap';

import { Input, CurrencyInput, PercentageInput, NumberInput } from '../../src/index';

import {
    VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_TEXT_VALUE
} from '../../src/utils/constants';

class MasterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: 'FR',
            normal: VALID_TEXT_VALUE,
            currency: VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
            percent: 100,
            number: VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE
        };
    }

    toggleLang = (value) => {
        this.setState({ locale: value });
    }

    handleChange(path, e) {
        const target = {};
        target[path] = e.target.value;
        this.setState(target);
    }

    render() {
        const {
            locale,
            currency,
            normal,
            percent,
            number
        } = this.state;
        const fr_active = locale === 'FR';
        const en_active = locale === 'EN';
        return (
            <Grid>
                <Row>
                    <h2>React-input playground</h2>
                </Row>
                <Row>
                    <ButtonGroup>
                        <Button
                            bsStyle={fr_active ? 'primary' : 'default'}
                            active={fr_active}
                            onClick={() => this.toggleLang('FR')}
                        >
                            Français
                        </Button>
                        <Button
                            bsStyle={en_active ? 'primary' : 'default'}
                            active={en_active}
                            onClick={() => this.toggleLang('EN')}
                        >
                            English
                        </Button>
                    </ButtonGroup>
                </Row>
                <br />
                <Row xs="2" md="4">
                    <Panel header="HTML stock input">
                        <input />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Normal input">
                        <Input
                            locale={locale}
                            value={normal}
                            onChange={e => this.handleChange('normal', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Number input (TODO: add selectors on the right side to mimic html native inputs type='number')">
                        <NumberInput
                            locale={locale}
                            value={number}
                            onChange={e => this.handleChange('number', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Currency input">
                        <CurrencyInput
                            locale={locale}
                            value={currency}
                            onChange={e => this.handleChange('currency', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Percentage input">
                        <PercentageInput
                            locale={locale}
                            value={percent}
                            onChange={e => this.handleChange('percent', e)}
                        />
                    </Panel>
                </Row>
            </Grid>
        );
    }
}

render(
    <MasterComponent />,
    document.getElementById('app')
);
