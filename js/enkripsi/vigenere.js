class Vigenere {
    _private_key = "";
    _public_key = "";
    _plaintext = "";
    _chipertext = "";

    _Generate_Key() {
        var key = new Key_Generator();
        var otp = key.OTP();
        var otp_modif = key.LCM(4, parseInt(otp)).toString();
        if(otp_modif.length < 4)
            otp_modif = otp_modif.padStart(4, '0');
        var sha1 = new SHA1();
        var md5 = new MD5();
        this._private_key = sha1.Hash(otp_modif) + md5.Hash(otp_modif);

        var sengkalan = new Sengkalan();
        var sengkalan_sentence = sengkalan.Encode(otp);

        var lzw = new LZW();
        this._public_key = lzw.Encode(sengkalan_sentence);

        console.log("=== GENERATE KEY ===");
        console.log("OTP : "+ otp + "\n");
        console.log("LCM(4, "+ otp + ") : "+ otp_modif + "\n");
        console.log("Private Key : "+ this._private_key + "\n");
        console.log("Sengkalan : "+ sengkalan_sentence + "\n");
        console.log("Public Key : "+ this._public_key + "\n");
    }

    GetPublicKey() {
        return this._public_key;
    }

    SetPublicKey(value) {
        this._public_key = value;
    }

    SetPlaintext(value) {
        this._plaintext = value;
    }

    GetPlaintext() {
        return this._plaintext
    } 

    SetChipertext(value) {
        this._chipertext = value;
    }

    GetChipertext() {
        return this._chipertext
    }

    Encrypt() {
        this._Generate_Key();
        let result = "";
        for (let i = 0, j = 0; i < this._plaintext.length; i++) {
            const c = this._plaintext.charAt(i);
            result += String.fromCharCode((c.charCodeAt(0) + this._private_key.charCodeAt(j)) % 256);
            j = ++j % this._private_key.length;
        }
        this._chipertext = result;

        console.log("=== ENCRYPT ===");
        console.log("Plaintext : "+ this._plaintext + "\n");
        console.log("Chipertext: "+ result + "\n");
    }

    Decrypt() {
        var lzw = new LZW();
        var sengkalan_sentence = lzw.Decode(this._public_key);
        var sengkalan = new Sengkalan();
        var origin_key = sengkalan.Decode(sengkalan_sentence);

        var key = new Key_Generator();
        var otp_modif = key.LCM(4, parseInt(origin_key)).toString();
        if(otp_modif.length < 4)
            otp_modif = otp_modif.padStart(4, '0');

        var sha1 = new SHA1();
        var md5 = new MD5();
        const private_key = sha1.Hash(otp_modif) + md5.Hash(otp_modif);
        
        let result = "";

        for (let i = 0, j = 0; i < this._chipertext.length; i++) {
            const c = this._chipertext.charAt(i);
            result += String.fromCharCode((c.charCodeAt(0) - private_key.charCodeAt(j)) % 256);
            j = ++j % private_key.length;
        }
        
        console.log("=== DECRYPT ===")
        console.log("Public Key : "+this._public_key);
        console.log("Chipertext : "+this._chipertext);
        console.log("Sengkalan : "+sengkalan_sentence);
        console.log("Origin Key (OTP) : "+origin_key);
        console.log("LCM(4, "+origin_key+") : "+otp_modif);
        console.log("Private Key : "+private_key);
        console.log("Plaintext : "+result);

        this._plaintext = result;
    }
}