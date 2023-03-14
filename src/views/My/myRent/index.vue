<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      class="nav-bar"
      title="我的出租"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!-- 收藏列表 -->
    <div v-if="myRent.length">
      <van-card
        v-for="(item, index) in myRent"
        :key="index + item.houseCode"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="'http://liufusong.top:8080' + item.houseImg"
      >
        <template #tags>
          <van-tag
            plain
            type="danger"
            text-color="#39becd"
            v-for="value in item.tags"
            :key="value"
          >
            {{ value }}
          </van-tag>
        </template>
      </van-card>
    </div>
    <!-- 没有发布房源 -->
    <div v-else @click="onJumpFindHouse">
      <van-empty description="您还没有房源，去发布房源吧~" />
    </div>
  </div>
</template>

<script>
import { getMyRent } from "@/api/myRent";
export default {
  data() {
    return {
      myRent: [],
    };
  },
  created() {
    this.onMyRent();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onJumpFindHouse() {
      this.$router.push({
        name: "goRent",
      });
    },
    async onMyRent() {
      const { data } = await getMyRent();
      console.log(data, "onMyRent");
      this.myRent = data.body;
    },
  },
};
</script>

<style scoped lang="less">
.van-card__title {
  font-weight: 700;
  font-size: 30px;
}
.van-card__desc {
  color: #afb2b3;
}
</style>
