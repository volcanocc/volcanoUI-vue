<template>
    <div class="v-header">
        <div class="header-button is-left">
           left
        </div>
        <h1 class="header-title">仅图标</h1>
        <div class="header-button is-right">
           right
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-header'
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    .v-header {
        position: absolute;
        left: 0;
        top: 0;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #fff;
        box-sizing: border-box;
        color: $color-dark-grey;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 18px;
        width: 100%;
        height: 44px;
        line-height: 1;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        z-index: 500;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;

        .header-button {
            -webkit-box-flex: .5;
            -ms-flex: .5;
            flex: .5;

            &.is-left {
                color: $color-blue;
                text-align: left;
            }

            &.is-right {
                color: $color-blue;
                text-align: right;
            }
        }

        .header-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: inherit;
            font-weight: 400;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }
    }
</style>
