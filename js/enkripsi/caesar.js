class Caesar {
    _key_fibbo(message, shift_start){
        var fibo = [];
        for(var i = 0; i < message.length; i++) {
            if((i == 0) || (i == 1))
                fibo[i] = shift_start;
            else {
                fibo[i] = fibo[i-1] + fibo[i-2];
                if(fibo[i] > 100) {
                    fibo[i-1] = shift_start;
                    fibo[i] = shift_start;
                }
            }
        }
        return fibo;
    }
    
    Encrypt(message, shift_start = 1) {
        var kunci = this._key_fibbo(message, shift_start);
        //console.log(kunci);
        let result = '';
        for (var i = 0; i < message.length; i++) {
            const c = message.charAt(i);
            result += String.fromCharCode(c.charCodeAt(0) + kunci[i]);
        }
        return result
    }

    Decrypt(message, shift_start = 1) {
        var kunci = this._key_fibbo(message, shift_start);
        let result = '';
        for (let i = 0; i < message.length; i++) {
            const c = message.charAt(i);
            result += String.fromCharCode(c.charCodeAt(0) - kunci[i]);
        }
        return result;
    }
}