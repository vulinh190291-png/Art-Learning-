"use strict";
const common_vendor = require("../../common/vendor.js");
const api_post = require("../../api/post.js");
if (!Array) {
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_u_empty2 = common_vendor.resolveComponent("u-empty");
  const _easycom_u__image2 = common_vendor.resolveComponent("u--image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_loading_icon2 + _easycom_u_empty2 + _easycom_u__image2 + _easycom_u_icon2 + _easycom_u_divider2 + _easycom_u__input2 + _easycom_u_button2 + _easycom_u_popup2)();
}
const _easycom_u_loading_icon = () => "../../uni_modules/uview-plus/components/u-loading-icon/u-loading-icon.js";
const _easycom_u_empty = () => "../../uni_modules/uview-plus/components/u-empty/u-empty.js";
const _easycom_u__image = () => "../../uni_modules/uview-plus/components/u--image/u--image.js";
const _easycom_u_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u__input = () => "../../uni_modules/uview-plus/components/u--input/u--input.js";
const _easycom_u_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_loading_icon + _easycom_u_empty + _easycom_u__image + _easycom_u_icon + _easycom_u_divider + _easycom_u__input + _easycom_u_button + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "my_collections",
  setup(__props) {
    const posts = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const isLoggedIn = common_vendor.ref(false);
    const userInfo = common_vendor.ref(null);
    const isDetailShow = common_vendor.ref(false);
    const selectedPost = common_vendor.ref(null);
    const newCommentContent = common_vendor.ref("");
    const sendBtnStyle = common_vendor.computed(() => ({
      backgroundColor: "#008585",
      color: "#fff",
      width: "140rpx",
      height: "64rpx",
      margin: "0 0 0 20rpx"
    }));
    const fetchCollections = async () => {
      isLoading.value = true;
      try {
        const res = await api_post.getCollectionsApi({ userId: userInfo.value.id });
        posts.value = res.posts || [];
      } catch (error) {
        posts.value = [];
        common_vendor.index.__f__("error", "at pages/my_collections/my_collections.vue:131", "获取收藏列表失败:", error);
      } finally {
        isLoading.value = false;
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
        common_vendor.index.__f__("error", "at pages/my_collections/my_collections.vue:151", "点赞操作失败:", error);
      }
    };
    const handleCollect = async (post) => {
      if (!isLoggedIn.value)
        return common_vendor.index.showToast({ title: "请先登录", icon: "none" });
      const index = posts.value.findIndex((p) => p.id === post.id);
      if (index > -1) {
        posts.value.splice(index, 1);
      }
      if (selectedPost.value && selectedPost.value.id === post.id) {
        selectedPost.value.isCollected = false;
      }
      try {
        await api_post.collectPostApi(post.id, { userId: userInfo.value.id });
        common_vendor.index.$emit("collection-changed");
      } catch (error) {
        fetchCollections();
        common_vendor.index.__f__("error", "at pages/my_collections/my_collections.vue:174", "取消收藏失败:", error);
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
        common_vendor.index.__f__("error", "at pages/my_collections/my_collections.vue:204", "评论失败:", error);
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
              onDetailClose();
              fetchCollections();
              common_vendor.index.$emit("collection-changed");
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/my_collections/my_collections.vue:221", "删除帖子失败:", error);
            }
          }
        }
      });
    };
    const checkLoginStatus = () => {
      const user = common_vendor.index.getStorageSync("user_info");
      userInfo.value = user;
      isLoggedIn.value = !!user;
    };
    const showPostDetail = (post) => {
      selectedPost.value = { ...post };
      isDetailShow.value = true;
    };
    const onDetailClose = () => {
      isDetailShow.value = false;
      selectedPost.value = null;
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
      if (!isLoggedIn.value) {
        isLoading.value = false;
        posts.value = [];
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录查看收藏",
          showCancel: false,
          success: () => common_vendor.index.switchTab({ url: "/pages/profile/profile" })
        });
      } else {
        fetchCollections();
      }
      common_vendor.index.$on("collection-changed", fetchCollections);
    });
    common_vendor.onHide(() => {
      common_vendor.index.$off("collection-changed", fetchCollections);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {
        b: common_vendor.p({
          mode: "circle",
          size: "30"
        })
      } : posts.value.length === 0 ? {
        d: common_vendor.p({
          mode: "favor",
          text: "你还没有任何收藏"
        })
      } : {
        e: common_vendor.f(posts.value, (item, k0, i0) => {
          return {
            a: "6161ca9c-2-" + i0,
            b: common_vendor.p({
              src: item.imageUrl,
              width: "100%",
              radius: "8",
              ["lazy-load"]: true
            }),
            c: common_vendor.t(item.title),
            d: "6161ca9c-3-" + i0,
            e: common_vendor.p({
              src: item.userAvatar,
              width: "40rpx",
              height: "40rpx",
              shape: "circle"
            }),
            f: common_vendor.t(item.userNickname),
            g: "6161ca9c-4-" + i0,
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
        c: posts.value.length === 0,
        f: selectedPost.value
      }, selectedPost.value ? common_vendor.e({
        g: common_vendor.o(onDetailClose),
        h: common_vendor.p({
          name: "close",
          size: "20"
        }),
        i: common_vendor.p({
          src: selectedPost.value.userAvatar,
          width: "80rpx",
          height: "80rpx",
          shape: "circle"
        }),
        j: common_vendor.t(selectedPost.value.userNickname),
        k: common_vendor.t(formatTimestamp(selectedPost.value.createdAt)),
        l: common_vendor.t(selectedPost.value.title),
        m: selectedPost.value.description
      }, selectedPost.value.description ? {
        n: common_vendor.t(selectedPost.value.description)
      } : {}, {
        o: common_vendor.p({
          src: selectedPost.value.imageUrl,
          width: "100%",
          mode: "widthFix",
          radius: "8"
        }),
        p: selectedPost.value.artCategory
      }, selectedPost.value.artCategory ? {
        q: common_vendor.t(selectedPost.value.artCategory)
      } : {}, {
        r: common_vendor.p({
          text: "评论区"
        }),
        s: !selectedPost.value.comments || selectedPost.value.comments.length === 0
      }, !selectedPost.value.comments || selectedPost.value.comments.length === 0 ? {
        t: common_vendor.p({
          mode: "comment",
          text: "还没有评论，快来抢沙发吧！"
        })
      } : {
        v: common_vendor.f(selectedPost.value.comments, (comment, k0, i0) => {
          return {
            a: "6161ca9c-11-" + i0 + ",6161ca9c-5",
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
        w: common_vendor.o(($event) => newCommentContent.value = $event),
        x: common_vendor.p({
          placeholder: "发表你的看法...",
          border: "surround",
          shape: "round",
          ["adjust-position"]: false,
          modelValue: newCommentContent.value
        }),
        y: common_vendor.o(handleCommentSubmit),
        z: common_vendor.p({
          text: "发送",
          type: "primary",
          customStyle: sendBtnStyle.value
        }),
        A: common_vendor.p({
          name: selectedPost.value.isLiked ? "heart-fill" : "heart",
          color: selectedPost.value.isLiked ? "#c7522a" : "#333",
          size: "24"
        }),
        B: common_vendor.t(selectedPost.value.likes > 0 ? selectedPost.value.likes : "点赞"),
        C: common_vendor.o(($event) => handleLike(selectedPost.value)),
        D: common_vendor.p({
          name: "chat",
          color: "#333",
          size: "24"
        }),
        E: common_vendor.p({
          name: selectedPost.value.isCollected ? "star-fill" : "star",
          color: selectedPost.value.isCollected ? "#f0daa5" : "#333",
          size: "24"
        }),
        F: common_vendor.o(($event) => handleCollect(selectedPost.value)),
        G: isLoggedIn.value && userInfo.value.id === selectedPost.value.userId
      }, isLoggedIn.value && userInfo.value.id === selectedPost.value.userId ? {
        H: common_vendor.p({
          name: "trash",
          color: "#c7522a",
          size: "24"
        }),
        I: common_vendor.o(handleDeletePost)
      } : {}) : {}, {
        J: common_vendor.o(onDetailClose),
        K: common_vendor.p({
          show: isDetailShow.value,
          mode: "bottom",
          round: "20"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6161ca9c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my_collections/my_collections.js.map
