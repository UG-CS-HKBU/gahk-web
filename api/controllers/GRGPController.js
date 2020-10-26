/**
 * GRGPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GRGP_form: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/GRGP'); }

        req.session.data = req.body.GRGP;

        return res.view('pages/competition/form/GRGP_Preview', { 'data': req.session.data || {} });
    },

    //action - create
    GRGP_form_preview: async function (req, res) {

        if (req.method == 'POST') {

            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            var condition = {};
            condition.compYear = req.session.data.compYear;

            //Set idCode to GRGP
            var modelNum = await GRGP.count({
                where: condition
            })
            var newID = modelNum + 1;
            var newIDCode = "GRGP" + req.session.data.compYear + "-" + newID;
            req.session.data.idCode = newIDCode;

            //create GRGP
            await GRGP.create(req.session.data);

            //clear formdata in session and user
            req.session.data = null;
            req.session.GRGPdata = null;
            var user = await User.update(req.session.userId).set({
                GRGPdata: null
            }).fetch();
            if (user.length == 0) return res.notFound();
            //

            return res.view('pages/competition/form/confirm_form', { 'formIDCode': newIDCode, 'form': "GRGP"});
        }
    },

    //action - save
    save: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        req.session.GRGPdata = req.body;

        var user = await User.update(req.session.userId).set({
            GRGPdata: req.body
        }).fetch();

        if (user.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "儲存成功 Sucessfully save.", url: '/pages/competition/form/GRGP' });    // for ajax request
        } else {
            return res.redirect('/pages/competition/form/GRGP');           // for normal request
        }
    },

    //-------------------------------------Admin----------------------------------------//
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {
            var model = await GRGP.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/GRGPEditForm', { grgp: model });

        }
        else {

            if (!req.body.GRGP)
                return res.badRequest("Form-data not received.");

            var models = await GRGP.update(req.params.id).set({
                compYear: req.body.GRGP.compYear,
                teamName: req.body.GRGP.teamName,
                phone: req.body.GRGP.phone,
                email: req.body.GRGP.email,
                category: req.body.GRGP.category,
                havecname1: req.body.GRGP.havecname1,
                chiName1: req.body.GRGP.chiName1,
                engName1: req.body.GRGP.engName1,
                ID1: req.body.GRGP.ID1,
                birth1: req.body.GRGP.birth1,
                imgIDCard0: req.body.GRGP.imgIDCard0,
                havecname2: req.body.GRGP.havecname2,
                chiName2: req.body.GRGP.chiName2,
                engName2: req.body.GRGP.engName2,
                ID2: req.body.GRGP.ID2,
                birth2: req.body.GRGP.birth2,
                imgIDCard1: req.body.GRGP.imgIDCard1,
                havecname3: req.body.GRGP.havecname3,
                chiName3: req.body.GRGP.chiName3,
                engName3: req.body.GRGP.engName3,
                ID3: req.body.GRGP.ID3,
                birth3: req.body.GRGP.birth3,
                imgIDCard2: req.body.GRGP.imgIDCard2,
                havecname4: req.body.GRGP.havecname4,
                chiName4: req.body.GRGP.chiName4,
                engName4: req.body.GRGP.engName4,
                ID4: req.body.GRGP.ID4,
                birth4: req.body.GRGP.birth4,
                imgIDCard3: req.body.GRGP.imgIDCard3,
                havecname5: req.body.GRGP.havecname5,
                chiName5: req.body.GRGP.chiName5,
                engName5: req.body.GRGP.engName5,
                ID5: req.body.GRGP.ID5,
                birth5: req.body.GRGP.birth5,
                imgIDCard4: req.body.GRGP.imgIDCard4,
                havecname6: req.body.GRGP.havecname6,
                chiName6: req.body.GRGP.chiName6,
                engName6: req.body.GRGP.engName6,
                ID6: req.body.GRGP.ID6,
                birth6: req.body.GRGP.birth6,
                imgIDCard5: req.body.GRGP.imgIDCard5,
                coachName: req.body.GRGP.coachName,
                coachPhone: req.body.GRGP.coachPhone,
                leaderName: req.body.GRGP.leaderName,
                leaderPosition: req.body.GRGP.leaderPosition,
                NoOfTeam: req.body.GRGP.NoOfTeam,
                teamFee: req.body.GRGP.teamFee,
                NoOfPeople: req.body.GRGP.NoOfPeople,
                insurance: req.body.GRGP.insurance,
                total: req.body.GRGP.total,
                declaration: req.body.GRGP.declaration,
                payStatus: req.body.GRGP.payStatus,
                formStatus: req.body.GRGP.formStatus,
                teamStatus: req.body.GRGP.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/HKRGASearch');
        }
    },

    // action - reject form
    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await GRGP.update(req.params.id).set({ formStatus: "rejected" }).fetch();

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

        var models = await GRGP.update(req.params.id).set({ formStatus: "accepted" }).fetch();

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

        var models = await GRGP.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

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

        var models = await GRGP.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/HKRGASearch' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/HKRGASearch');           // for normal request
        }

    },

};

