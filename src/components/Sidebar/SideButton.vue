<template>
    <router-link :to="item.link">
        <div class="side-button">
            <i class="material-icons">{{item.icon}}</i>
            <span>{{item.label}}</span>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['item']
}
</script>

<style lang="scss" scoped>
.side-button {
    display: flex;
    align-items: center;

    background: transparent;
    padding: 10px 15px;

    border: none;
    border-radius: 10px;

    opacity: 0.75;

    span {
        margin-left: 15px;
    }
}

.router-link-exact-active .side-button {
    background-color: var(--app-primary);

    opacity: 1;

    span {
        font-weight: bold;
    }
}
</style>