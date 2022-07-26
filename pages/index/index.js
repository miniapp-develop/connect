Page({
    data: {
        active: 't1',
    },
    onLoad() {

    },
    onTapShowChild1(e) {
        this.setData({
            active: 't1'
        });
    },
    onTapShowChild2(e) {
        this.setData({
            active: 't2'
        });
    }
});
