const topElement = document.getElementById("top");
const heroElement = document.getElementById("hero");
const topSVG = document.getElementById("top_bg");
let heroContent;
var topIsActive = 0;


topElement.addEventListener('mousedown', function(event) {
    let top1,top2;
    if(heroElement.innerHTML!="") heroContent = heroElement.innerHTML;
    if(topSVG) {
            top1 = topSVG.getElementById("ellipse1");
            top2 = topSVG.getElementById("ellipse2");
    }
    setTimeout(function () {
        if(topElement.style.height=='60px') {
            topElement.style.height = '220px';
            topSVG.style.transition = 'height 1.2s';
            topElement.style.zIndex = '1';
            topElement.style.transition = 'height 1.2s';
            heroElement.style.height = '0px';
            heroElement.style.marginTop = '260px';
            heroElement.style.transition = 'height 1s, margin-top 1.2s';
        
            if(topSVG && top1 && top2){
                top1.style.transition = 'rx 1.2s, ry 1.2s';
                top2.style.transition = 'rx 1.2s, ry 1.2s';
                top1.setAttribute("rx","400");
                top2.setAttribute("rx","400");
                top1.setAttribute("ry","400");
                top2.setAttribute("ry","400");
            }
            
            setTimeout(function () {
                heroElement.innerHTML="";
            }, 100);
        }
        else {

            topElement.style.height = '60px';
            topSVG.style.transition = 'height 1s';
            topElement.style.zIndex = '0';
            topElement.style.transition = 'height 1s';
            heroElement.style.height = '140px';
            heroElement.style.marginTop = '100px';
            heroElement.style.transition = 'height 1.2s, margin-top 1.2s';

            if(topSVG && top1 && top2){
                top1.style.transition = 'rx 1s, ry 1s';
                top2.style.transition = 'rx 1s, ry 1s';
                top1.setAttribute("rx","115.829");
                top1.setAttribute("ry","122.327");
                top2.setAttribute("rx","115.829");
                top2.setAttribute("ry","122.327");
            }

            setTimeout(function () {
                heroElement.innerHTML = heroContent;
            }, 690);
        }
    },500);
    console.log(topSVG);
})

topSVG.addEventListener("load", function () {
    console.log("SVG LOADED");
});