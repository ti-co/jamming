import React from 'react'
import './App.css';
import SearchBar from '../SearchBar/SearchBar'; 
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: 'Save playlist as....'
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then( searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack (newTrack) {
    let list = this.state.playlistTracks;
    if (list.find(savedTrack => savedTrack.id === newTrack.id)) {
      return;
    }
    list.push(newTrack); 
    this.setState(
      {playlistTracks: list}
      );  
  }

  removeTrack(track) {
    let list = this.state.playlistTracks; 
    list = list.filter( currentTrack => currentTrack.id !== track.id )
    this.setState(
      {playlistTracks: list}
      );
  }

  updatePlaylistName (name) {
    this.setState({playlistName: name});
  }

  
  savePlaylist() {
        const trackUris = this.state.playlistTracks.map(track => track.uri);
        const listName = this.state.playlistName;
        Spotify.savePlaylist(listName, trackUris).then(() => {
          this.setState({
            playlistName: 'Save playlist as...',
            playlistTracks: []
          });
        });
      }

  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar onSearch={this.search} />
              <div className="App-playlist">
              <SearchResults 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack} />
              <Playlist 
                playlistTracks={this.state.playlistTracks} 
                playlistName={this.state.playlistName} 
                onRemove={this.removeTrack} 
                onNameChange={this.updatePlaylistName} 
                onSave={this.savePlaylist} />
              </div>
          </div>
      </div>
    );
  }  
}
export default App;






