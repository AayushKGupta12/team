import joblib
from ocr_model import OCRModel


def train_and_save():
    model = OCRModel()
    joblib.dump(model, "ocr_model.pkl")
    print("Model saved as ocr_model.pkl")


if __name__ == "__main__":
    train_and_save()