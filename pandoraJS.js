(function($)
{
	//declaring the JQuery plugin 
	$.fn.pandoraJS=function(options)
	{
		var defauts=
        	{
				'hZoom': 150/100,		//Value of the height Zoom
				'wZoom': 133.32/100,	//Value of the width Zoom
				'type': 'onclick'		//Type of box animation
            };  
           
       //merging the two arrays
       var parameters=$.extend(defauts, options);
       //seting "global" variables
       var hZoom = parameters.hZoom;
       var wZoom = parameters.wZoom;
		
		
		//function creating the Box object
		function myBoxBox(section) {
			this.section = section;
			this.totalWidth = $(this.section).innerWidth();
			
			split = $(this.section + " .current").attr('class').split(' ');
			this.currentLineName = split[0];
			this.currentLine = $(this.section + " ." + this.currentLineName);
			this.currentLineNS = this.currentLine.not($(this.section +" .current"));
			this.currentHeight = this.currentLine.innerHeight();
			this.currentWidth = this.totalWidth / this.currentLine.length;
			for (i = 0; i < $(this.section + " .wrapper").length - 1; i++){
				$(this.section + " .ligne"+ (i + 2)).innerWidth(this.totalWidth / $(this.section + " .ligne"+ (i + 2)).length)
			}
			this.heightZoom = hZoom;
			this.widthZoom = wZoom;
			this.currentHZoom = this.currentHeight * this.heightZoom;
			this.currentWZoom = this.currentWidth * this.widthZoom;
			this.currentWUnZoom = (this.totalWidth - this.currentWZoom) / this.currentLineNS.length;
			this.currentFontSize = $(this.section + " .current").css("font-size");
			fontSizeInt = parseInt(this.currentFontSize);
			this.currentFontSizeZoom = fontSizeInt * this.widthZoom + "px";
			this.currentLine.innerHeight(this.currentHZoom);
			this.currentLineNS.innerWidth(this.currentWUnZoom);
			$(this.section +" .current").width(this.currentWZoom);
		}
		//function for using onclick effect
		function onclickBox(boxbox) {
			$(boxbox.section + " article").click(function(){
			if ( $( this ).hasClass("current")){
			}
			else {
				split = $(this).attr('class').split(' ');
				split[0];
				if (split[0] != boxbox.currentLineName) {
					resetLine(boxbox);
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
					resetValues(boxbox);
					
					boxbox.currentLine.animate({
						height: boxbox.currentHZoom
					},{ duration: 400, queue: false });
					boxbox.currentLineNS.animate({
						width: boxbox.currentWUnZoom
					},{ duration: 400 , queue: false });
				}
				else{
					$(boxbox.section +" .current").animate({
						width: boxbox.currentWUnZoom
					},{ duration: 400 , queue: false });
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
				}
				$(boxbox.section +" .current").animate({
					width: boxbox.currentWZoom
				},{ duration: 400, queue: false });
				
			}
		});
		}
		//function for using hover effect
		function onhover(boxbox) {
			$(boxbox.section + " article").hover(function(){
			if ( $( this ).hasClass("current")){
			}
			else {
				split = $(this).attr('class').split(' ');
				split[0];
				if (split[0] != boxbox.currentLineName) {
					resetLine(boxbox);
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
					resetValues(boxbox);
					
					boxbox.currentLine.animate({
						height: boxbox.currentHZoom
					},{ duration: 400, queue: false });
					boxbox.currentLineNS.animate({
						width: boxbox.currentWUnZoom
					},{ duration: 400 , queue: false });
				}
				else{
					$(boxbox.section +" .current").animate({
						width: boxbox.currentWUnZoom
					},{ duration: 400 , queue: false });
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
				}
				$(boxbox.section +" .current").animate({
					width: boxbox.currentWZoom
				},{ duration: 400, queue: false });
				
			}
		},function(){});
		}
		//function for using onclick with scale effect
		function onclickScale(boxbox) {
			$(boxbox.section + " article").click(function(){
			if ( $( this ).hasClass("current")){
			}
			else {
				split = $(this).attr('class').split(' ');
				split[0];
				if (split[0] != boxbox.currentLineName) {
					resetLine(boxbox);
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
					resetValues(boxbox);
					
					boxbox.currentLine.animate({
						height: boxbox.currentHZoom
					},{ duration: 400, queue: false });
					boxbox.currentLineNS.animate({
						width: boxbox.currentWUnZoom
					},{ duration: 400 , queue: false });
				}
				else{
			
					$(boxbox.section +" .current").animate({
						width: boxbox.currentWUnZoom,
						fontSize: boxbox.currentFontSize
					},{ duration: 400 , queue: false });
					$(boxbox.section +" .current").attr('class', boxbox.currentLineName);
					$( this ).attr('class', $( this ).attr('class') + " current");
				}
				$(boxbox.section +" .current").animate({
					width: boxbox.currentWZoom, 
					fontSize: boxbox.currentFontSizeZoom
				},{ duration: 400, queue: false });
				
			}
		});
		}
		//function that will reset ligne previous values when leaving a line
		function resetLine(boxbox) {
			boxbox.currentWidth = boxbox.totalWidth / boxbox.currentLine.length;
		    boxbox.currentLine.animate({
		    		fontSize : boxbox.currentFontSize,
					width:  boxbox.currentWidth,
					height: boxbox.currentHeight
				},400);
			setFuturValue(boxbox.currentLine, boxbox.currentHeight, boxbox.currentWidth);
		}
		//function that reset the values of a line when entering
		function resetValues(boxbox) {
			if ($(boxbox.section + " .current").is(':animated')){
				boxbox.currentHeight = $(boxbox.section +" .current").data("trueHeight");
				boxbox.currentWidth = $(boxbox.section +" .current").data("trueWidth");		
			}
			else{
				boxbox.currentHeight = $(boxbox.section +" .current").innerHeight();
				boxbox.currentWidth = $(boxbox.section +" .current").innerWidth();
			}
			split = $(boxbox.section + " .current").attr('class').split(' ');
			boxbox.currentLineName = split[0];
			boxbox.currentLine = $(boxbox.section + " ." + boxbox.currentLineName);
			boxbox.currentLineNS = boxbox.currentLine.not($(boxbox.section +" .current"));
			boxbox.currentHZoom = boxbox.currentHeight * boxbox.heightZoom;
			
			boxbox.currentWZoom = boxbox.currentWidth * boxbox.widthZoom;
			
			boxbox.currentFontSize = $(boxbox.section + " .current").css("font-size");
			fontSizeInt = parseInt(boxbox.currentFontSize);
			boxbox.currentFontSizeZoom = fontSizeInt * boxbox.widthZoom + "px";
			boxbox.currentWUnZoom = (boxbox.totalWidth - boxbox.currentWZoom) / boxbox.currentLineNS.length;
		}
		//function that will set futur value of a animated object in case we interupt it's animation
		function setFuturValue(object , height, width){
			object.data("trueHeight", height);
			object.data("trueWidth", width);
		}
	   // this is the core function of the project
	   this.each(function()
	   {
	   	//creating the box object that will be use by the animation functions
		var pandoraBox = new myBoxBox("#" + $(this).attr('id'));
		//switch case to see what animation will be run
		switch(parameters.type) {
		    case "onclick":
		        onclickBox(pandoraBox);
		        break;
		    case "onclickScale":
		        onclickScale(pandoraBox);
		        $("#" + $(this).attr('id') + " .current").css({
					fontSize: pandoraBox.currentFontSizeZoom
				});
		        break;
	        case "hover":
		        onhover(pandoraBox);
		        break;
		    default:
		    	
		}
		});	   
		return this;
	};
})(jQuery);
