<template>
    <div class="v-player">
        <video class="v-player-video" ref="video"></video>
    </div>
</template>

<script>
    import Hls from 'hls.js'

    const DEFAULT_EVENTS = [
        'loadeddata',
        'canplay',
        'canplaythrough',
        'play',
        'pause',
        'waiting',
        'playing',
        'ended',
        'error'
    ]

    export default {
        name: 'v-player',
        components: {},
        props: {
            start: {
                type: Number,
                default: 0
            },
            crossOrigin: {
                type: String,
                default: ''
            },
            playsinline: {
                type: Boolean,
                default: false
            },
            customEventName: {
                type: String,
                default: 'statechanged'
            },
            options: {
                type: Object,
                required: true
            },
            events: {
                type: Array,
                default: () => []
            },
            globalOptions: {
                type: Object,
                default: () => ({
                    // autoplay: false,
                    controls: true,
                    // preload: 'auto',
                    // fluid: false,
                    // muted: false,
                    controlBar: {
                        remainingTimeDisplay: false,
                        playToggle: {},
                        progressControl: {},
                        fullscreenToggle: {},
                        volumeMenuButton: {
                            inline: false,
                            vertical: true
                        }
                    },
                    techOrder: ['html5'],
                    plugins: {}
                })
            },
            globalEvents: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                player: null
            }
        },
        computed: {},
        methods: {
            initialize() {
                // videojs options
                const videoOptions = Object.assign({}, this.globalOptions, this.options)

                if (this.playsinline) {
                    this.$refs.video.setAttribute('playsinline', this.playsinline)
                    this.$refs.video.setAttribute('webkit-playsinline', this.playsinline)
                    this.$refs.video.setAttribute('x5-playsinline', this.playsinline)
                    this.$refs.video.setAttribute('x5-video-player-type', 'h5')
                    this.$refs.video.setAttribute('x5-video-player-fullscreen', false)
                }

                if (this.crossOrigin !== '') {
                    this.$refs.video.crossOrigin = this.crossOrigin
                    this.$refs.video.setAttribute('crossOrigin', this.crossOrigin) 
                }

                this.$refs.video.setAttribute('width', videoOptions.width)
                this.$refs.video.setAttribute('height', videoOptions.height)

                // emit event
                const emitPlayerState = (event, value) => {
                    if (event) {
                        this.$emit(event, this.player)
                    }
                    if (value) {
                        this.$emit(this.customEventName, {[event]: value})
                    }
                }

                // videoOptions
                console.log('videoOptions', videoOptions)

                // player
                const self = this
                this.player = this.$refs.video

                const events = DEFAULT_EVENTS.concat(self.events).concat(self.globalEvents)

                // watch events
                const onEdEvents = {}
                for (let i = 0; i < events.length; i++) {
                    if (typeof events[i] === 'string' && onEdEvents[events[i]] === undefined) {
                        (event => {
                            onEdEvents[event] = null
                            this.player.addEventListener(event, () => {
                                emitPlayerState(event, true)
                            })
                        })(events[i])
                    }
                }

                var hls = new Hls()
                hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8')
                hls.attachMedia(this.player)

                // watch timeupdate
                // this.on('timeupdate', function () {
                //     emitPlayerState('timeupdate', this.currentTime())
                // })

                // player readied
                self.$emit('ready', this)
            }
        },
        mounted() {
            if (!this.player) {
                this.initialize()
            }
        }
    }
</script>

<style scoped lang="scss">
    .v-player {
        position: relative;
        height: 100%;
    }

    .v-player-video {

    }
</style>
