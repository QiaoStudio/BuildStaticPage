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
