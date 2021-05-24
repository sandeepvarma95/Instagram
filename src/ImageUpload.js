import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage, db } from './firebase.js'
import firebase from "firebase";
import './ImageUpload.css'

function ImageUpload({ username }) {

    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if(e.target.files[0]) {                                             // this should always pick the first file as array index points to 0, if multiple files are selected.
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function till when the snapshot gets updated
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()                                                                   // once uploaded into db, get me a download link for the image
                .then(url => {
                    //post the image into the db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });

                    setProgress(0);                                                                // once done, set it back to normal initial phase
                    setCaption("");
                    setImage(null);

                });
            }
        )
    }

    return (
        <div className="imageUpload">
            
            {/* I want to have .... */}
            {/* Caption Input */}
            {/* File picker */}
            {/* Post button */}

            <progress className="imageUpload_progress" value={progress} max="100" /> 
            <input type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload
