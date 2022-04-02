    import { useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';

    import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

    const EditPost = ({
    items,
    handleEdit,
    editCategory,
    setEditCategory,
    editTitle,
    setEditTitle,
    editPhotoUrl,
    setEditPhotoUrl,
    editDescription,
    setEditDescription,
    }) => {
    const { id } = useParams();
    const item = items.find((item) => item._id === id);
    console.log(item, 'this is the item');
    console.log(items, 'all items in edit post');

    useEffect(() => {
        if (item) {
        setEditCategory(item.title);
        setEditCategory(item.category);
        setEditTitle(item.title);
        setEditPhotoUrl(item.photoUrl);
        }
    }, [
        item,
        setEditCategory,
        setEditDescription,
        setEditTitle,
        setEditPhotoUrl,
    ]);

    return (
        <div className="upload-form-container">
        {editTitle && (
            <>
            <Form id="upload-form" onSubmit={(event) => event.preventDefault()}>
                <FormGroup>
                <Label for="categories">Category:</Label>
                <Input
                    id="category"
                    name="category"
                    type="select"
                    value={editCategory}
                    onChange={(event) => {
                    setEditCategory(event.target.value);
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
                    value={editTitle}
                    onChange={(event) => {
                    setEditTitle(event.target.value);
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
                    value={editDescription}
                    onChange={(event) => {
                    setEditDescription(event.target.value);
                    }}
                />
                </FormGroup>
                <FormGroup>
                <Label for="exampleFile">Photo URL</Label>
                <Input
                    id="exampleFile"
                    name="url"
                    type="text"
                    value={editPhotoUrl}
                    onChange={(event) => {
                    setEditPhotoUrl(event.target.value);
                    }}
                />
                </FormGroup>
                <Button
                type="submit"
                onClick={() => handleEdit(item._id)}
                id="submit-button"
                >
                Submit
                </Button>
            </Form>
            </>
        )}
        {!editTitle && (
            <>
            <h2> Oops, no post here</h2>
            <p>
                <Link to="/"> Go back to Homepage</Link>
            </p>
            </>
        )}
        </div>
    );
    };

    export default EditPost;
