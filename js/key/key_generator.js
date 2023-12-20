class Key_Generator {
    OTP() { 
        var digits = '0123456789'; 
        let passwd = ''; 
        for (let i = 0; i < 4; i++ ) { 
            passwd += digits[Math.floor(Math.random() * 10)]; 
        } 
        return passwd; 
    }//end OTP

    GDC (a, b) {
        if (b == 0) return a;
        else return this.GDC(b,a % b);
    }
    
    LCM(a, b) {
        return a * (b / this.GDC(a,b));
    }

}