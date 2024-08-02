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
        setSocialLinks(data.socialLinks ? JSON.parse(data.socialLinks) : {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
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
        [name]: files[0]
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({ ...prevLinks, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error messages
    setSuccessMessage(""); // Clear previous success messages

    try {
      const updatedFormData = new FormData(e.target);
      for (const [key, value] of Object.entries(fileData)) {
        updatedFormData.append(key, value);
      }
      console.log("Social Links before sending:", socialLinks);
      updatedFormData.set("socialLinks", JSON.stringify(socialLinks)); // Convert socialLinks object to JSON
  
      let result;
      if (latestData) {
        result = await updateInfo(latestData._id, updatedFormData);
        setSuccessMessage("Cricket club updated successfully");
      } else {
        result = await saveInfo(updatedFormData);
        setSuccessMessage("Cricket club saved successfully");
      }
      setLatestData(result.club);
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
        <div className="p-6 mb-6">
          <h2 className="text-3xl font-semibold mb-4">{latestData.clubName}</h2>
          <p className="text-lg mb-2">
            <strong>Association Name:</strong> {latestData.associationName}
          </p>
          <p className="text-lg mb-2">
            <strong>Description:</strong> {latestData.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Tagline:</strong> {latestData.tagline}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {latestData.email}
          </p>
          <p className="text-lg mb-2">
            <strong>Contact Number:</strong> {latestData.contactNumber}
          </p>
          {latestData.teamImg && (
            <div className="w-full h-auto mb-4">
              <p className="text-lg mb-2">
                <strong>Team Image:</strong>
              </p>
              <img
                src={getImageUrl(latestData.teamImg)}
                alt="Team"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
          {latestData.logo && (
            <div className="w-1/4 h-auto mb-4">
              <p className="text-lg mb-2">
                <strong>Team Logo Image:</strong>
              </p>
              <img
                src={getImageUrl(latestData.logo)}
                alt="Logo"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Social Links:</h3>
            <p><strong>Facebook:</strong> {socialLinks.facebook || "N/A"}</p>
            <p><strong>Twitter:</strong> {socialLinks.twitter || "N/A"}</p>
            <p><strong>Instagram:</strong> {socialLinks.instagram || "N/A"}</p>
            <p><strong>YouTube:</strong> {socialLinks.youtube || "N/A"}</p>
          </div>

          <button
            onClick={toggleEdit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Information
          </button>
        </div>
      ) : (
        <p className="text-center">No information available</p>
      )}

      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 rounded-lg shadow-lg p-6 mt-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-4">Update Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="clubName"
              defaultValue={latestData?.clubName || ""}
              onChange={handleInputChange}
              placeholder="Club Name"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="associationName"
              defaultValue={latestData?.associationName || ""}
              onChange={handleInputChange}
              placeholder="Association Name"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <textarea
              name="description"
              defaultValue={latestData?.description || ""}
              onChange={handleInputChange}
              placeholder="Description"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="tagline"
              defaultValue={latestData?.tagline || ""}
              onChange={handleInputChange}
              placeholder="Tagline"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="email"
              name="email"
              defaultValue={latestData?.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="contactNumber"
              defaultValue={latestData?.contactNumber || ""}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Team Image:
              </label>
              <input
                type="file"
                name="teamImg"
                onChange={handleFileChange}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Team Logo Image:
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Social Links:</h3>
            <input
              type="text"
              name="facebook"
              value={socialLinks.facebook}
              onChange={handleSocialLinkChange}
              placeholder="Facebook Link"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="twitter"
              value={socialLinks.twitter}
              onChange={handleSocialLinkChange}
              placeholder="Twitter Link"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="instagram"
              value={socialLinks.instagram}
              onChange={handleSocialLinkChange}
              placeholder="Instagram Link"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              name="youtube"
              value={socialLinks.youtube}
              onChange={handleSocialLinkChange}
              placeholder="YouTube Link"
              className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
          >
            {latestData ? "Update Information" : "Save Information"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateInformationForm;
