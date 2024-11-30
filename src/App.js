import { useState } from "react";
import "./App.css";
import { PackingList } from "./PackingList";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleClose(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }

  function handleToggledItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteAll() {
    const confirmed = window.confirm(
      "are you sure you want to delete all item ?"
    );

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form state={items} setter={setItems} />
      <PackingList
        items={items}
        close={handleClose}
        toggle={handleToggledItems}
        deleteAll={deleteAll}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> 🌴 Far away 👜 </h1>
    </div>
  );
}

function Form(props) {
  const [description, setDescription] = useState("");
  const [quantity, setOption] = useState(1);

  function handleAddItems(item) {
    props.setter((s) => [...s, item]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    // creation of a new object using the values coming from the state
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    // passing the object we created as an array item to be stored
    handleAddItems(newItem);

    console.log(newItem);
    setDescription("");
    setOption(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        //onChange , keep react in sync with changes
        // with the setter function , we capture the changes in the state variable
        onChange={(e) => setOption(Number(e.target.value))}>
        {/* creating an array of 20 undefiend values with from() , passsing to it two arguments , 
        the length of the array and a mapping function in the form of arrow function ,
        the mapping fuction adds 1 to the indexes and make it the values of it 
         */}
        {/* another mapping function to add the options of the select element ,
         the callback function take the returned value of the Array.from() method and make use of it as a unique value  */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}

export function Item({ item, close, toggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => close(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">start adding some items to your packing list !🚀</p>
    );
  }
  const numOfItems = items.length;
  const numOfPacked = items.filter((items) => items.packed).length;
  const percentage = Math.round((numOfPacked / numOfItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you gor everything ! ready to go ? ✈️"
          : `
            you have ${numOfItems} items on your list , and you are already packed ${numOfPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
