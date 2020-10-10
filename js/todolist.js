$(function () {
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: 'xxx', done: false}]
    load();
    $('#title').on('keydown', function (e) {
        if (e.keyCode == 13) {
            if($(this).val() == ''){
                alert('请输入数据');
                return;
            }else{
                // 先读取本地存储原来的数据
                var local = getData();
                // 把local 数组进行更新数据  把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                load();
                $(this).val('');
            }
        }
    })

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data != null) {
            // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 2. 保存本地存储数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }

    // 渲染加载数据
    function load(){
        // 读取本地数据
        var data = getData();
        // 遍历之前要清空ol里面的数据
        $('ol, ul').empty();
        // 遍历数据
        $.each(data, function(i, d){
            var todocount = 0;
            var donecount = 0;
            // 如果任务完成了  放入ul里面  没有完成  放入ol里面
            if(d.done){
                donecount++;
                $('ul').prepend(`<li><input type='checkbox' checked> <p>${d.title}</p> <a href='javascript:;' index=${i}></a></li>`)
            }else{
                todocount++;
                $('ol').prepend(`<li><input type='checkbox'> <p>${d.title}</p> <a href='javascript:;' index=${i}></a></li>`)
            }
        })
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }

    // 3. 删除数据
    $('ol, ul').on('click', 'a', function(){
        // 先获取本地存储
        var data = getData();
        // 修改数据
        // var index = $(this).parent().length - $(this).parent().index() - 1;
        var index = $(this).attr('index');
        // splice(从哪个位置开始删除, 删除几个元素)
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    })
    // 4. 正在进行和已完成的操作
    $('ol, ul').on('click', 'input', function(){
        // 先获取数据
        var data = getData();
        // 操作数据
        var index = $(this).siblings('a').attr('index');
        data[index].done = $(this).prop('checked');
        // 保存数据
        saveData(data);
        // 重新渲染页面
        load();
    })
})