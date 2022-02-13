/* ----------------------------------------*/
/* common ui                               */
/* ----------------------------------------*/

$(window).on('load', function(){
    if($('.select-box-bg').length){
      $('.select-box-bg select').trigger('change');
    }
  
    var allMenuSwiper = new Swiper(".all-menu .slide-img-banner", slideSetting);
  
    scrollTab();
  
    if($('.inp-clear').length){
      inpClear();
    }
  
    $('.floating-box').css('opacity','1');
  
    if($('.contents .btn-wrap-fixed').length){
      $('.floating-box').addClass('fixed-top');
    }
   
  });
  
  /*tooltip*/
  $(document).on('click', '.tooltip .btn-tooltip', function(){
    var $this = $(this);
    tooltip($this);
  });
  
  $(document).on('click', '.tooltip .btn-close', function(){
    var $this = $(this);
    tooltipClose($this);
  });
  
  $('html, body').on('touchmove', function(){
    tooltipClose($('.tooltip .btn-close'));
  });
  
  function tooltip($this){
    var $tooltipWrap = $this.next('.tooltip-wrap'),
        winWid = window.innerWidth,
        posX = $this.offset().left,      
        wSpace = 50;
  
    if($tooltipWrap.is(':hidden')){
      $('.tooltip-wrap').removeAttr('style').hide();
      $tooltipWrap.css({
        width : winWid - wSpace * 2,
        left : - (posX - wSpace) + 'px'
      }).show();
  
      
    }else{
      $tooltipWrap.removeAttr('style').hide();
    }
  
  }
  
  function tooltipClose($this){
    $this.closest('.tooltip-wrap').removeAttr('style').hide();
  }
  
  /*toggle*/
  $(document).on('click', '.toggle-btn', function(){ 
    if(!$(this).parents().find('.pre-order-wrap').length && !$(this).prev('.questions').length){
      if(!$(this).hasClass('open')){
        toggleOpen($(this));
      }else{
        toggleClose($(this));
      }
    }
  });
  
  function toggleOpen($item){
    $item.addClass('open').find('span').text('�リ린');
    $item.parent().next('.toggle-panel').show();
  }
  function toggleClose($item){
    $item.removeClass('open').find('span').text('�닿린');
    $item.parent().next('.toggle-panel').hide();
  }
  
  
  function accClose(){
    $('.pre-order-wrap .toggle-btn').removeClass('open').find('span').text('�닿린').closest('li').removeClass('active');
  }
  
  
  function accOpen($item){
    var $this = $($item);
  
    if(!$this.hasClass('open')){
      accClose()
      $this.addClass('open').find('span').text('�リ린').closest('li').addClass('active');
    }else{
      accClose();
    }
  }
  
  
  function dataValue($target,$item){
    var $this = $($item),
        $target = $("[data-value=" + $target +"]"),
        checkVal = $this.next().text();
  
    $target.text(checkVal);
    accClose();
    $target.parents('li').next().find('.toggle-btn').trigger('click');
  }
  
  function btnDel($item){
    var $this = $($item),
    $target = $this.closest('li');
    $target.remove();
  
  }
  
  
  /*tab*/
  $(document).on('click', '.tab-wrap li, .cate-tab-wrap li, .modal-wrap-cont .submenu-tab-wrap li, .my-con-tab li', function(){
    var $this = $(this),
        tabIdx = $this.index(),
        $tabCont = $this.closest('div').next('.tab-cont-wrap');
      $this.siblings().removeClass('active');
      $this.addClass('active');
      $('.tab-cont' ,$tabCont).hide();
      $('.tab-cont' ,$tabCont).eq(tabIdx).show();
      $('.modal-wrap-cont').scrollTop(0);
      boxCol();
      
    return false;
  });
  
  function scrollTab(){
    $('[class*="tab-wrap"], .header-nav').each(function (){
        var $this = $(this),
         tabWid = $this.width(),
           length = $('li' , $this).length,
         index = $this.find('.active').index()-1;
  
         if(index >= 3){
          $('ul' , $this).scrollLeft((tabWid/length) * index);
        }
    });
  }
  
  
  /*btn-star*/
  $(document).on('change','.btn-star input:radio', function(){
    var $starList = $(this).parents('.btn-star').find('div'),
        $nextAll = $(this).parent('div').nextAll();
  
    $starList.addClass('active');
    $nextAll.removeClass('active');
  });
  
  /* count -,+ */
  function updateQty(addType,cItem){
    var $this = $(cItem),
        $target = $this.siblings('input[name=itemQty]'),
        itemQty = parseInt($target.val());
  
    if(addType == 'plus'){
      $target.val(parseInt(itemQty + 1));
    } else if (addType == 'minus'){
      if(itemQty > 1){
        $target.val(parseInt(itemQty - 1));
      }
    }
  
  }
  
  
  
  /*menubar scroll event*/
  $(window).on('scroll', function(){
    //menubarScrollEvent();
    btnTop();
    headerEvent();
    scllEndCheck();
  });
  
  
  var isClick = false;
  function headerEvent() {  
    if($('.product-detail').length){
      var $header = $('.product-detail .header-inner'),
          $fixedTab = $('.product-detail .fixed-tab'),
          $targetCont = $('.detail-cont'),
          st = $(this).scrollTop(),
          targetTop = 1;
  
      if(0 < st){
        $header.css({ 
          background : '#fff',
          boxShadow: '0 3px 6px 0 rgb(0 0 0 / 5%)' 
        });
      }else if(0 == st){
        $header.removeAttr('style');
      }
  
      if(targetTop <= st ){
        $fixedTab.addClass('active');
      }else{
        $fixedTab.removeClass('active');
        $('li', $fixedTab).removeClass('active');
      }
      $targetCont.each(function(idx){
        if (isClick) return;
        var $sCont = $targetCont.eq(idx),
        contTop = $sCont.offset().top;
        if (contTop <= st + 70) {
          $('li', $fixedTab).removeClass('active');
          $('li', $fixedTab).eq(idx).addClass('active');
        }
      });
     
    }
  }
  $(document).on('click','.product-detail .tab-wrap li a', function(e){
     var $this = $(this),
         $li = $this.closest('li');
    if(!$li.hasClass('active')){
      $('html, body').stop().animate({scrollTop:$(this.hash).offset().top - 69});
      $li.siblings().removeClass('active');
      $li.addClass('active');
      isClick = true;
    }
  });
  
  var scllEndCheck = debounce(function(){
    isClick = false;
  },150);
  
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
  }
  
  
  
  // function menubarScrollEvent(){
  //   var scrollChk,
  //       $menubar = $('.menubar'),
  //       $btnTop = $('.btn-top'),
  //       lastScrollTop = 0,
  //       delta = 5,
  //       menubarHeight = $menubar.outerHeight();
        
  //   if($('.product-body').length){
      
  //     $(window).on('scroll', function(event){scrollChk = true;});
  
  //     setInterval(function() { 
  //       if (scrollChk) { 
  //         hasScrolled(); 
  //         scrollChk = false;
  //       } 
  //     }, 250); 
  
  //     function hasScrolled() { 
  //       var st = $(this).scrollTop();  
  //       if(Math.abs(lastScrollTop - st) <= delta) return;
        
  //       if(st > lastScrollTop && st > menubarHeight){
  //         $menubar.addClass('down');
  //         $btnTop.removeClass('show-dock');
          
  //       } else {
  //         if(st + $(window).height() < $(document).height()) {
  //           $menubar.removeClass('down');
  //           $btnTop.addClass('show-dock');
  //         }
  //       }
  //       lastScrollTop = st;
  //     }
      
  //   }
  // }
  
  function btnTop() {
    var $btnTopBox = $('.floating-box'),
        $btnTop = $('.btn-top',$btnTopBox);
    if($(this).scrollTop() > 50){
      if($('.contents .btn-wrap-fixed').length){
        $btnTopBox.addClass('fixed-top');
      }
      $btnTopBox.addClass('on');
      }else if($(this).scrollTop() <= 50){
      $btnTopBox.removeClass('on');
    } 
    
    $btnTop.on('click', function(){
      $('html, body').stop().animate({scrollTop : '0'}, 300);    
    });
  }
  
  /*select*/
  $(document).on('change', '.select-box-bg select', function(){ 
    var text = $(this).find('option:selected').text(),
        $aux = $('<select/>').append($('<option/>').text(text));
    $(this).after($aux);
    $(this).closest('.inner').width($aux.width());
    $aux.remove();
  });
  
  
  /*btn-view*/
  $(document).on('click', '.btn-view', function(){ 
    var $this = $(this),
        $list = $('.product-list-wrap');
    $this.toggleClass('full');
    $list.toggleClass('full');
  });
  
  /*search-area*/
  $(document).on('click', '.product-search-wrap .btn-search02', function(){
    var $this = $(this),
        targetTop = $this.parents('.product-search-wrap').offset().top;
  
    $this.parent().addClass('active').find('.inp-search input').focus();
    $('html, body').stop().animate( { scrollTop : targetTop - 54 } );
  });
  
  $(document).on('click', '.product-search-wrap .cancel', function(){ 
    var $this = $(this);
    $this.parents('.search-area').removeClass('active');
  });
  
  /*inp-search*/
  $(document).on('input', "[class^='inp-'] input", function(){
    var $this = $(this),
        $inpSearch = $this.closest("[class^='inp-']"),
        $btnClear = $inpSearch.find('.clear'),
        val = $this.val();
      (val.length > 0) ? $btnClear.show() : $btnClear.hide();
  });
  
  function inpClear(){
    var $this = $('.inp-clear input'),
    $inpSearch = $this.closest('.inp-clear'),
    $btnClear = $inpSearch.find('.clear'),
    val = $this.val();
    
    (val.length > 0) ? $btnClear.show() : $btnClear.hide();
  }
  
  $(document).on('click','.clear', function(){
    var $this = $(this),
        $input = $this.closest("[class^='inp-']").find('input');
              $input.val('');
      $(this).hide();
  });
  
  
  /*rewardGauge �꾩씠��,珥앷린媛�,�⑥�湲곌컙*/
  function rewardGauge(target,duration,day) {
    var dura = duration,
        $target = $(target),
        $circle = $('.bar', $target),
        $dText = $('.d-text', $target);
  
      var r = $circle.attr('r');
      var c = Math.PI * (r * 2);
  
      if (day < 0) { day = 0;}
      if (day > dura) { day = dura;}
  
      var pct = ((dura - day) / dura) * c;
      $circle.css({strokeDashoffset: pct});      
  
      (day == 0) ? $dText.html('醫낅즺').css('color','#000') : $dText.html('D-' + day);
      
  }
  
  
  /*****************************************************************************************
      swiper Setting	
  *****************************************************************************************/
  
  var slideSetting = {
    loop: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    },
    on: {
      init : function() {
        
        if(this.slides.length == 3){
          $(this.$el.find('.swiper-control')).hide();
        }else{
          $(this.$el.find('.swiper-control')).show();
        }
        
        if(this.slides.length >= 12){
          this.$el.find('.swiper-pagination').addClass('total-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('total-off');
        }
      },
      slideChangeTransitionStart : function(){
        if(this.slides.length >= 12){
          this.$el.find('.swiper-pagination').addClass('total-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('total-off');
        }
        
        if(this.realIndex >= 9){
          this.$el.find('.swiper-pagination').addClass('current-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('current-off');
        }
      }
    }
  }
  var slideAutoSetting = {
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    },
    on: {
      init : function() {
        if(this.slides.length == 3){
          $(this.$el.find('.swiper-control')).hide();
        }else{
          $(this.$el.find('.swiper-control')).show();
        }
  
        $(this.$el.find('.swiper-autoplay button:not(.more)')).on('click', function(){
          if($(this).is('.stop')){
            mainSwiper.autoplay.stop();
              $(this).removeClass('stop').addClass('play').text('�ъ깮');
          }else {
            mainSwiper.autoplay.start();
              $(this).removeClass('play').addClass('stop').text('�뺤�'); 
          }                
        });
  
        if(this.slides.length >= 12){
          this.$el.find('.swiper-pagination').addClass('total-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('total-off');
        }
  
      },
      slideChangeTransitionStart : function(){
        if(this.slides.length >= 12){
          this.$el.find('.swiper-pagination').addClass('total-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('total-off');
        }
  
        if(this.realIndex >= 9){
          this.$el.find('.swiper-pagination').addClass('current-off');
        }else {
          this.$el.find('.swiper-pagination').removeClass('current-off');
        }
        
      }
    }
  }
  var cardSetting = {
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    spaceBetween: 43
    // on: {
    //   init : function() {
    //     if(this.slides.length == 1){
    //       $(this.$el.find('.swiper-button-next, .swiper-button-prev')).hide();
    //     }else{
    //       $(this.$el.find('.swiper-button-next, .swiper-button-prev')).show();
    //     }
    //   }
    // }
  }
  var tutorialSetting = {
    loop: false,
    observer: true,
    observeParents: true,
    pagination: {
      el: ".swiper-pagination",
      clickable : true,
    },
  }
  
  
  /*****************************************************************************************
      modalOpen
      - modalOpen(modalId) : modalId �� �앹뾽 �꾩씠��
          ex) <button type='button' onclick='modalOpen('#selectPaymentPop');'></button>
      - modalClose(modalId) : modalOpen�⑥닔�먯꽌 湲곕낯�곸쑝濡� �앹뾽 �リ린 h踰ㅽ듃媛� �곸슜�섏뼱 �덉쓬 
      �곕줈 �앹뾽�� �リ린�꾪븳 �⑥닔媛� �꾩슂�좎떆 �ъ슜
          ex) <button type='button' onclick='modalClose('#cartAlert');'></button>
  *****************************************************************************************/
  
  function modalOpen(modalId){
    var $modalId = $(modalId), 
        $modalClose = $('.modal-wrap > .btn-close',$modalId);
  
    $modalId.show(1).addClass('md-open');
    
    if(!$('body').hasClass('scroll-lock')) $('body').addClass('scroll-lock');
  
    if($modalId.hasClass('bt-slide')){
  
      $modalId.prepend('<div class="dimd"></div>');
      
      $('.modal-wrap',$modalId).css({
        bottom : '0'
      });
      
      if($('.btn-wrap-fixed', $modalId).length){
        $('.modal-wrap-cont', $modalId).css({
          padding : '30px 20px 90px'
        });
      }
    }
  
    $modalClose.on('click', function(){
      
      if( $('.dimd', $modalId).length)  $('.dimd', $modalId).remove();
  
      if($modalId.hasClass('bt-slide')){
        $('.modal-wrap',$modalId).css({
          bottom : '-1000px'
        });
          $modalId.fadeOut(400).removeClass('md-open');
      }else{
        $modalId.hide().removeClass('md-open');
      }
  
      if($('.md-open').length == 0 ){
        $('body').removeClass('scroll-lock');
       }
    });
  
    var $modalSlideLength = $('.modal-wrap .swiper-slide',$modalId).length;
    if($modalSlideLength == 3) {
      $('.swiper-container', $modalId).addClass('swiper-no-swiping');
      $('.swiper-control', $modalId).hide();
    }
  
  } 
  
  function modalClose(modalId){
    var $modalId = $(modalId);
    if($('.dimd', $modalId).length)  $('.dimd', $modalId).remove();
  
    if($modalId.hasClass('bt-slide')){
      $('.modal-wrap',$modalId).css({
        bottom : '-100%'
      });
      $modalId.fadeOut(400).removeClass('md-open');
    }else{
      $modalId.hide().removeClass('md-open');
    }
  
    if($('.md-open').length == 0 ){
      $('body').removeClass('scroll-lock');
    }
  } 
 
  