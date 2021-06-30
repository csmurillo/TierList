var downloadPreviewContainer = document.getElementById('download-preview');
function downloadPreview(){
    setDownloadPreview();
    setDownloadLink();
    launchDownloadModal();
}
function launchDownloadModal(){
    $('#download-modal').modal({backdrop: 'static', keyboard: false});
}
function setDownloadPreview(){
    for(var i=1; i<tierListChildCount();i++){
        var tierListRow=getTierListXChild(i).cloneNode(true);
        tierListRow.style.width="1120px";
        tierListRow.childNodes[2].remove();
        downloadPreviewContainer.append(tierListRow);
    }   
    return downloadPreviewContainer;
}
function setDownloadLink(){
    domtoimage.toPng(downloadPreviewContainer)
    .then(function (dataUrl) {
        var download=document.getElementById('download-tier-list-link');
        download.href=dataUrl;
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}
function downloadTierList(){    
    downloadPreviewContainer.innerHTML='';
    $('#download-modal').modal('hide');
}
function closeDownloadModal(){
    downloadPreviewContainer.innerHTML='';
    $('#download-modal').modal('hide');
}



