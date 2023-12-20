class Sengkalan {
    #List_Sengkalan = [
        ["Akasa", "Awang-Awang", "Barakan", "Brastha", "Byoma", "Doh", "Gegana","Ilang", "Kombul", "Kos", "Langit",	"Luhur", "Mesat", "Mletik", "Muksa", "Muluk","Musna", "Nenga", "Ngles", "Nir", "Nis"],
        ["Badan","Budha","Budi","Buweng","Candra",	"Dara",	"Dhara","Eka","Gusti","Hyang","Iku","Jagat","Kartika","Kenya","Lek","Luwih","Maha",	"Nabi",	"Nata",	"Nekung","Niyata"],
        ["Apasang", "Asta", "Athi-athi", "Buja", "Bujana", "Dresthi", "Dwi","Gandheng","kalih", "Kanthi", "kembar", "Lar","Mandeng", "Myat", "Nayana", "Nembeh",	"Netra", "Ngabekti", "Paksa", "Sikara",	"Sungu"],
        ["Agni", "Api",  "Apyu", "Bahni", "Benter", "Brama", "Dahana", "Guna", "Jatha", "Kaeksi", "Katingalan", "Katon", "Kawruh", "Kaya", "Kobar", "Kukus", "Lir", "Murub", "Nala", "Naut", "Nauti"],
        ["Bun", "Catur", "Dadya", "Gawe", "Her", "Jaladri", "Jalanidhi", "karta", "Karti", "Karya", "Keblat", "Marna", "Marta", "Masuh", "Nadi", "Papat", "Pat", "Samodra", "Sagara", "Sindu", "Suci"],
        ["Angin", "Astra", "Bajra", "Bana", "Bayu", "Buta", "Cakra", "Diyu", "Galak", "Gati", "Guling", "Hru", "Indri", "Indriya", "Jemparing", "Lima", "Lungid", "Marga", "Margana", "Maruta", "Nata"],
        ["Amla", "Anggana", "Anggang-Anggang", "Amnggas", "Artati", "Carem", "Glinggang", "Hoyag", "Ilat", "Karaseng", "Karengya", "Kayasa", "Kayu", "Kilatan", "Lidhah", "Lindhu", "Lona", "Manis", "Naya", "Nem", "Nenem"],
        ["Acala",  "Ajar",  "Angsa",  "Ardi",  "Arga",  "Aswa",  "Biksu",  "Biksuka",  "Dwija",  "Giri",  "Gora",  "Himawan",  "Kaswareng",  "Kuda",  "Muni",  "Nabda",  "Pandhita",  "Pitu",  "Prabata",  "Resi",  "Sabda"],
        ["Anggusti", "Astha", "Bajul", "Basu", "Basuki", "Baya", "Bebaya", "Brahma", "Brahmana", "Bujangga", "Dirada", "Dwipa", "Dwipangga", "Dwirada", "Estha", "Esthi", "Gajah", "Kunjara", "Madya", "Liman", "Madya"],
        ["Ambuka", "Anggangsir", "Angleng", "Angrong", "Arum", "Babahan", "Bedah", "Bolong", "Butul", "Dewa", "Dwara", "Ganda", "Gapura", "Gatra", "Guwa", "Jawata", "Kori", "Kusuma ", "Lawang", "Manjing", "Masuk"]
    ];

    Encode(input) {
        var sentence = "";
        for(var i = (input.length - 1); i >=0 ; i--) {
            if(sentence == "")
                sentence = this.#List_Sengkalan[parseInt(input.charAt(i))][Math.floor(Math.random() * 21)];
            else
                sentence += " "+this.#List_Sengkalan[parseInt(input.charAt(i))][Math.floor(Math.random() * 21)];
        }
        return sentence;
    }

    Decode(input) {
        var koreksi = input.replace(/[^a-z\d ]/gi, ' ');
        var words = koreksi.split(" ");
        var number = "";
        for(var i = (words.length - 1); i >= 0 ; i--) {
            var found = false;
            var rows = 0;
            while((found == false) && (rows < 10)) {
                var cols = 0;
                while((found == false) && (cols < 21)) {
                    if(this.#List_Sengkalan[rows][cols] == words[i]) 
                        found = true;
                    else
                        cols++;
                }
                if(found == false)
                    rows++;
            }
            if(found == true)
                number += rows.toString() ;
        }
        return number;
    }

    LevenshteinDistance(a, b){
        const aLimit = a.length + 1;
        const bLimit = b.length + 1;
        const distance = Array(aLimit);
        for (let i = 0; i < aLimit; ++i) {
            distance[i] = Array(bLimit);
        }
        for (let i = 0; i < aLimit; ++i) {
                distance[i][0] = i;
        }
        for (let j = 0; j < bLimit; ++j) {
                distance[0][j] = j;
        }
        for (let i = 1; i < aLimit; ++i) {
            for (let j = 1; j <  bLimit; ++j) {
                const substitutionCost = (a[i - 1] === b[j - 1] ? 0 : 1);
                    distance[i][j] = Math.min(
                    distance[i - 1][j] + 1,
                    distance[i][j - 1] + 1,
                    distance[i - 1][j - 1] + substitutionCost
                );
            }
        }
        if(distance[a.length][b.length] < 2)
            console.log(a+' '+b+' '+distance[a.length][b.length].toString())
        return distance[a.length][b.length];
    }
  
}//end class