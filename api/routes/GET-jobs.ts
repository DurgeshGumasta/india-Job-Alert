import { RouteHandler } from "gadget-server";

/**
 * Route handler for GET jobs
 *
 * See: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 */
const route: RouteHandler = async ({ request, reply, api, logger, connections }) => {
  try {
    // Parse query parameters for filtering and pagination
    const url = new URL(request.url, `http://${request.headers.host}`);
    const searchParams = url.searchParams;
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const employmentType = searchParams.get('employmentType');
    const organization = searchParams.get('organization');
    const remote = searchParams.get('remote');
    
    // Build filter object
    const filter: any = {};
    
    if (search) {
      filter.OR = [
        { title: { matches: search } },
        { organization: { matches: search } },
        { location: { matches: search } }
      ];
    }
    
    if (location) {
      filter.location = { matches: location };
    }
    
    if (employmentType) {
      filter.employmentType = { matches: employmentType };
    }
    
    if (organization) {
      filter.organization = { matches: organization };
    }
    
    if (remote !== null && remote !== undefined) {
      filter.remote = { equals: remote === 'true' };
    }

    // Calculate pagination
    const first = limit;
    const skip = (page - 1) * limit;

    // Fetch jobs from the database
    const jobs = await api.jobPosting.findMany({
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      first,
      after: skip > 0 ? Buffer.from(skip.toString()).toString('base64') : undefined,
      sort: {
        datePosted: "Descending" // Show newest jobs first
      },
      select: {
        id: true,
        title: true,
        organization: true,
        organizationLogo: true,
        organizationUrl: true,
        location: true,
        locationType: true,
        employmentType: true,
        remote: true,
        datePosted: true,
        dateValidThrough: true,
        url: true,
        source: true,
        seniority: true,
        latitude: true,
        longitude: true,
        linkedinOrgIndustry: true,
        linkedinOrgSize: true,
        linkedinOrgDescription: true,
        linkedinOrgHeadquarters: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Get total count for pagination info
    const totalJobs = await api.jobPosting.findMany({
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      select: { id: true }
    });

    const totalCount = totalJobs.length;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Send response
    await reply.type("application/json").send({
      success: true,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit
      },
      filters: {
        search,
        location,
        employmentType,
        organization,
        remote
      }
    });

  } catch (error) {
    logger.error("Error fetching jobs:", error);
    
    await reply.status(500).type("application/json").send({
      success: false,
      error: "Failed to fetch jobs",
      message: error.message
    });
  }
};

export default route;