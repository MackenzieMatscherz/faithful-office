var results = JSON.parse(query);

for (var i = 0; i < results.length; i++) {
	var frame = document.createElement("div");
	var picture = document.createElement("img");

	var text = document.createElement("div");

	var titleDiv = document.createElement("div");
	var titleLabel = document.createElement("label");
	var title = document.createElement("p");

	var artistDiv = document.createElement("div");
	var artistLabel = document.createElement("label");
	var artist = document.createElement("p");

	var uploaderDiv = document.createElement("div");
	var uploaderLabel = document.createElement("label");
	var uploader = document.createElement("p");

	frame.appendChild(picture);
	frame.appendChild(text);

	text.appendChild(titleDiv);
	text.appendChild(artistDiv);
	text.appendChild(uploaderDiv);

	titleDiv.appendChild(titleLabel);
	titleDiv.appendChild(title);

	artistDiv.appendChild(artistLabel);
	artistDiv.appendChild(artist);

	uploaderDiv.appendChild(uploaderLabel);
	uploaderDiv.appendChild(uploader);

	frame.classList.add("frame");
	picture.classList.add("picture");
	text.classList.add("textbox");
	titleDiv.classList.add("field");
	artistDiv.classList.add("field");
	uploaderDiv.classList.add("field");

	titleLabel.textContent = "Title";
	uploaderLabel.textContent = "Uploader";
	artistLabel.textContent = "Artist";

	title.textContent = results[i].title;
	artist.textContent = results[i].artist;
	uploader.textContent = results[i].uploader;
	picture.src = results[i].picture.data;
}