function shuffle (items) {
  var i = 0, j = 0, temp = null

  for (i = items - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = items[i]
    items[i] = items[j]
    items[j] = temp
  }
}
rm
shuffleAndStore(imageCount, tag) {
	var pics = new Array();
	for (let i = 0; i <= imageCount; i++) {
  		pics.push(i);
	}

	pics = shuffle(pics);

	sessionStorage.setItem(tag, pics);

	return pics;	
}

getImageIndex(imageCount, tag) {
	var pictureIndexes = sessionStorage.getItem(tag);

	if (pictureIndexes === null || pictureIndexes.length === 0) {
	   pictureIndexes = shuffleAndStore(imageCount, tag);
	}
	
	var index = pictureIndexes[0];
	pictureIndexes = pictureIndexes.slice(1);
	sessionStorage.setItem(tag, pictureIndexes);
}

