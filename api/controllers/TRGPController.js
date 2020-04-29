/**
 * TRGPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //(preview)
    TRGPForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/TRGPForm'); }

        req.session.data = req.body.TRGP;

        return res.view('pages/competition/form/TRGPFormPreview', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    TRGPFormPreview: async function (req, res) {
        if (req.method == "POST") {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to TRGP
            var modelNum = await TRGP.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "TRGP" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create TRGP
            await TRGP.create(req.session.data);

            //clear all session data
            req.session.data = null;
            req.session.TRGPdata = null;
            var user = await User.update(req.session.userId).set({
                TRGPdata: null
            }).fetch();
            if (user.length == 0) return res.notFound();

            return res.view('pages/competition/form/confirm_form', {'formIDCode': newIDCode, 'form': "TRGP"});
        }

    },

    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.TRGPdata = req.body;
        req.session.data = null;

        var user = await User.update(req.session.userId).set({
            TRGPdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/pages/competition/form/TRGPForm' });    // for ajax request
        } else {
            return res.redirect('/pages/competition/form/TRGPForm');           // for normal request
        }
    },

    //**************************admin/HandleApply*************************
    //update form
    update: async function (req, res) {
        if (req.method == "GET") {
            var model = await TRGP.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGPEdit', { TRGP: model });

        } else {
            if (!req.body.TRGP)
                return res.badRequest("Form-data not received.");

            var models = await TRGP.update(req.params.id).set({
                compYear: req.body.TRGP.compYear,
                teamName: req.body.TRGP.teamName,
                Phone: req.body.TRGP.Phone,
                Email: req.body.TRGP.Email,
                CoachName: req.body.TRGP.CoachName,
                CoachPhone: req.body.TRGP.CoachPhone,
                category: req.body.TRGP.category,
                havecname1: req.body.TRGP.havecname1,
                Mate1ChiName: req.body.TRGP.Mate1ChiName,
                Mate1EngName: req.body.TRGP.Mate1EngName,
                Mate1IDNo: req.body.TRGP.Mate1IDNo,
                Mate1Date: req.body.TRGP.Mate1Date,
                havecname2: req.body.TRGP.havecname2,
                Mate2ChiName: req.body.TRGP.Mate2ChiName,
                Mate2EngName: req.body.TRGP.Mate2EngName,
                Mate2IDNo: req.body.TRGP.Mate2IDNo,
                Mate2Date: req.body.TRGP.Mate2Date,
                havecname3: req.body.TRGP.havecname3,
                Mate3ChiName: req.body.TRGP.Mate3ChiName,
                Mate3EngName: req.body.TRGP.Mate3EngName,
                Mate3IDNo: req.body.TRGP.Mate3IDNo,
                Mate3Date: req.body.TRGP.Mate3Date,
                havecname4: req.body.TRGP.havecname4,
                Mate4ChiName: req.body.TRGP.Mate4ChiName,
                Mate4EngName: req.body.TRGP.Mate4EngName,
                Mate4IDNo: req.body.TRGP.Mate4IDNo,
                Mate4Date: req.body.TRGP.Mate4Date,
                TeamNumber: req.body.TRGP.TeamNumber,
                TeamPrice: req.body.TRGP.TeamPrice,
                TeamTotalPrice: req.body.TRGP.TeamTotalPrice,
                leaderName: req.body.TRGP.leaderName,
                leaderPosition: req.body.TRGP.leaderPosition,
                Declaration: req.body.TRGP.Declaration,
                VBRC: req.body.TRGP.VBRC,
                payStatus: req.body.TRGP.payStatus,
                formStatus: req.body.TRGP.formStatus,
                teamStatus: req.body.TRGP.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/HKRGASearch');
        }
    },


    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

};

