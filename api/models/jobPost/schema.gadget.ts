import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "jobPost" model, go to https://rojgaar-suchna.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "cYCLjuzunxp-",
  comment:
    "This model represents a job posting for Indian government/public sector jobs, storing relevant details such as post name, application dates, fees, and eligibility criteria.",
  fields: {
    admitCardReleaseDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "qAiverBlXwaz",
    },
    advertisementNumber: {
      type: "string",
      storageKey: "FKqTKFtUwzxr",
    },
    ageRelaxationDetails: {
      type: "string",
      storageKey: "0_hkiIx9P21M",
    },
    applicationEndDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "4VGWz5VTZxC0",
    },
    applicationStartDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Hw_-NGT2EEQY",
    },
    documentVerificationDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "gbn318iM102x",
    },
    documentsRequired: { type: "string", storageKey: "PDRxxolf4oBP" },
    educationalQualification: {
      type: "string",
      storageKey: "xQpDqywZg47c",
    },
    eligibilityDetails: {
      type: "string",
      storageKey: "fXVu--3r_PcY",
    },
    examDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Mau-pyIpKfey",
    },
    examPattern: { type: "string", storageKey: "JdWEu8yH6QdP" },
    experienceRequired: {
      type: "string",
      storageKey: "jz76awQipRFF",
    },
    feeEws: {
      type: "number",
      decimals: 2,
      storageKey: "vtaP0mUPwGHf",
    },
    feeGeneral: {
      type: "number",
      decimals: 2,
      storageKey: "5wg2GN7pA-J-",
    },
    feeObc: {
      type: "number",
      decimals: 2,
      storageKey: "arVPBCP60IFR",
    },
    feePaymentLastDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "oUzvKrMz5-2a",
    },
    feePaymentMode: { type: "string", storageKey: "fHnat1nn8LK9" },
    feePh: {
      type: "number",
      decimals: 2,
      storageKey: "kqJkEpSaXnV5",
    },
    feeSc: {
      type: "number",
      decimals: 2,
      storageKey: "0F4X-XL8lvoh",
    },
    feeSt: {
      type: "number",
      decimals: 2,
      storageKey: "__Jg9sNNki7k",
    },
    howToApply: { type: "string", storageKey: "5n7ZrDCAMW9R" },
    interviewDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "SxBYqRDKomsT",
    },
    jobBoard: { type: "string", storageKey: "NSxUi99vGixI" },
    jobLocation: { type: "string", storageKey: "6S6H5lGcW6Dw" },
    jobType: { type: "string", storageKey: "A_iPtwPeYYfL" },
    lastUpdate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "wO0ub1HBFZ8G",
    },
    maxAgeFemale: {
      type: "number",
      decimals: 0,
      storageKey: "aI6Lbgg4SVcQ",
    },
    maxAgeMale: {
      type: "number",
      decimals: 0,
      storageKey: "LHQxpDjIeD6y",
    },
    minAge: {
      type: "number",
      decimals: 0,
      storageKey: "U3YAdWaPm0Y6",
    },
    nameOfPost: {
      type: "string",
      validations: { required: true },
      storageKey: "s9-gbuMe4D0O",
    },
    officialWebsite: { type: "url", storageKey: "MuRSB9b8MY02" },
    otherEligibility: { type: "string", storageKey: "nwE__PVLookn" },
    payLevel: { type: "string", storageKey: "HWI_xc6aT9uH" },
    payScale: { type: "string", storageKey: "ccQqxFijwrYS" },
    photoSpecification: {
      type: "string",
      storageKey: "6PKnSE7OOSgo",
    },
    postCode: { type: "string", storageKey: "dBoFtK6WIin0" },
    postDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "t2Pb0s-P9IFt",
    },
    postName: { type: "string", storageKey: "z8RBzW4wUjKz" },
    previewInstructions: {
      type: "string",
      storageKey: "cB8UIxIPYftb",
    },
    registrationRequired: {
      type: "string",
      storageKey: "ojg3eyhmyo4v",
    },
    resultDate: {
      type: "dateTime",
      includeTime: true,
      storageKey: "Re5OUmfvCJJt",
    },
    scanDocumentRequirement: {
      type: "string",
      storageKey: "l6KLTqQyoKqk",
    },
    selectionStages: { type: "string", storageKey: "TkkOUQLA0xtw" },
    serviceBondDetails: {
      type: "string",
      storageKey: "iJ1N337Ftc7B",
    },
    shortInformation: { type: "string", storageKey: "uQjHQFHbMEyc" },
    signatureSpecification: {
      type: "string",
      storageKey: "GvtwLuhFw2SQ",
    },
    totalVacancy: {
      type: "number",
      decimals: 0,
      storageKey: "_muIHsLlbs8A",
    },
    vacancyBc: {
      type: "number",
      decimals: 0,
      storageKey: "Rx_eMtzQ6dun",
    },
    vacancyEws: {
      type: "number",
      decimals: 0,
      storageKey: "a3cvSSaNa7O3",
    },
    vacancyFemale: {
      type: "number",
      decimals: 0,
      storageKey: "_WntAo2aCZRk",
    },
    vacancyObc: {
      type: "number",
      decimals: 0,
      storageKey: "RIIU7UNO9KUf",
    },
    vacancyPwd: {
      type: "number",
      decimals: 0,
      storageKey: "0dtyOKu8419_",
    },
    vacancySc: {
      type: "number",
      decimals: 0,
      storageKey: "2Ru4zHCc7mkj",
    },
    vacancySt: {
      type: "number",
      decimals: 0,
      storageKey: "xdK-8aZvHSYd",
    },
    vacancyTotal: {
      type: "number",
      decimals: 0,
      storageKey: "sOPJWKpaW6ET",
    },
    vacancyUr: {
      type: "number",
      decimals: 0,
      storageKey: "50yKR6i97MsY",
    },
  },
};
