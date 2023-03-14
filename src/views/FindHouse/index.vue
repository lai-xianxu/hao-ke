<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" left-arrow @click-left="onClickLeft">
      <template #right>
        <Search class="findhouse-search"></Search>
      </template>
    </van-nav-bar>

    <!-- 下拉列表 -->
    <van-dropdown-menu active-color="#1989fa">
      <!-- 区域 -->
      <van-dropdown-item title="区域" ref="areaClose">
        <van-picker
          toolbar-position="bottom"
          show-toolbar
          :columns="areaList"
          value-key="label"
          @cancel="onAreaCancel"
          @confirm="onAreaConfirm"
        >
        </van-picker>
      </van-dropdown-item>
      <!-- 方式 -->
      <van-dropdown-item title="方式" ref="methodClose">
        <van-picker
          toolbar-position="bottom"
          show-toolbar
          :columns="rentType"
          value-key="label"
          @cancel="onMethodCancel"
          @confirm="onMethodConfirm"
        />
      </van-dropdown-item>
      <!-- 租金 -->
      <van-dropdown-item title="租金" ref="priceClose">
        <van-picker
          toolbar-position="bottom"
          show-toolbar
          :columns="rentPrice"
          value-key="label"
          @cancel="onPriceCancel"
          @confirm="onPriceConfirm"
        />
      </van-dropdown-item>
      <!-- 筛选 -->
      <van-dropdown-item title="筛选" @open="show = true"> </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 筛选 -->
    <van-popup
      v-model="show"
      position="right"
      :style="{ width: '80%', height: '100%' }"
    >
      <div class="popup_box">
        <div class="filterBtn">
          <p class="text">户型</p>
          <van-grid :column-num="2">
            <div class="hx-box">
              <span
                class="huxing"
                v-for="item in roomType"
                :key="item.value"
                :class="item.checked ? 'actived' : ''"
                @click="onChecked('roomType', item)"
              >
                {{ item.label }}
              </span>
            </div>
          </van-grid>
          <p class="text">朝向</p>
          <van-grid :column-num="2">
            <div class="hx-box">
              <span
                class="huxing"
                v-for="item in oriented"
                :key="item.value"
                :class="item.checked ? 'actived' : ''"
                @click="onChecked('oriented', item)"
              >
                {{ item.label }}
              </span>
            </div>
          </van-grid>
          <p class="text">楼层</p>
          <van-grid :column-num="2">
            <div class="hx-box">
              <span
                class="huxing"
                v-for="item in floor"
                :key="item.value"
                :class="item.checked ? 'actived' : ''"
                @click="onChecked('floor', item)"
              >
                {{ item.label }}
              </span>
            </div>
          </van-grid>
          <p class="text">房屋亮点</p>
          <van-grid :column-num="2">
            <div class="hx-box">
              <span
                class="huxing"
                v-for="item in characteristic"
                :key="item.value"
                :class="item.checked ? 'actived' : ''"
                @click="onChecked('characteristic', item)"
              >
                {{ item.label }}
              </span>
            </div>
          </van-grid>
        </div>
        <div class="btn">
          <van-button type="default" class="close-btn" @click="onCancel"
            >取消</van-button
          >
          <van-button type="primary" class="agree-btn" @click="onAgree"
            >确认</van-button
          >
        </div>
      </div>
    </van-popup>

    <!-- 租房列表 -->
    <div class="scroll" v-if="houseList.length">
      <van-list
        v-if="houseList.length"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="(item, index) in houseList"
          :key="index + item.title"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="'http://liufusong.top:8080' + item.houseImg"
          @click="jumpDeatils(item)"
        >
          <template #tags>
            <van-tag
              plain
              type="danger"
              text-color="#39becd"
              v-for="value in item.tags"
              :key="value"
              >{{ value }}</van-tag
            >
          </template>
        </van-card>
      </van-list>
    </div>
    <van-empty v-else description="暂时无房源信息~" />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import { getAreas, getHouseList } from "@/api/area";
export default {
  components: {
    Search,
  },
  data() {
    return {
      // id: "AREA|88cff55c-aaa4-e2e0",

      areaList: [],

      isClose: false,
      rentType: [],
      rentPrice: [],

      // cityId: "AREA|dbf46d32-7e76-1196",
      houseList: [],
      start: 1,
      end: 10,
      area: "",
      subway: "",
      rent_type: "",
      price: "",
      more: "",

      list: [],
      loading: false,
      finished: false,

      show: false,

      roomType: [],
      oriented: [],
      floor: [],
      characteristic: [],
    };
  },
  created() {
    this.ongetAreas();
    this.onHouseList();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async ongetAreas() {
      const { data } = await getAreas({
        id: this.$store.state.state_city.value,
      });
      // 区域，地铁
      data.body.area.children[0].children = [{ label: "", value: "null" }];
      data.body.subway.children[0].children = [{ label: "", value: "null" }];
      this.areaList.push(data.body.area, data.body.subway);
      // 方式
      this.rentType = data.body.rentType;
      // console.log(this.rentType);
      // 租金
      this.rentPrice = data.body.price;
      // 筛选
      // 户型
      data.body.roomType.forEach((e) => {
        e.checked = false;
      });
      this.roomType = data.body.roomType;
      // 朝向
      data.body.oriented.forEach((e) => {
        e.checked = false;
      });
      this.oriented = data.body.oriented;
      // 楼层
      data.body.floor.forEach((e) => {
        e.checked = false;
      });
      this.floor = data.body.floor;
      // 房屋楼层
      data.body.characteristic.forEach((e) => {
        e.checked = false;
      });
      this.characteristic = data.body.characteristic;
    },
    async onHouseList() {
      try {
        const { data } = await getHouseList({
          cityId: this.$store.state.state_city.value,
          start: this.start,
          end: this.end,
          area: this.area,
          subway: this.subway,
          rentType: this.rent_type,
          price: this.price,
          more: this.more,
        });
        this.houseList = this.houseList.concat(data.body.list);
        this.loading = false;
        // 优化：数据都加载完毕之后，显示”没有更多了“
        if (this.houseList.length >= data.body.count) {
          this.finished = true;
        }
      } catch (error) {
        this.loading = false;
        this.finished = true;
      }
    },
    // 更新，除了筛选剩余所有参数从头来
    onRefersh() {
      this.start = 1;
      this.end = 10;
      this.loading = true;
      this.finished = false;
      this.houseList = [];
      this.onHouseList();
    },
    onLoad() {
      this.start = this.end + 1;
      this.end = this.end + 10;
      this.onHouseList();
    },
    onChecked(name, item) {
      this[name].forEach((e) => {
        if (e.value === item.value) {
          e.checked = !e.checked;
        }
      });
    },
    jumpDeatils(item) {
      this.$router.push({
        name: "Deatils",
        query: {
          id: item.houseCode,
        },
      });
    },
    onCancel() {
      this.show = false;
    },
    onAgree() {
      // forEach, filter, map, some, every, findIndex, find, indexOf(简单数组)
      let allList = [
        ...this.roomType,
        ...this.oriented,
        ...this.floor,
        ...this.characteristic,
      ];
      let checkedList = [];
      checkedList = allList
        .filter((e) => {
          return e.checked;
        })
        .map((o) => o.value)
        .join(",");
      this.more = checkedList;
      this.onRefersh();
      console.log(checkedList, "checkedList");
      this.show = false;
    },
    // 区域取消事件
    onAreaCancel() {
      this.$refs.areaClose.toggle(false);
    },
    // 区域确认事件
    onAreaConfirm(e, i) {
      console.log(i);
      let a = this.areaList[i[0]];
      if (i[1] > 0) {
        a = a.children[i[1]];
      }
      if (i[2] > 0) {
        a = a.children[i[2]];
      }
      console.log(a.value);
      if (i[0] == 0) {
        this.area = a.value;
      } else {
        this.subway = a.value;
      }
      this.onRefersh();
      this.$refs.areaClose.toggle(false);
    },
    // 方式
    onMethodCancel() {
      this.$refs.methodClose.toggle(false);
    },
    onMethodConfirm(e, i) {
      console.log(e, i, "方式");
      this.rent_type = e.value;
      this.onRefersh();
      this.$refs.methodClose.toggle(false);
    },
    // 租金
    onPriceCancel() {
      this.$refs.priceClose.toggle(false);
    },
    onPriceConfirm(e, i) {
      console.log(e, i);
      this.price = e.value;
      this.onRefersh();
      this.$refs.priceClose.toggle(false);
    },
  },
};
</script>

<style scoped lang="less">
.scroll {
  height: 1150px;
  overflow: scroll;
}
.findhouse-search {
  width: 700px;
  margin-left: 50px;
  margin-top: -15px;
}
.nav-bar {
  height: 100px;
}
.van-card__title {
  font-weight: 700;
  font-size: 30px;
}
.van-card__desc {
  color: #afb2b3;
}
.text {
  font-size: 32px;
  margin-left: 30px;
  color: #333;
}
.hx-box {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
  margin-left: 120px;
  .huxing {
    display: inline-block;
    margin: 0 30px 30px 0;
    width: 150px;
    height: 70px;
    border: 1px solid #ddd;
    text-align: center;
    color: #888;
    font-size: 28px;
    line-height: 70px;
  }
}
.btn {
  .close-btn {
    width: 30%;
    height: 100px;
  }
  .agree-btn {
    width: 70%;
    height: 100px;
  }
}
.van-hairline--top::after {
  border: 0;
}
.popup_box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  height: 100vh;
  .filterBtn {
    flex: 1;
    overflow: auto;
  }
  .btn {
    height: 100px;
    width: 100%;
  }
  .actived {
    border: 1px solid #21b97a;
    color: #21b97a;
    background-color: #defaef;
  }
}
</style>
