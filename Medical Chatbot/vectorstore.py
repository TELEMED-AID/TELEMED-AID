from src.helper import load_pdf, text_split_process, load_model, load_embeddings
from langchain.vectorstores import Pinecone as PC
import pinecone
import os
from dotenv import load_dotenv
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_API_ENV = os.getenv("PINECONE_API_ENV")

knowledge_base = load_pdf("data/")
text_chunks = text_split_process(knowledge_base)
embeddings = load_embeddings()
index_name = "mchatbot"
# Create a Pinecone client instance
pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index(index_name)
docs_chunks = [t.page_content for t in text_chunks]
pinecone_index = PC.from_texts(docs_chunks, embeddings, index_name=index_name)