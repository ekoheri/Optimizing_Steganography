class Steganography {
    _plaintext = "";
    _image_cover = null;
    _image_stego = null;

    SetPlaintext(value) {
        this._plaintext = value;
    }

    GetPlaintext() {
        return this._plaintext;
    }

    SetImageCover(value) {
        this._image_cover = value;
    }

    SetImageStego(value) {
        this._image_stego = value;
    }

    GetImageStego() {
        return this._image_stego;
    }

    _DecimalToHexa(inputNumber, padLength) {
        let hexRepresentation = inputNumber.toString(16).toUpperCase();
        hexRepresentation = hexRepresentation.padStart(padLength, '0');
        return hexRepresentation;
    }

    _HexaIsvalid(hexaStr, padLength) {
        var result = false;
        if(hexaStr.match('^([A-Fa-f0-9]{'+padLength+'})$')) {
            result = true;
        }
        return result;
    }

    Inject() {
        var img = this._image_cover;
        var vig = new Vigenere();
        vig.SetPlaintext(this._plaintext);
        vig.Encrypt();
        var public_key  = vig.GetPublicKey();
        var chipertext = vig.GetChipertext();
        var msg = public_key + '\t' + chipertext;

        var msg_length =  this._DecimalToHexa(msg.length, 6);
        var hidden_msg = msg_length + msg;
        
        console.log(" === INJECT ==== ");
        console.log("Hidden Message " + hidden_msg);

        var index = 0;
   
        for (var i = 0;  i < hidden_msg.length; i++) {
            //Masking bit
            var c = hidden_msg.charAt(i);
            var asciiCode = c.charCodeAt(0);
            var _maskR = (asciiCode & 0x03) >> 0;
            var _maskG = (asciiCode & 0x0C) >> 2;
            var _maskB = (asciiCode & 0x30) >> 4;
            var _maskA = (asciiCode & 0xC0) >> 6;

            //inject bit to RGBA
            img.data[ index + 0] = ( img.data[ index + 0] & 0xFC) | _maskR;
            img.data[ index + 1] = ( img.data[ index + 1] & 0xFC) | _maskG;
            img.data[ index + 2] = ( img.data[ index + 2] & 0xFC) | _maskB;
            img.data[ index + 3] = ( img.data[ index + 3] & 0xFC) | _maskA;

            index += 4;
        }
        this._image_stego = img;
    }

    Extract() {
        var img = this._image_stego;
        var i = 0;
        var completed = false;
        var number_of_msg = 0;
        var extracted_bits = 0;
        var total_bits = 0;
        var hidden_msg = '';

        while ((i < img.data.length) && (completed == false)){
            var _2bitLSB_A = ( img.data[ (4 * i) + 0 ] & 0x03 ) << 0;
            var _2bitLSB_B = ( img.data[ (4 * i) + 1 ] & 0x03 ) << 2;
            var _2bitLSB_G = ( img.data[ (4 * i) + 2 ] & 0x03 ) << 4;
            var _2bitLSB_R = ( img.data[ (4 * i) + 3 ] & 0x03 ) << 6;
            var asciiCode = ( ( ( _2bitLSB_A | _2bitLSB_B) | _2bitLSB_G ) | _2bitLSB_R );
            hidden_msg +=  String.fromCharCode(asciiCode);
            extracted_bits += 1;
            if((extracted_bits == 6) && (number_of_msg == 0)) {
                //console.log(hidden_msg);
                if (this._HexaIsvalid(hidden_msg, 6) ) {
                    number_of_msg = parseInt(hidden_msg, 16);
                    //console.log(number_of_msg);
                    total_bits = number_of_msg + 6;
                    hidden_msg = '';
                }    
                else {
                    total_bits = 0;
                    hidden_msg = '';
                    completed = true;
                    break;
                }
            }
            else if((extracted_bits >= total_bits)  && (number_of_msg != 0) ) {
                completed = true;
                break;
            }
            i++;
        }

        if(hidden_msg != '') {
            var arr = hidden_msg.split('\t');
            var public_key = arr[0];
            var chipertext = arr[1];
            var vig = new Vigenere();
            vig.SetChipertext(chipertext);
            vig.SetPublicKey(public_key);
            vig.Decrypt();
            this._plaintext = vig.GetPlaintext();
        } else {
            this._plaintext = '';
        }
    }//end extract
}