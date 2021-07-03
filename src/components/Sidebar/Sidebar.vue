<template>
    <div class="sidebar">
        <div class="top-logo">
            <h3>Shinka</h3>
        </div>
        <SideButton v-for="(item, index) in items" :item="item" :key="index"/>
    </div>
</template>

<script>
import SideButton from './SideButton.vue'

export default {
    components: {
        SideButton
    },
    data() {
        return {
            items: [
                {label: 'Dashboard', icon: 'home', link: '/'},
                {label: 'Servers', icon: 'groups', link: '/servers'},
                {label: 'Commands', icon: 'code', link: '/commands'},
                {label: 'Settings', icon: 'settings', link: '/settings'}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    background: var(--secondary-bg);
    grid-area: sidebar;
    padding: 10px 15px;

    display: flex;
    flex-direction: column;
}
</style>