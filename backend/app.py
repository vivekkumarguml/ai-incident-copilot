from fastapi import FastAPI, UploadFile, File
from rag import process_document, query_rag
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pymongo import MongoClient

client = MongoClient(os.getenv("MONGO_URI"))
db = client["incidentDB"]
collection = db["documents"]

load_dotenv()

app = FastAPI()
DB = {}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    content = await file.read()

    try:
        text = content.decode("utf-8")
    except:
        return {"error": "Only .txt files supported"}

    # ✅ 1. Store in MongoDB (persistence)
    collection.insert_one({"text": text})

    # ✅ 2. Process for RAG (embeddings)
    DB["data"] = process_document(text)

    return {"message": "File uploaded & processed successfully"}

@app.post("/query/")
async def query(q: str):

    # ✅ If RAG not already built (server restart case)
    if "data" not in DB:
        docs = list(collection.find())

        # ❌ No data in MongoDB
        if not docs:
            return {"error": "No document uploaded"}

        # ✅ Combine all stored documents
        combined_text = " ".join([doc["text"] for doc in docs])

        # ✅ Rebuild RAG from stored data
        DB["data"] = process_document(combined_text)

    # ✅ Run query on RAG
    return query_rag(q, DB["data"])