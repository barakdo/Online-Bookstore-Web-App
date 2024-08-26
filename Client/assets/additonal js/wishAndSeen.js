//var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test1/FinalProj";
//var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

$(document).ready(function () {
    $('#wishlistBtn').click(function (event) {
        if(sessionStorage.getItem("email") ==null){
            alert("You need to log in to watch your wishlist!");
        }
        else{
            $("#wishlistBtn").attr("href", "wishlist.html");
        }
    });
    $('#seenBtn').click(function (event) {
        if(sessionStorage.getItem("email") ==null){
            alert("You need to log in to watch you seen list!");
        }
        else{
            $("#seenBtn").attr("href", "seen.html");
        }
    });
    $('#wishlistBtn1').click(function (event) {
        if(sessionStorage.getItem("email") ==null){
            alert("You need to log in to watch your wishlist!");
        }
        else{
            $("#wishlistBtn1").attr("href", "wishlist.html");
        }
    });
    $('#seenBtn1').click(function (event) {
        if(sessionStorage.getItem("email") ==null){
            alert("You need to log in to watch you seen list!");
        }
        else{
            $("#seenBtn1").attr("href", "seen.html");
        }
    });
});