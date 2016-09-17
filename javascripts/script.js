function scrollToContent(name) {
	if(name) {
		var item = $("#" + name);
		if(item.length > 0) {
			$("html, body").animate({
				scrollTop: item.offset().top
			}, 500);
		}
		else {
			var i = indexOfName(name);
			if(i !== -1) {
				var card = createCard(i);
				$("html, body").animate({
					scrollTop: card.offset().top
				}, 500);
			}
		}
	}
}

function indexOfName(name) {
	for(var i = 0; i < gallery.length; i++) {
		if(name === gallery[i].name) {
			return i;
		}
	}
	return -1;
}

function createCard(index) {
	var item = gallery[index];
	unloadedIndices.splice(unloadedIndices.indexOf(index), 1);
	var card = '<div id="' + item.name + '" class="card"><div class="title"><h2>' + item.title + '</h2><p class="subtitle">' + item.subtitle + '</p><i class="clearfix"></i></div>';
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
	return $("#" + item.name);
}

function addFillerContent(n) {
	var img = ["IMG_3444 e.jpg", "IMG_3450 e.jpg", "IMG_3452 e.jpg", "IMG_3454 e.jpg", "IMG_3457 e.jpg", "IMG_3461 e.jpg", "IMG_3464 e.jpg", "IMG_3465 e.jpg", "IMG_3466 e.jpg", "IMG_3467 e.jpg", "IMG_3468 e.jpg", "IMG_3469 e.jpg", "IMG_3471 e.jpg", "IMG_3486 e.jpg", "IMG_3481 e.jpg", "IMG_3474 e.jpg"];
	for(var i = 0; i < n; i++) {
		var item = {name: "Test" + i, title: "Test " + i, subtitle: "sub"};
		if(Math.random() < 0.5) {
			item.galleryItems = img.slice(0, ~~(Math.random() * img.length));
		}
		else {
			item.content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
		}
		gallery.push(item);
	}
}

var unloadedIndices = [];
addFillerContent(30);

for(var i = 0; i < gallery.length; i++) {
	$("#menu").append('<span onclick="scrollToContent(\'' + gallery[i].name + '\')">' + gallery[i].title + '</span>');
	unloadedIndices.push(i);
}

for(var i = 0; i < 4; i++) {
	createCard(i);
}

$(document).scroll(function() {
	if(unloadedIndices.length === 1) {
		$(document).off("scroll");
	}
	if($(document).height() - $(window).scrollTop() - $(window).height() < 150) {
		createCard(unloadedIndices[0]);
	}
});
