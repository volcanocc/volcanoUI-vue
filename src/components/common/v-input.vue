<template>
    <div class="v-input">
        <div class="v-input-content">
            <label v-if="title !== ''" :style="{textAlign: align}">
                <span v-if="required" class="required">*</span>
                {{title}}
            </label>
            <div class="input-control" :class="{'v-input_active': isFocus}" :style="{width:width}">
                <input
                        class="v-input-field"
                        ref="input"
                        v-model="inputValue"
                        v-bind="$props"
                        :class="size"
                        :type="_type"
                        :disabled="disabled"
                        :readonly="readonly"
                        :autocomplete="autocomplete"
                        :autofocus="autofocus"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="changeHander"
                />
                <div class="v-input-append" v-if="$slots.append || _showClear || _showPwdEye">
                    <div class="v-input-clear" v-if="_showClear" @click="handleClear">
                        <i class="cubeic-wrong"></i>
                    </div>
                    <div class="v-input-eye" v-if="_showPwdEye" @click="handlePwdEye">
                        <i :class="eyeClass"></i>
                    </div>
                    <slot name="append"></slot>
                </div>
            </div>
        </div>

        <span v-if="tips" class="tips" :style="{width:width, marginLeft: lablewidth}">
            <slot name="tips"></slot>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    const COMPONENT_NAME = 'v-input'
    const EVENT_INPUT = 'input'
    const EVENT_CHANGE = 'change'
    const EVENT_BLUR = 'blur'
    const EVENT_FOCUS = 'focus'

    export default {
        name: COMPONENT_NAME,
        props: {
            value: [String, Number],
            title: {
                type: [String, Number],
                default: ''
            },
            align: {
                type: String,
                default: 'left'
            },
            required: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text'
            },
            width: {
                type: String,
                default: '180px'
            },
            lablewidth: {
                type: String,
                default: '100px'
            },
            size: {
                type: String,
                default: ''
            },
            tips: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: String,
            readonly: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                type: [Boolean, String],
                default: false
            },
            name: String,
            id: String,
            form: String,
            minlength: Number,
            maxlength: Number,
            resize: String,
            min: Number,
            max: Number,
            step: Number,
            tabindex: String,
            clearable: {
                type: Boolean,
                default: false
            },
            eye: {
                type: [Boolean, Object],
                default: false
            }
        },
        data() {
            return {
                inputValue: this.value,
                isFocus: false,
                formatedEye: {
                    open: false,
                    reverse: false
                }
            }
        },
        computed: {
            _type() {
                const type = this.type
                if (type === 'password' && this.eye && this.pwdVisible) {
                    return 'text'
                }
                return type
            },
            _showClear() {
                return this.clearable && this.inputValue && !this.readonly && !this.disabled
            },
            _showPwdEye() {
                return this.type === 'password' && this.eye && !this.disabled
            },
            pwdVisible() {
                const eye = this.formatedEye
                return eye.reverse ? !eye.open : eye.open
            },
            eyeClass() {
                return this.formatedEye.open ? 'cubeic-eye-visible' : 'cubeic-eye-invisible'
            }
        },
        watch: {
            value(newValue) {
                this.inputValue = newValue
            },
            inputValue(newValue) {
                this.$emit(EVENT_INPUT, newValue)
            },
            eye: {
                handler() {
                    this.formateEye()
                },
                immediate: true
            }
        },
        methods: {
            changeHander(e) {
                this.$emit(EVENT_CHANGE, e)
            },
            formateEye() {
                if (typeof this.eye === 'boolean') {
                    this.formatedEye.open = this.eye
                } else {
                    Object.assign(this.formatedEye, this.eye)
                }
            },
            handleFocus(e) {
                this.$emit(EVENT_FOCUS, e)
                this.isFocus = true
            },
            handleBlur(e) {
                this.$emit(EVENT_BLUR, e)
                this.isFocus = false
            },
            handleClear(e) {
                this.inputValue = ''
                this.$refs.input.focus()
            },
            handlePwdEye() {
                this.formatedEye.open = !this.formatedEye.open
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-input {
        @include clearfix;

        .v-input-content {
            @include clearfix;
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

        .tips{
            float: left;
            font-size: $fontsize-small;
            color: $color-font-tips;
            padding: 2px 0;
        }

        .required {
            color: $color-danger;
        }
    }

    .input-control {
        float: left;
        font-size: $fontsize-small;
        background-color: $input-bgc;
        @include border-1px($input-border-color);
    }

    .v-input-field {
        display: block;
        width: 100%;
        padding: 0 6px;
        height: 32px;
        line-height: 32px;
        box-sizing: border-box;
        color: $input-color;
        background-color: inherit;
        border-radius: 2px;
        outline: none;
        &::-webkit-input-placeholder {
            color: $input-placeholder-color !important;
            text-overflow: ellipsis;
        }

        + .v-input-append {
            margin-left: -5px;
        }

        &.large {
            height: 38px;
            line-height: 38px;
        }

        &.small {
            height: 22px;
            line-height: 22px;
        }
    }

    .v-input_active {
        &::after {
            border-color: $input-focus-border-color
        }
    }

    .v-input-prepend, .v-input-append {
        display: flex;
        align-items: center;
    }

    .v-input-prepend {
        + .v-input-field {
            margin-left: -5px;
        }
    }

    .v-input-clear, .v-input-eye {
        width: 1em;
        height: 1em;
        line-height: 1;
        padding: 10px;
        box-sizing: content-box;
        color: $input-clear-icon-color;
        > i {
            display: inline-block;
            transform: scale(1.2);
        }
    }

    .v-input-eye {
        > .cubeic-eye-invisible, .cubeic-eye-visible {
            transform: scale(1.4);
        }
    }

</style>
