<template>
    <router-link :to="`/server?id=${guild.id}`">
        <div class="server-item">
            <img draggable="false" :src="icon">
            <div class="info">
                <h2>{{ guild.name }}</h2>
            </div>
            <i class="material-icons">chevron_right</i>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['guild'],
    computed: {
        icon() {
            return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png`
        }
    }
}
</script>

<style lang="scss" scoped>
.server-item {
    display: grid;
    grid-template-areas: 'icon info indicate';
    grid-template-columns: 70px 1fr 30px;
    gap: 30px;
    padding: 18px 10px;
    border-radius: 10px;
    cursor: pointer;
    
    img {
        width: 70px;
        height: 70px;
        border-radius: 120px;
        grid-area: 'icon';
        align-self: center;
    }

    .info {
        grid-area: 'info';
        align-self: center;

        h2 {
            letter-spacing: -0.025em;
            margin: 0px 0px 8px;
            font-size: 1.7rem;
        }

        span {
            opacity: 0.5;
            font-size: 0.85em;
        }
    }

    i {
        grid-area: 'indicate';
        align-self: center;
        justify-content: flex-end;
        opacity: 0.5;
    }
}

.server-item:hover {
    background: #ffffff10;
}

.server-item:active {
    background: #ffffff10;
    opacity: 0.5;
}
</style>