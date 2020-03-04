/**
 * TSRGCompetitionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    //action - view
    annex1: async function (req, res) {
        if (req.method == 'GET') { return res.view('pages/competition/form/annex1'); }
    },

    //action - create
    Team_School_HKRGAgeGroupCompetitionform: async function (req, res) {
        if (req.method == 'GET')
            return res.view('pages/competition/form/Team_School_HKRGAgeGroupCompetitionform');

        if (!req.body.TSRGCompetition)
            return res.badRequest("Form-data not received.");

        await TSRGCompetition.create(req.body.TSRGCompetition);

        //return res.redirect('/'); //Change location to preview page
        return res.ok("ok");


        // if (req.method == 'GET')
        //     return res.view('pages/competition/form/Team_School_HKRGAgeGroupCompetitionform');


        // req.session.data = req.body.TSRGCompetition;


        // return res.view('pages/competition/form/Team_School_HKRGAgeGroupCompetitionFormPreview', { 'data': req.session.data || {} });
    },

    Team_School_HKRGAgeGroupCompetitionFormPreview: async function (req, res) {
        if (req.method == 'POST') {
            await TSRGCompetition.create(req.session.data);

            req.session.data = {};  //clear data of session
        }

    },

};

