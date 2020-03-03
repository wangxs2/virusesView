<template>
  <span />
</template>

<script>
import { CountUp } from 'countup.js'
export default {
  name: 'Icountup',
  __countup__: CountUp,
  props: {
    // 每间隔多少秒执行
    interval: {
      type: Number,
      required: false,
      default: 10000
    },
    // 显示数字
    endVal: {
      required: true,
      default: 0
    },
    // 小数点位数
    decimalPlaces: {
      type: Number,
      required: true,
      default: 0
    },
    // 是否数字分组
    useGrouping: {
      type: Boolean,
      required: false,
      default: false
    },
    // 分组符号
    separator: {
      type: String,
      required: false,
      default: ','
    },
    // 数字前的文本
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    // 数字后的文本
    suffix: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      instance: null,
      clearTime: null
    }
  },
  watch: {
    endVal: function () {
      this.update()
    }
  },
  mounted () {
    this.create()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    create () {
      const dom = this.$el
      const options = {
        decimalPlaces: this.decimalPlaces,
        useGrouping: this.useGrouping,
        separator: this.separator,
        prefix: this.prefix,
        suffix: this.suffix
      }
      if (!this.endVal) {
        this.endVal = 0
      }
      const instance = new CountUp(
        dom,
        this.endVal,
        options
      )
      if (instance.error) {
        return
      }
      this.instance = instance

      instance.start()
      this.reset()
    },
    reset () {
      if (this.clearTime) {
        window.clearTimeout(this.clearTime)
      }

      this.clearTime = window.setTimeout(() => {
        this.instance.reset()
        this.instance.start()
        this.reset()
      }, this.interval)
    },
    update () {
      if (this.clearTime) {
        window.clearTimeout(this.clearTime)
      }

      this.instance.update(this.endVal)

      this.reset()
    },
    destroy () {
      window.clearTimeout(this.clearTime)
      this.time = null
      this.instance = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
