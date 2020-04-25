import React, { Component } from 'react'

const SelectDropdown = ({options, handleFilter, filterName}) => {
    return (
        <select class="form-control" onChange={e => handleFilter(e.target, filterName)}>
            {options.map(option =>
                <option>{option}</option>
            )}
        </select>
    )
}

export default SelectDropdown
