import React, { Component } from 'react';
import { render } from 'react-dom';
import { Grid, Row, Panel, ButtonGroup, Button } from 'react-bootstrap';

import { Input, MoneyInput } from '../../src/index';

import {
    VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE,
    VALID_TEXT_VALUE
} from '../../src/utils/constants';

class MasterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: 'FR',
            input_values: {
                normal: VALID_TEXT_VALUE,
                money: VALID_UNFORMATTED_THOUSAND_NUMERIC_VALUE
            }
        };
    }

    toggleLang = (value) => {
        this.setState({ lang: value });
    }

    render() {
        const { lang, input_values } = this.state;
        const fr_active = lang === 'FR';
        const en_active = lang === 'EN';
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
                            lang={lang}
                            value={input_values.normal}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Money input">
                        <MoneyInput
                            lang={lang}
                            value={input_values.money}
                        />
                    </Panel>
                </Row>
                <Row xs="2" md="4">
                    <Panel header="Percentage input">
                        
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
