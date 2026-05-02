# vectore_store.py (Manual FAISS)

import faiss
import numpy as np

def create_faiss_index(embeddings):
    dim = len(embeddings[0])
    index = faiss.IndexFlatL2(dim)

    index.add(np.array(embeddings))
    return index