var tierList=document.getElementById('tier-list');

function getTierList(){
    return tierList;
}
function setTierListChildren(children){
    if(children.length){
        return 'error children must be Object';
    }
    tierList.append(children);
}
function setTierListXChild(position,child){
    var tierListChild=getTierListXChild(position+1);
    tierList.insertBefore(child,tierListChild);
}
function getTierListChildren(){
    return tierList.children;
}
function tierListChildCount(){
    return tierList.children.length;
}
function getTierListXChild(x){
    return tierList.childNodes[x];
}
