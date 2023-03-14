<template>
  <van-search
    class="search"
    show-action
    placeholder="  请输入小区或地址"
    disabled
    :background="background"
  >
    <!--  -->
    <template #left-icon>
      <div class="fsc">
        <span @click="onCityName">{{ state_city.label }}</span>
        <van-icon class="xiajiantou" @click="onCityName" name="arrow-down" />
        <span class="line_search"></span>
        <van-icon class="sousuo" name="search" style="display: inline-block" />
      </div>
    </template>
    <!-- 定位图标 -->
    <template #action>
      <div>
        <van-icon
          class="loc-icon"
          name="location-o"
          size="50"
          color="#fff"
          @click="onMap"
        />
      </div>
    </template>
  </van-search>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  props: {
    background: { type: String },
  },
  methods: {
    onCityName() {
      this.$router.push({
        name: "CityList",
      });
    },
    onMap() {
      this.$router.push({
        name: "Map",
      });
    },
  },
  computed: {
    ...mapState(["state_city"]),
  },
};
</script>

<style lang="less" scoped>
.search {
  position: fixed;
  top: 25px;
  left: 0;
  padding: 0 10px 0 50px;
  z-index: 100;
  width: 100%;
  background-color: transparent;
  .line_search {
    margin: 0 10px;
    height: 40px;
    width: 2px;
    background-color: #eee;
  }
  .fsc {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .xiajiantou {
      font-size: 20px;
    }
    .sousuo {
      font-size: 37px;
      color: #999;
    }
  }
  .loc-icon {
    font-size: 50px !important;
    line-height: 70px;
  }
}
</style>
