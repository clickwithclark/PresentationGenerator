let imageUrl = resizeImage($(".pres-preview img").attr("src"), $(window).width())
$(".pres-preview img").attr("src", resizeImage(imageUrl, $(".pres-preview").width()))

$(".navbar-icon").on('click', function() {
    $(this).toggleClass('active');
    $(this).toggleClass('not-active');
});

$("#submitError").click(function() {
    $.ajax({
        url: "db.php?",
        data: "errortitle=" + $("#title").text() + "&error=" + $("#error-description").val(),
        type: "POST"
    });
    $(this).hide();
    $(".modal-body").empty().append("<p>Thank you for reporting! We will do our best to fix that!</p>")
})