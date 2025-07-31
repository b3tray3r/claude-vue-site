import { ref, onMounted, onUnmounted } from 'vue'
import { useApi } from './useApi'

export function useStats() {
  const { getRustServerData, getDiscordData } = useApi()
  
  const rustStats = ref({
    players: 0,
    maxPlayers: 0,
    status: 'offline',
    fillPercentage: 0,
    lastWipe: null,
    mapData: null
  })
  
  const discordStats = ref({
    totalMembers: 0,
    onlineMembers: 0
  })
  
  const wipeTime = ref('')
  const loading = ref(false)
  
  let updateInterval = null
  let wipeTimeInterval = null

  const formatTimeSinceWipe = (diffMs) => {
    const seconds = Math.floor((diffMs / 1000) % 60)
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60)
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    let timeString = ''
    if (days > 0) {
      timeString += `${days}д `
    }
    timeString += `${hours}ч ${minutes}м ${seconds}с`

    return timeString
  }

  const updateWipeTime = () => {
    if (!rustStats.value.lastWipe) return
    
    const now = new Date()
    const diffMs = now - rustStats.value.lastWipe
    wipeTime.value = formatTimeSinceWipe(diffMs)
  }

  const updateStats = async () => {
    loading.value = true
    
    try {
      const [rustData, discordData] = await Promise.allSettled([
        getRustServerData(),
        getDiscordData()
      ])

      // Обработка данных Rust сервера
      if (rustData.status === 'fulfilled') {
        const attributes = rustData.value.data.attributes
        const players = attributes.players
        const maxPlayers = attributes.maxPlayers
        
        rustStats.value = {
          players,
          maxPlayers,
          status: attributes.status,
          fillPercentage: Math.round((players / maxPlayers) * 100),
          lastWipe: attributes.details.rust_last_wipe ? new Date(attributes.details.rust_last_wipe) : null,
          mapData: {
            name: attributes.details.map || 'Неизвестна',
            size: attributes.details.rust_maps?.size || 0,
            monuments: Object.keys(attributes.details.rust_maps?.monumentCounts || {}).length,
            thumbnail: attributes.details.rust_maps?.thumbnailUrl,
            url: attributes.details.rust_maps?.url
          }
        }
        
        updateWipeTime()
      }

      // Обработка данных Discord
      if (discordData.status === 'fulfilled') {
        discordStats.value = {
          totalMembers: discordData.value.approximate_member_count || 0,
          onlineMembers: discordData.value.approximate_presence_count || 0
        }
      }

    } catch (error) {
      console.error('Stats update error:', error)
    } finally {
      loading.value = false
    }
  }

  const connectToServer = () => {
    const message = `IP сервера: rust.konura.ru:28015\n\nСкопируйте адрес в консоль F1 в Rust:\nclient.connect rust.konura.ru:28015`
    alert(message)
  }

  const joinDiscord = () => {
    window.open('https://discord.gg/pYR8brsq5W', '_blank')
  }

  onMounted(() => {
    updateStats()
    
    // Обновление основной статистики каждые 2 минуты
    updateInterval = setInterval(updateStats, 120000)
    
    // Обновление времени с вайпа каждую секунду
    wipeTimeInterval = setInterval(updateWipeTime, 1000)
  })

  onUnmounted(() => {
    if (updateInterval) clearInterval(updateInterval)
    if (wipeTimeInterval) clearInterval(wipeTimeInterval)
  })

  return {
    rustStats,
    discordStats,
    wipeTime,
    loading,
    connectToServer,
    joinDiscord,
    updateStats
  }
}