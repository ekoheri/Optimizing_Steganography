class Main {
    //Properties Encode
    txtSecretMsg = document.getElementById('txtSecretMsg');
    fileImgCover = document.getElementById('fileImgCover');
    btnInject = document.getElementById('btnInject');

    divResultInject = document.getElementById('divResultInject');
    cvsImgStego = document.getElementById('cvsImgStego');
    btnDownload = document.getElementById('btnDownload');

    //Properties Decode
    fileImgStego = document.getElementById('fileImgStego');
    btnExtract = document.getElementById('btnExtract');

    divResultExtract = document.getElementById('divResultExtract');
    txtPlaintext = document.getElementById('txtPlaintext');

    png_stego = null;
    

    constructor() {
        this.divResultInject.hidden = true;
        this.divResultExtract.hidden = true;

        this.btnInject.addEventListener('click', function() {
            this.Inject();
        }.bind(this));

        this.btnDownload.addEventListener('click', function() {
            this.DownloadImage(this.png_stego, 'gambar_rahasia.png');
        }.bind(this));

        this.btnExtract.addEventListener('click', function() {
            this.Extract();
        }.bind(this));

    }

    Inject() {
        this.divResultInject.hidden = false;

        let plaintext = this.txtSecretMsg.value;

        var fileInput = this.fileImgCover;
        var file = fileInput.files[0];
        if (!file) {
            return;
        }
            
        var reader = new FileReader();
        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                this.cvsImgStego.width = img.naturalWidth;
                this.cvsImgStego.height = img.naturalHeight;
                var ctx = this.cvsImgStego.getContext("2d");
                ctx.drawImage(img, 0, 0, this.cvsImgStego.width, this.cvsImgStego.height);

                var imageData = ctx.getImageData(0, 0, this.cvsImgStego.width, this.cvsImgStego.height);
                var lsb = new Steganography();
                lsb.SetPlaintext(plaintext);
                lsb.SetImageCover(imageData);
                lsb.Inject();
                var img_stego = lsb.GetImageStego();
                ctx.putImageData(img_stego, 0, 0);

                this.png_stego = UPNG.encode([img_stego.data.buffer], this.cvsImgStego.width, this.cvsImgStego.height, 0);
            }.bind(this);
        }.bind(this);//end reader load
        reader.readAsDataURL(file);
    }//end encode

    Extract() {
        this.divResultExtract.hidden = false;

        var fileInput = this.fileImgStego;
        var file = fileInput.files[0];
        if (!file) {
            return;
        }

        var reader = new FileReader();
        reader.onload = function() {
            var imageData = UPNG.decode(reader.result);
            //console.log(imageData.data);
            var lsb = new Steganography();
            lsb.SetImageStego(imageData);
            lsb.Extract();
            this.txtPlaintext.value = lsb.GetPlaintext();
        }.bind(this);//end reader load
        reader.readAsArrayBuffer(file);
    }//end decode

    DownloadImage(encodedData, fileName) {
        var blob = new Blob([encodedData], { type: 'image/png' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }//end DownloadImage
}//end class

new Main();