var task = setInterval(doStuff, 1000);
//this has to be done in an interval because youtube doesn't load the script on every page


function doStuff(){
		//check if this page contains like buttons
	var likeButs = document.getElementsByClassName("like-button-renderer-like-button");
	if(likeButs.length == 0){
		return;//wait 1000 ms and try again
	}
	
	//check if this page is from tiboInshape (or anybody with "InShape" in their name)
	var channelNames = document.getElementsByClassName("yt-user-info");
	var foundTibo = false;
	for(var i = 0; i < channelNames.length; i++){
		//there should only be one but you never know
		var content = channelNames[i].innerHTML;
		//I could get the child and check the href attribute, that way I would be sure 
		//that even if the name of the channel name change the link doesn't 
		//but meh
		if(content.includes("InShape"))
			foundTibo = true;
	}
	if(!foundTibo){
		return;
	}
	
	for(var i = 0; i < likeButs.length; i++){
		var content = likeButs[i].getAttribute("title");
		//sur la page ya un bouton "j'aime" et un bouton "je n'aime plus" qui sont invisible 
		//un coup sur deux, je met le bouton "je n'aime plus" a l'icone du biceps bleu
		//et l'autre en gris
		var URL = "";
		if(content.includes("plus") || content.includes("Un")){
			URL = browser.extension.getURL("icons/biceps_blue.png");
			likeButs[i].children[0].style.color = 'rgb(22, 122, 198)';
			//likeButs[i].children[0].innerHTML = "BOOM!";
		}else{
			URL = browser.extension.getURL("icons/biceps_grey.png");	
		}
		
		URL = "url(\'" + URL + "\')";

		likeButs[i].style.backgroundImage = URL;//"url(https://s.ytimg.com/yts/imgbin/www-hitchhiker-2x-vfl9WbN87.png)";
		likeButs[i].style.paddingLeft = "30px";
		likeButs[i].style.paddingTop = "3px";
		//change le padding comme un gros tas
	}
	//supprime les class "like-button-renderer-like-button" des bouton pour faire disparaitre les like boutons deja présents
	while(likeButs.length != 0){
		likeButs[0].classList.remove("like-button-renderer-like-button");//has to be done last
	} 
}
