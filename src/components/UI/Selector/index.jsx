import React from "react";
import Select from "react-select";
import "./selector.scss";

const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
        <div className="custom-option" ref={innerRef} {...innerProps}>
            {data.label}{" "}
            {data.comming && (
                <span className="custom-option__comming-soon">coming soon</span>
            )}
        </div>
    );
};

const CustomSelector = ({ options, onSelect }) => {
    const CustomStyle = {
        dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)",
        }),
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.menuIsOpen ? "#rgb(40, 40, 40)" : "#DFDFDF",
            boxShadow: state.menuIsOpen ? "#rgb(40, 40, 40)" : "#DFDFDF",
            "&:hover": {
                borderColor: "#rgb(40, 40, 40)",
            },
            borderRadius: 10,
        }),
    };
    return (
        <div>
            <Select
                closeMenuOnSelect={true}
                components={{
                    Option: CustomOption,
                    IndicatorSeparator: () => null,
                }}
                onChange={onSelect}
                styles={CustomStyle}
                defaultValue={options[0]}
                options={options}
            />
        </div>
    );
};

export default CustomSelector;
