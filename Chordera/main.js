let logo, logoAnimation = true;
let pselectedChord, keyboradBorder, checkBtn, audio;
let arrayKeys = [], arrayHalfKeys = [], arrayBlackKeys = [];

let playerSelectedNotes = [];

let keys = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
let intervals = [
    {
        name:"dim",
        numberOfNotes:3,
        firstInerval:3,
        secondInterval:6,
        thirdInterval:0
    },
    {
        name:"aug",
        numberOfNotes:3,
        firstInerval:4,
        secondInterval:8,
        thirdInterval:0
    },
    {
        name:"min",
        numberOfNotes:3,
        firstInerval:3,
        secondInterval:7,
        thirdInterval:0
    },
    {
        name:"maj",
        numberOfNotes:3,
        firstInerval:4,
        secondInterval:7,
        thirdInterval:0
    },
    {
        name:"maj7",
        numberOfNotes:4,
        firstInerval:4,
        secondInterval:7,
        thirdInterval:11
    },
    {
        name:"min7",
        numberOfNotes:4,
        firstInerval:3,
        secondInterval:7,
        thirdInterval:10
    },
    {
        name:"7",
        numberOfNotes:4,
        firstInerval:4,
        secondInterval:7,
        thirdInterval:10
    }
];
let computerSelectedKey = Math.floor(Math.random()*keys.length);
let computerSelectedInterval = Math.floor(Math.random()*intervals.length);

let gameMode = 1;

function init(){
    audio = document.createElement("audio");
    logo = document.getElementById("logo");
    logoAni();
}

function selectMode(){
    removeAllChilds(document.body);
    topLogo();
    let question  = document.createElement("p");
    question.innerHTML = "Choose a mode to play in";
    question.className = "gameText";
    question.style.fontSize = "4em";

    let optionBox = document.createElement("div");
    optionBox.className = "optionBox";
    let optionOne = document.createElement("button");
    optionOne.innerHTML = "Normal";
    optionOne.className = "optionButtons";
    optionOne.onclick = changeGameMode;
    optionOne.mode = 1;
    let optionTwo = document.createElement("button");
    optionTwo.innerHTML = "Hidden Names";
    optionTwo.className = "optionButtons";
    optionTwo.onclick = changeGameMode;
    optionTwo.mode = 2;

    optionBox.appendChild(optionOne);
    optionBox.appendChild(optionTwo);
    document.body.appendChild(question);
    document.body.appendChild(optionBox);
}

function changeGameMode(event){
    gameMode = event.target.mode;
    event.target.classList.add("selectedModeButton");
    setTimeout(()=>{
        selectChords();
    },1000);
}

function selectChords(){
    removeAllChilds(document.body);
    topLogo();

    let question  = document.createElement("p");
    question.innerHTML = "Choose chords to learn";
    question.className = "gameText";
    question.style.fontSize = "4em";

    let optionBox = document.createElement("div");
    optionBox.className = "optionBox";
    optionBox.style.width = "70%";
    optionBox.style.height = "400px";
    optionBox.style.overflowY = "scroll";

    for(let i = 0; i<keys.length; i++){
        let pName = document.createElement("div");
        pName.innerHTML = keys[i];
        pName.className = "gameText";
        pName.style.width = "100%";
        pName.style.fontSize = "2em";
        optionBox.appendChild(pName);
        for(let j = 0; j<intervals.length; j++){
            let temp = document.createElement("button");
            temp.className = "optionButtons";
            temp.innerHTML = keys[i]+intervals[j].name;
            temp.width = "70px";
            temp.clicked = false;
            temp.onclick = addChordToGame;
            optionBox.appendChild(temp);
        }
    }

    document.body.appendChild(question);
    document.body.appendChild(optionBox);
}

function addChordToGame(event){
    if(!event.target.clicked){
        event.target.classList.add("selectedModeButton");
        event.target.clicked = true;
    }
    else{
        event.target.classList.remove("selectedModeButton");
        event.target.clicked = false;
    }
    
}

function startTheGame(){
    audio.src = "music/"+keys[computerSelectedKey]+"/"+keys[computerSelectedKey]+intervals[computerSelectedInterval].name+".wav";
    audio.play();
    removeAllChilds(document.body);
    bulidGame();
}

//get ridd of all child elements of a given object
function removeAllChilds(object){
    while(object.firstChild){
        object.removeChild(object.firstChild);
    }
}

function topLogo(){
    let box = document.createElement("div");
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.width = "100%";
    
    let line = document.createElement("div");
    line.style.height = "4px";
    line.style.flex = "1";
    line.style.backgroundColor = "#3F7CAC";
    box.appendChild(line);
    
    logo = document.createElement("h1");
    logo.style.fontSize = "2em";
    logo.innerHTML = "CHORDERA";
    logo.id = "logo";
    logo.style.marginLeft = "9px";
    logo.style.marginRight = "3px";
    box.appendChild(logo);

    line = document.createElement("div");
    line.style.height = "4px";
    line.style.flex = "1";
    line.style.backgroundColor = "#3F7CAC";
    box.appendChild(line);

    document.body.appendChild(box);
}

//creates the structure of the game after start was pressed
function bulidGame(){
    topLogo();

    pselectedChord = document.createElement("p");
    pselectedChord.innerHTML = keys[computerSelectedKey]+intervals[computerSelectedInterval].name;
    pselectedChord.className = "gameText";
    pselectedChord.style.fontSize = "4em";
    document.body.appendChild(pselectedChord);

    checkBtn = document.createElement("button");
    checkBtn.onclick = check;
    checkBtn.className = "checkBtn";
    checkBtn.innerHTML = "check";
    document.body.appendChild(checkBtn);

    createKeyboard();
}

function createKeyboard(){
    keyboradBorder = document.createElement("div");
    keyboradBorder.id = "keyboard";
    keyboradBorder.style.margin = "3%";

    for(let j = 1; j<3; j++){
        let c = document.createElement("div");
        c.className  = "c"+j;
        c.classList.add("whiteKey");
        c.onclick = noteSelected;
        c.style.borderRadius = "0 0 0 5px";
        arrayKeys.push(c);
        keyboradBorder.appendChild(createBlackKey("cS"+j,"c"+j,"d"+j));

        let d = document.createElement("div");
        d.className = "d"+j;
        d.classList.add("whiteKey");
        d.onclick = noteSelected;
        arrayKeys.push(d);
        keyboradBorder.appendChild(createBlackKey("dS"+j,"d"+j,"e"+j));

        let e = document.createElement("div");
        e.className  = "e"+j;
        e.classList.add("whiteKey");
        e.onclick = noteSelected;
        e.style.borderRight = "4px solid black";
        arrayKeys.push(e);
        e.style.borderRadius = "0 0 8px 0";

        let f = document.createElement("div");
        f.className  = "f"+j;
        f.classList.add("whiteKey");
        f.onclick = noteSelected;
        f.style.borderRadius = "0 0 0 5px";
        arrayKeys.push(f);
        keyboradBorder.appendChild(createBlackKey("fS"+j,"f"+j,"g"+j));

        let g = document.createElement("div");
        g.className  = "g"+j;
        g.classList.add("whiteKey");
        g.onclick = noteSelected;
        arrayKeys.push(g);
        keyboradBorder.appendChild(createBlackKey("gS"+j,"g"+j,"a"+j));

        let a = document.createElement("div");
        a.className  = "a"+j;
        a.classList.add("whiteKey");
        a.onclick = noteSelected;
        arrayKeys.push(a);
        keyboradBorder.appendChild(createBlackKey("aS"+j,"a"+j,"b"+j));

        let b = document.createElement("div");
        b.className  = "b"+j;
        b.classList.add("whiteKey");
        if(j==1)
            b.style.borderRight = "4px solid black";
        b.style.borderRadius = "0 0 8px 0";
        b.onclick = noteSelected;
        arrayKeys.push(b);
    
        for(let i = 0; i<arrayKeys.length;i++){
            keyboradBorder.appendChild(arrayKeys[i]);
        }
    }
    
    document.body.appendChild(keyboradBorder);
}
function createBlackKey(noteid,leftNote, rightNote){
    let box = document.createElement("div");
    box.className = "columnFlex";
    
    let note = document.createElement("div");
    note.className = noteid;
    note.classList.add("blackKey"); 
    note.onclick = noteSelected;
    arrayBlackKeys.push(note);
    box.appendChild(note);

    let whiteBox = document.createElement("div");
    whiteBox.className = "columnFlex";
    whiteBox.style.flexDirection = "row";
    whiteBox.style.backgroundColor = "black";

    let leftHalf = document.createElement("div");
    leftHalf.className = leftNote;
    leftHalf.classList.add("flexHalf");
    leftHalf.style.borderRadius = "0 0 8px 0";
    leftHalf.onclick = noteSelected;
    arrayHalfKeys.push(leftHalf);
    leftHalf.style.borderRight = "4px solid black";

    let rightHalf = document.createElement("div");
    rightHalf.className = rightNote;
    rightHalf.classList.add("flexHalf");
    rightHalf.style.borderRadius = "0 0 0 5px";
    rightHalf.onclick = noteSelected;
    arrayHalfKeys.push(rightHalf);

    whiteBox.appendChild(leftHalf);
    whiteBox.appendChild(rightHalf);
    box.appendChild(whiteBox);

    arrayKeys.push(box);
    return box;
}

function noteSelected(event){
    let elemClass = event.target.className[0]+event.target.className[1];
    elemClass += event.target.className[2] == " " ? "" : event.target.className[2];
    let i = playerSelectedNotes.indexOf(elemClass);
    if(i ==-1){
        changeColor(document.getElementsByClassName(elemClass),"#FF6663");
        playerSelectedNotes.push(elemClass);
    }
    else{
        if(elemClass.length==2)
            changeColor(document.getElementsByClassName(elemClass),"white");
        else
            changeColor(document.getElementsByClassName(elemClass),"#141204");
        let temp = playerSelectedNotes[playerSelectedNotes.length-1]
        playerSelectedNotes[playerSelectedNotes.length-1] = playerSelectedNotes[i];
        playerSelectedNotes[i] = temp;
        playerSelectedNotes.pop();
    }
}

function changeColor(arr,color){
    for(let i =0; i<arr.length;i++){
        arr[i].style.backgroundColor = color;
    }
}


function check(){
    if(validateNotes()){
        computerSelectedKey = Math.floor(Math.random()*keys.length);
        computerSelectedInterval = Math.floor(Math.random()*intervals.length);
        
        //playing the new chord
        audio.pause();
        if(keys[computerSelectedKey][1]=="#"){
            let naturalKey = keys[computerSelectedKey][0]+"s";
            audio.src = "music/"+naturalKey+"/"+naturalKey+intervals[computerSelectedInterval].name+".wav";
        }
        else{
            audio.src = "music/"+keys[computerSelectedKey]+"/"+keys[computerSelectedKey]+intervals[computerSelectedInterval].name+".wav";
        }
        audio.play();
        
        pselectedChord.innerHTML = keys[computerSelectedKey]+intervals[computerSelectedInterval].name;
    }
    playerSelectedNotes = [];
    changeColor(arrayKeys,"white");
    changeColor(arrayHalfKeys,"white");
    changeColor(arrayBlackKeys,"#141204");
}

function validateNotes(){
    if(intervals[computerSelectedInterval].numberOfNotes!=playerSelectedNotes.length)
        return false;
    for(let i = 0; i<playerSelectedNotes.length;i++){
        playerSelectedNotes[i] = noteDictionary(playerSelectedNotes[i]);
    }
    sort(playerSelectedNotes);
    if(playerSelectedNotes[0]!=computerSelectedKey+1)
        return false;
    if(playerSelectedNotes[1]-playerSelectedNotes[0] != intervals[computerSelectedInterval].firstInerval)
        return false;
    if(playerSelectedNotes[2]-playerSelectedNotes[0] != intervals[computerSelectedInterval].secondInterval)
        return false;
    if(intervals[computerSelectedInterval].numberOfNotes>3){
        if(playerSelectedNotes[3]-playerSelectedNotes[0] != intervals[computerSelectedInterval].thirdInterval)
        return false;
    }
    return true;
}

function sort(arr){
    for(let i = 0; i<arr.length; i++){
        for(let j=1;j<arr.length - i;j++){
            if(arr[j-1]>arr[j]){
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j]=temp;
            }
        }
    }
}

//the logo animation
function logoAni(){
    if(logoAnimation){
        switch(Math.floor(Math.random()*2)){
            case 0:
                logo.style.color = "#F9DDAF";
                break;
            case 1:
                logo.style.color = "#E9BA6F";
                break;
        }
        setTimeout(logoAni,300);
    }
}

function noteDictionary(note){
    switch(note){
        case 'c1':
            return 1;
            break;
        case 'cS1':
            return 2;
            break;
        case 'd1':
            return 3;
            break;
        case 'dS1':
            return 4;
            break;
        case 'e1':
            return 5;
            break;
        case 'f1':
            return 6;
            break;
        case 'fS1':
            return 7;
            break;
        case 'g1':
            return 8;
            break;
        case 'gS1':
            return 9;
            break;
        case 'a1':
            return 10;
            break;
        case 'aS1':
            return 11;
            break;
        case 'b1':
            return 12;
            break;
        case 'c2':
            return 13;
            break;
        case 'cS2':
            return 14;
            break;
        case 'd2':
            return 15;
            break;
        case 'dS2':
            return 16;
            break;
        case 'e2':
            return 17;
            break;
        case 'f2':
            return 18;
            break;
        case 'fS2':
            return 19;
            break;
        case 'g2':
            return 20;
            break;
        case 'gS2':
            return 21;
            break;
        case 'a2':
            return 22;
            break;
        case 'aS2':
            return 23;
            break;
        case 'b2':
            return 24;
            break;
    }
}
