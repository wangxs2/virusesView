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
      <div class="center-box">
        <div id="myMap" class="map-box">
            <dv-loading class="cladsa" v-if="isload">Loading...</dv-loading>
            <div class="search">
              <div class="searchleft">
                <div :class="selectIndex==index?'search-iteam active':'search-iteam'" v-for="(item,index) in searchData" :key="index" @click="toRouterIndex(item,index)">
                {{item.name}}
                </div>
              </div>
              <div class="search-right">
                <input v-model="contentsearch1" @blur="searchdata" placeholder="查询" />
                <div class="simg"></div>
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
                        :key="index" class="boll-item">{{needtabs[item]}}</div>
                </div>
              </div>
            </div>
            <!-- 点位的弹窗 -->
            <!-- 图例 -->
            <div class="tulibox" v-if="selectIndex==0">
              <div class="itemimg" @click="searching(1)">
                <img src="../assets/image/icon2.png" alt="">需方
              </div>
              <div class="itemimg" @click="searching(2)">
                <img src="../assets/image/list9.png" alt="">供方
              </div>
              <div class="itemimg" @click="searching(3)">
                <img src="../assets/image/list6.png" alt="">民间组织
              </div>

            </div>
            <div class="tulibox" v-if="selectIndex==1">
              <div class="itemimg" @click="searching(1)">
                <img src="../assets/image/xf1.png" alt="">需方
              </div>
              <div class="itemimg" @click="searching(2)">
                <img src="../assets/image/gf2.png" alt="">供方
              </div>
              <div class="itemimg" @click="searching(3)">
                <img src="../assets/image/cl3.png" alt="">出力方
              </div>

            </div>
            <!-- 图例 -->
        </div>
        <div class="list-box" v-if="selectIndex==0"></div>
        <div class="list-box1" v-if="selectIndex==1"></div>
        
      </div>
      
      <div class="bottom-box">
        <div class="bottom-left">
           <div class="tabbox"> <span class="tabfon"></span>服务能力</div>
            <div class="lunbo">
              <div class="ditu">
                <div :class="`ball ball${index}`" v-for="(item,index) in ballData" :key="index" @click="ballclick(item)"></div>
              </div>
            </div>
        </div>
        <div class="bottom-center">
            <div class="tabbox"> 
             <div><span class="tabfon"></span>物资推送</div>
             <div class="zbname">指标名称</div>
            </div>
            <div class="lunbo">
              <tablebox></tablebox>
            </div>
        </div>
        <div class="bottom-right">
           <div class="tabbox"> 
             <div><span class="tabfon"></span>实时动态<span style="font-size:18px;color:#BDD3FF;font-weight:none;margin-left:16px">截至2020/03/12 12:00</span></div>
             <div class="zbname"></div>
            </div>
            <div class="lunbo">
              <div class="iteamsa" v-for="(iteam,index) in realtimedata" :key="index">
                <div class="timesa" style="wideh:100px">
                  <div style="display:flex;flex:1;color:#ffffff;flex-direction:column;font-size:18px">
                    <div style="text-align:right">{{iteam.status}}</div><div style="text-align:right">{{iteam.time}}</div>
                  </div>
                </div>
                <div class="timesa" style="wideh:20px;margin: 0 10px;">
                  <img src="../assets/image/roll.png" width="16" height="16" />
                  <div v-if="index!==realtimedata.length-1" style="width:2px;height:60px;background:rgba(0,198,255,0.2);margin-left:7px"></div>
                </div>
                <div class="timesa" style="flex:1">
                  <div style="margin-top:0.05rem;font-size:18px;color:#ffffff;text-align:left;"><span class="news" v-if="index==0">最新</span>{{iteam.content}}</div>
                </div>
              </div>
            </div>

        </div>
       
      </div>
    </div>
  </div>
</template>
<script>
import encrypt from '@/libs/encrypt'
import countup from './scrolltime';
import tablebox from './tablescroll.vue'
export default {
  name: 'Home',
  components: {
    countup,
    tablebox
  },
  data(){
    return{
      myMap:null,
      ismarker:false,
      orgType:'',
      contentsearch:'',
      contentsearch1:'',
      istype:1,
      isload:false,
      mapobj:{},
      realtimedata:[
        {
          status:"8天前",
          time:"03-04 11:37",
          content:"关于积极发挥各级工商联所属商会作用支持民营企业复工复产通知",
        },
        {
          status:"9天前",
          time:"03-05 11:37",
          content:"关于积极发挥各级工商联所属商会作用支持民营企业复工复产通知",
        },
        {
          status:"10天前",
          time:"03-05 11:37",
          content:"关于积极发挥各级工商联所属商会作用支持民营企业复工复产通知",
        },
        {
          status:"11天前",
          time:"03-05 11:37",
          content:"关于积极发挥各级工商联所属商会作用支持民营企业复工复产通知",
        },
        {
          status:"12天前",
          time:"03-05 11:37",
          content:"关于积极发挥各级工商联所属商会作用支持民营企业复工复产通知",
        }
      ],
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
          name:'物资',
        },
        {
          name:'人力',
        },
        // {
        //   name:'运输',
        // }
      ],
       needtabs:[" ","N95口罩","一次性医用口罩","一次性手术衣","医用手套","外科口罩","护目镜",
    "防护眼罩","防护面罩","防污染鞋套","防护服","隔离衣","红外测温仪","医用帽子",
    "消毒液","75%浓度酒精","消毒设备","对口药品",
    "耳温枪","负压担架","负压救护车","紫外灯","全面型呼吸防护器","宣传倡导","心理干预","物资发放","疫情排查","社区服务","其他服务","医疗救助"],
      ballData:[
        {
          name:'一次性医用口罩',
          id:1,
        },
        {
          name:'意大利',
          id:2,
        },
        {
          name:'物资发放',
          id:3,
        },
        {
          name:'英国',
          id:4,
        },
        {
          name:'疫情排查',
          id:5,
        },
        {
          name:'防护服',
          id:6,
        },
        {
          name:'N95口罩',
          id:7,
        },
        {
          name:'宣传倡导',
          id:8,
        },
        {
          name:'防冲击面罩',
          id:9,
        }
      ],
      selectIndex:0,
      mass:null,
    }
  },
  created(){
    this.getDataList()
    // this.getRealtime()
   
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
        center:[35.588759,38.621803],
        zoom:3,
        mapStyle:'amap://styles/2e8b23bc8479cc26dc7f6102af235dc2',
      });

    },
    searching(val){
      this.orgType=val
      this.contentsearch=""
      if(this.selectIndex==1){
        this.getMendata()
      }else{
        this.getDataList()
      }

    },
    toRouterIndex(row,index){
      this.selectIndex=index
      this.orgType=''
      if(index==1){
        this.getMendata()
      }else if(index==0){
        this.getDataList()
      }else{

      }
    },
    searchdata(){
      this.contentsearch=this.contentsearch1
      if(this.selectIndex==1){
        this.getMendata()
      }else if(this.selectIndex==0){
        this.getDataList()
      }
    },
    ballclick(row){
      this.contentsearch=row.name
      if(this.selectIndex==0){
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
      this.$axios.get("https://rescue.sitiits.com/kindnessplatform/hospital/selectHospital",{
        params:{
          orgType:this.orgType,
          content:this.contentsearch,
          }
        }).then(res=> {
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
      this.$axios.get("http://mrcez.acfic.org.cn:9966/recruitplatform/hospital/selectHospital",{
        params:{
          orgType:this.orgType
          }
        }) .then(res=>{
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
      this.$axios.get("https://rescue.sitiits.com/kindnessplatform/donate/getInfo?page=1&pageSize=15") .then(res=>{
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
     let style = [{
            url: require('../assets/image/icon2.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/icon2.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/list9.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/list6.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/xf1.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/gf2.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
        }, {
            url: require('../assets/image/cl3.png'),
            anchor: new AMap.Pixel(10, 10),
            size: new AMap.Size(20, 20)
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
       this.myMap.setFitView();
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
  position:relative;
  .bigdia{
    position:absolute;
    top:0;
    left:0;
  }
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
    flex-direction:column;
    .center-box{
      display: flex;
      justify-content:space-between;
      width:100%;
      height:vh(558);
      // background:pink;
      .map-box{
        width: vw(1356);
        height: 100%;
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
        justify-content: space-between;
        font-size:vw(20);
        box-sizing:border-box;
        padding-right:vw(10);
        .searchleft{
          display: flex;
        }
        .search-right{
          width:vw(300);
          height:100%;
          box-sizing:border-box;
          padding:vw(6) 0;
          position:relative;
          .simg{
            position:absolute;
            top:vw(12);
            right:vw(14);
            width:vw(20);
             height:vw(20);
            background:url("../assets/image/process/simg.png");
            background-size:100% 100%;
          }
          input{
            width:100%;
            height:100%;
            border-radius:vw(18);
            background:rgba(4,13,46,0.7);
            border:none;
            color:#ffffff;
            font-size:vw(17);
            text-indent:vw(20);
            
          }
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
              color:#9DB2D7;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:#9DB2D7;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#9DB2D7;
          }
          :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color:#9DB2D7;
          }
        }
        .search-iteam{
          width:vw(120);
          display: flex;
          font-weight:bold;
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
       .tulibox{
        position:absolute;
        bottom:vh(10);
        left:vw(10);
        background:rgba(4,33,105,1);
        z-index:10;
        color:#9DB2D7;
        box-sizing: border-box;
        padding:vw(10);
        border-radius:2px;
        .itemimg{
          display: flex;
          justify-content: flex-start;
          align-items:center;
          margin-bottom:vw(6);
          cursor:pointer;
          img{
            margin-right:vw(8);
          }
        }
        .iteactive{
          color:#4B7EFE
        }
       }
       .markdetail{
          position:absolute;
          top:vh(88);
          left:vw(356);
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
      .list-box{
        flex:1;
        margin-left:vw(14);
        background:url("../assets/image/process/rightw.png");
        background-size:100% 100%;
      }
      .list-box1{
        flex:1;
        margin-left:vw(14);
        background:url("../assets/image/process/rightr.png");
        background-size:100% 100%;
      }
      

    }
    .bottom-box{
      display: flex;
      justify-content:space-between;
      flex:1;
      margin-top:vh(14);
      .bottom-left{
        width:vw(480);
        height:100%;
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
          display:flex;
          justify-content:center;
          align-items:center;
          .ditu{
            width:vw(453);
            height:vw(182);
            // border:1px solid #ffffff;
            background:url("../assets/image/bg@3x.png");
            background-size:100% 100%;
            position:relative;
            .ball{
              border-radius:50%;
              color:#ffffff;
              text-align:center;
              box-sizing:border-box;
              padding:vw(14);
              position:absolute;
              cursor: pointer;
            }
            .ball0{
              left:vw(154);
              top:vw(7);
              width:vw(126);
              height:vw(127);
              background:url("../assets/image/1@3x.png");
              background-size:100% 100%;
            }
            .ball0:active{
              width:vw(130);
              height:vw(130);
            }
            .ball1{
              left:vw(239);
              top:vw(86);
              width:vw(88);
              height:vw(88);
              background:url("../assets/image/2@3x.png");
              background-size:100% 100%;
            }
            .ball1:active{
              width:vw(92);
              height:vw(92);
            }
            .ball2{
              left:vw(154);
              top:vw(120);
              width:vw(73);
              height:vw(73);
              background:url("../assets/image/3@3x.png");
              background-size:100% 100%;
            }
            .ball2:active{
              width:vw(77);
              height:vw(77);
            }
            .ball3{
              left:vw(347);
              top:vw(45);
              width:vw(78);
              height:vw(78);
              background:url("../assets/image/4@3x.png");
              background-size:100% 100%;
            }
            .ball3:active{
              width:vw(82);
              height:vw(82);
            }
            .ball4{
              left:vw(71);
              top:vw(71);
              width:vw(88);
              height:vw(88);
              background:url("../assets/image/5@3x.png");
              background-size:100% 100%;
            }
            .ball4:active{
              width:vw(92);
              height:vw(92);
            }
            .ball5{
              left:vw(99);
              top:vw(-24);
              width:vw(78);
              height:vw(78);
              background:url("../assets/image/6@3x.png");
              background-size:100% 100%;
            }
            .ball5:active{
              width:vw(82);
              height:vw(82);
            }
            .ball6{
              left:vw(259);
              top:vw(-14);
              width:vw(112);
              height:vw(112);
              background:url("../assets/image/7@3x.png");
              background-size:100% 100%;
            }
            .ball6:active{
              width:vw(116);
              height:vw(116);
            }
            .ball7{
              left:vw(16);
              top:vw(75);
              width:vw(66);
              height:vw(66);
              background:url("../assets/image/8@3x.png");
              background-size:100% 100%;
            }
            .ball7:active{
              width:vw(70);
              height:vw(70);
            }
             .ball8{
              left:vw(22);
              top:vw(0);
              width:vw(83);
              height:vw(83);
              background:url("../assets/image/9@3x.png");
              background-size:100% 100%;
            }
            .ball8:active{
              width:vw(86);
              height:vw(86);
            }
          }
        }
      }
      .bottom-center{
        width:vw(862);
        height:100%;
        margin-left:vw(14);
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
          justify-content:space-between;
          align-items:center;
          font-size:vw(22);
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(75,126,254,1);
          margin-bottom:vh(14);
          .zbname{
             width:vw(86);
              height:vw(30);
              font-size:vw(17);
              line-height:vw(29);
              background:url("../assets/image/process/bg_7_nor@3x.png");
              background-size:100% 100%;
              color:#00E4FF;
              cursor: pointer;
          }
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
      .bottom-right{
        flex:1;
        overflow: hidden;
        width: vw(510);
        height: vw(284);
        margin-left:vw(14);
        // background:url("../assets/image/process/bottom.png");
        // background-size:100% 100%;
        display: flex;
        flex-direction: column;
          box-shadow: rgba(5,28,113,0.5) 0 0 vw(10) vw(6) inset;
        border-radius:2px;
        background:rgba(5,28,113,0.2);
        box-sizing: border-box;
        padding: vh(18) vw(24);
        .tabbox{
          width:100%;
          height:vh(24);
          display: flex;
          justify-content:space-between;
          align-items:center;
          font-size:vw(22);
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:#F4DE71;
          margin-bottom:vh(14);
          
          .tabfon{
            display:inline-block;
            width:vw(4);
            height:vh(20);
            background:#F4DE71;
            margin-right:vw(8);
          }
        }
        .lunbo{
          flex:1;
          width: 100%;
          height: vh(234);
          font-size:vw(16);
          overflow: hidden;
          overflow-y: scroll;
          .iteamsa {
            width:100%;
            display: flex;
            justify-content: flex-start;
            .timesa {
              display: flex;
              flex-direction: column;
              .news{
                display: inline-block;
                width:51px;
                height:24px;
                background:rgba(255,100,77,1);
                border-radius:4px;
                color:#ffffff;
                text-align: center;
                line-height: 24px;
                margin-right:6px;
              }
            }
          }
          
        }
        .lunbo::-webkit-scrollbar {
            width: 0;
          }
      }

    }
    
  }
}
</style>
