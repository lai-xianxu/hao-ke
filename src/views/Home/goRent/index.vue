<template>
  <div class="rent">
    <van-nav-bar title="发布房源" left-arrow @click-left="onClickLeft" />
    <div class="text">房源信息</div>
    <div class="van-hairline--bottom"></div>
    <!-- 小区名称 -->
    <van-cell
      title="小区名称"
      is-link
      :value="state_commity.communityName || '请输入小区名称'"
      to="/search"
    />
    <div class="van-hairline--bottom"></div>
    <!-- 租金 -->
    <van-field placeholder="请输入租金/月" label="租金">
      <template #extra>
        <span class="rightText">￥/月</span>
      </template>
    </van-field>
    <div class="van-hairline--bottom"></div>
    <!-- 建筑面积 -->
    <van-field placeholder="请输入建筑面积" label="建筑面积">
      <template #extra>
        <span class="rightText">㎡</span>
      </template>
    </van-field>
    <div class="van-hairline--bottom"></div>
    <!-- 户型 -->
    <div>
      <van-field readonly clickable label="户型" @click="showPicker = true">
        <template #extra>
          <span class="rightText">
            请选择
            <van-icon name="arrow" />
          </span>
        </template>
      </van-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="roomType"
          value-key="label"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="van-hairline--bottom"></div>
    </div>
    <!-- 所在楼层 -->
    <div>
      <van-field
        readonly
        clickable
        label="所在楼层"
        @click="showPicker1 = true"
      >
        <template #extra>
          <span class="rightText">
            请选择
            <van-icon name="arrow" />
          </span>
        </template>
      </van-field>
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="floor"
          value-key="label"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
      <div class="van-hairline--bottom"></div>
    </div>
    <!-- 朝向 -->
    <div>
      <van-field readonly clickable label="朝向" @click="showPicker2 = true">
        <template #extra>
          <span class="rightText">
            请选择
            <van-icon name="arrow" />
          </span>
        </template>
      </van-field>
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="oriented"
          value-key="label"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <div class="van-hairline--bottom"></div>
    </div>
    <!-- 房屋标题 -->
    <van-cell
      title="房屋标题"
      label="请输入标题(例如：整租 小区名 2室 5000元)"
    />
    <div class="van-hairline--bottom"></div>

    <!-- 房屋图像 -->
    <div class="house-picture">
      <van-cell title="房屋图像" />
      <!-- <div class="van-hairline--bottom"></div> -->
      <van-uploader />
    </div>

    <!-- 房屋配置 -->
    <div>
      <van-cell title="房屋配置" />
      <div class="van-hairline--bottom"></div>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in supporting"
          :key="index"
          @click="onActived(item)"
        >
          <div
            :class="isActive.indexOf(item.label) != -1 ? 'actived' : ''"
            class="fcc-c"
          >
            <i :class="onSelectIcon(item.label)"></i>
            {{ item.label }}
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 房屋描述 -->
    <div class="house-descripe">
      <van-cell title="房屋标题" label="请输入房屋描述信息" />
    </div>

    <!-- 按钮 -->
    <div class="btn">
      <van-button type="default" class="close-btn" @click="onBtn"
        >取消</van-button
      >
      <van-button type="primary" class="agree-btn" @click="onBtn"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getAreas, getRentIcon } from "@/api/area";
export default {
  data() {
    return {
      id: "AREA|88cff55c-aaa4-e2e0",
      showPicker: false,
      showPicker1: false,
      showPicker2: false,

      areaList: [],
      roomType: [],
      floor: [],
      oriented: [],

      // iconList: [],
      supporting: [],

      isActive: [],
    };
  },
  created() {
    this.onHouseType();
    this.onRentIcon();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      this.value = value;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.value = value;
      this.showPicker2 = false;
    },
    async onHouseType() {
      const { data } = await getAreas({ id: this.id });
      console.log(data);
      this.areaList.push(data.body.area, data.body.subway);
      this.roomType = data.body.roomType;
      this.floor = data.body.floor;
      this.oriented = data.body.oriented;
    },
    async onRentIcon() {
      const { data } = await getRentIcon();
      // this.iconList.push(data.body);
      this.supporting = data.body.supporting;
      console.log(this.supporting, "this.supporting");
    },
    onSelectIcon(value) {
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
    onActived(item) {
      if (this.isActive.indexOf(item.label) == -1) {
        this.isActive.push(item.label);
      } else {
        this.isActive.splice(this.isActive.indexOf(item.label), 1);
      }

      console.log(this.isActive);
    },
    onBtn() {
      this.$router.push({
        name: "FindHouse",
      });
    },
  },
  computed: {
    ...mapState(["state_commity"]),
  },
};
</script>

<style scoped lang="less">
.rent {
  background-color: #f6f5f6;
  margin-bottom: 99px;
  padding-bottom: 50px;
  .text {
    background-color: #fff;
    font-size: 32px;
    color: #21b97a;
    padding: 26px 0 20px 25px;
  }
  .rightText {
    color: #888;
  }
  /deep/.van-picker__toolbar {
    border-bottom: 2px solid rgb(222, 221, 221);
    .van-picker__cancel {
      color: #108ee9;
    }
    .van-picker__confirm {
      color: #108ee9;
    }
  }
  .van-hairline--bottom::after {
    border: 0;
  }
  /deep/.van-uploader__upload {
    background-color: #fff;
    border: 1px solid #dddee0;
    margin: 20px 0 0 30px;
  }
  /deep/.van-grid-item__content::after {
    border: 0;
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .close-btn {
      width: 50%;
      height: 100px;
    }
    .agree-btn {
      width: 50%;
      height: 100px;
    }
  }
  /deep/.van-grid-item__content {
    font-size: 20px;
  }
  .iconfont {
    font-size: 48px;
  }
  .house-picture {
    background-color: #fff;
  }
  .house-descripe {
    background-color: #fff;
    margin-top: 50px;
    width: 100%;
    height: 350px;
  }
  .actived {
    color: #21b97a;
  }
}
</style>
