from chunking import chunk_text
from embedding import get_embeddings
from vector_store import create_faiss_index
from retriever import retrieve
from embedding import embedder  


def process_document(text):
    # Step 1: split into chunks
    chunks = chunk_text(text)

    # Step 2: create embeddings
    embeddings = get_embeddings(chunks)

    # Step 3: create FAISS index
    index = create_faiss_index(embeddings)

    return {
        "chunks": chunks,
        "index": index
    }


def query_rag(query, data):
    print("🔥 NEW CODE EXECUTED")
    # Step 1: retrieve relevant chunks
    results = retrieve(query, embedder, data["index"], data["chunks"])

    # Step 2: convert to readable string
    if isinstance(results, list):
        return "\n\n".join(results)

    return str(results)