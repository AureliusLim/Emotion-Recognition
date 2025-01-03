import imageicon from "../resources/imageicon.png"
import React, { useRef, useState } from "react";
import refresh from "../resources/refresh.png";
import classes from "../resources/App.module.css"
import axios from 'axios';
const Imagecontainer = (props) =>{
    const fileInputRef = useRef(null);
    const [hasImage, setImage] = useState(null);
    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            console.log("Selected file:", file.name);

            // Send the file to the backend for prediction
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://localhost:4000/predict', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                props.onPrediction(response.data);
            } catch (error) {
                console.error('Error making prediction:', error);
            }
        }
    };
    const handleReset = () =>{
        setImage(null);
        props.onPrediction(null);
        console.log("clicked")
        fileInputRef.current.value = "";
    }
    return(
    <div className={classes.imageroot}>
        
        
        <p>{props.result}</p>
        {hasImage ?(
            <div className={classes.afterImage}>
                <div>
                    <img style={{width:'597px', height:'347px'}}src={hasImage}/>
                </div>
                <div style={{padding:"10px"}}>
                    <img style={{width:'48px', height:'48px'}}onClick={handleReset} src={refresh}/>
                    <p>Reset</p>
                </div>
            </div>
            
        ):
        <div onClick={handleClick} className={classes.beforeImage}>
            <img src={imageicon}></img>
            <p>Upload An Image</p>
        </div>
        
        }    

        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileUpload}
        />
        
        
    </div>
    );
}
export default Imagecontainer;