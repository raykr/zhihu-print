// JS`正则表达式`获取地址栏url参数：
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substring(1).match(reg) // 匹配目标参数
  if (r != null) return decodeURI(r[2])
  return 100 // 返回参数值
}

// 定义删除函数
function delElem(className) {
  let elem = document.getElementsByClassName(className)
  if (elem[0] != undefined) {
    let parent = elem[0].parentElement
    parent.removeChild(elem[0])
  }
}

// 按自定义属性名删除元素
function delElemByAttr(attrName, attrValue) {
  let elem = document.querySelectorAll("[" + attrName + "='" + attrValue + "']")
  if (elem[0] != undefined) {
    let parent = elem[0].parentElement
    parent.removeChild(elem[0])
  }
}

function load_lazy_and_print() {
  // 页面滚动速度（滚过一屏高度所需的时间，时间越短则越快）
  // 如果出现网速慢，滚动过快，导致的懒加载图片不能全部显示完整，则调大该数字尝试
  let scrollInterval = getUrlParam("speed")
  let scrollHeight = document.documentElement.scrollHeight
  let clientHeight = document.documentElement.clientHeight
  let lastHeight = 0
  let task = setInterval(function () {
    if (lastHeight < scrollHeight) {
      window.scrollTo(lastHeight, lastHeight + clientHeight)
      lastHeight += clientHeight
    } else {
      clearInterval(task)
      // 打印页面
      window.print()
    }
  }, scrollInterval)
}

function cleanPrint() {
  // 知乎专栏文章
  if (window.location.href.indexOf("https://zhuanlan.zhihu.com/p") != -1) {
    // 删除顶部状态栏
    delElem("ColumnPageHeader-Wrapper")
    // 删除顶图
    delElem("css-78p1r9")
    // 删除关注按钮
    delElem("FollowButton")
    // 删除左侧目录
    delElem("Catalog")
    // 删除底部分享
    delElem("Sticky")
    // 删除返回顶部
    delElem("CornerButtons")
    // 删除推荐阅读
    delElem("Recommendations-Main")
    // 删除专栏
    delElem("PostIndex-Contributions")
    // 删除赞赏
    delElem("Reward")
    // 删除话题
    delElem("Post-topicsAndReviewer")
    // 删除评论
    delElem("Post-Sub Post-NormalSub")
  }
  // 微信公众号文章
  if (window.location.href.indexOf("https://mp.weixin.qq.com/s") != -1) {
    // 删除右侧二维码
    delElem("qr_code_pc")
    // 删除js_tags
    delElemByAttr("id", "js_tags")
    // 删除rich_media_area_extra
    delElem("rich_media_area_extra")
    // 常用几个公众号的特殊优化
    // 图灵人工智能
    delElemByAttr("data-fileid", "100055113")
    delElemByAttr("data-fileid", "100055114")
    delElemByAttr("data-fileid", "100055115")
    delElem("common_test")
    // PaperWeekly
    delElem("__bg_gif")
    delElemByAttr("powered-by", "xiumi.us")
    delElemByAttr("data-id", "63")
    delElemByAttr("data-src", "https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgnZ3nlEAOI3MyTd7jqeD6cq8uTbkM2xZNpribyNr9liaPJ722zaHxd0YpQvib2nxOYmWibydCVY7W94ew/640?wx_fmt=jpeg")
  }
  // 滚动页面，加载图片，打印页面
  load_lazy_and_print()
}

cleanPrint()
