function scrollToContent() {

}

function initContent() {
	var type = window.location.hash.substring(1);
	scrollToContent(type);
}

function createCard(item) {
	var card = '<div id="' + item.title + '" class="card"><div class="title"><h2>' + item.title + '</h2><p class="subtitle">' + item.subtitle + '</p></div>';
	if(item.hasOwnProperty("galleryItems") && item.galleryItems.length > 0) {
		card += '<hr><div class="gallery">';
		for(var i = 0; i < item.galleryItems.length; i++) {
			card += '<a href="' + item.galleryItems[i] + '" data-lightbox="' + item.name + '"><img src="' + item.galleryItems[i] + '"></a>';
		}
		card += '</div>';
	}
	else if(item.hasOwnProperty("content")) {
		card += '<hr><p class="text">' + item.content + '</p>';
	}
	card += '</div>';
	document.querySelector("#sectionContent").innerHTML += card;
}

var menu = "";
for(var i = 0; i < gallery.length; i++) {
	menu +=	'<span onclick="scrollToContent(\'' + gallery[i].name + '\')">' + gallery[i].name + '</span>';
	createCard(gallery[i]);
}
document.querySelector("#menu").innerHTML = menu;