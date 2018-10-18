/**
 * 设定提交表单中单选button
 * @param {object} t       
 * @param {object} element 
 */
function setRadio(t, element) {
    element.value = t.value;
    var btns = document.getElementsByClassName(element.id + '-row')[0].getElementsByTagName("button");
    for (var i in btns) {
        if (btns[i].nodeName == undefined) {
            continue;
        }
        btns[i].classList.remove('btn-active');
    }
    t.classList.add('btn-active');
}
/**
 * 检查手机格式
 * @return {bool} 
 */
function checkMobile(val) {
    if (val.search(/^04\d{8}$/) == -1) {
        return false;
    }
}
/**
 * ajax提交表单
 * code:
 * 100  业务正常
 * !100 业务失败
 * @return {mixed} {data:([] || object || null),code:integer,msg:string}
 */
function appointment() {
    //check mobile number
    if (checkMobile($('#phone').val()) == false) {
        alert('手机号码格式不符合');
        return;
    }
    //disable complete button,不允许重复提交
    $('.complete').addClass('btn-disable');
    $('.complete').attr('disabled', 'disabled');
    //提交ajax
    var data = $('#form').serialize();
    $.ajax({
        'url': 'https://rocky-mesa-30908.herokuapp.com/',
        'type': 'POST',
        'dataType': "json",
        'timeout': 2000,
        'data': data,
        'success': function(result) {
            //不管结果直接跳转
            var request_type = $('#request_type').val();
            request_type = request_type == 1 ? 1 : 0;
            location.href = 'success.html?request_type=' + request_type;
            return;
            if (result.code == 100) {
                //成功跳转
                location.href = 'success.html?request_type=' + request_type;
            } else {
                //失败看console
                console.log('ajax fail');
                console.log('data:');
                console.log(data);
                console.log('result:');
                console.log(result);
            }
        }
    });
}