//var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test1/FinalProj";
//var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";
let audio;
$(document).ready(function () {
    if(sessionStorage.getItem("isMute") == null){
        sessionStorage.setItem("isMute", 'false');
    }
    let catName = getCatName();
    if(sessionStorage.getItem("isMute") == "false"){
        audio = new Audio("assets/music/" + catName + ".mp3");
        audio.play();
    }
    // else if(!sessionStorage.getItem("isMute")){
    //     var audio = new Audio("assets/music/Books & Reading.mp3");
    //     audio2.play();
    // }
    switch(sessionStorage.getItem("isMute")){
        case 'true':
        document.getElementById("titleHeader1").innerHTML = 'Book Page' + ' | <div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="muteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-xmark"></i></button></li></ul>  </div> ';
        document.getElementById("titleHeader2").innerText = getCatName();
    break;
    case 'false':
            document.getElementById("titleHeader1").innerHTML = 'Book Page' + ' | <div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="unmuteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-high"></i></button></li></ul>  </div> ';
            document.getElementById("titleHeader2").innerText = getCatName();    
    break;
}
colorEyeFunc();
colorLikeFunc();
$('#likeBtn').click(function (event) {
    if(sessionStorage.getItem("email") ==null){
        alert("You need to log in to like a book!");
    }
    else{
        changeColorLikeFunc();
    }
});
$('#eyeBtn').click(function (event) {
    if(sessionStorage.getItem("email") ==null){
        alert("You need to log in to mark a book as seen!");
    }
    else{
        changeColorEyeFunc();
    }
});

    GetBooks();
});

function muteChange(){
    if(sessionStorage.getItem("isMute") == "true"){
        sessionStorage.setItem("isMute", "false");
        window.location.reload();
    }
    else{
        sessionStorage.setItem("isMute", "true");
        window.location.reload();
    }
}

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

function GetBooks() {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Books';   
    ajaxCall("GET", api, "", GetGetBooksSCB, GetGetBooksECB); 
}

function GetGetBooksSCB(books) {
    displayBooks(books);
}

function GetGetBooksECB(err) {
    console.log(err);
}


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);  
    return {
        bookId: params.get('bookId'),
        categoryName: params.get('categoryName')
    };
}


function getbookId() {
    const params = getQueryParams();
    if(params.bookId == null){
        return -1;
    }
    return params.bookId;
}

function getCatName() {
    const params = getQueryParams();
    if(params.categoryName == null){
        return "Books list";
    }
    return params.categoryName;
}


function displayBooks(books) {  
    for(let i=0; i < books.length; i++){
        let book = books[i];
        if(books[i]["bookId"] == getbookId()){       
            document.getElementById("imgBook").innerHTML = strReturn('coverImgUrl', book);
            document.getElementById("titleBook").innerHTML = strReturn('title', book);
            document.getElementById("descBook").innerHTML = strReturn('desc', book);
            document.getElementById("priceBook").innerHTML = strReturn('price', book);
            document.getElementById("publisherBook").innerHTML = strReturn('publisher', book);
            document.getElementById("categoryBook").innerHTML = strReturn('category', book);
            document.getElementById("publishDateBook").innerHTML = strReturn('publishDate', book);
            document.getElementById("pageCountBook").innerHTML = strReturn('pageCount', book);
            document.getElementById("digitalBook").innerHTML = strReturn('digital', book);
            document.getElementById("bookIdentifierBook").innerHTML = strReturn('bookIdentifier', book);
            document.getElementById("isbnBook").innerHTML = strReturn('isbn', book);
            document.getElementById("langBook").innerHTML = strReturn('lang', book);
            document.getElementById("ratingBook").innerHTML = strReturn('rating', book);
            colorBtn(book);
            document.getElementById("readMoreModalLabel").innerText = book['title'] + "\n(zoom in a little to read the book)";
            $("#speakBtn").attr("onClick", 'Read("'+book["description"].replace(/['"]/g, "") + '")');
            authorData(book["bookId"]);      
            $('#embedBtn').click(function (event) {
                const windowFeatures = "width=840,height=1000,left=800,top=200";
                window.open("bookViewer.html?isbn=" + book["isbn"], '_blank', windowFeatures);
            });           
            break;
        }
    }  
}



function authorData(bookId) {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Books/authorFromBookId';
    let s = bookId;   
    ajaxCall("POST", api, JSON.stringify(s), authorDataSCB, authorDataECB); 
}

function authorDataSCB(author) {
    console.log(author);
    let str = "<div style='display: inline-grid; grid-template-columns: auto auto; gap: 50px 100px;  justify-items: center; align-items: center;'>";
    for(let i = 0; i < author.length; i++){
         //image
        str += '<div style="display: inline-grid">'; 
        str += '<a href="author.html?authorId=' + author[i]["authorId"] + '">';
        str += '<img style="height:80px" src="';
        if(author[i]["authorImg"] == "Image not available"){
            str+='assets/img/noAuthor.png';
        }
        else{
            str+=author[i]["authorImg"];
        }
        
        str+='" alt="img">';
        //str += author[i]["authorName"];
        str+= '</div>';
        //name
        str += '<div style="display: inline-grid">'; 
        str += author[i]["authorName"];
        str+= '</a></div>';
    }
    str+= '</div>';
    document.getElementById("authorName").innerHTML = str;
}

function authorDataECB(err) {
    console.log(err);
}



function Read(info){
    if(audio != null){
        audio.volume = 0.2;
    }
    responsiveVoice.speak(info, "UK English Male", {rate: 0.9});
}

function colorEyeFunc() {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/UserBookRead';
    let s = sessionStorage.getItem("email");   
    ajaxCall("POST", api, JSON.stringify(s), colorEyeFuncSCB, colorEyeFuncECB); 
}

function colorEyeFuncSCB(books) {
    colorBtn(books, "eye");
}

function colorEyeFuncECB(err) {
    console.log(err);
}

function colorLikeFunc() {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/UserBookWant';
    let s = sessionStorage.getItem("email");  
    ajaxCall("POST", api, JSON.stringify(s), colorLikeFuncSCB, colorLikeFuncECB); 
}

function colorLikeFuncSCB(books) {
    colorBtn(books, "like");
}

function colorLikeFuncECB(err) {
    console.log(err);
}


function changeColorLikeFunc(){
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/changeBookWant/email/' + sessionStorage.getItem("email") + '/bookId/' + getbookId();
    let s = sessionStorage.getItem("email");  
    ajaxCall("POST", api, "", changeColorLikeFuncSCB, changeColorLikeFuncECB); 
}

function changeColorLikeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorLikeFuncECB(err) {
    console.log(err);
}


function changeColorEyeFunc(){
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/changeBookRead/email/' + sessionStorage.getItem("email") + '/bookId/' + getbookId();
    let s = sessionStorage.getItem("email");  
    ajaxCall("POST", api, "", changeColorEyeFuncSCB, changeColorEyeFuncECB); 
}

function changeColorEyeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorEyeFuncECB(err) {
    console.log(err);
}



function colorBtn(books, type){
    let colorLike = 'red';
    let colorEye = 'red';
    let inColorLike = 'white';
    let inColorEye = 'white';
    switch(type){
        case 'eye':
        for(let i = 0; i < books.length; i++){
            if(books[i]['bookId'] == getbookId()){
                $("#eyeBtn").css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                $("#eyeBtn").hover(function(){
                    $(this).css({"background-color": inColorEye, "border-color" : colorEye, "color":colorEye});
                    }, function(){
                    $(this).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                    
                  });
            }
        }
        break;
        case 'like':
            for(let i = 0; i < books.length; i++){
                if(books[i]['bookId'] == getbookId()){
                    $("#likeBtn").css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                $("#likeBtn").hover(function(){
                    $(this).css({"background-color": inColorEye, "border-color" : colorEye, "color":colorEye});
                    }, function(){
                    $(this).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                    
                  });
                }
            }
        break;
    }
}



function strReturn(field ,book){
    
    switch(field){
        case 'coverImgUrl':
            if(book['coverImgUrl'] == "")
                {
                    return '<img style="width: 500px" src="' + 'assets/img/noCover.png' + '" alt="img">';
                }
            return '<img style="width: 500px" src="' + book['coverImgUrl'] + '" alt="img">';
            break;
        case 'title':
            return book['title'];
            break;
        case 'desc':
            return book['description'];
            break;
        case 'price':
            return book['price'] + "$";
            break;
        case 'publisher':
            let rtnStr1 = '<span>Publisher:</span> ';
            rtnStr1 += (book['publisher'] == "")?'Unknown':book['publisher'];
            return rtnStr1;
            //return '<span>Publisher:</span> ' + book['publisher'];
            break;
        case 'category':
            return '<span>Category:</span> ' + getCatName();
            break;
        case 'publishDate':
            return '<span>Year of Publish:</span> ' + new Date(book['publishDate']).getFullYear();
            break;
        case 'pageCount':
            if(book['pageCount'] == -1){
                return '<span>Total Pages:</span> ' + 'Unknown';
            }
            else{
                return '<span>Total Pages:</span> ' + book['pageCount'];
            }
            break;
        case 'digital':
            let rtnStr = '<span>Digital?</span> ';
            rtnStr += book['digital']?'Yes':"No";
            return rtnStr;
            break;
        case 'bookIdentifier':
            return '<span>Identifier:</span>' + book['bookIdentifier'];
            break;
        case 'isbn':
            return '<span>Isbn:</span>' + book['isbn'];
            break;
        case 'lang':
            let rtnStr2 = '<span>Language:</span> ';
            rtnStr2 += (book['language'] == "en")?'English':book['language'];
            return rtnStr2;
            break;
        case 'rating':
            
            if(book["ratingCount"] == 0 || parseFloat(book['averageRating']) > 5){
                return '<span>No Reviews</span>';
            }
            else{
                let str = "";
                let num = parseFloat(book['averageRating']);
                let count = 5;
                while(num >=1)
                    {
                        console.log(num);
                        str += '<a style="cursor:auto"><i class="fas fa-star"></i></a>';
                        num--;
                        count--;
                    }
                if(num >= 0.5)
                    {
                        str += '<a style="cursor:auto"><i class="fa-regular fa-star-half-stroke"></i></a>';
                        count--;
                    }
                while(count >=1){
                        str += '<a style="cursor:auto"><i class="fa-regular fa-star"></i></a>';
                        count--;
                    }
                str +=  '<span>(' + book['ratingCount'] +' Customer Reviews)</span>';          
                return str;           
            }    
        break;
    }
}