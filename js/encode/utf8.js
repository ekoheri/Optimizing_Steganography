class UTF8 {
    Encode(input) {
        input = input.replace(/\r\n/g,"\n");
        var utftext = [];
        /*if( insertBOM == true )  {
            utftext[0]=  0xef;
            utftext[1]=  0xbb;
            utftext[2]=  0xbf;
        }*/

        for (var n = 0; n < input.length; n++) {

            var c = input.charCodeAt(n);

            if (c < 128) {
                utftext[utftext.length]= c;
            }
            else if((c > 127) && (c < 2048)) {
                utftext[utftext.length]= (c >> 6) | 192;
                utftext[utftext.length]= (c & 63) | 128;
            }
            else {
                utftext[utftext.length]= (c >> 12) | 224;
                utftext[utftext.length]= ((c >> 6) & 63) | 128;
                utftext[utftext.length]= (c & 63) | 128;
            }

        }
        return utftext;  
    }

    Decode(input) {
        var result = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
    
        var data = new Uint8Array(input);
    
        // If we have a BOM skip it
        /*if (data.length >= 3 && data[0] === 0xef && data[1] === 0xBB && data[2] === 0xBF) {
            i = 3;
        }*/
    
        while (i < data.length) {
            c = data[i];
    
            if (c < 128) {
                result += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                if (i + 1 >= data.length) {
                    throw "UTF-8 Decode failed. Two byte character was truncated.";
                }
                c2 = data[i + 1];
                result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                if (i + 2 >= data.length) {
                    throw "UTF-8 Decode failed. Multi byte character was truncated.";
                }
                c2 = data[i + 1];
                c3 = data[i + 2];
                result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return result;
    }
}