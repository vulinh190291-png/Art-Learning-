"use strict";
const common_vendor = require("../../common/vendor.js");
const api_common = require("../../api/common.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_collapse_item2 = common_vendor.resolveComponent("u-collapse-item");
  const _easycom_u_collapse2 = common_vendor.resolveComponent("u-collapse");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u_button2 + _easycom_u_collapse_item2 + _easycom_u_collapse2 + _easycom_u_icon2 + _easycom_u_swiper2 + _easycom_u__text2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_collapse_item = () => "../../uni_modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_u_collapse = () => "../../uni_modules/uview-plus/components/u-collapse/u-collapse.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_swiper = () => "../../uni_modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u__text = () => "../../uni_modules/uview-plus/components/u--text/u--text.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_loading_icon + _easycom_u_empty + _easycom_u_button + _easycom_u_collapse_item + _easycom_u_collapse + _easycom_u_icon + _easycom_u_swiper + _easycom_u__text + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const artData = common_vendor.ref([]);
    const showDetailPopup = common_vendor.ref(false);
    const selectedSubCategory = common_vendor.ref(null);
    const isLoading = common_vendor.ref(true);
    const loadError = common_vendor.ref(false);
    const featuredItem = common_vendor.ref(null);
    const retryBtnStyle = common_vendor.computed(() => ({
      width: "200rpx",
      height: "70rpx",
      marginTop: "20rpx",
      background: "linear-gradient(to right, #008585, #004343)",
      color: "#fff",
      border: "none"
    }));
    const fetchArtStyles = async () => {
      try {
        const res = await api_common.getArtStylesApi();
        artData.value = res.art_styles || [];
        loadError.value = false;
      } catch (error) {
        loadError.value = true;
        common_vendor.index.__f__("error", "at pages/index/index.vue:129", "获取艺术风格失败:", error);
      }
    };
    const fetchFeaturedContent = async () => {
      try {
        const res = await api_common.getFeaturedApi();
        featuredItem.value = res.item;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:138", "获取推荐内容失败:", error);
      }
    };
    const fetchAllData = async () => {
      isLoading.value = true;
      await Promise.all([
        fetchArtStyles(),
        fetchFeaturedContent()
      ]);
      isLoading.value = false;
    };
    common_vendor.watch(keyword, (newValue) => {
      if (newValue.trim()) {
        for (const category of artData.value) {
          if (category.sub_categories && Array.isArray(category.sub_categories)) {
            const foundSubCategory = category.sub_categories.find((sub) => sub.name === newValue.trim());
            if (foundSubCategory) {
              onSubCategoryClick(foundSubCategory);
              break;
            }
          }
        }
      }
    });
    const formatFeaturedImagePath = (item) => {
      if (!item)
        return "";
      let imagePath = item.coverImage || item.imageUrl || "";
      if (!imagePath)
        return "/static/logo.png";
      if (imagePath.endsWith(".png") || imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")) {
        return imagePath;
      }
      if (item.type === "course")
        return `${imagePath}.png`;
      if (item.type === "product")
        return `${imagePath}.jpg`;
      return imagePath;
    };
    const goToFeaturedDetail = () => {
      if (!featuredItem.value)
        return;
      const item = featuredItem.value;
      switch (item.type) {
        case "course":
          common_vendor.index.navigateTo({ url: `/pages/course_detail/course_detail?id=${item.id}` });
          break;
        case "product":
          common_vendor.index.navigateTo({ url: `/pages/product_detail/product_detail?id=${item.id}` });
          break;
        case "post":
          common_vendor.index.switchTab({ url: "/pages/gallery/gallery" });
          break;
      }
    };
    const onSubCategoryClick = (subItem) => {
      selectedSubCategory.value = subItem;
      showDetailPopup.value = true;
    };
    const onPopupClose = () => {
      showDetailPopup.value = false;
      keyword.value = "";
    };
    const onSearchClear = () => {
      showDetailPopup.value = false;
    };
    common_vendor.onMounted(() => {
      fetchAllData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSearchClear),
        b: common_vendor.o(($event) => keyword.value = $event),
        c: common_vendor.p({
          placeholder: "探索中华艺术瑰宝",
          showAction: false,
          bgColor: "#ffffff",
          height: "80rpx",
          searchIconColor: "#004343",
          placeholderColor: "#909399",
          shape: "round",
          modelValue: keyword.value
        }),
        d: featuredItem.value
      }, featuredItem.value ? {
        e: formatFeaturedImagePath(featuredItem.value),
        f: common_vendor.t(featuredItem.value.title),
        g: common_vendor.t(featuredItem.value.description),
        h: common_vendor.o(goToFeaturedDetail)
      } : {}, {
        i: isLoading.value
      }, isLoading.value ? {
        j: common_vendor.p({
          mode: "circle",
          size: "30",
          text: "正在加载艺术瑰宝...",
          textSize: "16"
        })
      } : loadError.value ? {
        l: common_vendor.p({
          mode: "data",
          icon: "/static/logo.png",
          text: "数据加载失败"
        }),
        m: common_vendor.o(fetchAllData),
        n: common_vendor.p({
          type: "primary",
          customStyle: retryBtnStyle.value,
          text: "重新加载"
        })
      } : {
        o: common_vendor.f(artData.value, (art, k0, i0) => {
          return {
            a: art.icon,
            b: common_vendor.t(art.category),
            c: common_vendor.f(art.sub_categories, (sub, index, i1) => {
              return {
                a: common_vendor.t(sub.name),
                b: index,
                c: common_vendor.o(($event) => onSubCategoryClick(sub), index)
              };
            }),
            d: "1cf27b2a-5-" + i0 + ",1cf27b2a-4",
            e: art.id
          };
        }),
        p: common_vendor.p({
          border: false
        })
      }, {
        k: loadError.value,
        q: common_vendor.o(onPopupClose),
        r: common_vendor.p({
          name: "close",
          size: "20"
        }),
        s: selectedSubCategory.value
      }, selectedSubCategory.value ? {
        t: common_vendor.p({
          list: selectedSubCategory.value.representative_works,
          height: "400rpx",
          imgMode: "aspectFit",
          circular: true,
          indicator: true,
          indicatorMode: "dot"
        }),
        v: common_vendor.t(selectedSubCategory.value.name),
        w: common_vendor.p({
          text: selectedSubCategory.value.introduction,
          color: "#333",
          lineHeight: "24"
        }),
        x: common_vendor.p({
          text: selectedSubCategory.value.history,
          color: "#333",
          lineHeight: "24"
        }),
        y: common_vendor.p({
          text: selectedSubCategory.value.features,
          color: "#333",
          lineHeight: "24"
        }),
        z: common_vendor.p({
          text: selectedSubCategory.value.cultural_meaning,
          color: "#333",
          lineHeight: "24"
        })
      } : {}, {
        A: common_vendor.o(onPopupClose),
        B: common_vendor.p({
          show: showDetailPopup.value,
          mode: "bottom",
          round: "20"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
