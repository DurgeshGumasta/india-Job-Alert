export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const https = require('https');
  
  const options = {
    method: 'GET',
    hostname: 'linkedin-jobs-api2.p.rapidapi.com',
    port: null,
    path: '/active-jb-7d?location_filter=%22India%22',
    headers: {
      'x-rapidapi-key': 'fc029c3fdcmshec8a31348b3fb42p1c1b00jsn05468d55c462',
      'x-rapidapi-host': 'linkedin-jobs-api2.p.rapidapi.com'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      const chunks = [];

      res.on('data', function (chunk) {
        chunks.push(chunk);
      });

      res.on('end', async function () {
        try {
          const body = Buffer.concat(chunks);
          const data = JSON.parse(body.toString());
          
          console.log("Fetched jobs data:", data);
          logger.info("apidata=---",JSON.stringify(data))
          // Save the fetched jobs
          const savedJobs = await saveFetchedJobs(data, api, logger);
          
          resolve({
            success: true,
            jobsProcessed: savedJobs.length,
            jobs: savedJobs
          });
        } catch (error) {
          logger.error("Error processing jobs data:", error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      logger.error("Request error:", error);
      reject(error);
    });

    req.end();
  });

  async function saveFetchedJobs(jobsData, api, logger) {
    // Assuming the API returns an array of jobs
    const jobs = Array.isArray(jobsData) ? jobsData : (jobsData.jobs || []);
    const savedJobs = [];

    for (const jobData of jobs) {
      try {
        // Map API response fields to your jobPosting model fields
        const mappedJobData = {
          // Basic job info
          title: jobData.title,
          organization: jobData.organization,
          organizationUrl: jobData.organization_url,
          organizationLogo: jobData.organization_logo,
          url: jobData.url,
          source: jobData.source,
          employmentType: Array.isArray(jobData.employment_type) 
            ? jobData.employment_type.join(', ') 
            : jobData.employment_type,
          
          // Dates - convert to proper DateTime format
          datePosted: jobData.date_posted ? new Date(jobData.date_posted) : null,
          dateCreated: jobData.date_created ? new Date(jobData.date_created) : null,
          dateValidThrough: jobData.date_validthrough ? new Date(jobData.date_validthrough) : null,
          
          // Location data
          location: jobData.locations_derived && jobData.locations_derived.length > 0 
            ? jobData.locations_derived[0] 
            : null,
          locationType: jobData.location_type,
          remote: Boolean(jobData.remote_derived),
          latitude: jobData.lats_derived && jobData.lats_derived.length > 0 
            ? jobData.lats_derived[0] 
            : null,
          longitude: jobData.lngs_derived && jobData.lngs_derived.length > 0 
            ? jobData.lngs_derived[0] 
            : null,
            
          // LinkedIn organization data
          linkedinOrgUrl: jobData.linkedin_org_url,
          linkedinOrgSize: jobData.linkedin_org_size,
          linkedinOrgSlogan: jobData.linkedin_org_slogan,
          linkedinOrgIndustry: jobData.linkedin_org_industry,
          linkedinOrgHeadquarters: jobData.linkedin_org_headquarters,
          linkedinOrgFoundedDate: jobData.linkedin_org_foundeddate,
          linkedinOrgDescription: jobData.linkedin_org_description,
          
          // Seniority can be derived from title or set as needed
          seniority: extractSeniorityFromTitle(jobData.title)
        };

        // Create the job posting record
        const jobRecord = await api.jobPosting.create(mappedJobData);
        savedJobs.push(jobRecord);
        
        logger.info(`Saved job: ${jobData.title} at ${jobData.organization}`);
        
      } catch (error) {
        logger.error(`Error saving job ${jobData.title}:`, error);
        // Continue processing other jobs even if one fails
      }
    }

    return savedJobs;
  }

  // Helper function to extract seniority from job title
  function extractSeniorityFromTitle(title) {
    if (!title) return null;
    
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('senior') || titleLower.includes('sr.')) {
      return 'Senior';
    } else if (titleLower.includes('junior') || titleLower.includes('jr.')) {
      return 'Junior';
    } else if (titleLower.includes('lead') || titleLower.includes('principal')) {
      return 'Lead';
    } else if (titleLower.includes('intern')) {
      return 'Intern';
    } else {
      return 'Mid-level';
    }
  }
};