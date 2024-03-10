import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = ({ src, onEnded, onProgress }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Toggle play/pause
  const handlePlayPause = () => setPlaying(!playing);

  // Seek to a specific time in the video
  const handleSeek = (e) => {
    playerRef.current.seekTo(parseFloat(e.target.value), 'seconds');
  };

  return (
    <div className="relative">
      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        playing={playing}
        controls={true} // Consider setting to false if you plan to fully customize controls
        playbackRate={playbackRate}
        onEnded={onEnded}
        onProgress={onProgress}
        className="react-player"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 bg-gray-900 p-4 flex items-center justify-between">
        <button 
          onClick={handlePlayPause} 
          className="text-white px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
          {playing ? 'Pause' : 'Play'}
        </button>
        <input 
          type="range" min={0} max={1} step="any" onChange={handleSeek} 
          className="w-full mx-4"
        />
        <div className="flex">
          {[0.5, 1, 1.5, 2].map(rate => (
            <button 
              key={rate}
              onClick={() => setPlaybackRate(rate)} 
              className={`text-white px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded mx-1 ${playbackRate === rate ? 'bg-blue-500' : ''}`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
