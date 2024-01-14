class Reverse {
    Encrypt(message) {
        let result = "";
        var len = message.length - 1;
        for(var i = len; i > -1; i--){
            const c = message.charAt(i);
            result += String.fromCharCode(c.charCodeAt(0));
        }
        return result;
    }
    Decrypt(message) {
        let result = "";
        var len = message.length - 1;
        for(var i = len; i > -1; i--){
            const c = pesan.charAt(i);
            result += String.fromCharCode(c.charCodeAt(0));
        }
        return result;
    }
}