//var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test1/FinalProj";
//var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";
let audio;
let dict = new Object();
$(document).ready(function () {
    if(sessionStorage.getItem("isMute") == null){
        sessionStorage.setItem("isMute", 'false');
    }
    if(sessionStorage.getItem("isMute") == "false"){
        audio = new Audio("assets/music/exciting.mp3");
        audio.play();
    }
    switch(sessionStorage.getItem("isMute")){
        case 'true':
            document.getElementById("titleHeader1").innerHTML = "The Site's Special Features!" + ' | <div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="muteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-xmark"></i></button></li></ul>  </div> ';
            document.getElementById("titleHeader2").innerText = "The Site's Special Features!";
        break;
        case 'false':
            document.getElementById("titleHeader1").innerHTML = "The Site's Special Features!" + ' | <div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="unmuteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-high"></i></button></li></ul>  </div> ';
            document.getElementById("titleHeader2").innerText = "The Site's Special Features!";    
        break;
    }
    getBooksCat();   
});

function getBooksCat() {
    let port = portGlobal;
    let api = apiGlobal + port + "/api/Categories/allBooksAllCategory";
    ajaxCall("GET", api, "", getBooksCatSCB, getBooksCatECB);
}

function getBooksCatSCB(booksCat) {
    GetBooks(booksCat);
}

function getBooksCatECB(err) {
    console.log(err);
}




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

function GetBooks(booksCat) {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Authors/allAuthorsAllBooks';
    ajaxCall("GET", api, "", function (data) { GetGetBooksSCB(data, booksCat) }, GetGetBooksECB); 
}

function GetGetBooksSCB(books, booksCat) {
    console.log(books);
    displayBooks(books, booksCat);
}

function GetGetBooksECB(err) {
    console.log(err);
}


function displayBooks(books, booksCat) {
    var str = ""; 
    let count  = 0;
    let authorCount = 0;
    let lst = new Array();
    let flag = false;
    for(let i = 0; i < books.length; i++){
        if(!lst.includes(books[i]['authorId'])){
            str += '<div class="shop-list-items" style="background-color: #012E4A; color: white;padding: 20px 20px 20px 20px; font-weight: 700">';
            str += 'All Books Written By: ';
            str += '<a style="color:white" href="author.html?authorId=' + books[i]["authorId"] + '">';
            str+= books[i]['authorName'];
            str += '</a>';
            str+= '</div>';
            lst.push(books[i]['authorId']);
            authorCount++;
            flag = true;
        }
            dict[count] = books[i]['bookId'];      
            str+= '<div class="shop-list-items"><div class="shop-list-thumb"><img style="height: 300px; cursor: pointer" id="img' + i + '" src="';
            str+= books[i]['coverImgUrl']; //image
            if(books[i]['coverImgUrl'] == "")
                {
                    str+= 'assets/img/noCover.png';
                }
            str+= '" alt="img"></div> <div class="shop-list-content" style="padding: 30px 0px 30px 0px;"><h3><a id="title' + i + '">';
            str+= books[i]['title']; //title
            str+= '</a></h3><h5>';
            str+= books[i]['price'] + "$</h5><br></br>"; //price
            str+= '<p class= "author' + books[i]['bookId'] + '"></p>'; //author
            // str+= '<div class="star">';
            //str+= '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-regular fa-star"></i></div>'; 
            str+= '<p id="desc';
            str+=  books[i]["bookId"]+ '">';
            str+= books[i]['description']; //description 
            str+= '</p> <div class="shop-btn">';
            //str+= '<a href="shop-details.html" class="theme-btn"><i'; 
            //str+= 'class="fa-solid fa-basket-shopping"></i> Add To Cart</a>';
            str+= '<ul class="shop-icon d-flex justify-content-center align-items-center">'; 
            str+= '<li onclick="' + 'Read(';
            str+= '&#x0022 ' + books[i]["description"].replace(new RegExp('"', 'g'), '') + '&#x0022';
            str+= ')" id="speak';
            str += books[i]["bookId"];
            str+= '"><i class="fa-solid fa-volume-high"></i></li>';
            //str+= '<li><a href="shop-cart.html"><i class="far fa-heart"></i></a></li>';
            str+= '<li id="likeBtn'+ count+'"><a class="icon-2"><i id="likeSym'+ count+'" class="far fa-heart"></i></a></li>';
            //str+= '<li> <a href="shop-cart.html"><img class="icon" src="assets/img/icon/shuffle.svg" alt="svg-icon"> </a> </li>'; 
            str+= '<li id="eyeBtn'+ count+'"> <a class="icon-2"> <i id="eyeSym'+ count+'" class="far fa-eye"></i></a> </li> </ul>';
            //str+= '<li> <a href="shop-details.html"><i class="far fa-eye"></i></a> </li> </ul>';
            str+= '</div> </div> </div>';
            count++;
        // if(flag){
        //     str+= '';
        //     flag = false;
        // }   
    }
    document.getElementById("booksList").innerHTML = str;
    for(let i = 0; i < books.length; i++){
        for(let j = 0; j < booksCat.length; j++){
            if(books[i]["bookId"] == booksCat[j]["bookId"]){
                $("#img" + i).click(function(){
                    const params = $.param({
                        bookId: booksCat[j]["bookId"],
                        categoryName: booksCat[j]["categoryName"]
                        
                    });
                    window.location.href = 'shop-details.html?' + params;
                });
                $("#title" + i).click(function(){
                    const params = $.param({
                        bookId: booksCat[j]["bookId"],
                        categoryName: booksCat[j]["categoryName"]
                        
                    });
                    window.location.href = 'shop-details.html?' + params;
                });
                break;
            }
        }
    }
            document.getElementById("resultsNum").innerText = "Showing 4 Exciting Features!";
}



