import '../css/UploadItemForm.css';
import axios from 'axios';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const UploadItemForm = ({
photoUrl,
setPhotoUrl,
imageUrl,
setImageUrl,
itemCategory,
setItemCategory,
itemTitle,
setItemTitle,
itemDate,
setItemDate,
owner,
setOwner,
items,
setItems,
description,
setDescription,
images,
setImages,
file,
setFile,
}) => {
console.log(items);

let newItem = {
    category: itemCategory,
    title: itemTitle,
    date_posted: itemDate,
    owner: owner,
    description: description,
    images: images,
    url: imageUrl,
    photoUrl: photoUrl,
};

const addNewItem = async (event) => {
    const itemsUrl = 'https://desolate-reaches-56728.herokuapp.com/api/items';
    event.preventDefault();
    // console.log(newItem, "new Item")
    const allItems = [...items, newItem];
    console.log(allItems, 'all items');
    const result = await axios.post(itemsUrl, allItems).then(setItemTitle(''));
    setItemCategory('');
    setItemTitle('');
    setItemDate('');
    setOwner('');
    setDescription('');
    setPhotoUrl('');
    console.log(result.data, 'result.data');
    setItems([...items, newItem]);
    // setImages([...images, photoUrl])
    // console.log(allItems, "allItems")
    console.log(items, 'these are all of the items');
    console.log(photoUrl);

    // .then(getItems())
    console.log(items);
};

// POST IMAGE FUNCTIONS/////
// const displayImage = (event) => {
//     let file = event.target.files[0];
//     setFile(file);
//     console.log(file);
//     setImageUrl(URL.createObjectURL(file));
//     console.log(imageUrl);
// };

// const postImage = async ({
//     image,
//     description,
//     itemCategory,
//     itemTitle,
//     itemDate,
//     owner,
// }) => {
//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('description', description);
//     formData.append('category', itemCategory);
//     formData.append('date', itemDate);
//     formData.append('title', itemTitle);
//     formData.append('owner', owner);
//     try {
//     const result = await axios.post(
//         'https://desolate-reaches-56728.herokuapp.com/api/items',
//         formData,
//         {
//         headers: {
//             'Content-Type': 'multipart/formdata',
//         },
//         }
//     );
//     return result.data;
//     } catch (err) {
//     console.log(err);
//     }
// };

// const onSubmit = async (e) => {
//     e.preventDefault();
//     const result = await postImage({ image: file, description,itemCategory,itemDate, itemTitle, owner });
//     setImages([result, ...images]);
//     console.log(images, 'file upload images');
// };

return (
    <div className="upload-form-container">
    <h1 className="donate-your-stuff">Donate Your Stuff</h1>
    <h4 className="fill-out-form">
        {/* {' '} */}
        Fill out the form below to post your items
    </h4>
    <Form id="upload-form">
        <FormGroup>
        <Label for="categories">Category:</Label>
        <Input
            id="category"
            name="category"
            type="select"
            onChange={(event) => {
            setItemCategory(event.target.value);
            }}
        >
            <option>Clothing</option>
            <option>Books</option>
            <option>Furniture</option>
            <option>Household</option>
            <option>Other</option>
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
            onChange={(event) => {
            setItemTitle(event.target.value);
            }}
        />
        </FormGroup>
        <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
            id="exampleDate"
            name="date"
            placeholder="date placeholder"
            type="date"
            onChange={(event) => {
            setItemDate(event.target.value);
            }}
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
            onChange={(event) => {
            setOwner(event.target.value);
            }}
        />
        </FormGroup>
        <FormGroup>
        <Label id="description-label" for="description">
            Description:
        </Label>
        <Input
            id="description"
            name="description"
            placeholder="description"
            type="text"
            onChange={(event) => {
            setDescription(event.target.value);
            }}
        />
        </FormGroup>
        <FormGroup>
                    <Label for="exampleFile">
                    Photo URL
                    </Label>
                    <Input
                    id="exampleFile"
                    name="url"
                    type="text"
                    onChange = {(event)=>{setPhotoUrl(event.target.value)}}
                    />
                </FormGroup>
        {/* <FormGroup>
        <Label for="exampleFile">Image Upload</Label>
        <Input
            id="exampleFile"
            name="url"
            type="file"
            onChange={displayImage}
            accept="image/*"
        />
        </FormGroup> */}
        <div className="add-button-container">
        <Button onClick={addNewItem} type="submit" id="submit-button">
            Add New Item
        </Button>
        </div>
    </Form>
    {/* <img className="preview-image" src={imageUrl} alt=""/> */}
    </div>
);
};

export default UploadItemForm;
