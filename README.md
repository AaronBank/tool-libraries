<h1 align="center">tool-libraries</h1>
<div align="center">
  <a href="https://github.com/AaronBank/tool-libraries"><img width="160" src="https://raw.githubusercontent.com/AaronBank/static-files/master/images/tool-logo.jpg" alt="tool-libraries"></a>
</div>

<div align="center">
  <br />
  <a href="https://github.com/AaronBank/tool-libraries/blob/master/README.ZH.md">Chinese</a> |
  <a href="https://github.com/AaronBank/tool-libraries/blob/master">English</a>
  <br /><br />
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/> 
  <img src="https://img.shields.io/badge/npm-v6.4.1-blue.svg" /> 
  <img src="https://img.shields.io/badge/build-finished-brightgreen.svg"/>
</div>

### Use

##### Install

```javascript
npm install tool-libraries
// or
yarn add tool-libraries
```

##### Sample

```javascript
import {types} from 'tool-libraries'

const now = new Date()

types.typeof(now) // date

types.isDate(now) // true
```

See the [tool-libraries documentation](https://www.kancloud.cn/tool-libraries/tool-libraries/1081053) for more details.

---

### Introduced on demand

##### Install

```javascript
  yarn add babel-plugin-library -D
  // or
  npm install babel-plugin-library -D

```

##### Configuration

- `.babelrc`

```json
{
  "plugins": [
    [
      "babel-plugin-library",
      {"libraryName": "tool-libraries"}
    ]
  ]
}
```

- `webpack`

```javascript
module: {
  rules: [{
    test: /\.js$/,
    loader: "babel-loader",
  }]
}
```
See the [babel-plugin-library](https://github.com/AaronBank/babel-plugin-library) for more details.

--- 

### Developer

> In order to be compatible with the on-demand feature, each file must have a default export, and each function may be split into a single file, which helps to facilitate splitting when it is introduced.


## Licence ##
**MIT**