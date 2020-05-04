let currentIndex = 0;
$(document).keyup(function(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == "13") {
        if ($(".suggestions").find(".suggestion-active").length == 0) {
            $("#submit").click();
        } else {
            $(".suggestions").find(".suggestion-active").eq(0).click();
        }
    } else if (keycode == 38 || keycode == 40) {
        let suggestions = $("div.suggestion");
        if ($(".suggestions").find(".suggestion-active").length > 0) {
            if (keycode == 40) {
                if (currentIndex == suggestions.length - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex++;

                }
            } else {
                if (currentIndex == 0) {
                    currentIndex = suggestions.length - 1;
                } else {
                    currentIndex--;
                }
            }
            removeActive();
            suggestions.eq(currentIndex).addClass("suggestion-active");
        } else {
            suggestions.eq(0).addClass("suggestion-active");
        }
    }
});
$(document).on("mouseenter", ".suggestion", function() {
    removeActive();
})

function removeActive() {
    $.each($("div.suggestion"), function(i, val) {
        $(val).removeClass("suggestion-active");
    })
}