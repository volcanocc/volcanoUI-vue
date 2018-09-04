<template>
    <div class="v-popup" :class="typeClass" v-show="isVisible">
        <div class="v-popup-mask" v-show="mask" @click="maskClick">
            <slot name="mask"></slot>
        </div>
        <div class="v-popup-container" :class="{'v-popup-center': center}">
            <div class="v-popup-content" v-if="$slots.default">
                <slot></slot>
            </div>
            <div class="v-popup-content" v-else v-html="content">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

    const EVENT_MASK_CLICK = 'mask-click'

    export default {
        name: 'v-popup',
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ''
            },
            mask: {
                type: Boolean,
                default: true
            },
            content: {
                type: String,
                default: ''
            },
            center: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            typeClass() {
                return this.type ? `v-${this.type}` : ''
            }
        },
        methods: {
            maskClick(e) {
                this.$emit(EVENT_MASK_CLICK, e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";

    .v-popup {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 100;
    }

    .v-popup-mask, .v-popup-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .v-popup-mask {
        overflow: hidden;
        background-color: $popup-mask-bgc;
        opacity: $popup-mask-opacity;
        // fix some android webview opacity render bug
        &::before {
            content: ".";
            display: block;
            width: 1px;
            height: 1px;
            background-color: rgba(0, 0, 0, .1);
            margin-left: -10px;
        }

    }

    .v-popup-container {
        transform: translate(100%, 100%);

    }

    .v-popup-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        transform: translate(-100%, -100%);
    }

    .v-popup-center {
        .v-popup-content {
            position: absolute;
            top: -50%;
            left: -50%;
            width: auto;
            transform: translate(-50%, -50%);
        }

    }

</style>
