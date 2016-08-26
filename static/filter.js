(function() {
    var speciesInputBox = document.getElementById("species-input");

    function ajax(method, url, _onSuccess, _onServerError, _onConnectionError) {
        var request = new XMLHttpRequest(),
            onSuccess = _onSuccess || function() {},
            onServerError = _onServerError || function() {},
            onConnectionError = _onConnectionError || function() {};
        request.open(method, url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                onSuccess(request);
            } else {
                // We reached our target server, but it returned an error
                onServerError(request);
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            onConnectionError(request);
        };

        request.send();
    }

    function displayResults(eltId, request) {
        var resultsContainer = document.getElementById(eltId);
        var results = JSON.parse(request.responseText);
        resultsContainer.innerHTML = Object.keys(results).join("<br>");
    }

    speciesInputBox.onkeyup = function(event) {
        ajax("GET", "/prefix/" + event.target.value, displayResults.bind(null, "results-container"));
    }
})();
