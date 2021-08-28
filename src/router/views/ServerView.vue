<template>
    <div class="server-view">
        <div v-if="!guild.id" class="load-spinner" />
        <div v-if="guild.id" class="title">
            <router-link draggable="false" :to="'/servers'">
                <i class="material-icons">arrow_back</i>
            </router-link>
            <h1>{{ guild.name }}</h1>
        </div>
        <div v-if="guild.id" class="server-grid">
            <section class="module info">
                <div class="module-container">
                    <h1>Server Info</h1>
                    <div class="module-contents">
                        <img draggable="false" :src="img" class="server-img">
                        <div class="server-info-section">
                            <div class="server-info-grid">
                                <div class="info-item">
                                    <span class="label">Server ID</span>
                                    <p>{{ guild.id }}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">Member Count</span>
                                    <p>{{ guild.memberCount }}</p>
                                </div>
                                <div class="info-item">
                                    <span class="label">Date Created</span>
                                    <p>{{ dateCreated }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="module members">
                <div class="module-container">
                    <h1>Members</h1>
                    <div class="module-contents">
                        <div class="load-spinner" v-if="members.length == 0"></div>
                        <MemberItem v-for="item in members" :member="item" :key="item.id" />
                    </div>
                </div>
            </section>
            <section class="module options">
                <div class="module-container">
                    <h1>Options</h1>
                    <div class="module-contents">
                        <p>This is a placeholder</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import MemberItem from '@/components/MemberItem'

import dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default {
    components: {
        MemberItem
    },
    data() {
        return {
            guild: {},
            members: []
        }
    },
    computed: {
        dateCreated() {
            return dayjs.utc(this.guild.joinedTimestamp).local().format('DD MMMM YYYY, HH:mm:ss')
        },
        img() {
            return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png`
        }
    },
    async mounted() {
        const guild = await fetch(`http://localhost:64342/api/guilds?id=${this.$route.query.id}`, {
            headers: {
                'state': window.appState
            }
        })
        this.guild = await guild.json()
        const members = await fetch(`http://localhost:64342/api/guilds/${this.guild.id}/members`, {
            headers: {
                'state': window.appState
            }
        })
        const memGet = await members.json()
        Object.keys(memGet).forEach(id => {
            this.members.push(memGet[id])
        })
    }
}
</script>

<style lang="scss" scoped>
.server-view {
    margin: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        max-width: 1200px;
        width: 100%;

        display: flex;
        align-items: center;

        h1 {
            font-size: 2.75em;
            letter-spacing: -0.03em;

            margin: 10px 0;
        }

        i {
            padding: 10px;
            margin-right: 10px;
            font-size: 2.1em;
            border-radius: 40px;
            cursor: pointer;
            transform: translateX(-10px);
        }

        i:hover {
            background: #ffffff10;
        }

        i:active {
            background: #ffffff10;
            opacity: 0.5;
        }
    }
}

.server-grid {
    display: grid;
    grid-template-areas:
    'info members'
    'options members';
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 240px 480px;
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

span.label {
    font-size: 0.75em;
    opacity: 0.7;
    text-transform: uppercase;
    //font-weight: bold;
}

.options {
    grid-area: options;
}

.info {
    grid-area: info;

    .module-contents {
        margin-top: 25px;

        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 25px;

        .server-img {
            width: 80px;
            height: 80px;
            border-radius: 100px;
        }

        h3 {
            margin: 10px 0 20px;
            font-size: 1.65em;
            letter-spacing: -0.02em;
        }

        .server-info-section {
            .server-info-grid {
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
}

.members {
    grid-area: members;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;

    .module-contents {
        margin-top: 25px;
    }
}

.members::-webkit-scrollbar {
    background: transparent;
}

.members::-webkit-scrollbar-thumb {
    border-color: var(--secondary-bg);
}
</style>