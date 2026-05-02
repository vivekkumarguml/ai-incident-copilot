import numpy as np

def retrieve(query, embedder, index, chunks, k=3):
    query_vec = list(embedder.embed([query]))[0]

    D, I = index.search(np.array([query_vec]), k)

    return [chunks[i] for i in I[0]]