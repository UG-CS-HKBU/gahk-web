/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  AdminController: {
    '*': 'isAdmin'
  },
  UserController: {
    login: true,
    register: true,
    forgot: true,
    '*': 'isUser',
  },
  MembershipController: {
    '*': 'isUser',
  },
  AtheleteController: {
    '*': 'isUser',
  },
  CoachController: {
    '*': 'isUser',
  },
  ClubMemberController: {
    clubMemberForm: 'isUser',
    clubMemberFormPreview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirmAll: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    export_xlsx: 'isAdmin',
    import_xlsx: 'isAdmin',
  },

  AcroageController: {
    acroage: 'isUser',
    acroage_preview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirmAll: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
    export_xlsx: 'isAdmin',
    import_xlsx: 'isAdmin',
  },

  GFAController: {
    GFA_form: 'isUser',
    GFA_form_preview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirmAll: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
    export_xlsx: 'isAdmin',
    import_xlsx: 'isAdmin',
  },

  TrampolineController: {
    trampoline: 'isUser',
    trampolinePreviewForm: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirmAll: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
    export_xlsx: 'isAdmin',
    import_xlsx: 'isAdmin',
  },

  GRGPController: {
    GRGP_form: 'isUser',
    GRGP_form_preview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
  },

  GRGSController: {
    GRGS_form: 'isUser',
    GRGS_form_preview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
  },

  TRGPController: {
    TRGPForm: 'isUser',
    TRGPFormPreview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
  },

  TRGSController: {
    TRGSForm: 'isUser',
    TRGSFormPreview: 'isUser',
    save: 'isUser',
    update: 'isAdmin',
    reject: 'isAdmin',
    confirm: 'isAdmin',
    dataDef: 'isAdmin',
    waitingList: 'isAdmin',
  },

};
