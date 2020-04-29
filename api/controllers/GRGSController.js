/**
 * GRGSController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GRGS_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/GRGS'); }

        req.session.data = req.body.GRGS;

        return res.view('pages/competition/form/GRGS_Preview', { 'data': req.session.GRGSdata || {} });
    },


    //action - create
    GRGS_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to GRGS
            var modelNum = await GRGS.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "GRGS" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create GRGS
            await GRGS.create(req.session.data);

            //clear formdata in session and user
            req.session.data = null;
            req.session.GRGSdata = null;
            var user = await User.update(req.session.userId).set({
                GRGSdata: null
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode, 'form': "GRGS" });
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.GRGSdata = req.body;

        var user = await User.update(req.session.userId).set({
            GRGSdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/pages/competition/form/GRGS' });    // for ajax request
        } else {
            return res.redirect('/pages/competition/form/GRGS');           // for normal request
        }
    },

    //-------------------------------------Admin----------------------------------------//
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GRGS.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GRGSEditForm', { grgs: model });

        }
        else {

            if (!req.body.GRGS)
                return res.badRequest("Form-data not received.");

            var models = await GRGS.update(req.params.id).set({
                compYear: req.body.GRGS.compYear,
                teamName: req.body.GRGS.teamName,
                phone: req.body.GRGS.phone,
                email: req.body.GRGS.email,
                category: req.body.GRGS.category,
                havecname1: req.body.GRGS.havecname1,
                chiName1: req.body.GRGS.chiName1,
                engName1: req.body.GRGS.engName1,
                ID1: req.body.GRGS.ID1,
                birth1: req.body.GRGS.birth1,
                imgIDCard0: req.body.GRGS.imgIDCard0,
                havecname2: req.body.GRGS.havecname2,
                chiName2: req.body.GRGS.chiName2,
                engName2: req.body.GRGS.engName2,
                ID2: req.body.GRGS.ID2,
                birth2: req.body.GRGS.birth2,
                imgIDCard1: req.body.GRGS.imgIDCard1,
                havecname3: req.body.GRGS.havecname3,
                chiName3: req.body.GRGS.chiName3,
                engName3: req.body.GRGS.engName3,
                ID3: req.body.GRGS.ID3,
                birth3: req.body.GRGS.birth3,
                imgIDCard2: req.body.GRGS.imgIDCard2,
                havecname4: req.body.GRGS.havecname4,
                chiName4: req.body.GRGS.chiName4,
                engName4: req.body.GRGS.engName4,
                ID4: req.body.GRGS.ID4,
                birth4: req.body.GRGS.birth4,
                imgIDCard3: req.body.GRGS.imgIDCard3,
                havecname5: req.body.GRGS.havecname5,
                chiName5: req.body.GRGS.chiName5,
                engName5: req.body.GRGS.engName5,
                ID5: req.body.GRGS.ID5,
                birth5: req.body.GRGS.birth5,
                imgIDCard4: req.body.GRGS.imgIDCard4,
                havecname6: req.body.GRGS.havecname6,
                chiName6: req.body.GRGS.chiName6,
                engName6: req.body.GRGS.engName6,
                ID6: req.body.GRGS.ID6,
                birth6: req.body.GRGS.birth6,
                imgIDCard5: req.body.GRGS.imgIDCard5,
                coachName: req.body.GRGS.coachName,
                coachPhone: req.body.GRGS.coachPhone,
                leaderName: req.body.GRGS.leaderName,
                leaderPosition: req.body.GRGS.leaderPosition,
                NoOfTeam: req.body.GRGS.NoOfTeam,
                teamFee: req.body.GRGS.teamFee,
                NoOfPeople: req.body.GRGS.NoOfPeople,
                insurance: req.body.GRGS.insurance,
                total: req.body.GRGS.total,
                declaration: req.body.GRGS.declaration,
                payStatus: req.body.GRGS.payStatus,
                formStatus: req.body.GRGS.formStatus,
                teamStatus: req.body.GRGS.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/HKRGASearch');
        }
    },

    // action - reject form
    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ formStatus: "rejected" }).fetch();

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

        var models = await GRGS.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }
    },

    // action - data deficiency
    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

    //action - waitingTeam
    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGS.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

};

