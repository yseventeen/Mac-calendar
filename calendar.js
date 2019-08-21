let currentDate = function (date) {
    if (date == undefined || date == null) date = new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
    }
}

// 维护一个全局的年月对象,初始值为今天
let QDate = {
    year: currentDate().year,
    month: currentDate().month,
    day: currentDate().day,
    prevMonth: function () {
        if (this.month === 0) {
            this.year--;
            this.month = 11;
        } else {
            this.month--;
        }
    },
    laterMonth: function () {
        if (this.month === 11) {
            this.year++;
            this.month = 0;
        } else {
            this.month++
        }
    },
    current: function () {
        this.year = currentDate().year,
            this.month = currentDate().month,
            this.day = currentDate().day
    }
}


// 渲染星期
const weeks = "日一二三四五六".split('')
let weekTexts = document.querySelector('#calendar .weeks .week-texts');
let weeksDom = []
for (let w of weeks.values()) { // 使用es6 的 values()遍历，直接获取值，比遍历键然后再取值节省性能
    weeksDom.push("<div>周" + w + "</div>")
}
weekTexts.innerHTML = weeksDom.join('')

// 渲染day
// 本月有几天，本月的第一天是星期几，前面空几个
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// 填充数字
function drawData(qdate) {
    if (!qdate) qdate = QDate

    // 渲染今天年月
    let weekCur = document.querySelector('#calendar .weeks .week-cur');
    let weekCurDom = '<span class="cur">' + qdate.year + '年' + (qdate.month + 1) + '月</span><div class="cur-box"><div id="prevMonth" onclick=btnEvent("prevMonth")> < </div><div id="now" onclick=btnEvent("now")>今天</div><div id="laterMonth" onclick=btnEvent("laterMonth")> > </div></div>'
    weekCur.innerHTML = weekCurDom

    // 前面空几天
    let year = qdate.year,
        month = qdate.month,
        day = qdate.day,
        monthOneWeekend = new Date(year, month, 1).getDay(),
        monthday = monthDays[month]
    let prevSpace = monthOneWeekend === 7 ? 0 : monthOneWeekend
    // 渲染主体数据 
    // 将框和文字一起渲染？框和文字分开渲染？
    // 选前者
    let mains = document.querySelector('.mains')
    mains.innerHTML = ""
    let dayDom = [],
        dayClaz = 'day'

    function claz(claz, i) {
        return i != 0 && i % 7 == 0 ? dayClaz + ' clear-border-right' : dayClaz // 清除边框
    }

    function numClaz(currentDay) { // 判断是否是今天
        return year === (currentDate().year) && month === (currentDate().month) && currentDay === (currentDate().day) ? "current-num" : ""
    }
    // 空白
    for (let i = 0; i < prevSpace; i++) {
        clazs = claz(claz, i + 1)
        dayDom.push('<div class="' + clazs + '"></div>')
    }
    // 主体
    for (let i = 1; i < monthday + 1; i++) {
        clazs = claz(claz, i + prevSpace)
        dayDom.push('<div class="' + clazs + '"><div><span class="num ' + numClaz(i) + '">' + i + '</span><span>日</span></div></div>')
        // dayDom.push('<div class="' + clazs + '">'+i+'</div>')
    }
    // 剩余空白
    for (let i = 0; i < (42 - monthday - prevSpace); i++) {
        clazs = claz(claz, i + monthday + prevSpace + 1)
        dayDom.push('<div class="' + clazs + '"></div>')
    }

    mains.innerHTML = dayDom.join('')
}

window.onload = function () {
    drawData(QDate)
}


function btnEvent(btnName) {
    switch (btnName) {
        case 'prevMonth':
            QDate.prevMonth()
            drawData(QDate)
            break
        case 'laterMonth':
            QDate.laterMonth()
            drawData(QDate)
            break
        case 'now':
            QDate.current()
            drawData(QDate)
            break
        default:
            break
    }
}