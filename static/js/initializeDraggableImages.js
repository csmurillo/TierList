// resize tierlist height when overflow of elements is changed on screen size resize
$(window).resize(function() {
    var tierList=document.getElementById('tier-list');
    for(var i=0; tierList.children.length>i;i++){
        var sortableRow=document.getElementById('tier-item-'+tierList.children[i].id+'-container');
        autoResizeRow(sortableRow);
    }
    autoResizeRow(rowItemContainer);
});
// resets image on end inside tierimagelist
function resetImageItemStyles(itemDragged){
    itemDragged.style.height='';
    itemDragged.style.width='';
    itemDragged.children[0].width='183';
    itemDragged.children[0].style.width='100%';
    itemDragged.children[0].style.height='100%';
}
// resize row whenever height changes based on overflow of elements
function autoResizeRow(rowItemContainer){
    if(rowItemContainer.children.length==0){
        return;
    }
    // last child from row container
    var rowItemLast=rowItemContainer.lastChild;
    rowItemContainer.style.height=(rowItemLast.offsetHeight)+'px';
    rowItemContainer.parentNode.style.height=(rowItemLast.offsetHeight)+'px';

    if(rowItemLast.offsetTop>140||rowItemLast.parentNode.parentNode.offsetTop!=rowItemLast.offsetTop){
        rowItemContainer.style.height=(rowItemLast.offsetTop+rowItemLast.offsetHeight)+'px';
        rowItemContainer.parentNode.style.height=(rowItemLast.offsetTop+rowItemLast.offsetHeight)+'px';
    }
}
function initDraggeableImages(){
    // container that holds rows where images will be placed
    var tierList=document.getElementById('tier-list');
    // container that holds images
    var tierImagesList=document.getElementById('tier-images-list');
    // init rows & imagelist to initialize draggable items 
    // & accept draggable item inside their container
    // defined with sortablejs
    initRowDraggable(tierList);
    initImageListDraggable(tierImagesList);
}
function initRowDraggable(tierList){
    for(var i=0; tierList.children.length>i;i++){
        var sortableRow=document.getElementById('tier-item-'+tierList.children[i].id+'-container');
        Sortable.create(sortableRow, {
            group: "row",
            sort: true,
            // launched when element ends inside a row
            onEnd: function (evt) {
                if(evt.to.id==evt.from.id){
                    autoResizeRow(evt.from);
                    autoResizeRow(evt.to);
                    return;
                }
                if(evt.from.children.length>0){
                    var tierList=document.getElementById('tier-list');
                    autoResizeRow(evt.from);
                    if(tierList.contains(evt.to)){
                        autoResizeRow(evt.to);
                    }   
                }
            },
            // launched when element is dragged
            onMove: function (evt,ogEvt){
                if(evt.to.id==evt.from.id){
                    autoResizeRow(evt.from);
                    autoResizeRow(evt.to);
                    return;
                }
                if(evt.from.children.length>0){
                    var tierList=document.getElementById('tier-list');
                    autoResizeRow(evt.from);
                    if(tierList.contains(evt.to)){
                        autoResizeRow(evt.to);
                    }   
                }
                if(evt.to.id=='tier-images-list'){
                    resetImageItemStyles(evt.dragged);
                }
            }
        });
    }
}
function initImageListDraggable(tierImagesList){
    Sortable.create(tierImagesList, {
        group: 'row',
        sort: false,
        // on initial data
        setData: function (dataTransfer,itemDragged) {
            itemDragged.style.width="140px";
            itemDragged.style.height="140px";
        },
        // launched when element is first dragged
        onStart: function (evt) { 
            $("#"+evt.item.id).removeClass();
            evt.item.children[0].style.width="";
            evt.item.children[0].style.height="";
            evt.item.children[0].height='145';
            var imageWidth=evt.item.children[0].offsetWidth;
            var imageHeight=evt.item.children[0].offsetHeight;
            
            $("#"+evt.item.id).css('width', imageWidth+'px');
            $("#"+evt.item.id).css('height', imageHeight+'px');
        },
        // launched when element end inside tierimagelist
        onEnd: function (evt) { 
            if(evt.to.id=='tier-images-list' && evt.from.id=='tier-images-list'){
                resetImageItemStyles(evt.item);
            }
            $('#'+evt.item.id).addClass('tier-image col-lg-6 col-md-3 col-3');
        },
        // launched when element is dragged
        onMove: function (evt, originalEvent) {
            if(evt.to.id=='tier-images-list' && evt.from.id=='tier-images-list'){
                resetImageItemStyles(evt.dragged);
            }
            var itemDragged=evt.dragged;
            itemDragged.style.width="140px";
            itemDragged.style.height="140px";
            itemDragged.children[0].width='140';
            itemDragged.children[0].height='140';
            var parentDiv=evt.to;
            autoResizeRow(parentDiv);
        },
    });
}