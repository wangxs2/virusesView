<template>
  <div class="home">
    <div class="header">
      <div class="headerimg"></div>
    </div>
    <div class="nav">
      <div class="nav-iteam" v-for="(item,index) in navData" :key="index">
        <div class="imgbox" style="font-size:20px;"> <img :src="item.img" width="22" height="22">{{item.name}}</div>
        <div class="xznum">
          <div class="leftnum" style="margin-right:30px">
            <div class="dont1">平台累计(家)</div>
            <div class="dont2">{{item.leji}}</div>
          </div>
          <div class="leftnum">
            <div class="dont1">当日新增(家)</div>
            <div class="dont2">{{item.xinz}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left-box"></div>
      <div class="center-box">
        <div id="myMap" class="map-box">
          <dv-loading class="cladsa" v-if="isload">Loading...</dv-loading>
          <div class="search">
            <div :class="selectIndex==index?'search-iteam active':'search-iteam'" v-for="(item,index) in searchData" :key="index" @click="toRouterIndex(iteam,index)">
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="table-box"></div>
      </div>
      <div class="right-box"></div>
    </div>
  </div>
</template>
<script>
import encrypt from '@/libs/encrypt'
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      myMap:null,
      isload:false,
      navData:[
        {
          img:require("../assets/image/icon_1@3x.png"),
          name:'物资需求方',
          leji:4980,
          xinz:26
        },
        {
          img:require("../assets/image/icon_2@3x.png"),
          name:'物资供给方',
          leji:4980,
          xinz:26
        },
        {
          img:require("../assets/image/icon_3@3x.png"),
          name:'社会组织',
          leji:4980,
          xinz:26
        },
        {
          img:require("../assets/image/icon_4@3x.png"),
          name:'平台物资对接',
          leji:4980,
          xinz:26
        },
        {
          img:require("../assets/image/icon_5@3x.png"),
          name:'招聘需求方(企业)',
          leji:4980,
          xinz:26
        },
        {
          img:require("../assets/image/icon_6@3x.png"),
          name:'应聘提供方(工人)',
          leji:4980,
          xinz:26
        }
      ],
      searchData:[
        {
          name:'物力',
        },
        {
          name:'人力',
        }
      ],
      selectIndex:0,
      mass:null,
    }
  },
  created(){
  },
  mounted () {
    this.getMap()
  },
  methods:{
    //初始化地图
    getMap () {
      this.myMap = new AMap.Map("myMap", {
        animateEnable: false,
        resizeEnable: true,
        // preloadMode: true,
        center:[111.160477,32.1624],
        zoom:4,
        mapStyle:'amap://styles/2e8b23bc8479cc26dc7f6102af235dc2',
      });
       this.getDataList()

    },
    toRouterIndex(row,index){
      this.selectIndex=index
    },
    //物力
    getDataList(){
      this.$fetchGet("hospital/selectHospital").then(res=> {
        if(res.content.length>0){
          let markerslist=[]
          res.content.forEach(iteam=>{
            if(iteam.gaodeLat&&iteam.gaodeLon){
              iteam.gaodeLat=decodeURIComponent(encrypt.Decrypt(iteam.gaodeLat))
              iteam.gaodeLon=decodeURIComponent(encrypt.Decrypt(iteam.gaodeLon))
              iteam.lnglat=[iteam.gaodeLon, iteam.gaodeLat]
              iteam.style=iteam.orgType
            }
            if(iteam.lnglat){
              markerslist.push(iteam)
            }
          })
          
          this.createMarks(markerslist)
        }
      })
    },
    createMarks(citys){
      console.log(citys)
     let style = [{
            url: require('../assets/image/icon2.png'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }, {
            url: require('../assets/image/icon2.png'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }, {
            url: require('../assets/image/list9.png'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(18, 24)
        }, {
            url: require('../assets/image/list6.png'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }
      ];
      this.mass = new AMap.MassMarks(citys, {
        cursor: 'pointer',
        style: style
        });
      this.mass.on("click", (e) => {
      })
      this.mass.setMap(this.myMap);
    },

  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #040E33;
  box-sizing: border-box;
  padding: vw(19);
  padding-top: 0;
  .header{
    width: 100%;
    height: vh(74);
    display: flex;
    justify-content:center;
    .headerimg{
      width: vw(1071);
      height: vh(74);
      background:url("../assets/image/header.png");
      background-size:100% 100%;
    }
  }
  .nav{
    width: 100%;
    height: vh(130);
    display: flex;
    justify-content: space-between;
    align-items:center;
    .nav-iteam{
      display: flex;
      flex-direction: column;
      .imgbox{
        display: flex;
        justify-content:flex-start;
        align-items:center;
        color:#60ABFF;
        img{
          margin-right:vw(6);
        }
      }
      .xznum{
        display: flex;
        justify-content:flex-start;
        text-align:left;
        margin-top:vh(4);
        .leftnum{
          margin-top:vh(4);
          .dont1{
            font-size:vw(18);
            color:#C2D3FF;
          }
          .dont2{
            font-size:vw(32);
            color:#ffffff;
          }
        }
      }
    }
    .nav-iteam:nth-child(5),.nav-iteam:nth-child(6){
      .imgbox{
        color:#F4DE71;
      }
    }
  }
  .content{
    flex:1;
    display: flex;
    justify-content: space-between;
    .left-box{
      height: 100%;
      width: vw(510);
      margin-right: vw(14);
      background:url("../assets/image/left.png");
      background-size:100% 100%;
    }
    .center-box{
      height: 100%;
      width: vw(832);
      margin-right: vw(14);
      display: flex;
      flex-direction: column;
      .map-box{
        width: 100%;
        height: vh(560);
       border-radius:2px;
       position:relative;
       .search{
        position:absolute;
        top:0;
        left:0;
        width: 100%;
        height: vh(48);
        z-index:10;
        background:rgba(255,255,255,0.06);
        display: flex;
        color:#ffffff;
        font-size:vw(20);
        .search-iteam{
          width:vw(120);
          display: flex;
          justify-content:center;
          align-items:center;
          border-radius:2px;
        }
        .active{
          color:#FF644D;
          border-bottom:2px solid #FF644D;
        }
       }
       .cladsa{
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:20;
          background:rgba(0,0,0,0.5);
          color:#60ABFF;
       }
      }
      .table-box{
        width: 100%;
        height: vh(284);
        margin-top: vh(14); 
        box-shadow: rgba(5,28,113,0.5) 0 0 vw(10) vw(6) inset;
        border-radius:2px;
        background:rgba(5,28,113,0.2);
      }

    }
    .right-box{
      height: 100%;
      width: vw(510);
       background:url("../assets/image/right.png");
      background-size:100% 100%;
    }
  }
}
</style>
