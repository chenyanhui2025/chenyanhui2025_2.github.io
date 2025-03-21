// 初始化单元格
document.querySelectorAll('.cell').forEach(cell => {
  const addBtn = document.createElement('div');
  addBtn.className = 'add-btn';
  addBtn.textContent = '+';
  addBtn.dataset.dep = cell.dataset.dep;
  addBtn.dataset.target = cell.dataset.target;
  cell.appendChild(addBtn);
});

// 添加任务项
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-btn')) {
    const sourceDep = e.target.dataset.dep;
    const targetDep = e.target.dataset.target;
    const newTask = createTaskItem(sourceDep, targetDep);
    e.target.parentNode.appendChild(newTask);
  }
});

// 创建任务项函数
function createTaskItem(sourceDep, targetDep) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task-item';
  
  // 方向箭头
  const arrow = document.createElement('div');
  arrow.className = 'arrow';
  const initialDirection = sourceDep === targetDep? 'none' : (sourceDep < targetDep? 'red' : 'blue');
  arrow.classList.add(initialDirection);
  
  // 任务文本
  const taskText = document.createElement('input');
  taskText.className = 'task-text';
  taskText.placeholder = '输入任务内容';
  
  // 状态圆圈
  const statusSpan = document.createElement('span');
  statusSpan.className = 'status';
  statusSpan.innerHTML = `
    <span class="circle gray" data-status="gray"></span>
    <span class="circle gray" data-status="gray"></span>
  `;
  
  // 删除按钮
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', function () {
    taskDiv.remove();
  });

  taskDiv.appendChild(arrow);
  taskDiv.appendChild(taskText);
  taskDiv.appendChild(statusSpan);
  taskDiv.appendChild(deleteBtn);
  
  // 绑定箭头点击事件
  arrow.addEventListener('click', function () {
    const currentClass = this.className.split(' ')[1];
    const newClass = currentClass === 'red'? 'blue' : 'red';
    this.className = 'arrow ' + newClass;
  });

  // 绑定编辑事件
  taskText.addEventListener('dblclick', function () {
    this.style.border = '1px solid #ccc';
    this.focus();
  });
  taskText.addEventListener('blur', function () {
    this.style.border = 'none';
  });

  // 绑定圆圈点击事件
  statusSpan.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', function () {
      const currentStatus = this.dataset.status;
      this.style.backgroundColor = currentStatus === 'gray'? 'green' : '#ccc';
      this.dataset.status = currentStatus === 'gray'? 'green' : 'gray';
    });
  });

  return taskDiv;
}