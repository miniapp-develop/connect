import {preset} from "./helper";

function connect(high, low, propertyName = 'state') {
    const randKey = Math.random().toString();
    const highKey = 'high$' + randKey;
    const lowKey = 'low$' + randKey;

    const highBehavior = Behavior({
        properties: {
            [propertyName]: {
                type: Object,
                optionalTypes: [String],
                value: {}
            }
        },
        observers: {
            [propertyName]: function (state) {
                this.handleStateChanged(state);
            }
        },
        methods: {
            getRelative() {
                return this.getRelationNodes(lowKey);
            },
            getRelativeState() {
                return this.data[propertyName];
            },
            handleStateChanged(newState) {
                const children = this.getRelative();
                for (const child of children) {
                    child.onRelativeStateChanged(newState);
                }
            },
            notifyStateChanged(key, value) {
                if (typeof this.data.state === 'string') {
                    throw Error('string state do not support notifyStateChanged');
                }
                if (!key) {
                    throw Error('key is empty');
                }
                const newState = Object.assign({}, this.data.state, {[key]: value});
                this.setData({
                    [propertyName]: newState
                });
            }
        }
    });

    const lowBehavior = Behavior({
        methods: {
            getRelative() {
                return this.getRelationNodes(highKey)[0];
            },
            getRelativeState() {
                return null;
            },
            onRelativeStateChanged(state) {
                console.log('default onRelativeStateChanged', state);
            }
        }
    });

    const highComponent = preset({
        behaviors: [highBehavior],
        relations: {
            [lowKey]: {
                type: low,
                target: lowBehavior,
                linked(child) {
                    child.onRelativeStateChanged(this.getRelativeState());
                }
            }
        }
    });

    const lowComponent = preset({
        behaviors: [lowBehavior],
        relations: {
            [highKey]: {
                type: high,
                target: highBehavior
            }
        }
    });

    return {
        highComponent,
        lowComponent
    }
}

function connectParentChildren(propertyName) {
    const {highComponent, lowComponent} = connect('parent', 'child', propertyName);
    return {
        parent: highComponent,
        child: lowComponent
    }
}

function connectAncestorDescendant(propertyName) {
    const {highComponent, lowComponent} = connect('ancestor', 'descendant', propertyName);
    return {
        ancestor: highComponent,
        descendant: lowComponent
    }
}

export {
    preset,
    connectParentChildren,
    connectAncestorDescendant,
};