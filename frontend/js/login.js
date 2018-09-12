
var urlBase = 'https://poosgroup5-u.cf/';
var extension = 'php';

var ownerId = 0;
var firstName = "";
var lastName = "";
var buttonID = 0;

function doLogin()
{

  ownerId = 0;

    var loginBox = document.getElementById("username");
    var passwordBox = document.getElementById("password");
    var login = encodeURI(loginBox.value);
    var password = passwordBox.value;
    if (login == '' || password == '') {
        alert("Username and Password cannot be blank");
        return;
    }

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
      if( ownerId < 1 )
      {
        $(document.getElementById("addMessage")).append('<div class="alert alert-danger alert-dismissible" id="badlogin">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Something went wrong!</strong> Make sure you typed your username and password correctly!</div>');
        return;
      } else { //successful login
        addIDCookie();
        getAllContacts();

        document.getElementById("introsection").style.visibility = "hidden";
        document.getElementById("introsection").style.display = "none";
        document.getElementById("contactGroup").style.visibility = "visible";
        document.getElementById("contactGroup").style.display = "block";
        $(document.getElementById("addMessage")).append('<div class="alert alert-success alert-dismissible" id="goodLogin">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Success!</strong> Welcome, ' + login + '! </div>');

        //clear the boxes
        loginBox.value = "";
        passwordBox.value = "";
      }
  }
  catch(err)
  {
    $(document.getElementById("addMessage")).append('<div class="alert alert-danger alert-dismissible" id="superbadLogin">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Error!</strong> Something went wrong! Please try again later. </div>');
  }
}

function getAllContacts()
{
  var jsonPayload = '{"ownerID":"' + ownerId + '"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = function (e)
  {
    try
    {
      if (this.readyState == 4)
      {

        var JSONObjectsArr = JSON.parse( this.responseText );

        var table = document.getElementById("contactTable");
        JSONObjectsArr.forEach(function (item, index) {
        addRowOnTable(table, item, index)
        });
      }

    }
    catch(err)
    {
      alert(err.message)
    }
  }
  xhr.send(jsonPayload);
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
}

function doRegister()
{
  var rUsername = encodeURI(document.getElementById("registerUsername").value);
  var rPassword = document.getElementById("registerPassword").value;
  var rConfirmPassword = document.getElementById("confirmPassword").value;

    if (rUsername == '' || rPassword == '') {
        alert("Username and Password cannot be blank");
        return;
    }

  if(rPassword != rConfirmPassword)
  {
    $(document.getElementById("addMessage")).append('<div class="alert alert-info alert-dismissible" id="passwordIssue">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Passwords do not match!</strong> Did not register user. </div>');
    return;
  }

  var jsonPayload = '{"username":"' + rUsername + '", "password":"' + rPassword + '"}';
  var url = urlBase + 'api/register.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function (e)
  {
    try
    {
      if (this.readyState == 4)
      {
        var result = JSON.parse( this.responseText ).success;

        if(result == 1)
        {
          $(document.getElementById("addMessage")).append('<div class="alert alert-success alert-dismissible" id="goodRegister">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Success!</strong> User has been successfully registered!</div>');
        }
        else if(result == 0)
        {
          $(document.getElementById("addMessage")).append('<div class="alert alert-info alert-dismissible" id="usedRegister">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Sorry!</strong> This username has already been taken!</div>');
        }
        else
        {
          $(document.getElementById("addMessage")).append('<div class="alert alert-danger alert-dismissible" id="badRegister">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Error!</strong> Something went wrong! Please try again later. </div>');
        }

      }
    }
      catch(err)
      {
        alert(err.message)
      }
  }
  xhr.send(jsonPayload);
}

function search()
{
  document.getElementById("searchTable").style.visibility = "visible";
  document.getElementById("searchTable").style.display = "block";
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";

  var fName = document.getElementById("searchFirst").value;
  var lName = document.getElementById("searchLast").value;

  var jsonPayload = '{"ownerID":"' + ownerId + '","firstName":"' + fName + '","lastName":"' + lName + '"}';
  var url = urlBase + 'api/searchContacts.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.onreadystatechange = function (e)
  {
    try
    {
      if (this.readyState == 4)
      {
        var JSONObjectsArr = JSON.parse( this.responseText );


        var table = document.getElementById("searchTable");
        while (table.rows.length > 1 )
        {
            table.deleteRow(1);
        }
        JSONObjectsArr.forEach(function (item, index) {
        addRowOnTable(table, item, index)
        });
      }
    }
    catch(err)
    {
      alert(err.message)
    }
  }
  xhr.send(jsonPayload);
}


function findCheckedOption()
{
  var i;
  for (i = 1; i <= 5; i++) {
    if(document.getElementById("optradio" + i).checked)
    {
      return document.getElementById("optradio" + i).value;
    }
  }
}

function addContact()
{
  var fName  = encodeURI(document.getElementById("firstName").value);
  var lName = encodeURI(document.getElementById("lastName").value);
  var email = (document.getElementById("email").value);
  var pNum = encodeURI(document.getElementById("phoneNum").value);
  var city = encodeURI(document.getElementById("city").value);
  var state = encodeURI(document.getElementById("state").value);
  var zipCode = encodeURI(document.getElementById("zip").value);
  var contactType = findCheckedOption();

  // regex patterns
  var emailPatt = new RegExp('[a-zA-Z0-9\\.\\+\\_\\-]+\\@[a-zA-Z0-9.]+\\.[a-zA-Z0-9]+');
  var zipPatt = new RegExp("^\\d{5}$");

  if (!zipPatt.test(zipCode)) {
    alert("Bad zipcode");
    return;
  }

  if (!emailPatt.test(email)) {
    alert("Bad email");
    return;
  }
                   
  var jsonPayload = '{"firstName": "' + fName + '", "lastName":"' + lName + '", "email":"' + email + '","phoneNumber":"' + pNum + '", "contactType":"' + contactType + '", "city":"' + city + '", "state":"' + state + '", "zip":"' + zipCode + '" , "ownerID": '+ ownerId +'}';
  var url = urlBase + 'api/addContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function (e)
  {
    try
    {
      if (this.readyState == 4)
      {
        var result = JSON.parse( this.responseText );

        if(result.success == 1)
        {

          $(document.getElementById("addMessage")).append('<div class="alert alert-success alert-dismissible" id="addGoodMessage">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Success!</strong> Contact has been added!</div>');

          var table = document.getElementById("contactTable");
            while (table.rows.length > 1 )
            {
                table.deleteRow(1);
            }
            getAllContacts();
        }
        else
        {
          $(document.getElementById("addMessage")).append('<div class="alert alert-danger alert-dismissible" id="addBadMessage">  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>  <strong>Error!</strong> Something went wrong with adding the contact! Please try again later.</div>');
        }
      }

    }

    catch(err)
    {
      alert(err.message)
    }
  }

  xhr.send(jsonPayload);
}


function Delete(contactID) {
  document.getElementById("resultMessage").style.visibility = "visible";
  document.getElementById("resultMessage").style.display = "block";

  var jsonPayload = '{"ownerID":"' + ownerId + '", "id": ' + contactID + '}';
  var url = urlBase + 'api/deleteContact.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function (e) {
    try {
      if (this.readyState == 4) {
        var resp = JSON.parse(this.responseText);
        if (resp.success !== 1) {
          alert("Unable to successfully delete contact");
        }
        var table = document.getElementById("contactTable");
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }
        getAllContacts();

      }
    }
    catch (err) {
      alert(err.message);
    }
  }

  xhr.send(jsonPayload);
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
