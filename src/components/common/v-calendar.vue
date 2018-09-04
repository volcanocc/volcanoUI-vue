<template>
    <div class="concon">
        <div class="week">
            <span>周日</span>
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
        </div>
        <swiper :options="swiperOption">
            <swiper-slide>
                <span v-for="oneRow in oneRowDate" :specificDate="oneRow.specificDate">{{oneRow.day}}</span>
            </swiper-slide>
            <swiper-slide>
                <span v-for="towRow in towRowDate " :specificDate="towRow.specificDate">{{towRow.day}}</span>
            </swiper-slide>
            <swiper-slide>
                <span v-for="threeRow in threeRowDate" :specificDate="threeRow.specificDate">{{threeRow.day}}</span>
            </swiper-slide>
            <swiper-slide>
                <span v-for="fourRow in fourRowDate" :specificDate="fourRow.specificDate">{{fourRow.day}}</span>
            </swiper-slide>
            <swiper-slide>
                <span v-for="fiveRow in fiveRowDate" :specificDate="fiveRow.specificDate">{{fiveRow.day}}</span>
            </swiper-slide>
            <swiper-slide v-if="appear" class="2222222222">
                <span v-for="sixRow in sixRowDate" :specificDate="sixRow.specificDate">{{sixRow.day}}</span>
            </swiper-slide>
        </swiper>
    </div>
</template>


<script>
    import '../assets/css/plugin/swiper-4.1.6.min.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: 'test',
        components: {
            swiper, swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    loop: false
                },
                appear: false, // 第六排 是否出现
                myDate: null, // 当前时间
                month: null,  // 当前月
                year: null,  // 今年
                beforeJanuary: null, // 上一月
                beforeYear: null, // 上一年
                oneRowDate: [], // 第一排展示的日期
                towRowDate: [],
                threeRowDate: [],
                fourRowDate: [],
                fiveRowDate: [],
                sixRowDate: [],
                oneSpecificDate: [], // 第一排的具体日期
                towSpecificDate: [], // 第二排的具体日期
                threeSpecificDate: [], // 第三排的具体日期
                fourSpecificDate: [], // 第四排的具体日期
                fiveSpecificDate: [], // 第五排的具体日期
                zero: 0
            }
        },
        methods: {
            calendarList(year, month) {
                // this.myDate = new Date()
                // this.month = this.myDate.getMonth() + 1
                // this.year = this.myDate.getFullYear()
                let monthBeginning = new Date(year + '-' + month + '-1').getDay() // 本月1号星期几
                this.beforeJanuary = month - 1  // 上一月
                this.beforeYear = year
                if (month - 1 == 0) {
                    this.beforeJanuary = 12
                    this.beforeYear = year - 1
                }
                if (this.beforeJanuary - 10 < 0) {
                    this.beforeJanuary = '0' + this.beforeJanuary.toString()
                }
                if (month - 10 < 0) {
                    month = '0' + month.toString()
                }
                let beforeYearMonth = this.beforeYear + ',' + this.beforeJanuary + ',' + this.zero
                let newYearMonth = year + ',' + month + ',' + this.zero
                beforeYearMonth = beforeYearMonth.split(',')
                newYearMonth = newYearMonth.split(',')
                let beforeJanuaryDayNum = new Date(beforeYearMonth[0], beforeYearMonth[1], beforeYearMonth[2]).getDate() // 上一个月天数
                let newYearMonthDayNum = new Date(newYearMonth[0], newYearMonth[1], newYearMonth[2]).getDate()  // 当前月份天数
                let monthTail = []
                let tailDate = []
                let oneListDate = []
                /**
                 * 上个月未日期
                 */
                for (let i = 0; i < monthBeginning; i++) {
                    let date = {day: '', specificDate: ''}
                    date.day = beforeJanuaryDayNum - i
                    date.specificDate = this.beforeYear + '-' + this.beforeJanuary + '-' + (beforeJanuaryDayNum - i)
                    monthTail.push(beforeJanuaryDayNum - i)
                    tailDate.push(this.beforeYear + '-' + this.beforeJanuary + '-' + (beforeJanuaryDayNum - i))
                    this.oneRowDate.push(date)
                }
                /**
                 * 本月月初日期
                 */
                for (let i = 0; i < 7 - monthBeginning; i++) {
                    let date = {day: '', specificDate: ''}
                    let dateDay = i + 1
                    date.day = i + 1
                    if (dateDay - 10 < 0) {
                        dateDay = '0' + dateDay.toString()
                    }
                    date.specificDate = year + '-' + month + '-' + dateDay
                    this.oneRowDate.unshift(date)
                }
                this.oneRowDate = this.oneRowDate.reverse()
                /**
                 * 第二排
                 */
                let twoStartDate = 7 - monthBeginning
                let twoEndDate = twoStartDate + 7
                for (let i = twoStartDate; i < twoEndDate; i++) {
                    let date = {day: '', specificDate: ''}
                    let dateDay = i + 1
                    date.day = i + 1
                    if (dateDay - 10 < 0) {
                        dateDay = '0' + dateDay.toString()
                    }
                    date.specificDate = year + '-' + month + '-' + dateDay
                    this.towRowDate.push(date)
                }
                /**
                 * 第三排
                 */
                let threeEndDate = twoEndDate + 7
                for (let i = twoEndDate; i < threeEndDate; i++) {
                    let date = {day: '', specificDate: ''}
                    let dateDay = i + 1
                    date.day = i + 1
                    if (dateDay - 10 < 0) {
                        dateDay = '0' + dateDay.toString()
                    }
                    date.specificDate = year + '-' + month + '-' + dateDay
                    this.threeRowDate.push(date)
                }
                /**
                 * 第四排
                 */
                let fourEndDate = threeEndDate + 7
                if (newYearMonthDayNum - fourEndDate > 0) {
                    for (let i = threeEndDate; i < fourEndDate; i++) {
                        let date = {day: '', specificDate: ''}
                        let dateDay = i + 1
                        date.day = i + 1
                        if (dateDay - 10 < 0) {
                            dateDay = '0' + dateDay.toString()
                        }
                        date.specificDate = year + '-' + month + '-' + dateDay
                        this.fourRowDate.push(date)
                    }
                }
                /**
                 * 第五排
                 */
                let fiveEndDate = fourEndDate + 7
                if (newYearMonthDayNum - fiveEndDate >= 0) {
                    for (let i = fourEndDate; i < fiveEndDate; i++) {
                        let date = {day: '', specificDate: ''}
                        let dateDay = i + 1
                        date.day = i + 1
                        if (dateDay - 10 < 0) {
                            dateDay = '0' + dateDay.toString()
                        }
                        date.specificDate = year + '-' + month + '-' + dateDay
                        this.fiveRowDate.push(date)
                    }
                } else {
                    let siyuetian = new Date(year, month, 0).getDate()  // 当前月份天数
                    let tailDateWeek = new Date(year + '-' + month + '-' + siyuetian).getDay() // 月末星期几
                    for (let i = 0; i < tailDateWeek + 1; i++) {
                        let date = {day: '', specificDate: ''}
                        date.day = siyuetian - i
                        let nextMonth
                        let nextYear
                        if (month == 12) {
                            nextMonth = '01'
                        } else {
                            nextMonth = month
                        }
                        (nextMonth == 1) ? nextYear = (parseInt(year) + 1) : nextYear = year
                        date.specificDate = year + '-' + month + '-' + date.day
                        this.fiveRowDate.push(date)
                    }
                    this.fiveRowDate.reverse()
                    for (let i = 0; i < 6 - tailDateWeek; i++) {
                        let date = {day: '1', specificDate: '1'}
                        date.day = i + 1
                        let nextMonth
                        let nextYear
                        if (month == 12) {
                            nextMonth = '01'
                        } else {
                            nextMonth = month
                        }
                        (nextMonth == 1) ? nextYear = (parseInt(year) + 1) : nextYear = year
                        date.specificDate = nextYear + '-' + nextMonth + '-0' + date.day    // 因为最多显示6个下个月的时间，所以不需要经过判断加‘0
                        this.fiveRowDate.push(date)
                    }
                }
                /**
                 * 第六排
                 */
                let sixEndDate = fiveEndDate + 7
                // 当月的总天数减去第五排的最后一位数大于0的情况下第六排才显示
                if (newYearMonthDayNum - fiveEndDate > 0) {
                    this.appear = true
                    let siyuetian = new Date(year, month, 0).getDate()  // 当前月份天数
                    let tailDateWeek = new Date(year + '-' + month + '-' + siyuetian).getDay() // 月末星期几
                    for (let i = 0; i < tailDateWeek + 1; i++) {
                        let date = {day: '', specificDate: ''}
                        date.day = siyuetian - i
                        date.specificDate = year + '-' + month + '-' + date.day
                        this.sixRowDate.push(date)
                    }
                    this.sixRowDate.reverse()
                    for (let i = 0; i < 6 - tailDateWeek; i++) {
                        let date = {day: '', specificDate: ''}
                        date.day = i + 1
                        let nextMonth
                        let nextYear
                        if (month == 12) {
                            nextMonth = '01'
                        } else {
                            nextMonth = month
                        }
                        (nextMonth == 1) ? nextYear = (parseInt(year) + 1) : nextYear = year
                        date.specificDate = nextYear + '-' + nextMonth + '-0' + date.day    // 因为最多显示6个下个月的时间，所以不需要经过判断加‘0
                        this.sixRowDate.push(date)
                    }
                }
                console.log(newYearMonthDayNum)
                console.log(this.oneRowDate)
                console.log(this.oneRowDate.length)
                console.log(this.oneSpecificDate)
                console.log(monthTail.reverse())
                console.log(monthBeginning)
                console.log(this.beforeJanuary)
                console.log(beforeJanuaryDayNum)
                console.log(this.myDate)
                console.log(month)
                console.log(year)
            },
            currentTime() {
                var myDate = new Date()
                var newMonth = myDate.getMonth() + 1
                var newYear = myDate.getFullYear()
                this.year = newYear
                this.month = newMonth
                this.calendarList(2018, 12)
            },
            nextMonth() {
                let year = this.year
                let month = this.month + 1
                if (month == 12) {
                    year = year + 1
                    return year
                }
                this.calendarList(year, month)
            }
        },
        mounted() {
            this.currentTime()
        }
    }
</script>

<style scoped>
    .concon {
        margin: 20px 0;
    }

    .week {
        width: 100%;
        height: 45px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: nowrap;
    }

    .week span {
        text-align: center;
        line-height: 45px;
        font-size: 26px;
        flex: 7;
    }

    .swiper-slide {
        width: 100%;
        height: 84px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-wrap: nowrap;
    }

    .swiper-slide span {
        text-align: center;
        line-height: 84px;
        font-size: 34px;
        color:$color-font-master;
        flex: 7;
    }

</style>
