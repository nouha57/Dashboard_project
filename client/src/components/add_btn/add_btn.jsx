import React, {useState} from 'react'
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import './add_btn.css';


function AddButton() {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelected(true);
	};

    const clickHandler = (e) => {
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post("http://localhost:8080/api/excel/upload", data, { 
           // receive two    parameter endpoint url ,form data
        }).then(res => { 
        })
        setIsSelected(false);
        window.location.reload(false);
    }

           
    return (
        <div className='full_button'>
            
                <button type="button" className={isSelected? 'upload-btn selected' : 'upload-btn'} onClick={clickHandler}>
                    UPLOAD <span className='space'> </span><span>{isSelected? (' ' + selectedFile.name) : ''}</span>
                </button>
                <label className={isSelected? 'add-btn selected' : 'add-btn'} title="Add New File" htmlFor="input-file" >
                    <AddIcon/>
                </label>
                <input type="file" name="input-file" id="input-file" onChange={changeHandler}/>
        </div>
    )
} 

export default AddButton
