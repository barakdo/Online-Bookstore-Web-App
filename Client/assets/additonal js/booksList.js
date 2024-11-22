// var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test2/tar1";
// var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

let audio;
let dict = new Object();
$(document).ready(function () {
    if(sessionStorage.getItem("isMute") == null){
        sessionStorage.setItem("isMute", 'false');
    }
    let type = getCatId();
    let catName = getCatName();
    if(sessionStorage.getItem("isMute") == "false"){
        audio = new Audio("assets/music/Books & Reading.mp3");
        if(type != -1){
            audio = new Audio("assets/music/" + catName + ".mp3");
        }
        audio.play();
    }

    switch(sessionStorage.getItem("isMute")){
        case 'true':
    if(getSearchFor()!="no"){
        document.getElementById("titleHeader1").innerHTML = 'Search For "'+ getSearchStr() + '" In ' + getSearchFor() + ' Search | ' + '<div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="muteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-xmark"></i></button></li></ul>  </div> ';
        document.getElementById("titleHeader2").innerText = 'Search For "'+ getSearchStr() + '" In ' + getSearchFor() + ' Search';
    }
    else{
        document.getElementById("titleHeader1").innerHTML = catName + " category | " + '<div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="muteBtn2"><i style=" color: #012E4A" class="fa-solid fa-volume-xmark"></i></button></li></ul>  </div> ';
        document.getElementById("titleHeader2").innerText = catName + " category";
    }
    break;
    case 'false':
        if(getSearchFor()!="no"){
            document.getElementById("titleHeader1").innerHTML = 'Search For "'+ getSearchStr() + '" In ' + getSearchFor() + ' Search | ' + '<div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="unmuteBtn1"><i style=" color: #012E4A" class="fa-solid fa-volume-high"></i></button></li></ul>  </div> ';
            document.getElementById("titleHeader2").innerText = 'Search For "'+ getSearchStr() + '" In ' + getSearchFor() + ' Search';
        }
        else{
            document.getElementById("titleHeader1").innerHTML = catName + " category | " + '<div style="display: inline-block;" class="shop-icon"><ul class="shop-icon d-flex justify-content-center align-items-center"><li><button onclick="muteChange()" id="unmuteBtn2"><i style=" color: #012E4A" class="fa-solid fa-volume-high"></i></button></li></ul>  </div> ';
            document.getElementById("titleHeader2").innerText = catName + " category";
        }
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
    let type = getCatId();
    let port = portGlobal;
    let api = apiGlobal + port;
    let searchFor = getSearchFor();
    if(searchFor != "no"){
        api+= '/api/Books/searchBook/accordingTo/' + searchFor + '/givenString/' + getSearchStr();
    }
    else{
        switch(type){
            case -1:
                api+= "/api/Books"
                break;
            default:
                api+= "/api/Categories/book/categoryId/" + type;
                break;
            }
        }     
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
    let lst = new Array();
    for(let i = 0; i < books.length; i++){
        if(!lst.includes(books[i]['bookId'])){
            dict[count] = books[i]['bookId'];
            lst.push(books[i]['bookId']);
            str+= '<div class="shop-list-items"><div class="shop-list-thumb"><img style="height: 300px; cursor: pointer" id="img' + i + '" src="';
            str+= books[i]['coverImgUrl']; //image
            if(books[i]['coverImgUrl'] == "")
                {
                    str += apiGlobal.substring(0, apiGlobal.length - 1) + "6" +'assets/img/noCover.png';
                }
            str+= '" alt="img"></div> <div class="shop-list-content" style="padding: 30px 0px 30px 0px;"><h3><a id="title' + i + '">';
            str+= books[i]['title']; //title
            str+= '</a></h3><h5>';
            str+= books[i]['price'] + "$</h5><br></br>"; //price
            str+= '<p id= "author' + books[i]['bookId'] + '"</p>'; //author
            str+= '<p id="desc';
            str+=  books[i]["bookId"]+ '">';
            str+= books[i]['description']; //description 
            str+= '</p> <div class="shop-btn">';
            str+= '<ul class="shop-icon d-flex justify-content-center align-items-center">'; 
            str+= '<li onclick="' + 'Read(';
            str+= '&#x0022 ' + books[i]["description"].replace(new RegExp('"', 'g'), '') + '&#x0022';
            str+= ')" id="speak';
            str += books[i]["bookId"];
            str+= '"><i class="fa-solid fa-volume-high"></i></li>';
            str+= '<li id="likeBtn'+ count+'"><a class="icon-2"><i id="likeSym'+ count+'" class="far fa-heart"></i></a></li>';
            str+= '<li id="eyeBtn'+ count+'"> <a class="icon-2"> <i id="eyeSym'+ count+'" class="far fa-eye"></i></a> </li> </ul>';
            str+= '</div> </div> </div>';
            count++;
        }   
    }
    document.getElementById("booksList").innerHTML = str;
    for(let i = 0; i < books.length; i++){
        for(let j = 0; j < booksCat.length; j++){
            if(books[i]["bookId"] == booksCat[j]["bookId"]){
                $("#img" + i).click(function(){
                    if(getCatName()!= null){
                        const params = $.param({
                            bookId: booksCat[j]["bookId"],
                            categoryName: getCatName()
                            
                        });
                        window.location.href = 'shop-details.html?' + params;
                    }
                    else{
                        const params = $.param({
                            bookId: booksCat[j]["bookId"],
                            categoryName: booksCat[j]["categoryName"]
                            
                        });
                        window.location.href = 'shop-details.html?' + params;
                    }
                   
                    
                });
                $("#title" + i).click(function(){
                    if(getCatName()!= null){
                        const params = $.param({
                            bookId: booksCat[j]["bookId"],
                            categoryName: getCatName()
                            
                        });
                        window.location.href = 'shop-details.html?' + params;
                    }
                    else{
                        const params = $.param({
                            bookId: booksCat[j]["bookId"],
                            categoryName: booksCat[j]["categoryName"]
                            
                        });
                        window.location.href = 'shop-details.html?' + params;
                    }
                    
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
    authorData(dict[i]);
    colorEyeFunc(i);
    colorLikeFunc(i);
    }

    if(count == 1)
        {
            document.getElementById("resultsNum").innerText = "Showing " + count + " Result";
        }
        else if(count == 0) {
            document.getElementById("resultsNum").innerText = "There is no results";
        }
        else{
            document.getElementById("resultsNum").innerText = "Showing " + count + " Results";
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
    document.getElementById("author"+bookId).innerHTML = str;
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

