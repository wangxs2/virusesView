<template>
  <div class="home">
    <div class="header">
      <div class="headerimg">
        <!-- <dv-decoration-2 style="width:100%;height:5px;" /> -->
      </div>
      
    </div>
    <div class="nav">
      <div class="nav-iteam" v-for="(item,index) in navData" :key="index">
        <div class="imgbox" style="font-size:20px;"> <img :src="item.img" width="22" height="22">{{item.name}}</div>
        <div class="xznum">
          <div class="leftnum" style="margin-right:30px">
            <div class="dont1">{{index==3?'累计次数(次)':'平台累计(家)'}}</div>
            <div class="dont2">
              <countup :endVal="item.leji"></countup>
            </div>
          </div>
          <div class="leftnum">
            <div class="dont1">{{index==3?'累计金额(万元)':'当日新增(家)'}}</div>
            <div class="dont2">
               <countup :endVal="item.xinz"></countup>
            </div>
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
            <div :class="selectIndex==index?'search-iteam active':'search-iteam'" v-for="(item,index) in searchData" :key="index" @click="toRouterIndex(item,index)">
              {{item.name}}
            </div>
          </div>
          <!-- 点位的弹窗 -->
          <div class="markdetail" v-if="ismarker">
            <div class="header">
              <span style="color:#00C6FF;font-size:18px">详情</span>
              <i class="el-icon-close" @click="ismarker=false" style="color:#ffffff;font-size:18px"></i>
            </div>
            <div class="contentmark">
              <div class="name" style="color:#ffffff;font-size:18px">{{mapobj.hospitalName}}</div> 
              <div class="address" style="margin:6px 0;"><i class="el-icon-location-outline" style="color:#C2D3FF;font-size:18px"></i>{{mapobj.hospitalAddress}}</div>
              <div class="address" v-if="mapobj.source!==undefined&&mapobj.source!==''">信息来源：{{mapobj.source}}</div>
              <div class="address" v-if="mapobj.createTime!==undefined" style="margin:6px 0;">发布日期：{{(mapobj.createTime).replace("+"," ")}}</div>
              <div v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0" style="margin:6px 0;font-size:18px;margin-bottom:2px;color:#ffffff">联系方式</div>
              <div class="tel-phone" v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0">
                <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr1"
                      :key="index"> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr1==undefined?"":mapobj.linkPeoplearr1[index]}}  {{iteam}}</div></div>
              </div>
              <div v-if="mapobj.needsNamearr!==undefined&&istype==1" style="margin:6px 0;font-size:18px;color:#ffffff">{{mapobj.orgType==1?'所需疫情防控物资':'可提供的物资/服务'}}</div>
              <div v-if="mapobj.needsNamearr!==undefined&&istype==2" style="margin:6px 0;font-size:18px;color:#ffffff">{{mapobj.orgType==1?'招聘岗位和数量':mapobj.orgType==2?'可提供的岗位和数量/服务':''}}</div>
              <div class="material" v-if="mapobj.needsNamearr!==undefined">
                <div v-for="(item,index) in mapobj.needsNamearr"
                      :key="index" class="boll-item">{{item}}</div>
              </div>
            </div>
          </div>
          <!-- 点位的弹窗 -->
        </div>
        <div class="table-box">
          <div class="tabbox"> <span class="tabfon"></span>物资推送</div>
          <div class="lunbo">
             <dv-scroll-board :config="config" style="width:100%;height:100%" />
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="top-right"></div>
        <div class="bottom-right">
          <!-- <div class="tabbox"> <span class="tabfon"></span>物资推送</div> -->
          <!-- <el-scrollbar> -->
            <!--以下是滚动的内容-->
            <!-- <img src="../assets/image/rightimg.png" style="width:468px;height:100%" alt="" srcset=""> -->
            
          <!-- </el-scrollbar> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import encrypt from '@/libs/encrypt'
import countup from './scrolltime';
export default {
  name: 'Home',
  components: {
    countup
  },
  data(){
    return{
      myMap:null,
      ismarker:false,
      istype:1,
      isload:false,
      mapobj:{},
      config:{
       
      },
      navData:[
        {
          img:require("../assets/image/icon_1@3x.png"),
          name:'物资需求方',
          leji:1126,
          xinz:4
        },
        {
          img:require("../assets/image/icon_2@3x.png"),
          name:'物资供给方',
          leji:597,
          xinz:6
        },
        {
          img:require("../assets/image/icon_3@3x.png"),
          name:'社会组织',
          leji:232,
          xinz:1
        },
        {
          img:require("../assets/image/icon_4@3x.png"),
          name:'平台物资对接',
          leji:144,
          xinz:1321
        },
        {
          img:require("../assets/image/icon_5@3x.png"),
          name:'招聘需求方(企业)',
          leji:497,
          xinz:8
        },
        {
          img:require("../assets/image/icon_6@3x.png"),
          name:'应聘提供方',
          leji:39,
          xinz:2
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
    this.getDataList()
    this.getRealtime()
   
  },
  mounted () {
    this.getMap()
    this.gettabledata()
  },
  methods:{
    getRealtime(){
      this.$axios.get("http://119.3.10.184:19966/kindnessplatform/donate/getInfo?page=1&pageSize=60").then(res=> {
         
          })
          
    },
    //初始化地图
    getMap () {
      this.myMap = new AMap.Map("myMap", {
        animateEnable: false,
        resizeEnable: true,
        // preloadMode: true,
        center:[106.698499,35.74852],
        zoom:4,
        mapStyle:'amap://styles/2e8b23bc8479cc26dc7f6102af235dc2',
      });

    },
    toRouterIndex(row,index){
      this.selectIndex=index
      if(index==1){
        this.getMendata()
      }else{
        this.getDataList()
      }
    },
    //物力
    getDataList(){
      if(this.mass){
       this.mass.clear()
      }
      let phonearr=[]
      let monarr=[]
      this.isload=true
      this.istype=1
      this.$axios.get("https://rescue.sitiits.com/kindnessplatform/hospital/selectHospital").then(res=> {
        this.isload=false
        if(res.data.content){
          let markerslist=[]
          res.data.content.forEach(iteam=>{
            if(iteam.hospitalAddress){
              iteam.hospitalAddress=decodeURIComponent(encrypt.Decrypt(iteam.hospitalAddress))
            }
            if(iteam.hospitalName){
              iteam.hospitalName=decodeURIComponent(encrypt.Decrypt(iteam.hospitalName))
            }
            if(iteam.needsName!==undefined){
              iteam.needsNamearr=iteam.needsName.split(",")
            }
            iteam.linkPeoplearr1=[]
            if(iteam.linkPeople){
              monarr=iteam.linkPeople.split(",")
              monarr.forEach(iten=>{
                iteam.linkPeoplearr1.push(decodeURIComponent(encrypt.Decrypt(iten)))
              })
            }
            if(iteam.linkTel){
              iteam.linkTelarr1=[]
              phonearr=iteam.linkTel.split(",")
              phonearr.forEach(itm=>{
                iteam.linkTelarr1.push(decodeURIComponent(encrypt.Decrypt(itm)))
              })
            }
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
    //
    getMendata(){
      if(this.mass){
       this.mass.clear()
      }
      this.istype=2
      this.isload=true
      this.$axios.get("http://mrcez.acfic.org.cn:9966/recruitplatform/hospital/selectHospital") .then(res=>{
        this.isload=false
        if(res.data.content){
          let markerslist=[]
          res.data.content.forEach(iteam=>{
            if(iteam.hospitalAddress){
              iteam.hospitalAddress=decodeURIComponent(encrypt.Decrypt(iteam.hospitalAddress))
            }
            if(iteam.hospitalName){
              iteam.hospitalName=decodeURIComponent(encrypt.Decrypt(iteam.hospitalName))
            }
            if(iteam.needsDescr!==undefined){
              iteam.needsNamearr=iteam.needsDescr.split(",")
            }
            if(iteam.gaodeLat&&iteam.gaodeLon){
              iteam.gaodeLat=decodeURIComponent(encrypt.Decrypt(iteam.gaodeLat))
              iteam.gaodeLon=decodeURIComponent(encrypt.Decrypt(iteam.gaodeLon))
              iteam.lnglat=[iteam.gaodeLon, iteam.gaodeLat]
              iteam.style=iteam.orgType==1?4:iteam.orgType==2?5:6
            }
            if(iteam.lnglat){
              markerslist.push(iteam)
            }
          })
          
          this.createMarks(markerslist)
        }
      })
    },
    //
    gettabledata(){
      this.$axios.get("https://rescue.sitiits.com/kindnessplatform/donate/getInfo?page=1&pageSize=60") .then(res=>{
        let data=[]
        if(res.data.list){
          res.data.list.forEach(iteam=>{
            data.push([iteam.pubDate.substring(0,10),iteam.mainBody])
          })
          // this.config.data=data
          // console.log(this.config)
          this.config = { 
            header: ['时间','内容'],
            headerBGC:'#091C5D',
            oddRowBGC:'#091C5D',
            evenRowBGC:'#000D38',
            align:'center',
            columnWidth: [140],
            data: data
          }
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
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }, {
            url: require('../assets/image/list9.png'),
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }, {
            url: require('../assets/image/list6.png'),
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }, {
            url: require('../assets/image/xf1.png'),
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }, {
            url: require('../assets/image/gf2.png'),
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }, {
            url: require('../assets/image/cl3.png'),
            anchor: new AMap.Pixel(11, 11),
            size: new AMap.Size(22, 22)
        }
      ];
      this.mass = new AMap.MassMarks(citys, {
        cursor: 'pointer',
        style: style
        });
      this.mass.on("click", (e) => {
        this.ismarker=true
          if(e.data){
            let str=e.data
            this.mapobj=str
          }
      })
      this.mass.setMap(this.myMap);
    },

  }
}
</script>
<style lang="scss">
.dv-scroll-board .rows .row-item{
  font-size:vw(16);
  color:#BDD3FF;
}
</style>
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
       .markdetail{
          position:absolute;
          top:vh(88);
          left:vw(156);
          width:vw(520);
          // height:vw(370);
          z-index:10;
          background:rgba(4,33,105,1);
          border:1px solid rgba(48,75,142,1);
          box-sizing: border-box;
          padding: vw(10);
          display: flex;
          padding-top:0;
          flex-direction: column;
          .header{
            width:100%;
            height:vw(40);
            display: flex;
            justify-content: space-between;
            align-items:center;
          }
          .contentmark{
            flex:1;
            border:1px solid rgba(48,75,142,1);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            color:#ffffff;
            text-align:left;
            color:#C2D3FF;
            font-size:vw(16);
            box-sizing: border-box;
           padding: vh(18) vw(12);
           .tel-phone{
             display: flex;
              flex-wrap: wrap;
              color: #C2D3FF;
              font-size: 16px;
              margin-bottom:2px;
              .left-font{
                display: flex;
                align-items: center;
                width: 50%;
                margin-bottom:4px;
              }
           }
           .material{
              display: flex;
              flex-wrap: wrap;
              color: #C2D3FF;
              font-size: 16px;
              margin-bottom:2px;
              .boll-item{
                display: flex;
                align-items: center;
                width: 50%;
                margin-bottom:4px;
              }
            }
          }
       }
      }
      .table-box{
        width: 100%;
        height: vh(284);
        margin-top: vh(14); 
        box-shadow: rgba(5,28,113,0.5) 0 0 vw(10) vw(6) inset;
        border-radius:2px;
        background:rgba(5,28,113,0.2);
        box-sizing: border-box;
        padding: vh(18) vw(24);
        overflow:hidden;
        display: flex;
        flex-direction: column;
        .tabbox{
          width:100%;
          height:vh(24);
          display: flex;
          justify-content:flex-start;
          align-items:center;
          font-size:vw(22);
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(75,126,254,1);
          margin-bottom:vh(14);
          .tabfon{
            display:inline-block;
            width:vw(4);
            height:vh(20);
            background:rgba(75,126,254,1);
            margin-right:vw(8);
          }
        }
        .lunbo{
          flex:1;
          font-size:vw(16);
        }
      }

    }
    .right-box{
      height: 100%;
      width: vw(510);
      display: flex;
      flex-direction: column;
       background:url("../assets/image/right1.png");
      background-size:100% 100%;
      .top-right{
        width:100%;
        height:vh(330);
      }
      .bottom-right{
        flex:1;
        // border: 1px solid red;
        overflow: hidden;
        // overflow-y: scroll;
      }
    }
  }
}
</style>
