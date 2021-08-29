<template>
    <div class="dash">
        <h1 class="title">Dashboard</h1>
        <div class="dash-grid">
            <section class="module botInfo">
                <div class="module-container">
                    <h1>Bot Info</h1>
                    <div v-if="!bot.notLoaded" class="module-contents">
                        <img draggable="false" class="bot-avatar" :src="botAvatar"/>
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
                                        <img draggable="false" :src="ownerAvatar">
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
                    <div v-if="!bot.notLoaded" class="module-contents">
                        <div class="status-item">
                            <span class="label">Bot Status</span>
                            <div class="status-indicate">
                                <div :style="statusColour" class="icon"/>
                                <p>{{ statusName }}</p>
                            </div>
                        </div>
                        <div v-if="bot.activity" class="status-item activity">
                            <span class="label">Activity</span>
                            <p><span v-if="bot.activity.type === 'LISTENING'" class="act-type no-upper">Listening to</span><span v-else class="act-type">{{ bot.activity.type.toLowerCase() }}</span> {{ bot.activity.name }}</p>
                        </div>
                        <div class="status-item">
                            <span class="label">Uptime</span>
                            <!-- please don't judge this i know it's probably bad but it works -->
                            <p>
                                <span v-if="uptime.days > 0">{{ uptime.display.days }}, </span>
                                <span v-if="uptime.hours > 0 && uptime.days > 0">{{ uptime.display.hours }}, </span>
                                <span v-else-if="uptime.hours > 0">{{ uptime.display.hours }}, </span>
                                <span v-if="uptime.mins > 0 && uptime.hours > 0">{{ uptime.display.mins }}, </span>
                                <span v-else-if="uptime.mins > 0">{{ uptime.display.mins }}, </span>
                                <span v-if="uptime.mins > 0">{{ uptime.display.secs }}</span>
                                <span v-else>{{ uptime.display.secs }}</span>
                            </p>
                        </div>
                        <div class="status-item">
                            <span class="label">Audio Player</span>
                            <p>0 streams in progress</p>
                        </div>
                    </div>
                    <div v-else class="module-contents loading">
                        <div class="text-large"><div class="load-animation"/></div>
                        <div class="text-small"><div class="load-animation"/></div>
                        <div class="text-small"><div class="load-animation"/></div>
                        <div class="text-small"><div class="load-animation"/></div>
                        <div class="text-small"><div class="load-animation"/></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
import * as durationDayJS from 'dayjs/plugin/duration'

dayjs.extend(utc)
dayjs.extend(durationDayJS)

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
            },
            uptime: {
                secs: 0,
                mins: 0,
                hours: 0,
                days: 0,
                display: {
                    secs: '0 secs',
                    mins: '0 mins',
                    hours: '0 hours',
                    days: '0 days'
                }
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
        },
        statusColour() {
            switch(this.bot.status) {
                case 'online': {
                    return 'background-color: #3AA35C'
                }
                case 'idle': {
                    return 'background-color: #EC9F19'
                }
                case 'dnd': {
                    return 'background-color: #ED4245'
                }
                case 'offline': {
                    return 'background-color: #747F8D'
                }
                default: {
                    return 'background-color: #747F8D'
                }
            }
        },
        statusName() {
            switch(this.bot.status) {
                case 'online': {
                    return 'Online'
                }
                case 'idle': {
                    return 'Idle'
                }
                case 'dnd': {
                    return 'Do Not Disturb'
                }
                case 'offline': {
                    return 'Invisible'
                }
                default: {
                    return 'Offline'
                }
            }
        }
    },
    methods: {
        updateUptime() {
            const uptime = Math.floor(this.bot.uptime / 1000);
            let secs = uptime
            let mins = 0
            let hours = 0
            let dispSecs = uptime
            let dispMins = 0
            let dispHours = 0
            while (dispSecs >= 60) {
                mins++
                dispMins++
                dispSecs = dispSecs - 60
            }
            while (dispMins >= 60) {
                hours++
                dispHours++
                dispMins = dispMins - 60
            }
            let days = 0
            while (dispHours >= 24) {
                days++
                dispHours = dispHours - 24
            }
            this.uptime.secs = secs
            this.uptime.mins = mins
            this.uptime.hours = hours
            this.uptime.days = days
            this.uptime.display.secs = `${dispSecs} sec`
            if (dispSecs > 1 || dispSecs < 1) this.uptime.display.secs += 's'
            this.uptime.display.mins = `${dispMins} min`
            if (dispMins > 1 || dispMins < 1) this.uptime.display.mins += 's'
            this.uptime.display.hours = `${dispHours} hour`
            if (dispHours > 1 || dispHours < 1) this.uptime.display.hours += 's'
            this.uptime.display.days = `${days} day`
            if (days > 1 || days < 1) this.uptime.display.days += 's'
        }
    },
    async mounted() {
        const botReq = await fetch('http://localhost:64342/api/bot', {
            headers: {
                'state': window.appState
            },
        })
        this.bot = await botReq.json()
        this.updateUptime()
        setInterval(() => {
            this.bot.uptime = this.bot.uptime + 1000
            this.updateUptime()
        }, 1000)
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

        margin: 10px 0 20px;
    }
}

.dash-grid {
    display: grid;
    grid-template-areas:
    'botInfo status';
    grid-template-columns: 2fr 1fr;
    gap: 30px;
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

span.label {
    font-size: 0.75em;
    opacity: 0.7;
    text-transform: uppercase;
    //font-weight: bold;
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

            p {
                margin: 5px 0px 25px;
                
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
    }
}

.module.status {
    grid-area: status;

    .module-contents {
        margin-top: 15px;

        .status-item {
            margin-bottom: 20px;
        }

        p {
            margin: 5px 0 0;
        }

        .status-item .status-indicate {
            display: flex;
            align-items: center;

            margin-top: 5px;

            .icon {
                background-color: white;
                
                height: 10px;
                width: 10px;
                border-radius: 10px;

                margin-right: 10px;
            }

            p {
                margin: 0;
            }
        }

        .activity p {
            font-weight: bold;
        }

        .act-type {
            text-transform: capitalize;
            font-weight: normal;
        }

        .act-type.no-upper {
            text-transform: none;
        }


    }
}
</style>
