import React, {useEffect, useState} from 'react';
import StandardSelector from '../components/StandardSelector'
import ChartColumn from "../components/ChartColumn";

function KnowShowCreate(props) {
    const [postId, setPostId] = useState(null);

    const eventHandler = data => console.log(data)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('s')
    }


    const knowText = 'Know entries should be full sentences representing the information students should learn and retain through the course of learning this standard.'
    const showText = 'Show entries should be \'I can...\' statements indicating skills that students will develop through the course of learning this standard.'
    const scaffText = 'Scaffold entries should be knowledge and skills that students need to have mastered previously in order to succeed in learning this standard. This list is purely for planning and will not be incorporated into the assessment design workflow.'

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <StandardSelector />
                <table className={'center'}>
                    <tbody>
                        <tr>
                            <ChartColumn title={'Know'} popUpText={knowText} onChange={eventHandler}/>
                            <ChartColumn title={'Show'} popUpText={showText} onChange={eventHandler}/>
                            <ChartColumn title={'Scaffold'} popUpText={scaffText} onChange={eventHandler}/>
                        </tr>
                    </tbody>
                </table>
            <input type={'submit'} />
            </form>
        </div>
    );
}

export default KnowShowCreate;