import cv2
import pytesseract


class OCRModel:

    def __init__(self):
        pass

    def preprocess(self, img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
        return thresh

    def predict(self, img):
        processed = self.preprocess(img)
        text = pytesseract.image_to_string(processed, lang='eng')
        text = text.lower().replace("\n", " ")
        return ''.join(
            c for c in text
            if c.isalnum() or c in " ./@#&%*+=-?"
        )