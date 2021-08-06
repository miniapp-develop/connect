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
        onRelativeStateChanged(state) {
            console.log('descendant onRelativeStateChanged', state);
            this.setData({
                show: state === this.data.tag
            });
        }
    }
}, _Component);
