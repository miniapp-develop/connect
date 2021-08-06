Page({
    data: {
        parentActive: {
            active: 't1'
        },
        ancestorActive: 't3'
    },
    onLoad() {

    },
    onTapShowChild1(e) {
        this.setData({
            parentActive: {
                active: 't1'
            }
        });
    },
    onTapShowChild2(e) {
        this.setData({
            parentActive: {
                active: 't2'
            }
        });
    },
    onTapShowChild3(e) {
        this.setData({
            ancestorActive: 't3'
        });
    },
    onTapShowChild4(e) {
        this.setData({
            ancestorActive: 't4'
        });
    }
});
