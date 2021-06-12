function addMoreImages(){
    $('#upload-images-modal-container').modal('show');
    var myDropzone = Dropzone.forElement("#DropDownImages");
    myDropzone.removeAllFiles(true); 
}