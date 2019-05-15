<template>
    <div id="app">
        <div>
            <mainHeader></mainHeader>
            <div class="main">
                <router-view class="content"></router-view>
            </div>
            <mainFooter v-if="!isIndex"></mainFooter>
        </div>
    </div>
</template>

<script>
    import mainHeader from './components/header.vue'
    import mainFooter from './components/footer.vue'

    export default {
        name: 'app',
        components: {
            mainHeader,
            mainFooter
        },
        data() {
            return {
                init: false,
                isIndex: true
            }
        },
        watch: {
            $route() {
                this.isIndex = this.$route.name === 'index'
            }
        },
        mounted() {
            //  这里模拟数据请求
            setTimeout(() => {
                this.init = true
            }, 250)
        }

    }
</script>

<style lang="scss" type="text/scss">
    @import "./assets/sass/index.scss";

    $media-screen-small: 720px;
    $media-screen-middle: 1024px;
    $media-screen-large: 1200px;

    $container-width: 90%;
    $container-middle-width: 960px;
    $container-large-width: 1180px;
    $row-margin-bottom: 16px;

    .container {
        width: $container-width;
        margin: 0 auto;
        @include clearfix;
    }

    .container-fluid {
        width: 100%;
        @include clearfix;
    }

    @media (min-width: $media-screen-middle) {
        .container {
            width: $container-middle-width;
            margin: 0 auto;
        }
    }

    @media (min-width: $media-screen-large) {
        .container {
            width: $container-large-width;
            margin: 0 auto;
        }
    }
</style>
