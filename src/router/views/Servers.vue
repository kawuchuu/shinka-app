<template>
    <div class="servers">
        <div class="title">
            <h1>Servers</h1>
            <p>{{ Object.keys(guilds).length }} servers</p>
        </div>
        <div class="server-list">
            <div v-if="Object.keys(guilds).length == 0" class="load-spinner" />
            <ServerItem v-for="item in guilds" :guild="item" :key="item.id" />
        </div>
    </div>
</template>

<script>
import ServerItem from '@/components/ServerItem.vue'

export default {
    components: {
        ServerItem
    },
    data() {
        return {
            guilds: {}
        }
    },
    async mounted() {
        const guilds = await fetch('http://localhost:64342/api/guilds', {
            headers: {
                'state': window.appState
            },
        })
        this.guilds = await guilds.json()
    }
}
</script>

<style lang="scss" scoped>
.servers {
    margin: 20px 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 100%;
        max-width: 1200px;
        
        h1 {
            font-size: 2.75em;
            letter-spacing: -0.03em;
            max-width: 1200px;

            margin: 10px 0;
        }

        p {
            font-size: 0.95rem;
            margin: 8px 0px;
            opacity: 0.5;
        }
    }
}

.server-list {
    max-width: 1200px;
    width: 100%;
    margin-top: 20px;
}
</style>