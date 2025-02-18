import React, { useState } from 'react';

const countries = ["USA", "India", "Canada", "Australia", "Germany", "France", "Japan", "China", "Brazil", "South Africa"];

const ProfileCard = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    country: 'USA',
    phoneNumber: '+1 123-456-7890',
    email: 'johndoe@example.com',
    dob: '1990-01-01',
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#9DEAED] to-[#F5F5E9] p-4 rounded-t-lg text-gray-700">
        <h1 className="text-lg font-bold">Welcome, {profile.firstName}!</h1>
        <button
          onClick={handleEditToggle}
          className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {isEditable ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center p-6 space-x-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 bg-gray-300 rounded-lg mb-4 sm:mb-0"></div>

        {/* Profile Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold">{profile.firstName} {profile.lastName}</p>
              <p className="text-gray-600 text-sm">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
        {['firstName', 'lastName', 'gender', 'email'].map((field) => (
          <div key={field} className="flex items-center space-x-4">
            <label className="w-28 text-gray-700 font-medium capitalize">
              {field.replace(/([A-Z])/g, ' $1')}:
            </label>
            <input
              type="text"
              name={field}
              value={profile[field]}
              disabled={!isEditable}
              onChange={handleChange}
              className={`flex-grow p-1 border rounded-md text-sm ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        ))}

        {/* DOB */}
        <div className="flex items-center space-x-4">
          <label className="w-28 text-gray-700 font-medium">DOB:</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            disabled={!isEditable}
            onChange={handleChange}
            className={`flex-grow p-1 border rounded-md text-sm ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        {/* Country */}
        <div className="flex items-center space-x-4">
          <label className="w-28 text-gray-700 font-medium">Country:</label>
          {isEditable ? (
            <select
              name="country"
              value={profile.country}
              onChange={handleChange}
              className="flex-grow p-1 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={profile.country}
              disabled
              className="flex-grow p-1 border rounded-md text-sm bg-gray-100 focus:outline-none"
            />
          )}
        </div>

        {/* Phone Number */}
        <div className="flex items-center space-x-4">
          <label className="w-28 text-gray-700 font-medium">Phone:</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            disabled={!isEditable}
            onChange={handleChange}
            className={`flex-grow p-1 border rounded-md text-sm ${isEditable ? 'bg-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
