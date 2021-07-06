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
                            <div class="bot-info-grid">
                                <div class="info-item">
                                    <span class="label">Bot ID</span>
                                    <p>{{bot.id}}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">Date Created</span>
                                    <p>{{dateCreated}}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">Privacy Status</span>
                                    <p>{{bot.isPublic ? 'Public' : 'Private'}}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">2FA Status</span>
                                    <p :style="mfaStatusWarn">{{ bot.owner.mfaEnabled ? 'Enabled' : 'Disabled' }}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">Owner</span>
                                    <div class="owner">
                                        <img :src="ownerAvatar">
                                        <p>{{bot.owner.username}}<span>#{{bot.owner.discriminator}}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="module-contents loading">
                        <div class="bot-avatar"><div class="load-animation"/></div>
                        <div class="bot-info-section">
                            <div class="text-large"><div class="load-animation"/></div>
                            <div class="text-small"><div class="load-animation"/></div>
                            <div class="text-small"><div class="load-animation"/></div>
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
                return `https://cdn.discordapp.com/avatars/${this.bot.id}/${this.bot.avatar}.png?size=128`
            }
        },
        ownerAvatar() {
            if (!this.bot.owner.avatar) {
                return `https://cdn.discordapp.com/embed/avatars/${this.owner.discriminator % 5}.png`
            } else {
                return `https://cdn.discordapp.com/avatars/${this.bot.owner.id}/${this.bot.owner.avatar}.png?size=32`
            }
        },
        dateCreated() {
            return dayjs.utc(this.bot.createdAt).local().format('DD MMMM YYYY, HH:mm:ss')
        },
        mfaStatusWarn() {
            if (!this.bot.owner.mfaEnabled) {
                return 'color: #ff5d5d'
            } else {
                return ''
            }
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

    display: flex;
    flex-direction: column;
    align-items: center;

    h1.title {
        font-size: 2.75em;
        letter-spacing: -0.03em;
        max-width: 1200px;
        width: 100%;
    }
}

.dash-grid {
    display: grid;
    grid-template-areas:
    'botInfo status';
    grid-template-columns: 2fr 1fr;
    gap: 40px;
    margin-top: 20px;
    max-width: 1200px;
    width: 100%;
}

.module {
    background: var(--secondary-bg);
    border: solid 1px #3d3d3d;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0,0,0,.4);

    min-height: 100px;

    .module-container {
        padding: 30px;

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
    height: 375px;

    .module-contents {
        margin-top: 25px;

        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 25px;

        .bot-avatar {
            width: 80px;
            height: 80px;
            border-radius: 100px;
        }

        h3 {
            margin: 10px 0 20px;
            font-size: 1.65em;
            letter-spacing: -0.02em;

            span {
                opacity: 0.5;
            }
        }

        .bot-info-section {
            .bot-info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
            }

            span.label {
                font-size: 0.75em;
                opacity: 0.7;
                text-transform: uppercase;
                //font-weight: bold;
            }

            p {
                margin: 10px 0px 20px;
                
                span {
                    opacity: 0.5;
                }
            }
        }

        .owner {
            display: flex;
            align-items: center;

            margin-top: 10px;

            img {
                margin: 0 10px 0 0;
                height: 26px;
                border-radius: 100px;
            }

            p {
                margin: 0;
            }
        }
    }
    .module-contents.loading {
        .bot-avatar {
            background: var(--bg);
            overflow: hidden;
        }
        .text-large {
            width: 98%;
            height: 45px;
            background: var(--bg);
            margin-top: 8px;
            margin-bottom: 30px;
            border-radius: 5px;
            overflow: hidden;
        }
        .text-small {
            width: 98%;
            height: 22px;
            background: var(--bg);
            margin: 25px 0px;
            border-radius: 5px;
            overflow: hidden;
        }
    }
}

.module.status {
    grid-area: status;
}
</style>
