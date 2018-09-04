<template>
    <transition name="v-action-sheet-fade">
        <v-popup
                type="action-sheet"
                :class="{'v-action-sheet_picker': pickerStyle}"
                :center="false"
                :mask="true"
                v-show="isVisible"
                @touchmove.prevent="noop"
                @click="cancel">
            <transition name="v-action-sheet-move">
                <div class="v-action-sheet-panel cube-safe-area-pb" v-show="isVisible" @click.stop="noop">
                    <h1 class="v-action-sheet-title border-bottom-1px" v-show="pickerStyle || title">{{title}}</h1>
                    <div class="v-action-sheet-content">
                        <ul class="v-action-sheet-list">
                            <li class="v-action-sheet-item border-bottom-1px"
                                v-for="(item, index) in data"
                                :data-align="item.align"
                                :class="[ item.class || '', index === active ? 'v-action-sheet-item_active': '']"
                                v-html="item.content"
                                @click="itemClick(item, index)"></li>
                        </ul>
                    </div>
                    <div class="v-action-sheet-space"></div>
                    <div class="v-action-sheet-cancel" @click="cancel"><span>取消</span></div>
                </div>
            </transition>
        </v-popup>
    </transition>
</template>

<script type="text/ecmascript-6">
    import VPopup from './v-popup'

    const EVENT_SELECT = 'select'
    const EVENT_CANCEL = 'cancel'

    export default {
        name: 'v-actionSheet',
        components: {
            VPopup
        },
        props: {
            isVisible: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            active: {
                type: Number,
                default: -1
            },
            title: {
                type: String,
                default: ' '
            },
            pickerStyle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            noop() {
            },
            cancel() {
                this.$emit(EVENT_CANCEL)
            },
            itemClick(item, index) {
                this.$emit(EVENT_SELECT, item, index)
            }

        }

    }
</script>

<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-action-sheet-fade-enter, .v-action-sheet-fade-leave-active {
        opacity: 0;

    }

    .v-action-sheet-fade-enter-active, .v-action-sheet-fade-leave-active {

        transition: all .3s ease-in-out;
    }

    .v-action-sheet-panel {
        text-align: center;
        font-size: $fontsize-medium;
        background-color: $action-sheet-bgc;
    }

    .v-action-sheet-move-enter, .v-action-sheet-move-leave-active {

        transform: translate3d(0, 100%, 0);
    }

    .v-action-sheet-move-enter-active, .v-action-sheet-move-leave-active {

        transition: all .3s ease-in-out;
    }

    .v-action-sheet-cancel {

        background-color: $action-sheet-bgc;
    }

    .v-action-sheet-cancel span, .v-action-sheet-title, .v-action-sheet-item {
        display: block;
        padding: 17px 16px;
        margin: 0;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        font-size: $fontsize-large;
        font-weight: normal;
        line-height: 1;
        color: $action-sheet-color;
        background-color: $action-sheet-bgc;

    }

    .v-action-sheet-cancel span, .v-action-sheet-item {
        &:active {
            background-color: $action-sheet-active-bgc;

        }

    }

    .v-action-sheet-title {
        padding-top: 16px;
        padding-bottom: 16px;
        color: $action-sheet-title-color;
        font-size: $fontsize-large-x;

    }

    .v-action-sheet-content {
        overflow: hidden;
        background: $action-sheet-bgc;

    }

    .v-action-sheet-list {
        list-style: none;

    }

    .v-action-sheet-item {
        list-style: none;
        user-select: none;
        &:last-of-type {
            @include border-none()

        }
        &[data-align="left"] {
            text-align: left;

        }
        &[data-align="right"] {
            text-align: right;

        }

    }

    .v-action-sheet-space {
        height: 6px;
        background-color: $action-sheet-space-bgc;
    }

    .v-action-sheet-item_active {
        color: $action-sheet-active-color;

    }

    .v-action-sheet_picker {
        .v-action-sheet-space {
            height: 0;

        }
        .v-action-sheet-title {
            height: 1em;
            padding-top: 21px;
            padding-bottom: 21px;
        }

        .v-action-sheet-cancel {
            position: absolute;
            top: 0;
            background-color: transparent;
            span {
                padding-top: 23px;
                padding-bottom: 23px;
                color: $action-sheet-picker-cancel-color;
                font-size: $fontsize-medium;
                background-color: transparent;
                &:active {
                    color: $action-sheet-picker-cancel-active-color;
                    background-color: transparent;
                }

            }

        }

    }

</style>
