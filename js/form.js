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
 * ajax提交表单
 * code:
 * 100  业务正常
 * !100 业务失败
 * @return {mixed} {data:([] || object || null),code:integer,msg:string}
 */
function appointment() {
    //disable complete button,不允许重复提交
    $('.complete').addClass('btn-disable');
    $('.complete').attr('disabled', 'disabled');

    //提交ajax
    var data = $('#form').serialize();
    console.log(data);
    $.ajax({
        'url': 'https://rocky-mesa-30908.herokuapp.com/request',
        'type': 'POST',
        'dataType': "json",
        'data': data,
        'success': function(result) {
            if (result.code == 100) {
                //成功跳转
                location.href = 'success.html';
            } else {
                //
             失败看console
                console.log('ajax fail');
                console.log('data:');
                console.log(data);
                console.log('result:');
                console.log(result);
            }
        }
    });
}