// server/projects.ts

const PROJECTS: Array<{
  title: string;
  description: string;
  technologies: string[];
  url: string;
}> = [
  {
    title: "RAG Document Intelligence Pipeline",
    description: "End-to-end Retrieval-Augmented Generation pipeline built using PyMuPDF, LlamaIndex, and Groq. Extracts structured text and complex tables from high-volume PDF documentation with automated vector indexing and semantic retrieval.",
    technologies: ["Python", "LlamaIndex", "Pandas", "PyMuPDF", "RAG"],
    url: "https://github.com/adejareadesokan/Outamation-x-Extern-Project"
  }
];

export function GET(): Response {
  return new Response(JSON.stringify(PROJECTS), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}