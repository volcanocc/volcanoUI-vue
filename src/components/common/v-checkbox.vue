<template>
    <div class="v-checkbox" :class="_containerClass" :data-pos="position">
        <label class="v-checkbox-wrap" :class="_wrapClass">
            <input class="v-checkbox-input" type="checkbox" :disabled="disabled" v-model="checkValue">
            <span class="v-checkbox-ui">
                <i class="v-checkbox-ic"></i>
            </span>
            <slot></slot>
        </label>
    </div>
</template>
<script>
    const COMPONENT_NAME = 'v-checkbox'

    const EVENT_INPUT = 'input'
    const EVENT_CHECKED = 'checked'
    const EVENT_CANCLE_CHECKED = 'cancel-checked'

    export default {
        name: COMPONENT_NAME,
        props: {
            value: {
                type: [Boolean, String],
                require: true
            },
            label: {
                type: [Boolean, String, Number]
            },
            item: {
                type: [Object]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'left'
            }
        },
        data() {
            const parent = this.$parent
            const isInGroup = parent.$data._checkboxGroup
            const isInHorizontalGroup = isInGroup && parent.$props.horizontal
            return {
                isInGroup,
                isInHorizontalGroup
            }
        },
        computed: {
            checkValue: {
                get() {
                    if (this.isInGroup) {
                        return this.$parent.value.indexOf(this.label) > -1
                    } else {
                        return Boolean(this.value)
                    }
                },
                set(newValue) {
                    const emitValue = this.label && newValue ? this.label : newValue
                    const parentEmitEvent = newValue ? EVENT_CHECKED : EVENT_CANCLE_CHECKED
                    this.$emit(EVENT_INPUT, emitValue)
                    if (this.isInGroup) {
                        this.$parent.$emit(parentEmitEvent, this.label || newValue)
                    }
                }
            },
            _containerClass() {
                if (this.isInHorizontalGroup) {
                    return 'border-right-1px'
                }
            },
            _wrapClass() {
                const isInHorizontalGroup = this.isInHorizontalGroup
                return {
                    'v-checkbox_checked': this.checkValue,
                    'v-checkbox_disabled': this.disabled,
                    'border-bottom-1px': this.isInGroup && !isInHorizontalGroup
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    $ui-width: 1.42em;
    .v-checkbox {
        position: relative;
        /*padding: 0 16px;*/
        text-align: left;
        font-size: 100%;
        color: $checkbox-color;
        background-color: $checkbox-bgc;
        &[data-pos="right"] {
            .v-checkbox-wrap {
                padding-left: 0;
                padding-right: $ui-width;
            }

            .v-checkbox-ui {
                left: auto;
                right: 0;
            }

        }

    }

    .v-checkbox-wrap {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        line-height: 1.5;
        /*word-break: break-word;*/
        word-wrap: break-word;
    }

    .v-checkbox-input {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .v-checkbox-ui {
        position: relative;
        width: 22px;
        height: 22px;
        margin-right: $ui-width - 1em;
        line-height: 1;
        border-radius: 50%;
        &::before, i {
            transition: all .2s;
        }
        &::before {
            color: $checkbox-icon-color;
            display: inline-block;
            transform: scale(1.2);
        }

        i {
            display: inline-block;
            content: '';
            width: 22px;
            height: 22px;
            position: absolute;
            top: 0;
            left: 0;
            color: transparent;
        }

        .v-checkbox-ic {
            background: url("../../assets/images/select@3x.png") no-repeat;
            background-size: cover;
        }

    }

    .v-checkbox_checked {
        .v-checkbox-ui {
            &::before {
                color: transparent;
            }
            .v-checkbox-ic {
                background: url("../../assets/images/select-s@3x.png") no-repeat;
                background-size: cover;
            }

        }

    }

    .v-checkbox_disabled {
        .v-checkbox-ui {
            background-color: $checkbox-disabled-icon-bgc;
            &::before, i {
                transition: none;

            }
            &::before {
                color: transparent;

            }
            i {
                color: $checkbox-disabled-icon-color;

            }
        }

    }

    .v-checkbox_checked.v-checkbox_disabled {
        .v-checkbox-ui {
            background-color: $checkbox-checked-icon-bgc;
        }
    }

    .head-portrait {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        float: left;
        text-align: center;
        line-height: 34px;
        font-size: 13px;
        border: 1px solid #ccc;
        margin-right: 30px;
    }

    .people-name {
        font-size: $fontsize-large-x;
        color: $color-font-master;
        line-height: 51px;
        margin-right: 8px;
    }

    .people-department {
        font-size: $fontsize-large;
        color: $color-font-light;
        line-height: 51px;
    }

</style>
