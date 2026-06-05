session_state = {
    "active_pdf": None,
    "vector_db": None,
    "qa_chain": None
}

def set_active_pdf(pdf_name: str, vector_db, qa_chain):
    session_state["active_pdf"] = pdf_name
    session_state["vector_db"] = vector_db
    session_state["qa_chain"] = qa_chain

def get_active_pdf():
    return session_state["active_pdf"]

def get_qa_chain():
    return session_state["qa_chain"]

def reset_session():
    session_state["active_pdf"] = None
    session_state["vector_db"] = None
    session_state["qa_chain"] = None