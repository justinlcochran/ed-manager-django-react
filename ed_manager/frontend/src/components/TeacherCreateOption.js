import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

TeacherCreateOption.propTypes = {
    name: PropTypes.string.isRequired,
    img_source: PropTypes.string
};

function TeacherCreateOption({ name, img_source }) {
    return (
        <Link to={name} >
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 border border-gray-400 rounded-2xl shadow">
                <img src={img_source} className="h-50 w-50"/>
            </button>
        </Link>
    );
}

export default TeacherCreateOption;