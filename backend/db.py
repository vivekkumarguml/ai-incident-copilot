# db.py

import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

# Create client
client = MongoClient(MONGO_URI)

# Select DB + collection
db = client["aiincidentcopilot"]
collection = db["documents"]

# Test connection (optional but useful)
try:
    print("✅ MongoDB Connected:", client.list_database_names())
except Exception as e:
    print("❌ MongoDB Connection Error:", e)