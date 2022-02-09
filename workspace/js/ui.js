
// 
$(function(){
    scrollCheck();    
});
function scrollCheck(){
    var lastScrollTop = 0;
    $('.container').on('scroll' , function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            console.log('down')
        } else {
            console.log('up')
        }
        lastScrollTop = st;
    });
}
