
var userName;
// var userPhoto;
// var userEmail;

const facebook_login = ()=>{
    console.log('helllo')
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
    
       var user = result.user;
       console.log(user)
       userName = user.displayName;
       console.log(userName)
      userPhoto = user.photoURL;
       console.log(userPhoto)
      userEmail = user.email;
      console.log(userEmail)

     }).catch(function(error) {
     console.log( error.message)
 
   });

   setInterval(function(){ chatScreenOn(); }, 3000);
   loginBtnDisappear();
   
}

function sendMessage(){
  var input = document.getElementById("msg");
  var key = firebase.database().ref('msg').push().key
 
  var messages = {
      text :input.value,
      key : key,
      name: userName
  }

   firebase.database().ref('msg').child(key).set(messages)

  input.value = " "
}
var list = document.getElementById('list');

firebase.database().ref('msg').on('child_added', function(data){
  var li  = document.createElement("li");
  var liUser = document.createTextNode(data.val().name)
  li.appendChild(liUser)
  var liText = document.createTextNode(data.val().text);
  li.appendChild(liText);
  // li.appendChild(`${liUser} ${liText}`)
  list.appendChild(li);
  var delBtn = document.createElement('button');
  var delText = document.createTextNode('DELETE');
       delBtn.appendChild(delText);
       li.appendChild(delBtn)
       delBtn.setAttribute('id', data.val().key)
       delBtn.setAttribute('onclick', 'delRow(this)')
       delBtn.setAttribute('class', 'btn del btn-danger')
  
  var editBtn = document.createElement('button');
  var editText = document.createTextNode('EDIT');
       editBtn.appendChild(editText);
       li.appendChild(editBtn);
       editBtn.setAttribute('id', data.val().key)
       editBtn.setAttribute('onclick', 'editItem(this)') 
       editBtn.setAttribute('class', 'btn btn-primary')


})

function delRow(e){
firebase.database().ref('msg').child(e.id).remove()
e.parentNode.remove()

}

function delAll(){
list.innerHTML = " "
firebase.database().ref('msg').remove()
}

function editItem(e){
var val = prompt('Enter new value', e.parentNode.firstChild.nodeValue)
var editTodo = {
text: val,
key: e.id
}
firebase.database().ref('msg').child(e.id).set(editTodo)
e.parentNode.firstChild.nodeValue
e.parentNode.firstChild.nodeValue = val;

}


const chatScreenOn = ()=>{
  document.getElementById('chat').hidden = false;
  userName = 'farhan khan'
  

}

const logOut = ()=>{
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

  liBtnAppear()
  chatScreenOff()
}
const chatScreenOff = ()=>{
  document.getElementById('chat').hidden = true;
  
}
chatScreenOff()

const loBtnAppear = ()=>{
  document.getElementById('loBtn').hidden = false;
  
}


const loginBtnDisappear = ()=>{
  document.getElementById('liBtn').hidden = true;
  
}

const logoutBtnDisappear = ()=>{
  document.getElementById('loBtn').hidden = true;
  liBtnAppear();
  
}


const liBtnAppear = ()=>{
  document.getElementById('liBtn').hidden=false;
  logoutBtnDisappear();
}

