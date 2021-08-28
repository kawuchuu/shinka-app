<template>
    <div class="member-item">
        <img loading="lazy" :src="avatar" />
        <div class="memberInfo">
            <div v-if="member.nick">
                <h3>{{ member.nick }}</h3>
                <span class="nick">{{ member.name }}#{{ member.discrim }}</span>
            </div>
            <div v-else>
                <h3>{{ member.name }}<span class="disc">#{{ member.discrim }}</span></h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['member'],
    computed: {
        avatar() {
            if (!this.member.avatar) {
                return `https://cdn.discordapp.com/embed/avatars/${this.member.discrim % 5}.png`
            } else {
                return `https://cdn.discordapp.com/avatars/${this.member.id}/${this.member.avatar}.png?size=64`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.member-item {
    display: grid;
    grid-template-columns: 45px 1fr;
    grid-gap: 20px;

    height: 65px;

    img {
        width: 45px;
        height: 45px;
        border-radius: 60px;
        align-self: center;
    }

    div {
        align-self: center;

        h3 {
            margin: 0px;
            font-size: 1.1em;
            letter-spacing: -0.02em;
        }
    }

    span.nick {
        font-size: 0.85em;
        opacity: 0.7;
    }

    span.disc {
        opacity: 0.7;
    }
}
</style>