import { ref } from 'vue'
import RustWebRcon from '../rust-webrcon.js'
import { db } from '../firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const players = ref([])
const responseText = ref('')
const connected = ref(false)

let rust = null
let intervalId = null

function extractPlayersBlock(text) {
  const startIndex = text.indexOf('id name')
  if (startIndex === -1) return ''
  const trimmed = text.slice(startIndex)
  const endIndex = trimmed.indexOf('') // до конца текста
  return trimmed.slice(0, endIndex).trim()
}

function parsePlayerLine(line) {
  const parts = line.trim().split(/\s+/)
  if (parts.length < 8) return null

  return {
    id: parts[0],
    name: parts.slice(1, parts.length - 6).join(' '),
    ping: parts[parts.length - 6],
    connected: parts[parts.length - 5],
    ip: parts[parts.length - 2],
    ownerSteamID: parts[parts.length - 1]
  }
}

function parsePlayers(block) {
  const lines = block.split('\n').slice(1) // убираем заголовок
  const parsed = []
  for (const line of lines) {
    const player = parsePlayerLine(line)
    if (player) parsed.push(player)
  }
  return parsed
}

async function connectAndFetch() {
  try {
    const password = import.meta.env.VITE_RCON_PASSWORD
    const port = '28836'
    const host = '203.16.163.232'

    rust = new RustWebRcon(password, host, parseInt(port))

    responseText.value = `Подключение к ${host}:${port}...`
    await rust.open()
    connected.value = true

    const response = await rust.cmd('status')
    const block = extractPlayersBlock(response.Message)
    const parsed = parsePlayers(block)

    players.value = parsed
    responseText.value = `Игроков получено: ${parsed.length}`

    await saveToFirebase(parsed)
  } catch (err) {
    responseText.value = `Ошибка: ${err.message || err}`
    connected.value = false
  }
}

import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'

async function saveToFirebase(playersList) {
  for (const player of playersList) {
    const playerId = player.id
    const docRef = doc(db, 'rust_login_players', playerId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // Обновляем поле name, добавляя новый ник, если его ещё нет
      await updateDoc(docRef, {
        name: arrayUnion(player.name)
      })
    } else {
      // Создаём новую запись
      await setDoc(docRef, {
        name: [player.name],
        createdAt: serverTimestamp()
      })
    }
  }
}


function startAutoFetch(everyMs = 1000 * 60 * 60) {
  if (intervalId) return 
  connectAndFetch()
  intervalId = setInterval(connectAndFetch, everyMs)
}

function stopAutoFetch() {
  if (intervalId) clearInterval(intervalId)
}

export function useWebRcon() {
  return {
    players,
    responseText,
    connected,
    connect: connectAndFetch,
    startAutoFetch,
    stopAutoFetch
  }
}
