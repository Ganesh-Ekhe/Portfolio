import { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProjectForm = ({ fetchProjects, editingProject, setEditingProject }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    image: null,
    preview: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setFormData({ ...editingProject, image: null, preview: editingProject.image || "" });
    } else {
      setFormData({ title: "", description: "", techStack: "", liveLink: "", githubLink: "", image: null, preview: "" });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file, preview: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = formData.preview;

      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.image);
        const imageResponse = await fetch(`${backendUrl}/api/upload`, { method: "POST", body: formDataImage });
        const imageData = await imageResponse.json();
        if (!imageData.success) throw new Error("Image upload failed");
        imageUrl = imageData.imageUrl;
      }

      const requestData = { ...formData, image: imageUrl };
      delete requestData.preview; delete requestData.image;

      const url = editingProject ? `${backendUrl}/api/projects/${editingProject._id}` : `${backendUrl}/api/projects`;
      const method = editingProject ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Failed to save project");

      alert(editingProject ? "Project Updated Successfully!" : "Project Added Successfully!");
      fetchProjects();
      setEditingProject(null);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{editingProject ? "Edit Project" : "Add Project"}</h2>

      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required className="w-full p-2 border rounded" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required className="w-full p-2 border rounded mt-2"></textarea>
      <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack" required className="w-full p-2 border rounded mt-2" />
      <input type="text" name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Demo Link" className="w-full p-2 border rounded mt-2" />
      <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" className="w-full p-2 border rounded mt-2" />

      <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded mt-2" />
      {formData.preview && <img src={formData.preview} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />}

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        {loading ? "Processing..." : editingProject ? "Update Project" : "Save Project"}
      </button>
    </form>
  );
};

export default ProjectForm;