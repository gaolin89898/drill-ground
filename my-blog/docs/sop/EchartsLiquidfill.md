---
sticky: 1
---

# Echarts-Liquidfill

ECharts 中的 Liquidfill（液体填充图）是一种图表类型，用于直观地显示填充量与总量之间的比例关系。Liquidfill 图表通常用于展示百分比数据，通过液体的填充高度来表示数据的比例。你可以通过 ECharts 的 API 来创建和配置 Liquidfill 图表，以展示你的数据。

![图片](https://camo.githubusercontent.com/bc1949282b49799b3f11b0d7def8428b1f2a000b53112003bc91b01e7adfecc4/687474703a2f2f672e7265636f726469742e636f2f7a48654d71716c68346a2e676966)

## 安装

#### 通过 NPM

```sh
$ npm install echarts
$ npm install echarts-liquidfill
```

#### 通过 CDN 使用

```html
<script src="echarts.js"></script>
<script src="echarts-liquidfill.js"></script>
```

## 引入

```js
import * as echarts from "echarts";
import "echarts-liquidfill";
```

<!-- ## 基本用法

```js
const option = {
  series: [
    {
      type: "liquidFill",
      data: [0.6],
    },
  ],
};
```

![图片](https://camo.githubusercontent.com/a9f0968a7db8e810f8fcd87d5112cca156e3105b7ddfa5807f8866ac560607b6/687474703a2f2f672e7265636f726469742e636f2f52736a556c6f36394a4e2e676966)

## 多波纹

```js
const option = {
  series: [
    {
      type: "liquidFill",
      data: [0.6, 0.5, 0.4, 0.3],
    },
  ],
};
```

![图片](https://camo.githubusercontent.com/8807e83987fe4b8306c3717b6f8fb53392a3a143d720c96eb014876d7a3fde1a/687474703a2f2f672e7265636f726469742e636f2f484a337a334954717a4c2e676966)

## 颜色和不透明度 -->

## API

| 参数名     | 描述                                                                                                              | 类型              | 默认值                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| type       | chart 类型                                                                                                        | string            | 'liquidFill'                                 |
| data       | 数据                                                                                                              | (number,Object)[] | []                                           |
| color      | 颜色                                                                                                              | string[]          | ['#294D99', '#156ACF', '#1598ED', '#45BDFF'] |
| center     | 图表的位置。第一个值是 x 位置，第二个值是 y 位置。每个值可以是相对于容器宽度和高度的较小值的相对值,也可以是绝对值 | string[]          | ['50%', '50%']                               |
| radius     | 图表的半径，可以是相对于容器宽度和高度的较小值的相对值 '50%' ，也可以是绝对值 100px                               | string            | '50%'                                        |
| amplitude  | 波的振幅，以像素或百分比为单位。如果以百分比为单位，则与直径有关。                                                | number            | 8%                                           |
| waveLength | 波的波长，可以是相对于直径的相对值 '50%' ，也可以是绝对值                                                         | string,number     | 80%                                          |
| phase      |
