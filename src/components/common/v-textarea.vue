<template>
    <div class="v-textarea">
        <div class="v-textarea-content">
            <label v-if="title !== ''" :style="{textAlign: align, width: lablewidth}">
                <span v-if="required" class="required">*</span>
                {{title}}
            </label>
            <div class="textarea-control" :class="{'v-textarea_active': isFocus}" :style="{width:width}">
            <textarea
                    class="v-textarea-field"
                    :rows="rows"
                    ref="textarea"
                    v-model="textareaValue"
                    :disabled="disabled"
                    :readonly="readonly"
                    :autocomplete="autocomplete"
                    :autofocus="autofocus"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="changeHander"
            ></textarea>
            </div>
        </div>
        <span v-if="tips" class="tips" :style="{width:width, marginLeft: lablewidth}">
            <slot name="tips"></slot>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    const COMPONENT_NAME = 'v-textarea'
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
            width: {
                type: String,
                default: '180px'
            },
            lablewidth: {
                type: String,
                default: '100px'
            },
            rows: {
                type: String,
                default: '4'
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
        },
        data() {
            return {
                textareaValue: this.value,
                isFocus: false,
                formatedEye: {
                    open: false,
                    reverse: false
                }
            }
        },
        computed: {

        },
        watch: {
            value(newValue) {
                this.textareaValue = newValue
            },
            textareaValue(newValue) {
                this.$emit(EVENT_INPUT, newValue)
            }
        },
        methods: {
            changeHander(e) {
                this.$emit(EVENT_CHANGE, e)
            },
            handleFocus(e) {
                this.$emit(EVENT_FOCUS, e)
                this.isFocus = true
            },
            handleBlur(e) {
                this.$emit(EVENT_BLUR, e)
                this.isFocus = false
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/common/styles/variables.scss";
    @import "../../assets/common/styles/mixin.scss";

    .v-textarea {
        @include clearfix;

        label {
            float: left;
            height: 32px;
            line-height: 32px;
            padding: 0 8px;
            color: $color-font-master;
            font-size: $fontsize-small;
            box-sizing: border-box;
            @include text-overflow;
        }

        .v-textarea-content {
            @include clearfix;
        }

        .required {
            color: $color-danger;
        }

        .tips {
            float: left;
            font-size: $fontsize-small;
            color: $color-font-tips;
            padding: 2px 0;
        }
    }

    .textarea-control {
        float: left;
        font-size: $fontsize-small;
        background-color: $textarea-bgc;
        @include border-1px($textarea-border-color);
    }

    .v-textarea-field {
        display: block;
        width: 100%;
        padding: 6px;
        box-sizing: border-box;
        color: $textarea-color;
        background-color: inherit;
        border-radius: 2px;
        outline: none;
        border: none;
        resize: vertical;

        &::-webkit-input-placeholder {
            color: $textarea-placeholder-color !important;
            text-overflow: ellipsis;
        }

        + .v-textarea-append {
            margin-left: -5px;
        }
    }

    .v-textarea_active {
        &::after {
            border-color: $textarea-focus-border-color
        }
    }

</style>
