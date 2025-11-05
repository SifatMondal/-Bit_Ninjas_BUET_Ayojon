-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a function to generate embeddings placeholder (to be replaced with actual OpenAI calls)
CREATE OR REPLACE FUNCTION generate_embedding_placeholder()
RETURNS vector AS $$
BEGIN
  -- Returns a zero vector of dimension 1536 (OpenAI ada-002 embedding size)
  RETURN array_fill(0, ARRAY[1536])::vector;
END;
$$ LANGUAGE plpgsql;
