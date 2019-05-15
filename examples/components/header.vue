<template>
    <header class="v-header">
        <nav class="v-nav hidden-mobile">
            <div class="logo"></div>
            <!--<ul class="v-menu">-->
                <!--<li class="active"><a href="javascript:;">Button</a></li>-->
                <!--<li><a href="javascript:;">Forms</a></li>-->
                <!--<li><a href="javascript:;">Grid</a></li>-->
                <!--<li><a href="javascript:;">Table</a></li>-->
            <!--</ul>-->
            <sideNav class="nav"></sideNav>
        </nav>
    </header>
</template>

<script>
    import sideNav from './side-nav.vue'

    export default {
        components:{
            sideNav
        },
        data() {
            return {}
        }
    }
</script>

<style type="text/scss" lang="scss">
    .v-header {
        position: relative;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #dcdcdc;
        background: #3f536e;
    }

    .v-nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 217px;
        height: 100%;
        z-index: 999;
        background: #fff;
    }

    .v-nav .logo {
        display: block;
        width: 112px;
        height: 112px;
        margin: 60px auto;
        background-color: #dbdcdd;
    }

    .v-menu {
        padding-left: 52px;
    }

    .v-menu li {
        position: relative;
    }

    .v-menu li.active a {
        font-weight: 600;
    }

    .v-menu li.active::before {
        content: '';
        display: block;
        position: absolute;
        top: 21px;
        left: -54px;
        width: 46px;
        height: 2px;
        border-radius: 2px;
        background-color: #d20000;
    }

    .v-menu li a {
        display: block;
        padding: 10px 0;
        color: #999;
    }

</style>
