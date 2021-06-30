var tierListContainer=document.getElementById('tier-list');

$('#choose-template-modal-container').on('shown.bs.modal', function () {
    // option 1
    var templateOne=document.getElementById('template-one-container');
    templateOne.addEventListener('click',()=>{
        createTierList('one');
        $('#choose-template-modal-container').modal('hide');
        $('#upload-images-modal-container').modal('show');
    });

    // option 2
    var templateTwo=document.getElementById('template-two-container');
    templateTwo.addEventListener('click',()=>{
        createTierList('two');
        $('#choose-template-modal-container').modal('hide');
        $('#upload-images-modal-container').modal('show');
    });

    // option 3
    var templateThree=document.getElementById('template-three-container');
    templateThree.addEventListener('click',()=>{
        createTierList('three');
        $('#choose-template-modal-container').modal('hide');
        $('#upload-images-modal-container').modal('show');
    });
});

// choosenList
// template-one, template-two, template-three
function createTierList(choosenList){
    console.log('CREATETIERLIST');

    if(choosenList=='one'){
        // od, advance, good, average
        for(var i=0; i< 4;i++){
            var tierRow=createTierRow(i,'one');
            tierListContainer.append(tierRow);
            console.log('j');
        }
    }
    else if(choosenList=='two'){
        // a,b,c,d,e,f
        for(var i=0; i< 6;i++){
            var tierRow=createTierRow(i,'two');
            tierListContainer.append(tierRow);
        }
    }
    else if(choosenList=='three'){
        // 1,2,3,4,5
        for(var i=0; i< 6;i++){
            var tierRow=createTierRow(i,'three');
            tierListContainer.append(tierRow);
        }
    }
}
function createTierRow(id,templateList){
    const tierRow = document.createElement("div");
    tierRow.className="tier-list-row-container";
    tierRow.id=''+id;
    tierRow.style.display="flex";
    tierRow.style.position="relative";

    // append tierrowtitle
    var tierRowTitleContainer=createTierRowTitleContainer(id,templateList);
    tierRow.append(tierRowTitleContainer);
    var tierRowItemContainer=createTierRowItemContainer(id);
    tierRow.append(tierRowItemContainer);

    // append delete move container to tier row
    var deleteMoveContainer=createMoveDeleteContainer(id);
    tierRow.append(deleteMoveContainer);

    return tierRow;
}
function createTierRowTitleContainer(id,templateList){
    // tier title container
    const tierRowTitleContainer = document.createElement("div");
    tierRowTitleContainer.id="tier-"+id+"-title-container";
    tierRowTitleContainer.className="tier-title-container"
    tierRowTitleContainer.style.backgroundColor=templateTierTitleColors(id);
    tierRowTitleContainer.style.position="relative";

    const tierRowTitleChangeColorContainer = document.createElement("div");
    tierRowTitleChangeColorContainer.id="tier-"+id+"-title-color-change-container";
    tierRowTitleChangeColorContainer.className="tier-title-color-change-container";
    tierRowTitleChangeColorContainer.style.display="none";
    tierRowTitleChangeColorContainer.style.right="0px";
    tierRowTitleChangeColorContainer.style.bottom="0px";
    tierRowTitleChangeColorContainer.style.padding="10px";
    tierRowTitleChangeColorContainer.style.position="absolute";
    tierRowTitleChangeColorContainer.style.backgroundColor="rgb(248, 248, 248)";
    tierRowTitleChangeColorContainer.style.fontSize="10px";
    tierRowTitleChangeColorContainer.innerHTML=`<span>background color</span> <input id="tier-`+id+`-title-color-change-picker" style="position: relative;
    width: 0px; height: 0px; z-index: -9999; position:absolute; bottom:0px; left:0px" type="color" width="0" height="0" id="head" name="head" value="#e66465">`;


    tierRowTitleChangeColorContainer.addEventListener('mouseover',()=>{
        tierRowTitleChangeColorContainer.style.cursor="pointer";
    });
    tierRowTitleChangeColorContainer.addEventListener('click',()=>{
        var colorPicker=document.getElementById("tier-"+id+"-title-color-change-picker");
        console.log(colorPicker);
        console.log('will be clicked');
        colorPicker.click();
    });

    tierRowTitleContainer.addEventListener('mouseenter',()=>{
        tierRowTitleChangeColorContainer.style.display="inline-block";
    });
    tierRowTitleContainer.addEventListener('mouseleave',()=>{
        tierRowTitleChangeColorContainer.style.display="none";
    });


    // tierRowTitleChangeColorContainer.style.
    tierRowTitleContainer.appendChild(tierRowTitleChangeColorContainer);

    // tier title
    const tierRowTitle = document.createElement("div");
    tierRowTitle.contentEditable="true";
    tierRowTitle.id="tier-title-"+id;
    tierRowTitle.className="tier-title";
    if(templateList!=null){
        tierRowTitle.innerHTML=templateTierTitleController(id,templateList);
    }
    else{
        tierRowTitle.innerHTML="~";
    }
    tierRowTitleContainer.append(tierRowTitle);
    return tierRowTitleContainer;
}
function createTierRowItemContainer(id){
    const tierRowItemContainer = document.createElement("div");
    tierRowItemContainer.id="tier-item-"+id+"-container";
    tierRowItemContainer.className="tier-item-container";
    tierRowItemContainer.style.backgroundColor="black";
    tierRowItemContainer.style.borderBottom="1px solid white";
    return tierRowItemContainer;
}

function createMoveDeleteContainer(id){
    const tierItemDeleteMoveContainer = document.createElement("div");
    tierItemDeleteMoveContainer.id="tier-item-"+id+"-delete-move-container";
    tierItemDeleteMoveContainer.className="tier-item-delete-move-container";
    tierItemDeleteMoveContainer.style.position="absolute";
    tierItemDeleteMoveContainer.style.right="0px";
    tierItemDeleteMoveContainer.style.top="0px";
    tierItemDeleteMoveContainer.style.borderLeft="1px solid rgb(199, 199, 199)";
    tierItemDeleteMoveContainer.style.borderBottom="1px solid rgb(199, 199, 199)";
    tierItemDeleteMoveContainer.style.backgroundColor="black";
    // up arrow
    const upArrow = document.createElement("div");
    upArrow.innerHTML="<i class='fas fa-chevron-up'></i>";
    upArrow.style.color="rgb(199, 199, 199)";
    upArrow.style.fontSize="30px";
    upArrow.style.display="flex";
    upArrow.style.justifyContent="center";
    upArrow.style.alignItems="flex-end";
    upArrow.style.width="100%";
    upArrow.style.height="25%";
    upArrow.addEventListener('click',()=>{
        moveUp(upArrow.parentNode.parentNode);
    });
    tierItemDeleteMoveContainer.appendChild(upArrow);
    // delete button
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML="Delete";
    deleteButton.style.color="rgb(170, 170, 170)";
    deleteButton.style.display="flex";
    deleteButton.style.justifyContent="center";
    deleteButton.style.alignItems="center";
    deleteButton.style.width="100%";
    deleteButton.style.height="50%";
    deleteButton.addEventListener('click',()=>{
        deleteRow(deleteButton.parentNode.parentNode);
    });
    tierItemDeleteMoveContainer.appendChild(deleteButton);
    // down arrow
    const downArrow = document.createElement("div");
    downArrow.innerHTML="<i class='fas fa-chevron-down'></i>";
    downArrow.style.color="rgb(199, 199, 199)";
    downArrow.style.fontSize="30px";
    downArrow.style.display="flex";
    downArrow.style.justifyContent="center";
    downArrow.style.alignItems="start";
    downArrow.style.width="100%";
    downArrow.style.height="25%";
    downArrow.addEventListener('click',()=>{
        moveDown(downArrow.parentNode.parentNode);
    });
    tierItemDeleteMoveContainer.appendChild(downArrow);

    return tierItemDeleteMoveContainer;

}
function templateTierTitleColors(id){
    if(id==0){
        return 'orangered';
    }
    else if(id==1){
        return 'red';
    }
    else if(id==2){
        return 'green';
    }
    else if(id==3){
        return 'lightgreen';
    }
    else if(id==4){
        return 'blue';
    }
    else if(id==5){
        return 'lightblue';
    }
    else{
        return 'white';
    }
}
function templateTierTitleController(id,template){
    if(template=='one'){
        return templateOneTierTitles(id,template);
    }
    else if(template=='two'){
        return templateTwoTierTitles(id,template);
    }
    else if(template=='three'){
        return templateThreeTierTitles(id,template);
    }
}
function templateOneTierTitles(id,template){
    if(id==0){
        return 'OD';
    }
    else if(id==1){
        return 'Advance';
    }
    else if(id==2){
        return 'Good';
    }
    else if(id==3){
        return 'Average';
    }
}
function templateTwoTierTitles(id,template){
    if(id==0){
        return 'A';
    }
    else if(id==1){
        return 'B';
    }
    else if(id==2){
        return 'C';
    }
    else if(id==3){
        return 'D';
    }
    else if(id==4){
        return 'E';
    }
    else if(id==5){
        return 'F';
    }
}
function templateThreeTierTitles(id,template){
    if(id==0){
        return '1';
    }
    else if(id==1){
        return '2';
    }
    else if(id==2){
        return '3';
    }
    else if(id==3){
        return '4';
    }
    else if(id==4){
        return '5';
    }
    else if(id==5){
        return '6';
    }
}

