<template>
    <button
            :style="{'width': width + 'px', 'height': height + 'px'}"
            class="v-button"
            :type="type"
            :class="btnClass"
            :title="title"
            @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'v-button',
        props: {
            inline: {
                type: Boolean,
                default: false
            },
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'button'
            },
            width: {
                type: String,
                default: '40'
            },
            height: {
                type: String,
                default: '40'
            },
            title: {
                type: String,
                default: ''
            }
        },
        computed: {
            btnClass() {
                return {
                    'v-button-inline': this.inline,
                    'v-button_active': this.active,
                    'v-button_disabled': this.disabled
                }
            }
        },
        methods: {
            handleClick(event) {
                if (this.disabled) {
                    event.preventDefault()
                    event.stopPropagation()
                    return
                }
                this.$emit('click', event)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    @mixin btn-active($bg, $border: $bg) {
        &.v-button_active, &:active {
            color: $btn-active-color;
            background: $bg;
            @include border-1px($border);
        }
    }

    .v-button {
        display: block;
        margin: 0;
        padding: 0;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        cursor: pointer;
        font-size: $fontsize-large;
        line-height: 1;
        color: $btn-color;
        background: $btn-bgc;
        outline: none;
        border: none;
        border-radius: 2px;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        @include border-1px($btn-bdc);
        @include btn-active($btn-active-bgc, $btn-active-bdc);

        &.v-button_disabled,
        &.v-button_disabled.v-button_active,
        &.v-button_disabled:active {
            color: $btn-disabled-color;
            background: $btn-disabled-bgc;
            @include border-1px($btn-disabled-bdc);
        }
    }

    .v-button-primary {
        color: $btn-primary-color;
        background: $btn-primary-bgc;
        @include btn-active($btn-primary-active-bgc, $btn-primary-active-bdc);
    }

    .v-button-inline {
        width: auto;
        display: inline-block;
        vertical-align: middle;
        /*padding: 9px;*/
        font-size: $fontsize-small;
    }

    .v-button-light {
        color: $btn-light-color;
        background: $btn-light-bgc;
        box-shadow: $box-shadow-content;
        @include btn-active($btn-light-active-bgc, $btn-light-active-bdc);
    }
</style>
