selectData();
function handleUserData() {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let contact = document.getElementById("contact").value;
  if (firstname == "" || lastname == "" || contact == "") {

    resetInput()
    showMessage("Please enter all fields")
  } else if (!phonenumber(contact)) {
    showMessage("Contact Number is Not Correct");
    resetInput()
  } else {
    let name = firstname + " " + lastname;
    let arr = getCrudData();
    console.log("Length" + contact.length);
    let userObj = {
      name: name,
      contact: contact,
    };

    if (arr == null) {
      let data = [userObj];
      setCrudData(data);
    } else {
      const hasDuplicateName = arr.some(
        (person) => person.name === userObj.name
      );
      const hasDuplicateContact = arr.some(
        (person) => person.contact === userObj.contact
      );
      console.log(hasDuplicateName, hasDuplicateContact);
      if (hasDuplicateName && hasDuplicateContact)
        showMessage("Both Name and Contacts are Duplicate, Must be Unique");
      else if (hasDuplicateName) showMessage("Name Duplicate, Must Be Unique");
      else if (hasDuplicateContact)
        showMessage("Contact Duplicate, Must Be Unique");
      else {
        arr.push(userObj);
        setCrudData(arr);
        showMessage("Data Added");
      }
    }
  resetInput()
    selectData();
  }
}

function selectData() {
  let arr = getCrudData();

  if (arr != null) {
    let html = "";
    let sno = 1;
    for (let eachObj in arr) {
      html =
        html +
        `<tr><td>${sno++}</td><td>${arr[eachObj].name}</td><td>${
          arr[eachObj].contact
        }</td><td><a href="javascript:void(0)" onclick="deleteData(${eachObj})" class="delbtn">Delete</a></td></tr>`;
    }
    document.getElementById("tableBody").innerHTML = html;
  }
}

function deleteData(rid) {
  let arr = getCrudData();
  arr.splice(rid, 1);
  setCrudData(arr);
  selectData();
  showMessage("Do you want to delete?");
  showMessage("Row Deleted");
}

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}
function phonenumber(inputtxt) {
  var phoneno = /^\d{10}$/;
  if (inputtxt.match(phoneno)) {
    return true;
  } else {
    return false;
  }
}

function showMessage(msg){
  alert(msg)
}

function resetInput(){
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("contact").value = "";
}
