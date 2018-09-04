<template>
    <div id="app">
        <div class="header">
            123
        </div>
        <transition :name="transitionName">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-left'
            }
        },

        watch: {
            '$route'(to, from) {
                if (to.path === '/') {
                    this.transitionName = 'slide-right';
                } else {
                    this.transitionName = 'slide-left';
                }
            }
        }
    }
</script>

<style lang="scss">
    .view {
        position: absolute;
        width: 100%;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
    }

</style>
