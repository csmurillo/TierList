
function closeAddRow(){
    var rowToBeCreated=document.getElementById('row-to-be-created');
    rowToBeCreated.innerHTML="";
}
function addRow(){
    var rowContainer=document.getElementById('tier-list');

    var rowToBeCreated=document.getElementById('row-to-be-created');
    var row = rowToBeCreated.childNodes[1];
    rowContainer.append(row);
}
function initRow(backgroundColor){
    // get latest id row
    var rowContainer=document.getElementById('tier-list');
    var newRowId=rowContainer.childNodes.length;
    // create row with newest id row
    var row=newRow(newRowId);
    initRowDraggable(row.childNodes[1]);
    var rowToBeCreated=document.getElementById('row-to-be-created');
    rowToBeCreated.appendChild(row);

    $('#create-row-modal').modal({backdrop: 'static', keyboard: false});
}
function newRow(newRowId){
    // create row
    var tierRow=createTierRow(newRowId,null);
    // temp display background color picker button
    tierRow.childNodes[0].addEventListener('mouseleave',()=>{
        tierRow.childNodes[0].childNodes[0].style.display="inline-block";
    },{ once: true });
    tierRow.childNodes[0].childNodes[0].style.display="inline-block";

    var tierTitleContainer=tierRow.childNodes[0];

    // style tier title container to be blank
    var tierTitle = tierTitleContainer.childNodes[1];
    tierTitle.innerHTML='Title Goes Here';
    tierTitle.parentNode.style.backgroundColor="white";

    // background color picker button container
    var backgroundColorButtonContainer = tierTitleContainer.childNodes[0];

    // display message to show user can modify row
    addbubbleMessageBackgroundColor(backgroundColorButtonContainer);

    // once background color picker button container is clicked
    // bubble message will be removed & background color button container will disappear
    backgroundColorButtonContainer.addEventListener('click',(evt)=>{
        removeBubbleMessage(evt);
        backgroundColorButtonContainer.style.display="none";
    });

    // input color picker on input change will change tier title background color
    backgroundColorButtonContainer.childNodes[2].addEventListener('input',()=>{
        // tierColorChangeContainer.parentNode.style.backgroundColor=tierColorChangeContainer.childNodes[2].value;
        tierTitleContainer.style.backgroundColor=backgroundColorButtonContainer.childNodes[2].value;
    });
    return tierRow;
}
function removeBubbleMessage(evt){
    // bubble message removal
    evt.currentTarget.childNodes[3].remove();
}
function addbubbleMessageBackgroundColor(backgroundColorButtonContainer){
    // add bubble message to background color button
    var messageBackGroundColorChangeBubble=messageBackgroundTitleColorChange();
    backgroundColorButtonContainer.append(messageBackGroundColorChangeBubble);
}
// create bubble message for background & title 
function messageBackgroundTitleColorChange(){
    var bubbleMessageRowTitle=document.createElement("div");
    bubbleMessageRowTitle.innerHTML="Change Title Name & Background Color";
    bubbleMessageRowTitle.style.width="180px";
    bubbleMessageRowTitle.style.height="50px";
    bubbleMessageRowTitle.style.position="absolute";
    bubbleMessageRowTitle.style.left="0px";
    bubbleMessageRowTitle.style.bottom="-70px";
    bubbleMessageRowTitle.style.fontSize="14px";
    bubbleMessageRowTitle.style.backgroundColor="white";
    bubbleMessageRowTitle.style.border="1px solid black";
    bubbleMessageRowTitle.style.borderRadius="5px";

    var bubbleMessageRowTitleTriangle=document.createElement("div");
    bubbleMessageRowTitleTriangle.style.position="absolute";
    bubbleMessageRowTitleTriangle.style.top="-40px";
    bubbleMessageRowTitleTriangle.style.width="0";
    bubbleMessageRowTitleTriangle.style.height="0";
    bubbleMessageRowTitleTriangle.style.border="20px solid";
    bubbleMessageRowTitleTriangle.style.left="3px";
    bubbleMessageRowTitleTriangle.style.borderColor="transparent transparent white transparent";
    bubbleMessageRowTitle.appendChild(bubbleMessageRowTitleTriangle);
    var bubbleMessageRowTitleTriangleBorder=document.createElement("div");
    bubbleMessageRowTitleTriangleBorder.style.position="absolute";
    bubbleMessageRowTitleTriangleBorder.style.top="-45px";
    bubbleMessageRowTitleTriangleBorder.style.width="0";
    bubbleMessageRowTitleTriangleBorder.style.height="0";
    bubbleMessageRowTitleTriangleBorder.style.border="24px solid";
    bubbleMessageRowTitleTriangleBorder.style.left="-1px";
    bubbleMessageRowTitleTriangleBorder.style.zIndex="-100";
    bubbleMessageRowTitleTriangleBorder.style.borderColor="transparent transparent black"
    bubbleMessageRowTitle.appendChild(bubbleMessageRowTitleTriangleBorder);
    // 
    return bubbleMessageRowTitle;
}