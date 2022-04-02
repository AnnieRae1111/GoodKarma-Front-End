import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/authentication/RequireAuth';
import UploadItemForm from './components/UploadItemForm';
import axios from 'axios';
import EditPost from './components/EditPost';
import About from './components/About';
import SignUp from './components/authentication/Signup';
import Main from './Main';
import SignIn from './components/authentication/SignIn';
import Layout from './components/Layout';

function App() {
  const [imageUrl, setImageUrl] = useState();
  const [itemCategory, setItemCategory] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDate, setItemDate] = useState();
  const[images, setImages]=useState([])
  const[file, setFile]=useState([])
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('');

  const [editCategory, setEditCategory] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');

  const BASE_URL = 'https://desolate-reaches-56728.herokuapp.com/api/items';
  const getItems = () => {
    axios.get(BASE_URL).then((res) => {
      setItems(res.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    console.log('updated items');
  }, [items]);

  useEffect(() => {
    console.log('updated  edit title');
  }, [editTitle]);

  console.log(items, 'all items');

  const handleEdit = async (id) => {
    const editedItem = {
      itemCategory: editCategory,
      itemTitle: editTitle,
      photoUrl: editPhotoUrl,
      description: editDescription,
    };
    try {
      const response = await axios.put(
        `https://desolate-reaches-56728.herokuapp.com/api/items/${id}`,
        editedItem
      );
      console.log(response, 'put response');
      setItems(
        items.map((item) => (item._id === id ? { ...response.data } : item))
      );
      setEditTitle('');
      setEditDescription('');
      //then go back to home page
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    const deleteUrl = `https://desolate-reaches-56728.herokuapp.com/api/items/${id}`;
    try {
      await axios.delete(deleteUrl);
      const itemsList = items.filter((post) => post._id !== id);
      setItems(itemsList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUBLIC ROUTES */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/unathorized" element={<Unathorized/>}/> */}

          {/* PRIVATE ROUTES */}
          <Route element={<RequireAuth />}>
            {/* protecting other routes by nesting them in this route with RequireAuth */}
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <Main
                  deleteItem={deleteItem}
                  items={items}
                  setItems={setItems}
                />
              }
            />
            <Route
              path="/donate"
              element={
                <UploadItemForm
                  getItems={getItems}
                  photoUrl={photoUrl}
                  setPhotoUrl={setPhotoUrl}
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  itemCategory={itemCategory}
                  setItemCategory={setItemCategory}
                  itemTitle={itemTitle}
                  setItemTitle={setItemTitle}
                  itemDate={itemDate}
                  setItemDate={setItemDate}
                  owner={owner}
                  setOwner={setOwner}
                  items={items}
                  setItems={setItems}
                  description={description}
                  setDescription={setDescription}
                  file={file}
                  setFile={setFile}
                  images={images}
                  setImage={setImages}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <EditPost
                  items={items}
                  handleEdit={handleEdit}
                  editCategory={editCategory}
                  setEditCategory={setEditCategory}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  editDescription={editDescription}
                  setEditDescription={setEditDescription}
                  editPhotoUrl={editPhotoUrl}
                  setEditPhotoUrl={setEditPhotoUrl}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
