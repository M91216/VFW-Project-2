//Michael Bain
// Visual Framework 1302
//Project 2 Javascript
//2-14-13





window.addEventListener("DOMContentLoaded", function(){
        
   function $(x){
      var theElement = document.getElementById(x);
      return theElement;
    
   }  
    
   function getInfo(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "formats");
        for(var i=0, j=recordingFormats.length; i<j; i++){
            var makeOption = document.createElement("option");
            var opText = recordingFormats[i];
            makeOption.setAttribute("value", opText);
            makeOption.innerHTML = opText;
            makeSelect.appendChild(makeOption);          
        }
        selectLi.appendChild(makeSelect);
   }  
   function getSelectedRadio(){
        var radios = document.forms[0].studioroom;
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
             studioroomValue = radios[i].value;
            }
            
        }
        
   }
   function getCheckboxValue(){
        if($("yes").checked){
             engineerValue = $("yes").value;
        }else{
             engineerValue = "No"            
        }
   }
   function toggleControls(n){
       switch(n){
            case "on":
               $("sessionForm").style.display = "none";
               $("clearLink").style.display = "inline";
               $("displayLink").style.display = "none";
               $("addNew").style.display = "inline";
                break;
            case "off":
               $("sessionForm").style.display = "block";
               $("clearLink").style.display = "inline";
               $("displayLink").style.display = "inline";
               $("addNew").style.display = "none";
               $("items").style.display = "none";
                break;
            default:
                return false;
       }
   }
  
   function storeData(){
      var id                = Math.floor(Math.random()*100000001);
     
      getCheckboxValue();
      getSelectedRadio();
      var item                ={};
          item.formats        =["Recording Formats:", $("formats").value];
          item.customer       =["Customer:", $("customer").value];
          item.artistband     =["Artist/Band:", $("artist/band").value];
          item.email          =["Email:",$("email").value];
          item.phone          =["Phone Number:", $("phone").value];
          item.date           =["Date:", $("date").value];
          item.time           =["Time:", $("time").value];
          item.endTime        =["End Time:", $("endtime").value];
          item.hours          =["Hours:", $("hours").value];
          item.comments       =["Comments:", $("comments").value];
          item.studioroom     =["Studio Room:", studioroomValue];
          item.yesno          =["Engineer:", engineerValue];
                   
          localStorage.setItem(id, JSON.stringify(item));
          alert("Contact Saved");          
   }
   function getData(){
       toggleControls("on");
       if(localStorage.length === 0){
           alert("There is no data in local storage.")
       }
       
       var makeDiv = document.createElement("div");
       makeDiv.setAttribute("id", "items");
       var makeList = document.createElement("ul");
       makeDiv.appendChild(makeList);
       document.body.appendChild(makeDiv);
       $("items").style.display = "block";
       for(var i=0, len=localStorage.length; i<len; i++){
           var makeLi = document.createElement("li");
           makeList.appendChild(makeLi);
           var key = localStorage.key(i);
           var value = localStorage.getItem(key);
           var obj = JSON.parse(value);
           var makeSubList = document.createElement("ul");
           makeLi.appendChild(makeSubList);
           for(var n in obj){
               var makeSubLi = document.createElement("li");
               makeSubList.appendChild(makeSubLi);
               var optSubText = obj[n][0]+" "+obj[n][1];
               makeSubLi.innerHTML = optSubText;
           }
        
   }
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
            return false;
            
        }
       
    }
   }
   var recordingFormats = ["--Analog--", "2in.Tape/24", "--Digital--", "Pro ToolsHD","Logic", "Nuendo/Cubase", "FL Studio" ],
       engineerValue = "No",
       studioroomValue      
   ;   
   getInfo();    

   var displayLink = $("displayLink");
   displayLink.addEventListener("click", getData);
   //var clearLink = $("clear");
   //clearLink.addEventListener("click", clearLocal);
   var submit = $("submitBooking");
   submit.addEventListener("click", storeData);
});  




