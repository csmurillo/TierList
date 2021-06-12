
Dropzone.options.DropDownImages = {
    addRemoveLinks: true,
    autoDiscover: false,
    autoProcessQueue: false,
    // parallelUploads: 20,
    url: '/uploadImages',
    paramName: "image", 
    parallelUploads: 100,    
    maxFilesize: 5, 
    maxFiles: 100,
    // maxFilesize: 100,
    // maxFiles: 30,
    acceptedFiles: '.png,.jpg', //allowed filetypes
    dictDefaultMessage: "", 
    init: function() {
      var dropzoneImages = this;

      document.getElementById("upload-images").addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        setInterval(()=>{
          dropzoneImages.processQueue();
        },5000)
        $('#upload-images-modal-container').modal('hide');
      });
    },
};