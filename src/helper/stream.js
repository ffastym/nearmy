/**
 * @author Yuriy Matviyuk
 */
import socket from '../api/io/socket'
import store from '../redux/store'
import chatActions from '../redux/actions/chat'
import appActions from '../redux/actions/app'

const CALL_OFFER_LIFE_TIME = 30000 // automatically cancel video chat offer after this time (in milliseconds)
let stream = {}

if (typeof window !== 'undefined') {
  const pc = new window.RTCPeerConnection({
    'iceServers': [
      {
        'urls': 'stun:stun.l.google.com:19302'
      },
      {
        'urls': 'turn:192.158.29.39:3478?transport=udp',
        'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        'username': '28224511:1379330808'
      },
      {
        'urls': 'turn:192.158.29.39:3478?transport=tcp',
        'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        'username': '28224511:1379330808'
      }
    ]
  })
  
  stream = {
    async createOffer (userId, isAnswer = false) {
      let offer
      const sender = store.getState().user
      const senderData = {
        name: sender.name,
        isAnswer,
        avatar: sender.avatar,
        id: sender.id
      }

      pc.userId = userId

      try {
        offer = await pc.createOffer()
      } catch (e) {
        console.warn('Create offer error ---> ', e)
      }

      if (!offer) {
        return false
      }

      try {
        await pc.setLocalDescription(new RTCSessionDescription(offer))
      } catch (e) {
        console.log('Set local description error ---> ', e)
      }

      socket.app.emit('makeVideoOffer', { offer, userId, senderData })
    },

    stopAllStreams (senderId) {
      this.stopStream()
      this.cancelVideoChat(senderId)
      socket.app.emit('stopVideoCall', { senderId })
    },

    addCandidate (candidate) {
      pc.addIceCandidate(candidate)
    },

    addStream (stream) {
      for (const track of stream.getTracks()) {
        pc.addTrack(track, stream)
      }
    },

    getMediaStream () {
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
    },

    async madeVideoOffer (data) {
      let answer
      pc.userId = store.getState().user.id
      pc.senderData = data.senderData

      try {
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer))
      } catch (e) {
        console.error(new Error(e))
      }

      try {
        answer = await pc.createAnswer()
      } catch (e) {
        console.error(new Error(e))
      }

      try {
        await pc.setLocalDescription(new RTCSessionDescription(answer))
      } catch (e) {
        console.warn('Error', e)
      }

      socket.app.emit('makeVideoAnswer', {
        answer,
        senderId: data.senderData.id
      })
    },

    declineVideoChat () {
      const senderId = store.getState().chat.incomingCall.senderData.id

      socket.app.emit('declineVideoChat', { senderId })
      store.dispatch(chatActions.setIncomingCallData(null))
    },

    cancelIncomingCall () {
      store.dispatch(chatActions.setIncomingCallData(null))
    },

    /**
     * Stop video streaming
     */
    stopStream () {
      const stream = store.getState().chat.mediaStream

      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        store.dispatch(chatActions.setMediaStream(null))
      }
    },

    /**
     * Cancel video chat
     *
     * @param receiverId
     */
    cancelVideoChat (receiverId) {
      this.stopStream()
      socket.app.emit('cancelVideoChat', { receiverId })
    },

    async madeVideoAnswer (data) {
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer))
      } catch (e) {
        console.warn('Error', e)
      }
    }
  }

  pc.onicecandidate = event => {
    const candidate = event.candidate

    if (candidate) {
      socket.app.emit('addCandidate', { userId: pc.userId, candidate })
    }
  }

  pc.ontrack = event => {
    const data = {
      stream: event.streams[0],
      senderData: pc.senderData
    }

    store.dispatch(chatActions.setIncomingCallData(data))

    if (pc.senderData.isAnswer) {
      return // do nothing if it is an answer
    }

    setTimeout(() => {
      if (store.getState().chat.incomingCall && !store.getState().chat.incomingCall.accepted) {
        stream.declineVideoChat()
        store.dispatch(chatActions.setIncomingCallData(null)) // cancel call automatically
      }
    }, CALL_OFFER_LIFE_TIME)
  }
}

export default stream
