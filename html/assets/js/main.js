//flexslider 
$(function() {
    var $bannerSlider = $('.block-banner .slider');
    if ($bannerSlider.find(".slides >li").length > 1) {
        $bannerSlider.flexslider({
            animation: "slide",
            animationSpeed: $bannerSlider.data('animation-speed') || 600,
            prevText: "",
            nextText: "",
            slideshowSpeed: 5000,
            pauseOnAction: false,
            start: function (slider) {
                $(".block-banner .flex-direction-nav").addClass("global-width-01");
                if (!$(".block-banner .flexslider .slides").length) {
                    $(".block-banner .flexslider").hide();
                }
            },
            after: function (slider) {
                if (!slider.playing) {
                    slider.play();
                }
            }
        });
    }

    var $ourStorySlider = $('.block-ourstory-item .slider');
    $ourStorySlider.flexslider({
        animation: "slide",
        animationSpeed: $bannerSlider.data('animation-speed') || 600,
        prevText: "",
        nextText: "",
        controlNav: false,
        slideshowSpeed: 5000,
        pauseOnAction: false,
        start: function(slider) {
            $('.block-ourstory-item .slides li').height($ourStorySlider.parents(".block-ourstory-item").height());
            if (!$(".block-ourstory-item .flexslider .slides").length) {
                $(".block-ourstory-item .flexslider").hide();
            }
        },
        after: function(slider) {
            if (!slider.playing) {
                slider.play();
            }
        }
    });
});
// change language
//$(".language-switcher a").click(function(){
//    $(this).addClass("active");
//    $(this).siblings("a").removeClass("active");
//});
// nav function
$(window).scroll(function() {
    var scrollHeight = 0;
    if($(".header").hasClass("full-screen")){
        $(".header").removeClass("fixed");
    }else{
        if ($(window).scrollTop() > scrollHeight) {
            $(".header").addClass("fixed");
        } else {
            $(".header").removeClass("fixed");
        }
    };
});
//shouw sub nav 
$("[data-show-nav]").click(function(){
    if($(this).attr("href")=="javascript:;"){
        $(".header").toggleClass("show-sub");
        $(".header [data-show-nav-menu='"+$(this).data("show-nav")+"']").toggle().siblings(".sub-nav").hide();
    }
});
if($("[data-show-nav]").hasClass("active")){
    $("[data-show-nav].active").attr("href","javascript:;");
    $(".header").addClass("show-sub");
    $(".header [data-show-nav-menu='"+$("[data-show-nav].active").data("show-nav")+"']").show();
}
//age check background height
if($(window).height()>$(".block-age-check").height()){
    $(".block-age-check").height($(window).height());
}
//date list function
function dataList(){
    var dayList = $("#day").siblings(".select-list"),
        monthList = $("#month").siblings(".select-list"),
        yearList = $("#year").siblings(".select-list");
    //    dayhtml='',
    //    monthhtml='',
    //    yearhtml='';

    //MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //MonName = ['Januari','Februari','Maart','April','Mei','Juni','Juli','Augustus','September','Oktober','November','December'];
    //var n = MonHead[new Date().getMonth()]; 
    //var y  = new Date().getFullYear();  

    //for (var i=1900;i<=2016;i++) {
    //    yearhtml +='<li>'+i+'</li>';
    //}
    //yearList.find("ul").html(yearhtml);
 
    //for (var i=0;i<12; i++){   
    //    monthhtml +='<li>'+MonName[i]+'</li>';
    //}
    //monthList.find("ul").html(monthhtml);

    writeDay(31);

    function changeDay(){
        if(jQuery.inArray($("#month input").val(), MonName)==-1||$("#year input").val()==""){
            return false;
        }
        if(jQuery.inArray($("#month input").val(), MonName) ==1){
            if(IsPinYear($("#year input").val())){
                n=29;
            }else{
                n=28;
            }
        }else{
            n=MonHead[jQuery.inArray($("#month input").val(), MonName)];
        }
        writeDay(n);
    };

    $("#month input,#year input").keyup(function(){
        changeDay();
    });

    function writeDay(n){  
        //dayhtml='';
        //for (var i=1; i<=n; i++){
        //    if(i<10){
        //        i="0"+i;
        //    }
        //    dayhtml +='<li>'+i+'</li>';
        //};
        //dayList.find("ul").html(dayhtml);
        controlSelect();
    };
    function IsPinYear(year){
        return(0 == year%4 && (year%100 !=0 || year%400 == 0));
    };
    $("[data-control-select] li").on("click", function () {
        changeDay();
    });
};
/*if($("[data-date-list]").length){
  dataList();  
}*/
//select:li
$("[data-control-select] .select-head").on("click", function () {
    $(this).next(".select-list").slideToggle();
    $(this).parent().toggleClass("open");
    $(this).parents(".form-col").siblings().find(".select-list").hide();
    $(this).parents(".form-col").siblings().find(".control-select").removeClass("open");
});
function controlSelect(){
    $("[data-control-select] li").on("click", function () {
        $(this).parents(".select-list").hide();
        $(this).parents("[data-control-select]").removeClass("open");
        var $input = $(this).parents(".control-select").find(".select-head input");
        $input.val($(this).text());

        if (typeof controlSelectExtension == "function")
        {
            controlSelectExtension($input, $(this).text(), $(this));
        }
    });  
};
controlSelect();
$(document).click(function(e){
  if($(e.target).attr("class")=="select-head"||($(e.target).is('input')&&$(e.target).parent().hasClass("select-head"))) return false;
  $("[data-control-select]").removeClass("open");
  $("[data-control-select] .select-list").hide();  
});

//age check function
function ageCheck(){
      var dayVal = $("#day input").val();
     /* var monthVal = jQuery.inArray($("#month input").val(), MonName);*/
      var monthVal= $("#month input").val()-1;
      var yearVal = $("#year input").val();
      var age = 18;
      if($.trim(dayVal)==""||$.trim(monthVal)==""||$.trim(yearVal)==""){
        alert("Sorry, please check date");
        return false;
      }
      var mydate = new Date();
      mydate.setFullYear(yearVal, monthVal, dayVal);
     
      var currdate = new Date();
      currdate.setFullYear(currdate.getFullYear() - age);
      if ((currdate - mydate) < 0){
        alert("Sorry, only persons over the age of " + age + " may enter this site");
        return false;
      }
};

//search map funtcion
/*$("[data-search-map]").click(function(){
   $("[data-search-map-result]").toggleClass("show");
   $("[data-search-map-result]").siblings(".map").toggleClass("show");
});*/
//ourstory nav function
$("[data-ourstory-scroll]").click(function(){
    $("body,html").animate({ scrollTop: $("#"+$(this).data("ourstory-scroll")).offset().top}, "1000");
});
//faq function
$("[data-faq-list] .item dt").click(function(){
    $(this).parents(".item").toggleClass("show");
});
//flashmessageSuccess className="warning" or "success"
function flashmessageError(msg){
    setTimeout(function(){
        $(".js-flashmessage-warning").removeClass("warning").addClass("hidden");
    },6000);
    $(".js-flashmessage-warning").html(msg).removeClass("hidden").addClass("warning");
};

function flashmessageSuccess(msg) {
    setTimeout(function () {
        $(".js-flashmessage-success").removeClass("success").addClass("hidden");
    }, 6000);
    $(".js-flashmessage-success").html(msg).removeClass("hidden").addClass("success");
};
// mobile menu click
$("[js-mobile-button]").click(function(){
    $(this).toggleClass("active");
    $(".header").toggleClass("full-screen");
});

// The calendar control
$(".control-input-date").fdatepicker({
    format: 'dd-mm-yyyy hh:ii:ss',
    disableDblClickSelection: true,
    pickTime: true
});

// "kijken" lightbox function
$(function(){
    var lightboxArray=[];
    var lightbox;
    $(".lightbox-images img").each(function(){
       lightboxArray.push({'source': $(this).attr("src"), 'type':'image'});
    }); 
    lightbox = UIkit.lightbox.create(lightboxArray);
    $("[data-lightbox-show]").click(function(){
        lightbox.show();
    });
});
//customize-checkbox
$('input[type="checkbox"]').wrap('<div class="customize-checkbox-wrapper"><i class="icomoon icon-checked"></i></div>');
$(".customize-checkbox-wrapper").on("click", function (){
    var $wrapper = $(this);
    if($wrapper.hasClass("checked")){
        $wrapper.removeClass("checked")
        $(this).find('input[type="checkbox"]').attr('checked', false);
    }
    else{
        $wrapper.addClass("checked");
        $(this).find('input[type="checkbox"]').attr('checked', true);
    }
});
$('.customize-checkbox-wrapper input:checked').parents(".customize-checkbox-wrapper").addClass('checked');
// age-check-pop
$(function() {
    if ($(".mod-pop.block-age-check").length) {
        var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        $("body,html").css({"overflow":"hidden","height":"100%"});
       /* $(".mod-pop-overlay").get(0).addEventListener('touchmove',function(event){
            event.preventDefault();
        });*/
        var _pop = $(".mod-pop.block-age-check");
        _pop.css("height", "auto");
        if (screenWidth > 767) {
            _pop.css({
                "left": "50%",
                "top": "50%",
                "margin-top": -_pop.innerHeight() / 2 + $(document).scrollTop(),
                "margin-left": -_pop.innerWidth() / 2,
            });
        } else {
            _pop.css({
                "left": 0,
                "right": 0,
                "top": "50%",
                "margin-top": -_pop.innerHeight() / 2 + $(document).scrollTop(),
                "margin-left": 0
            });
        }
    }
});
