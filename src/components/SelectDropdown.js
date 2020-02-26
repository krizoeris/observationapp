import React, { Component } from 'react'

const SelectDropdown = ({options}) => {
    return (
        <select class="form-control">
            {options.map(option =>
                <option>{option}</option>
            )}
        </select>
    )
}

export default SelectDropdown
