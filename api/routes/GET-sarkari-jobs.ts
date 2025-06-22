import { RouteHandler } from "gadget-server";

const route: RouteHandler = async ({ request, reply, api, logger }) => {
  try {
    // Parse query parameters
    const query = request.query as any;
    const {
      search = "",
      location = "",
      jobType = "",
      educationalQualification = "",
      payScale = "",
      organizationName = "",
      applicationStartDate = "",
      applicationEndDate = "",
      examDate = "",
      minAge = "",
      maxAge = "",
      page = "1",
      limit = "20",
      sortBy = "createdAt",
      sortOrder = "Descending"
    } = query;

    // Parse pagination parameters
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.min(250, Math.max(1, parseInt(limit) || 20)); // Gadget limit is 250
    const offset = (pageNum - 1) * pageSize;

    // Build dynamic filter object
    const filters: any[] = [];

    // Add search filter if provided
    if (search && search.trim()) {
      // Search will be handled by the search parameter, not filter
    }

    // Add location filter
    if (location && location.trim()) {
      filters.push({
        jobLocation: { contains: location.trim() }
      });
    }

    // Add job type filter
    if (jobType && jobType.trim()) {
      filters.push({
        jobType: { contains: jobType.trim() }
      });
    }

    // Add educational qualification filter
    if (educationalQualification && educationalQualification.trim()) {
      filters.push({
        educationalQualification: { contains: educationalQualification.trim() }
      });
    }

    // Add pay scale filter
    if (payScale && payScale.trim()) {
      filters.push({
        payScale: { contains: payScale.trim() }
      });
    }

    // Add organization name filter (using jobBoard field)
    if (organizationName && organizationName.trim()) {
      filters.push({
        jobBoard: { contains: organizationName.trim() }
      });
    }

    // Add application start date filter
    if (applicationStartDate) {
      try {
        const startDate = new Date(applicationStartDate);
        filters.push({
          applicationStartDate: { greaterThanOrEqual: startDate.toISOString() }
        });
      } catch (e) {
        // Invalid date, skip filter
      }
    }

    // Add application end date filter
    if (applicationEndDate) {
      try {
        const endDate = new Date(applicationEndDate);
        filters.push({
          applicationEndDate: { lessThanOrEqual: endDate.toISOString() }
        });
      } catch (e) {
        // Invalid date, skip filter
      }
    }

    // Add exam date filter
    if (examDate) {
      try {
        const examDateObj = new Date(examDate);
        filters.push({
          examDate: { greaterThanOrEqual: examDateObj.toISOString() }
        });
      } catch (e) {
        // Invalid date, skip filter
      }
    }

    // Add age filters
    if (minAge && !isNaN(parseInt(minAge))) {
      filters.push({
        minAge: { lessThanOrEqual: parseInt(minAge) }
      });
    }

    if (maxAge && !isNaN(parseInt(maxAge))) {
      filters.push({
        OR: [
          { maxAgeMale: { greaterThanOrEqual: parseInt(maxAge) } },
          { maxAgeFemale: { greaterThanOrEqual: parseInt(maxAge) } }
        ]
      });
    }

    // Combine filters
    const filter = filters.length > 0 ? { AND: filters } : undefined;

    // Build sort object
    const validSortFields = [
      'createdAt', 'updatedAt', 'nameOfPost', 'applicationStartDate', 
      'applicationEndDate', 'examDate', 'postDate', 'lastUpdate'
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sort = { [sortField]: sortOrder === 'Ascending' ? 'Ascending' : 'Descending' };

    // Comprehensive field selection for jobPost
    const select = {
      id: true,
      nameOfPost: true,
      jobLocation: true,
      jobType: true,
      educationalQualification: true,
      payScale: true,
      payLevel: true,
      applicationStartDate: true,
      applicationEndDate: true,
      examDate: true,
      interviewDate: true,
      resultDate: true,
      totalVacancy: true,
      vacancyTotal: true,
      vacancyGeneral: true,
      vacancyObc: true,
      vacancySc: true,
      vacancySt: true,
      vacancyEws: true,
      vacancyPwd: true,
      vacancyFemale: true,
      vacancyMale: true,
      vacancyUr: true,
      vacancyBc: true,
      minAge: true,
      maxAgeMale: true,
      maxAgeFemale: true,
      feeGeneral: true,
      feeObc: true,
      feeSc: true,
      feeSt: true,
      feeEws: true,
      feePh: true,
      feePaymentMode: true,
      feePaymentLastDate: true,
      eligibilityDetails: true,
      experienceRequired: true,
      howToApply: true,
      officialWebsite: true,
      advertisementNumber: true,
      postCode: true,
      postName: true,
      jobBoard: true,
      documentsRequired: true,
      selectionStages: true,
      examPattern: true,
      shortInformation: true,
      ageRelaxationDetails: true,
      otherEligibility: true,
      serviceBondDetails: true,
      admitCardReleaseDate: true,
      documentVerificationDate: true,
      photoSpecification: true,
      signatureSpecification: true,
      scanDocumentRequirement: true,
      previewInstructions: true,
      registrationRequired: true,
      postDate: true,
      lastUpdate: true,
      createdAt: true,
      updatedAt: true
    };

    // Build API query options
    const queryOptions: any = {
      first: pageSize,
      select,
      sort
    };

    if (filter) {
      queryOptions.filter = filter;
    }

    if (search && search.trim()) {
      queryOptions.search = search.trim();
    }

    // Fetch jobPost records
    const jobPosts = await api.jobPost.findMany(queryOptions);

    // Get total count for pagination (approximate, since we can't get exact count efficiently)
    // We'll use the current page info to estimate
    const hasNextPage = jobPosts.hasNextPage;
    const hasPreviousPage = pageNum > 1;

    // Calculate pagination metadata
    const totalPages = hasNextPage ? pageNum + 1 : pageNum; // Rough estimate
    const startIndex = offset + 1;
    const endIndex = offset + jobPosts.length;

    // Build applied filters object for response
    const appliedFilters: any = {};
    if (search) appliedFilters.search = search;
    if (location) appliedFilters.location = location;
    if (jobType) appliedFilters.jobType = jobType;
    if (educationalQualification) appliedFilters.educationalQualification = educationalQualification;
    if (payScale) appliedFilters.payScale = payScale;
    if (organizationName) appliedFilters.organizationName = organizationName;
    if (applicationStartDate) appliedFilters.applicationStartDate = applicationStartDate;
    if (applicationEndDate) appliedFilters.applicationEndDate = applicationEndDate;
    if (examDate) appliedFilters.examDate = examDate;
    if (minAge) appliedFilters.minAge = minAge;
    if (maxAge) appliedFilters.maxAge = maxAge;

    // Format response
    const response = {
      success: true,
      data: jobPosts,
      pagination: {
        currentPage: pageNum,
        pageSize: pageSize,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
        startIndex: startIndex,
        endIndex: endIndex,
        count: jobPosts.length
      },
      filters: appliedFilters,
      sort: {
        field: sortField,
        order: sortOrder
      }
    };

    await reply.type("application/json").send(response);

  } catch (error) {
    logger.error("Error fetching sarkari jobs:", error);
    
    await reply.status(500).type("application/json").send({
      success: false,
      error: "Failed to fetch sarkari jobs",
      message: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
};

export default route;