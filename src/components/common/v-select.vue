<template>
    <!--下拉单选框-->
    <div class='v-select'>
        <div class="v-select-content" v-clickoutside="closeList">
            <label v-if="title !== ''" :style="{textAlign: align}">
                <span v-if="required" class="required">*</span>
                {{title}}
            </label>
            <div class="v-select-control" :class="{'v-select_active': showList}" :style='{width: width}'
                 @click='listHandle'>
                <div class='v-select-text'>
                    {{val.text}}
                </div>
                <i class="arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 24 22" fill="none"
                         stroke="#c5c5c5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </i>
                <ul class='v-select-list'
                    :style='{width: width, maxHeight: height, top: posTop + "px", left: offsetLeft + "px"}'
                    v-if='showList'>
                    <vue-scroll>
                        <li class='v-select-item' :class="[item.value === val.value? 'v-select-item_active' : '']"
                            v-for='(item, index) in options' @click.stop='select(item, index)'
                            :key="item.index">
                            {{item.text}}
                        </li>
                    </vue-scroll>
                </ul>
            </div>
        </div>

        <span v-if="tips" class="tips" :style="{width:width, marginLeft: lablewidth}">
            <slot name="tips"></slot>
        </span>

    </div>
</template>

<script>
    import clickoutside from '../../directive/clickOutSide'

    export default {
        name: 'v-select',
        directives: {
            clickoutside
        },
        data() {
            return {
                showList: false,
                offsetTop: 0,
                offsetLeft: 0,
                posTop: 0
            }
        },
        props: {
            options: {
                type: Array,
                default: () => []
            },
            title: {
                type: [String, Number],
                default: ''
            },
            align: {
                type: String,
                default: 'left'
            },
            tips: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            val: {
                type: Object,
                default: () => ({text: '', value: ''})
            },
            width: {
                type: String,
                default: '180px'
            },
            lablewidth: {
                type: String,
                default: '100px'
            },
            height: {
                type: String,
                default: '160px'
            },
            parentScroll: {
                type: Number,
                default: 0
            }

        },
        computed: {},
        watch: {
            parentScroll(newVal, oldVal) {
                this.posTop = this.offsetTop - newVal
            }
        },
        methods: {
            listHandle(e) {
                this.offsetTop = this.offset(e.target).top + 34
                this.offsetLeft = this.offset(e.target).left - 9
                if (this.parentScroll === 0) {
                    this.posTop = this.offsetTop
                } else {
                    this.posTop = this.offsetTop - this.parentScroll
                }

                this.showList = !this.showList
            },
            select(item, index) {
                this.showList = false
                this.val.value = item.value
                this.val.text = item.text
                this.$emit('select', this.val)
            },
            closeList() {
                this.showList = false
            },
            offset(target) {
                let top = 0, left = 0
                while (target.offsetParent) {
                    top += target.offsetTop
                    left += target.offsetLeft
                    target = target.offsetParent
                }
                return {
                    top: top,
                    left: left
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-select {
        @include clearfix;

        .v-select-content {
            @include clearfix;
        }

        .arrow {
            position: absolute;
            top: 0;
            right: 5px;
            width: 22px;
            height: 100%;
            cursor: pointer;

            svg {
                position: absolute;
                top: 50%;
                margin-top: -10px;
            }
        }

        label {
            float: left;
            width: 100px;
            height: 32px;
            line-height: 32px;
            padding: 0 8px;
            color: $color-font-master;
            font-size: $fontsize-small;
            box-sizing: border-box;
            @include text-overflow;
        }

        .required {
            color: $color-danger;
        }

        .tips {
            float: left;
            font-size: $fontsize-small;
            color: $color-font-tips;
            padding: 2px 0;
            font-weight: 200;
        }

        .v-select-control {
            position: relative;
            float: left;
            height: 32px;
            line-height: 32px;
            color: $select-color;
            font-size: $fontsize-small;
            padding: 0 10px;
            box-sizing: border-box;
            background-color: $color-background-dark;
            @include border-1px($select-border-color);
        }

        .v-select-text {
            cursor: pointer;
        }

        .v-select-list {
            position: fixed !important;
            background-color: $select-bgc;
            z-index: 9;
        }

        .v-select-item {
            position: relative;
            width: auto;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            font-size: $fontsize-small;
            text-align: left;
            cursor: pointer;
            @include text-overflow;

            &:hover {
                background-color: $select-hover-bgc;
            }
        }

        .v-select-item_active {
            color: $color-dark-orange;
        }
    }

    .v-select_active {
        &::after {
            border-color: $select-border-active-color !important;
        }
    }
</style>
