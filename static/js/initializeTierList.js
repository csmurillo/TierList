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
    return tierRow;
}
function createTierRowTitleContainer(id,templateList){
    // tier title container
    const tierRowTitleContainer = document.createElement("div");
    tierRowTitleContainer.id="tier-"+id+"-title-container";
    tierRowTitleContainer.className="tier-title-container"
    tierRowTitleContainer.style.backgroundColor=templateTierTitleColors(id);

    // tier title
    const tierRowTitle = document.createElement("div");
    tierRowTitle.contentEditable="true";
    tierRowTitle.id="tier-title-"+id;
    tierRowTitle.className="tier-title";
    tierRowTitle.innerHTML=templateTierTitleController(id,templateList);
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