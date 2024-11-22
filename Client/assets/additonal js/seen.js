// var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test2/tar1";
// var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

$(document).ready(function () {
    if(sessionStorage.getItem("name")== null){
        alert("You need to log in to watch your seen list!");
        window.location.replace("index.html");
    }
    document.getElementById("header1").innerText += " of " + sessionStorage.getItem("name");
    colorEyeFunc();
});

function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method,
        url: api,
        data: data,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        success: successCB,
        error: errorCB
    });
}



function colorEyeFunc() {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/UserBookRead';
    let s = sessionStorage.getItem("email");   
    ajaxCall("POST", api, JSON.stringify(s), colorEyeFuncSCB, colorEyeFuncECB); 
}

function colorEyeFuncSCB(books) {
    console.log(books);
    displayBooks(books);
}

function colorEyeFuncECB(err) {
    console.log(err);
}

// function colorLikeFunc() {
//     let port = portGlobal;
//     let api = apiGlobal + port;
//     api+= '/api/Users/UserBookWant';
//     let s = sessionStorage.getItem("email");  
//     ajaxCall("POST", api, JSON.stringify(s), colorLikeFuncSCB, colorLikeFuncECB); 
// }

// function colorLikeFuncSCB(books) {
//     console.log(books);
//     displayBooks(books);
// }

// function colorLikeFuncECB(err) {
//     console.log(err);
// }

function displayBooks(books){
    let str = "";
    for(let i = 0; i < books.length; i++){
        str+= '<tr>'
        str+= '<td>'
        str += '<span class="d-flex gap-5 align-items-center">';
        str += '<a id="book'+ i +'" class="remove-icon">';
        str += '<img src="assets/img/icon/icon-9.svg" alt="img"> </a>';
        str += ' <span class="cart">';
        str += ' <img id="img' + books[i]["bookId"] + '" style="cursor:pointer" style="width:60px" src="';
        if( books[i]['coverImgUrl'] == ""){
            str+=  'assets/img/noCover.png';
        }
        else{
            str += books[i]['coverImgUrl'];
        }
        str+= '" alt="img">';
        str += '</span>';
        str += '<span id="title'+ books[i]["bookId"] +'" style="cursor:pointer" class="cart-title">';
        str += books[i]['title']; // title
        str += '  </span></span>';
        str+= '</td>'
        str+= '<td id= "author'+ books[i]["bookId"] +'">';
        str += 'author';
        str+= '</td>'
        str+= '<td>'
        str += '<span class="cart-price">'+ books[i]['price']+'$</span>';
        str+= '</td>'
        str+= '</tr>'
    }
    document.getElementById('bookList').innerHTML = str;
    for(let i = 0; i < books.length; i++){
        $('#book' + i).click(function (event) {
            changeColorEyeFunc(books[i]["bookId"]);
        });
        getBooksCat(books[i]["bookId"]);
        authorData(books[i]["bookId"]);
    }
}


function authorData(bookId) {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Books/authorFromBookId';
    let s = bookId;   
    ajaxCall("POST", api, JSON.stringify(s), function(data){authorDataSCB(data,bookId)}, authorDataECB); 
}

function authorDataSCB(authors, bookId) {
    console.log(authors);
    let str = "";
    for(let i = 0; i< authors.length; i++){      
    str +=  '<a href="author.html?authorId=' + authors[i]["authorId"] + '">' + authors[i]["authorName"] +  '</a>';
    str += "<br></br>";
    }
    document.getElementById("author"+bookId).innerHTML = str;
}

function authorDataECB(err) {
    console.log(err);
}



function getBooksCat(bookId) {
    console.log("aa");
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Books/categoryFromBookId';
    let s = bookId;   
    ajaxCall("POST", api, JSON.stringify(s), function(data) {getBooksCatSCB(data, bookId)}, getBooksCatECB); 
}

function getBooksCatSCB(cat, bookId) {
    $("#img" + bookId).click(function(){
        const params = $.param({
            bookId: bookId,
            categoryName: cat[0]["categoryName"]
            
        });
        window.location.href = 'shop-details.html?' + params;
    });
    $("#title" + bookId).click(function(){
        const params = $.param({
            bookId: bookId,
            categoryName: cat[0]["categoryName"]
            
        });
        window.location.href = 'shop-details.html?' + params;
    });
    console.log(cat);
}

function getBooksCatECB(err) {
    console.log(err);
}


// function changeColorLikeFunc(bookId){
//     let port = portGlobal;
//     let api = apiGlobal + port;
//     api+= '/api/Users/changeBookWant/email/' + sessionStorage.getItem("email") + '/bookId/' + bookId; 
//     ajaxCall("POST", api, "", changeColorLikeFuncSCB, changeColorLikeFuncECB); 
// }

// function changeColorLikeFuncSCB(done) {
//     console.log(done)
//     window.location.reload();
// }

// function changeColorLikeFuncECB(err) {
//     console.log(err);
// }


function changeColorEyeFunc(bookId){
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/changeBookRead/email/' + sessionStorage.getItem("email") + '/bookId/' + bookId; 
    ajaxCall("POST", api, "", changeColorEyeFuncSCB, changeColorEyeFuncECB); 
}

function changeColorEyeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorEyeFuncECB(err) {
    console.log(err);
}
