import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialVideos = [
  { id: '1', title: 'Video-1', src: 'https://www.youtube.com/watch?v=BIn43acAk58' },
  { id: '2', title: 'Video-2', src: 'https://www.youtube.com/watch?v=N1s-GN1SWqY' },
  { id: '3', title: 'Video-3', src: 'https://www.youtube.com/watch?v=LsUdoy7EH7M&list=RDLsUdoy7EH7M&start_radio=1&rv=N1s-GN1SWqY' }
];

const Playlist = () => {
    const [videos, setVideos] = useState(initialVideos);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
    // Function to play next video
    const playNextVideo = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };
  
    // Function to handle video selection from playlist
    const selectVideo = (index) => setCurrentVideoIndex(index);
  
    // Function to handle drag end
    const onDragEnd = (result) => {
      if (!result.destination) return;
  
      const items = Array.from(videos);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      setVideos(items);
    };
  

    return (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 lg:w-3/4">
            <VideoPlayer
              src={videos[currentVideoIndex]?.src}
              onEnded={playNextVideo}
            />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 md:pl-4 mt-4 md:mt-0">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="playlist">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="playlist bg-gray-800 p-4 rounded-lg">
                    {videos.map((video, index) => (
                      <Draggable key={video.id} draggableId={video.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => selectVideo(index)}
                            className={`p-2 mb-2 cursor-pointer rounded-md ${currentVideoIndex === index ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}
                          >
                            {video.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      );
    };
    
    export default Playlist;
