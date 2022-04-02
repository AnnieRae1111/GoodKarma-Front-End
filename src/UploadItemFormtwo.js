import '../css/UploadItemForm.css'
import axios from "axios";
import { useState } from 'react'

import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button
} from 'reactstrap'

const UploadItemFormTwo = ({imageUrl, setImageUrl, itemCategory, setItemCategory, itemTitle, setItemTitle, itemDate, setItemDate, images, setImages, newItem, setNewItem, owner, setOwner,items, setItems, description, setDescription, file, setFile}) => {

        // const[imageUrl, setImageUrl] = useState()
        const displayImage = (event)=> {
            let file = event.target.files[0]
            setFile(file)
            console.log(file)
            setImageUrl(URL.createObjectURL(file))
            console.log(imageUrl)
        }


        //setting images state // probably don't need this  
        const uploadImage = async(event)=> {
            event.preventDefault()
            const data = new FormData()
            data.append('file', file)
            axios.post("http://localhost:8000/api/items", data, items, {
                headers: {
                "Content-Type": "multipart/form-data"
                }
                })
                .then((response) => {
                    console.log(response)
                    setImages([...images,file])
                    setFile("")
                })
                .catch((error) => {
                // error response
                });
         
        }


        const onFormSubmit = (event)=> {
            event.preventDefault()
        }

        //posting to database ad setting items state 
        const addNewItem = (event)=>  {
            event.preventDefault()
            setImages([...images, file])
            console.log(images, "this is the images array")
            setNewItem({
                category:itemCategory,
                title:itemTitle,
                date_posted: itemDate,
                description: description,
                owner: owner,
                url: imageUrl,
            })
            console.log(newItem,'this is the new item')
            setItems([...items, newItem])
            console.log(items, "thse are all the items")
        
        }
        

        const removeFile = (filename)=>{
            setImages(images.filter(file => file.name !== filename))
            // filtering the files that do not equal the file we want to remove 
        }



    return (  
            <div className="upload-form-container">
               
            <Form id="upload-form" onSubmit={onFormSubmit}>
                <FormGroup>
                    <Label for="categories">
                    Category:
                    </Label>
                    <Input
                    id="category"
                    name="category"
                    type="select"
                    onChange={(event)=>{setItemCategory(event.target.value)}}
                    >
                    <option>
                        Clothing
                    </option>
                    <option>
                        Books
                    </option>
                    <option>
                    Furniture
                    </option>
                    <option>
                        Household
                    </option>
                    <option>
                        Other
                    </option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label id="title-label" for="exampleEmail">
                    Title:
                    </Label>
                    <Input
                    id="title"
                    name="title"
                    placeholder="title"
                    type="text"
                    onChange={(event)=>{setItemTitle(event.target.value)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleDate">
                    Date
                    </Label>
                    <Input
                    id="exampleDate"
                    name="date"
                    placeholder="date placeholder"
                    type="date"
                    onChange={(event)=>{setItemDate(event.target.value)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label id="own-label" for="owner">
                    Owner:
                    </Label>
                    <Input
                    id="owner"
                    name="owner"
                    placeholder="owner"
                    type="text"
                    onChange={(event)=>{setOwner(event.target.value)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label id="description-label" for="description">
                    Description:
                    </Label>
                    <Input
                    id="description"
                    name="description"
                    placeholder="descriptionr"
                    type="text"
                    onChange={(event)=>{setDescription(event.target.value)}}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">
                    File
                    </Label>
                    <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={displayImage}
                    />
                    <FormText>
                    This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                    </FormText>
                </FormGroup>
                <Button type="submit" onClick={uploadImage} id="submit-button">
                    Upload Image
                </Button><br/>
                <Button type="submit" onClick={addNewItem} id="submit-button">
                    Add New Item
                </Button>
            </Form>
            <img className="preview-image" src={imageUrl} alt=""/>
            </div>
                );
            }
            
        export default UploadItemFormTwo