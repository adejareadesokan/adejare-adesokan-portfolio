import React, { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  url: string;
}

export default function App() {
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  // Projects API State
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsStatus, setProjectsStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading');
  const [projectsError, setProjectsError] = useState<string>('');

  // Smooth-scroll to a section by id (works even if the preview pane blocks # links)
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fetch Projects Logic
  const fetchProjects = async () => {
    setProjectsStatus('loading');
    setProjectsError('');

    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to load projects from server.');
      
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setProjects([]);
        setProjectsStatus('empty');
      } else {
        setProjects(data);
        setProjectsStatus('success');
      }
    } catch (err: any) {
      setProjectsError(err.message || 'An error occurred while fetching projects.');
      setProjectsStatus('error');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle Contact Form Submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setContactStatus({ type: 'success', message: result.message || 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setContactStatus({ type: 'error', message: result.error || 'Failed to send message.' });
      }
    } catch (err) {
      setContactStatus({ type: 'error', message: 'Network error. Please try again later.' });
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="header">
        <nav className="nav">
          <a href="#hero" className="logo" onClick={(e) => scrollToSection(e, 'hero')}>
            Adejare<span> Adesokan </span>
          </a>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
            <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>Projects</a></li>
            
            <li><a href="#involvements" onClick={(e) => scrollToSection(e, 'involvements')}>Involvements</a></li>
            <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="page">
        {/* Section 1: Hero / Intro */}
        <section id="hero" style={{ borderBottom: 'none', paddingBottom: '1.5rem' }}>
          
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
            Adejare Adesokan
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '680px', marginBottom: '1.5rem' }}>
            B.S Computer Science, Tulane University, 2029
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#projects" className="btn" onClick={(e) => scrollToSection(e, 'projects')}>View Projects</a>
            <a href="#contact" className="btn" onClick={(e) => scrollToSection(e, 'contact')} style={{ backgroundColor: 'transparent', color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)' }}>Contact Me</a>
          </div>
        </section>

        {/* Section 2: About Me */}
        <section id="about">
          <h2 className="section-title">About Me</h2>
          <div className="card">
            <p> I am a Computer Science major interested mainly in AI Engineering, Software Engineering, Data Science and Product Management. I hope to use the skills I have 
            learned and will learn to solve problems in the world.</p>
            
          </div>
        </section>

        {/* Section 3: Experience */}
        <section id="experience">
          <h2 className="section-title">Experience</h2>
          <div className="grid">
            <div className="card">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.25rem 1rem' }}>
                <h3>Extern</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>April 2026 – July 2026</span>
              </div>
              <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem' }}>Extern, Outamation</p>
              <ul style={{ marginTop: '0.5rem', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
  <li>
    <strong>Built</strong> a modular AI-powered mortgage document system by integrating OCR, PDF parsing, RAG, and the Groq API to extract, classify, and search information across 200+ page document sets.
  </li>
  <li>
    <strong>Integrated</strong> the Groq API with LlamaIndex and RAG to generate answers from retrieved mortgage-document context, achieving an 80% retrieval hit rate.
  </li>
  <li>
    <strong>Evaluated</strong> end-to-end system performance across test scenarios, measuring an 80% answer accuracy and a 43-second average response time for document-based questions.
  </li>
</ul>
            </div>
          </div>
          
          
          <div className="grid">
            <div className="card">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.25rem 1rem' }}>
                <h3>IT Support Technician</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>January 2026 – Present</span>
              </div>
              <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.85rem' }}>Tulane information and Technology Services</p>
              <ul style={{ marginTop: '0.5rem', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
  <li>
    Delivered technical support to students, staff, alumni, and emeritus faculty, resolving account, endpoint, and device management issues across the university IT environment, including password resets, account recovery, and hardware/endpoint configuration.
  </li>
  <li>
    Administered multi-factor authentication and device security via Duo Admin, Microsoft Authenticator, Microsoft Endpoint (BitLocker key decryption), and SecureDoc for login management.
  </li>
</ul>

            </div>
          </div>
        </section>

        {/* Section 4: Projects */}
        <section id="projects">
          <h2 className="section-title">Projects</h2>

          {/* State Rendering */}
          {projectsStatus === 'loading' && (
            <div className="grid">
              <div className="card" style={{ opacity: 0.6 }}>Loading project data...</div>
            </div>
          )}

          {projectsStatus === 'empty' && (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No projects currently listed.</p>
            </div>
          )}

          {projectsStatus === 'error' && (
            <div className="card" style={{ borderColor: '#dc2626', backgroundColor: '#fef2f2' }}>
              <h3 style={{ color: '#dc2626' }}>Error Loading Projects</h3>
              <p>{projectsError}</p>
              <button onClick={fetchProjects} className="btn" style={{ marginTop: '1rem', backgroundColor: '#dc2626' }}>Retry</button>
            </div>
          )}

          {projectsStatus === 'success' && (
            <div className="grid">
              {projects.map((project, idx) => (
                <div className="card" key={idx}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.technologies.map((tech) => (
                      <span className="tag" key={tech}>{tech}</span>
                    ))}
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--accent-blue)', fontWeight: 600, textDecoration: 'none' }}>
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        

        {/* Section 6: Involvements */}
        <section id="involvements">
          <h2 className="section-title">Organizations & Leadership</h2>
          <div className="grid">
            <div className="card">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.25rem 1rem' }}>
                <h3>National Society of Black Engineers</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>April 2026 – Present</span>
              </div>
              <p><em>Senator, Tulane Chapter</em></p>
              <ul style={{ marginTop: '0.5rem', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                <li>
                  Elected to represent Tulane Chapter at regional and national NSBE conventions, casting votes on organizational bylaws, budget items, and policy amendments on behalf of the chapter
                </li>
                <li>
                  Serve as liaison between the chapter and NSBE's regional body, relaying updates, initiatives, and voting outcomes to chapter leadership and general members
                </li>
              </ul>
            </div>
          </div>

          <div className="grid" style={{ marginTop: '1.25rem' }}>
            <div className="card">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.25rem 1rem' }}>
                <h3>ColorStack</h3>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>September 2025 – Present</span>
              </div>
              <p><em>Student Fellow</em></p>
              <ul style={{ marginTop: '0.5rem', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                <li>
                  Active member of ColorStack, a community dedicated to increasing the presence and success of Black and Latinx computer science students in the tech industry.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 7: Contact Form */}
        <section id="contact" style={{ borderBottom: 'none' }}>
          <h2 className="section-title">Contact</h2>
          <div className="card">
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn" disabled={contactStatus.type === 'loading'}>
                {contactStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Status line directly under button */}
              {contactStatus.message && (
                <div className={`status-line ${contactStatus.type}`}>
                  {contactStatus.message}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}