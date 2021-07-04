const state = () => ({
    currentTime: '-:--',
    duration: '-:--',
    title: 'Video Title',
    channel: 'Video Channel',
    channelUrl: null,
    url: null
})

const mutations = {
    updatePlayer(state, data) {
        state.currentTime = data.currentTime,
        state.duration = data.duration
    },
    updateMetadata(state, data) {
        state.title = data.title
        state.channel = data.channel.name
        state.channelUrl = data.channel.url
        state.url = data.url
    }
}

export default {
    namespaced: true,
    state,
    mutations
}