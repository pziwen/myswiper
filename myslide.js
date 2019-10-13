(function ($, window, document, undefined) {
    'use strict';
function slideShow(element,json,auto,time) {
    this.element = element;
    this.data = json;
    this.auto = auto || true;
    this.time = time || 400;
    this.current = 0;
    this.init();
}

slideShow.prototype = {
    constructor: slideShow, //初始化构造器
    init: function () {
        this.createHtml();
        this.bindEvent();
        this.autoLoop();
    },
    //创建页面元素
    createHtml: function () {
        var that = this;
        var imgArr = that.data,
            len = that.data.length,
            content = [],
            pointer = [],
            current = that.current;
        content.push("<a class='preBtn' id='preBtn'><</a>");
        content.push("<a class='nextBtn' id='nextBtn'>></a>");
        content.push("<ul class='slideUl'>");
        pointer.push("<ul class='pointerUl'>");
        for (var i = 0;i < len; i++){
            if (current != i){
                content.push("<li class='slideLi' data-index= "+ i +"><img src="+ imgArr[i].src +"></li>");
                pointer.push("<li data-index="+ i +"></li>");
            } else {
                content.push("<li class='slideLi img_show' data-index="+ i +"><img src="+ imgArr[i].src +"></li>");
                pointer.push("<li class='current' data-index="+ i +"></li>");
            }
        };
        pointer.push("</ul>");
        content.push("</ul>");
        that.element.html((content.concat(pointer)).join(''));
    },
    //绑定事件
    bindEvent: function () {
        var that = this;
        $(".slide").on('mouseenter',function () {  //鼠标进入事件
            clearInterval(that.timer);
            $("#preBtn").toggleClass("block");
            $("#nextBtn").toggleClass("block");
        });
        $(".slide").on('mouseleave',function () {  //鼠标离开事件
            that.autoLoop();
            $("#preBtn").toggleClass("block");
            $("#nextBtn").toggleClass("block");
        });
        that.element.on('click','.pointerUl li',function () {  //小圆点点击事件
            clearInterval(that.timer);
            that.current = $(this).data('index');
            that.loop();
        });
        that.element.on('click','#preBtn',function () {  //左箭头事件
            clearInterval(that.timer);
            that.current --;
            if (that.current < 0){
                that.current = that.data.length - 1;
            }
            that.loop();
        });
        $("#preBtn").on('mouseenter',function () {
            clearInterval(that.timer);
            $("#preBtn").animate({opacity:"0.4"},400);
            this.style.color = "#38b6ff";
        });
        that.element.on('mouseleave','#preBtn',function () {
            clearInterval(that.timer);
            $("#preBtn").stop(true);
            this.style.opacity = "";
            this.style.color = "";

        });
        that.element.on('click', '#nextBtn', function () {  //右箭头事件
            clearInterval(that.timer);
            that.current ++;
            if (that.current >= that.data.length){
                that.current = 0;
            }
            that.loop();
        });
        $("#nextBtn").on('mouseenter',function () {
            clearInterval(that.timer);
            $("#nextBtn").animate({opacity:"0.4"},400);
            this.style.color = "#38b6ff";
        });
        that.element.on('mouseleave','#nextBtn',function () {
            clearInterval(that.timer);
            $("#nextBtn").stop(true);
            this.style.opacity = "";
            this.style.color = "";

        });
    },
    //轮播
    loop: function () {
        var that = this;
        $(".slideLi").eq(that.current).toggleClass("img_show").fadeIn();
        $(".pointerUl li").eq(that.current).toggleClass("current");
        for (var i = 0; i < that.data.length; i++){
            if (that.current != i){
                $(".slideLi").eq(i).removeClass("img_show").fadeOut();
                $(".pointerUl li").eq(i).removeClass("current");
            }
        }
    },
    //自动轮播
    autoLoop: function () {
        var that = this;
        if (that.autoLoop) {  //判断是否启动自动轮播
            that.timer = setInterval(function () {
                that.current ++;
                if (that.current >= that.data.length){
                    that.current = 0;
                }
                that.loop();
            },that.time);
        }
    }
};
$.fn.slideshow = function (json,auto,time) {
    return new slideShow($(this),json,auto,time);
}
})(jQuery, window, document);