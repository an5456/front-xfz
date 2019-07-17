//面向对象
//添加属性：通过this关键字，绑定属性
//添加方法：Banner.prototype
// function Banner() {
//      //这里的代码相当于python中的__init__方法
//
//     console.log("hello world");
//     this.person = '知了1234';
//
// }
// Banner.prototype.greet = function (word) {
//     console.log('hello', word)
// };
//
//
//
// var banner = new Banner();
// console.log(banner.person);
// banner.greet('大家好');

function Banner() {
    this.bannerWidth = 798;
    this.bannerGroup = $("#banner-group");
    this.index = 1;
    this.leftArrow = $(".left-arrow");
    this.rightArrow = $(".right-arrow");
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.pageControl = $(".page-control");

}

//banner左右箭头的显示
Banner.prototype.toggleArrow = function(isShow){
    if(isShow){

        this.leftArrow.show();
        this.rightArrow.show();
    }
    else {
        $('.left-arrow').hide();
        $(".right-arrow").hide();

    }
    // $(".left-arrow").toggle();
    // $(".right-arrow").toggle();

};

//banner滑动
Banner.prototype.animate = function(){
    var self = this;
    this.bannerUl.animate({"left":-798*self.index},2000);
    var index = self.index;
    if(index === 0){
        index = self.bannerCount-1;
    }else if(index === self.bannerCount+1){
        index = 0;
    }else {
        index = self.index - 1;
    }
    //eq:代表获取列表签中的第几个
    self.pageControl.children('li').eq(index).addClass("active").siblings().removeClass("active");
};

//动态添加banner中的小圆点
Banner.prototype.initPageControl = function(){
    var self = this;
    for (var i=0; i<self.bannerCount; i++){
        var circle = $("<li></li>");
        self.pageControl.append(circle);
        if(i === 0){
            circle.addClass("active");
        }
    }
    //console.log(self.bannerCount);
    self.pageControl.css({"width":self.bannerCount*12 + 8*2 + 16*(self.bannerCount)});
    console.log(self.bannerCount-1)
};

//点击小圆点时，小圆点背景颜色的变化
Banner.prototype.listenPageControl = function(){
  var self = this;
  self.pageControl.children("li").each(function (index, obj) {
      // console.log(index);
      // console.log(obj);
      // console.log("=======");
      $(obj).click(function () {
          self.index = index+1;
          // console.log(self.index);
          self.animate();

      });

  })
};

//动态设置banner中小圆点的宽度
Banner.prototype.initBanner = function(){
    var self = this;

    var firstBanner = self.liList.eq(0).clone();
    var lastBanner = self.liList.eq(self.bannerCount-1).clone();
    self.bannerUl.append(firstBanner);
    self.bannerUl.prepend(lastBanner);//prepend添加到元素的第一个位置
    this.bannerUl.css({"width":self.bannerWidth*(self.bannerCount+2),'left':-self.bannerWidth});


};



//点击轮播图左右箭头
Banner.prototype.listenArrowClick = function(){
    var self = this;
    self.leftArrow.click(function () {
        if(self.index === 0){
            self.bannerUl.css({"left":-self.bannerCount*self.bannerWidth});
            self.index = self.bannerCount - 1;
        }else {

            self.index--;
        }
        self.animate();
    });

    self.rightArrow.click(function () {
        if(self.index === self.bannerCount + 1){
            self.bannerUl.css({'left':-self.bannerWidth});
            self.index = 2;
        }else {
            self.index++;
        }
         self.animate();
    })
};


Banner.prototype.listenBannerHover = function(){
    var self = this;
    this.bannerGroup.hover(function () {
        //第一个函数是把鼠标移动到banner上回执行函数
        clearInterval(self.timer);
        self.toggleArrow(true);
    },
        function () {
    //    第二个函数是把鼠标从banner上移走时执行的函数
        self.loop();
        self.toggleArrow(false);

    })
};


Banner.prototype.loop = function(){
    var self = this;
    // var bannerUl = $("#banner-ul");
        //serInterval时间设置循环
        self.timer = setInterval(function () {

            if (self.index >=self.bannerCount+1){
                self.bannerUl.css({"left":-self.bannerWidth});
                self.index = 2;
            }else {
                self.index++;
            }
           self.animate();

        },3000 );
};

//主运行程序
Banner.prototype.run = function () {
        this.listenArrowClick();
        this.loop();
        this.initPageControl();
        this.initBanner();
        this.listenBannerHover();
        this.listenPageControl();

};

$(function () {
    var banner = new Banner();
    banner.run();
});