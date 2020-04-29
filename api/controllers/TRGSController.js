/**
 * TRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    TRGSForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/TRGSForm'); }

        req.session.data = req.body.TRGS;

        return res.view('pages/competition/form/TRGSFormPreview', { 'data': req.session.data || {} });
    },

    //action - create
    TRGSFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to TRGS
            var modelNum = await TRGS.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "TRGS" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create TRGS
            await TRGS.create(req.session.data);

            //clear session data
            req.session.data = null;
            req.session.TRGSdata = null;
            var user = await User.update(req.session.userId).set({
                TRGSdata: null
            }).fetch();
            if (user.length == 0) return res.notFound();

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode });
        }
    },

    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.TRGSdata = req.body;
        req.session.data = null;

        var user = await User.update(req.session.userId).set({
            TRGSdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/pages/competition/form/TRGSForm' });    // for ajax request
        } else {
            return res.redirect('/pages/competition/form/TRGSForm');           // for normal request
        }
    },

    //**************************admin/HandleApply*************************
    update: async function (req, res) {
        if (req.method == "GET") {
            var model = await TRGS.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGSEdit', { TRGS: model });

        } else {
            if (!req.body.TRGS)
                return res.badRequest("Form-data not received.");

            var models = await TRGS.update(req.params.id).set({
                compYear: req.body.TRGS.compYear,
                teamName: req.body.TRGS.teamName,
                Phone: req.body.TRGS.Phone,
                Email: req.body.TRGS.Email,
                CoachName: req.body.TRGS.CoachName,
                CoachPhone: req.body.TRGS.CoachPhone,
                category: req.body.TRGS.category,
                havecname1: req.body.TRGS.havecname1,
                Mate1ChiName: req.body.TRGS.Mate1ChiName,
                Mate1EngName: req.body.TRGS.Mate1EngName,
                Mate1IDNo: req.body.TRGS.Mate1IDNo,
                Mate1Date: req.body.TRGS.Mate1Date,
                havecname2: req.body.TRGS.havecname2,
                Mate2ChiName: req.body.TRGS.Mate2ChiName,
                Mate2EngName: req.body.TRGS.Mate2EngName,
                Mate2IDNo: req.body.TRGS.Mate2IDNo,
                Mate2Date: req.body.TRGS.Mate2Date,
                havecname3: req.body.TRGS.havecname3,
                Mate3ChiName: req.body.TRGS.Mate3ChiName,
                Mate3EngName: req.body.TRGS.Mate3EngName,
                Mate3IDNo: req.body.TRGS.Mate3IDNo,
                Mate3Date: req.body.TRGS.Mate3Date,
                havecname4: req.body.TRGS.havecname4,
                Mate4ChiName: req.body.TRGS.Mate4ChiName,
                Mate4EngName: req.body.TRGS.Mate4EngName,
                Mate4IDNo: req.body.TRGS.Mate4IDNo,
                Mate4Date: req.body.TRGS.Mate4Date,
                TeamNumber: req.body.TRGS.TeamNumber,
                TeamPrice: req.body.TRGS.TeamPrice,
                TeamTotalPrice: req.body.TRGS.TeamTotalPrice,
                leaderName: req.body.TRGS.leaderName,
                leaderPosition: req.body.TRGS.leaderPosition,
                Declaration: req.body.TRGS.Declaration,
                payStatus: req.body.TRGS.payStatus,
                formStatus: req.body.TRGS.formStatus,
                teamStatus: req.body.TRGS.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }
    },


    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGS.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

};

