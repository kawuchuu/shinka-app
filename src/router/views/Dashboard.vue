<template>
    <div class="dash">
        <h1 class="title">Dashboard</h1>
        <div class="dash-grid">
            <section class="module botInfo">
                <div class="module-container">
                    <h1>Bot Info</h1>
                    <div v-if="!bot.notLoaded" class="module-contents">
                        <img class="bot-avatar" :src="botAvatar"/>
                        <div class="bot-info-section">
                            <h3>{{bot.username}}<span>#{{bot.discriminator}}</span></h3>
                            <p>ID: {{bot.id}}</p>
                            <p>Date Created: {{dateCreated}}</p>
                        </div>
                    </div>
                    <div v-else class="module-contents loading">
                        <div class="bot-avatar"><div class="load-animation"/></div>
                        <div class="bot-info-section">
                            <div class="text-large"><div class="load-animation"/></div>
                            <div class="text-small"><div class="load-animation"/></div>
                            <div class="text-small"><div class="load-animation"/></div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="module status">
                <div class="module-container">
                    <h1>Status</h1>
                    <div class="module-contents">
                        
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default {
    data() {
        return {
            bot: {
                notLoaded: true,
                username: 'Shinka',
                discriminator: '0000',
                id: '000000000000000000',
                uptime: 0,
                createdAt: 0,
                avatar: null
            }
        }
    },
    computed: {
        botAvatar() {
            if (!this.bot.avatar) {
                return `https://cdn.discordapp.com/embed/avatars/${this.bot.discriminator % 5}.png`
            } else {
                return `https://cdn.discordapp.com/avatars/${this.bot.id}/${this.bot.avatar}.png`
            }
        },
        dateCreated() {
            return dayjs.utc(this.bot.createdAt).local().format('DD MMMM YYYY, HH:mm:ss')
        }
    },
    async mounted() {
        const botReq = await fetch('http://localhost:64342/api/bot', {
            headers: {
                'state': window.appState
            },
        })
        this.bot = await botReq.json()
    }
}
</script>

<style lang="scss" scoped>
.dash {
    margin: 40px;

    h1.title {
        font-size: 2.75em;
        letter-spacing: -0.03em;
    }
}

.dash-grid {
    display: grid;
    grid-template-areas:
    'botInfo status';
    grid-template-columns: 1.75fr 1fr;
    gap: 40px;
    margin-top: 40px;
}

.module {
    background: var(--secondary-bg);
    border: solid 1px #3d3d3d;
    border-radius: 10px;
    box-shadow: 0px 3px 15px rgba(0,0,0,.4);

    min-height: 100px;

    .module-container {
        padding: 20px;

        h1 {
            margin: 0px;
            letter-spacing: -0.02em;
        }
    }
}

@keyframes loadAnimation {
    from {
        transform: translateX(-105%);
    }
    to {
        transform: translateX(105%);
    }
}

.load-animation {
    width: 100%;
    height: 100%;
    background: linear-gradient(to left, transparent, #3d3d3d, #3d3d3d, transparent);
    transform: translateX(-100%);
    animation: loadAnimation 1.5s infinite;
}

.module.botInfo {
    grid-area: botInfo;

    .module-contents {
        margin-top: 20px;

        display: grid;
        grid-template-columns: 70px 1fr;
        gap: 20px;

        .bot-avatar {
            width: 70px;
            height: 70px;
            border-radius: 100px;
        }

        h3 {
            margin-top: 10px;

            span {
                opacity: 0.5;
            }
        }
    }
    .module-contents.loading {
        .bot-avatar {
            background: var(--bg);
            overflow: hidden;
        }
        .text-large {
            width: 100%;
            height: 25px;
            background: var(--bg);
            margin-top: 10px;
            margin-bottom: 18.72px;
            border-radius: 5px;
            overflow: hidden;
        }
        .text-small {
            width: 100%;
            height: 16px;
            background: var(--bg);
            margin: 16px 0px;
            border-radius: 5px;
            overflow: hidden;
        }
    }
}

.module.status {
    grid-area: status;
}
</style>
