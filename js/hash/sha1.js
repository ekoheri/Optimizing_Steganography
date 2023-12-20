class SHA1 {
    CHAR_SIZE = 8;
  
    pad (str, bits) {
      let res = str;
      while (res.length % bits !== 0) {
        res = '0' + res;
      }
      return res;
    };
  
    chunkify (str, size) {
      const chunks = [];
      for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
      }
      return chunks;
    };
  
    rotateLeft(bits, turns) {
      return bits.substr(turns) + bits.substr(0, turns);
    };
  
    preProcess (message) {
      let m = message
        .split('')
        .map((e) => e.charCodeAt(0))
        .map((e) => e.toString(2))
        .map((e) => this.pad(e, 8))
        .join('') + '1';
  
      while (m.length % 512 !== 448) {
        m += '0';
      }
  
      let ml = (message.length * this.CHAR_SIZE).toString(2);
      ml = this.pad(ml, 64);
  
      return m + ml;
    };
  
    Hash(message) {
      let H0 = 0x67452301;
      let H1 = 0xEFCDAB89;
      let H2 = 0x98BADCFE;
      let H3 = 0x10325476;
      let H4 = 0xC3D2E1F0;
  
      const bits = this.preProcess(message);
      const chunks = this.chunkify(bits, 512);
  
      const pad = this.pad.bind(this);
      const rotate_Left = this.rotateLeft.bind(this);
  
      chunks.forEach(function (chunk) {
        const words = this.chunkify(chunk, 32);
  
        for (let i = 16; i < 80; i++) {
            const val = [
                words[i - 3],
                words[i - 8],
                words[i - 14],
                words[i - 16],
            ].map((e) => parseInt(e, 2)).reduce((acc, curr) => curr ^ acc, 0);
            const bin = (val >>> 0).toString(2);
            const paddedBin = pad(bin, 32);
            const word = rotate_Left(paddedBin, 1);
            words.push(word);
        }
  
        let [a, b, c, d, e] = [H0, H1, H2, H3, H4];
  
        for (let i = 0; i < 80; i++) {
            let f, k;
            if (i < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            } else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            // make sure f is unsigned
            f >>>= 0;
    
            const aRot = rotate_Left(pad(a.toString(2), 32), 5);
            const aInt = parseInt(aRot, 2) >>> 0;
            const wordInt = parseInt(words[i], 2) >>> 0;
            const t = aInt + f + e + k + wordInt;
            e = d >>> 0;
            d = c >>> 0;
            const bRot = rotate_Left(pad(b.toString(2), 32), 30);
            c = parseInt(bRot, 2) >>> 0;
            b = a >>> 0;
            a = t >>> 0;
        }
  
        H0 = (H0 + a) >>> 0;
        H1 = (H1 + b) >>> 0;
        H2 = (H2 + c) >>> 0;
        H3 = (H3 + d) >>> 0;
        H4 = (H4 + e) >>> 0;
      }, this);
  
      const HH = [H0, H1, H2, H3, H4]
        .map((e) => e.toString(16))
        .map((e) => pad(e, 8))
        .join('');
  
      return HH;
    }
}
  