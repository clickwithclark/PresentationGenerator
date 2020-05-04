$(".starting").css("min-height", $(window).height() - $("nav").height())

$(".navbar-icon").on('click', function() {
    $(this).toggleClass('active');
    $(this).toggleClass('not-active');
});

$(".generate-btn").click(function() {
    $(document).scrollTop(0);
    $("#mainInput").focus();
})