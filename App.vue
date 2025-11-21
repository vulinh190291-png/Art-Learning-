<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
/* ⚠️ 核心修复：强制撑开所有父容器的高度 */
html, body, uni-page-body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 确保 ElementUI 的弹窗能正常显示 */
.el-message-box {
  width: 420px !important;
}
</style>