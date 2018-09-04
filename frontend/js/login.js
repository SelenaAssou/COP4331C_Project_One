var urlBase = 'http://poosgroup5-u.cf/';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";


$('.nav-tabs a[href="#login-form"]').click(function () {
  $(this).tab('show');
  $('.nav-tabs a[href="#register-form"]').tab('hide')
})
$('.nav-tabs a[href="#register-form"]').click(function () {
  $(this).tab('show');
  $('.nav-tabs a[href="#login-form"]').tab('hide')
})

function doLogin() {
  document.getElementById("introsection").style.visibility = "hidden";
  document.getElementById("introsection").style.display = "none";
  document.getElementById("contactGroup").style.visibility = "visible";
  document.getElementById("contactGroup").style.display = "block";

  userId = 0;
  firstName = "";
  lastName = "";

  /*	var login = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    document.getElementById("loginResult").innerHTML = "";

    var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
    var url = urlBase + '/Login.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.send(jsonPayload);

      var jsonObject = JSON.parse( xhr.responseText );

      userId = jsonObject.id;

      if( userId < 1 )
      {
        hideorShow("loginResult", True)
        document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
        return;
      }


      firstName = jsonObject.firstName;
      lastName = jsonObject.lastName;

      document.getElementById("userName").innerHTML = firstName + " " + lastName;

      hideorShow("loginResult", True)
      document.getElementById("loginResult").innerHTML = "Hello, " & document.getElementById("userName").value;

      document.getElementById("loginName").value = "";
      document.getElementById("loginPassword").value = "";*/

  // }
  // catch(err)
  // {
  // 	document.getElementById("loginResult").innerHTML = err.message;
  // }

}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";

  document.getElementById("introsection").style.visibility = "visible";
  document.getElementById("introsection").style.display = "block";
  document.getElementById("contactGroup").style.visibility = "hidden";
  document.getElementById("contactGroup").style.display = "none";
}

function doRegister() {

}
