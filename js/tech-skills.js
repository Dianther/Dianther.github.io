// 技术栈交互功能
let currentTech = {
  name: '',
  description: '',
  color: ''
};

// 技术官网映射
const techWebsites = {
  'Java': 'https://www.oracle.com/java/',
  'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'C++': 'https://isocpp.org/',
  'C': 'https://en.cppreference.com/w/c',
  'Python': 'https://www.python.org/',
  'Git': 'https://git-scm.com/',
  'Docker': 'https://www.docker.com/',
  'Kubernetes': 'https://kubernetes.io/',
  'SpringBoot': 'https://spring.io/projects/spring-boot',
  'Vue': 'https://vuejs.org/',
  'KubeEdge': 'https://kubeedge.io/'
};

// 显示技术详情弹窗
function showTechDetail(name, description, color) {
  currentTech = { name, description, color };
  
  const modal = document.getElementById('tech-detail-modal');
  const modalIcon = modal.querySelector('.tech-modal-icon');
  const modalTitle = modal.querySelector('.tech-modal-title');
  const modalDescription = modal.querySelector('.tech-modal-description');
  
  // 设置弹窗内容
  modalIcon.style.background = color;
  modalTitle.textContent = name;
  modalDescription.textContent = description;
  
  // 显示弹窗
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // 添加键盘事件监听
  document.addEventListener('keydown', handleEscapeKey);
}

// 关闭弹窗
function closeTechModal() {
  const modal = document.getElementById('tech-detail-modal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEscapeKey);
}

// ESC键关闭弹窗
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeTechModal();
  }
}

// 搜索相关文章
function searchTechArticles() {
  if (currentTech.name) {
    // 跳转到搜索页面或者执行搜索功能
    const searchUrl = `/search?keyword=${encodeURIComponent(currentTech.name)}`;
    window.open(searchUrl, '_blank');
  }
  closeTechModal();
}

// 访问官网
function visitOfficialSite() {
  if (currentTech.name && techWebsites[currentTech.name]) {
    window.open(techWebsites[currentTech.name], '_blank');
  } else {
    // 如果没有预设网址，使用搜索引擎
    const searchQuery = `${currentTech.name} official website`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  }
  closeTechModal();
}

// 初始化事件监听器
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('tech-detail-modal');
  if (!modal) return;
  
  // 点击遮罩层关闭弹窗
  const overlay = modal.querySelector('.tech-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeTechModal);
  }
  
  // 点击关闭按钮
  const closeBtn = modal.querySelector('.tech-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeTechModal);
  }
  
  // 防止点击弹窗内容时关闭
  const modalContent = modal.querySelector('.tech-modal-content');
  if (modalContent) {
    modalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
});

// 页面切换时重新初始化（如果使用PJAX）
if (typeof window.addEventListener !== 'undefined') {
  window.addEventListener('pjax:complete', function() {
    // 重新绑定事件监听器
    setTimeout(() => {
      const modal = document.getElementById('tech-detail-modal');
      if (modal) {
        const overlay = modal.querySelector('.tech-modal-overlay');
        const closeBtn = modal.querySelector('.tech-modal-close');
        const modalContent = modal.querySelector('.tech-modal-content');
        
        if (overlay) overlay.addEventListener('click', closeTechModal);
        if (closeBtn) closeBtn.addEventListener('click', closeTechModal);
        if (modalContent) {
          modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
          });
        }
      }
    }, 100);
  });
} 