function scrollToContent(itemName) {
	if(itemName) {
		$("html, body").animate({
			scrollTop: $("#" + itemName).offset().top - 60
		}, 750);
	}
}

function initContent() {
	var type = window.location.hash.substring(1);
	scrollToContent(type);
}

function createCard(item) {
	var card = '<div id="' + item.title + '" class="card"><div class="title"><h2>' + item.title + '</h2><p class="subtitle">' + item.subtitle + '</p></div>';
	if(item.hasOwnProperty("galleryItems") && item.galleryItems.length > 0) {
		card += '<div class="gallery square' + Math.round(Math.sqrt(item.galleryItems.length, 2)) + '">';
		for(var i = 0; i < item.galleryItems.length; i++) {
			card += '<a href="' + item.galleryItems[i] + '" data-lightbox="' + item.name + '"><img src="' + item.galleryItems[i] + '"></a>';
		}
		card += '</div>';
	}
	else if(item.hasOwnProperty("content")) {
		card += '<p class="text">' + item.content + '</p>';
	}
	card += '</div>';

	$("#sectionContent").append(card);
}

for(var i = 0; i < gallery.length; i++) {
	$("#menu").append('<span onclick="scrollToContent(\'' + gallery[i].name + '\')">' + gallery[i].name + '</span>');

	createCard(gallery[i]);
}