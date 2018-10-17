$(document).ready(function() {
    load_json_data('brand');

    function load_json_data(id, parent_id) {
        var html_code = '';
        $.getJSON('json/brand.json', function(data) {
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