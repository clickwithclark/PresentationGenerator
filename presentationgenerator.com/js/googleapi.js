var CLIENT_ID = '1002244286905-l6a8jm252nlkglbg36h23g9eoqjaat50.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCIYZca7MRL-p9nqqJxqTOHmGgODObHEIw';
var DISCOVERY_DOCS = ["https://slides.googleapis.com/$discovery/rest?version=v1"];
var SCOPES = "https://www.googleapis.com/auth/presentations";
var authorizeButton = document.getElementById('authorize_button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        $(".progress").show();
        $("h2").text(translation.get("presisgen"))
        getWikiArticle();
    } else {
        authorizeButton.style.display = 'block';
        $(".progress").hide();
        $("h2").text(translation.get("signin"))
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}