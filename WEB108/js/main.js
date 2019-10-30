(function()
{
    
    /*var wh=window.innerHeight;*/
    /*var h = document.body.getBoundingClientRect().height;*/
    /*var h=document.body.clientHeight;*/
    /*var h =1000*/
    /*var dh=h-wh;*/
    var dh=window.innerHeight;
    console.log("start")
    window.addEventListener('scroll', function()
    {
        window.requestAnimationFrame(function()
        {
            var percent=0;
            var percent = Math.max(0,Math.min(6,window.pageYOffset/dh));
            percent = percent/6; /**6 is how many 'length' of per windows my website designed */
            content= document.getElementById("time");
            
            var time=(parseInt(percent*60));
            if(time==60){
                time-=1;
            }
            
            var displaytime="19:00 PM";
            if(time<10){
                displaytime="19:"+"0"+String(time)+" PM";
            }
            else{
                displaytime ="19:"+String(time)+" PM";/*format time str*/
            }
            
            
            
            
           /* time = time.slice(0,1)+":"+time.slice(2,3);*/
            content.innerHTML=displaytime;
            console.log(time); 
        })
    },false);
}
)();