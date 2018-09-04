<template>
    <transition name="v-dialog-fade">
        <v-popup type="dialog" :mask="true" :center="true" v-show="isVisible">
            <div class="v-dialog-main">
                <span class="v-dialog-close" v-show="showClose" @click="close"><i class="cubeic-close"></i></span>
                <div :class="containerClass">
                    <p class="v-dialog-icon" v-if="icon"><i :class="icon"></i></p>
                    <h2 v-if="title || $slots.title" class="v-dialog-title">
                        <slot name="title">
                            <p class="v-dialog-title-def">{{title}}</p>
                        </slot>
                    </h2>
                    <div class="v-dialog-content">
                        <slot name="content">
                            <div class="v-dialog-content-def">
                                <p v-html="content"></p>
                            </div>
                        </slot>
                    </div>
                    <div class="v-dialog-btns" :class="{'border-right-1px': isConfirm}">
                        <slot name="btns">
                            <a :href="_cancelBtn.href" class="v-dialog-btn border-top-1px"
                               :class="{'v-dialog-btn_highlight': _cancelBtn.active, 'v-dialog-btn_disabled': _cancelBtn.disabled}"
                               v-if="isConfirm" @click="cancel">{{_cancelBtn.text}}</a>
                            <a :href="_confirmBtn.href" class="v-dialog-btn border-top-1px"
                               :class="{'v-dialog-btn_highlight': _confirmBtn.active, 'v-dialog-btn_disabled': _confirmBtn.disabled}"
                               @click="confirm">{{_confirmBtn.text}}</a>
                        </slot>
                    </div>
                </div>
            </div>
        </v-popup>
    </transition>
</template>

<script type="text/ecmascript-6">
    import VPopup from './v-popup'

    const COMPONENT_NAME = 'v-dialog'
    const EVENT_CONFIRM = 'confirm'
    const EVENT_CANCEL = 'cancel'
    const EVENT_CLOSE = 'close'

    const defHref = 'javascript:;'
    const defConfirmBtn = {
        text: '确定',
        active: true,
        disabled: false,
        href: defHref
    }
    const defCancelBtn = {
        text: '取消',
        active: false,
        disabled: false,
        href: defHref
    }
    const parseBtn = (btn, defBtn) => {
        if (typeof btn === 'string') {
            btn = {
                text: btn
            }
        }
        return Object.assign({}, defBtn, btn)
    }

    export default {
        name: COMPONENT_NAME,
        components: {
            VPopup
        },
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'alert'
            },
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            showClose: {
                type: Boolean,
                default: false
            },
            confirmBtn: {
                type: [Object, String],
                default() {
                    return {
                        ...defConfirmBtn
                    }
                }
            },
            cancelBtn: {
                type: [Object, String],
                default() {
                    return {
                        ...defCancelBtn
                    }
                }
            }
        },
        data() {
            return {
                defHref
            }
        },
        computed: {
            _confirmBtn() {
                return parseBtn(this.confirmBtn, defConfirmBtn)
            },
            _cancelBtn() {
                return parseBtn(this.cancelBtn, defCancelBtn)
            },
            isConfirm() {
                return this.type === 'confirm'
            },
            containerClass() {
                return `v-dialog-${this.type}`
            }
        },
        methods: {
            confirm(e) {
                if (this._confirmBtn.disabled) {
                    return
                }
                this.$emit(EVENT_CONFIRM, e)
            },
            cancel(e) {
                if (this._cancelBtn.disabled) {
                    return
                }
                this.$emit(EVENT_CANCEL, e)
            },
            close(e) {
                this.$emit(EVENT_CLOSE, e)
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-dialog-main {
        width: 270px;
        padding: 0;
        text-align: center;
        overflow: hidden;
        border-radius: 7px;
        background-color: $dialog-bgc;
    }

    .v-dialog-confirm, .v-dialog-alert {
        position: relative;
        overflow: hidden;
    }

    .v-dialog-icon {
        margin-top: 20px;
        margin-bottom: 16px;
        line-height: 1;
        color: $dialog-icon-color;
        font-size: $fontsize-large-xxx;
        i {
            display: inline-block;
            width: 30px;
            height: 30px;
            padding: 10px;
            border-radius: 50%;
            background-color: $dialog-icon-bgc;
        }

        + .v-dialog-title {
            .v-dialog-title-def {
                margin-top: 0;
            }
        }

        + .v-dialog-content {
            margin-top: -4px;
        }
    }

    .v-dialog-title {
        color: $dialog-title-color;
        font-size: $fontsize-large;
        line-height: 1;
        + .v-dialog-content {
            margin-top: 12px;
        }
    }

    .v-dialog-title-def {
        margin: 30px 16px 0;
        overflow: hidden;
        white-space: nowrap;
    }

    .v-dialog-content {
        margin: 16px 0;
        text-align: left;
        color: $dialog-color;
        font-size: $fontsize-medium;
        line-height: 22px;
    }

    .v-dialog-content-def {
        padding: 0 16px;
        > p {
            display: table;
            margin: auto;
        }

    }

    .v-dialog-confirm {
        .v-dialog-btns {
            .v-dialog-btn {
                width: 50%;
                float: left;
            }

            &.border-right-1px {
                &::after {
                    right: 50%;
                    border-color: $dialog-btns-split-color;
                }
            }
        }

    }

    .v-dialog-close {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        width: 32px;
        height: 32px;
        color: $dialog-close-color;
        font-size: $fontsize-large-x;
    }

    .v-dialog-btns {
        overflow: hidden;
        width: 100%;
        font-size: 0;
    }

    .v-dialog-btn {
        display: inline-block;
        width: 100%;
        padding: 17px 10px;
        margin: 0;
        font-size: $fontsize-large;
        line-height: 1;
        text-align: center;
        text-decoration: none;
        color: $dialog-btn-color;
        background-color: $dialog-btn-bgc;
        background-clip: padding-box;
        box-sizing: border-box;
        &:active {
            background-color: $dialog-btn-active-bgc;

        }
    }

    .v-dialog-btn_highlight {
        color: $dialog-btn-highlight-color;
        &:active {
            background-color: $dialog-btn-highlight-active-bgc;

        }
    }

    .v-dialog-btn_disabled {
        color: $dialog-btn-disabled-color;
        &:active {
            background-color: $dialog-btn-disabled-active-bgc;

        }
    }

    .v-dialog-fade-enter-active {
        animation: dialog-fadein .4s;
        .v-dialog-main {
            animation: dialog-zoom .4s;

        }
    }

    @keyframes dialog-fadein {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }

    @keyframes dialog-zoom {
        0% {
            transform: scale(0)
        }
        50% {
            transform: scale(1.1)
        }
        100% {
            transform: scale(1)
        }
    }

</style>
