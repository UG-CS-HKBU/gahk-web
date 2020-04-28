/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    return res.view('admin/index');
  },

  news_list: async function (req, res) {
    var models = await News.find({ sort: 'category' });
    return res.view('admin/news/index', { news: models });
  },

  news_create: async function (req, res) {

    if (req.method === 'GET') {
      return res.view('admin/news/detail', { news: {} });
    }

    if (!req.body.News) return res.badRequest();

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    return res.json(await News.create(req.body.News).fetch())
  },

  news_detail: async function (req, res) {
    //    var models = await News.find({sort:'create_at DESC'});

    var id = req.params.id || '';

    if (req.method === 'GET') {
      return res.view('admin/news/detail', { news: await News.findOne(id) });
    }

    if (!req.body.News) return res.badRequest();

    req.body.News.startDate = new Date(req.body.News.startDate);
    req.body.News.endDate = new Date(req.body.News.endDate);

    return res.json(await News.update(id).set(req.body.News).fetch());
  },

  news_delete: async function (req, res) {
    return res.json(await News.destroy(req.params.id).fetch());
  },

  email_list: async function (req, res) {
    return res.view('admin/email/index', { emails: await Email.find() });
  },

  email_detail: async function (req, res) {
    return res.json(await Email.update(req.params.id).set(req.body.Email).fetch());
  },

  user_list: async function (req, res) {
    return res.view('admin/user/index', { news: await User.find({ sort: 'create_at DESC' }) });
  },

  user_detail: async function (req, res) {

  },

  // acroage - search
  acroSearch: async function (req, res) {
    req.session.acroSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.item && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await Acroage.find();

    } else {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.item) condition.item = req.query.item;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
      var models = await Acroage.find({
        where: condition
      });
      req.session.acroSearchResult = condition;
    }

    return res.view('admin/applyHandle/acroSearch', { applications: models, projectYear });
  },

  //gfa - search
  gfaSearch: async function (req, res) {
    req.session.gfaSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await GFA.find();

    } else {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
      var models = await GFA.find({
        where: condition
      });
      req.session.gfaSearchResult = condition;
    }

    return res.view('admin/applyHandle/gfaSearch', { applications: models, projectYear });
  },

  //trampoline - search
  trampolineSearch: async function (req, res) {
    req.session.tramSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.gender && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var models = await Trampoline.find();

    } else {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.gender) condition.gender = req.query.gender;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;
      var models = await Trampoline.find({
        where: condition
      });
      req.session.tramSearchResult = condition;
    }

    return res.view('admin/applyHandle/trampolineSearch', { applications: models, projectYear });
  },

  //clubmember - search
  clubMemberSearch: async function (req, res) {
    req.session.clubMemSearchResult = {};
    var condition = {};
    var projectYear = req.query.year;

    if (!req.query.year && !req.query.payStatus && !req.query.formStatus) {
      var models = await ClubMember.find();

    } else {
      if (req.query.year) condition.clubYear = req.query.year;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      var models = await ClubMember.find({
        where: condition
      });
      req.session.clubMemSearchResult = condition;
    }

    return res.view('admin/applyHandle/clubMemberSearch', { applications: models, projectYear });
  },

  //hkrga - search
  HKRGASearch: async function (req, res) {
    req.session.hkrgaSearchResult = {};
    var condition = {};
    var form = req.query.application;
    var projectYear = req.query.year;

    if (!req.query.application && !req.query.year && !req.query.category && !req.query.payStatus && !req.query.formStatus && !req.query.teamStatus) {
      var trgpModels = await TRGP.find();
      var trgsModels = await TRGS.find();
      var grgpModels = await GRGP.find();
      var grgsModels = await GRGS.find();

    } else {
      if (req.query.year) condition.compYear = req.query.year;
      if (req.query.category) condition.category = req.query.category;
      if (req.query.payStatus) condition.payStatus = req.query.payStatus;
      if (req.query.formStatus) condition.formStatus = req.query.formStatus;
      if (req.query.teamStatus) condition.teamStatus = req.query.teamStatus;

      if (req.query.application) {

        if (req.query.application == "TRGP") {
          var trgpModels = await TRGP.find({
            where: condition
          });

        } else if (req.query.application == "TRGS") {
          var trgsModels = await TRGS.find({
            where: condition
          });
        } else if (req.query.application == "GRGP") {
          var grgpModels = await GRGP.find({
            where: condition
          });
        } else if (req.query.application == "GRGS") {
          var grgsModels = await GRGS.find({
            where: condition
          });
        }

      } else {
        var trgpModels = await TRGP.find({
          where: condition
        });
        var trgsModels = await TRGS.find({
          where: condition
        });
        var grgpModels = await GRGP.find({
          where: condition
        });
        var grgsModels = await GRGS.find({
          where: condition
        });
      }


      req.session.hkrgaSearchResult = condition;

      if (req.query.application) {
        req.session.hkrgaSearchResult.form = req.query.application;
      }

    }

    return res.view('admin/applyHandle/HKRGASearch', { trgpApp: trgpModels, trgsApp: trgsModels, grgpApp: grgpModels, grgsApp: grgsModels, form, projectYear });
  },

  //hkrga - export excel
  HKRGA_export_xlsx: async function (req, res) {
    var condition = {};
    if (!req.session.hkrgaSearchResult.form && !req.session.hkrgaSearchResult.compYear && !req.session.hkrgaSearchResult.category
      && !req.session.hkrgaSearchResult.payStatus && !req.session.hkrgaSearchResult.formStatus && !req.session.hkrgaSearchResult.teamStatus) {
      var grgsModels = await GRGS.find();
      var grgpModels = await GRGP.find();
      var trgsModels = await TRGS.find();
      var trgpModels = await TRGP.find();

    } else {
      if (req.session.hkrgaSearchResult.compYear) condition.compYear = req.session.hkrgaSearchResult.compYear;
      if (req.session.hkrgaSearchResult.category) condition.category = req.session.hkrgaSearchResult.category;
      if (req.session.hkrgaSearchResult.payStatus) condition.payStatus = req.session.hkrgaSearchResult.payStatus;
      if (req.session.hkrgaSearchResult.formStatus) condition.formStatus = req.session.hkrgaSearchResult.formStatus;
      if (req.session.hkrgaSearchResult.teamStatus) condition.teamStatus = req.session.hkrgaSearchResult.teamStatus;

      if (req.session.hkrgaSearchResult.form) {
        if (req.session.hkrgaSearchResult.form == "TRGP") {
          var trgpModels = await TRGP.find({
            where: condition
          });

        } else if (req.session.hkrgaSearchResult.form == "TRGS") {
          var trgsModels = await TRGS.find({
            where: condition
          });
        } else if (req.session.hkrgaSearchResult.form == "GRGP") {
          var grgpModels = await GRGP.find({
            where: condition
          });
        } else if (req.session.hkrgaSearchResult.form == "GRGS") {
          var grgsModels = await GRGS.find({
            where: condition
          });
        }

      } else {
        var trgpModels = await TRGP.find({
          where: condition
        });
        var trgsModels = await TRGS.find({
          where: condition
        });
        var grgpModels = await GRGP.find({
          where: condition
        });
        var grgsModels = await GRGS.find({
          where: condition
        });
      }
    }

    var XLSX = require('xlsx');
    var wb = XLSX.utils.book_new();

    if (grgsModels) {
      var grgsWS = XLSX.utils.json_to_sheet(grgsModels.map(model => {
        var createTime = new Date(model.createdAt);
        var month = createTime.getMonth() + 1;
        var applyDate = createTime.getDate() + "/" + month + "/" + createTime.getFullYear();

        var updateTime = new Date(model.updatedAt);
        var month = updateTime.getMonth() + 1;
        var updateDate = updateTime.getDate() + "/" + month + "/" + updateTime.getFullYear() + " " + updateTime.getHours() + ":" + updateTime.getMinutes() + ":" + updateTime.getSeconds();

        var day1 = model.birth1.split('-');
        var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
        var day2 = model.birth2.split('-');
        var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
        var day3 = model.birth3.split('-');
        var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
        var day4 = model.birth4.split('-');
        var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];
        var day5 = model.birth5.split('-');
        var date5 = day5[2] + "/" + day5[1] + "/" + day5[0];
        var day6 = model.birth6.split('-');
        var date6 = day6[2] + "/" + day6[1] + "/" + day6[0];

        if (model.formStatus == "accepted") {
          var formS = "已確認 Accepted";
        } else if (model.formStatus == "rejected") {
          var formS = "已拒絕 Rejected";
        } else if (model.formStatus == "dataDef") {
          var formS = "資料不全 Data Deficiency";
        } else if (model.formStatus == "ToBeCon") {
          var formS = "待處理 To be handled";
        }

        if (model.teamStatus == "suTeam") {
          var teamS = "正選 Successful Team";
        } else if (model.teamName == "waitTeam") {
          var teamS = "後備 Team on Waitiing List";
        }

        if (model.payStatus == "unpaid") {
          var payS = "未付款 Unpaid";
        } else if (model.payStatus == "paid") {
          var payS = "已付款 Paid";
        }

        return {
          "申請表編號 Application Number": model.idCode,
          "比賽年份 Year of Competition": model.compYear,
          "隊伍名稱(中文) Team Name(Chinese)": model.teamName,
          "聯絡電話 Contact Number": model.phone,
          "聯絡電郵 Email Address": model.email,
          "教練姓名 Coach Name": model.coachName,
          "教練聯絡電話 Coach Contact Number": model.coachPhone,
          "組別及比賽項目 Category and Competition Item": model.category,
          "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
          "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.chiName1,
          "參加者(1)英文姓名 Applicant(1) Name in English": model.engName1,
          "參加者(1)身份證號碼 Applicant(1) ID Card Number": model.ID1,
          "參加者(1)出生日期 Applicant(1) Date of Birth": date1,
          "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
          "參加者(2)中文姓名 Applicant(2) Chinese Name": model.chiName2,
          "參加者(2)英文姓名 Applicant(2) English Name": model.engName2,
          "參加者(2)身份證號碼 Applicant(2) ID Card Number": model.ID2,
          "參加者(2)出生日期 Applicant(2) Date of Birth": date2,
          "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
          "參加者(3)中文姓名 Applicant(3) Chinese Name": model.chiName3,
          "參加者(3)英文姓名 Applicant(3) English Name": model.engName3,
          "參加者(3)身份證號碼 Applicant(3) ID Card Number": model.ID3,
          "參加者(3)出生日期 Applicant(3) Date of Birth": date3,
          "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
          "參加者(4)中文姓名 Applicant(4) Chinese Name": model.chiName4,
          "參加者(4)英文姓名 Applicant(4) English Name": model.engName4,
          "參加者(4)身份證號碼 Applicant(4) ID Card Number": model.ID4,
          "參加者(4)出生日期 Applicant(4) Date of Birth": date4,
          "參加者(5)是否有中文姓名 Applicant(5) Any Chinese name": model.havecname5,
          "參加者(5)中文姓名 Applicant(5) Chinese Name": model.chiName5,
          "參加者(5)英文姓名 Applicant(5) English Name": model.engName5,
          "參加者(5)身份證號碼 Applicant(5) ID Card Number": model.ID5,
          "參加者(5)出生日期 Applicant(5) Date of Birth": date5,
          "參加者(6)是否有中文姓名 Applicant(6) Any Chinese name": model.havecname6,
          "參加者(6)中文姓名 Applicant(6) Chinese Name": model.chiName6,
          "參加者(6)英文姓名 Applicant(6) English Name": model.engName6,
          "參加者(6)身份證號碼 Applicant(6) ID Card Number": model.ID6,
          "參加者(6)出生日期 Applicant(6) Date of Birth": date6,
          "隊伍負責人姓名 Leader's Name": model.leaderName,
          "隊伍負責人職位 Leader's Position": model.leaderPosition,
          "隊伍數目 Number of Team(s)": model.NoOfTeam,
          "人數 people": model.NoOfPeople,
          "集體項目價錢 Cost of Collective Subject ($)": model.teamFee,
          "保險 Insurance ($)": model.insurance,
          "總額 Total Price ($)": model.total,
          "付款狀況 Payment Status": payS,
          "申請狀況 Apply Status": formS,
          "隊伍/團體狀況 Team Status": teamS,
          "提交日期 Apply Date": applyDate,
          "上次更新 Last upadated": updateDate
        }
      }));

      XLSX.utils.book_append_sheet(wb, grgsWS, "集體(學校組) Group(School)");
    }

    if (grgpModels) {
      var grgpWS = XLSX.utils.json_to_sheet(grgpModels.map(model => {
        var createTime = new Date(model.createdAt);
        var month = createTime.getMonth() + 1;
        var applyDate = createTime.getDate() + "/" + month + "/" + createTime.getFullYear();

        var updateTime = new Date(model.updatedAt);
        var month = updateTime.getMonth() + 1;
        var updateDate = updateTime.getDate() + "/" + month + "/" + updateTime.getFullYear() + " " + updateTime.getHours() + ":" + updateTime.getMinutes() + ":" + updateTime.getSeconds();

        var day1 = model.birth1.split('-');
        var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
        var day2 = model.birth2.split('-');
        var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
        var day3 = model.birth3.split('-');
        var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
        var day4 = model.birth4.split('-');
        var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];
        var day5 = model.birth5.split('-');
        var date5 = day5[2] + "/" + day5[1] + "/" + day5[0];
        var day6 = model.birth6.split('-');
        var date6 = day6[2] + "/" + day6[1] + "/" + day6[0];

        if (model.formStatus == "accepted") {
          var formS = "已確認 Accepted";
        } else if (model.formStatus == "rejected") {
          var formS = "已拒絕 Rejected";
        } else if (model.formStatus == "dataDef") {
          var formS = "資料不全 Data Deficiency";
        } else if (model.formStatus == "ToBeCon") {
          var formS = "待處理 To be handled";
        }

        if (model.teamStatus == "suTeam") {
          var teamS = "正選 Successful Team";
        } else if (model.teamName == "waitTeam") {
          var teamS = "後備 Team on Waitiing List";
        }

        if (model.payStatus == "unpaid") {
          var payS = "未付款 Unpaid";
        } else if (model.payStatus == "paid") {
          var payS = "已付款 Paid";
        }

        return {
          "申請表編號 Application Number": model.idCode,
          "比賽年份 Year of Competition": model.compYear,
          "隊伍名稱(中文) Team Name(Chinese)": model.teamName,
          "聯絡電話 Contact Number": model.phone,
          "聯絡電郵 Email Address": model.email,
          "教練姓名 Coach Name": model.coachName,
          "教練聯絡電話 Coach Contact Number": model.coachPhone,
          "組別及比賽項目 Category and Competition Item": model.category,
          "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
          "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.chiName1,
          "參加者(1)英文姓名 Applicant(1) Name in English": model.engName1,
          "參加者(1)身份證號碼 Applicant(1) ID Card Number": model.ID1,
          "參加者(1)出生日期 Applicant(1) Date of Birth": date1,
          "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
          "參加者(2)中文姓名 Applicant(2) Chinese Name": model.chiName2,
          "參加者(2)英文姓名 Applicant(2) English Name": model.engName2,
          "參加者(2)身份證號碼 Applicant(2) ID Card Number": model.ID2,
          "參加者(2)出生日期 Applicant(2) Date of Birth": date2,
          "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
          "參加者(3)中文姓名 Applicant(3) Chinese Name": model.chiName3,
          "參加者(3)英文姓名 Applicant(3) English Name": model.engName3,
          "參加者(3)身份證號碼 Applicant(3) ID Card Number": model.ID3,
          "參加者(3)出生日期 Applicant(3) Date of Birth": date3,
          "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
          "參加者(4)中文姓名 Applicant(4) Chinese Name": model.chiName4,
          "參加者(4)英文姓名 Applicant(4) English Name": model.engName4,
          "參加者(4)身份證號碼 Applicant(4) ID Card Number": model.ID4,
          "參加者(4)出生日期 Applicant(4) Date of Birth": date4,
          "參加者(5)是否有中文姓名 Applicant(5) Any Chinese name": model.havecname5,
          "參加者(5)中文姓名 Applicant(5) Chinese Name": model.chiName5,
          "參加者(5)英文姓名 Applicant(5) English Name": model.engName5,
          "參加者(5)身份證號碼 Applicant(5) ID Card Number": model.ID5,
          "參加者(5)出生日期 Applicant(5) Date of Birth": date5,
          "參加者(6)是否有中文姓名 Applicant(6) Any Chinese name": model.havecname6,
          "參加者(6)中文姓名 Applicant(6) Chinese Name": model.chiName6,
          "參加者(6)英文姓名 Applicant(6) English Name": model.engName6,
          "參加者(6)身份證號碼 Applicant(6) ID Card Number": model.ID6,
          "參加者(6)出生日期 Applicant(6) Date of Birth": date6,
          "隊伍負責人姓名 Leader's Name": model.leaderName,
          "隊伍負責人職位 Leader's Position": model.leaderPosition,
          "隊伍數目 Number of Team(s)": model.NoOfTeam,
          "人數 people": model.NoOfPeople,
          "集體項目價錢 Cost of Collective Subject ($)": model.teamFee,
          "保險 Insurance ($)": model.insurance,
          "總額 Total Price ($)": model.total,
          "付款狀況 Payment Status": payS,
          "申請狀況 Apply Status": formS,
          "隊伍/團體狀況 Team Status": teamS,
          "提交日期 Apply Date": applyDate,
          "上次更新 Last upadated": updateDate
        }
      }));
      XLSX.utils.book_append_sheet(wb, grgpWS, "集體(公開組) Group(Public)");
    }

    if (trgsModels) {
      var trgsWS = XLSX.utils.json_to_sheet(trgsModels.map(model => {
        var payStatus, formStatus, teamStatus;
        var day1 = model.Mate1Date.split('-');
        var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
        var day2 = model.Mate2Date.split('-');
        var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
        var day3 = model.Mate3Date.split('-');
        var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
        var day4 = model.Mate4Date.split('-');
        var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];

        var n = new Date(model.createdAt);
        var cmonth = n.getMonth() + 1;
        var applyDate = n.getDate() + "/" + cmonth + "/" + n.getFullYear();

        var m = new Date(model.updatedAt);
        var umonth = m.getMonth() + 1;
        var updateDate = m.getDate() + "/" + umonth + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

        if (model.payStatus == "paid") {
          payStatus = "已付款 Paid";
        } else {
          payStatus = "未付款 Unpaid";
        }

        if (model.formStatus == "ToBeCon") {
          formStatus = "待處理 To be handled";
        } else if (model.formStatus == "accepted") {
          formStatus = "已確認 Accepted";
        } else if (model.formStatus == "rejected") {
          formStatus = "已拒絕 Rejected";
        } else if (model.formStatus == "dataDef") {
          formStatus = "資料不全 Data Deficiency";
        }

        if (model.teamStatus == "suTeam") {
          teamStatus = "正選 Successful Team";
        } else {
          teamStatus = "後補 Team on Waitiing List";
        }

        return {
          "申請表編號 Application Number": model.idCode,
          "比賽年份 Year of Competition": model.compYear,
          "學校名稱(中文) School Name(Chinese)": model.teamName,
          "聯絡電話 Contact Number": model.Phone,
          "聯絡電郵 Email Address": model.Email,
          "教練姓名 Coach Name": model.CoachName,
          "教練聯絡電話 Coach Contact Number": model.CoachPhone,
          "組別 Category": model.category,
          "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
          "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.Mate1ChiName,
          "參加者(1)英文姓名 Applicant(1) Name in English": model.Mate1EngName,
          "參加者(1)身分證號碼  Applicant(1) ID Card Number": model.Mate1IDNo,
          "參加者(1)出生日期  Applicant(1) Date of Birth": date1,
          "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
          "參加者(2)中文姓名 Applicant(2) Name in Chinese": model.Mate2ChiName,
          "參加者(2)英文姓名 Applicant(2) Name in English": model.Mate2EngName,
          "參加者(2)身分證號碼  Applicant(2) ID Card Number": model.Mate2IDNo,
          "參加者(2)出生日期  Applicant(2) Date of Birth": date2,
          "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
          "參加者(3)中文姓名 Applicant(3) Name in Chinese": model.Mate3ChiName,
          "參加者(3)英文姓名 Applicant(3) Name in English": model.Mate3EngName,
          "參加者(3)身分證號碼  Applicant(3) ID Card Number": model.Mate3IDNo,
          "參加者(3)出生日期  Applicant(3) Date of Birth": date3,
          "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
          "參加者(4)中文姓名 Applicant(4) Name in Chinese": model.Mate4ChiName,
          "參加者(4)英文姓名 Applicant(4) Name in English": model.Mate4EngName,
          "參加者(4)身分證號碼  Applicant(4) ID Card Number": model.Mate4IDNo,
          "參加者(4)出生日期  Applicant(4) Date of Birth": date4,
          "團體項目(隊) Group Event(team(s)) ": model.TeamNumber,
          "費用(hk$)": model.TeamPrice,
          "總額 Total price($)": model.TeamTotalPrice,
          "學校負責人姓名 Leader's Name": model.leaderName,
          "學校負責人職位 Leader's Position": model.leaderPosition,
          "付款狀況 Payment Status": payStatus,
          "申請狀況 Apply Status": formStatus,
          "隊伍/團體狀況 Team Status": teamStatus,
          "提交日期 Apply Date": applyDate,
          "上次更新 Last upadated": updateDate,
        }
      }));
      XLSX.utils.book_append_sheet(wb, trgsWS, "團體(學校組) Team(School)");
    }

    if (trgpModels) {
      var trgpWS = XLSX.utils.json_to_sheet(trgpModels.map(model => {
        var payStatus, formStatus, teamStatus;
        var day1 = model.Mate1Date.split('-');
        var date1 = day1[2] + "/" + day1[1] + "/" + day1[0];
        var day2 = model.Mate2Date.split('-');
        var date2 = day2[2] + "/" + day2[1] + "/" + day2[0];
        var day3 = model.Mate3Date.split('-');
        var date3 = day3[2] + "/" + day3[1] + "/" + day3[0];
        var day4 = model.Mate4Date.split('-');
        var date4 = day4[2] + "/" + day4[1] + "/" + day4[0];

        var n = new Date(model.createdAt);
        var cmonth = n.getMonth() + 1;
        var applyDate = n.getDate() + "/" + cmonth + "/" + n.getFullYear();

        var m = new Date(model.updatedAt);
        var umonth = m.getMonth() + 1;
        var updateDate = m.getDate() + "/" + umonth + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

        if (model.payStatus == "paid") {
          payStatus = "已付款 Paid";
        } else {
          payStatus = "未付款 Unpaid";
        }

        if (model.formStatus == "ToBeCon") {
          formStatus = "待處理 To be handled";
        } else if (model.formStatus == "accepted") {
          formStatus = "已確認 Accepted";
        } else if (model.formStatus == "rejected") {
          formStatus = "已拒絕 Rejected";
        } else if (model.formStatus == "dataDef") {
          formStatus = "資料不全 Data Deficiency";
        }

        if (model.teamStatus == "suTeam") {
          teamStatus = "正選 Successful Team";
        } else {
          teamStatus = "後補 Team on Waitiing List";
        }

        return {
          "申請表編號 Application Number": model.idCode,
          "比賽年份 Year of Competition": model.compYear,
          "機構名稱(中文) Organization Name(Chinese)": model.teamName,
          "聯絡電話 Contact Number": model.Phone,
          "聯絡電郵 Email Address": model.Email,
          "教練姓名 Coach Name": model.CoachName,
          "教練聯絡電話 Coach Contact Number": model.CoachPhone,
          "參賽組別 Category": model.category,
          "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
          "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.Mate1ChiName,
          "參加者(1)英文姓名 Applicant(1) Name in English": model.Mate1EngName,
          "參加者(1)身分證號碼  Applicant(1) ID Card Number": model.Mate1IDNo,
          "參加者(1)出生日期  Applicant(1) Date of Birth": date1,
          "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
          "參加者(2)中文姓名 Applicant(2) Name in Chinese": model.Mate2ChiName,
          "參加者(2)英文姓名 Applicant(2) Name in English": model.Mate2EngName,
          "參加者(2)身分證號碼  Applicant(2) ID Card Number": model.Mate2IDNo,
          "參加者(2)出生日期  Applicant(2) Date of Birth": date2,
          "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
          "參加者(3)中文姓名 Applicant(3) Name in Chinese": model.Mate3ChiName,
          "參加者(3)英文姓名 Applicant(3) Name in English": model.Mate3EngName,
          "參加者(3)身分證號碼  Applicant(3) ID Card Number": model.Mate3IDNo,
          "參加者(3)出生日期  Applicant(3) Date of Birth": date3,
          "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
          "參加者(4)中文姓名 Applicant(4) Name in Chinese": model.Mate4ChiName,
          "參加者(4)英文姓名 Applicant(4) Name in English": model.Mate4EngName,
          "參加者(4)身分證號碼  Applicant(4) ID Card Number": model.Mate4IDNo,
          "參加者(4)出生日期  Applicant(4) Date of Birth": date4,
          "團體項目(隊) Group Event(team(s)) ": model.TeamNumber,
          "費用(hk$)": model.TeamPrice,
          "總額 Total price($)": model.TeamTotalPrice,
          "機構負責人姓名 Leader's Name": model.leaderName,
          "機構負責人職位 Leader's Position": model.leaderPosition,
          "付款狀況 Payment Status": payStatus,
          "申請狀況 Apply Status": formStatus,
          "隊伍/團體狀況 Team Status": teamStatus,
          "提交日期 Apply Date": applyDate,
          "上次更新 Last upadated": updateDate,
        }
      }));
      XLSX.utils.book_append_sheet(wb, trgpWS, "團體(公開組) Team(Public)");
    }

    res.set("Content-disposition", "attachment; filename=HKRGA.xlsx");
    return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
  },

  //hkrga - import excel
  HKRGA_import_xlsx: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.file('file').upload({ maxBytes: 10000000 }, async function whenDone(err, uploadedFiles) {
      if (err) { return res.serverError(err); }
      if (uploadedFiles.length === 0) { return res.badRequest('No file was uploaded'); }

      var XLSX = require('xlsx');
      var workbook = XLSX.readFile(uploadedFiles[0].fd);

      //import GRGS
      var grgsWS = workbook.Sheets[workbook.SheetNames[0]];
      var grgsData = XLSX.utils.sheet_to_json(grgsWS, { range: 1, header: ["idCode", "compYear", "teamName", "phone", "email", "coachName", "coachPhone", "category", "havecname1", "chiName1", "engName1", "ID1", "birth1", "havecname2", "chiName2", "engName2", "ID2", "birth2", "havecname3", "chiName3", "engName3", "ID3", "birth3", "havecname4", "chiName4", "engName4", "ID4", "birth4", "havecname5", "chiName5", "engName5", "ID5", "birth5", "havecname6", "chiName6", "engName6", "ID6", "birth6", "leaderName", "leaderPosition", "NoOfTeam", "NoOfPeople", "teamFee", "insurance", "total", "payStatus", "formStatus", "teamStatus"] });

      for (var i = 0; i < grgsData.length; i++) {
        var date1 = grgsData[i].birth1.split('/');
        day1 = date1[2] + "-" + date1[1] + "-" + date1[0];
        grgsData[i].birth1 = day1;

        var date2 = grgsData[i].birth2.split('/');
        day2 = date2[2] + "-" + date2[1] + "-" + date2[0];
        grgsData[i].birth2 = day2;

        var date3 = grgsData[i].birth3.split('/');
        day3 = date3[2] + "-" + date3[1] + "-" + date3[0];
        grgsData[i].birth3 = day3;

        var date4 = grgsData[i].birth4.split('/');
        day4 = date4[2] + "-" + date4[1] + "-" + date4[0];
        grgsData[i].birth4 = day4;

        var date5 = grgsData[i].birth5.split('/');
        day5 = date5[2] + "-" + date5[1] + "-" + date5[0];
        grgsData[i].birth5 = day5;

        var date6 = grgsData[i].birth6.split('/');
        day6 = date6[2] + "-" + date6[1] + "-" + date6[0];
        grgsData[i].birth6 = day6;

        if (grgsData[i].payStatus == "未付款 Unpaid") {
          grgsData[i].payStatus = "unpaid";
        } else if (grgsData[i].payStatus == "已付款 Paid") {
          grgsData[i].payStatus = "paid";
        }

        if (grgsData[i].formStatus == "待處理 To be handled") {
          grgsData[i].formStatus = "ToBeCon";
        } else if (grgsData[i].formStatus == "已確認 Accepted") {
          grgsData[i].formStatus = "accepted";
        } else if (grgsData[i].formStatus == "已拒絕 Rejected") {
          grgsData[i].formStatus = "rejected";
        } else if (grgsData[i].formStatus == "資料不全 Data Deficiency") {
          grgsData[i].formStatus = "dataDef";
        }

        if (grgsData[i].teamStatus == "正選 Successful Team") {
          grgsData[i].teamStatus = "suTeam";
        } else if (grgsData[i].teamStatus == "後補 Team on Waitiing List") {
          grgsData[i].teamStatus = "waitTeam";
        }
      }
      console.log(grgsData);
      var grgsModels = await GRGS.createEach(grgsData).fetch();

      //import GRGP
      var grgpWS = workbook.Sheets[workbook.SheetNames[1]];
      var grgpData = XLSX.utils.sheet_to_json(grgpWS, { range: 1, header: ["idCode", "compYear", "teamName", "phone", "email", "coachName", "coachPhone", "category", "havecname1", "chiName1", "engName1", "ID1", "birth1", "havecname2", "chiName2", "engName2", "ID2", "birth2", "havecname3", "chiName3", "engName3", "ID3", "birth3", "havecname4", "chiName4", "engName4", "ID4", "birth4", "havecname5", "chiName5", "engName5", "ID5", "birth5", "havecname6", "chiName6", "engName6", "ID6", "birth6", "leaderName", "leaderPosition", "NoOfTeam", "NoOfPeople", "teamFee", "insurance", "total", "payStatus", "formStatus", "teamStatus"] });

      for (var i = 0; i < grgpData.length; i++) {
        var date1 = grgpData[i].birth1.split('/');
        day1 = date1[2] + "-" + date1[1] + "-" + date1[0];
        grgpData[i].birth1 = day1;

        var date2 = grgpData[i].birth2.split('/');
        day2 = date2[2] + "-" + date2[1] + "-" + date2[0];
        grgpData[i].birth2 = day2;

        var date3 = grgpData[i].birth3.split('/');
        day3 = date3[2] + "-" + date3[1] + "-" + date3[0];
        grgpData[i].birth3 = day3;

        var date4 = grgpData[i].birth4.split('/');
        day4 = date4[2] + "-" + date4[1] + "-" + date4[0];
        grgpData[i].birth4 = day4;

        var date5 = grgpData[i].birth5.split('/');
        day5 = date5[2] + "-" + date5[1] + "-" + date5[0];
        grgpData[i].birth5 = day5;

        var date6 = grgpData[i].birth6.split('/');
        day6 = date6[2] + "-" + date6[1] + "-" + date6[0];
        grgpData[i].birth6 = day6;

        if (grgpData[i].payStatus == "未付款 Unpaid") {
          grgpData[i].payStatus = "unpaid";
        } else if (grgpData[i].payStatus == "已付款 Paid") {
          grgpData[i].payStatus = "paid";
        }

        if (grgpData[i].formStatus == "待處理 To be handled") {
          grgpData[i].formStatus = "ToBeCon";
        } else if (grgpData[i].formStatus == "已確認 Accepted") {
          grgpData[i].formStatus = "accepted";
        } else if (grgpData[i].formStatus == "已拒絕 Rejected") {
          grgpData[i].formStatus = "rejected";
        } else if (grgpData[i].formStatus == "資料不全 Data Deficiency") {
          grgpData[i].formStatus = "dataDef";
        }

        if (grgpData[i].teamStatus == "正選 Successful Team") {
          grgpData[i].teamStatus = "suTeam";
        } else if (grgpData[i].teamStatus == "後補 Team on Waitiing List") {
          grgpData[i].teamStatus = "waitTeam";
        }
      }
      console.log(grgpData);
      var grgpModels = await GRGP.createEach(grgpData).fetch();

      //import TRGS
      var trgsWS = workbook.Sheets[workbook.SheetNames[2]];
      var trgsData = XLSX.utils.sheet_to_json(trgsWS, { range: 1, header: ["idCode", "compYear", "teamName", "Phone", "Email", "CoachName", "CoachPhone", "category", "havecname1", "Mate1ChiName", "Mate1EngName", "Mate1IDNo", "Mate1Date", "havecname2", "Mate2ChiName", "Mate2EngName", "Mate2IDNo", "Mate2Date", "havecname3", "Mate3ChiName", "Mate3EngName", "Mate3IDNo", "Mate3Date", "havecname4", "Mate4ChiName", "Mate4EngName", "Mate4IDNo", "Mate4Date", "TeamNumber", "TeamPrice", "TeamTotalPrice", "leaderName", "leaderPosition", "payStatus", "formStatus", "teamStatus"] });

      for (var i = 0; i < trgsData.length; i++) {
        if (trgsData[i].payStatus == "未付款 Unpaid") {
          trgsData[i].payStatus = "unpaid";
        } else if (trgsData[i].payStatus == "已付款 Paid") {
          trgsData[i].payStatus = "paid";
        }

        if (trgsData[i].formStatus == "待處理 To be handled") {
          trgsData[i].formStatus = "ToBeCon";
        } else if (trgsData[i].formStatus == "已確認 Accepted") {
          trgsData[i].formStatus = "accepted";
        } else if (trgsData[i].formStatus == "已拒絕 Rejected") {
          trgsData[i].formStatus = "rejected";
        } else if (trgsData[i].formStatus == "資料不全 Data Deficiency") {
          trgsData[i].formStatus = "dataDef";
        }

        if (trgsData[i].teamStatus == "正選 Successful Team") {
          trgsData[i].teamStatus = "suTeam";
        } else if (trgsData[i].teamStatus == "後補 Team on Waitiing List") {
          trgsData[i].teamStatus = "waitTeam";
        }

        var day1 = trgsData[i].Mate1Date.split('/');
        var date1 = day1[2] + "-" + day1[1] + "-" + day1[0];
        trgsData[i].Mate1Date = date1;
        var day2 = trgsData[i].Mate2Date.split('/');
        var date2 = day2[2] + "-" + day2[1] + "-" + day2[0];
        trgsData[i].Mate2Date = date2;
        var day3 = trgsData[i].Mate3Date.split('/');
        var date3 = day3[2] + "-" + day3[1] + "-" + day3[0];
        trgsData[i].Mate3Date = date3;
        var day4 = trgsData[i].Mate4Date.split('/');
        var date4 = day4[2] + "-" + day4[1] + "-" + day4[0];
        trgsData[i].Mate4Date = date4;
      }
      console.log(trgsData);
      var trgsModels = await TRGS.createEach(trgsData).fetch();

      //import TRGP
      var trgpWS = workbook.Sheets[workbook.SheetNames[3]];
      var trgpData = XLSX.utils.sheet_to_json(trgpWS, { range: 1, header: ["idCode", "compYear", "teamName", "Phone", "Email", "CoachName", "CoachPhone", "category", "havecname1", "Mate1ChiName", "Mate1EngName", "Mate1IDNo", "Mate1Date", "havecname2", "Mate2ChiName", "Mate2EngName", "Mate2IDNo", "Mate2Date", "havecname3", "Mate3ChiName", "Mate3EngName", "Mate3IDNo", "Mate3Date", "havecname4", "Mate4ChiName", "Mate4EngName", "Mate4IDNo", "Mate4Date", "TeamNumber", "TeamPrice", "TeamTotalPrice", "leaderName", "leaderPosition", "payStatus", "formStatus", "teamStatus"] });

      for (var i = 0; i < trgpData.length; i++) {
        if (trgpData[i].payStatus == "未付款 Unpaid") {
          trgpData[i].payStatus = "unpaid";
        } else if (trgpData[i].payStatus == "已付款 Paid") {
          trgpData[i].payStatus = "paid";
        }

        if (trgpData[i].formStatus == "待處理 To be handled") {
          trgpData[i].formStatus = "ToBeCon";
        } else if (trgpData[i].formStatus == "已確認 Accepted") {
          trgpData[i].formStatus = "accepted";
        } else if (trgpData[i].formStatus == "已拒絕 Rejected") {
          trgpData[i].formStatus = "rejected";
        } else if (trgpData[i].formStatus == "資料不全 Data Deficiency") {
          trgpData[i].formStatus = "dataDef";
        }

        if (trgpData[i].teamStatus == "正選 Successful Team") {
          trgpData[i].teamStatus = "suTeam";
        } else if (trgpData[i].teamStatus == "後補 Team on Waitiing List") {
          trgpData[i].teamStatus = "waitTeam";
        }

        var day1 = trgpData[i].Mate1Date.split('/');
        var date1 = day1[2] + "-" + day1[1] + "-" + day1[0];
        trgpData[i].Mate1Date = date1;
        var day2 = trgpData[i].Mate2Date.split('/');
        var date2 = day2[2] + "-" + day2[1] + "-" + day2[0];
        trgpData[i].Mate2Date = date2;
        var day3 = trgpData[i].Mate3Date.split('/');
        var date3 = day3[2] + "-" + day3[1] + "-" + day3[0];
        trgpData[i].Mate3Date = date3;
        var day4 = trgpData[i].Mate4Date.split('/');
        var date4 = day4[2] + "-" + day4[1] + "-" + day4[0];
        trgpData[i].Mate4Date = date4;
      }

      console.log(trgpData);
      var trgpModels = await TRGP.createEach(trgpData).fetch();




      if (grgsModels.length == 0 && grgpModels.length == 0 && trgsModels.length == 0 && trgpModels.length == 0) {
        return res.badRequest("No data imported.");
      }
      return res.redirect('/admin/applyHandle/HKRGASearch');
    });
  },

  //hkrga - comfirm all
  HKRGA_comfirmAll: async function (req, res) {
    var condition = {};
    if (!req.session.hkrgaSearchResult.form && !req.session.hkrgaSearchResult.compYear && !req.session.hkrgaSearchResult.category
      && !req.session.hkrgaSearchResult.payStatus && !req.session.hkrgaSearchResult.formStatus && !req.session.hkrgaSearchResult.teamStatus) {
      var grgsModels = await GRGS.find();
      var grgpModels = await GRGP.find();
      var trgsModels = await TRGS.find();
      var trgpModels = await TRGP.find();

    } else {
      if (req.session.hkrgaSearchResult.compYear) condition.compYear = req.session.hkrgaSearchResult.compYear;
      if (req.session.hkrgaSearchResult.category) condition.category = req.session.hkrgaSearchResult.category;
      if (req.session.hkrgaSearchResult.payStatus) condition.payStatus = req.session.hkrgaSearchResult.payStatus;
      if (req.session.hkrgaSearchResult.formStatus) condition.formStatus = req.session.hkrgaSearchResult.formStatus;
      if (req.session.hkrgaSearchResult.teamStatus) condition.teamStatus = req.session.hkrgaSearchResult.teamStatus;

      if (req.session.hkrgaSearchResult.form) {
        if (req.session.hkrgaSearchResult.form == "TRGP") {
          var trgpModels = await TRGP.find({
            where: condition
          });

        } else if (req.session.hkrgaSearchResult.form == "TRGS") {
          var trgsModels = await TRGS.find({
            where: condition
          });
        } else if (req.session.hkrgaSearchResult.form == "GRGP") {
          var grgpModels = await GRGP.find({
            where: condition
          });
        } else if (req.session.hkrgaSearchResult.form == "GRGS") {
          var grgsModels = await GRGS.find({
            where: condition
          });
        }

      } else {
        var trgpModels = await TRGP.find({
          where: condition
        });
        var trgsModels = await TRGS.find({
          where: condition
        });
        var grgpModels = await GRGP.find({
          where: condition
        });
        var grgsModels = await GRGS.find({
          where: condition
        });
      }
    }

    if (trgpModels) {
      trgpModels.forEach(async function (model) {
        if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
          await TRGP.update(model.id).set({ formStatus: "accepted" })
        }
      });
    }

    if (trgsModels) {
      trgsModels.forEach(async function (model) {
        if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
          await TRGS.update(model.id).set({ formStatus: "accepted" })
        }
      });
    }

    if (grgpModels) {
      grgpModels.forEach(async function (model) {
        if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
          await GRGP.update(model.id).set({ formStatus: "accepted" })
        }
      });
    }

    if (grgsModels) {
      grgsModels.forEach(async function (model) {
        if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
          await GRGS.update(model.id).set({ formStatus: "accepted" })
        }
      });
    }

    if (req.wantsJSON) {
      return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
    } else {
      return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
    }
  },



};

