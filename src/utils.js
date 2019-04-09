export function getRedirectPath({type,avatar}) {
    console.log(type,avatar)
    let url = (type === 'boss') ? '/boss' : '/genius'

    if(!avatar){
        url += 'info'
        alert('头像不能为空')
    }

    return url

}


export function md5(pwd) {

}


export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_')
}
