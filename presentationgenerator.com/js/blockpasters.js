function pasteSuggestionsInBlock(response) {
    $(".suggestions").empty();
    if (response.length > 0) {
        $("h1").text("Выберите статью:")
        $.map(response, function(val, i) {
            $(".suggestions").append('<div class="list-group-item list-group-item-action suggestion" data-title="' + val.title.replace(/ /ig, "_") + '"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">' + val.title + '</h5></div><p class="mb-1">' + val.snippet + '</p></div>');
        })
    } else {
        $("h1").text("Статей нет :(")
    }
}

function dynamicSearch(response) {
    $(".suggestions").empty();
    let array = response;
    let readMore = false;
    if (array.length > 4) {
        array = array.slice(0, 4);
        readMore = true;
    }
    $.map(array, function(val, i) {
        $(".suggestions").append(`<div class="list-group-item list-group-item-action suggestion dynamic" data-title="${val.replace(/ /ig, "_")}"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
        style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20px" height="20px"
        class="">
        <g>
            <g>
                <g>
                    <path
                        d="M508.875,493.792L353.089,338.005c32.358-35.927,52.245-83.296,52.245-135.339C405.333,90.917,314.417,0,202.667,0    S0,90.917,0,202.667s90.917,202.667,202.667,202.667c52.043,0,99.411-19.887,135.339-52.245l155.786,155.786    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125C513.042,504.708,513.042,497.958,508.875,493.792z     M202.667,384c-99.979,0-181.333-81.344-181.333-181.333S102.688,21.333,202.667,21.333S384,102.677,384,202.667    S302.646,384,202.667,384z"
                        data-original="#000000" class="active-path" data-old_color="#000000"
                        fill="#FFFFFF" id="path"/>
                </g>
            </g>
        </g>
    </svg>${val}</h5></div></div>`);
    })
    if (readMore) {
        $(".suggestions").append('<div class="list-group-item list-group-item-action readmore"><svg id="Capa_1" enable-background="new 0 0 515.555 515.555" height="30" viewBox="0 0 515.555 515.555" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m496.679 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"/><path d="m303.347 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"/><path d="m110.014 212.208c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138 65.971-25.167 91.138 0"/></svg></div>')
    }
}