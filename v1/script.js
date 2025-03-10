const showPopup = document.querySelector('.register-link'); // 获取“尋求協助”链接
const popupContainer = document.querySelector('.popup-container'); // 提示框容器
const closeBtn = document.querySelector('.close-btn'); // 关闭提示框按钮
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
const btnPopup = document.querySelector('.btnLogin-popup'); // 登录按钮
const iconClose = document.querySelector('.icon-close'); // 关闭登录窗口按钮
const wrapper = document.querySelector('.wrapper'); // 登录窗口

showPopup.onclick = (event) => {
    event.preventDefault(); // 防止默认跳转
    popupContainer.classList.add('active');
}

closeBtn.onclick = () => {
    popupContainer.classList.remove('active');
}

function forgot() {
    alert("预留位");
    //List: 在此处添加跳转链接，如 window.location.href = 'url';
}

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
})

btnPopup.onclick = () => {
    wrapper.classList.add('active-popup');
}

iconClose.onclick = () => {
    wrapper.classList.remove('active-popup');
}

// btnLogin-popup.onclick = () => {
//     wrapper.classList.add('active-popup');
// }