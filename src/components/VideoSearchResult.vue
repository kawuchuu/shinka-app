<template>
    <div class="result">
        <img :src="video.thumbnail" class="thumbnail">
        <div class="info">
            <p class="title">{{ video.title }}</p>
            <p class="channel">{{ video.channel }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['video']
}
</script>

<style lang="scss" scoped>
.result {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    padding: 5px 0px;
    height: 85px;

    .thumbnail {
        height: auto;
        width: 100%;
    }

    .info {
        margin: 0px 20px;
        overflow: hidden;

        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0px;
        }

        .title {
            font-size: 1.1em;
            margin-bottom: 10px;
        }

        .channel {
            font-size: 0.8em;
            opacity: 0.7;
        }
    }
}
</style>