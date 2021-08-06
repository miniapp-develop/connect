function _array(val) {
    return val || [];
}

function _object(val) {
    return val || {};
}

function _concat(a, b) {
    return [].concat(_array(a)).concat(_array(b))
}

function _assign(a, b) {
    return Object.assign({}, _object(a), _object(b));
}

function preset(extra) {
    return function (options = {}, factory) {
        options.externalClasses = _concat(extra.externalClasses, options.externalClasses);
        options.behaviors = _concat(extra.behaviors, options.behaviors);
        options.options = _assign(_object(extra.options), _object(options.options));
        options.relations = _assign(_object(extra.relations), _object(options.relations));
        return factory(options);
    }
}

function connect(high, low) {
    const randKey = Math.random().toString();
    const highKey = 'high$' + randKey;
    const lowKey = 'low$' + randKey;

    const HIGH_STATE = 'state';

    const highBehavior = Behavior({
        properties: {
            [HIGH_STATE]: {
                type: Object,
                optionalTypes: [String],
                value: {}
            }
        },
        observers: {
            [HIGH_STATE]: function (state) {
                this.onStateChanged(state);
            }
        },
        methods: {
            getRelative() {
                return this.getRelationNodes(lowKey);
            },
            getRelativeState() {
                return this.data[HIGH_STATE];
            },
            onStateChanged(newState) {
                const children = this.getRelative();
                for (const child of children) {
                    child.onRelativeStateChanged(newState);
                }
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

function connectParentChildren() {
    const {highComponent, lowComponent} = connect('parent', 'child');
    return {
        parent: highComponent,
        child: lowComponent
    }
}

function connectAncestorDescendant() {
    const {highComponent, lowComponent} = connect('ancestor', 'descendant');
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