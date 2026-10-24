export const resumeData = {
  title: "Resume Platform | Web Application (ReactJS + Flask)",
  resumeBullets: [
    "Designed and developed a web application using ReactJS and Flask to facilitate resume creation and management for users",
    "Implemented backend APIs to handle user data input and generate dynamic, customized resumes",
    "Collaborated on frontend development to ensure a seamless user experience, with a strong focus on usability and visual appeal"
  ],

  executiveScript: `We built the Resume Platform to make professional resume creation and career document management simple, fast, and accessible for users. Many job seekers struggle with formatting issues in traditional word processors, inconsistent margins, and building clean, ATS-friendly layouts.

Our solution connects a modern, responsive ReactJS frontend with a lightweight, high-performance Flask Python backend:

• Frontend Development (ReactJS & Usability):
We structured the user interface into intuitive, step-by-step form modules—covering Personal Info, Work Experience, Education, Projects, and Skills. We built a real-time live preview canvas: as users type or reorder sections, React's component state dynamically updates the preview without page reloads. We placed a strong focus on usability and visual appeal with curated color palettes, professional typography pairings, and responsive controls that work smoothly on desktop and mobile.

• Backend APIs (Python & Flask):
The Flask backend provides RESTful endpoints to handle user profile creation, resume updates, template selection, and dynamic export. Incoming user data is parsed as JSON, validated, and structured into clean data models. We used Flask Blueprints and CORS configuration to cleanly decouple backend services from the frontend.

• Dynamic Resume Generation Engine:
When the user clicks "Export Resume", the Flask backend injects the structured user data into print-optimized HTML/CSS templates using Jinja2. The dynamic engine compiles the profile into a clean, downloadable ATS-compliant PDF document in under 1 second.

• Collaboration & User Experience:
Throughout development, we collaborated closely on frontend usability—introducing helpful features like autosave, section reordering, quick template switching, and clear validation feedback so users can create an interview-ready resume in minutes.`,

  userExample: {
    query: "POST /api/v1/resumes/generate (User: Alex Chen | Template: 'Modern Professional')",
    latency: "< 180ms API processing / ~850ms PDF compilation",
    description: "End-to-end execution flow showing how user input in the ReactJS frontend is validated, transmitted to the Flask backend, dynamically formatted into an ATS-friendly layout, and compiled into a downloadable PDF.",
    steps: [
      {
        step: "01",
        stage: "Frontend Form Input & State Sync",
        system: "ReactJS (Controlled Components)",
        text: "User fills out career details across modular form cards (Contact, Experience, Skills); React state synchronizes with local storage and renders an instant live preview."
      },
      {
        step: "02",
        stage: "REST API Submission",
        system: "React Fetch / Axios Client",
        text: "User selects 'Modern Professional' template and clicks 'Generate Resume'; React dispatches an asynchronous JSON POST request to the Flask backend endpoint (/api/v1/resumes/generate)."
      },
      {
        step: "03",
        stage: "Flask Validation & Structuring",
        system: "Flask REST API (Python)",
        text: "Flask parses the incoming JSON payload, verifies required fields, sanitizes string inputs, and structures experience and education entries into clean context dictionaries."
      },
      {
        step: "04",
        stage: "Dynamic Template Hydration & PDF Render",
        system: "Jinja2 & PDF Rendering Engine",
        text: "Jinja2 dynamically injects the candidate's data into the selected ATS-compliant HTML/CSS template; the server compiles a high-resolution, downloadable PDF buffer returned to the browser."
      }
    ],
    sampleOutput: {
      responseMessage: "Resume successfully compiled! 'Alex_Chen_Software_Engineer.pdf' is ready for download.",
      details: {
        user_name: "Alex Chen",
        role_target: "Senior Python & Full-Stack Engineer",
        template: "Modern_Professional_v2",
        sections_included: "Contact, Summary, 3 Experience Entries, 2 Education Entries, 12 Skills, 2 Projects",
        pdf_size: "142 KB",
        ats_score: "98% (Clean Semantic Structure, Standard Fonts, Text-Extractable)",
        http_status: "200 OK"
      }
    }
  },

  bookmarkedConcepts: [
    {
      id: "reactjs-frontend",
      title: "ReactJS Component Architecture",
      badge: "Frontend UI & Live Preview",
      summary: "Modular component hierarchy managing dynamic form state and instant real-time resume rendering.",
      details: [
        "In Simple Terms: We broke the resume builder into reusable Lego blocks—one component for work experience, one for education, and one for skills. When the user types, only that specific block updates.",
        "Why We Built It This Way: Traditional forms make you fill everything out and click 'Submit' blindly. With React's reactive state, users see a live side-by-side preview update with every keystroke.",
        "Interview Answer: 'We used ReactJS to manage complex multi-section resume states with controlled components and custom hooks, delivering an instant live preview with zero page reloads.'"
      ]
    },
    {
      id: "flask-backend",
      title: "Flask RESTful API Architecture",
      badge: "Lightweight Python Backend",
      summary: "Modular Flask backend exposing clean REST endpoints for profile management, data validation, and resume generation.",
      details: [
        "In Simple Terms: Flask is our lightweight Python engine that listens for requests from React, checks that the user's data is clean, and saves or formats their resume.",
        "Why Flask: Flask is minimal and unopinionated. It gave us complete control over API routes and easy integration with Python templating and PDF libraries without the heavy overhead of monolithic frameworks.",
        "Interview Answer: 'We chose Flask for its simplicity and fast execution. We organized endpoints using Flask Blueprints and CORS middleware to cleanly decouple the Python backend from our React client.'"
      ]
    },
    {
      id: "dynamic-resume-engine",
      title: "Dynamic Templating & PDF Generation",
      badge: "Server-Side Resume Compiler",
      summary: "Injects user data into customizable, ATS-friendly HTML/CSS templates and compiles them into downloadable PDF documents.",
      details: [
        "In Simple Terms: It works like a digital mail merge. We built clean HTML/CSS resume templates with placeholders, and Jinja2 dynamically fills in the user's name, bullet points, and dates.",
        "ATS (Applicant Tracking System) Friendly: The templates use standard semantic HTML tags and standard fonts so automated job application scanners can easily parse the candidate's work history.",
        "Interview Answer: 'Our dynamic engine combines Jinja2 templating with server-side PDF generation, allowing users to swap templates instantly while guaranteeing ATS readability.'"
      ]
    },
    {
      id: "usability-ux",
      title: "UX Design & Usability Focus",
      badge: "Seamless User Experience",
      summary: "User-centered design ensuring easy navigation, responsive mobile input, and visual elegance across all resume templates.",
      details: [
        "In Simple Terms: Making sure the app feels effortless to use. Forms are clean, error messages are friendly, and buttons are clearly placed so anyone can build a resume in under 5 minutes.",
        "Visual Appeal: We implemented curated color palettes, elegant typography pairings, and clean spacing so the generated resumes look professionally designed.",
        "Interview Answer: 'We prioritized usability by conducting iterative user feedback, adding autosave functionality, drag-and-drop section ordering, and responsive mobile-first form controls.'"
      ]
    },
    {
      id: "api-integration",
      title: "API Integration & Data Flow",
      badge: "Client-Server Contract",
      summary: "Asynchronous JSON communication between ReactJS and Flask with robust error handling and loading indicators.",
      details: [
        "In Simple Terms: How React and Flask talk to each other. When a user clicks save or download, React sends the resume data as JSON, and Flask responds with either the PDF or a helpful status message.",
        "Handling Edge Cases: If network connection drops or invalid data is entered, the UI gracefully notifies the user without crashing or losing their work.",
        "Interview Answer: 'We defined a strict RESTful contract with JSON schemas, loading states, and toast notifications to deliver a resilient client-server experience.'"
      ]
    }
  ],

  codeSnippet: {
    title: "Flask REST API: Resume Ingestion & Dynamic PDF Generation",
    code: `# ==============================================================================
# FLASK BACKEND: RESUME INGESTION, JINJA2 TEMPLATING & DYNAMIC PDF COMPILATION
# ==============================================================================
from flask import Flask, request, jsonify, render_template_string, make_response
from flask_cors import CORS
from dataclasses import dataclass
from typing import List, Dict, Any
import weasyprint  # or xhtml2pdf / pdfkit

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests from ReactJS frontend

# Clean Jinja2 HTML/CSS Template (ATS-Friendly, Semantic Tags)
RESUME_HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10.5pt; color: #222; margin: 30px; }
    h1 { font-size: 20pt; margin-bottom: 2px; color: #1a365d; text-transform: uppercase; }
    .contact { font-size: 9pt; color: #555; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 8px; }
    h2 { font-size: 12pt; border-bottom: 1.5px solid #1a365d; margin-top: 15px; margin-bottom: 6px; text-transform: uppercase; }
    .job-title { font-weight: bold; font-size: 10.5pt; }
    .company { color: #444; font-style: italic; }
    .date { float: right; font-size: 9pt; color: #666; }
    ul { margin-top: 4px; margin-bottom: 10px; padding-left: 18px; }
    li { margin-bottom: 3px; line-height: 1.35; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; font-size: 9.5pt; }
  </style>
</head>
<body>
  <h1>{{ user.full_name }}</h1>
  <div class="contact">
    {{ user.email }} | {{ user.phone }} | {{ user.location }} | {{ user.linkedin }}
  </div>

  <h2>Professional Summary</h2>
  <p>{{ user.summary }}</p>

  <h2>Experience</h2>
  {% for exp in experiences %}
    <div>
      <span class="date">{{ exp.start_date }} – {{ exp.end_date }}</span>
      <span class="job-title">{{ exp.title }}</span>, <span class="company">{{ exp.company }}</span>
      <ul>
        {% for bullet in exp.bullet_points %}
          <li>{{ bullet }}</li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}

  <h2>Skills</h2>
  <p>{{ skills | join(" • ") }}</p>
</body>
</html>
"""

@app.route('/api/v1/resumes/generate', methods=['POST'])
def generate_resume_pdf():
    """
    Accepts structured resume JSON from ReactJS, hydrates Jinja2 template,
    and returns a downloadable PDF stream.
    """
    data = request.get_json()
    if not data or 'user' not in data:
        return jsonify({"error": "Invalid request: 'user' payload is required."}), 400

    user_info = data.get('user', {})
    experiences = data.get('experiences', [])
    skills = data.get('skills', [])

    # 1. Server-side validation
    if not user_info.get('full_name') or not user_info.get('email'):
        return jsonify({"error": "Full name and email are mandatory."}), 422

    # 2. Render dynamic HTML using Jinja2
    rendered_html = render_template_string(
        RESUME_HTML_TEMPLATE,
        user=user_info,
        experiences=experiences,
        skills=skills
    )

    # 3. Compile HTML to PDF buffer using WeasyPrint
    pdf_bytes = weasyprint.HTML(string=rendered_html).write_pdf()

    # 4. Return as downloadable binary file response
    filename = f"{user_info.get('full_name', 'Resume').replace(' ', '_')}_Resume.pdf"
    response = make_response(pdf_bytes)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)`
  }
};
