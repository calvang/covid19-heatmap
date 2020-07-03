// Adapted from a post on https://stackoverflow.com/questions/42036865/react-how-to-navigate-through-list-by-arrow-keys
// Original author @joshweir

import React, { useState, useEffect } from "react";

export const useKeyPress = function(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export const ListItem = ({ item, active, setSelected, setHovered }) => (
    <div
      className={`item ${active ? "active" : ""}`}
      onClick={() => setSelected(item)}
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(undefined)}
    >
      {item.Country}
    </div>
);

export const ListNav = props => {
    const [selected, setSelected] = useState(undefined);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);
    const { items } = props;
  
    useEffect(() => {
      if (items.length && downPress) {
        setCursor(prevState =>
          prevState < items.length - 1 ? prevState + 1 : prevState
        );
      }
    }, [downPress, items.length]);
    useEffect(() => {
      if (items.length && upPress) {
        setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
      }
    }, [upPress, items.length]);
    useEffect(() => {
      if (items.length && enterPress) {
        setSelected(items[cursor]);
      }
    }, [cursor, enterPress, items]);
    useEffect(() => {
      if (items.length && hovered) {
        setCursor(items.indexOf(hovered));
      }
    }, [hovered, items]);
  
    return (
      <div>
        {items.map((item, i) => (
          <ListItem
            key={item.id}
            active={i === cursor}
            item={item}
            setSelected={setSelected}
            setHovered={setHovered}
          />
        ))}
      </div>
    );
  };