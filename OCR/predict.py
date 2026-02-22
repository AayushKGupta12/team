import cv2
import joblib
import sys


def predict_image(path):
    model = joblib.load("ocr_model.pkl")
    img = cv2.imread(path)

    if img is None:
        raise FileNotFoundError("Image not found")

    return model.predict(img)


if __name__ == "__main__":

    if len(sys.argv) < 2:
        print("Usage: python predict.py image_path")
    else:
        result = predict_image(sys.argv[1])
        print("Detected Text:")
        print(result)