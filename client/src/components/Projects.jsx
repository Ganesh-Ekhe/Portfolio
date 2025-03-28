import React from 'react';
import projects from '../data/projects';

const Projects = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white py-16">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="text-gray-400 mt-2">{project.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Tech Stack:</h3>
              <ul className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech, index) => (
                  <li key={index} className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
