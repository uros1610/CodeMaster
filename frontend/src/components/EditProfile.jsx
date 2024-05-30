import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import styles from '../styles/editprofile.css';
import axios from 'axios';

const EditProfile = () => {
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState(user.userPicture || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');
    const [username, setUsername] = useState(user.username);

    const editProfile = async () => {
        try {
            const data = new FormData();

            data.append("file",file);
            await axios.post(`/backend/upload`,data);
            const pict = file.name ? file.name : file
            await axios.put(`/backend/user/updateUser/${user.username}`, {picture: pict,username:username})

            const obj = {...user}

            console.log(user);

            obj.username = username;
            
            localStorage.setItem('user',JSON.stringify(obj))
            alert("Profile edited successfully!");
        } catch (err) {
            console.error('Error editing profile:', err);
            alert("Profile edit unsuccessful!");
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            setFile(selectedFile);
        }
        console.log(selectedFile);
    };

    return (
        <div className = "wrapDiv">
        <div className="divEditProfile">
            <div className="changeUsernameDiv">
                <p>Change username:</p>
                <input className="changeUsername" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="changePicture">
                <img className="profileImg" src={typeof file === 'string' ? file : URL.createObjectURL(file)} />
                <p>Change picture:</p>
                <input type="file" onChange={handleFileChange} />
            </div>

            <button className="editProfile" onClick={editProfile}>Edit</button>
        </div>
        </div>
    );
};

export default EditProfile;
