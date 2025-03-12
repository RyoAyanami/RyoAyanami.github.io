// 获取元素
const wrapper = document.querySelector('.wrapper');
const btnLoginPopup = document.querySelector('.btnLogin-popup'); // 登录按钮
const btnSignupPopup = document.querySelector('.btnSignup-popup'); // 注册按钮
const iconClose = document.querySelector('.icon-close'); // 关闭按钮
const switchToSignup = document.querySelector('.switch-to-signup'); // 切换到注册
const switchToLogin = document.querySelector('.switch-to-login'); // 切换到登录
const forgotPassword = document.querySelectorAll('.forgot-password'); // 遺忘口令
const popupContainer = document.querySelector('.popup-container'); // 提示框
const closePopup = document.querySelector('.close-btn'); // 关闭提示框按钮

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');

// 关闭所有弹窗
function closeAllForms() {
    wrapper.classList.remove('active-login', 'active-signup', 'active-popup');
}

// 显示登录窗口
btnLoginPopup.onclick = () => {
    closeAllForms();
    wrapper.classList.add('active-login', 'active-popup');

    // 关闭移动端 navbar
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        navbg.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
}

// 显示注册窗口
btnSignupPopup.onclick = () => {
    closeAllForms();
    wrapper.classList.add('active-signup', 'active-popup');

    // 关闭移动端 navbar
    if (window.innerWidth <= 768) {
        navbar.classList.remove('active');
        navbg.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
}

// 关闭登录/注册窗口
iconClose.onclick = closeAllForms;

// 切换到注册
switchToSignup.onclick = () => {
    closeAllForms();
    wrapper.classList.add('active-signup', 'active-popup');
}

// 切换到登录
switchToLogin.onclick = () => {
    closeAllForms();
    wrapper.classList.add('active-login', 'active-popup');
}

// 遺忘口令 -> 显示 popup-container
forgotPassword.forEach(link => {
    link.onclick = () => {
        popupContainer.classList.add('active');
    }
});

// 关闭 popup-container
closePopup.onclick = () => {
    popupContainer.classList.remove('active');
}

// 处理移动端 navbar 关闭
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});


// btnLogin-popup.onclick = () => {
//     wrapper.classList.add('active-popup');
// }


function demo1() {
    window.location.href = 'demo/index.html';
    //List: 在此处添加跳转链接，如 window.location.href = 'url';
}