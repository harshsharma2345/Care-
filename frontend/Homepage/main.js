//loads up signin and signup page
function myfunction(){
document.getElementById("sign").style.display="block";
document.getElementById("log").style.display="none";
}
function myfunction2(){
  
  document.getElementById("log").style.display="block";
  document.getElementById("sign").style.display="none";
  


}

function checkpassword() {

  
  password1 = document.getElementById("formsub").elements.namedItem("password1").value;
  password2 = document.getElementById("formsub").elements.namedItem("password2").value;
  console.log(password1); 
  console.log(password2);

  if (password1 == '') {

    document.getElementById('wrongentry').innerHTML = "Please enter password";
    return false;
  }
  else if (password1 != '' && password2 == '') {
    document.getElementById('wrongentry').innerHTML = "Please re enter password";
    return false;
  }
  else if (password1 != password2) {
    
    document.getElementById('wrongentry').innerHTML = "Passwords doesn't match";
    return false;
  }
  else if (password1 == password2) {
    return true;  
  }

}