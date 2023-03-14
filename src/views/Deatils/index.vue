<template>
  <div class="deatils">
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-bar"
      :title="houseDeatils.community"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 图片 -->
    <div class="deatils-picture">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in houseDeatils.houseImg"
          :key="index"
        >
          <img class="w100" :src="'http://liufusong.top:8080' + item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 房屋基本信息 -->
    <div>
      <van-cell-group>
        <van-cell :title="houseDeatils.title">
          <template #label>
            <van-tag
              plain
              type="primary"
              text-color="#39becd"
              v-for="value in houseDeatils.tags"
              :key="value"
              >{{ value }}</van-tag
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 房屋重要信息 -->
    <div class="imp-msg">
      <ul class="fsac">
        <li>
          <p>
            <span class="imp-text fw700">{{ houseDeatils.price }}</span>
            <span class="fs20">/月</span>
          </p>
          <span class="fs28 c999">租金</span>
        </li>
        <li>
          <p class="imp-text fw700">{{ houseDeatils.roomType }}</p>
          <span class="fs28 c999">房型</span>
        </li>
        <li>
          <p class="imp-text fw700">
            {{ houseDeatils.size }}
            <span>平米</span>
          </p>
          <span class="fs28 c999">面积</span>
        </li>
      </ul>
      <span class="line"></span>
    </div>

    <!-- 房屋具体信息 -->
    <div class="imp-msg det-msg">
      <ul class="fsbc pt20">
        <li class="fsc">
          <span class="fs26 c999">装修：</span>
          <span class="fs26 c333">精装</span>
        </li>
        <li class="fsc mr230">
          <span class="fs26 c999">楼层：</span>
          <span class="fs26 c333">{{ houseDeatils.floor }}</span>
        </li>
      </ul>
      <ul class="fsbc pt20">
        <li class="fsc">
          <span class="fs26 c999">朝向：</span>
          <span
            class="fs26 c333"
            v-for="value in houseDeatils.oriented"
            :key="value"
          >
            {{ value }}
          </span>
        </li>
        <li class="fsc mr200">
          <span class="fs26 c999">类型：</span>
          <span class="fs26 c333">普通住宅</span>
        </li>
      </ul>
    </div>

    <!-- 地图地位部分 -->
    <div class="imp-msg">
      <p class="map-text pt20">
        小区：<span>{{ houseDeatils.community }}</span>
      </p>
      <div class="map-box">地图区域</div>
    </div>

    <!-- 房屋配套 -->
    <div class="confighouse">
      <div class="housepart-text"><p>房屋配套</p></div>
      <div>
        <van-grid :column-num="5">
          <van-grid-item
            v-for="value in houseDeatils.supporting"
            :key="value"
            :text="value"
          >
            <template #icon>
              <span class="fs50" :class="onIcon(value)"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- 房屋概况 -->
    <div class="pbb-house">
      <div class="housepart-text"><p>房屋概况</p></div>
      <div class="fd">
        <div class="fsc">
          <div class="header-pic fsc">
            <img
              class="w100 pl20"
              src="http://liufusong.top:8080/img/avatar.png"
              alt=""
            />
          </div>
          <div class="ml50">
            <div class="fs32">王女士</div>
            <div class="pbbtext">
              <van-icon class="fs35" name="shield-o" />
              <span class="fs28">已认证房主</span>
            </div>
          </div>
          <van-button class="ml200 pbb-btn" plain type="primary"
            >发消息</van-button
          >
        </div>
        <p class="fs30 pl20 pr10 pb20">
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </p>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="gus-like">
      <div class="housepart-text"><p>猜你喜欢</p></div>
      <div class="renthouse-box">
        <van-card
          price="4500元/月"
          desc="72.32㎡/南 北/低楼层"
          title="安贞西里 3室1厅"
          thumb="	http://liufusong.top:8080/img/message/1.png"
        >
          <template #tags>
            <van-tag plain text-color="#39becd" type="danger">随时看房</van-tag>
          </template>
        </van-card>
      </div>
      <div class="renthouse-box">
        <van-card
          price="7200元/月"
          desc="83㎡/南/高楼层"
          title="天居园 2室1厅"
          thumb="http://liufusong.top:8080/img/message/2.png"
        >
          <template #tags>
            <van-tag plain text-color="#39becd" type="danger">近地铁</van-tag>
          </template>
        </van-card>
      </div>
      <div class="renthouse-box">
        <van-card
          price="4300元/月"
          desc="52㎡/西南/低楼层"
          title="角门甲4号院 1室1厅"
          thumb="http://liufusong.top:8080/img/message/3.png"
        >
          <template #tags>
            <van-tag plain text-color="#39becd" type="danger">集中供暖</van-tag>
          </template>
        </van-card>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="btn">
      <van-button class="pre-btn text" @click="onClickChecked">
        <template #icon>
          <!-- :color:this.isFavorite ? 'red':'' -->
          <!-- :name="this.isFavorite ? 'star-o' : 'star' -->
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? 'red' : ''"
          ></van-icon>
        </template>
        收藏
      </van-button>
      <van-button type="default" class="ask text">在线咨询</van-button>
      <van-button type="primary" class="pre-btn">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import { getHouseDetails } from "@/api/area";
import { getLike } from "@/api/favorite";
// import { Dialog } from "vant";

export default {
  data() {
    return {
      id: this.$route.query.id,
      houseDeatils: {},

      isFavorite: false,
    };
  },
  created() {
    this.onHouseDeatils();
    this.onLike("get");
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onClickChecked() {
      // Dialog.confirm({
      //   title: "好客租房",
      //   message: "您还未登录，是否跳转登陆页面",
      // })
      //   .then(() => {
      //     // on confirm
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
      await this.onLike(this.isFavorite ? "delete" : "post");
      if (this.isFavorite) {
        this.$toast.success("取消收藏");
      } else {
        this.$toast.success("收藏成功");
      }
      // 更新页面信息，get获取最新的
      await this.onLike("get");
    },
    async onLike(method) {
      const { data } = await getLike(this.id, method);
      if (data.body) {
        this.isFavorite = data.body.isFavorite;
      }
    },
    async onHouseDeatils() {
      // 所以这里直接this.id
      const { data } = await getHouseDetails(this.id);
      console.log(data);
      this.houseDeatils = data.body;
      // console.log(this.houseDeatils, "111");
    },
    onIcon(value) {
      switch (value) {
        case "衣柜":
          value = "iconfont icon-yigui";
          break;
        case "洗衣机":
          value = "iconfont icon-xiyiji";
          break;
        case "空调":
          value = "iconfont icon-kongtiao";
          break;
        case "天然气":
          value = "iconfont icon-tianranqi-01";
          break;
        case "冰箱":
          value = "iconfont icon-bingxiang";
          break;
        case "暖气":
          value = "iconfont icon-nuanqi-";
          break;
        case "电视":
          value = "iconfont icon-dianshiji";
          break;
        case "热水器":
          value = "iconfont icon-haofangtuo400iconfont2reshuiqi";
          break;
        case "沙发":
          value = "iconfont icon-tubiaoCSban-";
          break;
        default:
          value = "iconfont icon-kuandai";
          break;
      }
      return value;
    },
  },
};
</script>

<style scoped lang="less">
.deatils {
  background-color: #f6f5f6;
  margin-bottom: 150px;
  .deatils-picture {
    width: 100%;
    height: 500px;
  }
  .imp-msg {
    background-color: #fff;
  }
  .line {
    display: inline-block;
    margin-left: 30px;
    width: 90%;
    border: 1px solid rgb(227, 225, 225);
  }

  // 具体信息
  .det-msg {
    padding: 0 0 30px 30px;
    // display: flex;
  }
  .van-cell {
    font-size: 34px;
    color: #333;
  }
  .imp-msg {
    ul {
      li {
        p {
          color: red;
          font-size: 36px;
        }
      }
    }
  }
  .mr230 {
    margin-right: 225px;
  }

  // 地图部分
  .map-text {
    padding-left: 30px;
    font-size: 28px;
  }
  .map-box {
    width: 100%;
    height: 300px;
    background-color: yellow;
  }
  .housepart-text {
    width: 90%;
    margin-left: 30px;
    font-weight: 700;
    font-size: 32px;
    border-bottom: 2px solid rgb(219, 219, 219);
    margin-bottom: 30px;
  }
  // 房屋配套
  .confighouse {
    padding-top: 20px;
    background-color: #fff;
    .van-hairline--top::after {
      border: transparent;
    }
    /deep/.van-grid-item__content::after {
      border: transparent;
    }
  }

  // 房屋概况
  .pbb-house {
    background-color: #fff;
    margin-top: 40px;
    padding-top: 5px;
    .header-pic {
      width: 100px;
      height: 100px;
      // background-color: skyblue;
      border-radius: 50px;
    }
    .pbbtext {
      color: #fa5741;
    }
    .pbb-btn {
      width: 170px;
      height: 70px;
    }
    .renz {
      font-size: 26px;
      color: #fa5741;
      .van-icon-shield-o:before {
        font-size: 32px;
        margin-right: 5px;
      }
    }
    /deep/.sendmsg-btn {
      width: 150px;
      height: 60px;
    }
  }

  // 猜你喜欢
  .gus-like {
    margin-top: 40px;
    padding-top: 5px;
    background-color: #fff;
    .renthouse-box {
      margin-left: 30px;
      padding: 30px 0;
      width: 90%;
      border-bottom: 2px solid rgb(219, 219, 219);
      .van-card__title {
        font-weight: 700;
        font-size: 32px;
        padding-bottom: 10px;
      }
      .van-card__desc {
        font-size: 26px;
        color: #999;
        padding-bottom: 10px;
      }
      .van-card__price {
        font-weight: 600;
      }
    }
  }

  // 底部按钮
  .btn {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    .pre-btn {
      width: 32%;
      font-size: 34px;
    }
    .van-icon {
      font-size: 40px;
      color: rgb(224, 224, 224);
    }
    .text {
      color: #999;
      font-size: 34px;
    }
    .ask {
      width: 36%;
    }
  }
}
</style>
