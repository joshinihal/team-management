import classes from "./DropdownWithCheckbox.module.css";
import { useState, useEffect } from "react";

const DropdownWithCheckbox = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // use an obj to keep state about a particular option being checked
  const [selectedItemsObj, setSelectedItemsObj] = useState({});

  const showCheckboxes = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCheckboxClick = (item) => {
    setSelectedItems((prev) => {
      const currentSelectedItems = [...prev];
      let newItems = [];
      const itemInd = currentSelectedItems.findIndex((each) => each === item);
      if (itemInd === -1) {
        newItems = currentSelectedItems;
        newItems.push(item);
      } else {
        newItems = currentSelectedItems.filter((each) => each !== item);
      }
      return newItems;
    });
  };

  const ToggleCheckAll = () => {
    if (selectedItems.length === props.data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...props.data]);
    }
  };

  // everytime option gets selected, notify parent
  useEffect(() => {
    props.onOptionClick(selectedItems);
  }, [props, selectedItems]);

  useEffect(() => {
    const obj = {};
    selectedItems.forEach((each) => {
      obj[each] = true;
    });
    setSelectedItemsObj(obj);
  }, [selectedItems]);

  return (
    <form>
      <div className={classes.multiselect}>
        <div className={classes.selectBox} onClick={showCheckboxes}>
          <select className={classes.select}>
            <option>{props.label}</option>
          </select>
          <div className={classes.overSelect}></div>
        </div>
        {props.data.length ? (
          <div
            className={`${classes.checkboxes} ${
              isExpanded ? classes.displayBlock : classes.displayNone
            }`}
          >
            <label className={classes.selectOption}>
              <input
                checked={selectedItems.length === props.data.length}
                onChange={() => ToggleCheckAll()}
                type="checkbox"
              />
              {selectedItems.length === props.data.length
                ? "Uncheck All"
                : "Check All"}
            </label>

            {props.data.map((each) => {
              return (
                <label
                  key={each}
                  className={classes.selectOption}
                  htmlFor={`${each}-{checkbox}`}
                >
                  <input
                    checked={each in selectedItemsObj}
                    onChange={() => handleCheckboxClick(each)}
                    type="checkbox"
                    id={`${each}-{checkbox}`}
                  />
                  {each}
                  {selectedItemsObj[each]}
                </label>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default DropdownWithCheckbox;
