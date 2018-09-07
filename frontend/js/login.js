
var urlBase = 'https://poosgroup5-u.cf/';
var extension = 'php';

var ownerId = 0;
var firstName = "";
var lastName = "";
var buttonID = 0;

function doLogin() 
{
  document.getElementById("introsection").style.visibility = "hidden";
  document.getElementById("introsection").style.display = "none";
  document.getElementById("contactGroup").style.visibility = "visible";
  document.getElementById("contactGroup").style.display = "block";

  ownerId = 0;
  firstName = "";
  lastName = "";

  /*  var login = document.getElementById("username").value;
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
  //  document.getElementById("loginResult").innerHTML = err.message;
  // }
  addIDCookie();
  getAllContacts()

}

function getAllContacts()
{
// send sql request for all contacts... however u do that...
  var jsonPayload = '{"ownerID":"2"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
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
  xhr.open("POST", url, true);
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
  xhr.open("POST", url, true);
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
  alert("contact id is " + contactID + "blah blah blah")

  // send contact id to be deleteds
}

function addIDCookie(){
  //date isnt set so the cookie goes away once the browser is closed. (or until logout)
    document.cookie = "id=" + ownerId + "; path=/";
}

function removeIDCookie(){
  var date = new Date();
  d.setTime(d.getTime() + (-100)); //to remove a cookie, set the time to expire to be in the past.
    document.cookie = "id=; expires=" + d.toUTCString() + "; path=/";
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