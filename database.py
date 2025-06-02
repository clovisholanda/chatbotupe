import faiss
import pickle
import os 
#from langchain.embeddings.openai import OpenAIEmbeddings
#from langchain.vectorstores import FAISS
#from langchain.document_loaders import TextLoader

from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
import openai
from langchain.text_splitter import CharacterTextSplitter
from dotenv import load_dotenv
load_dotenv()
INDEX_PATH = "index_faiss"

# Inicializa o modelo de embeddings da OpenAI

openai.api_key = os.getenv("OPENAI_API_KEY")
embeddings = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))

def indexar_documento(arquivo_texto):
    """Cria um índice FAISS a partir de um documento de texto."""
    
    # Carregar o texto do arquivo
    loader = TextLoader(arquivo_texto, encoding="utf-8")
    documents = loader.load()

    # Dividir texto em partes pequenas
    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100, separator="\n")
     
    docs = text_splitter.split_documents(documents)

    # Criar um índice FAISS
    db = FAISS.from_documents(docs, embeddings)
    
    
    # Salvar o índice
    db.save_local(INDEX_PATH)
    print("Indexação concluída!")

def buscar_resposta(pergunta):
    """Busca documentos mais relevantes para a pergunta."""
    
    if not os.path.exists(INDEX_PATH):
        return "Desculpe, ainda não há documentos indexados."

    db = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)

    resultados = db.similarity_search(pergunta, k=2)

    return "\n\n".join([doc.page_content for doc in resultados])
