# react-controlled-inputs
Controlled react inputs with built-in formatting and auto-validations. Currently handles localized formatting for:
* numbers
* percentage
* currency

The inputs are set to behave more like excel cells do. When an input is focused, it will initially select the entire range.

## TODOs
* Implement the ability to add validations to any input.
* Implement more UI knobs to play around with the inputs in the playground (`./www`)
* Add visual buttons on the right side of a number input (to mimic the actual `input type="text"`)
* Adapt the API and document the API to be more user-friendly (the API is still a wip)
* And more...

## Supported locales

For now, supported locales are:
* English
* French

If there is need for more, feel free to report an issue on the matter.

## Usage

Normal text input:
```js
import { Input } from 'react-input';

<Input value="myValue" locale="FR" />
```

Currency input:
```js
import { CurrencyInput } from 'react-input';

<CurrencyInput value="100" locale="FR" />
```

Percentage input:
```js
import { PercentageInput } from 'react-input';

<PercentageInput value="100" locale="FR" />
```
