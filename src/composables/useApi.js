import { ref } from 'vue'
import axios from 'axios'

const CONFIG = {
  APIS: {
    BATTLEMETRICS: 'https://api.battlemetrics.com/servers/34847101',
    DISCORD: 'https://ktor-server-u2py.onrender.com/discord',
    STEAM_USER: 'https://ktor-server-u2py.onrender.com/steam/userinfo',
    YOUTUBE: 'https://www.googleapis.com/youtube/v3/videos'
  },
  YOUTUBE: {
    API_KEY: 'AIzaSyDFfuhLMpLlB5JPUHKBV6bO3cV2BKOHdAw',
    VIDEO_IDS: ['06G8xVhAWqc', 'tydVrQDynZA', '1NtfUg6_mFI']
  },
  SERVER: {
    IP: 'rust.konura.ru:28015',
    CONNECT_PROTOCOL: 'steam://connect/203.16.163.232:28834'
  }
}

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const fetchWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios.get(url, { timeout: 10000 })
        return response.data
      } catch (err) {
        if (i === retries - 1) throw err
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    }
  }

  const getRustServerData = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchWithRetry(CONFIG.APIS.BATTLEMETRICS)
      return data
    } catch (err) {
      error.value = 'Ошибка получения данных сервера'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getDiscordData = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchWithRetry(CONFIG.APIS.DISCORD)
      return data
    } catch (err) {
      error.value = 'Ошибка получения данных Discord'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getSteamUserData = async (steamId) => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchWithRetry(`${CONFIG.APIS.STEAM_USER}/${steamId}`)
      return data
    } catch (err) {
      error.value = 'Ошибка получения данных Steam'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getYouTubeVideoData = async (videoId) => {
    try {
      const url = `${CONFIG.APIS.YOUTUBE}?part=snippet,statistics&id=${videoId}&key=${CONFIG.YOUTUBE.API_KEY}`
      const data = await fetchWithRetry(url)
      
      if (!data.items || data.items.length === 0) {
        throw new Error(`Видео ${videoId} не найдено`)
      }

      const item = data.items[0]
      return {
        thumbnail: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
        views: item.statistics.viewCount,
        comments: item.statistics.commentCount,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        videoId
      }
    } catch (err) {
      console.error('YouTube video error:', err)
      return null
    }
  }

  const getYouTubeVideos = async () => {
    const promises = CONFIG.YOUTUBE.VIDEO_IDS.map(id => getYouTubeVideoData(id))
    const results = await Promise.all(promises)
    return results.filter(video => video !== null)
  }

  return {
    loading,
    error,
    getRustServerData,
    getDiscordData,
    getSteamUserData,
    getYouTubeVideos,
    CONFIG
  }
}