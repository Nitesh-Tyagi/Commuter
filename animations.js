const topElement = document.getElementById("top");
const heroElement = document.getElementById("hero");
const topSVG = document.getElementById("top_bg");
const heroSVG = document.getElementById("hero_bg");
const topRight = topElement.getElementsByClassName("right");

export function animateTop (event) {
    console.log("top");
    let top1,top2;
    if(topSVG) {
            top1 = topSVG.getElementById("ellipse1");
            top2 = topSVG.getElementById("ellipse2");
    }
    setTimeout( function () {
        if(topElement.style.height=='60px') {
            topElement.style.height = '220px';
            topSVG.style.transition = 'height 1.2s';
            topElement.style.zIndex = '1';
            topElement.style.transition = 'height 1.2s';

            heroElement.style.height = '0px';
            heroElement.style.marginTop = '260px';
            heroElement.style.transition = 'height 1s, margin-top 1.2s';

            topRight[0].style.opacity = '0';
        
            if(topSVG && top1 && top2){
                top1.style.transition = 'rx 1.2s, ry 1.2s';
                top2.style.transition = 'rx 1.2s, ry 1.2s';
                top1.setAttribute("rx","400");
                top2.setAttribute("rx","400");
                top1.setAttribute("ry","400");
                top2.setAttribute("ry","400");
            }
            
            setTimeout(function () {
                setTimeout(function() {
                    leftExpand.style.opacity = '1';
                    expand.style.opacity = '1';
                }, 400);
            }, 100);
        }
        else {

            topElement.style.height = '60px';
            topSVG.style.transition = 'height 1s';
            topElement.style.zIndex = '0';
            topElement.style.transition = 'height 1s';
            leftExpand.style.opacity = '0';
            expand.style.opacity = '0';
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
                topRight[0].style.opacity = '1';
            }, 690);
        }
    }
    )
};

export function animateHero (event) {
    console.log("hero");
    
    let innerCircle = heroSVG.getElementById("innerCircle");
    let outerCircle = heroSVG.getElementById("outerCircle");
    let rightInner = heroSVG.getElementById("rightInner");
    let rightOuter = heroSVG.getElementById("rightOuter");

    let rightTags = heroElement.getElementsByClassName("right");
    let leftElements = heroElement.getElementsByClassName("left");
    let tabs = heroElement.querySelector("#tabs");
    let field = tabs.querySelectorAll(".field");

    console.log("tabs :",tabs);
    console.log("fields :",field);
    setTimeout( function () {
        if(innerCircle.getAttribute("r")==150){
            innerCircle.style.transition = '1.4s';
            outerCircle.style.transition = '1.4s';
            rightInner.style.transition = '1s';
            rightOuter.style.transition = '1s';
            rightTags[0].style.transition = '0.3s';
            leftElements[0].style.transition = '0.3s';
            field[0].style.transition = '1.4s';
            field[1].style.transition = '1.2s';
            field[2].style.transition = '1.0s';
            tabs.style.transition = '1.6s';

            setTimeout( function () {
                field[0].style.transform = 'translateY(0px)';
                field[1].style.transform = 'translateY(0px)';
                field[2].style.transform = 'translateY(0px)';
                tabs.style.transform = 'translateY(0px)';
            },300);

            innerCircle.setAttribute("r","500");
            outerCircle.setAttribute("rx","500");
            outerCircle.setAttribute("ry","500");
            rightInner.setAttribute("cx","450");
            rightInner.setAttribute("r","0");
            rightOuter.setAttribute("r","0");

            // rightTags[0].style.opacity = '0';
            rightTags[0].style.transform = 'translateX(100px)';
            leftElements[0].style.transform = 'translateX(-200px)';
            
        }
        else {
            innerCircle.style.transition = '1.2s';
            outerCircle.style.transition = '1.2s';
            rightInner.style.transition = '1.4s';
            rightOuter.style.transition = '1.4s';
            rightTags[0].style.transition = '1s';
            leftElements[0].style.transition = '0.3s';
            field[0].style.transition = '0.2s';
            field[1].style.transition = '0.8s';
            field[2].style.transition = '1.2s';
            tabs.style.transition = '1.2s';

            innerCircle.setAttribute("r","150");
            outerCircle.setAttribute("rx","158");
            outerCircle.setAttribute("ry","150");
            rightInner.setAttribute("cx","340");
            rightInner.setAttribute("r","125");
            rightOuter.setAttribute("r","200");

            field[0].style.transform = 'translateY(-200px)';
            field[1].style.transform = 'translateY(-200px)';
            field[2].style.transform = 'translateY(-200px)';
            tabs.style.transform = 'translateY(-200px)';

            setTimeout( function () {
                // rightTags[0].style.opacity = '1';
                rightTags[0].style.transform = 'translateX(0)';
                leftElements[0].style.transform = 'translateX(0)';
            },300);
        }
    },690);
};