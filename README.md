# react-input
jsx inputs adapted for form applications. Currently handles locale formatting for:
* numbers
* percentage
* currency

The inputs are set to behave more like excel cells do. When an input is focused, it will initially select the entire range.

TODO: Still left to implement is the ability to add validations to any input.

## Supported locales

For now, supported locales are:
* English
* French

If there is need for more, feel free to report an issue on the matter.

## Usage

Normal text input:
```js
import { Input } from 'react-input';

<Input value="100" locale="FR" />
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
