    import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

    import '../css/UploadFile.css';

    import { useEffect, useState } from 'react';

    const UploadFile = ({ images, setImages }) => {
    const [imageUrls, setImageUrls] = useState([]);

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    const handleImageChange = (event) => {
        setImages([...event.target.files]);
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImages = [];
        images.forEach((image) => newImages.push(URL.createObjectURL(image)));
        setImageUrls(newImages);
    }, [images]);

    return (
        <div>
        <div className="upload-form-container">
            <Form id="upload-form" onSubmit={onFormSubmit}>
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input
                id="exampleFile"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
            </FormGroup>
            <Button type="submit" id="submit-button">
                Upload Image
            </Button>
            <br />
            <Button type="submit" id="submit-button">
                Add New Item
            </Button>
            </Form>
            {imageUrls.map((imageSource) => (
            <img className="image-uploaded" src={imageSource} alt="lol" />
            ))}
        </div>
        </div>
    );
    };

    export default UploadFile;
