from flask import Flask, render_template, request
from src.helper import load_embeddings, load_model
from langchain.vectorstores import Pinecone as PC
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from src.prompt import *
import os
import pinecone

load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_API_ENV = os.getenv("PINECONE_API_ENV")
embeddings = load_embeddings()
index_name = "mchatbot"

# Create a Pinecone client instance
pc = pinecone.Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

semantic_search = PC.from_existing_index(index_name, embeddings)

PROMPT = PromptTemplate(template=prompt_template,input_variables=["context","question"])

llm_prompt = {"prompt":PROMPT}

MODEL_PATH = os.getenv("MODEL_PATH")

llm = load_model(MODEL_PATH)

qa = RetrievalQA.from_chain_type(llm=llm,
                                 chain_type="stuff",
                                 retriever=semantic_search.as_retriever(search_kwargs={"k": 3}),
                                 return_source_documents=True,
                                 chain_type_kwargs={"prompt": PROMPT})

app = Flask(__name__, static_folder='static')

@app.route("/chatbot-homepg")
def index():
    return render_template('chatbot.html')

@app.route("/get", methods=["GET","POST"])
def chatbot():
    msg = request.form["msg"]
    input = msg
    results = qa({"query": input})
    print("Response: ", results["result"])
    if results["result"] == "":
        return "Sorry, I don't understand that."
    return str(results["result"])
    

if __name__ == "__main__":
    app.run(debug=True)
