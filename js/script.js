// ブラウザバックした際にフェードインアニメーションを有効にする（Safari用）
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload()
  }
};

// fadein elements on load
function pageLoaded() {
  $('body').imagesLoaded( function() {
    $('body').addClass('js-loaded');
    // $('main,footer,.menu').removeClass('js-fadeOut');
  });
}

// fadeout page on link clicked
// https://digipress.digi-state.com/tech/page-transition-effect-how-to/
function pageTransition() {
  // ハッシュリンク(#)と別ウィンドウでページを開く場合はスルー
  $('a:not([href^="#"]):not([href^="javascript:void(0);"]):not([target]):not(.js-no-transition)').on('click', function(e){
    // $('html, body').stop().animate({ scrollTop: 0 }, 400, 'easeInOutSine');
    e.preventDefault(); // ナビゲートをキャンセル
    url = $(this).attr('href'); // 遷移先のURLを取得
    if (url !== '') {
      //$('main,footer,.menu').addClass('js-fadeOut');
      $('main,.menu').addClass('js-fadeOut');
      setTimeout(function(){
        window.location = url;  // 0.6秒後に取得したURLに遷移
      }, 600);
    }
    return false;
  });
}

// fadein animation
function fadeinAnime() {
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).innerHeight();
  var windowBottom = scroll + windowHeight;
  $('.js-fadein').each(function(){
    var fadeinPos = $(this).offset().top - 1;
    if ( fadeinPos < windowBottom ) {
      $(this).addClass('js-fadein-anime');
    }
  });
}

// title animation
function titleAnimeSetting() {
  // js-ttl の文字をそれぞれ spanで囲う
  $('.js-ttl').children().addBack().contents().each(function(){
    if (this.nodeType == 3) {
      var $this = $(this);
      $this.replaceWith($this.text().replace(/(\S)/g, '<span>$&</span>'));
    }
  });
  // js-ttl ごとの spanにそれぞれdata-delayの値を入れる
  $('.js-ttl').each(function(){
    dataDelay = 200;
    $('span', this).each(function(){
      $(this).attr('data-delay',dataDelay);
      dataDelay=dataDelay+25;
    });
  });
}
function titleAnime() {
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).innerHeight();
  var windowBottom = scroll + windowHeight;
  $('.js-ttl').each(function(){
    var fadeinPos = $(this).offset().top - 1;
    if ( fadeinPos < windowBottom ) {
      $(this).addClass('js-ttl-anime');
    }
  });
}

// parallax effect on scroll
function parallaxEffect() {
  windowWidth = $(window).width();
  if( windowWidth >= 768) {
    var s = skrollr.init({
      forceHeight: false,
    });
  }
}

// href="#" であればその id の要素までスクロールする
// smooth scroll
function smoothScroll() {
  $('a[href^="#"]').on('click', function(){
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html, body').stop().animate({ scrollTop: position }, 600, 'easeInOutSine');
    return false;
  });
}

// header stick
function headerStick() {
  // メニューの展開時はヘッダー固定機能をさせない
  if ( !$('body').hasClass('is-menu-active') ) {
    var scrollPos = $(window).scrollTop();
    var headerPos = 20;
    if ( scrollPos < headerPos ) {
      $('body').removeClass('js-header-stick');
    } else {
      $('body').addClass('js-header-stick');
    }
  }
}

// header navi hover
function headerNaviHover() {
  $('.header__navi ul li a').hover(function(){
    $(this).parent('li').addClass('is-active');
  },function(){
    $(this).parent('li').removeClass('is-active');
  });
}

// header lang navi hover
function headerNaviLangHover() {
  $('.js-lang .navi__langLink').hover(function(){
    $('.navi__langLink,.navi__langList').addClass('js-active');
    $('.navi__langLink,.navi__langList').hover(function(){
      $('.navi__langLink,.navi__langList').addClass('js-active');
    },function(){
      $('.navi__langLink,.navi__langList').removeClass('js-active');
    });
  },function(){
    $('.navi__langLink,.navi__langList').removeClass('js-active');
  });
}

// about mission slider
function aboutMissionSlider() {
  $('.js-about-mission-slider').slick({
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    speed: 1000,
    slidesToShow: 1,
    infinite: true,
  });
}

// artist why slider
function artistWhySlider() {
  // トータルのスライド数
  var $artistWhySlider = $('.js-artist-why-slider');
  var slideTotal = $('.js-artist-why-slider li').length;
  $('.artist-why__pager--total').text(slideTotal);
  // スライド
  $artistWhySlider.slick({
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    speed: 1000,
    slidesToShow: 1,
    infinite: true
  }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $('.artist-why__pager--current').text(nextSlide + 1);
  });
  // 次のスライドへ移動
  $('.artist-why__pager a').on('click', function(){
    $artistWhySlider.slick("slickNext");
  });
}

// artist other modal
function artistOtherModal() {
  $('.artist-other__list ul li a').on('click', function(){
    var scrollPos = $(window).scrollTop();
    $('body').addClass('js-modal-open');
    $('body').attr('data-scroll',scrollPos);
    var thisArtist = $(this).attr('data-artist');
    $('.artist-other__modalOver,.artist-other__modalClose').addClass('js-open');
    $('#'+thisArtist).addClass('js-open');
  });
  $('.artist-other__modalClose a').on('click', function(){
    var scrollPos = $('body').attr('data-scroll');
    $('html, body').stop().animate({ scrollTop: scrollPos }, 1);
    $('body').removeClass('js-modal-open');
    $('.artist-other__modalOver,.artist-other__modalClose').removeClass('js-open');
    $('.artist-other__modal').removeClass('js-open');
  });
}

// NEWS一覧ページのクロス検索のフォーム
function newsCrossSearch() {
  var form = $('.news__select form');
  var btn = $('.news__selectItem');
  var btnText = $('.news__selectInner');
  var pullDown = $('.news__selectContent');
  var radio = $('.news__selectContentLabel input');
  // プルダウン開閉
  btn.on('click', function() {
    var thisPullDown = $(this).find(pullDown);
    $(this).find(btnText).toggleClass('js-active');
    thisPullDown.toggleClass('js-active');
  });
  // フォーム送信
  radio.change(function() { // radioのvalueが変わったら
    form.submit(); // フォーム送信
    pullDown.removeClass('js-active');
  });
}

// menu for sp
function sp__menu() {

  $('.menuBtn a').on('click', function(){
    $('.menu').addClass('js-active');//important
    // 背景のコンテンツがスクロールしないようにする
    scrollpos = $(window).scrollTop();
    $('body').attr('data-scroll',scrollpos);
    $('body').addClass('is-menu-active').css({'top': -scrollpos});
    //is-menu-active => position 
  });

  $('.menu_closeBtn').on('click', function(){
    $('.menu').removeClass('js-active');
    // 背景のコンテンツがスクロールしないようにする
    var scrollPos = $('body').attr('data-scroll');
    $('body').removeClass('is-menu-active').css({'top': '0'});
    window.scrollTo( 0 , scrollPos );
  });
}



$(function(){
  pageTransition();
  titleAnimeSetting();
  smoothScroll();
  headerNaviHover();
  headerNaviLangHover();
  aboutMissionSlider();
  artistWhySlider();
  artistOtherModal();
  newsCrossSearch();
  sp__menu();
}); // ready

$(window).on('load', function(){
  pageLoaded();
}); // load

$(window).on('load resize', function(){
  parallaxEffect();
}); // load resize

$(window).on('load scroll', function(){
  fadeinAnime();
  titleAnime();
}); // load scroll

$(window).on('load resize scroll', function(){
  headerStick();
}); // load resize scroll
