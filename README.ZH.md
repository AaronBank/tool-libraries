<h1 style="font-size: 40px;color: #222; text-align: center">tool-libraries</h1>
<div align="center" style="display:flex;justify-content: center;">
  <a href="https://github.com/AaronBank/tool-libraries"><img style="width: 160px;height:160px;border-radius:80px;" src="https://raw.githubusercontent.com/AaronBank/static-files/master/images/tool-logo.jpg" alt="tool-libraries"></a>
</div>

<div align="center">
  <br />
  <a href="https://github.com/AaronBank/tool-libraries/blob/master/README.ZH.md">中文文档</a>
  <a href="https://github.com/AaronBank/tool-libraries/blob/master" style="margin-left: 12px;">英文文档</a>
  <br /><br />
  <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
  <img src="https://img.shields.io/badge/npm-v6.4.1-blue.svg" style="margin-left: 12px;"/>
  <img src="https://img.shields.io/badge/build-finished-brightgreen.svg" style="margin-left: 12px;"/>
</div>

### 使用

##### 下载安装

```javascript
npm install tool-libraries
// or
yarn add tool-libraries
```

##### 使用

```javascript
import {types} from 'tool-libraries'

const now = new Date()

types.typeof(now) // date

types.isDate(now) // true
```

更多详细文档请查看[tool-libraries文档](https://www.kancloud.cn/tool-libraries/tool-libraries/1081053)

---

### 实现方法按需引入

##### 安装

```javascript
  yarn add babel-plugin-library -D
  // or
  npm install babel-plugin-library -D

```

##### 配置

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
更多详细信息请查看[babel-plugin-library](https://github.com/AaronBank/babel-plugin-library)

--- 

### 写给开发者

> 为了兼容按需引入功能，每个文件必须存在默认导出，每个功能竟可能拆分为单个文件，这样有助于帮助引入时进行拆分。


## Licence ##
**MIT**