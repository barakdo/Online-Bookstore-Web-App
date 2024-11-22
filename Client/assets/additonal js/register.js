// var apiGlobal = "https://proj.ruppin.ac.il/cgroup78/test2/tar1";
// var portGlobal = "";
var apiGlobal = "https://localhost:";
var portGlobal = "7011";

$(document).ready(function () {

    if(sessionStorage.getItem("loggedIn")){
        document.getElementById("helloLabel").innerHTML = '<i class="fa-light fa-heart"></i> hi, '+ sessionStorage.getItem("name") + '!';
        $('#topLoginBtn').hide();
        $('#logoutBtn').show();
        }
        else{
        document.getElementById("helloLabel").innerHTML = '<i class="fa-light fa-heart"></i> hi, guest!';
        $('#logoutBtn').hide();
        $('#topLoginBtn').show();
        }

        $('#logoutBtn').click(function (event) {
            sessionStorage.clear();
            location.reload();
        });
    // $('#signUpForm').hide();

    // $('#buttonSignIn').click(function (event) {
    //     event.preventDefault();
    //     $('#signInForm').hide();
    //     $('#signUpForm').show();
    // });
    // $('#buttonSignUp').click(function (event) {
    //     event.preventDefault();
    //     $('#signInForm').show();
    //     $('#signUpForm').hide();
    // });
    // $("#buttonIndex").click(function () {
    //     window.open("index.html", "_self");
    // });

    // $("#buttonMyCourses").click(function () {
    //     window.open("MyCourses.html", "_self");
    // });
    // $("#buttonInstructors").click(function () {
    //     window.open("InstructorsPage.html", "_self");
    // });
    // $("#buttonAdminPage").click(function () {
    //     window.open("admin.html", "_self");
    // });
    // if (!adminIsLogin()) {
    //     $("#buttonAdminPage").prop("disabled", true).css({ 'opacity': 0.5, 'transform': 'translate(2px, 2px)', 'box-shadow': '#422800 0px 0px 0 0' });
    // }
    // function adminIsLogin() {
    //     return sessionStorage.getItem('email') == "admin@admin.com" && sessionStorage.getItem('password') == "admin";
    // }

    $('#buttonSignIn1').hide();
    $('#buttonSignIn1').click(function (event) {
        event.preventDefault();
        $('#buttonSignIn2').hide();
        $('#buttonSignUp2').show();
    });
    $('#buttonSignUp1').click(function (event) {
        event.preventDefault();
        $('#buttonSignIn2').show();
        $('#buttonSignUp2').hide();
    });
    $('#buttonSignIn2').click(function (event) {
        event.preventDefault();
        $('#buttonSignIn1').hide();
        $('#buttonSignUp1').show();
    });
    $('#buttonSignUp2').click(function (event) {
        event.preventDefault();
        $('#buttonSignIn1').show();
        $('#buttonSignUp1').hide();
    });
    
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passFormat = /^.{3,}$/;

    $("#signUpForm").submit(function (event) {
        if (
            emailFormat.test($("#emailReg").val()) &&
            passFormat.test($("#passwordReg").val())
        ) {
            event.preventDefault();
            SignUp($("#emailReg").val(), $("#name").val(), $("#passwordReg").val());
            // SignUp($("#name").val(), $("#emailReg").val(), $("#passwordReg").val(), document.getElementById("checkboxelement").checked);
        } else {
            event.preventDefault();
            alert("ERROR: Password format or Email format is incorrect. Password should be at least 3 characters or invalid email format");
        }
    });

    $("#signInForm").submit(function (event) {
        if (
            emailFormat.test($("#emailLogin").val()) &&
            passFormat.test($("#passwordLogin").val())
        ) {
            event.preventDefault();
            Login($("#emailLogin").val(), $("#passwordLogin").val());
        } else {
            event.preventDefault();
            alert("ERROR: Password format or Email format is incorrect. Password should be at least 3 characters or invalid email format");
        }
        return false;
    });
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

function Login(emailTry, passwordTry) {
    let port = portGlobal;
    let api = apiGlobal + port + "/api/Users/ifUserExists";
    let s = new Array();
    s.push(emailTry);
    s.push(passwordTry);
    ajaxCall("POST", api, JSON.stringify(s), LoginSCB, LoginECB);
}

function LoginSCB(user) {
    if (user == null) {
        alert("ERROR: email or password not found");
    } else {
        alert("Welcome " + user.name);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("email", user["email"]);
        sessionStorage.setItem("name", user["name"]);
        sessionStorage.setItem("password", user["pass"]);
        $("#loginStatus").text(user.name + "is loged in");
        window.open("index.html", "_self");
    }
}

function LoginECB(err) {
    console.log(err);
}

function SignUp(email, username, password) {
    // let checked = "no";
    // if (isChecked) {
    //     checked = "yes";
    // }
    // console.log(checked);
    let port = portGlobal;
    let api = apiGlobal + port + "/api/Users/AddUser";
    let s = new Array();
    s.push(email);
    s.push(username);
    s.push(password);
    // s.push(checked);
    console.log(s);
    ajaxCall("POST", api, JSON.stringify(s), SignUpSCB, SignUpECB);
}

function SignUpSCB(user) {
    if (user == false) {
        alert("Registeration failed. Email has already been used");
    }
    else {
        alert("User successfully registered! Please login to your new account!");
    }
    location.reload();
}

function SignUpECB(err) {
    console.log(err);
    alert("Error");
}

