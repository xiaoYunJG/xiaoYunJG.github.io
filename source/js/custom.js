/* 仅放置项目级交互；由 _config.fluid.yml 的 custom_js 加载。 */
(function () {
  'use strict';

  // 为 Banner 中的副标题补充简洁的打字机提示；Fluid 负责主要标题与导航交互。
  document.addEventListener('DOMContentLoaded', function () {
    var subtitle = document.querySelector('#subtitle');
    if (!subtitle) return;

    subtitle.setAttribute('aria-label', '记录编程、算法、Go、前端与人工智能学习');
  });
})();
