log(">> onerror.js")
// https://gist.github.com/don/596289071a45b4d19a4362cd04be48ad
// this needs to be in its own file as per https://stackoverflow.com/questions/46256983/script-causes-refused-to-execute-inline-script-either-the-unsafe-inline-keyw
window.onerror = function (msg, url, lineNo, columnNo, error) {
    let string = msg.toLowerCase();
    let substring = "script error";
    if (string.indexOf(substring) > -1) {
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join('\n');
        console.log(message);
        //alert(message);
    }

    return false;
}

log("<< onerror.js")