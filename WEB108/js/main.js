$(document).ready(function() {

    //var tofix1_height = $('#tofix1').offset().top; //Reserve the original height
    //var tofix2_height = $('#tofix2').offset().top; //Reserve the original height
    var menu_height=$('#menu').offset().top;
    var story_height=$('#story1').offset().top;
    var window_height=$(window).height();


    var story1_height=$('#story1-2').offset().top;
    var zoomed=false;
    var menuShowed=true;

    
    
    $(window).scroll(function() {
        var max_scroll = $(document).height() - $(window).height();
        var win_w = $(window).width();
        var current_pos = $(window).scrollTop();
        console.log(current_pos);

        

        
        if(current_pos>200){
            $('#nav').fadeOut();
        }
        if(current_pos<200){
            $('#nav').fadeIn();
        }
        


        if(current_pos<1000 && menuShowed){
            
            menuShowed = false;
        }
        if(current_pos>=1000 && !zoomed){
            $('#iphone').animate({height:"530vh",marginTop:"-80vh"});
            zoomed=true;
            console.log('zoomed in')
            $("html, body").animate({scrollTop: $("#menu").offset().top }, {duration: 500,easing: "swing"});
            //$('#menu').addClass('fixed');
            menuShowed=true;
        }

        if(current_pos<=600 && zoomed){
            $('#iphone').animate({height:"90vh",marginTop:"0vh"});
            zoomed=false;
            console.log('zoomed back');
        }

        var new_width = win_w * current_pos / max_scroll;
        $('#scroll').text(current_pos);
        //$('#statusbar').css({
         //   'width': new_width
        //});

        if(current_pos>menu_height){
            $('#menu').addClass('fixed-top');
        }
        if(current_pos<menu_height ){
            $('#menu').removeClass('fixed-top');
        }

        if(current_pos>=story_height-window_height&& menuShowed ){
            $('#menu').fadeOut();
            console.log('story begin');
            //$('#story1-1').addClass('fixed');
            //$('#story1-2').addClass('fixed');
           
            
            menuShowed=false;
            //$('#sub1').css('top',story_height-current_pos);
        }
        if(current_pos<=story_height-window_height&&!menuShowed){
            $('#menu').fadeIn()
            menuShowed=true;
        }
        if(current_pos>=story_height-300){
            //$('#story1-2').animate({marginTop:"0px"},3000,"swing");
         //   $('#story1-3').animate({marginTop:"0px"},3000,"swing");
            console.log("animate trigged");
        }
      



       // if(current_pos>=story_height)

        
    });
});