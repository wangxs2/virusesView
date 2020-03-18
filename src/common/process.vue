<template> 
  <div class="process-line">
    <div class="statusline">
      <div :style="{width:numList*proceindex+'%'}"
           class="statusline-two"></div>
      <div class="statuscicle"
           v-for="(iteam,index) in statusData.zhuangtai"
           :key="index">
        <div :style="{left:numList*index+'%'}"
             class="ciclsa"
             @click="checkReply(iteam)"
             :class="nameindex==iteam.name&iteam.color=='yellow'?'ciclsa ciclyellowd':nameindex==iteam.name&iteam.color=='blue'?'ciclsa ciclblued':iteam.color=='yellow'?'ciclsa ciclsa3':iteam.color=='blue'?'ciclsa ciclsa4':'ciclsa'"></div>
        <div :style="{left:numList*index+'%'}"
             :class="nameindex==iteam.name?'nameList namebjy':'nameList'">{{iteam.name}}</div>
        <div :style="{left:numList*index+'%'}"
             class="timeList">{{iteam.time}}</div>
      </div>

    </div>
  </div>
</template> 
<script>
export default {
  name: 'processLine',
  props: [
    'statusData',
  ],
  data () {
    return {
      numList: 0,
      isfase: false,
      nameindex: '',
      proceindex: ''
    }
  },
  created () {
    let lenprcu = this.statusData.zhuangtai.length
    this.nameindex = this.statusData.status
    this.statusData.zhuangtai.forEach((element, index) => {
      if (element.name == this.nameindex) {
        this.proceindex = index
      }

    });
    this.numList = 100 / (lenprcu - 1)
  },
  methods: {
    checkReply () {
      this.isfase = true
      this.$emit("changeprocess", { isfase: this.isfase, row: this.statusData });
    },
  }
}
</script>


<style lang="scss" scoped>
.process-line {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .statusline {
    width: 100%;
    height: vw(4);
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    position: relative;

    .statusline-two {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: rgba(60, 175, 255, 1);
    }
    .statuscicle {
      .nameList {
        position: absolute;
        top: vw(-34);
        font-size: vw(17);
        margin-left: vw(-26);
        width: vw(52);
        height: vh(26);
        line-height: vh(26);
        // color:#ffffff;
      }
      .namebjy {
        width:vw(52);
        height:vw(26);
        background: url("../assets/image/process/qp.png");
        background-size: 100% 100%;
        text-align: center;
        color:#ffffff;
        font-size:vw(15);
        margin-left: vw(-26);
      }
      .timeList {
        position: absolute;
        top: vw(16);
        font-size: vw(17);
        margin-left: vw(-80);
        width: vw(159);
      }
      .ciclsa {
        position: absolute;
        top: vw(-6);
        width: vw(16);
        height: vw(16);
        background: url("../assets/image/process/1@3x.png");
        background-size: 100% 100%;
        margin-left: vw(-8);
        cursor: pointer;
      }
      .ciclsa1 {
        background: url("../assets/image/process/3@3x.png");
        background-size: 100% 100%;
      }
      
      .ciclyellowd {
        background: url("../assets/image/process/2@3x.png");
        background-size: 100% 100%;
        animation: Tada 0.8s 0s infinite;
        @keyframes Tada {
          0% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      }
      .ciclblued {
        background: url("../assets/image/process/3@3x.png");
        background-size: 100% 100%;
        animation: Tada 0.6s 0s infinite;
        @keyframes Tada {
          0% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      }
      .ciclsa2 {
        background: url("../assets/image/process/2@3x.png");
        background-size: 100% 100%;
      }
      .ciclsa3 {
        background: url("../assets/image/process/2@3x.png");
        background-size: 100% 100%;
      }
      .ciclsa4 {
        background: url("../assets/image/process/3@3x.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>