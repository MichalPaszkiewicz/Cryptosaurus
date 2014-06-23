function crackVigenereCipher(input, length) {
    return getScore(input);
}

function getWords() {
    var request = new XMLHttpRequest();
    request.open("GET", "Scripts/Custom scripts/WordList/brit-a-z.txt", false);
    request.send(null);
    var returnValue = request.responseText.replace(" ", "");

    var removeCarriageReturn = returnValue;

    var words = removeCarriageReturn.split("\r\n");

    var len = words.length;

    for (var i = 0; i < len; i++) {
        words[i].replace("\n", "").replace("\r", "");
    }

    for (i = 0; i < len; i++) {
        words[i] && words.push(words[i]); // copy non-empty values to the end of the array
    }

    words.splice(0, len);

    return words;
}

function getScore(input) {
    var words = getWords();

    var score = 0;

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (input.toLowerCase().indexOf(word) > -1) {
            score++;
        }
    }

    return score;
}
//# sourceMappingURL=VigenereCracker.js.map
