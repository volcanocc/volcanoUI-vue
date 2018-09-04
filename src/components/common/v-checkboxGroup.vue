<template>
    <div class="v-checkbox-group" ref="group" :class="groupClass" :data-horz="horizontal">
        <slot></slot>
    </div>
</template>
<script>
    const COMPONENT_NAME = 'v-checkbox-group'

    const EVENT_INPUT = 'input'
    const EVENT_CHECKED = 'checked'
    const EVENT_CANCLE_CHECKED = 'cancel-checked'

    export default {
        name: COMPONENT_NAME,
        props: {
            value: {
                type: Array,
                require: true
            },
            horizontal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                _value: [],
                _checkboxGroup: true
            }
        },
        computed: {
            groupClass() {
                if (!this.horizontal) {
                    return 'border-top-1px border-bottom-1px'
                }
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue, oldValue) {
                    this._value = this.value.concat()
                }
            }
        },
        mounted() {
            this.$on(EVENT_CHECKED, function (value) {
                this._value.push(value)
                this.$emit(EVENT_INPUT, this._value)
            })
            this.$on(EVENT_CANCLE_CHECKED, function (value) {
                let index = this._value.indexOf(value)
                this._value.splice(index, 1)
                this.$emit(EVENT_INPUT, this._value)
            })
        }
    }
</script>
<style lang="scss">
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-checkbox-group {
        z-index: 1;
        overflow: hidden;
        .v-checkbox {
            &:last-child {
                .v-checkbox-wrap {
                    @include border-none;
                }
            }

        }

    }

    .v-checkbox-group[data-horz="true"] {
        display: flex;
        padding-left: 0;
        @include border-1px($checkbox-group-horizontal-bdc, 2px);
        border-radius: 2px;
        .v-checkbox {
            @include flex-fix;
            text-align: center;
            padding-left: 10px;
            padding-right: 10px;
            &:after {
                border-color: $checkbox-group-horizontal-bdc;

            }
            &:last-child {
                @include border-none();

            }
        }

        .v-checkbox-wrap {
            display: inline-flex;
            width: auto;
        }

    }

</style>
