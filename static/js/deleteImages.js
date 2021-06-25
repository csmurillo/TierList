var queueDeleteArray=[];
$('#delete-images-modal-container').on('hide.bs.modal', function (e) {
    var imagesForDeletion=document.getElementById('images-for-deletion-container');
    imagesForDeletion.innerHTML='';
    var deleteXImagesButton=document.getElementById('delete-x-images');
    deleteXImagesButton.innerHTML='Delete ';
    queueDeleteArray=[];
});
function loadImagesForDeletion(){
    $('#delete-images-modal-container').modal('show');
    loadImages();
}
function loadImages(){
    var localStorageLength=localStorage.length;
    var imagesForDeletion=document.getElementById('images-for-deletion-container');
    imagesForDeletion.className="row";
    // parent element (images-for-deletion-container)
    // set up imagecontainer to hold images and ability to be deleted with image times icon (X)
    for(var i=0; localStorageLength>i;i++){
        const imageTimesIconContainer = document.createElement("div");
        imageTimesIconContainer.id="image-icon-times-container";
        imageTimesIconContainer.style.position="absolute";
        imageTimesIconContainer.style.right='12px';
        imageTimesIconContainer.style.top="0px";
        imageTimesIconContainer.innerHTML='<i onTouch="imageTimesIconContainerClick(this);" onclick="imageTimesIconContainerClick(this);" data-toggle="0" class="fas fa-times times"></i>';
        const imageContainer = document.createElement("div");
        imageContainer.id="image-container";
        imageContainer.style.position="relative";
        imageContainer.className="col-sm-3 col-4 mb-3";
        imageContainer.style.height="135px";
        imageContainer.style.background="white";

        var serverImage = new Image(imageContainer.offsetWidth,imageContainer.offsetHeight);
        serverImage.src = localStorage.getItem(localStorage.key(i));
        serverImage.id="image-"+i;
        serverImage.style.width="100%";
        serverImage.style.height="100%";
        imageContainer.appendChild(serverImage);
        imageContainer.appendChild(imageTimesIconContainer);
        imagesForDeletion.appendChild(imageContainer);
    }
}
function imageTimesIconContainerClick(imageTimesIconContainer){
    if(imageTimesIconContainer.dataset.toggle=='0'){
        queueDeleteArray.push(imageTimesIconContainer.parentNode.parentNode.children[0].src);
        imageTimesIconContainer.style.backgroundColor="gray";
        imageTimesIconContainer.style.color="rgb(230, 230, 230)";
        imageTimesIconContainer.style.paddingTop="8px";
        imageTimesIconContainer.style.paddingRight="8px";
        imageTimesIconContainer.style.paddingBottom="8px";
        imageTimesIconContainer.style.paddingLeft="8px";
        imageTimesIconContainer.dataset.toggle=1;
    }
    else if(imageTimesIconContainer.dataset.toggle=='1'){
        queueDeleteArray=queueDeleteArray.filter(src=> src!=imageTimesIconContainer.parentNode.parentNode.children[0].src);
        imageTimesIconContainer.style.backgroundColor="";
        imageTimesIconContainer.style.color="";
        imageTimesIconContainer.style.paddingTop="";
        imageTimesIconContainer.style.paddingRight="";
        imageTimesIconContainer.style.paddingBottom="";
        imageTimesIconContainer.style.paddingLeft="";
        imageTimesIconContainer.dataset.toggle=0;
    }
    var deleteXImagesButton=document.getElementById('delete-x-images');
    deleteXImagesButton.innerText='Delete '+queueDeleteArray.length;
}
// delete X button from modal
function deleteX(){
    $('#dialog').modal('show');
}
// delete all button from modal
function deleteAll(){
    var imagesForDeletion=document.getElementById('images-for-deletion-container');
    for(var i=0; i<imagesForDeletion.childNodes.length-1; i++){
        var imageTimesIconContainer=imagesForDeletion.children[i].children[1].children[0];
        if(imageTimesIconContainer.dataset.toggle==0){
            imageTimesIconContainer.dataset.toggle=0;
        }
        else{
            continue;
        }
        imageTimesIconContainerClick(imageTimesIconContainer);
    }
    $('#dialog').modal('show');
}
function deleteImages(){
    // delete image from localstorage
    deleteLocalStorageImages();
    // delete server side images
    $.ajax({
        type: "DELETE",
        url: "/deleteImages/" + $.param({
            "array": queueDeleteArray
        })
    });
    $('#delete-images-modal-container').modal('hide');
}
function deleteLocalStorageImages(){
    var localStorageLength=localStorage.length;
    var localStorageItems=[];
    // acquire all keys from localstorage
    for(var i=0; localStorageLength>i;i++){
        localStorageItems.push(localStorage.key(i));
    }
    // traverse localstorage items and compare them to queuedeletearray
    // if localstorage holds queuedeletearray item delete image from localstorage
    for(var i=0; localStorageItems.length>i;i++){
        var images=localStorage.getItem(localStorageItems[i]);
        for(var j=0; queueDeleteArray.length>j;j++){
            var imagePath=queueDeleteArray[j];
                if(images==imagePath.replace('%20',' ')){
                    // remove image from DOM
                    $("#"+localStorageItems[i]).parent().remove();
                    localStorage.removeItem(localStorageItems[i].replace('%20',' '));
                    continue;
                }
        }
    }    
}



