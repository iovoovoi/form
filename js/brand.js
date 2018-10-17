$(document).ready(function() {
    load_json_data('brand');

    function load_json_data(id, parent_id) {
        var html_code = '';
        $.getJSON('https://firebasestorage.googleapis.com/v0/b/enquiryrequest-50ecb.appspot.com/o/brand.json?alt=media&token=8db645d8-66fb-4e98-b913-071bbc9d63f5', function(data) {
            if (id == 'brand') {
                html_code += '<option value="">品牌</option>';
            } else {
                html_code += '<option value="">车型</option>';
            }
            $.each(data, function(key, value) {
                if (id == 'brand') {
                    if (value.parent_id == '0') {
                        html_code += '<option value="' + value.id + '" >' + value.name + '</option>';
                    }
                } else {
                    if (value.parent_id == parent_id) {
                        html_code += '<option value="' + value.id + '">' + value.name + '</option>';
                    }
                }
            });
            $('#' + id).html(html_code);
        });
    }
    $(document).on('change', '#brand', function() {
        var brand_id = $(this).val();
        if (brand_id != '') {
            load_json_data('model', brand_id);
        } else {
            $('#model').html('<option value="">车型</option>');
        }
    });
});