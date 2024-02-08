var width = screen.width;
var height = screen.height;

var BGType;

window.onload = function GetBGImage(){
    document.getElementById('selectImageType').value = localStorage.getItem('BGType');
    BGType = localStorage.getItem('BGType');
    var image = new Image();
    image.src = "https://source.unsplash.com/" + width + "x" + height + "/?" + BGType + "&";
    document.getElementById('overlay').style.display = "flex";

    image.onload = function(){
        document.getElementById('BGImage').style.backgroundImage = "url('" + image.src + "')";
        document.getElementById('overlay').style.display = "none";
        setTimeout(500);

        document.getElementById('Main-Container').style.display = "flex";
    }
    startTime();
    displayLinks();
    GetUsername();
    GetBGType();
    GetThemeColourLoad();
}

//SETTINGS MENU
let active = false

function ToggleSettings() {
    active = !active
    if (active) {
        document.getElementById('SettingsBar').style.display = 'flex';
    } else {
        document.getElementById('SettingsBar').style.display = 'none';
    }
}


//TIME
function startTime(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('txtTime').innerHTML =  h + ":" + m;
    setTimeout(startTime, 1000);
}
    
function checkTime(i){
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


//SAVE LINK FUNCTION
function SaveLink(){
    const nameInput = document.getElementById('NameInputLink');
    const linkInput = document.getElementById('LinkInputLink');

    const name = nameInput.value.trim()
    const link = linkInput.value.trim()

    const storedLinks = JSON.parse(localStorage.getItem('storedLinks')) || [];

    if(name === '' || link === ''){
        alert("Make sure you have entered both a link and a name for your link!")
        return;
    }

    if(!link.includes('https://')){
        alert("Please ensure link is in correct format - https://...") //Link Validation
    }

    if(storedLinks.length >= 20){
        alert("Max number of links reached, please delete one and try again.")
    }

    else{
        storedLinks.push({name, link});
        localStorage.setItem('storedLinks', JSON.stringify(storedLinks));
    
        nameInput.value = '';
        linkInput.value = '';
    
        displayLinks();
    } 
}

function displayLinks() {
    const storedLinks = JSON.parse(localStorage.getItem('storedLinks')) || [];
    const container = document.getElementById('BtnContainer');
    container.innerHTML = '';
  
    storedLinks.forEach((link) => {
      const button = document.createElement('button');
      button.textContent = link.name;
      button.className = 'button';
      button.onclick = function(){
        window.open(link.link);
      };
      container.appendChild(button);
    });

    GetButtonColours();
}

function ClearLink() {
    const nameToRemove = document.getElementById('removeName').value.trim();
    if (nameToRemove === '') {
      alert('Please enter the name of the link to remove');
      return;
    }

    let storedLinks = JSON.parse(localStorage.getItem('storedLinks')) || [];
    const indexToRemove = storedLinks.findIndex(link => link.name === nameToRemove);

    if (indexToRemove === -1) {
      alert('Link with the specified name not found');
      return;
    }

    storedLinks.splice(indexToRemove, 1);
    localStorage.setItem('storedLinks', JSON.stringify(storedLinks));
    displayLinks();
}


//USERNAME
const username = document.getElementById('NameofUser');
function SaveName(){
    const usernameVal = username.value;
    const userlength = usernameVal.length;
    if(userlength > 5){
        alert("Please ensure your name is no longer than 5 characters!")
    }
    localStorage.setItem('Username', usernameVal)
    username.value = "";
    GetUsername();
}

function GetUsername(){
    const name = localStorage.getItem("Username")
    const usernameText = document.getElementById('txtName')
    if(name == 'null'){
        usernameText.textContent = "Hello User";
    }
    else{
        usernameText.textContent = "Hello " + name;
    }
}


//BRIGHTNESS AND BLUR
const BlurRange = document.getElementById('BlurRange');
const BrightnessRange = document.getElementById('BrightnessRange');

BlurRange.oninput = function BlurBackground(){
    const BlurVal = BlurRange.value;
    const BrightnessVal = BrightnessRange.value;
    document.getElementById('BGImage').style.filter = "blur(" + BlurVal + "px) brightness(" + BrightnessVal + "%)";
}

BrightnessRange.oninput = function AdjustBackgroundBrightness(){
    const BlurVal = BlurRange.value;
    const BrightnessVal = BrightnessRange.value;
    document.getElementById('BGImage').style.filter = "blur(" + BlurVal + "px) brightness(" + BrightnessVal + "%)";
}



//GETTING BACKGROUND TYPE
const SelectBGType = document.getElementById('selectImageType');

SelectBGType.oninput = function GetBGType(){
    const SelectedType = SelectBGType.value;
    console.log(SelectedType)
    localStorage.setItem("BGType", SelectedType);
    window.location.reload();
}

function GetBGType(){
    localStorage.getItem("BGType")
}

function GetNewImage(){
    window.location.reload();
}


//CHANGE COLOUR THEME

const ColourInput = document.getElementById('ColourInput')

ColourInput.oninput = function ChangeAllColours(){
    localStorage.setItem("ThemeColour", ColourInput.value)
    const ThemeColour = localStorage.getItem("ThemeColour");
    document.getElementById('txtTime').style.color = ThemeColour;
    document.getElementById('txtName').style.color = ThemeColour;
    document.getElementById('SearchBarInput').style.border = 'solid' + ThemeColour;
    document.getElementById('SearchBarInput').style.color = ThemeColour;
    GetButtonColours();
}

function GetButtonColours(){
    var buttonsElements = document.getElementsByClassName("button");
    const ThemeColour = localStorage.getItem("ThemeColour");
    for(var i = 0; i < buttonsElements.length; i++){
        buttonsElements[i].style.border = 'solid'+ ThemeColour;
        buttonsElements[i].style.color = ThemeColour;
    }
}

function GetThemeColourLoad(){
    const ThemeColour = localStorage.getItem("ThemeColour");
    document.getElementById('txtTime').style.color = ThemeColour;
    document.getElementById('txtName').style.color = ThemeColour;
    document.getElementById('SearchBarInput').style.border = 'solid' + ThemeColour;
    document.getElementById('SearchBarInput').style.color = ThemeColour;
    document.getElementById('GetNewImgSVG').style.stroke = ThemeColour;
    GetButtonColours();
    document.getElementById('ColourInput').value = ThemeColour;
}