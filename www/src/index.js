import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Panel, ButtonGroup, Button } from 'react-bootstrap';

import { Input, CurrencyInput, PercentageInput, NumberInput, formatter } from '../../src/index';

import {
    VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_TEXT_VALUE
} from '../../src/utils/constants';

const DEFAULT_LOCALE = formatter.getSupportedLocales().FR;

class MasterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: DEFAULT_LOCALE,
            normal: VALID_TEXT_VALUE,
            currency: VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
            percent: 100,
            number: VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE
        };

        this.formatter = new formatter(DEFAULT_LOCALE);
    }

    toggleLang = (value) => {
        this.formatter.locale = value;
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
                <Row style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>React-input playground</h2>
                    <div style={{ alignSelf: 'flex-end', marginTop: '-40px' }}>
                        <span>Formatting: </span>
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
                    </div>
                </Row>
                <br />
                <Row xs="2" md="4">
                    <Panel header={<h3>HTML stock input (for behavior comparison)</h3>}>
                        <input />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header={<h3>Normal input</h3>}>
                        <Input
                            locale={locale}
                            value={normal}
                            onChange={e => this.handleChange('normal', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header={<h3>Number input (TODO: add selectors on the right side to mimic html native inputs type='number')</h3>}>
                        <NumberInput
                            locale={locale}
                            value={number}
                            onChange={e => this.handleChange('number', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header={<h3>Currency input</h3>}>
                        <CurrencyInput
                            locale={locale}
                            value={currency}
                            onChange={e => this.handleChange('currency', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header={<h3>Percentage input</h3>}>
                        <PercentageInput
                            locale={locale}
                            value={percent}
                            onChange={e => this.handleChange('percent', e)}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header={<h3>Labels using the same formatter as the inputs (exposed as 'formatter' in the library)</h3>}>
                        <div><b>Un-formatted:</b> {'155000.15'}</div>
                        <br />
                        <div><b>formatNumber:</b> {this.formatter.formatNumber('155000.15')}</div>
                        <br />
                        <div><b>formatCurrency:</b> {this.formatter.formatCurrency('155000.15')}</div>
                        <br />
                        <div><b>formatPercent:</b> {this.formatter.formatPercent('155000.15')}</div>
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
