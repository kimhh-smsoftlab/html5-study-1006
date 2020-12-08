//account.js
(function () {
    "use strict";

    var account = function () {
        this.itemflag = "1";
        this.account = "";
        this.acctname = "";
        this.acctflag = "";

        this.acctpwd = "";
        this.acctObj = [];

        this.linkinfo = { GET: ["BIT90"], PUT: [], REAL: [] };
    };

    account.prototype = {
        propertyLoad: function (node, nodeName, xmlHolderElement) {
            var that = this,
                cls = ["hi5_account"], // 클래스 정보명
                style = [], //  Style, 색정보용 Style  정보
                attr = { id: "", disabled: "" }, // HTML Attri 정의하는 정보 설정
                dataCell = ""; // caption

            // XML 정보에서 컨트롤 스타일, 속성정보 등을 취득하는 기능
            var objXML = x2h.getXML2Control(node, this, attr, cls, style);

            // stylecolor 정보를 객체로 변환한다(String->JSON)
            if (objXML.stylecolor)
                this.styleColor = x2h.defaultStyle(objXML.stylecolor, false);

            attr["class"] = cls.join(" ");

            if (style.length) attr["style"] = style.join("");

            // HTML Attribute 속성 변환( Style, Attribute, Class)
            style = x2h.attri(xmlHolderElement, attr);

            return;
        },

        onInitAfter: function () {
            var obj = this,
                $self = this.$html;

            obj.setAccount({ acctno: "", GET: true, init: true });

            // 화면 로드시 최초 계좌 정보 세팅
            if (obj.linkinfo.GET != undefined) {
                if (obj.linkinfo.GET.length > 0) {
                    var objdata = this.GetLinkinfoData();
                    if (objdata) {
                        obj.setAccount({
                            acctno: objdata.acctno,
                            GET: true,
                            init: false,
                        });
                    }
                }
            }
            obj.setPassword(obj.account);

            hi5.on($self[0], "change", function (target) {
                var optionSelected = $(this).find("option:selected");
                var indexSelected = optionSelected.index();
                var valueSelected = optionSelected.val();
                var captionSelected = optionSelected.text();

                obj.account = obj.acctObj[indexSelected].acctno;
                obj.acctname = obj.acctObj[indexSelected].acctname;
                obj.acctflag = obj.acctObj[indexSelected].acctflag;

                obj.SetLinkinfoData({
                    acctno: obj.account,
                    acctname: obj.acctname,
                    acctflag: obj.acctflag,
                });
                obj.setPassword(obj.account);

                obj.objParentForm.SetCodeDataLink("acct", {
                    acctno: obj.account,
                    acctname: obj.acctname,
                });

                if (obj.OnListChanged)
                    obj.OnListChanged.call(
                        obj,
                        indexSelected,
                        valueSelected,
                        captionSelected
                    );
            });

            var disabled = $self[0].disabled;
            if (disabled == true) {
                this.Disabled(true);
            }
        },

        //선물과 현물 시장이 서로 바뀔 때 계좌번호를 다시 세팅해줘야한다.
        changeAcct: function (option, fn) {
            var obj = this;
            this.setAccount({
                acctno: "",
                GET: true,
                init: true,
                option: option,
            });
            if (fn) fn();
        },

        setAccount: function (accobj) {
            var obj = this,
                $self = this.$html;

            this.acctObj = [];

            var acclist = hi5.SHMEM["acclist"];
            if (!acclist) {
                acclist = [];
            }
            var accttype = "00";
            if (accobj.option) {
                accttype = accobj.option.accttype;
            }
            if (accobj.init) {
                var html_script = "";

                if (acclist.length == 0) {
                    html_script += "<option value=''>No Accounts</option>";
                }
                for (var j = 0; j < acclist.length; j++) {
                    if (acclist[j].type != accttype) continue;
                    var acctno = acclist[j].acctno;
                    var acctname = acclist[j].acctname;
                    html_script +=
                        "<option value='" +
                        acctno +
                        "'>" +
                        acctno.substring(0, 3) +
                        "-" +
                        acctno.substring(3, 5) +
                        "-" +
                        acctno.substring(5, acctno.length) +
                        "</option>";

                    //if (acctno == accobj.acctno) {
                    obj.acctname = acctname;
                    obj.account = acctno;
                    obj.accttype = accttype;
                    //}

                    this.acctObj.push({
                        acctno: acctno,
                        acctname: acctname,
                        verify: acclist[j].pw_verify,
                        password: acclist[j].pw_value,
                        acctflag: acclist[j].flag,
                        accttype: acclist[j].type,
                    });
                }

                if (this.acctObj.length == 0) {
                    html_script += "<option value=''>No Accounts</option>";
                }
                if (acclist.length > 0 && obj.account == "") {
                    obj.account = acclist[0].acctno;
                    obj.acctname = acclist[0].acctname;
                    obj.acctflag = acclist[0].acctflag;
                    obj.accttype = acclist[0].type;
                }
                var cur_acct = hi5.SHMEM.acclist.filter(function (acctArray) {
                    return acctArray.type == accttype;
                })[0];
                hi5.SHMEM["cur_acct"] = cur_acct;

                $self.html(html_script);
                // commapi setAccountList() 함수에서 호출
                // SPA모드에서 계좌정보 호출이 늦은경우 비번컨트롤에 계좌번호를 설정
                if (accobj.login && acclist.length > 0) {
                    obj.setPassword(obj.account);
                }
            }

            if (acclist.length > 0) obj.SelectByValue(accobj.acctno);
        },

        setPassword: function (acctno) {
            var obj = this,
                $self = this.$html;

            var acclist = hi5.SHMEM["acclist"];
            if (acclist) {
                if (obj.acctpwd != "") {
                    var acctpwdid = obj.acctpwd;
                    if (acctpwdid != "") {
                        if (!idpattern.test(acctpwdid))
                            acctpwdid = "{{id.}}" + acctpwdid;

                        acctpwdid = x2h.getUniqID(acctpwdid, obj.objParentForm);

                        var acctpwdObj = obj.objParentForm.GetObjData(
                            acctpwdid
                        );
                        if (acctpwdObj) {
                            acctpwdObj.acctno = acctno;
                            for (var x = 0; x < acclist.length; x++) {
                                if (acclist[x].acctno == acctno) {
                                    if (acclist[x].pw_verify == true) {
                                        //이미 검증된 상태
                                        acctpwdObj.verified = true;
                                        acctpwdObj.SetProp(
                                            "value",
                                            acclist[x].pw_value
                                        );
                                        $("#" + acctpwdObj.id).select();
                                    } else {
                                        acctpwdObj.verified = false;
                                        acctpwdObj.SetProp("value", "");
                                        acctpwdObj.SetFocus();
                                    }

                                    return;
                                }
                            }
                        }
                    }
                }
            }
        },

        GetLinkinfoData: function () {
            var linkinfo_history = sessionStorage.getItem("hi5_linkaccount");
            if (linkinfo_history != "" && linkinfo_history != null) {
                linkinfo_history = JSON.parse(linkinfo_history);

                return linkinfo_history;
            }

            return null;
        },

        SetLinkinfoData: function (obj) {
            sessionStorage.setItem("hi5_linkaccount", JSON.stringify(obj));
        },

        // OnGetLinkInfo 함수 추가 - 2017.06.13 add
        OnGetLinkInfo: function (tagName, objData) {
            if (tagName != "ACCOUNT-LINKINFO") return false;
            var obj = this;

            // 계좌연동으로 들어온 부분
            return obj.SelectByValue(objData.acct, true);
        },

        // HTML 요소객체 취득
        GetElemnt: function () {
            return this.$html;
        },

        // disabled 됐을때 동작(css disabled 동일)
        Disabled: function (state) {
            if (state == undefined) return;
            var cssstyle = {};
            if (state == true || state == "disabled" || state == "true") {
                cssstyle = hi5.getCustomStyle(this, "disable");
            } else {
                cssstyle = hi5.getCustomStyle(this, "default");
            }

            if (cssstyle) $("#" + this.id).css(cssstyle);
        },

        /* method */
        /// <member id="GetStyle" kind="method">
        /// <summary>스타일 정보를 취득하는 함수</summary>
        /// <remarks>스타일명으로 모든 스타일을 취득하는 함수 </remarks>
        /// <param name = "style" type="string|object"> 스타일 정보</param>
        /// <returns type="string|object"> 스타일 정보를 반환</returns>
        /// </member>
        GetStyle: function (style) {
            var $element = this.GetElemnt(),
                val;
            val = $element.css(style);

            return val;
        },

        /// <member id="SetStyle" kind="method">
        /// <summary>스타일 정보를 변경하는 함수</summary>
        /// <remarks>스타일명으로 모든 스타일을 제어하는 함수
        /// 색정보( color, background-Color등 색정보변경시에는
        /// 1. 컬러 인덱스 사용하는 경우 value 인자값에 {컬러인덱스} 지정
        /// 2. 사용자 색을 지정하는 경우  value 인자값에 RGB(0,0,0) 색 정보를 지정
        /// </remarks>
        /// <param name = "style" type="string|object"> 스타일 정보</param>
        /// <param name = "value" type="string" option="true"> 셀 아이템명</param>
        /// </member>
        SetStyle: function (style, value) {
            var $element = this.GetElemnt();
            typeof style === "object"
                ? $element.css(style)
                : $element.css(style, value);
            return;
        },

        /// <member id="GetProp" kind="method">
        /// <summary>속성정보를 취득하는 함수</summary>
        /// <remarks>속성명으로 모든 속성을 취득 </remarks>
        /// <param name = "propName" type="string|array"> 속성 정보</param>
        /// <returns type="string|array"> 속성정보를 반환</returns>
        /// </member>
        GetProp: function (propName) {
            var $element = this.GetElemnt(),
                val;

            if (propName == "caption") {
                val = $element[0].options[$element[0].selectedIndex].innerHTML;
            } else if (propName == "value") {
                val = $element[0].value;
            } else {
                val = $element[0].attr(propName);
            }
            return val;
        },

        /// <member id="SetProp" kind="method">
        /// <summary>속성 정보를 변경하는 함수</summary>
        /// <remarks>속성명으로 모든 속성을 제어하는 함수</remarks>
        /// <param name = "propName" type="string"> 스타일 정보</param>
        /// <param name = "value" type="string"> 셀 아이템명</param>
        /// </member>
        SetProp: function (propName, Value) {
            var $element = this.GetElemnt();

            if (propName == "caption") {
                $element[0].value = Value;
            } else {
                typeof propName === "object"
                    ? $element.attr(propName)
                    : $element.attr(propName, Value);
                if (propName == "disabled") {
                    this.Disabled(Value);
                }
            }
        },

        /// <member id="SetFocus" kind="method">
        /// <summary>해당 컨트롤 focus 주기</summary>
        /// <remarks>해당 컨트롤 focus 주기</remarks>
        /// </member>
        SetFocus: function () {
            var $element = this.GetElemnt();
            $element[0].focus();
        },

        /// <member id="SelectByValue" kind="method">
        /// <summary>해당 계좌번호로 선택</summary>
        /// <remarks>해당 계좌번호로 선택</remarks>
        /// <param name="value" type="string">Value</param>
        /// <param name="event" type="bool">event 사용여부</param>
        /// <returns type="number">정상: 0이상, 오류: -1</returns>
        /// <example>var val = acct_1.SelectByValue(value);
        /// </example>
        /// </member>
        SelectByValue: function (value, event) {
            var obj = this;
            var $element = this.GetElemnt();
            var $optionEle = $element.find("option");
            $optionEle.each(function (x) {
                var acctno = $(this).val();
                var caption = $(this).text();

                if (value == acctno) {
                    $element[0].selectedIndex = x;

                    obj.account = acctno;

                    obj.setPassword(acctno);

                    if (obj.OnListChanged && event)
                        obj.OnListChanged.call(obj, x, acctno, caption);

                    return 0;
                }
            });
        },

        /// <member id="GetAcctFlag" kind="method">
        /// <summary>현재 계좌번호의 ACCT_FLAG취득</summary>
        /// <remarks>현재 계좌번호의 ACCT_FLAG취득</remarks>
        /// <param name="acctno" type="string">계좌번호(없으면 현재 계좌것 취득)</param>
        /// <returns type="string">계좌 FLAG</returns>
        /// <example>var val = acct_1.GetAcctFlag(acctno);
        /// </example>
        /// </member>
        GetAcctFlag: function (acctno) {
            var acctflag = this.acctflag;
            if (acctno) {
                for (var x = 0; x < this.acctObj.length; x++) {
                    var acctObj = this.acctObj[x];
                    if (acctObj.account == acctno) {
                        acctflag = acctObj.acctflag;
                        break;
                    }
                }
            }
            return acctflag;
        },
    };

    /* events */
    /// <member id="OnListChanged" kind="event" default="true">
    /// <summary>계좌번호 선택시 발생되는 이벤트</summary>
    /// <remarks>계좌리스트에서 하나를 선택했을때 발생</remarks>
    /// <param name="index" type="number">Index</param>
    /// <param name="acctno" type="string">계좌번호(숫자만)</param>
    /// <param name="acctname" type="string">계좌명</param>
    /// </member>
    //account.prototype.OnListChanged = function (index, acctno, acctname) {
    //    var fn = this.objParentForm.getIsEventName(this.id, "OnListChanged");
    //    if (fn != null) fn(index, acctno, acctname);
    //}
    account.ctlName = "account";
    // 해쉬데이터에 함수를 등록한다.
    hi5_controlExpert(account.ctlName, account);
    return account;
})();
