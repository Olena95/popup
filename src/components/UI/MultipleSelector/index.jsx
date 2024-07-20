import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import "./multiple-selector.scss";

const CustomMultiSelector = ({ placeholder, onSelect }) => {
    const [name, setName] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [addedNames, setAddedNames] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const handleChangeText = (text) => {
        setName(text);

        if (text.length > 3) {
            setIsDisabled(false);
            setErrorMessage("");
        } else if (text.length === 0) {
            setErrorMessage("");
        } else {
            setIsDisabled(true);
            setErrorMessage("Name must be greater than 3 characters");
        }
    };
    const handleAddName = () => {
        setAddedNames([...addedNames, { name: name, pmq: "true" }]);
        onSelect([...addedNames, { name: name, pmq: "true" }]);
        setName("");
    };
    const deleteName = (addedName) => {
        const newArray = addedNames.filter((name) => name.name !== addedName);
        setAddedNames(newArray);
        onSelect(newArray);
    };
    return (
        <div className="custom-multi-selector-wrapper">
            <div className="custom-multi-selector">
                <Input
                    onChange={(e) => handleChangeText(e.target.value)}
                    className={`custom-input ${errorMessage ? "error" : ""}`}
                    value={name}
                    placeholder={placeholder}
                />

                <Button
                    style={{
                        backgroundColor: isDisabled ? "#a8a8a8" : "#000000",
                        color: "#ffffff",
                    }}
                    type="primary"
                    onClick={handleAddName}
                    disabled={isDisabled}
                >
                    Add
                </Button>
            </div>
            {errorMessage && (
                <div className="custom-input__error-message">
                    {errorMessage}
                </div>
            )}
            <div className="custom-multi-items">
                {addedNames.map((name, i) => (
                    <div
                        className="custom-multi-items__item"
                        key={i + Math.random()}
                    >
                        {name.name}{" "}
                        <CloseOutlined
                            style={{
                                color: "#000000",
                                fontSize: 12,
                            }}
                            onClick={() => deleteName(name.name)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomMultiSelector;
