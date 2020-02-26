import React, { Component } from 'react'

const ActionButtonOption = (prop) => {
    return (
        <div class="dropdown mr-2">
            <button class="btn btn-light rounded-circle btn-sm shadow-sm" type="button" id="moreButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-v pr-1 pl-1"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                {prop.children}
            </div>
        </div>
    )
}

export default ActionButtonOption
