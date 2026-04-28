from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

from dotenv import load_dotenv
import os

load_dotenv()

# 1) Create embeddings (free, local)
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def process_document(text):
    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_text(text)

    db = FAISS.from_texts(chunks, embeddings)
    return db


def query_rag(query, db):
    try:
        docs = db.similarity_search(query, k=3)

        if not docs:
            return {"error": "No relevant data found"}

        context = "\n".join([d.page_content for d in docs])

        llm = ChatGroq(
            model="llama-3.1-8b-instant",
            groq_api_key=os.getenv("GROQ_API_KEY")
        )

        prompt = f"""
You are a DevOps expert.

Analyze the logs and answer clearly.

Context:
{context}

Question:
{query}
"""

        response = llm.invoke(prompt)

        return {
            "answer": response.content if response else "No response",
            "source": context[:200]
        }

    except Exception as e:
        return {"error": str(e)}