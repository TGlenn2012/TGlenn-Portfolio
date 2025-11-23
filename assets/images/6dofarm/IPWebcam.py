import requests
import cv2
import imutils
import numpy as np

url = "http://192.168.1.2:8080/shot.jpg"
while True:

    img_resp = requests.get(url)
    img_arr = np.array(bytearray(img_resp.content), dtype = np.uint8)
    img = cv2.imdecode(img_arr, -1)
    img = imutils.rotate(img, -90)

    # Converting image to HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Define the range of red color
    red_lower = np.array([0, 100, 100], np.uint8) #110,87,111
    red_upper = np.array([10, 255, 255], np.uint8)

    # Define the range of blue color
    blue_lower = np.array([110, 100, 100], np.uint8)
    blue_upper = np.array([130, 255, 255], np.uint8)

    # Define the range of purple color
    purple_lower = np.array([129, 211, 230], np.uint8)
    purple_upper = np.array([149, 231, 250], np.uint8)

    # Define the range of green color
    green_lower = np.array([50, 100, 100], np.uint8)
    green_upper = np.array([70, 255, 255], np.uint8)

    # Find the range of the colors
    red = cv2.inRange(hsv, red_lower, red_upper)
    blue = cv2.inRange(hsv, blue_lower, blue_upper)
    purple = cv2.inRange(hsv, purple_lower, purple_upper)
    green = cv2.inRange(hsv, green_lower, green_upper)

    # Morphological transformation, dilation
    kernel = np.ones((5, 5), "uint8")

    red = cv2.dilate(red, kernel)
    res_red = cv2.bitwise_and(img, img,mask=red)

    blue = cv2.dilate(blue, kernel)
    res_blue = cv2.bitwise_and(img, img,mask=blue)

    purple = cv2.dilate(purple, kernel)
    res_purple = cv2.bitwise_and(img, img,mask=purple)

    green = cv2.dilate(green, kernel)
    res_green = cv2.bitwise_and(img, img,mask=green)

    # Tracking the red color
    (_,contours,hierarchy)=cv2.findContours(red,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
	
    for pic, contour in enumerate(contours):
	    area = cv2.contourArea(contour)
	    if(area>500):			
		    x,y,w,h = cv2.boundingRect(contour)	
		    img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,255),2)
		    cv2.putText(img,"Red color",(x,y),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255))
    print ('red')

    #Tracking the Blue Color
    (_,contours,hierarchy)=cv2.findContours(blue,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

    for pic, contour in enumerate(contours):
	    area = cv2.contourArea(contour)
	    if(area>500):
		    x,y,w,h = cv2.boundingRect(contour)	
		    img = cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
		    cv2.putText(img,"Blue color",(x,y),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,0,0))
    print('blue')

    #Tracking the Green Color
    (_,contours,hierarchy)=cv2.findContours(green,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

    for pic, contour in enumerate(contours):
	    area = cv2.contourArea(contour)
	    if(area>500):
		    x,y,w,h = cv2.boundingRect(contour)	
		    img = cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
		    cv2.putText(img,"Green color",(x,y),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,255,0))
    print('green')

    #Tracking the Purple Color
    (_,contours,hierarchy)=cv2.findContours(purple,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

    for pic, contour in enumerate(contours):
	    area = cv2.contourArea(contour)
	    if(area>500):
		    x,y,w,h = cv2.boundingRect(contour)	
		    img = cv2.rectangle(img,(x,y),(x+w,y+h),(128,0,128),2)
		    cv2.putText(img,"Purple color",(x,y),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (128,0,128))
    print('purple')

    # Show the livestream window with recognition
    cv2.imshow("AndroidCam", img)

    if cv2.waitKey(1) == 27:
        break