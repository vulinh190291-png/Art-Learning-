"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
const uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 接受的文件类型, 可选值为all media image file video
    accept: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.accept
    },
    extension: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.extension
    },
    // 	图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头
    capture: {
      type: [String, Array],
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.capture
    },
    // 当accept为video时生效，是否压缩视频，默认为true
    compressed: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.compressed
    },
    // 当accept为video时生效，可选值为back或front
    camera: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.camera
    },
    // 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
    maxDuration: {
      type: Number,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.maxDuration
    },
    // 上传区域的图标，只能内置图标
    uploadIcon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.uploadIcon
    },
    // 上传区域的图标的颜色，默认
    uploadIconColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.uploadIconColor
    },
    // 是否开启文件读取前事件
    useBeforeRead: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.useBeforeRead
    },
    // 读取后的处理函数
    afterRead: {
      type: Function,
      default: null
    },
    // 读取前的处理函数
    beforeRead: {
      type: Function,
      default: null
    },
    // 是否显示组件自带的图片&视频预览功能
    previewFullImage: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.previewFullImage
    },
    // 最大上传数量
    maxCount: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.maxCount
    },
    // 是否启用
    disabled: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.disabled
    },
    // 预览上传的图片时的裁剪模式，和image组件mode属性一致
    imageMode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.imageMode
    },
    // 标识符，可以在回调函数的第二项参数中获取
    name: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.name
    },
    // 所选的图片的尺寸, 可选值为original compressed
    sizeType: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.sizeType
    },
    // 是否开启图片多选，部分安卓机型不支持
    multiple: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.multiple
    },
    // 是否展示删除按钮
    deletable: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.deletable
    },
    // 文件大小限制，单位为byte
    maxSize: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.maxSize
    },
    // 显示已上传的文件列表
    fileList: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.fileList
    },
    // 上传区域的提示文字
    uploadText: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.uploadText
    },
    // 内部预览图片区域和选择图片按钮的区域宽度
    width: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.width
    },
    // 内部预览图片区域和选择图片按钮的区域高度
    height: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.height
    },
    // 是否在上传完成后展示预览图
    previewImage: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.previewImage
    },
    // 是否自动删除
    autoDelete: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.autoDelete
    },
    // 是否自动上传需要传递action指定地址
    autoUpload: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.autoUpload
    },
    // 自动上传接口地址
    autoUploadApi: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.autoUploadApi
    },
    // 自动上传驱动，local/oss/cos/kodo
    autoUploadDriver: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.autoUploadDriver
    },
    // 自动上传授权接口，比如oss的签名接口。
    autoUploadAuthUrl: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.autoUploadAuthUrl
    },
    // 自动上传携带的header
    autoUploadHeader: {
      type: Object,
      default: () => {
        return uni_modules_uviewPlus_libs_config_props.props.upload.autoUploadHeader;
      }
    },
    // 本地计算视频封面
    getVideoThumb: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.getVideoThumb
    },
    // 自定义自动上传后处理
    customAfterAutoUpload: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.customAfterAutoUpload
    },
    videoPreviewObjectFit: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.props.upload.videoPreviewObjectFit
    }
  }
});
exports.props = props;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-upload/props.js.map
