/**
 * TSRGCompetition.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //Team_School_HKRGAgeGroupCompetitionform attributes
    TSSchoolChiName: {
      type: 'string',
    },

    TSPhone: {
      type: 'string',
    },

    TSEmail: {
      type: 'string',
    },

    TSCoachName: {
      type: 'string',
    },

    TSCoachPhone: {
      type: 'string',
    },

    TSCategory: { 
      type:'string', //true, false
    },

    TSMate1ChiName: {
      type: 'string',
    },

    TSMate1EngName: {
      type: 'string',
    },

    TSMate1IDNo: {
      type: 'string',
    },

    TSMate1Date: {
      type: 'ref',
      columnType: 'date'
    },

    TSMate2ChiName: {
      type: 'string',
    },

    TSMate2EngName: {
      type: 'string',
    },

    TSMate2IDNo: {
      type: 'string',
    },

    TSMate2Date: {
      type: 'ref',
      columnType: 'date'
    },

    TSMate3ChiName: {
      type: 'string',
    },

    TSMate3EngName: {
      type: 'string',
    },

    TSMate3IDNo: {
      type: 'string',
    },

    TSMate3Date: {
      type: 'ref',
      columnType: 'date'
    },

    TSMate4ChiName: {
      type: 'string',
    },

    TSMate4EngName: {
      type: 'string',
    },

    TSMate4IDNo: {
      type: 'string',
    },

    TSMate4Date: {
      type: 'ref',
      columnType: 'date'
    },

    TSTeamNumber: {
      type: 'number',
    },

    TSTeamPrice: {
      type: 'number',
    },

    TSTeamTotalPrice: {
      type: 'number',
    },

    TSDeclaration: {
      type: 'string',
    },

    TSBox: {
      type: 'string',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

