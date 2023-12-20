class loader {
    constructor() {
        window.addEventListener('load', () => {
            //new Handle_UI();
            //console.log('Window selesai di load');

            const list = [
                "utility", 
                "encode/sengkalan", 
                "hash/hash_sha1", 
                "hash/hash_md5", 
                "hash", 
                "encode/lzw",
                "enkripsi/enkripsi_vigenere",
                "enkripsi/enkripsi_caesar",
                "enkripsi",
                "encode/utf8",
                "stego/optimasi_lsb",
                "handle_UI"
            ];
            
            for(var i = 0; i < list.length; i++) {
                this.#loadScript("js/"+list[i]+".js")
                /*.then( data  => {
                    console.log("Script "+ list[i]+".js" +"loaded successfully", data);
                })*/
                .catch( err => {
                    console.error(err);
                });
            }
        });
    }//end constructor

    #loadScript = (FILE_URL, async = true, type = "text/javascript") => {
        return new Promise((resolve, reject) => {
            try {
                const scriptEle = document.createElement("script");
                scriptEle.type = type;
                scriptEle.async = async;
                scriptEle.src =FILE_URL;
    
                scriptEle.addEventListener("load", (ev) => {
                    resolve({ status: true });
                });
    
                scriptEle.addEventListener("error", (ev) => {
                    reject({
                        status: false,
                        message: `Failed to load the script ${FILE_URL}`
                    });
                });
    
                document.body.appendChild(scriptEle);
            } catch (error) {
                reject(error);
            }
        });
    };
}

new loader();