import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

def Tampilkan_Histogram(nama_file, warna):
    konstanta_warna = 0
    if(warna == '1'):
        konstanta_warna = cv.IMREAD_COLOR
    elif(warna == '2'):
        konstanta_warna = cv.IMREAD_GRAYSCALE
    img = cv.imread(nama_file, konstanta_warna)
    assert img is not None, "file could not be read, check with os.path.exists()"

    window_name = 'Histogram'
    cv.imshow(window_name, img)
    cv.waitKey(0)
    plt.hist(img.ravel(),512,[0,512]); plt.show()
    cv.destroyAllWindows()

if __name__ == '__main__':
    nm_file = input("Nama File : ")
    warna = input("Jenis Warna (1) RGB, 2(Grayscale) : ")
    Tampilkan_Histogram(nm_file, warna)