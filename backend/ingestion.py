import fitz  # PyMuPDF
import pytesseract
from PIL import Image
import io

def extract_text_from_txt(file_bytes):
    return file_bytes.decode("utf-8")


def extract_text_from_pdf(file_bytes):
    text = ""
    pdf = fitz.open(stream=file_bytes, filetype="pdf")
    for page in pdf:
        text += page.get_text()
    return text


def extract_text_from_image(file_bytes):
    image = Image.open(io.BytesIO(file_bytes))
    text = pytesseract.image_to_string(image)
    return text


def process_file(file_bytes, filename):
    if filename.endswith(".txt"):
        return extract_text_from_txt(file_bytes)

    elif filename.endswith(".pdf"):
        return extract_text_from_pdf(file_bytes)

    elif filename.endswith((".png", ".jpg", ".jpeg")):
        return extract_text_from_image(file_bytes)

    else:
        raise ValueError("Unsupported file type")