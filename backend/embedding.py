#emnedding.py (FastEmbed)
from fastembed import TextEmbedding

embedder=TextEmbedding()

def get_embeddings(texts):
    return list(embedder.embed(texts))