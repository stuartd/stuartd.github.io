function shuffle (items) {
  let i = 0, j = 0, temp = null;

  for (i = items.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  return items;
}

function shuffleAndStore(imageCount, tag) {
	let pics = new Array();
	for (let i = 0; i < imageCount; i++) {
  		pics.push(i);
	}

	pics = shuffle(pics);

	sessionStorage.setItem(tag, JSON.stringify(pics));

	return pics;	
}

function getImageIndex(imageCount, tag) {

	// OK, nwe plan, as the items have to be stored as strings.
	// If this is the first run or we've run out of items, create a shuffled array and store it as Json.

	let pictureIndexes = null;
	let pictureIndexData = sessionStorage.getItem(tag);
	if (pictureIndexData == null || pictureIndexData == "[]") {
		pictureIndexes = shuffleAndStore(imageCount, tag);
		console.log("Shuffled images: " + pictureIndexes)
	}
	else {
		pictureIndexes = JSON.parse(pictureIndexData);
	}

	// images are zero based
	let index = pictureIndexes[0];
	pictureIndexes = pictureIndexes.slice(1);
	sessionStorage.setItem(tag, JSON.stringify(pictureIndexes));

	return index;
}

