<template>
    <div class="audio-control">
        <div class="title">
            <router-link draggable="false" :to="`/servers/${$route.params.id}`">
                <i class="material-icons">arrow_back</i>
            </router-link>
            <h1>Audio Controls</h1>
        </div>
        <div class="audio-grid">
            <section class="module search">
                <div class="module-container">
                    <VideoSearch />
                </div>
            </section>
            <section class="module queue">
                <div class="module-container">
                    <h1>Queue</h1>
                </div>
            </section>
            <section class="module playbar">
                <div class="module-container">
                    <div class="song-info">info</div>
                    <div class="main-controls">
                        <div class="control-buttons">
                            <i class="material-icons repeat-shuffle" title="Shuffle">shuffle</i>
                            <i class="material-icons skip-prev" title="Previous">skip_previous</i>
                            <i class="material-icons play-pause-icon" title="Play/pause">play_circle_filled</i>
                            <i class="material-icons skip-prev" title="Next">skip_next</i>
                            <i class="material-icons repeat-shuffle" title="Repeat">repeat</i>
                        </div>
                        <div class="seek-time-inner-container">
                            <p class="song-duration">-:--</p>
                            <div ref="seekBarWrapper" class="seek-bar-inner-container">
                                <div class="seek-bar" ref="seekBar">
                                    <div ref="seekFill" class="fill"></div>
                                    <div ref="seekFillHover" class="fill-hover"></div>
                                    <div ref="handle" class="handle"></div>
                                    <!-- <div ref="hoverIndicate" class="seek-hover-indicate">
                                        <div class="num">-:--</div>
                                    </div> -->
                                </div>
                            </div>
                            <p></p>
                        </div>
                    </div>
                    <div class="extra-controls">extra</div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import VideoSearch from '@/components/VideoSearch'

export default {
    components: {
        VideoSearch
    },
    data() {
        return {
            guild: {}
        }
    },
    async mounted() {
        const guild = await fetch(`http://localhost:64342/api/guilds?id=${this.$route.params.id}`, {
            headers: {
                'state': window.appState
            }
        })
        this.guild = await guild.json()
    }
}
</script>

<style lang="scss" scoped>
.audio-control {
    margin: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 80px);

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

.audio-grid {
    display: grid;
    grid-template-areas:
    'search queue'
    'playbar playbar';
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr 80px;
    gap: 25px;
    margin-top: 20px;
    max-width: 1200px;
    width: 100%;
    height: 100%;
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

.search {
    grid-area: search;

    .module-container {
        height: calc(100% - 60px);
        padding: 20px;
    }
}

.queue {
    grid-area: queue;
}

.playbar {
    grid-area: playbar;
    min-height: 80px;

    .module-container {
        height: 100%;
        padding: 0px;

        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        justify-items: center;
        align-items: center;

        .main-controls {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-rows: 1.25fr 1fr;
            justify-items: center;
            align-items: center;

            .track-controls {
                overflow: hidden;
                width: 40%;
                height: 100%;
                z-index: 15;
                display: flex;
                flex-direction: row;
            }
            .track-controls-inner-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%
            }
            .seek-time-inner-container {
                width: 95%;
                display: flex;
                position: relative;
                align-items: center;
                justify-content: center;
            }
            .seek-bar-inner-container {
                padding-top: 3px;
                padding-bottom: 3px;
                position: relative;
                z-index: 15;
                width: 100%;
                display: flex;
                justify-content: center;
                cursor: pointer;
            }
            .seek-bar {
                margin: 10px 0px;
                width: 100%;
                background: #ffffff23;
                display: flex;
                align-items: center;
                border-radius: 999px;
                height: 4px;
                z-index: 5;
            }
            .seek-bar.hover, .fill.hover {
                height: 5px;
            }
            .fill {
                height: 4px;
                background: var(--app-primary);
                border-radius: 10000px;
                transition: cubic-bezier(0, 1, 0.35, 1) .15s;
                width: 0%;
                z-index: 2;
            }
            .fill-hover {
                height: 4px;
                background-color: #ffffff36;
                border-radius: 10px;
                position: absolute;
                opacity: 0;
            }
            .handle {
                width: 0px;
                height: 0px;
                background: var(--hl-txt);
                border-radius: 11111px;
                margin-left: -5px;
                transform: scale(1.5);
                transition: all .1s;
                z-index: 3;
            }
            @keyframes indicate {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(-35px);
                    opacity: 1;
                }
            }
            @keyframes indicate-yeah {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1) translateY(-35px);
                    opacity: 1;
                }
            }
            .seek-hover-indicate {
                background: #000000;
                border: solid 1px var(--bd);
                box-shadow: 0px 5px 10px rgba(0,0,0,.15);
                border-radius: 5px;
                transform: scale(0);
                position: fixed;
                /* transition: 0.25s cubic-bezier(0.17, 0.88, 0.23, 1.15);
                transition-property: transform; */
                animation: indicate 0.08s reverse;
                opacity: 0;
                padding: 0px 10px;
                left: 0;
                pointer-events: none;
                font-size: 14px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .seek-hover-indicate.hover  {
                transform: scale(1) translateY(-35px);
                opacity: 1;
                animation: indicate-yeah 0.2s cubic-bezier(0.17, 0.88, 0.23, 1.15);
            }
            .seek-hover-indicate::after {
                content: "";
                width: 20px;
                height: 20px;
                transform: rotate(-45deg);
                background: #000;
                position: absolute;
                bottom: -5px;
                left: 17px;
                border: solid 1px var(--bd);
                border-radius: 2px;
                box-shadow: 0px 5px 10px rgba(0,0,0,.15);
                z-index: 1;
            }
            .num {
                background: #000000;
                z-index: 2;
                position: relative;
                height: 30px;
                min-width: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .handle-hover {
                width: 10px !important;
                height: 10px !important;
                transition: all .1s !important;
            }
            .fill-hover.hover {
                opacity: 1;
            }
            .song-duration {
                margin: 0 15px;
                position: relative;
                min-width: 25px;
                max-width: 25px;
                text-align: right;
                font-size: 12px;
            }
            #songDurationLength {
                text-align: left;
            }
            .control-buttons {
                display: flex;
                align-items: center;
                align-self: flex-end;
                height: 36px;
            }
            .control-buttons i {
                margin: 5px 7px;
                padding: 5px;
            }
            .play-pause-icon {
                font-size: 34px;
                transition: 0.08s;
                transition-property: transform text-shadow;
            }
            .skip-prev {
                font-size: 22px;
            }
            .track-controls.hide .skip-prev {
                opacity: 0.5;
                pointer-events: none;
            }
            .repeat-shuffle {
                font-size: 20px;
            }
            .active {
                background-color: var(--hl-op);
                border-radius: 100px;
                color: var(--hl-txt)
            }
            .control-buttons i:hover, #closeSidemenu:hover, #albumArtistBack:hover, .playing-bar-hidden i:hover, .top-controls i:hover {
                opacity: 0.6;
                cursor: pointer;
            }
            .play-pause-icon:hover, .play-pause-icon:active {
                transform: scale(1.15);
                opacity: 1 !important;
                text-shadow: 0px 2px 10px rgba(0,0,0,.5);
            }
            .play-pause-icon:active {
                transform: scale(1);
                opacity: 0.6 !important;
            }
        }
    }
}
</style>