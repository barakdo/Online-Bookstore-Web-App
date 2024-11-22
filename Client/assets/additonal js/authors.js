// var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test2/tar1";
// var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

let audio;
let dict = new Object();
$(document).ready(function () {
    if(getSearchStr() == -1){
        GetAuthors();
        document.getElementById("titleHeader1").innerHTML = 'All Authors';
        document.getElementById("titleHeader2").innerText = 'All Authors';
    }
    else{
        GetPartAuthors();
        document.getElementById("titleHeader1").innerHTML = 'All Authors match the search: "' + getSearchStr() + '"';
        document.getElementById("titleHeader2").innerText = 'All Authors match the search: "' + getSearchStr() + '"';
    }
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

function GetAuthors() {
    let type = getCatId();
    let port = portGlobal;
    let api = apiGlobal + port;
    let searchFor = getSearchFor();
    api+= '/api/Authors';
    ajaxCall("GET", api, "", function (data) { GetAuthorsSCB(data) }, GetAuthorsECB); 
}

function GetAuthorsSCB(authors) {
    console.log(authors);
    displayBooks(authors);
}

function GetAuthorsECB(err) {
    console.log(err);
}

function GetPartAuthors() {
    let type = getCatId();
    let port = portGlobal;
    let api = apiGlobal + port;
    let searchFor = getSearchFor();
    api+= '/api/Authors/partBooks/givenStr/' + getSearchStr();
    ajaxCall("GET", api, "", function (data) { GetPartAuthorsSCB(data) }, GetPartAuthorsECB); 
}

function GetPartAuthorsSCB(authors) {
    console.log(authors);
    displayBooks(authors);
}

function GetPartAuthorsECB(err) {
    console.log(err);
}


function displayBooks(authors) {
    let type = getCatId();
    var str = ""; 
    let count  = 0;
    let authorCount = 0;
    let lst = new Array();
    let flag = false;
    for(let i = 0; i < authors.length; i++){
        authorCount++;
        dict[count] = authors[i]['id'];     
        str+= '<div class="shop-list-items" style=""><div style="padding:5px 5px 5px 5px" class="shop-list-thumb"><img style="height: 100px;" id="img' + i + '" src="';
       
        if(authors[i]['authorImg'] == "Image not available")
            {
                str+= 'assets/img/noAuthor.png';
            }
            else{
                str+= authors[i]['authorImg']; //image
            }
        str+= '" alt="img"></div>';   
        str+= '<div class="shop-list-content" style="padding: 30px 0px 30px 0px; width: 100%"><h3><a style="cursor: default" id="title' + i + '">';
        str+= authors[i]['name']; //title
        str+= '</a></h3><h5>';
        str+='</div>';
        str+= '<div style="justify-content: flex-end; display:flex; width:100%;">';
        str+= '<a data-bs-toggle="modal" data-bs-target="#readMoreModal" id="info' + authors[i]["id"] + '"><button class="theme-btn style-2" style="color: white;padding: 10px 10px 10px 10px; height:50px;margin: 0 10px 0 10px; text-align: center;display: flex;justify-content: center;align-items: center;">More Information</button></a>';
        str+= '<a id="author' + authors[i]["id"] + '"><button class="theme-btn style-2" style="color: white;padding: 10px 10px 10px 10px;margin: 0 10px 0 10px; height:50px; text-align: center;display: flex;justify-content: center;align-items: center;">Books from this author</button></a>';
        str+='</div>';
        str+='</div>';
        count++;  
    }
    document.getElementById("booksList").innerHTML = str;
   
    for(let i = 0; i < authors.length; i++){
        $('#author' + authors[i]["id"]).click(function (event) {
            window.location.href ='author.html?authorId=' + authors[i]["id"];
        });
        $('#info' + authors[i]["id"]).click(function (event) {
        document.getElementById('readMoreModalLabel').innerText = authors[i]["name"];
        let image = apiGlobal.substring(0, apiGlobal.length - 1) + "6" + "/assets/img/noAuthor.png";
        if(authors[i]["authorImg"] != "Image not available"){
            image = authors[i]["authorImg"];
        }
        $("#authorImg").attr("src", image);
        document.getElementById('authorDesc').innerText = authors[i]["description"];
        let year = "Unknown";
        if(authors[i]["year"] != 0){
            year = authors[i]["year"];
        }
        document.getElementById('authorYear').innerText = "Year Of Birth: " + year;
        });     
    }

    if(authorCount == 1)
        {
            document.getElementById("resultsNum").innerText = "Showing One Author";
        }
        else if(authorCount == 0) {
            document.getElementById("resultsNum").innerText = "There is no Authors";
        }
        else{
            document.getElementById("resultsNum").innerText = "Showing " + authorCount + " Authors";
        }
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


function changeColorLikeFuncSCB(done) {
    console.log(done)
    window.location.reload();
}

function changeColorLikeFuncECB(err) {
    console.log(err);
}



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

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);  
    return {
        searchStr: params.get('searchStr')
    };
}


function getSearchStr() {
    const params = getQueryParams();
    if(params.searchStr == null){
        return -1;
    }
    return params.searchStr;
}

