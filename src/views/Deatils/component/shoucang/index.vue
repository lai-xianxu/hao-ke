<template>
  <div>
    <van-button class="pre-btn text">
      <template #icon>
        <!-- color:this.isChecked ? 'red':'' -->
        <!-- :name="this.isChecked ? 'star-o' : 'star' -->
        <van-icon :name="this.isChecked ? 'star-o' : 'star'"></van-icon>
      </template>
      收藏
    </van-button>
  </div>
</template>

<script>
import { getLike } from "@/api/favorite";

export default {
  data() {
    return {};
  },
  created() {
    this.onLike();
  },
  model: {
    prop: "isChecked",
    event: "changeCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClickChecked() {
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
      this.isChecked = true;
    },
    async onLike() {
      const data = await getLike();
      console.log(data);
    },
  },
};
</script>

<style scoped lang="less"></style>
