$(".forms-sample").validate({
    rules: {
        inputId: "required",
        inputPassword: "required",
        inputServer: "required",
        inputPort: "required",
    },

    messages: {
        inputId: " 사용자 아이디를 입력하여 주십시요.",
        inputPassword: " 비밀번호를 입력하여 주십시요.",
        inputServer: " 서버주소를 입력하여 주십시요.",
        inputPort: " 포트번호를 입력하여 주십시요.",
    },

    errorPlacement: function (error, element) {
        /* validator는 기본적으로 validation 실패 시 실패한 노드 우측에 실패 메시지를 표시하게 되어있다.
            작동을 원하지 않으면 내용이 없는 errorPlacement를 선언한다.
        */
    },
    invalidHandler: function (form, validator) {
        /*  validation 실패 시의 핸들러를 정의한다.
            실패 시 메시지를 alert으로 표시하도록 되어 있다. */
        var errors = validator.numberOfInvalids();
        if (errors) {
            alert(validator.errorList[0].message);
            validator.errorList[0].element.focus();
        }
    },
    submitHandler: function (error, element) {
        /*
        유효성 검사가 완료된 뒤 수행할 핸들러를 정의한다.
        주의 할 점은 이 옵션을 명시할 경우 'submit' 이벤트만 발생하며 실제 FORM 전송은 일어나지 않는다는 것이다.
        만약 submitHandler를 명시하지 않으면 유효성 검사 후 온전한 submit을 수행한다.
        */

        const params = {
            userId: $("#inputId").val(),
            password: $("#inputPassword").val(),
        };
        const server = $("#inputServer").val(),
            port = $("#inputPort").val(),
            fosc = $("#project").val();

        $.ajax({
            url: `http://${server}:${port}/${fosc}/logOn`,
            data: JSON.stringify(params),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                alert("로그인 되었습니다.");
            },
            error: function (request, error) {
                alert(request.responseText);
            },
        });
    },
});
