<template>
  <div class="table">
    <div class="table-head">
        <div class="thead thead1">时间</div>
        <div class="thead thead2">内容</div>
        <div class="thead thead3">状态</div>
    </div>
    <div class="tablebody">
        <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
                <div class="swiper-slide"
                    v-for="(iteam,index) in findVisible"
                    :key="index"
                    :autoplay='5000'>
                <div class="allData">
                    <div class="table-foncom table-foncom1">{{iteam.time}}</div>
                    <div class="table-foncom table-foncom2">{{iteam.content}}</div>
                    <div class="statusSa">
                        <ProcessLine v-on:changeprocess="changeprocess($event)" :statusData='iteam' />
                    </div>

                </div>

                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
// import ProcessLine from "./process";
import ProcessLine from "../common/process.vue";
import Swiper from "swiper";
export default {
components: {
    ProcessLine
  },
    data () {
        return {
            swipertable:null,
            findVisible:[
                {
                    time:"03-01 22:05",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-01 23:00"
                        },
                        {
                            color:"grey",
                            name:"对接中",
                            time:null
                        },
                        {
                            color:"grey",
                            name:"已落实",
                            time:null
                        }
                    ],
                    status:"已发布",
                    content:"提赛德大学中国学生学者联谊会,需要N95口罩500个,一次性医用口罩：1500个,护目镜120个,消毒液200瓶,75%浓度酒精200瓶,联系…",
                },
                {
                    time:"03-02 22:05",
                    status:"对接中",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-01 22:00"
                        },
                        {
                            color:"yellow",
                            name:"对接中",
                            time:null
                        },
                        {
                            color:"grey",
                            name:"已落实",
                            time:null
                        }
                    ],
                    content:"温哥华西门菲莎大学SFU CSSA 请求物资提供，需要外科口罩1000个，护目镜200个，联系方式：Hanyi Jiang，15000990989",
                },
                {
                    time:"03-03 22:05",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-01 22:00"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:null
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:null
                        }
                    ],
                    content:"温哥华西门菲莎大学SFU CSSA 请求物资提供，需要外科口罩1000个，护目镜200个，联系方式：Hanyi Jiang，15000990989",
                },
            ]
        }
    },
    mounted () {
        this.initSwipertable()
    },
    created(){},
    methods:{
        changeprocess (data) {},
        initSwipertable () {
            this.swipertable = new Swiper("#swiper1", {
                loop: true, // 循环模式选项
                direction: 'vertical',
                slidesPerView: 2,
                slidesPerGroup: 2,
                mousewheel: true,
                // autoplay: {
                //   delay: 10000,
                //   stopOnLastSlide: false,
                //   disableOnInteraction: true,
                // },
                autoplay: true,
                //preventLinksPropagation: false,  // 阻止点击事件冒泡
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper

            });

        },
    }
}
</script>
<style lang="scss" scoped>
.table{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    .table-head{
        width: 100%;
        height: vw(36);
        line-height: vw(36);
        color:#ffffff;
        background:rgba(9,28,93,1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .thead {
          text-align: center;
          height: 100%;
        }
        .thead1 {
            width: vw(135);
        }
        .thead2 {
            width: vw(341);
        }
        .thead3 {
            flex:1;
        }
    }
    .tablebody{
        flex:1;
        height:vw(172);
        border:1px solid rgba(9,28,93,1);
        overflow:hidden;
        .swiper-container{
            width:100%;
            height:100%;
            color:#BDD3FF;
            font-size:vw(16);
            overflow:hidden;
            .swiper-slide {
                width: 100%;
                height: vw(85);
                .allData{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom:1px solid rgba(9,28,93,1);
                    .table-foncom{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        box-sizing:border-box;
                        padding:vh(14) 0;
                    }
                    .table-foncom1{
                        width: vw(135);
                    }
                    .table-foncom2{
                        width: vw(341);
                        text-align:left;
                    }
                    .statusSa{
                        flex:1;
                        box-sizing:border-box;
                        padding:0 vw(46);
                        // width: vw(350);
                        // height:vw(85);
                    }
                }
            }
        }
    }
    

}
</style>
