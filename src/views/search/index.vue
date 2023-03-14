<template>
  <div>
    <div>
      <form action="/">
        <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @focus="isShow = true"
          @cancel="onCancel"
        />
      </form>
    </div>
    <!-- 搜索建议 -->
    <SearchSuggestion
      v-if="searchText"
      :searchText="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
  </div>
</template>

<script>
import SearchSuggestion from "@/views/search/component/search-suggestion.vue";
export default {
  components: { SearchSuggestion },
  data() {
    return {
      searchText: "",
      isShow: false,
    };
  },
  methods: {
    onSearch(value) {
      this.searchText = value.communityName;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
