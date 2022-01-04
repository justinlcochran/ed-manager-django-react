import React from 'react';

function AssessmentQuestion({assessmentKnowShow,}) {

    return (
        <div>
            <div className="know-show-display">
                <div className="know-list">
                {/*    <ul style="list-style: none">*/}
                {/*        {% for know in knowRemaining %}*/}
                {/*        <li><input type="checkbox" className="checkboxes" form="assessmentBuilder" id="{{ know }}"*/}
                {/*                   name="{{ know }}">{{know}}</li>*/}
                {/*        {% endfor %}*/}
                {/*        {% for know in knowSatisfied %}*/}
                {/*        <li><strike>{{know}}</strike></li>*/}
                {/*        {% endfor %}*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<div className="show-list">*/}
                {/*    <ul style="list-style: none">*/}
                {/*        {% for show in showRemaining %}*/}
                {/*        <li><input type="checkbox" form="assessmentBuilder" id="{{ show }}" name="{{ show }}">{{show}}</li>*/}
                {/*        {% endfor %}*/}
                {/*        {% for show in showSatisfied %}*/}
                {/*        <li><strike>{{show}}</strike></li>*/}
                {/*        {% endfor %}*/}
                {/*    </ul>*/}
                </div>
            </div>
        </div>
    );
}

export default AssessmentQuestion;
