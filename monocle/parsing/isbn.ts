import debug from 'debug';

const ISBN_REGEX = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
const isbnDebug = debug("pluteum:monocle:isbn");


export default function isISBN(isbn: string) {
    return ISBN_REGEX.test(isbn) && validateChecksum(isbn);
}

function validateChecksum(isbn: string) {
    const chars = isbn.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
    const last = chars.pop();
    let sum = 0;
    let check, i;

    if (chars.length == 9) {
        // Compute the ISBN-10 check digit
        chars.reverse();
        for (i = 0; i < chars.length; i++) {
            sum += (i + 2) * parseInt(chars[i], 10);
        }
        check = 11 - (sum % 11);
        if (check == 10) {
            check = "X";
        } else if (check == 11) {
            check = "0";
        }
    } else {
        // Compute the ISBN-13 check digit
        for (i = 0; i < chars.length; i++) {
            sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
        }
        check = 10 - (sum % 10);
        if (check == 10) {
            check = "0";
        }
    }

    if (check == last) {
        isbnDebug(`${isbn} has an valid check digit`);
        return true
    }

    isbnDebug(`${isbn} has an invalid check digit`);
    return false
}