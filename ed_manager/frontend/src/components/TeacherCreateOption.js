import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

TeacherCreateOption.propTypes = {
    name: PropTypes.string.isRequired,
    img_source: PropTypes.string
};

function TeacherCreateOption({ name, img_source }) {
    const style = {
        backgroundImage: `url(${img_source})`,
    }
    return (
            <td>
                    <Link to={ name }>
                        <button className={'button-label'} style={style}>
                        </button>
                    </Link>
            </td>

    );
}

export default TeacherCreateOption;