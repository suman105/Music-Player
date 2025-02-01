import React, { useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import "./styles.css";

const App = () => {
  const [songs, setSongs] = useState([
    {
      title: "Almost Padipoyindhe Pilla",
      artist: "Artist 1",
      src: "/songs/Almost Padipoyindhe Pilla.mp3",
      albumArt: "https://via.placeholder.com/200",
    },
    {
      title: "Gaaju Bomma",
      artist: "Artist 2",
      src: "/songs/Gaaju Bomma.mp3",
      albumArt: "https://via.placeholder.com/200",
    },
    {
      title: "Hello Chittamma",
      artist: "Artist 3",
      src: "/songs/Hello Chittamma.mp3",
      albumArt: "https://via.placeholder.com/200",
    },
  ]);

  const [currentSong, setCurrentSong] = useState(songs[0]); // Start with the first song
  const [volume, setVolume] = useState(1); // Volume level (0 to 1)

  const handleUploadSong = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newSong = {
        title: file.name,
        artist: "Unknown",
        src: URL.createObjectURL(file),
        albumArt: "https://via.placeholder.com/200", // Default album art
      };
      setSongs([...songs, newSong]); // Add the new song to the playlist
      setCurrentSong(newSong); // Automatically play the uploaded song
    }
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song === currentSong);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song === currentSong);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[previousIndex]);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="app">
      <h1>Music Player</h1>
      <MusicPlayer
        currentSong={currentSong}
        onNext={handleNext}
        onPrevious={handlePrevious}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      <div className="song-list">
        <h3>Available Songs</h3>
        <ul>
          {songs.map((song, index) => (
            <li
              key={index}
              className={song === currentSong ? "active" : ""}
              onClick={() => handleSelectSong(song)}
            >
              {song.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="upload-section">
        <label htmlFor="upload-song">Upload Song</label>
        <input
          id="upload-song"
          type="file"
          accept="audio/*"
          onChange={handleUploadSong}
        />
      </div>
    </div>
  );
};

export default App;