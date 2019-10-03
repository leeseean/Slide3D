# Slide3D
H5 3D手势切换界面
# 获取
## npm install slide3d
# 使用示例
见[https://codesandbox.io/s/slide3d-example-g4lfv](https://codesandbox.io/s/slide3d-example-g4lfv)
```
import Slide3D from '../src/index';

const innerDom = `
  <div class="slide-item" index="1">1</div>
  <div class="slide-item" index="2">2</div>
  <div class="slide-item" index="3">3</div>
`;

new Slide3D("#app", innerDom, 'className');
```
#### 参数说明
```
new Slide3D(挂载的dom节点, 滚动的内容, 自定义的css类名)
```