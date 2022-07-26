# miniapp connect

一个辅助管理小程序组件关系（parent/child, ancestor/descendant）的工具。

## Usage

1、安装

    npm install @mini/connect

2、创建一个关系

1. create a connector

```javascript
import {connectParentChildren} from '@mini/connect';

export const {parent, child} = connectParentChildren();

```

2、配置关系节点

父节点(parent.wxml, parent.js)

```javascript

parent({});

```

子节点(child.wxml, child.js)

```javascript

child({
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        tag: {
            type: String,
            value: ''
        }
    },
    methods: {
        onMiniChanged({active}) {
            console.log('child onRelativeStateChanged', active);
            this.setData({
                show: active === this.data.tag
            });
        }
    }
});

```

3、正常使用组件
```html
<parent mini-data="{{active}}">
    <child mini-data="t1" />
    <child mini-data="t2" />
</parent>
```
也可以直接导入查看 demo