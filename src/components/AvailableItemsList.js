import "../css/AvailableItems.css";
import AvailableItemsCard from "./AvailableItemsCard";
import { Row } from "reactstrap";
import { useState, useEffect } from "react";

const AvailableItemsList = ({deleteItem, items, setItems }) => {
console.log(items);

const [itemHistory, setItemHistory] = useState([]);

useEffect(() => {
    console.log(itemHistory, "item history in useEffect");
}, [itemHistory]);

const claimItem = (id) => {
    // let itemToClaim = items.filter((claimed)=> claimed._id === itemId)
    let itemToClaim = items.find((eachItem) => eachItem._id === id);
    console.log(itemToClaim, "item that has been claimed");

    // axios.post()
    // setClaimed(itemToClaim)
    setItemHistory((itemHistory) => [...itemHistory, itemToClaim]);
    // console.log(itemHistory, "item History array")

    let itemsNotClaimed = items.filter((item) => item._id !== id);
    console.log(itemsNotClaimed, "items not claimed");
    setItems(itemsNotClaimed);
    // console.log(availableItems, "remaining items")
};

return (
    <>
    <div className="available-items-container">
        <div className="item-history-container">
        <h2 className="currently-claimed-items"> Currently Claimed Items:</h2>
        {itemHistory.map((oneItem) => {
            return (
            <img
                className="item-history-images"
                src={oneItem.photoUrl}
                alt="history"
            />
            );
        })}
        </div>
        <h1> Available Items </h1>
        <Row xl="3" xs="1" s="1" m="2" l="3">
        {items.map((item) => {
            return (
            <AvailableItemsCard
                key={item._id}
                item={item}
                setItems={setItems}
                itemId={item._id}
                items={items}
                claimItem={claimItem}
                deleteItem={deleteItem}
            />
            );
        })}
        </Row>
    </div>
    </>
);
};

export default AvailableItemsList;
