google.books.load();
google.books.setOnLoadCallback(initialize);

function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  let isbn = 'ISBN:'+ getIsbn();
  console.log(isbn)
  viewer.load(isbn, embedNotFound, found);
}
function found(){
    viewer.nextPage(); 
}

function embedNotFound() {
    alert("no book preview available");
    window.close();
}

function getIsbn() {
    const params = new URLSearchParams(window.location.search);  
    return params.get('isbn');
}
