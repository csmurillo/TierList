var tierListContainer=document.getElementById('tier-list');
function moveUp(currentRow){
    var prevRow=currentRow.previousSibling;
    if(prevRow.className!="tier-list-row-container"){
        return;
    }
    if(prevRow.previousSibling==null){
        tierListContainer.prepend(currentRow);   
    }
    else{
        tierListContainer.insertBefore(currentRow,prevRow);
    }
    console.log(currentRow);
}
function deleteRow(currentRow){
    currentRowElementsToTierImageList(currentRow);
    // currentRow.remove();
}
function moveDown(currentRow){
    var nextRow=currentRow.nextSibling;
    if(nextRow==null){
        return;
    }
    if(nextRow.nextSibling==null){
        tierListContainer.insertBefore(currentRow,null);
    }
    else{
        tierListContainer.insertBefore(currentRow,nextRow.nextSibling);
    }
}
function currentRowElementsToTierImageList(currentRow){
    // currentRow.childNodes[2];
    for(var i=0; i<currentRow.childNodes[1].children.length;i++){
        
    }
    console.log(currentRow.childNodes[1].children.length);
}

