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
    // getBooksCat();
    displayBooks();  
    console.log(getFeatures()); 
});

// function getBooksCat() {
//     let port = portGlobal;
//     let api = apiGlobal + port + "/api/Categories/allBooksAllCategory";
//     ajaxCall("GET", api, "", getBooksCatSCB, getBooksCatECB);
// }

// function getBooksCatSCB(booksCat) {
//     GetBooks(booksCat);
// }

// function getBooksCatECB(err) {
//     console.log(err);
// }




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

// function ajaxCall(method, api, data, successCB, errorCB) {
//     $.ajax({
//         type: method,
//         url: api,
//         data: data,
//         cache: false,
//         contentType: "application/json",
//         dataType: "json",
//         success: successCB,
//         error: errorCB
//     });
// }

// function GetBooks(booksCat) {
//     let port = portGlobal;
//     let api = apiGlobal + port;
//     api+= '/api/Authors/allAuthorsAllBooks';
//     ajaxCall("GET", api, "", function (data) { GetGetBooksSCB(data, booksCat) }, GetGetBooksECB); 
// }

// function GetGetBooksSCB(books, booksCat) {
//     console.log(books);
//     displayBooks(books, booksCat);
// }

// function GetGetBooksECB(err) {
//     console.log(err);
// }


function displayBooks() {
    let features = getFeatures();
    console.log(features);
    var str = ""; 
    for(let i = 0; i < features.length; i++){
        
            str += '<div class="shop-list-items" style="background-color: #012E4A; color: white;padding: 20px 20px 20px 20px; font-weight: 700">';
            str += 'Feature #'+ Number(i+1) +' - ' + features[i]["title"];
            str+= '</div>';    
            str+= '<div class="shop-list-items"><div class="shop-list-thumb"><img style="height: 300px; cursor: pointer" id="img' + i + '" src="';
            str+= features[i]['img']; //image
            if(features[i]['img'] == "")
                {
                    str+= 'assets/img/noCover.png';
                }
            str+= '" alt="img"></div> <div class="shop-list-content" style="padding: 30px 30px 30px 30px;"><h3><a id="title' + i + '">';
            str+= features[i]['title']; //title
            str+= '</a></h3>';
            // str+='<h5>';
            // str+= features[i]['title'] + "</h5>"
            // str+="<br></br>"; //price
            //str+= '<p class= "author' + features[i]['id'] + '"></p>'; //author
            str+= '<p id="desc';
            str+=  features[i]["id"]+ '">';
            str+= features[i]['desc']; //description 
            str+= '</p> <div class="shop-btn">';
            str+= '<ul class="shop-icon d-flex justify-content-center align-items-center">'; 
            str+= '<li onclick="' + 'Read(';
            str+= '&#x0022 ' + features[i]["desc"].replace(new RegExp('"', 'g'), '') + '&#x0022';
            str+= ')" id="speak';
            str += features[i]["id"];
            str+= '"><i class="fa-solid fa-volume-high"></i></li>';
            str+= '</div> </div> </div>';
    }
    document.getElementById("booksList").innerHTML = str;
    document.getElementById("resultsNum").innerText = "Showing " + features.length + " Exciting Features!";
}
function Read(info){
    if(audio != null){
        audio.volume = 0.2;
    }
    responsiveVoice.speak(info, "UK English Male", {rate: 0.9});
}

function getFeatures(){
    const features = [
         {
            "id": 0,
            "title": "Text-to-Speech Feature with ResponsiveVoice",
            "desc": "This feature allows users to have any text on the website read aloud to them using the ResponsiveVoice text-to-speech engine. Users can click a designated button to hear the main content or select specific text on the page to be read aloud. This provides an accessible and convenient experience for users who prefer auditory learning or need assistance with reading.",
            "img": "assets/img/features/voice.png"
        },
         {
            "id": 1,
            "title": "Genre-Specific Background Music",
            "desc": "Each book category and individual book page on the site is accompanied by music specifically curated to match the genre. With 70 unique music tracks available, every page immerses users in the atmosphere of the genre, enhancing their browsing experience and making it more enjoyable.",
            "img": "assets/img/features/music.png"
        },
         {
            "id": 2,
            "title": "'Read A Little' Preview with Google Books",
            "desc": "For selected books, users can click the 'Read A Little' button on each book's page to open a new window where they can preview a portion of the book. This feature is powered by Google Books embedding, allowing users to sample the book before deciding to trade or purchase it.",
            "img": "assets/img/features/preview.png"
        },
         {
            "id": 3,
            "title": "Advanced Book and Author Search",
            "desc": "The advanced search feature allows users to search by book title, description, publisher, publication year, or author. Search results dynamically lead to either a book list page or an author list page, depending on the query. This flexible search functionality ensures users can quickly find books or discover other works by their favorite authors",
            "img": "assets/img/features/search.png"
        }        
    ];
    return features;
}

