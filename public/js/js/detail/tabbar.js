function TabBar() {
    this.aLi = $(".tabbar>ul>li");
    this.init();
}


TabBar.prototype = {
    init() {
        this.TabBarClick();
    },
    TabBarClick() {
        this.aLi.on("click", $.proxy(this.handleTabCb))
    },
    handleTabCb() {
        $(this).addClass("active").siblings().removeClass("active");
        switch ($(this).index()) {
            case 0: location = "../../../html/detail.html"
                break;
            case 1:
                    new JobList().getList();
                break;
            case 2:
                new Job();
                break;
        }
    }
}

new TabBar();
