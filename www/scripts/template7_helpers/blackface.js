Template7.registerHelper('blackface', function (item,read) {
    if(read == 1){
        return item;
    }else{
        return '<b>' + item + '</b>';
    }
});