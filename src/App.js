import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
    return (
        <div className='video-player'>
            <ReactPlayer url={url} controls />
        </div>
    );
};

export default VideoPlayer;