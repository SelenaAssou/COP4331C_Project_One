var urlBase = 'http://poosgroup5-u.cf/';
var extension = "php";

var userId = 0;
var firstName = "";
var lastName = "";
//var jsonContactsObject;

function doLogin()
{
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

  //getAllContacts()

}

function TEST()
{
  var table = document.getElementById("contactTable");
  var id = "one";
  $(table).find('tbody').append( "<tr class='success'><td>fname</td><td>lname</td><td>email</td><td>407-666-6666</td><td>orlando</td><td>fl</td><td>32828</td><td>Friend</td><td> <button type='button' onclick='Delete()'>Delete!</button> </td></tr>");
}

function getAllContacts()
{

// send sql request for all contacts... however u do that...
  var jsonPayload = '{"search all"}';
  var url = urlBase + '/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);

    jsonContactsObject = JSON.parse( xhr.responseText );

    var contactType = jsonContactsObject.contactType;

    var table = document.getElementById("contactTable");
    if(contactType == "Friend")
      $(table).find('tbody').append( "<tr class='success'><td>" + jsonContactsObject.firstName + "</td><td>" + jsonContactsObject.lastName + "</td><td>" + jsonContactsObject.email + "</td><td>" + jsonContactsObject.phoneNumber + "</td><td>" + jsonContactsObject.city + "</td><td>" + jsonContactsObject.state + "</td><td>" + jsonContactsObject.zip + "</td><td>" + contactType + "</td><button type='button' onclick='Delete()'>Delete!</button> </td></tr>");
    else if(contactType == "Foe")
      $(table).find('tbody').append( "<tr class='danger'><td>" + jsonContactsObject.firstName + "</td><td>" + jsonContactsObject.lastName + "</td><td>" + jsonContactsObject.email + "</td><td>" + jsonContactsObject.phoneNumber + "</td><td>" + jsonContactsObject.city + "</td><td>" + jsonContactsObject.state + "</td><td>" + jsonContactsObject.zip + "</td><td>" + contactType + "</td><button type='button' onclick='Delete()'>Delete!</button> </td></tr>");
    else if(contactType == "Coworker")
      $(table).find('tbody').append( "<tr class='info'><td>" + jsonContactsObject.firstName + "</td><td>" + jsonContactsObject.lastName + "</td><td>" + jsonContactsObject.email + "</td><td>" + jsonContactsObject.phoneNumber + "</td><td>" + jsonContactsObject.city + "</td><td>" + jsonContactsObject.state + "</td><td>" + jsonContactsObject.zip + "</td><td>" + contactType + "</td><button type='button' onclick='Delete()'>Delete!</button> </td></tr>");
    else if(contactType == "Family")
      $(table).find('tbody').append( "<tr class='warning'><td>" + jsonContactsObject.firstName + "</td><td>" + jsonContactsObject.lastName + "</td><td>" + jsonContactsObject.email + "</td><td>" + jsonContactsObject.phoneNumber + "</td><td>" + jsonContactsObject.city + "</td><td>" + jsonContactsObject.state + "</td><td>" + jsonContactsObject.zip + "</td><td>" + contactType + "</td><button type='button' onclick='Delete()'>Delete!</button> </td></tr>" );
    else
      $(table).find('tbody').append( "<tr class='active'><td>" + jsonContactsObject.firstName + "</td><td>" + jsonContactsObject.lastName + "</td><td>" + jsonContactsObject.email + "</td><td>" + jsonContactsObject.phoneNumber + "</td><td>" + jsonContactsObject.city + "</td><td>" + jsonContactsObject.state + "</td><td>" + jsonContactsObject.zip + "</td><td>" + contactType + "</td><button type='button' onclick='Delete()'>Delete!</button> </td></tr>" );

  }
  catch(err)
  {

  }
}

function doLogout()
{
  userId = 0;
  firstName = "";
  lastName = "";

  document.getElementById("introsection").style.visibility = "visible";
  document.getElementById("introsection").style.display = "block";
  document.getElementById("contactGroup").style.visibility = "hidden";
  document.getElementById("contactGroup").style.display = "none";
}

function doRegister()
{
}

function search()
{
  document.getElementById("searchTable").style.visibility = "visible";
  document.getElementById("searchTable").style.display = "block";
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";
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
