<template>
  <div>
    <!-- 搜索框 -->
    <Search></Search>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipesImg" :key="item.id">
        <img :src="'http://liufusong.top:8080' + item.imgSrc" :alt="item.alt" />
      </van-swipe-item>
    </van-swipe>
    <!-- 中间导航栏 -->
    <van-grid>
      <van-grid-item icon="wap-home-o" text="整租" to="/house" />
      <van-grid-item icon="friends-o" text="合租" to="/house" />
      <van-grid-item icon="location-o" text="地图找房" @click="onJumpMap" />
      <van-grid-item icon="home-o" text="去出租" @click="onJumpGroent" />
    </van-grid>
    <!-- <router-view></router-view> -->
    <!-- 主体部分 -->
    <div class="main">
      <van-cell title="租房小组" value="更多" />
      <van-grid
        :border="false"
        :column-num="2"
        class="house_list"
        gutter="10px"
      >
        <van-grid-item v-for="item in areaList" :key="item.id">
          <div class="img">
            <van-image :src="'http://liufusong.top:8080' + item.imgSrc" />
            <div class="text">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import { getSwipes, getGroups } from "@/api/home";
import { mapState } from "vuex";

export default {
  components: {
    Search,
  },
  data() {
    return {
      swipesImg: [],
      areaList: [],
      area: "AREA%7C88cff55c-aaa4-e2e0",
    };
  },
  computed: {
    ...mapState(["state_city"]),
  },
  created() {
    this.onGroups();
    this.onSwipes();
  },
  methods: {
    async onGroups() {
      this.area = this.state_city.value;
      const { data } = await getGroups({ area: this.area });
      // console.log(data, "data");
      this.areaList = data.body;
    },
    async onSwipes() {
      const { data } = await getSwipes();
      this.swipesImg = data.body;
    },
    onJumpGroent() {
      if (!this.$store.state.token) {
        this.$router.push({
          name: "Login",
        });
        return;
      }
      this.$router.push({
        name: "goRent",
      });
    },
    onJumpMap() {
      // if (!this.$store.state.token) {
      //   this.$router.push({
      //     name: "Login",
      //   });
      //   return;
      // }
      this.$router.push({
        name: "Map",
      });
    },
  },
};
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  height: 400px;
}
.van-swipe-item img {
  width: 100%;
}
.nav .title {
  margin: 12px 0;
  font-size: 24px;
}
.main {
  background-color: #f6f5f6;
  overflow: hidden;
  padding: 0 10px;
  height: 400px;
  .van-cell__title {
    font-weight: 700;
    font-size: 32px;
  }
}
.house_list {
  padding: 0 10px;
  /deep/.van-grid-item {
    border-radius: 10px;
    padding: 0;
    border: 0;
    height: 120px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .img {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .text {
        font-size: 16px;
      }
    }
  }
}
/deep/.van-image__img {
  width: 100px;
  height: 100px;
  margin-right: 30px;
}
/deep/.van-grid-item__icon {
  font-size: 70px;
  color: #1cb777;
}
.van-cell {
  background-color: #f6f5f6;
}
</style>
