import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://rojgaar-suchna.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        jobPost: {
          read: true,
        },
        jobPosting: {
          read: true,
        },
      },
      actions: {
        fetchJobs: true,
      },
    },
  },
};
