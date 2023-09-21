const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const fetchToken = await fetch(`/api/accessToken`);
    const token = await fetchToken.text();
    //console.log(token)

    const res = await fetch(now_playing_endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 204 || res.status > 400) {
        return {body: { isPlaying: false }}
      }

      const data = await res.json();
      const isPlaying = data.is_playing;
      const trackType = data.currently_playing_type;
      const song = data.item;
      const episode = data.item;
      const title = song?.name;
      const artist = song?.artists.map((/** @type {{ name: any; }} */ _artist) => _artist.name).join(", ");
      const album = song?.album.name;
      const albumImageUrl = song?.album.images[0].url;
      const songUrl = song?.external_urls.spotify;

      if (!isPlaying || trackType === 'undefined') {
        return {body: { isPlaying: false }}
      }

      if (trackType === 'track') {
        return {body: { isPlaying, song, title, artist, album, albumImageUrl, songUrl }}
      }

      if (trackType === 'episode') {
        return {body: { isPlaying, episode }}
      }

      return {
        body: { isPlaying, trackType },
      }
  }
