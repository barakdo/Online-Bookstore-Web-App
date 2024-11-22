// var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test2/tar1";
// var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";
let audio;
let dict = new Object();
$(document).ready(function () {
    document.getElementById("titleHeader1").innerHTML = 'All Books Of All Authors';
        document.getElementById("titleHeader2").innerText = 'All Books Of All Authors';
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
    let type = getCatId();
    let port = portGlobal;
    let api = apiGlobal + port;
    let searchFor = getSearchFor();
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
    let type = getCatId();
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
        authorData(dict[i]);
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

    for(let i = 0; i < count; i++){
        $('#likeBtn' + i).click(function (event) {
            if(sessionStorage.getItem("email") ==null){
                alert("You need to log in to like a book!");
            }
            else{
                //changeColorLikeFunc(count , books);
                let port = portGlobal;
                let api = apiGlobal + port;
                api+= '/api/Users/changeBookWant/email/' + sessionStorage.getItem("email") + '/bookId/' + dict[i];
                let s = sessionStorage.getItem("email");  
                ajaxCall("POST", api, "", changeColorLikeFuncSCB, changeColorLikeFuncECB); 
            }
        });
        $('#eyeBtn' + i).click(function (event) {
            if(sessionStorage.getItem("email") ==null){
                alert("You need to log in to mark a book as seen!");
            }
            else{
                //changeColorEyeFunc(count, books);
                let port = portGlobal;
                let api = apiGlobal + port;
                api+= '/api/Users/changeBookRead/email/' + sessionStorage.getItem("email") + '/bookId/' + dict[i]; ///////////////
                let s = sessionStorage.getItem("email");  
                ajaxCall("POST", api, "", changeColorEyeFuncSCB, changeColorEyeFuncECB); 
            }
            
        });
    colorEyeFunc(i);
    colorLikeFunc(i);
    }

    if(authorCount == 1)
        {
            document.getElementById("resultsNum").innerText = "Showing One Author";
        }
        else if(authorCount == 0) {
            document.getElementById("resultsNum").innerText = "There is no Authors";
        }
        else{
            document.getElementById("resultsNum").innerText = "Showing Books for " + authorCount + " Authors";
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
    let str = "Written by: ";
    for(let i = 0; i< authors.length; i++){      
    str +=  '<a href="author.html?authorId=' + authors[i]["authorId"] + '">' + authors[i]["authorName"] +  '</a>';
    str += ", ";
    }
    str = str.substring(0, str.length - 2);
    str += "<br></br>"; 
    for(let i = 0; i < document.getElementsByClassName("author"+bookId).length; i++)
    document.getElementsByClassName("author"+bookId)[i].innerHTML = str;
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
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);  
    return {
        categoryId: params.get('categoryId'),
        categoryName: params.get('categoryName'),
        searchFor: params.get('searchFor'),
        searchStr: params.get('searchStr')
    };
}

function getCatId() {
    const params = getQueryParams();
    if(params.categoryId == null){
        return -1;
    }
    return params.categoryId;
}
function getCatName() {
    const params = getQueryParams();
    if(params.categoryName == null){
        return "Books list";
    }
    return params.categoryName;
}
function getSearchFor() {
    const params = getQueryParams();
    if(params.searchFor == null){
        return "no";
    }
    return params.searchFor;
}
function getSearchStr() {
    const params = getQueryParams();
    if(params.searchStr == null){
        return "no";
    }
    return params.searchStr;
}





function colorEyeFunc(count) {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/UserBookRead';
    let s = sessionStorage.getItem("email");   
    ajaxCall("POST", api, JSON.stringify(s), function(data){colorEyeFuncSCB(data, count)}, colorEyeFuncECB); 
}

function colorEyeFuncSCB(books, count) {
    colorBtn(books, "eye", count);
}

function colorEyeFuncECB(err) {
    console.log(err);
}

function colorLikeFunc(count) {
    let port = portGlobal;
    let api = apiGlobal + port;
    api+= '/api/Users/UserBookWant';
    let s = sessionStorage.getItem("email");  
    ajaxCall("POST", api, JSON.stringify(s), function(data) {colorLikeFuncSCB(data, count)}, colorLikeFuncECB); 
}

function colorLikeFuncSCB(books, count) {
    colorBtn(books, "like", count);
}

function colorLikeFuncECB(err) {
    console.log(err);
}


// function changeColorLikeFunc(count){
//     let port = portGlobal;
//     let api = apiGlobal + port;
//     api+= '/api/Users/changeBookWant/email/' + sessionStorage.getItem("email") + '/bookId/' + getbookId();
//     let s = sessionStorage.getItem("email");  
//     ajaxCall("POST", api, "", changeColorLikeFuncSCB, changeColorLikeFuncECB); 
// }

function changeColorLikeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorLikeFuncECB(err) {
    console.log(err);
}


// function changeColorEyeFunc(){
//     let port = portGlobal;
//     let api = apiGlobal + port;
//     api+= '/api/Users/changeBookRead/email/' + sessionStorage.getItem("email") + '/bookId/' + getbookId(); ///////////////
//     let s = sessionStorage.getItem("email");  
//     ajaxCall("POST", api, "", changeColorEyeFuncSCB, changeColorEyeFuncECB); 
// }

function changeColorEyeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorEyeFuncECB(err) {
    console.log(err);
}



function colorBtn(books, type, count){
    let colorEye = 'red';
    let inColorEye = 'white';
    switch(type){
        case 'eye':
        for(let i = 0; i < books.length; i++){
            if(books[i]['bookId'] == dict[count]){
                $("#eyeBtn" + count).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                $("#eyeSym" + count).css({"border-color" : colorEye, "color":inColorEye});
                $("#eyeBtn" + count).hover(function(){
                    $(this).css({"background-color": inColorEye, "border-color" : colorEye, "color":colorEye});
                    }, function(){
                    $(this).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                    
                  });
                $("#eyeSym" + count).hover(function(){
                    $(this).css({"border-color" : colorEye, "color":colorEye});
                    }, function(){
                    $(this).css({"border-color" : colorEye, "color":inColorEye});
                    
                });
            }
        }
        break;
        case 'like':
            for(let i = 0; i < books.length; i++){
                if(books[i]['bookId'] == dict[count]){
                    $("#likeBtn"+ count).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                    $("#likeSym" + count).css({"border-color" : colorEye, "color":inColorEye});
                    $("#likeBtn" + count).hover(function(){
                        $(this).css({"background-color": inColorEye, "border-color" : colorEye, "color":colorEye});
                        }, function(){
                        $(this).css({"background-color": colorEye, "border-color" : colorEye, "color":inColorEye});
                        
                      });
                    $("#likeSym" + count).hover(function(){
                        $(this).css({"border-color" : colorEye, "color":colorEye});
                        }, function(){
                        $(this).css({"border-color" : colorEye, "color":inColorEye});
                        
                    });
                }
            }
        break;
    }
}

