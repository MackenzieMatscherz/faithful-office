In /faithful-office/code run:
    
    node app.js

In your browser launch localhost:3000

Fill out the form to upload an image. It will then redirect to a page to show a random image from the database.

Limit of 2MB images.

Example JSON Sent to webpage:

_id: 5dd438f8636ec24ce457ca93,
    picture: { data: [Binary], contentType: 'image/jpeg' },
    location: [ 2, 5 ],
    title: 'Cool Pic',
    artist: 'Me',
    uploader: 'You',
    __v: 0