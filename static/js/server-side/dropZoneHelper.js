// after continuous testing i found that dropzone has a limit on 6 files per upload
// however if you save dropImages.js you can upload as many file per upload
// this code saves dropImages.js file every 1 sec
const fs = require('fs');
const  dropZoneHelper=()=>{
    const code=`
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
        },1000)
        $('#upload-images-modal-container').modal('hide');
      });

    },
    
};`;

setInterval(()=>{
    fs.writeFile('./static/js/dropImages.js', code,(err)=>{});
},1000)
return;
};
exports.dropZoneHelper=dropZoneHelper;