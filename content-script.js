// JS`正则表达式`获取地址栏url参数：
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substring(1).match(reg) // 匹配目标参数
  if (r != null) return decodeURI(r[2])
  return 100 // 返回参数值
}

//循环删除该节点
function _delElem(elems) {
  console.log(elems.length)
  while (elems[0] != undefined) {
    let parent = elems[0].parentElement
    parent.removeChild(elems[0])
  }
  console.log(elems.length)
}

// 定义删除函数
function delElemByClassName(className) {
  let elems = document.getElementsByClassName(className)
  _delElem(elems)
}

// 按自定义属性名删除元素
function delElemByAttr(attrName, attrValue) {
  let elems = document.querySelectorAll("[" + attrName + "='" + attrValue + "']")
  _delElem(elems)
}

// 删除标签元素
function delElemByTagName(tagName) {
  let elems = document.getElementsByTagName(tagName)
  _delElem(elems)
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
      // 加载完图片后，删除<noscript>标签
      delElemByTagName("noscript")
      // 打印页面
      window.print()
    }
  }, scrollInterval)
}

function cleanPrint() {
  // 知乎专栏文章
  if (window.location.href.indexOf("https://zhuanlan.zhihu.com/p") != -1) {
    // 删除顶部状态栏
    delElemByClassName("ColumnPageHeader-Wrapper")
    // 删除顶图
    delElemByClassName("css-78p1r9")
    // 删除关注按钮
    delElemByClassName("FollowButton")
    // 删除左侧目录
    delElemByClassName("Catalog")
    // 删除底部分享
    delElemByClassName("Sticky")
    // 删除返回顶部
    delElemByClassName("CornerButtons")
    // 删除推荐阅读
    delElemByClassName("Recommendations-Main")
    // 删除专栏
    delElemByClassName("PostIndex-Contributions")
    // 删除赞赏
    delElemByClassName("Reward")
    // 删除话题
    delElemByClassName("Post-topicsAndReviewer")
    // 删除评论
    delElemByClassName("Post-Sub Post-NormalSub")
  }
  // 微信公众号文章
  if (window.location.href.indexOf("https://mp.weixin.qq.com/s") != -1) {
    // 删除右侧二维码
    delElemByClassName("qr_code_pc")
    // 删除js_tags
    delElemByAttr("id", "js_tags")
    // 删除rich_media_area_extra
    delElemByClassName("rich_media_area_extra")
    // 常用几个公众号的特殊优化
    // 图灵人工智能
    delElemByAttr("data-fileid", "100055113")
    delElemByAttr("data-fileid", "100055114")
    delElemByAttr("data-fileid", "100055115")
    delElemByClassName("common_test")
    // PaperWeekly
    delElemByClassName("__bg_gif")
    delElemByAttr("powered-by", "xiumi.us")
    delElemByAttr("data-id", "63")
    delElemByAttr("data-src", "https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgnZ3nlEAOI3MyTd7jqeD6cq8uTbkM2xZNpribyNr9liaPJ722zaHxd0YpQvib2nxOYmWibydCVY7W94ew/640?wx_fmt=jpeg")
  }
  // 滚动页面，加载图片，打印页面
  load_lazy_and_print()
}

cleanPrint()
