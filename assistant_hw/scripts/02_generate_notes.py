#!/usr/bin/env python3
"""
02 — Generate Study Notes

Create 10 exam notes in JSON format from study materials.
"""

import os
import sys  # Добавлен импорт sys
import json
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel, Field, ValidationError

load_dotenv(r"C:\Users\Данис\Desktop\nfac\assistant_hw\.env")

class Note(BaseModel):
    id: int = Field(..., ge=1, le=10)
    heading: str = Field(..., example="Mean Value Theorem")
    summary: str = Field(..., max_length=150)
    page_ref: int | None = Field(None, description="Page number in source PDF")

def get_client():
    """Initialize OpenAI client."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY not found")
        sys.exit(1)  # Исправлено на sys.exit(1)
    return OpenAI(api_key=api_key)

def generate_notes(client):
    """Generate 10 study notes in JSON format."""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "system",
            "content": """You are a study summarizer. Return exactly 10 unique notes that will help prepare for the exam. Respond ONLY with valid JSON matching this schema:
            {
                "notes": [{
                    "id": 1,
                    "heading": "Concept Name",
                    "summary": "Brief explanation",
                    "page_ref": 123
                }]
            }"""
        }],
        response_format={"type": "json_object"}
    )
    
    try:
        data = json.loads(response.choices[0].message.content)
        notes = [Note(**item) for item in data["notes"]]
        
        print("✅ Generated 10 notes:")
        for note in notes:
            print(f"\n{note.heading} (ID: {note.id})")
            print(note.summary)
            if note.page_ref:
                print(f"📖 Page: {note.page_ref}")
        
        # Save to file
        with open("exam_notes.json", "w") as f:
            json.dump(data, f, indent=2)
        print("\n💾 Saved to exam_notes.json")
        
    except ValidationError as e:
        print(f"❌ Validation failed: {e}")

def main():
    print("📝 Generating Study Notes")
    client = get_client()
    generate_notes(client)

if __name__ == "__main__":
    main()