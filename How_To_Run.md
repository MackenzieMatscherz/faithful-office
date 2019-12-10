In /faithful-office/code run:
    
    node app.js

In your browser launch localhost:3000

Fill out the form to upload an image. It will then redirect to a page to show a random image from the database.

Limit of 2MB images.

https://codepen.io/alexgill/pen/NqjMma

/pull_data
Longitude: 2, Latitude:5 for testing

Example JSON Sent to webpage:
  {
    _id: 5dd438f8636ec24ce457ca93,
    picture: { data: [Binary], contentType: 'image/jpeg' },
    location: [ 2, 5 ],
    title: 'Cool Pic',
    artist: 'Me',
    uploader: 'You',
    __v: 0
  },
  {
    _id: 5de94e829d6dcd3240b1bf3c,
    picture: { data: [Binary], contentType: 'image/jpeg' },
    location: [ 5, 2 ],
    title: 'Pic',
    artist: 'Chad',
    uploader: 'Wilkin',
    __v: 0
  },
  {
    _id: 5de94e980d368426b0b3126d,
    picture: { data: [Binary], contentType: 'image/jpeg' },
    location: [ 2, 5 ],
    title: 'Awesome Pic',
    artist: 'Bonnie',
    uploader: 'Clyde',
    __v: 0
  },