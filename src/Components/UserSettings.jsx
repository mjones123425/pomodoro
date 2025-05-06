import React, { useState } from 'react';
import styles from './UserSettings.css'; 
import logo from './logo.png';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

const UserSettings = () => {
    // to hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    // to change password
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // to upload files
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // to pick which restriction you want
    const [activeList, setActiveList] = useState("list1");
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [newLink, setNewLink] = useState("");

    // feedback state
    const [feedbackText, setFeedbackText] = useState("");

    // sample user
    const user = {
        username: "userEmail",
        email: "user@example.com",
        password: "1234",
    };

    const handleResetClick = () => {
        setShowPopup(true);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
    };

    // done for reset password
    const handleDone = () => {
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        setError("");
        // add real password validation here
        console.log("Old Password:", oldPassword);
        console.log("New Password:", newPassword);

        setShowPopup(false);
    };

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    //delete account
    const handleDeleteConfirm = () => {
        console.log("Account deleted");
        setShowDeletePopup(false);
        // Redirect or cleanup can go here
    };

    // drop file to add
    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setUploadedFiles(files);
    };

    // drag part of the "drag and drop"
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileInput = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(files);
    };

    // check url
    const isValidUrl = (url) => {
        try {
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch (e) {
            return false;
        }
    };

    // Add item to List 1
    const handleAddToList1 = (e) => {
        const trimmed = newLink.trim();
        if (!trimmed) { // empty
            setError("Link cannot be empty.");
            return;
        }

        if (!isValidUrl(trimmed)) { //wrong format
            setError("Please enter a valid URL (must start with http or https).");
            return;
        }
        setList1([...list1, trimmed]);
        setNewLink("");
        setError("");
    };

    // Add item to List 2
    const handleAddToList2 = (e) => {
        const trimmed = newLink.trim();
        if (!trimmed) { // empty
            setError("Link cannot be empty.");
            return;
        }

        if (!isValidUrl(trimmed)) { //wrong format
            setError("Please enter a valid URL (must start with http or https).");
            return;
        }
        if (list1.includes(trimmed)) { //link already added
            setError("Link already added.");
            return;
        }
        setList2([...list2, trimmed]);
        setNewLink("");
        setError("");
    };

    // Remove item from List 1
    const handleRemoveFromList1 = (itemToRemove) => {
        setList1(list1.filter((item) => item !== itemToRemove));
    };

    // Remove item from List 2
    const handleRemoveFromList2 = (itemToRemove) => {
        setList2(list2.filter((item) => item !== itemToRemove));
    };

    const handleFeedbackSubmit = () => {
        console.log("Feedback submitted:", feedbackText);
        setFeedbackText(""); // Clear the text box
        // In a real application, you would send this feedback to a server
    };

    return (
        <div className={styles.mainContainer}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Signika:wght@600&display=swap');
                `}
            </style>
            <div className={styles.mainBox}>
                <Link to="/Home">
                    <button className={styles.homeButton}>Go to Home Page</button>
                </Link>
                <h1>User Settings</h1>
                <img src={logo} alt="Logo" className={styles.logo} />

                <form className={styles.hidden1}>
                    {/* account */}
                    <div className={styles.account}>
                        <h3>My Account</h3>
                        <label>Username:</label>
                        <input type="text" value={user.username} readOnly />
                        <br></br>

                        <label>Email:</label>
                        <input type="email" value={user.email} readOnly />

                        <br></br>
                        <label>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            readOnly
                        />
                        <button type="button" className={styles.show} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className={styles.buttons}>
                        <button type="button" onClick={handleResetClick}>Reset Password</button>
                        <button type="button" onClick={handleDeleteClick}>Delete Account</button>
                    </div>
                </form>

                {/* reset password popup */}
                {showPopup && (
                    <div className={styles.resetBox}

                    >
                        <h3>Reset Password</h3>

                        <label>Old Password:</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <br></br>

                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <br></br>

                        <label>Confirm New Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <br></br><br></br>
                        <button onClick={handleDone}>Done</button>
                    </div>
                )}

                {/* delete account popup */}
                {showDeletePopup && (
                    <div className={styles.deleteBox}

                    >
                        <h3>Are you sure you want to delete your account?</h3>
                        <p>This action cannot be undone.</p>
                        <br></br>
                        <button onClick={handleDeleteConfirm}>Yes, Delete</button>
                        <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
                    </div>
                )}


                {/* pick which restriction */}
                <div className={styles.hidden2}>
                    <h3>Limit Web Access</h3>
                    <div className={styles.limitSites}>
                        <label className={styles.l1}

                            onClick={() => setActiveList("list1")}
                        >
                            Lock Sites
                        </label>

                        <label className={styles.l2}
                            onClick={() => setActiveList("list2")}
                        >
                            Unlock Sites
                        </label>
                    </div>

                    <div>
                        {/* lock sites is clicked */}
                        {activeList === "list1" && (
                            <div style={{ backgroundColor: 'rgb(252, 227, 204)', padding: "2rem" }}>
                                <h3> Lock these sites during the duration of a cycle:</h3>
                                <div style={{ gap: "8px", marginTop: "5px" }}>
                                    <label>Add Site:</label>
                                    <input
                                        type="text"
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    <button onClick={handleAddToList1}>+</button>
                                </div>

                                {error && <p style={{ color: "red", marginTop: "4px" }}>{error}</p>}

                                {list1.length > 0 && (
                                    <ul style={{ marginTop: "10px" }}>
                                        {list1.map((link, index) => (
                                            <li key={index} style={{ alignItems: "center", gap: "8px" }}>
                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                    {link}
                                                </a>
                                                <button onClick={() => handleRemoveFromList1(link)}>x</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* unlock sites is clicked */}
                        {activeList === "list2" && (
                            <div style={{ backgroundColor: 'rgb(215, 248, 206)', padding: "2rem" }}>
                                <h3>Limit access to ONLY these sites during a cycle:</h3>
                                <div style={{ gap: "8px", marginTop: "5px" }}>
                                    <label>Add Site:</label>
                                    <input
                                        type="text"
                                        value={newLink}
                                        onChange={(e) => setNewLink(e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    <button onClick={handleAddToList2}>+</button>
                                </div>

                                {error && <p style={{ color: "red", marginTop: "4px" }}>{error}</p>}

                                {list2.length > 0 && (
                                    <ul style={{ marginTop: "10px" }}>
                                        {list2.map((link, index) => (
                                            <li key={index} style={{ alignItems: "center", gap: "8px" }}>
                                                <a href={link} target="_blank" rel="noopener noreferrer">
                                                    {link}
                                                </a>
                                                <button onClick={() => handleRemoveFromList2(link)}>x</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <br></br>
                        <div className={styles.toDo}>
                        </div>
                    </div>
                </div>

                {/* drag and drop files */}
                <div className={styles.hidden3}>
                    <h3>Add files for your break time:</h3>
                    <div className={styles.fileInput}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        <p>Drag and drop files, or click to select</p>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={handleFileInput}
                        />
                    </div>

                    {uploadedFiles.length > 0 && (
                        <div>
                            <h4>Selected Files:</h4>
                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <br></br>
                </div>
                {/* Feedback Section */}
                <div className={styles.feedbackSection}>
                    <label>Have feedback? We appreciate all suggestions!</label>
                    <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Enter your feedback here..."
                    />
                    <button onClick={handleFeedbackSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};
export default UserSettings;
