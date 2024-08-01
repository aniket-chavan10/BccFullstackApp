import React from "react";
import Navbar from "../components/Navbar";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 p-8 bg-white rounded-lg shadow-md border border-gray-300 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Privacy Policy
        </h1>
        <div className="text-lg text-gray-700">
          <p className="mb-4">
            At Bhairavnath Cricket Club Kuraloshi, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This privacy policy outlines how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Information Collection
          </h2>
          <p className="mb-4">
            We may collect personal information from you when you visit our website, register for events, or interact with us in any other way. This information may include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Your name</li>
            <li>Contact details (email address, phone number, etc.)</li>
            <li>Demographic information</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Use of Information
          </h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Provide you with information about our club, upcoming events, and other activities</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website, services, and communication efforts</li>
            <li>Send periodic emails about club news, updates, and related information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Information Sharing
          </h2>
          <p className="mb-4">
            We do not sell, trade, or otherwise transfer your personal information to outside parties. However, we may share your information with trusted third parties who assist us in operating our website, conducting our business, or providing services to you, as long as those parties agree to keep this information confidential.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Security
          </h2>
          <p className="mb-4">
            We implement a variety of security measures to maintain the safety of your personal information. Your information is stored on secure servers and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Your Consent
          </h2>
          <p className="mb-4">
            By using our site, you consent to our privacy policy. If we decide to change our privacy policy, we will post those changes on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
            Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions regarding this privacy policy, you may contact us using the information below:
          </p>
          <p className="mb-4">
            Bhairavnath Cricket Club Kuraloshi
            <br />
            Jaoli Association
            <br />
            Maharashtra, India
            <br />
            Email: contact@bcckuraloshi.com
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
