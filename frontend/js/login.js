
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

  hideMessages();

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

function hideMessages()
{
  document.getElementById("registerGoodMessage").style.display = "none";
  document.getElementById("registerGoodMessage").style.visibility = "hidden";
  document.getElementById("registerUsedMessage").style.display = "none";
  document.getElementById("registerUsedMessage").style.visibility = "hidden";
  document.getElementById("registerBadMessage").style.display = "none";
  document.getElementById("registerBadMessage").style.visibility = "hidden";
}

function getAllContacts()
{
  var jsonPayload = '{"ownerID":"' + ownerId + '"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var JSONObjectsArr = JSON.parse( xhr.responseText );

    var table = document.getElementById("contactTable");
    JSONObjectsArr.forEach(function (item, index) {
    addRowOnTable(table, item, index)
});

  }
  catch(err)
  {
    alert(err.message)
  }
}

function addRowOnTable(table, item, index)
{
  if(item != null)
  {
    var contactType = item.contactType;
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
  hideMessages();
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
    var result = JSON.parse( xhr.responseText ).success;

    if(result == 1)
    {
        document.getElementById("registerGoodMessage").style.visibility = "visible";
        document.getElementById("registerGoodMessage").style.display = "block";
    }
    else if(result == 0)
    {
        document.getElementById("registerUsedMessage").style.visibility = "visible";
        document.getElementById("registerUsedMessage").style.display = "block";
    }
    else
    {
        document.getElementById("registerBadMessage").style.visibility = "visible";
        document.getElementById("registerBadMessage").style.display = "block";
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

  var fName = document.getElementById("searchFirst").value;
  var lName = document.getElementById("searchLast").value;

  var jsonPayload = '{"ownerID":"' + ownerId + '","firstName":"' + fName + '","lastname":"' + lName + '"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);
    var JSONObjectsArr = JSON.parse( xhr.responseText );


    var table = document.getElementById("searchTable");
    JSONObjectsArr.forEach(function (item, index) {
    addRowOnTable(table, item, index)
});

  }
  catch(err)
  {
    alert(err.message)
  }
}


function findCheckedOption()
{
  optradio1
  var i;
  for (i = 1; i <= 5; i++) {
    if(document.getElementById("optradio" + i).checked == true)
    {
      return document.getElementById("optradio" + i).value;
    }
  }
}

function addContact()
{
  var fName  = document.getElementById("firstName").value;
  var lName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var pNum = document.getElementById("phoneNum").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var zipCode = document.getElementById("zip").value;
//  var contactType = findCheckedOption();

                   
  var jsonPayload = '{"firstName": "' + fName + '", "lastName":"' + lName + '", "email":"' + email + '","phoneNumber":"' + pNum + '", "contactType":"' + "friend" + '", "city":"' + city + '", "state":"' + state + '", "zip":"' + zipCode + '" , "ownerID": '+ ownerId +'}';
  alert(jsonPayload);
  var url = urlBase + 'api/addContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");


  try
  {
    xhr.send(jsonPayload);
    var result = JSON.parse( xhr.responseText );

    if(result.success == 1)
    {

        document.getElementById("addGoodMessage").style.visibility = "visible";
        document.getElementById("addGoodMessage").style.display = "block";
        var table = document.getElementById("contactTable");
        while (table.rows.length > 1 )
        {
            table.deleteRow(1);
        }
        getAllContacts();
    }
    else
    {
      document.getElementById("addBadMessage").style.visibility = "visible";
      document.getElementById("addBadMessage").style.display = "block";
    }

  }

  catch(err)
  {
    alert(err.message)
  }  

}


function Delete(contactID)
{
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";

  var jsonPayload = '{"ownerID":"' + ownerId + '", "id": ' + contactID + '}';
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
