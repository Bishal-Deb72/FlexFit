import cv2
import mediapipe as mp
import time

# Initialize Mediapipe Pose Estimator
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Indices for body landmarks (excluding face points)
body_landmark_indices = [
    11, 12,  # Shoulders
    13, 14,  # Elbows
    15, 16,  # Wrists
    23, 24,  # Hips
    25, 26,  # Knees
    27, 28,  # Ankles
]

# Start video capture (using the webcam)
cap = cv2.VideoCapture(0)  # Default camera

# Initialize the Pose Estimation model
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    # Set the OpenCV window to be resizable
    cv2.namedWindow('Pose Estimation', cv2.WINDOW_NORMAL)

    # Set interval for printing (e.g., print every 10 frames)
    frame_count = 0
    print_interval = 10  # Adjust this for desired frequency of printing

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        # Convert BGR frame (OpenCV) to RGB (Mediapipe)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        rgb_frame.flags.writeable = False  # Optimize performance

        # Process the frame for pose detection
        results = pose.process(rgb_frame)
        rgb_frame.flags.writeable = True

        # Create a copy of the frame for annotations
        annotated_frame = frame.copy()

        # Check if pose landmarks are detected
        if results.pose_landmarks:
            frame_count += 1

            # Print coordinates at specified intervals
            if frame_count % print_interval == 0:
                for idx in body_landmark_indices:
                    landmark = results.pose_landmarks.landmark[idx]
                    x = int(landmark.x * frame.shape[1])
                    y = int(landmark.y * frame.shape[0])
                    print(f"Landmark {idx} - x: {landmark.x:.4f}, y: {landmark.y:.4f}, z: {landmark.z:.4f}")

            # Draw only the body landmarks and connections
            for idx in body_landmark_indices:
                landmark = results.pose_landmarks.landmark[idx]
                x = int(landmark.x * frame.shape[1])
                y = int(landmark.y * frame.shape[0])

                # Draw the landmarks as green circles
                cv2.circle(annotated_frame, (x, y), radius=5, color=(0, 255, 0), thickness=-1)

            # Draw connections between body landmarks (no face landmarks)
            for start_idx, end_idx in mp_pose.POSE_CONNECTIONS:
                if start_idx in body_landmark_indices and end_idx in body_landmark_indices:
                    start_landmark = results.pose_landmarks.landmark[start_idx]
                    end_landmark = results.pose_landmarks.landmark[end_idx]
                    start_point = (int(start_landmark.x * frame.shape[1]), int(start_landmark.y * frame.shape[0]))
                    end_point = (int(end_landmark.x * frame.shape[1]), int(end_landmark.y * frame.shape[0]))
                    cv2.line(annotated_frame, start_point, end_point, (245, 117, 66), 2)  # Orange lines for connections

        # Display the annotated frame
        cv2.imshow('Pose Estimation', annotated_frame)

        # Exit when 'q' is pressed
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

# Release the camera and close windows
cap.release()
cv2.destroyAllWindows()
