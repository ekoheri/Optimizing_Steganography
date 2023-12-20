from math import log10, sqrt 
import cv2 
import numpy as np 
  
def PSNR(original, modified): 
    mse = np.mean((original - modified) ** 2) 
    if(mse == 0):  # MSE is zero means no noise is present in the signal . 
                  # Therefore PSNR have no importance. 
        return 100
    max_pixel = 255.0
    psnr = 10 * log10(max_pixel / sqrt(mse)) 
    return psnr 
  
def main(): 
    file1 = input("Nama file 1 : ")
    file2 = input("Nama file 2 : ")
    original = cv2.imread(file1) 
    steganografy = cv2.imread(file2, 1) 
    value = PSNR(original, steganografy) 
    print(f"PSNR value is {value} dB") 
       
if __name__ == "__main__": 
    main()  
