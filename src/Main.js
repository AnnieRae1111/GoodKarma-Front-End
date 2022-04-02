import AvailableItemsList from "./components/AvailableItemsList";
import LandingPage from "./components/LandingPage";

const Main = ({deleteItem, items, setItems}) => {
    return ( 
        <>
        <LandingPage/>
        <AvailableItemsList deleteItem={deleteItem} items={items} setItems={setItems}/>
        </>
     );
}
 
export default Main;