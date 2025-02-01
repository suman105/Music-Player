import React, { useState } from "react";
import Song from "./Song";

const Playlist = ({ songs, onSelectSong, onCreatePlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    onCreatePlaylist(playlistName);
    setPlaylistName("");
  };

  return (
    <div className="playlist">
      <h3>Playlist</h3>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="New Playlist Name"
      />
      <button onClick={handleCreatePlaylist}>Create Playlist</button>
      <ul>
        {songs.map((song, index) => (
          <Song key={index} song={song} onSelectSong={onSelectSong} />
        ))}
      </ul>
    </div>
  );
};

export default Playlist;