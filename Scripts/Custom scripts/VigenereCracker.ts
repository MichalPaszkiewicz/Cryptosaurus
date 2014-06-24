var crackedKey = "";

function crackVigenereCipher(input: string, length) {

    return getScore(input);
}

function getWords() {

    var request = new XMLHttpRequest();
    request.open("GET", "http://www.michalpaszkiewicz.co.uk/Cryptosaurus/Scripts/Custom%20scripts/WordList/brit-a-z.txt", false);
    request.send(null);
    var returnValue = request.responseText.replace(" ", "");

    var removeCarriageReturn = returnValue;

    var words = removeCarriageReturn.split("\n");

    var len = words.length;

    for (var i = 0; i < len; i++) {
        words[i].replace("\n", "").replace("\r", "");
    }

    for (i = 0; i < len; i++) {
        words[i] && words.push(words[i]);  // copy non-empty values to the end of the array
    }

    words.splice(0, len);

    return words;
}

function getScore(input: string) {
    var words = getWords();

    var score = 0;

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (input.toLowerCase().indexOf(word) > -1) {
            score++;
        }
    }

    //todo: add extra score (10 points?) for key words defined by user at runtime

    return score;
}

var englishLetterFrequencies = {
    'A': 8.167, 'B': 1.492, 'C': 2.782, 'D': 4.253, 'E': 12.702,
    'F': 2.228, 'G': 2.015, 'H': 6.094, 'I': 6.996, 'J': 0.153,
    'K': 0.772, 'L': 4.025, 'M': 2.406, 'N': 6.749, 'O': 7.507,
    'P': 1.929, 'Q': 0.095, 'R': 5.987, 'S': 6.327, 'T': 9.056,
    'U': 2.758, 'V': 0.978, 'W': 2.360, 'X': 0.150, 'Y': 1.974,
    'Z': 0.074, 'max_val': 12.702, 'kappa': 0.0667
};

//get values like this: englishLetterFrequencies["A"];

// note: supply only non-zero ints to n to get nth items
function getEveryNthCharToString(text: string, start, keyLength) {
    var output = "";

    var regex = /[a-zA-z]+$/;

    for (var i = start, j = 0; i < text.length; i++) {
        if (regex.test(text[i])) {
            if (j % parseInt(keyLength) == 0) {
                var currentText = text[i];
                output = output + currentText;
            }
            j++;
        }
    }

    return output;
}

function createDictionaryOfChars(text: string) {
    var dictionary = [];

    var totalLength = text.length;

    var regex = /[a-z]+$/;

    for (var i = 0; i < totalLength; i++) {
        var letter = text[i].toLowerCase();

        if (regex.test(letter) ){
            if (dictionary[letter] == null) {
                dictionary[letter] = 100 / totalLength;
            }
            else {
                dictionary[letter] += 100 / totalLength;
            }
        }
    }

    return dictionary;
}

//String.fromCharCode(97) + 25
//String.fromCharCode(65) + 25

function singleResidualError(dictionary, letter :string, maxValue) {
    var equivalentLetter = letter.toUpperCase();

    var comparisonConstant = maxValue / englishLetterFrequencies.max_val;

    var difference = dictionary[letter] * comparisonConstant - englishLetterFrequencies[equivalentLetter];

    return difference * difference;
}

function getResidualError(text :string) {

    var dictionary = createDictionaryOfChars(text);

    var maxValue = 0;
    for (var letter in dictionary) {
        if (dictionary[letter] > maxValue) {
            maxValue = dictionary[letter];
        }
    }

    var residualError = 0;

    for (var letter in dictionary) {
        residualError = residualError + singleResidualError(dictionary, letter, maxValue);
    }

    return residualError;
}

function getSmallestResidualError(text: string) {

    var numberToLowerA = 97;

    var bestMatch = "";
    var bestMatchResidualError = 100000;

    console.log("String: " + text);

    for (var i = 0; i < 26; i++) {
        var decodeLetter = String.fromCharCode(numberToLowerA + i);

        var decodedText = vigenere(text, decodeLetter, false);

        var newResidualError = getResidualError(decodedText);

        if (newResidualError < bestMatchResidualError) {
            bestMatch = decodeLetter;
            bestMatchResidualError = newResidualError;
        }
    }

    console.log(" Decode letter: " + bestMatch + " New residual error: " + bestMatchResidualError);
    console.log("Decoded text: " + vigenere(text, bestMatch, false));

    return bestMatch;
}

function crackTheCode(text: string, keyLength) {

    text = text.replace("\r","").replace("\n","");

    var key = "";

    for (var i = 0; i < keyLength; i++) {
        var splitText = getEveryNthCharToString(text, i, keyLength);

        var letter = getSmallestResidualError(splitText);

        key += letter;
    }

    crackedKey = key;

    return vigenere(text, key, false);
}
