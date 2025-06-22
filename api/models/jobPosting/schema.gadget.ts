import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "jobPosting" model, go to https://rojgaar-suchna.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "rQEeJNi8lgVT",
  comment:
    "Stores job listing data with relevant details for display and filtering",
  fields: {
    dateCreated: {
      type: "dateTime",
      includeTime: true,
      storageKey: "pGMeBuMAM0V1",
    },
    datePosted: {
      type: "dateTime",
      includeTime: true,
      storageKey: "5UdGObcVucer",
    },
    dateValidThrough: {
      type: "dateTime",
      includeTime: true,
      storageKey: "j8DoId-02h8d",
    },
    employmentType: { type: "string", storageKey: "IrtH_2_aXNIA" },
    latitude: {
      type: "number",
      decimals: 6,
      storageKey: "HGowQ3H-4p8S",
    },
    linkedinOrgDescription: {
      type: "string",
      storageKey: "QAYGl_-AvacD",
    },
    linkedinOrgFoundedDate: {
      type: "string",
      storageKey: "0dDEAJHTnWwj",
    },
    linkedinOrgHeadquarters: {
      type: "string",
      storageKey: "tSiKs2VcqTyK",
    },
    linkedinOrgIndustry: {
      type: "string",
      storageKey: "8IDc9iRjViwy",
    },
    linkedinOrgSize: { type: "string", storageKey: "QMmR_oJ-hWXy" },
    linkedinOrgSlogan: { type: "string", storageKey: "NnReZN5kdi_E" },
    linkedinOrgUrl: { type: "url", storageKey: "g_QydtJHIwPO" },
    location: { type: "string", storageKey: "rn2c9un8N04M" },
    locationType: { type: "string", storageKey: "Q0xc45JxQk8x" },
    longitude: {
      type: "number",
      decimals: 6,
      storageKey: "ChedQ1FLJK_2",
    },
    organization: { type: "string", storageKey: "5k05qTtF7mV5" },
    organizationLogo: { type: "url", storageKey: "vxatulViw04X" },
    organizationUrl: { type: "url", storageKey: "dFOpq7UjAq79" },
    remote: { type: "boolean", storageKey: "IwCwiwqWnHCF" },
    seniority: { type: "string", storageKey: "VEmKqx_Rf9Oh" },
    source: { type: "string", storageKey: "27fvlTUWQgdK" },
    title: { type: "string", storageKey: "Jz-gKykMnmVY" },
    url: { type: "url", storageKey: "nicE0OSkwfbo" },
  },
};
