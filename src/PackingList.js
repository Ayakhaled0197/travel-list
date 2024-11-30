import { useState } from "react";
import { Item } from "./App";

export function PackingList({ items, close, toggle, deleteAll }) {
  const [sortBy, setSorting] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} close={close} toggle={toggle} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSorting(e.target.value)}>
          <option value="input"> sort input by order</option>
          <option value="description"> sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={deleteAll}>clear all</button>
      </div>
    </div>
  );
}
