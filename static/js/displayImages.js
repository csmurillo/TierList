var loading=document.getElementById('loading');
$(document).on('hidden.bs.modal','#upload-images-modal-container', function () {
    loading.style.display='flex';
    $.ajax({
        type: 'GET',
        url: '/images',
        dataType: 'json',
        success: function(data) {
            images = data;
            setImages(images.images);
        },
        error: function(){
            },
        data: {},
        async: true
    });
});
function setImages(imagePathArray){
    var classTierImages=document.getElementsByClassName('tier-image');
    var numberOfClassTierImages=classTierImages.length;
    for(var i =0; numberOfClassTierImages>i;i++){
        var serverImage = new Image(classTierImages[i].offsetWidth, classTierImages[i].offsetHeight);
        if(imagePathArray[i]!=null){
            serverImage.src = ''+imagePathArray[i];
            serverImage.id="image-"+i;
            serverImage.style.width="100%";
            serverImage.style.height="100%";
            classTierImages[i].innerHTML = '';
            classTierImages[i].appendChild(serverImage);
            saveImagesLocalStorage(serverImage.id,imagePathArray[i]);
        }
    }
    loading.style.display="none";
    // images loaded: init draggable
    initDraggeableImages();
}
function saveImagesLocalStorage(keyID,imageURL){
    console.log('inside save images local storage');
    console.log(localStorage.getItem(keyID));
    console.log(imageURL);
    console.log('///////////////////////////////');
    var localStorageLength=localStorage.length;
    for(var i=0; localStorageLength>i;i++){
        if(localStorage.getItem(keyID)==imageURL){
            return;
        }
    }
    localStorage.setItem(keyID,imageURL);
}
