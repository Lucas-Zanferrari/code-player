$("#logo p").click(displayWelcomeMessage);
$("li.toggleButton").click(presentCodeField);
$("#runButton").click(applyCodeOnIFrame);
makeTabAvailableOnTextAreas();

function makeTabAvailableOnTextAreas() {
    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for (var i = 0; i < count; i++) {
        textareas[i].onkeydown = function (e) {
            if (e.keyCode == 9 || e.which == 9) {
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0, this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s + 1;
            }
        }
    }
}
function displayWelcomeMessage() {
    $(".codeContainer").css("display","none");
    $("li.toggleButton").removeClass("selected");
    $("#welcomeText").fadeIn();
}
function presentCodeField() {
    if($("#welcomeText").css("display") == "block"){
        $("#welcomeText").css("display", "none");
    }
    $(this).toggleClass("selected");
    var activeDiv = "#" + $(this).html() + "Container";
    $(activeDiv).toggle();
    if($(".codeContainer:visible").length == 0){
        $("#welcomeText").fadeIn();
        return;
    }
    reshapeCodeContainersWidth();
    focusOnTextArea(this);
}
function reshapeCodeContainersHeight(){
	$(".codeContainer").css("height", $(window).height() - 53.3+"px");
}
function reshapeCodeContainersWidth(){
    var numCodeContainers = $(".codeContainer:visible").length;
    $(".codeContainer").css("width", "calc("+100/numCodeContainers+"% - 1px)");
}
function focusOnTextArea(div){
    var contentOfDiv = "#" + $(div).html();
    if ($(contentOfDiv).prop("tagName") == "TEXTAREA")
        $(contentOfDiv).focus();
}
function applyCodeOnIFrame(){
    var iframeDocument = document.getElementById("output").contentDocument;

    if($("#html").val() != ""){
        iframeDocument.documentElement.innerHTML = $("#html").val();
    } else {
        iframeDocument.documentElement.innerHTML = "";
    }

    if($("#css").val() != "") {
        var css = iframeDocument.createElement("style");
        css.innerHTML = $("#css").val();
        iframeDocument.head.appendChild(css);
    }

    if($("#javaScript").val() != "") {
        var script = iframeDocument.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = $("#javaScript").val();
        iframeDocument.body.appendChild(script);
    }
}

