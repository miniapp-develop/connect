import _Component from '../_Component';
import {descendant} from '../ad';

descendant({
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
            console.log('descendant onRelativeStateChanged', active);
            this.setData({
                show: active === this.data.tag
            });
        }
    }
}, _Component);
