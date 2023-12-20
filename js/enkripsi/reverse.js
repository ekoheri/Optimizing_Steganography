class Reverse {
    Encrypt(pesan, kunci) {
        let result = "";
        var len = pesan.length - 1;
        for(var i = len; i > -1; i--){
            const c = pesan.charAt(i);
            const k = kunci.charAt(1);
            result += String.fromCharCode((c.charCodeAt(0)+k.charCodeAt(0)) % 256);
        }
        return result;
    }

    Decrypt(pesan, kunci) {
        let result = "";
        var len = pesan.length - 1;
        for(var i = len; i > -1; i--){
            const c = pesan.charAt(i);
            const k = kunci.charAt(1);
            result += String.fromCharCode((c.charCodeAt(0)-k.charCodeAt(0)) % 256);
        }
        return result;
    }
}