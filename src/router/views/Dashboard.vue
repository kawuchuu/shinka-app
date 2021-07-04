<template>
    <div class="dash">
        <h1>Title: {{title}}</h1>
        <h3>Channel: {{channel}}</h3>
        <input disabled type="range" min="0" :max="duration" :value="currentTime" style="width: 400px"/>
        <p>{{currentTimePresent}} / {{durationPresent}}</p>
    </div>
</template>

<script>
import {mapState} from 'vuex'

const timeFormat = s => {
    if (isNaN(s)) return '-:--'
    let min = Math.floor(s / 60);
    let sec = Math.floor(s - (min * 60));
    if (sec < 10){ 
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

export default {
    computed: {
        ...mapState('yt', {
            title: state => state.title,
            channel: state => state.channel,
            duration: state => state.duration,
            currentTime: state => state.currentTime,
            durationPresent: state => timeFormat(state.duration),
            currentTimePresent: state => timeFormat(state.currentTime)
        })
    }
}
</script>