import React, { useState, useEffect } from "react";
import { saveInfo, fetchLatestInfo, updateInfo } from "../services/api";

const UpdateInformationForm = () => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});
  const [error, setError] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    const getLatestData = async () => {
      try {
        const data = await fetchLatestInfo();
        console.log("Fetched Data:", data);
        setLatestData(data);
        setSocialLinks(data.socialLinks || { facebook: "", twitter: "", instagram: "", youtube: "" });
        setFormData({
          clubName: data.clubName,
          associationName: data.associationName,
          description: data.description,
          tagline: data.tagline,
          email: data.email,
          contactNumber: data.contactNumber,
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLatestData();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length) {
      setFileData((prevFileData) => ({
        ...prevFileData,
        [name]: files[0],
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const updatedFormData = new FormData();
      for (const [key, value] of Object.entries(fileData)) {
        updatedFormData.append(key, value);
      }
      for (const [key, value] of Object.entries(formData)) {
        updatedFormData.append(key, value);
      }
      updatedFormData.set("socialLinks", JSON.stringify(socialLinks));

      let result;
      if (latestData) {
        result = await updateInfo(latestData._id, updatedFormData);
        setSuccessMessage("Cricket club updated successfully");
      } else {
        result = await saveInfo(updatedFormData);
        setSuccessMessage("Cricket club saved successfully");
      }
      setLatestData(result.club);
      setFileData({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating cricket club:", error);
      setError(`Error updating cricket club: ${error.message}`);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const getImageUrl = (path) => {
    return path ? `https://bcc-82hu.onrender.com/${path.replace(/^\//, "")}` : "";
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-4xl">
      {latestData ? (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Current Club Information</h2>
          <div className="mb-4">
            <strong>Club Name:</strong> {latestData.clubName}
          </div>
          <div className="mb-4">
            <strong>Association Name:</strong> {latestData.associationName}
          </div>
          <div className="mb-4">
            <strong>Description:</strong> {latestData.description}
          </div>
          <div className="mb-4">
            <strong>Tagline:</strong> {latestData.tagline}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {latestData.email}
          </div>
          <div className="mb-4">
            <strong>Contact Number:</strong> {latestData.contactNumber}
          </div>
          <div className="mb-4">
            <strong>Social Links:</strong>
            <ul>
              <li>Facebook: {latestData.socialLinks?.facebook}</li>
              <li>Twitter: {latestData.socialLinks?.twitter}</li>
              <li>Instagram: {latestData.socialLinks?.instagram}</li>
              <li>Youtube: {latestData.socialLinks?.youtube}</li>
            </ul>
          </div>
          {latestData.teamImg && (
            <div className="mb-4">
              <strong>Team Image:</strong> <img src={getImageUrl(latestData.teamImg)} alt="Team" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
          {latestData.logo && (
            <div className="mb-4">
              <strong>Logo:</strong> <img src={getImageUrl(latestData.logo)} alt="Logo" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
          <button onClick={toggleEdit} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md">
            Edit Information
          </button>
        </div>
      ) : (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">No Club Information Available</h2>
        </div>
      )}

      {isEditing && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">{latestData ? "Edit Club Information" : "Add Club Information"}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="clubName">
                Club Name
              </label>
              <input
                type="text"
                name="clubName"
                value={formData.clubName || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="associationName">
                Association Name
              </label>
              <input
                type="text"
                name="associationName"
                value={formData.associationName || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="tagline">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Social Links</label>
              <div className="mb-2">
                <input
                  type="url"
                  name="facebook"
                  value={socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                  placeholder="Facebook"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <input
                  type="url"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  placeholder="Twitter"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <input
                  type="url"
                  name="instagram"
                  value={socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                  placeholder="Instagram"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-2">
                <input
                  type="url"
                  name="youtube"
                  value={socialLinks.youtube}
                  onChange={handleSocialLinkChange}
                  placeholder="YouTube"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="teamImg">
                Team Image
              </label>
              <input
                type="file"
                name="teamImg"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="logo">
                Logo
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md">
                {latestData ? "Update Information" : "Save Information"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateInformationForm;
