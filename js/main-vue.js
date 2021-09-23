const App = {
  // Data model
  data() {
    return {
      API: "https://api.lyrics.ovh",
      searchTerm: "",
      songs: [],
      song: {},
      searching: true,
    };
  },
  // Utility methods
  methods: {
    async searchSongs() {
      try {
        this.searching = true
        const request = await fetch(`${this.API}/suggest/${this.searchTerm}`)
        // Get songs
        const songs = await request.json()
        this.songs = songs.data
      } catch (error) {
        console.log(error.message);
      }
    },

    async getSong(artist, title) {
      try {
        const request = await fetch(`${this.API}/v1/${artist}/${title}`)
        const response = await request.json()
        const lyric = response.lyrics
        this.showSong(artist, title, lyric)
        this.searching = false
      } catch (error) {
        console.log(error.message);
      }
    },

    showSong(artist, title, lyric) {
      this.song.artist = artist
      this.song.title = title
      this.song.lyric = lyric.replace(/\r\n|\n|\r/g, "<br />")

    }
  },
}

Vue.createApp(App).mount(".main")