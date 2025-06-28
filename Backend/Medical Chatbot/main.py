from flask import Flask, render_template, request
from src.helper import load_embeddings, load_model
from langchain_pinecone import PineconeVectorStore
from langchain_community.vectorstores import Pinecone as PC
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from src.prompt import *
import os
import pinecone
from flask_cors import CORS
from py_eureka_client import eureka_client


load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_API_ENV = os.getenv("PINECONE_API_ENV")
embeddings = load_embeddings()
index_name = 'mchatbot'

# Create a Pinecone client instance
pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
pinecone_index = pc.Index(index_name)
# semantic_search = PC.from_existing_index(index_name, embeddings)
semantic_search = PineconeVectorStore.from_existing_index(index_name=index_name,embedding=embeddings)
PROMPT = PromptTemplate(template=prompt_template,input_variables=["context","question"])

llm_prompt = {"prompt":PROMPT}

MODEL_PATH = os.getenv("MODEL_PATH")

llm = load_model(MODEL_PATH)

qa = RetrievalQA.from_chain_type(llm=llm,
                                 chain_type="stuff",
                                 retriever=semantic_search.as_retriever(search_kwargs={"k": 3}),
                                 return_source_documents=True,
                                 chain_type_kwargs={"prompt": PROMPT})

# Configure Eureka Client
EUREKA_SERVER = "http://localhost:8761/eureka/"  # Default Eureka server URL
APP_NAME = "Ai-Chatbot-Service"  # Service name in Eureka
FLASK_PORT = 5000  # Port your Flask app runs on

# Initialize Eureka Client
eureka_client.init(
    eureka_server=EUREKA_SERVER,
    app_name=APP_NAME,
    instance_port=FLASK_PORT,
    instance_ip="localhost",  
    instance_host="localhost",
)


app = Flask(__name__, static_folder='static')
CORS(app)


@app.route("/chatbot/get", methods=["POST"])
def chatbot():
    data = request.get_json()
    input = data.get("msg", "")
    results = qa({"query": input})
    print("Response: ", results["result"])
    if results["result"] == "":
        return {"response": "Sorry, I don't understand that."}, 200
    return {"response": results["result"]}, 200    

if __name__ == "__main__":
    app.run(debug=True)
