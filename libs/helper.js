import {preset} from './connect';

export const UiComponent = preset({
    externalClasses: ['ui-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^\$_/
    }
});
