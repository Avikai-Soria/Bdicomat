import React from "react";

function UserDisplay({ user }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Using minHeight instead of height
  };

  const userDetailsStyle = {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "transparent",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left", // Aligning the text to the left
  };

  const textStyle = {
    fontSize: "18px", // Increase the font size
    margin: "8px 0", // Add some margin between each paragraph
  };

  return (
    <div style={containerStyle}>
      <div style={userDetailsStyle}>
        <h2>User Details</h2>
        <p style={textStyle}>ID: {user.id}</p>
        <p style={textStyle}>Name: {user.name}</p>
        <p style={textStyle}>Username: {user.username}</p>
        <p style={textStyle}>Email: {user.email}</p>
        <p style={textStyle}>Address: {user.address}</p>
        <p style={textStyle}>Role: {user.userRole}</p>
      </div>
    </div>
  );
}

export default UserDisplay;
