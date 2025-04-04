import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
      const data = await response.json();

      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        throw new Error("Invalid project data.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fallbackImage = "/fallback.png"; // Placeholder image

  return (
    <section className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
       My Amazing Projects
      </motion.h2>

      {error && <p className="text-red-400 text-center mb-6">❗ {error}</p>}

      {loading ? (
        <div className="flex justify-center">Loading Projects...</div>
      ) : (
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center col-span-3">No projects found.</p>
            ) : (
              projects.map((project, index) => (
                <motion.div 
                  key={project._id} 
                  className="relative bg-gray-800 bg-opacity-70 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <motion.img 
                    src={project.image ? `${import.meta.env.VITE_API_URL}${project.image}` : fallbackImage} 
                    alt={project.title || "Project Image"} 
                    className="w-full h-48 object-cover rounded-t-2xl"
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => e.target.src = fallbackImage}
                  />

                  <div className="p-6 flex flex-col justify-between h-64">
                    <h3 className="text-2xl font-semibold mb-2 text-white truncate">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3 overflow-hidden">{project.description}</p>
                    <p className="text-sm text-blue-400 font-semibold mt-3">{project.techStack}</p>

                    <div className="flex justify-between mt-5">
                      <motion.a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-400 transform transition-all duration-300 hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      >
                        Live Demo
                      </motion.a>
                      <motion.a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white bg-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-600 transform transition-all duration-300 hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      >
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
