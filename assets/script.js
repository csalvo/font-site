

$(window).on('load',function(){
  $('#myModal').modal('show');
  $(".changeText").css("visibility", "hidden");
});

var apikey = "AIzaSyCiXm22-7b5h4cvze_3yWH4r-ISWDmxr5Q";
var queryURL = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + apikey;
var fontsAtATime = 20;
var start = 0;
var scroller=0;
var fonts;
var textSet = false;

$.ajax({
url: queryURL,
method: "GET"
}).done(function(response) {
fonts = response;});



$("#goButton").on("click", function() {

if (textSet === false){
	textSet = true;
	wordsToFontize = $("#userText").val();
	loadTextInFonts(wordsToFontize,fontsAtATime);
	$("#textChangeBox").val(wordsToFontize);
}
else if ($("#textChangeBox").val() != $("#userText").val()) {
	$("#fonts").html("");
	wordsToFontize = $("#textChangeBox").val();
	console.log(wordsToFontize);
	start = 0;
	loadTextInFonts(wordsToFontize,fontsAtATime);
}

});

window.onscroll = function(){
		loadTextInFonts(wordsToFontize,fontsAtATime);
};

function loadTextInFonts(wordsToFontize, count) {
console.log(wordsToFontize);
	i = 0;
	while (i < count) {
		start++;
		console.log(start);
		console.log(i);
		
		$(".changeText" ).css("visibility", "visible");
		currentFonts  = fonts.items[start]
		if (currentFonts !== undefined){
			var fontLink = currentFonts.files.regular
			var fontFamily = currentFonts.family
			$("#fonts").append("<div class = 'font-box col-lg-2' style = 'font-family:" + fontFamily + ";'>" + wordsToFontize + "</br> </br> <p>" + fontFamily + "</p> </div>");
			
			$("head").prepend("<style type = text/css>" 
						+ "@font-face {" + "font-family:" + fontFamily + ";" + 
						"src: url(" + fontLink + ");}" + "</style>");

			$("#text").css("font-family", fontFamily);
		} 

		i = i + 1;
	}
}



/*
$("#capitals").on("click", textUpperCase());

function textUpperCase() {
	upperCaseText = wordsToFontize.toUpperCase();
	$("#fonts").html("<div class = 'font-box col-lg-2' style = 'font-family:" + fontFamily + ";'>" + wordsToFontize + "</br> </br> <p>" + fontFamily + "</p> </div>");
}*/