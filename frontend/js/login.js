
var urlBase = 'https://poosgroup5-u.cf/';
var extension = 'php';

var ownerId = 0;
var firstName = "";
var lastName = "";
var buttonID = 0;

function doLogin()
{

    function hideorShow(elementID, doShowElement) {
        var element = document.getElementById(elementID);
        element.hidden = !doShowElement;
    }

  ownerId = 0;
  firstName = "";
  lastName = "";

    var loginBox = document.getElementById("username");
    var passwordBox = document.getElementById("password");
    var login = loginBox.value;
    var password = passwordBox.value;

    var loginResultID = "loginResult";
    var loginResult = document.getElementById(loginResultID);
    hideorShow(loginResultID, false);

    var jsonPayload = '{"username" : "' + login + '", "password" : "' + password + '"}';
    var url = urlBase + 'api/login.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


    try
    {
      xhr.send(jsonPayload);

      var jsonObject = JSON.parse( xhr.responseText );

      ownerId = jsonObject.id;
      hideorShow(loginResultID, true);
      if( ownerId < 1 )
      {
          loginResult.innerHTML = "User/Password combination incorrect";
          loginResult.className = "alert alert-danger";

          return;
      } else { //successful login
        addIDCookie();
        getAllContacts();

        document.getElementById("introsection").style.visibility = "hidden";
        document.getElementById("introsection").style.display = "none";
        document.getElementById("contactGroup").style.visibility = "visible";
        document.getElementById("contactGroup").style.display = "block";
        loginResult.className = "alert alert-success";
        loginResult.innerHTML = "Welcome!";

        //clear the boxes
        loginBox.value = "";
        passwordBox.value = "";
      }
  }
  catch(err)
  {
    loginResult.innerHTML = err.message;
    hideorShow(loginResultID, true);
    loginResult.className = "alert alert-danger";
  }
}

function getAllContacts()
{
// send sql request for all contacts... however u do that...
  var jsonPayload = '{"ownerID":"2"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var JSONObjectsArr = JSON.parse( xhr.responseText );

    JSONObjectsArr.forEach(addRowOnTable)

  }
  catch(err)
  {
    alert(err.message)
  }
}

function addRowOnTable(item, index)
{
    var contactType = item.contactType;
    var table = document.getElementById("contactTable");
    if(contactType == "Friend")
    {
      $(table).find('tbody').append( "<tr class='success'><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" + item.email + "</td><td>" + item.phoneNumber + "</td><td>" + item.city + "</td><td>" + item.state + "</td><td>" + item.zip + "</td><td>" + contactType + "</td><td> <button type='button' id='button" + buttonID +"'>Delete!</button> </td></tr>");
    }
    else if(contactType == "Foe"){
      $(table).find('tbody').append( "<tr class='danger'><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" + item.email + "</td><td>" + item.phoneNumber + "</td><td>" + item.city + "</td><td>" + item.state + "</td><td>" + item.zip + "</td><td>" + contactType + "</td><td> <button type='button' id='button" + buttonID +"'>Delete!</button> </td></tr>");
    }
    else if(contactType == "Coworker"){
      $(table).find('tbody').append( "<tr class='info'><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" + item.email + "</td><td>" + item.phoneNumber + "</td><td>" + item.city + "</td><td>" + item.state + "</td><td>" + item.zip + "</td><td>" + contactType + "</td><td> <button type='button' id='button" + buttonID +"'>Delete!</button> </td></tr>");
    }
    else if(contactType == "Family"){
      $(table).find('tbody').append( "<tr class='warning'><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" + item.email + "</td><td>" + item.phoneNumber + "</td><td>" + item.city + "</td><td>" + item.state + "</td><td>" + item.zip + "</td><td>" + contactType + "</td><td> <button type='button' id='button" + buttonID +"'>Delete!</button> </td></tr>" );
    }
    else
    {
      $(table).find('tbody').append( "<tr class='active'><td>" + item.firstName + "</td><td>" + item.lastName + "</td><td>" + item.email + "</td><td>" + item.phoneNumber + "</td><td>" + item.city + "</td><td>" + item.state + "</td><td>" + item.zip + "</td><td>" + contactType + "</td><td> <button type='button' id='button" + buttonID +"'>Delete!</button> </td></tr>" );
    }

    var btn = document.getElementById("button" + buttonID);
    btn.onclick = function(){Delete(item.id)};

    buttonID = buttonID + 1;
}

function doLogout()
{
  ownerId = 0;
  firstName = "";
  lastName = "";

  document.getElementById("introsection").style.visibility = "visible";
  document.getElementById("introsection").style.display = "block";
  document.getElementById("contactGroup").style.visibility = "hidden";
  document.getElementById("contactGroup").style.display = "none";

  removeIDCookie();

  //remove all existing rows for the next user
  var contactTable = document.getElementById("listTableBody");
  var rows = contactTable.getElementsByTagName("tr");
  for (var i = 0; i !== rows.length;){
     rows[i].parentNode.removeChild(rows[i]);
  }
  document.getElementById("loginResult").hidden = true;
}

function doRegister()
{
  var rUsername = document.getElementById("registerUsername").value;
  var rPassword = document.getElementById("registerPassword").value;
  var rConfirmPassword = document.getElementById("confirmPassword").value;

  if(rPassword != rConfirmPassword)
  {
    alert("Passwords don't match! Type them again.");
    return;
  }

  var jsonPayload = '{"username":"' + rUsername + '", "password":"' + rPassword + '"}';
  var url = urlBase + 'api/register.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.send(jsonPayload);
    var result = JSON.parse( xhr.responseText );

    if(result == 1)
    {
        document.getElementById("registerGoodMessage").style.visibility = "visible";
    }
    else if(result == 0)
    {
        document.getElementById("registerUsedMessage").style.visibility = "visible";
    }
    else
    {
        document.getElementById("registerBadMessage").style.visibility = "visible";
    }

  }
  catch(err)
  {
    alert(err.message)
  }
}

function search()
{
  document.getElementById("searchTable").style.visibility = "visible";
  document.getElementById("searchTable").style.display = "block";
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";

  var jsonPayload = '{"ownerID":"2"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var JSONObjectsArr = JSON.parse( xhr.responseText );

    JSONObjectsArr.forEach(addRowOnTable)

  }
  catch(err)
  {
    alert(err.message)
  }
}

function addContact()
{
    alert("Contact Added!")
}

function Delete(contactID)
{
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";

  var jsonPayload = '{"ownerID":"' + '2' + '", "id": ' + contactID + '}';
  var url = urlBase + 'api/deleteContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var resp = JSON.parse( xhr.responseText );
    if (resp.success !== 1) {
        alert("Unable to successfully delete contact");
    }
    var table = document.getElementById("contactTable");
    while (table.rows.length > 1 )
    {
        table.deleteRow(1);
    }
    getAllContacts();
    
  }
  catch(err)
  {
    alert(err.message);
  }


}

function addIDCookie(){
  //date isnt set so the cookie goes away once the browser is closed. (or until logout)
    document.cookie = "id=" + ownerId + "; path=/";
}

function removeIDCookie(){
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}

function checkIDCookie(){
  var cookie = document.cookie;
  if (cookie.length > 0) {
      ownerId = cookie.substring(3);

      //show contacts panel
      document.getElementById("introsection").style.visibility = "hidden";
      document.getElementById("introsection").style.display = "none";
      document.getElementById("contactGroup").style.visibility = "visible";
      document.getElementById("contactGroup").style.display = "block";

      //simulate doLogin function
      getAllContacts();
  }
}
