document.getElementById("patientform").style.display="none";
document.getElementById("dashmain").style.display="block";
document.getElementById("currentpatienttable").style.display="none";

function hide(){
document.getElementById("patientform").style.display="block";
document.getElementById("dashmain").style.display="none";
}

function display(){
    document.getElementById("patientform").style.display="none";
    document.getElementById("dashmain").style.display="block";  
}


function hide1(){
    document.getElementById("dashmain").style.display="none";   
    document.getElementById("currentpatienttable").style.display="block";

}
function hide2(){
    document.getElementById("dashmain").style.display="block";   
    document.getElementById("currentpatienttable").style.display="none";

    display();
}
//search bar finding element
const searchTable = () =>{
    let filter = document.getElementById('search').value.toUpperCase();
    console.log(filter);
    let myTable = document.getElementById('mytable');
    console.log(myTable);
    let tr = myTable.getElementsByTagName('tr');
    console.log(tr);
    for(i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName('td')[1];

        if(td){
            let textvalue = td.textContent || td.innerHTML;
            console.log(textvalue);

            if(textvalue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";
                
            }else{
                tr[i].style.display = 'none';
            }
        }
    }
}
function expire(){
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

}