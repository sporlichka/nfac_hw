#!/usr/bin/env python3
"""
01 — Q&A Assistant

Interact with study assistant using file_search for PDF answers.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv("C:\Users\Данис\Desktop\nfac\assistant_hw\.env")

def get_client():
    """Initialize OpenAI client."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY not found")
        sys.exit(1)
    return OpenAI(api_key=api_key)

def load_assistant_id():
    """Load assistant ID from file."""
    assistant_file = Path(".assistant")
    if not assistant_file.exists():
        print("❌ Run 00_bootstrap.py first")
        sys.exit(1)
    return assistant_file.read_text().strip()

def ask_question(client, assistant_id, question):
    """Ask question and stream response with citations."""
    thread = client.beta.threads.create(
        messages=[{"role": "user", "content": question}]
    )
    
    print("\n🤖 Processing...\n")
    with client.beta.threads.runs.stream(
        thread_id=thread.id,
        assistant_id=assistant_id,
    ) as stream:
        for event in stream:
            if event.event == "thread.message.delta":
                for content in event.data.delta.content:
                    if content.type == "text":
                        print(content.text.value, end="", flush=True)
                        if hasattr(content.text, "annotations"):
                            for ann in content.text.annotations:
                                if ann.type == "file_citation":
                                    print(f"\n📖 Citation: {ann.text}", end="")

def main():
    print("📚 Study Q&A Assistant")
    client = get_client()
    assistant_id = load_assistant_id()
    
    while True:
        try:
            question = input("\n❓ Your question (or 'quit'): ")
            if question.lower() in ('quit', 'exit'):
                break
            ask_question(client, assistant_id, question)
        except KeyboardInterrupt:
            break
    
    print("\n🎯 Session ended")

if __name__ == "__main__":
    main()