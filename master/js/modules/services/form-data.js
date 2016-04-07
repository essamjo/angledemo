/**
 * 
 * @authors Zhou Guanqing (essamjo@163.com)
 * @date    2016-04-05 14:29:39
 * @version $Id$
 */

App.service('wantmnData', function(){
    this.formdata={
        "categoryId" : null, //工作分类
        "jobId" : null, //工作岗位
        "workType" : 1, //工作类型：驻场 or 远程
        "workAddress" : null,//工作地点: 地址id
        "workTime" : null, //工作时长
        "workTimeType" : null,//工作时间段
        "workStartDate" : null, //开始工作日期
        "workerNum" : 1,//牛人数量
        "workerName" : null,//候选人的id
        "salaryRange" : null,//日薪范围
        "workSkill" : null,//技能要求
        "workExp" : null,//经验要求
        "sex" : null,//性别
        "needPc" : null,//是否自带电脑
        "workContent" : null//工作描述
    }
    this.destoryFormdata = function(){
        this.formdata.categoryId=null;
        this.formdata.jobId=null;
        this.formdata.workType=1;
        this.formdata.workAddress=null;
        this.formdata.workTime=null;
        this.formdata.workTimeType=null;
        this.formdata.workStartDate=null;
        this.formdata.workerNum=1;
        this.formdata.workerName=null;
        this.formdata.salaryRange=null;
        this.formdata.workSkill=null;
        this.formdata.workExp=null;
        this.formdata.sex=null;
        this.formdata.needPc=null;
        this.formdata.workContent=null;

    }
    return this;
})