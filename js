//页面backToTop效果
$(window).on('keyup', function(e){
    if(e.keyCode === 84){
        window.scrollTo(0,0);
    }
});
var screenHeight = $(window).height();
var $backToTop = $('#backToTop');
$(window).on('scroll',function(){
    var st = $(document).scrollTop();
    if(st > screenHeight){
        $backToTop.addClass('show');
    }else{
        $backToTop.removeClass('show');
    }
});
$backToTop.on('click',function(){
    window.scrollTo(0,0);
    $backToTop.css('bottom','300px');
    setTimeout(function(){
        $backToTop.removeAttr('style');
    },500);
    return false;
});
