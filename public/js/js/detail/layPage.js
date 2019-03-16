function LayPage(n) {
    this.container = $(".content");
    this.flag = true;
    this.count = n;
    this.init();
}

LayPage.prototype = {
    init() {
        this.createDom();
    },
    createDom() {
        this.config()
    },
    config() {
        layui.use('laypage', $.proxy(this.handleLaypage, this));
    },
    handleLaypage() {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'page',
            count:  this.count,
            limit: 2,
            groups: 2,
            prev: "上一页",
            next: "下一页",
            jump: $.proxy(this.handlepageCb, this)
        });

    },
    handlepageCb(obj) {
        if(!this.flag){
            new JobList().getList(obj.curr,obj.limit);
        }
       
        this.flag = false;
       
    }
}