import cv2
import mediapipe as mp
import numpy as np
import PoseModule as pm

cap = cv2.VideoCapture(0)
cv2.namedWindow("Push-Up Tracker", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Push-Up Tracker", 680, 400)
cv2.setWindowProperty("Push-Up Tracker", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_NORMAL)
detector = pm.PoseDetector()
count = 0
direction = 0
form = 0
feedback = "Fix Form"

while cap.isOpened():
    ret, img = cap.read()  # 640 x 480
    width = cap.get(3)  # float `width`
    height = cap.get(4)  # float `height`
    
    img = detector.findPose(img, False)
    lmList = detector.findPosition(img, False)
    
    if len(lmList) != 0:
        elbow = detector.findAngle(img, 11, 13, 15)
        shoulder = detector.findAngle(img, 13, 11, 23)
        hip = detector.findAngle(img, 11, 23, 25)
        wrist = detector.findAngle(img, 15, 13, 11)  # Check wrist angle for push-up start posture

        # Strengthen form validation for push-up posture
        if elbow > 160 and shoulder > 40 and hip > 160 and wrist > 140:
            form = 1
            feedback = "Correct Form"
        #else:
           # form = 0
            #feedback = "Fix Form"

        # Only start counting and showing the progress bar when the form is correct
        if form == 1:
            # Percentage of success of pushup (dynamic during motion)
            per = np.interp(elbow, (160, 90), (0, 100))  # Maps elbow angle to percentage progress
            # Bar to show pushup progress (move dynamically with the elbow angle)
            bar = np.interp(elbow, (160, 90), (50, 380))  # Bar moves dynamically from 0% to 100% as user moves
        else:
            per = 0  # No progress if form is incorrect
            bar = 380  # Bar stays at 0% if form is incorrect

        # Check for full range of motion for the push-up
        if elbow <= 90 and hip > 160:
            feedback = "Up"
            if direction == 0:
                count += 0.5
                direction = 1
        elif elbow >= 160 and shoulder > 40 and hip > 160:
            feedback = "Down"
            if direction == 1:
                count += 0.5
                direction = 0
        else:
            feedback = "Fix Form"
        
        # Draw the bar (always visible)
        cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
        cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                    (255, 0, 0), 2)

        # Pushup counter
        cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
        cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                    (255, 0, 0), 5)
        
        # Feedback
        cv2.rectangle(img, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(img, feedback, (500, 40), cv2.FONT_HERSHEY_PLAIN, 2,
                    (0, 255, 0), 2)

    else:
        feedback = "Waiting for Pose"

    # Show the image
    cv2.imshow('Push-Up Tracker', img)

    # Limit frame rate for performance and responsiveness
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()















