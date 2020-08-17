$(".navbar-icon").on('click', function() {
    $(this).toggleClass('active');
    $(this).toggleClass('not-active');
});

$("#submitError").click(function() {
    if ($("#error-description").val().length > 0) {
        $.ajax({
            url: "db.php?",
            data: "errortitle=" + $("#title").text() + "&error=" + $("#error-description").val(),
            type: "POST"
        });
        $(this).hide();
        $("#errorModal .modal-body").empty().append("<p>" + translation.get("thankyou") + "</p>")
    }
})

$("#sendEmail").click(function() {
    if ($("#email").val().length > 0) {
        $.ajax({
            url: "db.php?",
            data: "send=" + $("#email").val() +
                "&pptx=" + linksArray[0] +
                "&gslide=" + linksArray[1] +
                "&pdf=" + linksArray[2] +
                "&txt=" + linksArray[3] +
                "&odp=" + linksArray[4],
            type: "POST"
        });
        $(this).hide();
        $("#emailModal .modal-body").empty().append("<p>" + translation.get("emailSent") + "</p>")
    }
})