class LSB_PVDMF {
    _str2bin(string) {
        return string.split('').map(function(char) {
            return ('00000000' + char.charCodeAt(0).toString(2)).slice(-8);
        }).join('');
    }

    _bin2str(bin) {
        const binaryString = bin.match(/.{1,8}/g);
        const str = binaryString.map(function(byte) {
            return String.fromCharCode(parseInt(byte, 2));
        }).join('');
        return str;
    }
    // Encoding part
    Encode(img, msg) {
        let data = msg; 
        let dataLength = (data.length).toString(2).padStart(16, '0');
        let binary_msg = dataLength + this._str2bin(data);
        console.log(" === INJECT ==== ");
        console.log("Hidden Message " + binary_msg);

        const imageData = img;
        let width = imageData.width;
        let height = imageData.height;
        let encodingCapacity = width * height * 4; 
        let totalBits = 16 + binary_msg.length; 
        
        if (totalBits > encodingCapacity) {
            console.error("The amount of data is too large to insert into the cover image!"); 
            return;
        }

        /*var pixel_before = "";
        for (var i = 0; i < (binary_msg.length * 4); i++) {
            pixel_before += imageData.data[i].toString()+" ";
        }
        console.log(pixel_before);*/

        var index = 0;
        for(var i = 0; i < binary_msg.length; i += 4) {
            for(var rgba = 0; rgba < 4 ; rgba++) {
                var bit = binary_msg[i + rgba];
                if((bit == '0') && (imageData.data[index + rgba] % 2 == 1)) {
                    imageData.data[index + rgba] -= 1; 
                }
                else if ((bit == '1') && (imageData.data[index + rgba] % 2 == 0)) { 
                    imageData.data[index + rgba] += 1;
                }
            }
            index += 4;
        }
        /*var pixel_after = "";
        for (var i = 0; i < (binary_msg.length * 4); i++) {
            pixel_after += imageData.data[i].toString()+" ";
        }
        console.log(pixel_after);*/
        return imageData;
    }

    // Decoding part
    Decode(img) {
        const imageData = img;
        let result = '';
        let extracted_bits = 0;
        let number_of_bits = 0;       

        let completed = false;
        var index = 0;
        while((index < imageData.data.length) && (completed == false)) {
            for (let rgba = 0; rgba < 4; rgba++) {
                result += (imageData.data[index + rgba] % 2).toString();
                extracted_bits += 1;
                if ((extracted_bits == 16) && (number_of_bits == 0)) {
                    //console.log(result);
                    number_of_bits = parseInt(result, 2) * 8;
                    //console.log(number_of_bits);
                    result = '';
                    extracted_bits = 0;
                } else if ((extracted_bits == number_of_bits) && (number_of_bits > 0)){ 
                    completed = true;
                    break;
                }
            }
            index += 4;
        }//end while
        
        return this._bin2str(result);
    }
}//end class