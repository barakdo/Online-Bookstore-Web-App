//var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test1/FinalProj";
//var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

$(document).ready(function () {
    GetBooksSpinning();
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


function GetBooksSpinning() {
    let port = portGlobal;
    let api = apiGlobal + port + "/api/Categories/img";
    ajaxCall("GET", api, "", GetBooksSpinningSCB, GetBooksSpinningECB);
}

function GetBooksSpinningSCB(books) {
    console.log(books);
    displayBooksSpinning(books);
}

function GetBooksSpinningECB(err) {
    console.log(err);
}


function displayBooksSpinning(books) {
    var str = "";
    for(let i = 0; i < books.length; i++){
        str+= '<div id="btn' + i + '" class="swiper-slide">';
        str+= '<div class="book-catagories-items">';
        str+= ' <div class="book-thumb">';
        str+= ' <img style="height: 144px" src="';
        str+= books[i]['coverImgUrl']; //img
        str+= '" alt="img">';
        str+= '<div class="circle-shape"> <img src="assets/img/book-categori/circle-shape.png" alt="shape-img"> </div> </div>';
        str+= ' <div class="number">';
        str+= i;
        str+= '</div>';
        str+='<h3><a>';
        str+= books[i]["categoryName"]; //category's title
        str+='</a></h3></div></div>';
    }
    document.getElementById("spinningCategory").innerHTML = str;
    $("#contCat").css("maxWidth", ("1600px"));
    for(let i = 0; i < books.length; i++){
        
            $('#btn' + i).click(function() {             
                const params = $.param({
                    categoryId: books[i]["categoryId"],
                    categoryName: books[i]["categoryName"]
                });
                window.location.href = 'shop-list.html?' + params;
            }); 
    }
}





                            
                               
                                  
                                    
                                       
                                   
                               
                                 
                            
                        