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
                    time:"03-17",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-17"
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
                    content:"提赛德大学中国学生学者联谊会,需要N95口罩500个,一次性医用口罩：1500个,护目镜120个,消毒液200瓶,75%浓度酒精200瓶,联系方式：梁灵泽:17371261806",
                },
                {
                    time:"03-17",
                    status:"已发布",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-17"
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
                    content:"温哥华西门菲莎大学SFU CSSA 请求物资提供，需要外科口罩1000个，护目镜200个，联系方式：Hanyi Jiang，15000990989",
                },
                {
                    time:"03-16",
                    status:"对接中",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-16"
                        },
                        {
                            color:"yellow",
                            name:"对接中",
                            time:"03-19"
                        },
                        {
                            color:"grey",
                            name:"已落实",
                            time:null
                        }
                    ],
                    content:"曼彻斯特中国学生学者联谊会请求物资捐赠,需要一次性医用口罩100000个,护目镜10000个,免洗洗手液10000瓶,国内联系方式:0774-6337415",
                },
                {
                    time:"03-15",
                    status:"对接中",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-15"
                        },
                        {
                            color:"yellow",
                            name:"对接中",
                            time:"03-19"
                        },
                        {
                            color:"grey",
                            name:"已落实",
                            time:null
                        }
                    ],
                    content:"纽卡斯尔大学外联部,需要N95口罩200个,一次性医用口罩：1000个,75%浓度酒精不限,联系方式：李晨曦:07802568715",
                },
                {
                    time:"03-15",
                    status:"对接中",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-15"
                        },
                        {
                            color:"yellow",
                            name:"对接中",
                            time:"03-19"
                        },
                        {
                            color:"grey",
                            name:"已落实",
                            time:null
                        }
                    ],
                    content:"意大利中华协会，需要一次性空照2000个，联系方式：Associazione promozione sociale zhonghua:0039-3351775505",
                },
                {
                    time:"03-12",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-12"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-15"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-17"
                        }
                    ],
                    content:"unione degli studenti e studiosi cinesi dell'universita di roma 'sapienza',需要一次性医用口罩4000个,联系方式：liu zhenbei:39 3281173914",
                },
                {
                    time:"03-10",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-10"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-13"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-14"
                        }
                    ],
                    content:"巴东志愿者协会 需要提供：消毒设备10个，测温仪20个，联系方式：冯永山 15717260222",
                },
                {
                    time:"03-08",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-08"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-11"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-12"
                        }
                    ],
                    content:"云南保山、龙陵、迪庆等山区孩子缺口罩，请求资助，联系人，孙女士13320505052",
                },
                {
                    time:"03-04",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-04"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-06"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-08"
                        }
                    ],
                    content:"雷神山医院求购优质冲锋衣1500套，希望今明两天到货，联系人康老师：19947558224",
                },
                {
                    time:"03-02",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-02"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-05"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-07"
                        }
                    ],
                    content:"额温计8000只，符合国家相关标准，公对公交易，联系人，柴先生：13120921190",
                },
                {
                    time:"03-02",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-02"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-05"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-07"
                        }
                    ],
                    content:"额温计8000只，符合国家相关标准，公对公交易，联系人，柴先生：13120921190",
                },
                {
                    time:"03-02",
                    status:"已落实",
                    zhuangtai:[
                        {
                            color:"blue",
                            name:"已发布",
                            time:"03-02"
                        },
                        {
                            color:"blue",
                            name:"对接中",
                            time:"03-05"
                        },
                        {
                            color:"blue",
                            name:"已落实",
                            time:"03-07"
                        }
                    ],
                    content:"海南工商联需要一次性医用口罩若干，额温计若干，符合国家医用标准，对公交易，联系人，杨先生：13816609662",
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
            width: vw(100);
        }
        .thead2 {
            width: vw(376);
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
                        width: vw(100);
                    }
                    .table-foncom2{
                        width: vw(376);
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
