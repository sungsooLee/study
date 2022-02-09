
// 
$(function(){
    scrollCheck();    
});
function scrollCheck(){
    var lastScrollTop = 0;
    $('.container').on('scroll' , function(event){
        var st = $(this).scrollTop();
        st > lastScrollTop ? console.log('down') : console.log('up');
        lastScrollTop = st;
    });
}
