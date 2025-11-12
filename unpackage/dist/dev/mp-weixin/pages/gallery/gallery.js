"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u__image2 = common_vendor.resolveComponent("u--image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_tabs2 + _easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u__image2 + _easycom_u_icon2 + _easycom_u_loadmore2 + _easycom_u_divider2 + _easycom_u__input2 + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u__image = () => "../../uni_modules/uview-plus/components/u--image/u--image.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_loadmore = () => "../../uni_modules/uview-plus/components/u-loadmore/u-loadmore.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_loading_icon + _easycom_u_empty + _easycom_u__image + _easycom_u_icon + _easycom_u_loadmore + _easycom_u_divider + _easycom_u__input + _easycom_u_button + _easycom_u_popup)();
}
const limit = 6;
const _sfc_main = {
  __name: "gallery",
  setup(__props) {
    const posts = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const isLoggedIn = common_vendor.ref(false);
    const userInfo = common_vendor.ref(null);
    const isDetailShow = common_vendor.ref(false);
    const selectedPost = common_vendor.ref(null);
    const newCommentContent = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const loadMoreStatus = common_vendor.ref("loadmore");
    const sortTabs = common_vendor.ref([{ name: "最新" }, { name: "热门" }]);
    const currentSortBy = common_vendor.ref("latest");
    const currentSortIndex = common_vendor.ref(0);
    const sendBtnStyle = common_vendor.computed(() => ({
      backgroundColor: "#008585",
      color: "#fff",
      width: "140rpx",
      height: "64rpx",
      margin: "0 0 0 20rpx"
    }));
    const fetchPosts = async (isLoadMore = false) => {
      if (isLoadMore && !hasMore.value) {
        loadMoreStatus.value = "nomore";
        return;
      }
      loadMoreStatus.value = "loading";
      try {
        const params = {
          sortBy: currentSortBy.value,
          page: page.value,
          limit,
          userId: userInfo.value ? userInfo.value.id : null
        };
        const [res] = await Promise.all([
          api_post.getPostsApi(params),
          new Promise((resolve) => setTimeout(resolve, 500))
        ]);
        const fetchedPosts = res.posts || [];
        posts.value = isLoadMore ? [...posts.value, ...fetchedPosts] : fetchedPosts;
        hasMore.value = res.hasMore;
        loadMoreStatus.value = hasMore.value ? "loadmore" : "nomore";
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/gallery/gallery.vue:171", "获取帖子列表失败:", error);
        loadMoreStatus.value = "loadmore";
      } finally {
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      }
    };
    const handleLike = async (post) => {
      if (!isLoggedIn.value)
        return common_vendor.index.showToast({ title: "请先登录", icon: "none" });
      const originalIsLiked = post.isLiked;
      const originalLikes = post.likes;
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      try {
        await api_post.likePostApi(post.id, { userId: userInfo.value.id });
      } catch (error) {
        post.isLiked = originalIsLiked;
        post.likes = originalLikes;
        common_vendor.index.__f__("error", "at pages/gallery/gallery.vue:193", "点赞操作失败:", error);
      }
    };
    const handleCollect = async (post) => {
      if (!isLoggedIn.value)
        return common_vendor.index.showToast({ title: "请先登录", icon: "none" });
      const originalIsCollected = post.isCollected;
      post.isCollected = !post.isCollected;
      try {
        await api_post.collectPostApi(post.id, { userId: userInfo.value.id });
      } catch (error) {
        post.isCollected = originalIsCollected;
        common_vendor.index.__f__("error", "at pages/gallery/gallery.vue:207", "收藏操作失败:", error);
      }
    };
    const handleCommentSubmit = async () => {
      if (!isLoggedIn.value)
        return common_vendor.index.showToast({ title: "请先登录", icon: "none" });
      const content = newCommentContent.value.trim();
      if (!content)
        return common_vendor.index.showToast({ title: "评论内容不能为空", icon: "none" });
      const tempId = `temp_${Date.now()}`;
      const tempComment = {
        commentId: tempId,
        userId: userInfo.value.id,
        userNickname: userInfo.value.nickname,
        userAvatar: userInfo.value.avatar,
        content,
        createdAt: Date.now()
      };
      selectedPost.value.comments.push(tempComment);
      newCommentContent.value = "";
      try {
        const res = await api_post.addCommentApi(selectedPost.value.id, { userId: userInfo.value.id, content });
        const finalComment = res.comment;
        const commentIndex = selectedPost.value.comments.findIndex((c) => c.commentId === tempId);
        if (commentIndex > -1) {
          selectedPost.value.comments.splice(commentIndex, 1, finalComment);
        }
      } catch (error) {
        const commentIndex = selectedPost.value.comments.findIndex((c) => c.commentId === tempId);
        if (commentIndex > -1) {
          selectedPost.value.comments.splice(commentIndex, 1);
        }
        common_vendor.index.__f__("error", "at pages/gallery/gallery.vue:242", "评论失败:", error);
      }
    };
    const handleDeletePost = () => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这幅作品吗？此操作无法撤销。",
        success: async (res) => {
          if (res.confirm) {
            try {
              await api_post.deletePostApi(selectedPost.value.id, { userId: userInfo.value.id });
              isDetailShow.value = false;
              handleRefresh();
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/gallery/gallery.vue:257", "删除帖子失败:", error);
            }
          }
        }
      });
    };
    const handleRefresh = () => {
      posts.value = [];
      page.value = 1;
      hasMore.value = true;
      isLoading.value = true;
      loadMoreStatus.value = "loadmore";
      fetchPosts();
    };
    const onSortTabClick = (item) => {
      const newSortBy = item.index === 0 ? "latest" : "popular";
      if (currentSortBy.value === newSortBy)
        return;
      currentSortIndex.value = item.index;
      currentSortBy.value = newSortBy;
      handleRefresh();
    };
    const checkLoginStatus = () => {
      const user = common_vendor.index.getStorageSync("user_info");
      userInfo.value = user;
      isLoggedIn.value = !!user;
    };
    const goToPostPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/post/post" });
    };
    const showPostDetail = (post) => {
      selectedPost.value = { ...post };
      isDetailShow.value = true;
    };
    const formatTimestamp = (timestamp) => {
      if (!timestamp)
        return "";
      const now = Date.now();
      const diff = (now - new Date(timestamp).getTime()) / 1e3;
      if (diff < 60)
        return "刚刚";
      if (diff < 3600)
        return `${Math.floor(diff / 60)}分钟前`;
      if (diff < 86400)
        return `${Math.floor(diff / 3600)}小时前`;
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };
    common_vendor.onShow(() => {
      checkLoginStatus();
      handleRefresh();
      common_vendor.index.$on("post-success", handleRefresh);
    });
    common_vendor.onHide(() => {
      common_vendor.index.$off("post-success");
    });
    common_vendor.onPullDownRefresh(() => {
      handleRefresh();
    });
    common_vendor.onReachBottom(() => {
      if (hasMore.value) {
        page.value++;
        fetchPosts(true);
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onSortTabClick),
        b: common_vendor.p({
          list: sortTabs.value,
          current: currentSortIndex.value,
          activeStyle: {
            color: "#008585",
            fontWeight: "bold"
          }
        }),
        c: isLoading.value && posts.value.length === 0
      }, isLoading.value && posts.value.length === 0 ? {
        d: common_vendor.p({
          mode: "circle",
          size: "30",
          text: "正在加载画廊..."
        })
      } : posts.value.length === 0 ? {
        f: common_vendor.p({
          mode: "list",
          icon: "/static/logo.png",
          text: "画廊里空空如也，快来发布第一幅作品吧！"
        })
      } : {
        g: common_vendor.f(posts.value, (item, index, i0) => {
          return {
            a: "ff88f784-3-" + i0,
            b: common_vendor.p({
              src: item.imageUrl,
              width: "100%",
              radius: "8",
              ["lazy-load"]: true,
              ["show-loading"]: true
            }),
            c: common_vendor.t(item.title),
            d: "ff88f784-4-" + i0,
            e: common_vendor.p({
              src: item.userAvatar,
              width: "40rpx",
              height: "40rpx",
              shape: "circle"
            }),
            f: common_vendor.t(item.userNickname),
            g: "ff88f784-5-" + i0,
            h: common_vendor.p({
              name: item.isLiked ? "heart-fill" : "heart",
              color: item.isLiked ? "#c7522a" : "#666",
              size: "20"
            }),
            i: common_vendor.t(item.likes > 0 ? item.likes : ""),
            j: common_vendor.o(($event) => handleLike(item), item.id),
            k: item.id,
            l: common_vendor.o(($event) => showPostDetail(item), item.id)
          };
        })
      }, {
        e: posts.value.length === 0,
        h: posts.value.length > 0
      }, posts.value.length > 0 ? {
        i: common_vendor.p({
          status: loadMoreStatus.value
        })
      } : {}, {
        j: isLoggedIn.value
      }, isLoggedIn.value ? {
        k: common_vendor.p({
          name: "plus",
          color: "#fff",
          size: "28"
        }),
        l: common_vendor.o(goToPostPage)
      } : {}, {
        m: selectedPost.value
      }, selectedPost.value ? common_vendor.e({
        n: common_vendor.o(($event) => isDetailShow.value = false),
        o: common_vendor.p({
          name: "close",
          size: "20"
        }),
        p: common_vendor.p({
          src: selectedPost.value.userAvatar,
          width: "80rpx",
          height: "80rpx",
          shape: "circle"
        }),
        q: common_vendor.t(selectedPost.value.userNickname),
        r: common_vendor.t(formatTimestamp(selectedPost.value.createdAt)),
        s: common_vendor.t(selectedPost.value.title),
        t: selectedPost.value.description
      }, selectedPost.value.description ? {
        v: common_vendor.t(selectedPost.value.description)
      } : {}, {
        w: common_vendor.p({
          src: selectedPost.value.imageUrl,
          width: "100%",
          mode: "widthFix",
          radius: "8"
        }),
        x: selectedPost.value.artCategory
      }, selectedPost.value.artCategory ? {
        y: common_vendor.t(selectedPost.value.artCategory)
      } : {}, {
        z: common_vendor.p({
          text: "评论区"
        }),
        A: !selectedPost.value.comments || selectedPost.value.comments.length === 0
      }, !selectedPost.value.comments || selectedPost.value.comments.length === 0 ? {
        B: common_vendor.p({
          mode: "comment",
          text: "还没有评论，快来抢沙发吧！"
        })
      } : {
        C: common_vendor.f(selectedPost.value.comments, (comment, k0, i0) => {
          return {
            a: "ff88f784-14-" + i0 + ",ff88f784-8",
            b: common_vendor.p({
              src: comment.userAvatar,
              width: "64rpx",
              height: "64rpx",
              shape: "circle"
            }),
            c: common_vendor.t(comment.userNickname),
            d: common_vendor.t(formatTimestamp(comment.createdAt)),
            e: common_vendor.t(comment.content),
            f: comment.commentId
          };
        })
      }, {
        D: common_vendor.o(($event) => newCommentContent.value = $event),
        E: common_vendor.p({
          placeholder: "发表你的看法...",
          border: "surround",
          shape: "round",
          ["adjust-position"]: false,
          modelValue: newCommentContent.value
        }),
        F: common_vendor.o(handleCommentSubmit),
        G: common_vendor.p({
          text: "发送",
          type: "primary",
          customStyle: sendBtnStyle.value
        }),
        H: common_vendor.p({
          name: selectedPost.value.isLiked ? "heart-fill" : "heart",
          color: selectedPost.value.isLiked ? "#c7522a" : "#333",
          size: "24"
        }),
        I: common_vendor.t(selectedPost.value.likes > 0 ? selectedPost.value.likes : "点赞"),
        J: common_vendor.o(($event) => handleLike(selectedPost.value)),
        K: common_vendor.p({
          name: "chat",
          color: "#333",
          size: "24"
        }),
        L: common_vendor.p({
          name: selectedPost.value.isCollected ? "star-fill" : "star",
          color: selectedPost.value.isCollected ? "#f0daa5" : "#333",
          size: "24"
        }),
        M: common_vendor.o(($event) => handleCollect(selectedPost.value)),
        N: isLoggedIn.value && userInfo.value.id === selectedPost.value.userId
      }, isLoggedIn.value && userInfo.value.id === selectedPost.value.userId ? {
        O: common_vendor.p({
          name: "trash",
          color: "#c7522a",
          size: "24"
        }),
        P: common_vendor.o(handleDeletePost)
      } : {}) : {}, {
        Q: common_vendor.o(($event) => isDetailShow.value = false),
        R: common_vendor.p({
          show: isDetailShow.value,
          mode: "bottom",
          round: "20"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff88f784"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/gallery/gallery.js.map
