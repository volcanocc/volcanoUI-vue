<template>
    <div class="home">
        <div class="main">
            <div class="demo-list-box">
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>
                <div class="component-item">
                    actionSheet
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        components: {},
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
    .header {
        text-align: center;
    }

    .main {

    }

    .demo-list-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;

        .component-item {
            width: 33.333333%;
            padding: 30px 0;
            text-align: center;
            align-self: center;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;

            &:nth-child(3n) {
                border-right: none;
            }
        }
    }
</style>
