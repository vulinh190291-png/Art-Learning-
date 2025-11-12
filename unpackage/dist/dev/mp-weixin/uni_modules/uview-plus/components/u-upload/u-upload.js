"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uviewPlus_components_uUpload_utils = require("./utils.js");
const uni_modules_uviewPlus_components_uUpload_mixin = require("./mixin.js");
const uni_modules_uviewPlus_components_uUpload_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const uni_modules_uviewPlus_libs_function_test = require("../../libs/function/test.js");
const _sfc_main = {
  name: "u-upload",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uUpload_mixin.mixinUpload, uni_modules_uviewPlus_components_uUpload_props.props],
  data() {
    return {
      lists: [],
      isInCount: true,
      popupShow: false,
      currentItemIndex: -1
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      handler() {
        this.formatFileList();
      },
      immediate: true,
      deep: true
    },
    deletable(newVal) {
      this.formatFileList();
    },
    maxCount(newVal) {
      this.formatFileList();
    },
    accept(newVal) {
      this.formatFileList();
    },
    popupShow(newVal) {
      if (!newVal) {
        this.currentItemIndex = -1;
      }
    }
  },
  emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview", "update:fileList", "afterAutoUpload"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.addUnit,
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle,
    videoErrorCallback() {
    },
    loadedVideoMetadata(e) {
      if (this.currentItemIndex < 0) {
        return;
      }
      if (this.autoUploadDriver != "local") {
        return;
      }
      if (!this.getVideoThumb) {
        return;
      }
      let w = this.lists[this.currentItemIndex].width;
      let h = this.lists[this.currentItemIndex].height;
      const dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
      common_vendor.index.createSelectorQuery().select("#myVideo").context((res) => {
        common_vendor.index.__f__("log", "at uni_modules/uview-plus/components/u-upload/u-upload.vue:291", "select video", res);
        const myVideo = res.context;
        common_vendor.index.createSelectorQuery().select("#myCanvas").fields({ node: true, size: true }).exec(([res2]) => {
          common_vendor.index.__f__("log", "at uni_modules/uview-plus/components/u-upload/u-upload.vue:297", "select canvas", res2);
          const ctx1 = res2[0].node.getContext("2d");
          res2[0].node.width = w * dpr;
          res2[0].node.height = h * dpr;
          setTimeout(() => {
            captureFirstFrame();
          }, 500);
          const captureFirstFrame = () => {
            ctx1.drawImage(myVideo, 0, 0, w * dpr, h * dpr);
            common_vendor.wx$1.canvasToTempFilePath({
              canvas: res2[0].node,
              success: (result) => {
                common_vendor.index.__f__("log", "at uni_modules/uview-plus/components/u-upload/u-upload.vue:312", "First frame image path:", result.tempFilePath);
                this.fileList["currentItemIndex"].thumb = result.tempFilePath;
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at uni_modules/uview-plus/components/u-upload/u-upload.vue:318", "Failed to export image:", err);
              }
            });
          };
          setInterval(() => {
            ctx1.drawImage(myVideo, 0, 0, w * dpr, h * dpr);
          }, 1e3 / 24);
        }).exec();
      }).exec();
    },
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map((item) => {
        const name = item.name || item.url || item.thumb;
        return Object.assign(Object.assign({}, item), {
          // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
          isImage: item.name ? uni_modules_uviewPlus_libs_function_test.test.image(item.name) : this.accept === "image" || uni_modules_uviewPlus_libs_function_test.test.image(name),
          isVideo: item.name ? uni_modules_uviewPlus_libs_function_test.test.video(item.name) : this.accept === "video" || uni_modules_uviewPlus_libs_function_test.test.video(name),
          deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
        });
      });
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile(params) {
      const {
        maxCount,
        multiple,
        lists,
        disabled
      } = this;
      if (disabled)
        return Promise.reject();
      const chooseParams = Object.assign({
        accept: this.accept,
        extension: this.extension,
        multiple: this.multiple,
        capture: this.capture,
        compressed: this.compressed,
        maxDuration: this.maxDuration,
        sizeType: this.sizeType,
        camera: this.camera
      }, {
        maxCount: maxCount - lists.length,
        ...params
      });
      return uni_modules_uviewPlus_components_uUpload_utils.chooseFile(chooseParams).then((res) => {
        const result = chooseParams.multiple ? res : res[0];
        this.onBeforeRead(result);
        return result;
      }).catch((error) => {
        this.$emit("error", error);
      });
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = file;
      if (uni_modules_uviewPlus_libs_function_test.test.func(beforeRead)) {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            "beforeRead",
            Object.assign(Object.assign({
              file
            }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject();
              }
            })
          );
        });
      }
      if (uni_modules_uviewPlus_libs_function_test.test.promise(res)) {
        res.then((data) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(res || file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },
    async onAfterRead(file) {
      const {
        maxSize,
        afterRead
      } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        common_vendor.index.showToast({
          title: "超过大小限制"
        });
        this.$emit("oversize", Object.assign({
          file
        }, this.getDetail()));
        return;
      }
      let len = this.fileList.length;
      if (this.autoUpload) {
        let lists = [].concat(file);
        this.fileList.length;
        lists.map((item) => {
          this.fileList.push({
            ...item,
            status: "uploading",
            message: "上传中",
            progress: 0
          });
        });
        let that = this;
        this.$emit("update:fileList", this.fileList);
        for (let i = 0; i < lists.length; i++) {
          let j = i;
          let result = "";
          switch (this.autoUploadDriver) {
            case "cos":
              break;
            case "kodo":
              break;
            case "oss":
            case "upload_oss":
              console.log();
              let formData = {};
              let ret = await common_vendor.index.request({
                url: this.autoUploadAuthUrl,
                method: "get",
                header: this.autoUploadHeader,
                data: {
                  filename: lists[j].name
                }
              });
              let res0 = ret.data;
              if (res0.code == 200) {
                formData = res0.data.params;
              } else {
                common_vendor.index.showToast({
                  title: res0.msg,
                  duration: 1500
                });
                return;
              }
              var uploadTask = common_vendor.index.uploadFile({
                url: res0.data.params.host,
                filePath: lists[j].url,
                name: "file",
                // fileType: 'video', // 仅支付宝小程序，且必填。
                // header: header,
                formData,
                success: (uploadFileRes) => {
                  let thumb = "";
                  let afterPromise = "";
                  if (that.customAfterAutoUpload) {
                    afterPromise = new Promise((resolve, reject) => {
                      that.$emit(
                        "afterAutoUpload",
                        Object.assign(res0, {
                          callback: (r) => {
                            r.url ? resolve(r) : reject();
                          }
                        })
                      );
                    });
                  }
                  if (uni_modules_uviewPlus_libs_function_test.test.promise(afterPromise)) {
                    afterPromise.then((data) => that.succcessUpload(len + j, data.url, data.thumb));
                  } else {
                    result = res0.data.params.host + "/" + res0.data.params.key;
                    if (that.accept === "video" || uni_modules_uviewPlus_libs_function_test.test.video(result)) {
                      thumb = result + "?x-oss-process=video/snapshot,t_10000,m_fast";
                    }
                    that.succcessUpload(len + j, result, thumb);
                  }
                }
              });
              uploadTask.onProgressUpdate((res) => {
                that.updateUpload(len + j, {
                  progress: res.progress
                });
              });
              break;
            case "local":
            default:
              var uploadTask = common_vendor.index.uploadFile({
                url: this.autoUploadApi,
                filePath: lists[j].url,
                name: "file",
                // fileType: 'video', // 仅支付宝小程序，且必填。
                header: this.autoUploadHeader,
                success: (uploadFileRes) => {
                  let res02 = uploadFileRes.data;
                  let afterPromise = "";
                  if (that.customAfterAutoUpload) {
                    afterPromise = new Promise((resolve, reject) => {
                      that.$emit(
                        "afterAutoUpload",
                        Object.assign(res02, {
                          callback: (r) => {
                            r.url ? resolve(r) : reject();
                          }
                        })
                      );
                    });
                  }
                  if (uni_modules_uviewPlus_libs_function_test.test.promise(afterPromise)) {
                    afterPromise.then((data) => that.succcessUpload(len + j, data.url));
                  } else {
                    if (res02.code != 200) {
                      common_vendor.index.showToast({
                        title: res02.msg
                      });
                    } else {
                      result = res02.data.url;
                      that.succcessUpload(len + j, result);
                    }
                  }
                }
              });
              uploadTask.onProgressUpdate((res) => {
                that.updateUpload(len + j, {
                  progress: res.progress
                });
              });
              break;
          }
        }
      } else {
        if (typeof afterRead === "function") {
          afterRead(file, this.getDetail());
        }
        this.$emit("afterRead", Object.assign({
          file
        }, this.getDetail()));
      }
    },
    updateUpload(index, param) {
      let item = this.fileList[index];
      this.fileList.splice(index, 1, {
        ...item,
        // 注意这里不判断会出现succcessUpload先执行又被覆盖的问题
        status: param.progress == 100 ? "success" : "uploading",
        message: "",
        progress: param.progress
      });
      this.$emit("update:fileList", this.fileList);
    },
    succcessUpload(index, url, thumb = "") {
      let item = this.fileList[index];
      this.fileList.splice(index, 1, {
        ...item,
        status: "success",
        message: "",
        url,
        progress: 100,
        thumb
      });
      this.$emit("update:fileList", this.fileList);
    },
    deleteItem(index) {
      if (this.autoDelete) {
        this.fileList.splice(index, 1);
        this.$emit("update:fileList", this.fileList);
      } else {
        this.$emit(
          "delete",
          Object.assign(Object.assign({}, this.getDetail(index)), {
            file: this.fileList[index]
          })
        );
      }
    },
    // 预览图片
    onPreviewImage(previewItem, index) {
      if (!previewItem.isImage || !this.previewFullImage)
        return;
      let current = 0;
      const urls = [];
      let imageIndex = 0;
      for (var i = 0; i < this.lists.length; i++) {
        const item = this.lists[i];
        if (item.isImage || item.type && item.type === "image") {
          urls.push(item.url || item.thumb);
          if (i === index) {
            current = imageIndex;
          }
          imageIndex += 1;
        }
      }
      if (urls.length < 1) {
        return;
      }
      common_vendor.index.previewImage({
        urls,
        current,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览图片失败");
        }
      });
    },
    onPreviewVideo(previewItem, index) {
      if (!this.previewFullImage)
        return;
      let current = 0;
      const sources = [];
      let videoIndex = 0;
      for (var i = 0; i < this.lists.length; i++) {
        const item = this.lists[i];
        if (item.isVideo || item.type && item.type === "video") {
          sources.push(Object.assign(Object.assign({}, item), {
            type: "video"
          }));
          if (i === index) {
            current = videoIndex;
          }
          videoIndex += 1;
        }
      }
      if (sources.length < 1) {
        return;
      }
      common_vendor.wx$1.previewMedia({
        sources,
        current,
        fail() {
          uni_modules_uviewPlus_libs_function_index.toast("预览视频失败");
        }
      });
    },
    onClickPreview(item, index) {
      if (this.previewFullImage) {
        switch (item.type) {
          case "image":
            this.onPreviewImage(item, index);
            break;
          case "video":
            this.onPreviewVideo(item, index);
            break;
        }
      }
      this.$emit(
        "clickPreview",
        Object.assign(Object.assign({}, item), this.getDetail(index))
      );
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  const _easycom_up_gap2 = common_vendor.resolveComponent("up-gap");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_u_icon2 + _easycom_up_icon2 + _easycom_u_loading_icon2 + _easycom_up_gap2 + _easycom_up_popup2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_up_icon = () => "../u-icon/u-icon.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
const _easycom_up_gap = () => "../u-gap/u-gap.js";
const _easycom_up_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_icon + _easycom_up_icon + _easycom_u_loading_icon + _easycom_up_gap + _easycom_up_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.previewImage
  }, _ctx.previewImage ? {
    b: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e({
        a: item.isImage || item.type && item.type === "image"
      }, item.isImage || item.type && item.type === "image" ? {
        b: item.thumb || item.url,
        c: _ctx.imageMode,
        d: common_vendor.o(($event) => $options.onClickPreview(item, index), index),
        e: common_vendor.s({
          width: $options.addUnit(_ctx.width),
          height: $options.addUnit(_ctx.height)
        })
      } : (item.isVideo || item.type && item.type === "video") && _ctx.getVideoThumb ? common_vendor.e({
        g: item.thumb
      }, item.thumb ? {
        h: item.thumb,
        i: _ctx.imageMode,
        j: common_vendor.o(($event) => $options.onClickPreview(item, index), index),
        k: common_vendor.s({
          width: $options.addUnit(_ctx.width),
          height: $options.addUnit(_ctx.height)
        })
      } : {
        l: "c8491d64-0-" + i0,
        m: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "file-text"
        })
      }, {
        n: item.status === "success"
      }, item.status === "success" ? common_vendor.e({
        o: !_ctx.$slots["playIcon"]
      }, !_ctx.$slots["playIcon"] ? {
        p: "c8491d64-1-" + i0,
        q: common_vendor.p({
          name: "play-right",
          size: "22px"
        })
      } : {}, {
        r: common_vendor.o(($event) => $options.onClickPreview(item, index), index)
      }) : {}, {
        s: $options.addUnit(_ctx.width),
        t: $options.addUnit(_ctx.height)
      }) : {
        v: "c8491d64-2-" + i0,
        w: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
        }),
        x: common_vendor.t(item.isVideo || item.type && item.type === "video" ? item.name || "视频" : item.name || "文件"),
        y: common_vendor.o(($event) => $options.onClickPreview(item, index), index),
        z: common_vendor.s({
          width: $options.addUnit(_ctx.width),
          height: $options.addUnit(_ctx.height)
        })
      }, {
        f: (item.isVideo || item.type && item.type === "video") && _ctx.getVideoThumb,
        A: item.status === "uploading" || item.status === "failed"
      }, item.status === "uploading" || item.status === "failed" ? common_vendor.e({
        B: item.status === "failed"
      }, item.status === "failed" ? {
        C: "c8491d64-3-" + i0,
        D: common_vendor.p({
          name: "close-circle",
          color: "#ffffff",
          size: "25"
        })
      } : {
        E: "c8491d64-4-" + i0,
        F: common_vendor.p({
          size: "22",
          mode: "circle"
        })
      }, {
        G: item.message
      }, item.message ? {
        H: common_vendor.t(item.message)
      } : {}, {
        I: item.progress + "%",
        J: "c8491d64-5-" + i0,
        K: common_vendor.p({
          height: "3px"
        })
      }) : {}, {
        L: item.status !== "uploading" && (_ctx.deletable || item.deletable)
      }, item.status !== "uploading" && (_ctx.deletable || item.deletable) ? {
        M: "c8491d64-6-" + i0,
        N: common_vendor.p({
          name: "close",
          color: "#ffffff",
          size: "10"
        }),
        O: common_vendor.o(($event) => $options.deleteItem(index), index)
      } : {}, {
        P: item.status === "success"
      }, item.status === "success" ? {
        Q: "c8491d64-7-" + i0,
        R: common_vendor.p({
          name: "checkmark",
          color: "#ffffff",
          size: "12"
        })
      } : {}, {
        S: index
      });
    })
  } : {}, {
    c: $data.isInCount
  }, $data.isInCount ? common_vendor.e({
    d: _ctx.$slots.trigger
  }, _ctx.$slots.trigger ? {
    e: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default) ? {
    g: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : common_vendor.e({
    h: common_vendor.p({
      name: _ctx.uploadIcon,
      size: "26",
      color: _ctx.uploadIconColor
    }),
    i: _ctx.uploadText
  }, _ctx.uploadText ? {
    j: common_vendor.t(_ctx.uploadText)
  } : {}, {
    k: !_ctx.disabled ? "u-upload__button--hover" : "",
    l: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    m: common_vendor.n(_ctx.disabled && "u-upload__button--disabled"),
    n: common_vendor.s({
      width: $options.addUnit(_ctx.width),
      height: $options.addUnit(_ctx.height)
    })
  }), {
    f: !_ctx.$slots.trigger && (_ctx.$slots.default || _ctx.$slots.$default)
  }) : {}, {
    o: $data.popupShow
  }, $data.popupShow ? {
    p: $data.currentItemIndex >= 0 ? $data.lists[$data.currentItemIndex].url : "",
    q: common_vendor.o((...args) => $options.videoErrorCallback && $options.videoErrorCallback(...args)),
    r: _ctx.videoPreviewObjectFit,
    s: common_vendor.o((...args) => $options.loadedVideoMetadata && $options.loadedVideoMetadata(...args))
  } : {}, {
    t: common_vendor.o(($event) => $data.popupShow = $event),
    v: common_vendor.p({
      mode: "center",
      show: $data.popupShow
    }),
    w: common_vendor.s($options.addStyle(_ctx.customStyle))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c8491d64"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-upload/u-upload.js.map
