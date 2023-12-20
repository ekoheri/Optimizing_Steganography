class Subtitution {
    _generate_key(message, key) {
        if(message.length > key.length) {
            var number_of_loop = Math.floor(message.length / key.length);
            var remains = message.length - (key.length  * number_of_loop);
            var key_remains = "";
            if(remains > 0) {
                key_remains = key.substring(0, remains);
            }

            var temp_key = '';
            for(var i = 1; i < (number_of_loop); i++) {
                var temp = '';
                for(var j = 0; j < key.length; j++) {
                    var k = key.charAt(j);
                    temp += String.fromCharCode(k.charCodeAt(0) + i);
                }
                temp_key += temp;
            }
            key += temp_key+key_remains;
        }
        console.log(key);
        return key;
    }

    Encrypt(message, key) {
        var long_key = this._generate_key(message, key);
        let result = "";
        for(var i = 0; i < message.length; i++) {
            const m = message.charAt(i);
            const k = long_key.charAt(i);
            result += String.fromCharCode((m.charCodeAt(0) + k.charCodeAt(0)) % 256);
        }
        return result;
    }

    Decrypt(message, key) {
        var long_key = this._generate_key(message, key);
        let result = "";
        for(var i = 0; i < message.length; i++) {
            const m = message.charAt(i);
            const k = long_key.charAt(i);
            result += String.fromCharCode((m.charCodeAt(0) - k.charCodeAt(0)) % 256);
        }
        return result;
    }
}