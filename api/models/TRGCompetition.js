/**
 * TRGCompetition.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //Team_HKRGAgeGroupCompetitionform attributes
    OrgChiName: {
      type: 'string',
    },

    Phone: {
      type: 'string',
    },

    Email: {
      type: 'string',
    },

    CoachName: {
      type: 'string',
    },

    CoachPhone: {
      type: 'string',
    },

    Category: { 
      type:'string', //true, false
    },

    Mate1ChiName: {
      type: 'string',
    },

    Mate1EngName: {
      type: 'string',
    },

    Mate1IDNo: {
      type: 'string',
    },

    Mate1Date: {
      type: 'ref',
      columnType: 'date'
    },

    Mate2ChiName: {
      type: 'string',
    },

    Mate2EngName: {
      type: 'string',
    },

    Mate2IDNo: {
      type: 'string',
    },

    Mate2Date: {
      type: 'ref',
      columnType: 'date'
    },

    Mate3ChiName: {
      type: 'string',
    },

    Mate3EngName: {
      type: 'string',
    },

    Mate3IDNo: {
      type: 'string',
    },

    Mate3Date: {
      type: 'ref',
      columnType: 'date'
    },

    Mate4ChiName: {
      type: 'string',
    },

    Mate4EngName: {
      type: 'string',
    },

    Mate4IDNo: {
      type: 'string',
    },

    Mate4Date: {
      type: 'ref',
      columnType: 'date'
    },

    TeamNumber: {
      type: 'number',
    },

    TeamPrice: {
      type: 'number',
    },

    TeamTotalPrice: {
      type: 'number',
    },

    VBRC: {
      type: 'string',
    },

    Declaration: {
      type: 'string',
    },

    Box: {
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

