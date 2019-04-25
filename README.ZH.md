<h1 style="font-size: 40px;color: #222; text-align: center">daling-libraries </h1>
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
  <img src="https://img.shields.io/badge/build-unfinished-brightgreen.svg" style="margin-left: 12px;"/>
</div>


> 开发中。。。

### 关于开发者

- 为了兼容按需引入功能，每个文件必须存在默认导出，每个功能竟可能拆分为单个文件，这样有助于帮助引入时进行拆分。

- 打包步骤

```
# ts转js

yarn compile

# 编译单个文件

yarn build
```

### 关于使用者
- 下载安装

```
yarn add daling-libraries -d
```

- 使用

```javascript
import {types} from 'daling-libraries'

const now = new Date()

types.typeof(now) // date

types.isDate(now) // true
```



## Licence ##
**MIT**