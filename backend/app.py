from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ingestion import process_file
from rag import process_document, query_rag
from db import collection

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ In-memory storage (YOU MISSED THIS)
DB = {}


@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    content = await file.read()

    try:
        # 🔹 Process file
        text = process_file(content, file.filename)
        data = process_document(text)

        # 🔹 Store in memory (for RAG)
        DB["data"] = data

        # 🔥 Store in MongoDB
        collection.insert_one({
            "filename": file.filename,
            "text": text
        })

        print("✅ Stored in MongoDB + RAG ready")

        return {"message": "File processed successfully"}

    except Exception as e:
        print("🔥 UPLOAD ERROR:", str(e))
        return {"error": str(e)}


@app.get("/query/")
def query(q: str):
    #print("📩 Query received:", q)

    if "data" not in DB:
        return {"error": "No document uploaded yet"}

    try:
        response = query_rag(q, DB["data"])

        print("🤖 RAG response:", response)

        return {"response": response}

    except Exception as e:
        print("🔥 QUERY ERROR:", str(e))
        return {"error": str(e)}