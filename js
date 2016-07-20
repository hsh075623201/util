//页面backToTop效果 参考：http://docs.apicloud.com/%E4%BA%91API/stat-cloud-api
$(window).on('keyup', function(e){
    if(e.keyCode === 84){
        window.scrollTo(0,0);
    }
});
var screenHeight = $(window).height();
var $backToTop = $('#backToTop');
$(window).on('scroll',function(){
    var st = $(document).scrollTop();
    if(st > screenHeight){
        $backToTop.addClass('show');
    }else{
        $backToTop.removeClass('show');
    }
});
$backToTop.on('click',function(){
    window.scrollTo(0,0);
    $backToTop.css('bottom','300px');
    setTimeout(function(){
        $backToTop.removeAttr('style');
    },500);
    return false;
});

JSONToCSVConvertor = function (JSONData, ReportTitle, ShowLabel) {
    if (Meteor.isClient) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + '\r\n';
        }
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }
        var csv = "\ufeff"+CSV;
        blob = new Blob([csv], { type: 'text/csv,charset=UTF-8' });
        var csvUrl = window.webkitURL.createObjectURL(blob);
        var fileName = ReportTitle.replace(/ /g, "_");
        //this trick will generate a temp "a" tag
        var link = document.createElement("a");
        link.href = csvUrl;
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

};
