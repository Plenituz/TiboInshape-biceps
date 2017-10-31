const regularSvg = "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z";
const bicepsSvg = `M22.5,7.1c-0.1,3.6-0.5,6.4-1.4,9.2c-0.8,2.4-1.9,5-4.5,5.3c-4.1,0.5-8.7,1.2-11.1-3.7
c-0.8-1.7-1.8-3.1-3.3-4.3c-2.1-1.6-1.7-4-1-6.1C1.7,5.8,3,5,5,5.1c2.3,0.1,3.6,1.2,4.2,3.3c0.2,0.7,0.4,1.5,1.2,1.5
c2.2,0.1,3.6,1.1,4.4,3.2c0.3,0.7,1,0.6,1.5,0c1-1.4,2-2.9,2.9-4.4c0.8-1.4,1.3-2.8-1.2-3.2c-0.9-0.1-1.5-0.9-1.5-1.9
c0-1.1,0.9-1.7,1.7-2.2c0.9-0.6,1.7-0.1,2.4,0.5C22.4,3.3,22.6,5.5,22.5,7.1z`;

var task = setInterval(doStuff, 1000);
//The youtube page is a single that loads once and updates afterwards, therefore we need to check periodically
//for the page change, at least until I find a way to hook into the page events (is there is some).
//Also once a page has been visited (video page, home page etc) the page stays in the DOM it's just hidden.
//So to detect if the page has changed we check if the element "owner-name" changes. It's the element that contains
//the channel name
var ownerName = "";
var likeButtonSvg = null;

function doStuff(){
    if(!likeButtonSvg){
        likeButtonSvg = findLikeButton();
    }
    //if we did'nt find the like button, the video page has not been visited yet
    if(!likeButtonSvg)
        return;

    //then we check for name change once the video page has been loaded
    if(ownerNameChanged()){
        updateLikeButton();
    }   
}

function ownerNameChanged(){
    let name = document.getElementById("owner-name").firstChild.innerText;
    if(name != ownerName){
        ownerName = name;
        return true;
    }
    return false;
}

function findLikeButton(){
    let container = document.getElementById("menu-container");
    if(!container)
        return null;
    let svgs = container.getElementsByTagName("svg");
    svgs = Array.from(svgs);
    //extract the "path" node 
    //svg > g > path
    svgs = svgs.map(s => s.firstChild.firstElementChild);
    //filter to only have the svg that has the like icon
    svgs = svgs.filter(s => s.getAttribute("d") == regularSvg);

    if(svgs.length > 1)
        return null;
    return svgs[0];
}

//set the like svg to the appropriate svg code
function updateLikeButton(){
    if(ownerName.indexOf("InShape") != -1)
        likeButtonSvg.setAttribute("d", bicepsSvg);  
    else
        likeButtonSvg.setAttribute("d", regularSvg);
}