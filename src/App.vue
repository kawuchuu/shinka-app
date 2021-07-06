<template>
    <div id="app">
        <Sidebar />
        <main>
            <router-view v-if="show"/>
            <div v-else class="getting-state">
                <div class="load-spinner"></div>
                <h1>Waiting for state</h1>
                <p>Please wait...</p>
            </div>
        </main>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar/Sidebar'

export default {
    name: 'App',
    components: {
        Sidebar
    },
    data() {
        return {
            show: false
        }
    },
    async mounted() {
        const state = await window.shinkaServer.getState()
        window.appState = state
        this.show = true
    }
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Inter';
    font-weight: normal;
    src: url('./assets/Inter-Regular.ttf') format('truetype');
}
@font-face {
    font-family: 'Inter';
    font-weight: bold;
    src: url('./assets/Inter-Bold.ttf') format('truetype');
}

:root {
    --app-primary: #4000bf;
    --bg: #1e1e1e;
    --secondary-bg: #0e0e0e;
    --text: white;
    --fonts: Inter, Roboto, sans-serif;
}

body {
    background: var(--bg);
    color: var(--text);

    font-family: var(--fonts);

    margin: 0;
}

#app {
    display: grid;
    grid-template-areas: 'sidebar main';
    grid-template-columns: 250px 1fr;

    width: 100%;
    height: 100vh;
}

a {
    color: var(--text);
    text-decoration: none;
}

button {
    background-color: var(--app-primary);
    color: var(--text);
    outline: none;
    border: none;
    font-size: 20px;
    font-family: var(--fonts);

    padding: 8px 16px;
    border-radius: 3px;

    cursor: pointer;

    /* box-shadow:
    inset 0 1px 0 0 rgb(255 255 255 / 20%),
    inset 0 -1px 0 0 rgb(0 0 0 / 20%); */
}

button:active {
    background: #6724ee
}

main {
    grid-area: main;

    position: relative;
    overflow: hidden;
    overflow-y: auto;

    height: 100%;
}

.getting-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;

    h1 {
        margin: 20px 0 0;
    }

    p {
        opacity: 0.5;
    }

    animation: fadeIn 2s;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.load-spinner {
    border: 4px solid var(--text);
    border-top: 4px solid transparent;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>