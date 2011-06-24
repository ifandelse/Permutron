window.idCount = 0;    
    
window.doIt = function() {
    window.resetTest();
    var charLimit = $("#charLimit").val(),
        charSet = $("#charSet").val();
    if(charLimit) {
        window.alphadometer = new Permutron(charLimit, false, charSet);
        var maxCount = window.alphadometer.maxIdsPossible();
        $("#total").text(maxCount);
        
        var updateFn = function() {
            if(!window.alphadometer.depletedAvailableIds) {
                $("#results").text(window.alphadometer.next());
                $("#count").text(++window.idCount);
                setTimeout(updateFn, 0);
            }
        };
        
        setTimeout(updateFn, 0);  
        
    }
}
    
window.resetTest = function () {
    window.idCount = 0;
    window.alphadometer = null;
    $("#total").text("");
    $("#results").text("");
    $("#count").text("");
}