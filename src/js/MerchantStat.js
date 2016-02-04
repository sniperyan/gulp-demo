define(['jquery', 'backbone', 'text!tpl/reportForms/merchantStat', 'ms/reportForms/js/echarts.min', 'css!ms/reportForms/css/merchantStat-list.css'],
    function ($, Backbone, template, echarts) {
        hi.app.tplSax(template);
        /****************pieView*******************/
        var PieView = Marionette.ItemView.extend({
            template: "merchantStat-pie-list",
            initialize: function () {
            },
            reRender: function () {
                this.render();
            },
            events: {
                "click .tab-panel": "changeTab"
            },
            changeTab: function (e) {
                var target = e.target;
                if (!$(target).hasClass("choosed")) {
                    location.href = "#reportForms/userList";
                }
            },
            onShow: function () {
                var allMerchantsChart = echarts.init(document.getElementById('all-yogaMerchants-echarts'));
                var newMerchantsChart = echarts.init(document.getElementById('new-yogaMerchants-echarts'));
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['试用商户', '付费商户', '意向商户']
                    },
                    series: [
                        {
                            name: '商户人数',
                            type: 'pie',
                            radius: '55%',
                            center: ['40%', '60%'],
                            data: [
                                {value: 12, name: '试用商户'},
                                {value: 8, name: '付费商户'},
                                {value: 60, name: '意向商户'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                /*//查询加载昨日关注与累计关注用户数：
                yesterdayChart.showLoading();
                allUsersChart.showLoading();
                $.get(hi.ctx + '/reportForms/queryAttentioners').done(function (data) {
                    //关闭动画
                    yesterdayChart.hideLoading();
                    allUsersChart.hideLoading();
                    var yesterday = data.yesterday;
                    var all = data.all;
                    $("#yesterdayNum").html(yesterday.num1 + yesterday.num2 + yesterday.num0);
                    $("#allNum").html(all.num1 + all.num2 + all.num0);
                    // 填入数据
                    yesterdayChart.setOption({
                        series: [{
                            // 根据名字对应到相应的系列
                            data: [
                                {value: yesterday.num2, name: '瑜伽经营者'},
                                {value: yesterday.num1, name: '瑜伽其他人员'},
                                {value: yesterday.num0, name: '其他用户'}
                            ]
                        }]
                    });
                    allUsersChart.setOption({
                        series: [{
                            // 根据名字对应到相应的系列
                            data: [
                                {value: all.num2, name: '瑜伽经营者'},
                                {value: all.num1, name: '瑜伽其他人员'},
                                {value: all.num0, name: '其他用户'}
                            ]
                        }]
                    });
                });*/
                allMerchantsChart.setOption(option);
                newMerchantsChart.setOption(option);
            }
        });

        /****************NavView*******************/
        var NavView = Marionette.ItemView.extend({
            template: "merchantStat-nav",
            initialize: function () {

            },
            reRender: function () {

            },
            events: {
                "click .state": "changeState"
            },
            changeState: function (event) {
                var target = event.target;
                if (!$(target).hasClass("selected")) {
                    $($(".state")).each(function () {
                        $(this).removeClass("navigator-active");
                    });
                    $(target).addClass("navigator-active");
                }
                this.reRender();
            }
        });
        /****************TableView*******************/
        var TableView = Marionette.ItemView.extend({
            template: "merchantStat-table-list",
            initialize: function () {
                this.listenTo(this.collection, "change", this.reRender);
            },
            reRender: function () {
                this.render();
            },
            onShow: function () {
                var lineChart = echarts.init(document.getElementById('users-line-echarts'));
                lineChart.showLoading();
            }
        });
        var StatsLayout = Marionette.LayoutView.extend({
            tagName: 'div',
            id: 'merchant-stat-content',
            template: "merchantStat-list",
            regions: {
                header: "#merchantStat-top",
                body: "#merchantStat-nav",
                footer: "#merchantStat-content"
            },
            onShow: function () {
                var pieView = new PieView();
                var navView = new NavView();
                var tableView = new TableView();
                this.showChildView('header', pieView);
                this.showChildView('body',navView );
                this.showChildView('footer',tableView );
            }
        });
        return StatsLayout;


    });
