$(function() {
    $("#submit").click(function() {
        listFullArticles(pasteSuggestionsInBlock);
    })
    $('#mainInput').on("input", function() {
        listArticles(dynamicSearch)
    });

    $(document).on("click", ".readmore", function() {
        $("#submit").click();
    })

    $(document).on("click", ".suggestion", function() {
        if (!$(this).hasClass("dynamic")) {
            window.open('/' + $(this).data("title"));
        } else {
            $('#mainInput').val($(this).data("title").split("_").join(" "));
            $("#submit").click();
        }
    })

    $("#carousel").carousel({
        touch: true
    })
})