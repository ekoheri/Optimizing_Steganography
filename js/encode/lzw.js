class LZW {
    Encode(input) {
        if (!input) return input;
            var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
            var d=new Map();
            var input=unescape(encodeURIComponent(input)).split("");
            var word=input[0];
            var num=256;
            var key;
            var o=[];
            function out(word,num) {
                key=word.length>1 ? d.get(word) : word.charCodeAt(0);
                o.push(b64[key&0x3f]);
                o.push(b64[(key>>6)&0x3f]);
                o.push(b64[(key>>12)&0x3f]);
            }
            for (var i=1; i<input.length; i++) {
                var c=input[i];
                if (d.has(word+c)) {
                    word+=c;
                } else {
                    d.set(word+c,num++);
                    out(word,num);
                    word=c;
                    if(num==(1<<18)-1) {
                        d.clear();
                        num=256;
                    }
                }
            }
            out(word);
            return o.join("");
    }

    Decode(input) {
        var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        var b64d={};
        for(var i=0; i<64; i++){
            b64d[b64.charAt(i)]=i;
        }
        var d=new Map();
        var num=256;
        var word=String.fromCharCode(b64d[input[0]]+(b64d[input[1]]<<6)+(b64d[input[2]]<<12));
        var prev=word;
        var o=[word];
        for(var i=3; i < input.length; i+=3) {
            var key=b64d[input[i]]+(b64d[input[i+1]]<<6)+(b64d[input[i+2]]<<12);
            word=key<256 ? String.fromCharCode(key) : d.has(key) ? d.get(key) : word+word.charAt(0);
            o.push(word);
            d.set(num++, prev+word.charAt(0));
            prev=word;
            if(num==(1<<18)-1) {
                d.clear();
                num=256;
            }
        }
        return decodeURIComponent(escape(o.join("")));
    }
}