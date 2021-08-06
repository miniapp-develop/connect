import _Component from '../_Component';
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
        onRelativeStateChanged({active}) {
            console.log('child onRelativeStateChanged', active);
            this.setData({
                show: active === this.data.tag
            });
        }
    }
}, _Component);
