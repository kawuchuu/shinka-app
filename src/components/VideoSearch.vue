<template>
    <div class="search-comp" :class="doShowResults">
        <div class="input-query">
            <i class="material-icons">search</i>
            <input type="text" v-model="query" placeholder="Type here to search...">
        </div>
        <div class="history">
            <h1>History</h1>
            <div class="history-content">
                <div class="nothing-to-show">
                    <i class="material-icons">history</i>
                    <p>Nothing to show here... Try adding a video to the queue!</p>
                </div>
            </div>
        </div>
        <div class="results">
            <!-- <h1>Search Results</h1> -->
            <div v-show="startDisplayResults" class="results-content">
                <div v-if="results.length == 0" class="load-spinner" />
                <VideoSearchResult class="video-result" v-for="item in results" :video="item" :key="item.id" />
            </div>
        </div>
    </div>
</template>

<script>
import ytapi from 'simple-youtube-api'
import VideoSearchResult from './VideoSearchResult.vue'

let yt = null

window.shinkaServer.getYtKey().then(key => {
    yt = new ytapi(key)
})

export default {
    components: {
        VideoSearchResult
    },
    data() {
        return {
            startDisplayResults: false,
            query: "",
            queryTimeout: null,
            results: []
        }
    },
    computed: {
        doShowResults() {
            if (this.query !== '') {
                return 'searching'
            } else {
                return ''
            }
        }
    },
    methods: {
        startSearch() {
            this.queryTimeout = setTimeout(this.doSearch, 500)
        },
        async doSearch() {
            this.startDisplayResults = true
            this.results = []
            const results = await yt.searchVideos(this.query, 15)
            console.log(results)
            results.forEach(video => {
                this.results.push({
                    url: video.url,
                    title: video.title,
                    channel: video.channel.title,
                    channelUrl: video.channel.url,
                    thumbnail: video.thumbnails.medium.url,
                    id: video.id
                })
            })
        }
    },
    watch: {
        query() {
            this.startDisplayResults = false
            if (this.query !== '') {
                clearTimeout(this.queryTimeout)
                this.startSearch()
            } else {
                this.results = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.search-comp {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 45px 1fr;
    grid-template-areas:
    'input'
    'history';
    gap: 20px;
}

.search-comp.searching {
    grid-template-areas: 
    'input'
    'results';

    .history {
        display: none;
    }

    .results {
        display: block;
    }
}

.results {
    display: none;
    grid-area: results;
    border-top: solid 1px #3d3d3d;

    .results-content {
        margin-top: 20px;
        overflow: hidden;
        overflow-y: auto;
        height: calc(100vh - 410px);

        h1 {
            margin-top: 0px;
        }

        .video-result:first-child {
            padding-top: 0px;
        }

        .video-result:last-child {
            padding-bottom: 0px;
        }
    }

    .results-content::-webkit-scrollbar {
        background: transparent;
    }

    .results-content::-webkit-scrollbar-thumb {
        border-color: var(--secondary-bg);
    }
}

.input-query {
    grid-area: input;
    width: 100%;
    height: 100%;
    background: var(--bg);
    border: solid 1px #3d3d3d;
    border-radius: 10px;

    display: flex;
    align-items: center;
    overflow: hidden;

    i {
        margin: 0px 15px;
    }

    input[type=text] {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        color: var(--text);

        font-family: 'Inter', sans-serif;
        font-size: 0.95em;
    }
}

.history {
    grid-area: history;
    border-top: solid 1px #3d3d3d;

    .history-content {
        height: calc(100% - 75px);

        .nothing-to-show {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            height: 100%;
            opacity: 0.3;

            i {
                font-size: 8em;
                margin-bottom: 20px
            }
        }
    }
}
</style>