import {setCookie, is_logined, setWithExpire} from "./util.js"

const $login_btn = document.querySelector('.login_btn')

const api_login = async (event) => {
    event.preventDefault()
    
    const email = document.querySelector('.user-login__email').value
    const password = document.querySelector('.user-login__password').value

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const url = 'http://127.0.0.1:8000/user/login/'

    await fetch(url, {
        method: "POST",
        headers: {},
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.token){
            setCookie('access',data.token.access)
            setCookie('refresh',data.token.refresh)
            localStorage.setItem('follow', JSON.stringify(data.follower));
            localStorage.setItem('myNotify', JSON.stringify(data.notify));
            setWithExpire('user',data.user_info)
            location.href= '/index.html'
        } else {
            alert(data.message)
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

is_logined()
$login_btn.addEventListener('click',api_login)