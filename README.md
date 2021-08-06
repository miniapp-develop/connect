# miniapp connect

a helper to connect miniapp custom components.

## install

    npm install @mini/connect

## demo

1. create a connector

```javascript

import {connectParentChildren} from '../libs/index';

export const {parent, child} = connectParentChildren();


```

create a parent:

```javascript
import {parent} from '../pc';

parent({}, Component);

```
create a child:


```javascript

import {child} from '../pc';

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
        onRelativeChanged({active}) {
            console.log('child onRelativeChanged', active);
            this.setData({
                show: active === this.data.tag
            });
        }
    }
}, Component);


```

use in page

```html

<view>
    <view>
        <button bind:tap="onTapShowChild1">show child 1</button>
        <button bind:tap="onTapShowChild2">show child 2</button>
        <parent state="{{parentActive}}">
            <child tag="t1">child 1</child>
            <child tag="t2">child 2</child>
        </parent>
        <parent state="{{parentActive}}">
            <view>
                <child tag="t1">child 1</child>
                <child tag="t2">child 2</child>
            </view>
        </parent>
    </view>
</view>
```
