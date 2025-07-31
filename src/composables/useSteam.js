import { ref, onMounted } from 'vue'
import { useApi } from './useApi'

export function useSteam() {
  const { getSteamUserData } = useApi()
  
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  const getSteamIdFromURL = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('steamId')
  }

  const getCorrectPath = () => {
    const currentPath = window.location.pathname
    
    if (currentPath.includes('/konura-rust-site/')) {
      return '/konura-rust-site/'
    }
    
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        !window.location.hostname.includes('github.io')) {
      return '/'
    }
    
    return '/konura-rust-site/'
  }

  const login = () => {
    window.location.href = 'https://ktor-server-u2py.onrender.com/steam/login'
  }

  const logout = () => {
    localStorage.removeItem('steamId')
    user.value = null
    isAuthenticated.value = false
  }

  const fetchUserData = async (steamId) => {
    loading.value = true
    try {
      const userData = await getSteamUserData(steamId)
      
      let processedData = userData
      
      if (userData.response && userData.response.players && userData.response.players.length > 0) {
        processedData = userData.response.players[0]
      } else if (userData.data) {
        processedData = userData.data
      } else if (userData.player) {
        processedData = userData.player
      }
      
      const possibleNameFields = ['personaname', 'displayname', 'name', 'username', 'nickname']
      const possibleAvatarFields = ['avatarfull', 'avatarmedium', 'avatar', 'avatar_url', 'avatarUrl']
      const possibleProfileFields = ['profileurl', 'profile_url', 'profileUrl', 'url']

      let userName = null
      let userAvatar = null
      let userProfile = null

      for (const field of possibleNameFields) {
        if (processedData[field]) {
          userName = processedData[field]
          break
        }
      }

      for (const field of possibleAvatarFields) {
        if (processedData[field]) {
          userAvatar = processedData[field]
          break
        }
      }

      for (const field of possibleProfileFields) {
        if (processedData[field]) {
          userProfile = processedData[field]
          break
        }
      }

      if (userName) {
        user.value = {
          name: userName,
          avatar: userAvatar,
          profile: userProfile
        }
        isAuthenticated.value = true
      }
      document.cookie = `steamName=${encodeURIComponent(userName)}; path=/; max-age=2592000`
      document.cookie = `steamAvatar=${encodeURIComponent(userAvatar)}; path=/; max-age=2592000`

      
    } catch (error) {
      console.error('Steam user data error:', error)
      logout()
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    const steamId = getSteamIdFromURL()
    
    if (steamId) {
      localStorage.setItem('steamId', steamId)
      const correctPath = getCorrectPath()
      history.replaceState({}, document.title, correctPath)
      await fetchUserData(steamId)
    } else {
      const savedSteamId = localStorage.getItem('steamId')
      if (savedSteamId) {
        await fetchUserData(savedSteamId)
      }
    }
  })

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }
}