function vigenere(text, key, isEncrypt) {
    var filteredKey = filterKey(key);

    if (isEncrypt) {
        return vigenereEncode(text, filteredKey);
    } else {
        return vigenereDecode(text, filteredKey);
    }
}

function vigenereEncode(text, key) {
    var output = "";

    for (var i = 0, j = 0; i < text.length; i++) {
        var c = text.charCodeAt(i);

        if (isUppercase(c)) {
            output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
            j++;
        } else if (isLowercase(c)) {
            output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
            j++;
        } else {
            output += text.charAt(i);
        }
    }

    return output;
}

function vigenereDecode(text, key) {
    for (var i = 0; i < key.length; i++) {
        key[i] = (26 - key[i]) % 26;
    }
}

function crypt(input, key) {
    var output = "";
    for (var i = 0, j = 0; i < input.length; i++) {
        var c = input.charCodeAt(i);
        if (isUppercase(c)) {
            output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
            j++;
        } else if (isLowercase(c)) {
            output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
            j++;
        } else {
            output += input.charAt(i);
        }
    }
    return output;
}

/*
* Returns an array of numbers, each in the range [0, 26), representing the given key. The key is case-insensitive, and non-letters are ignored.
* Examples:
*   filterKey("AAA") = [0, 0, 0]
*   filterKey("abc") = [0, 1, 2]
*   filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19]
*/
function filterKey(key) {
    var result = [];
    for (var i = 0; i < key.length; i++) {
        var c = key.charCodeAt(i);
        if (isLetter(c))
            result.push((c - 65) % 32);
    }
    return result;
}

// Tests whether the specified character code is a letter.
function isLetter(c) {
    return isUppercase(c) || isLowercase(c);
}

// Tests whether the specified character code is an uppercase letter.
function isUppercase(c) {
    return c >= 65 && c <= 90;
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
    return c >= 97 && c <= 122;
}
//# sourceMappingURL=Vigenere.js.map
