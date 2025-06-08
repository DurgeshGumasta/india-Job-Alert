import React, { useEffect } from "react";
// import { Job } from "../_anon._Job";
import { Input } from "./ui/input";
export default function JobDetails({ jobPostings }:any ) {
 useEffect(() => {
  if (jobPostings) {
      console.log(jobPostings.title, "job title ----");
    }
},[jobPostings])
  
  if (!jobPostings || !jobPostings.title) {
    return <div>Loading job details...</div>; // Or a skeleton loader
  }
    return (
      <div className="container mx-auto p-4">
        <div className="grid gap-4">
            <div key={jobPostings.id} className="border p-4 rounded">
              <h2 className="font-semibold">{jobPostings.title}</h2>
              <p>{jobPostings.organization} • {jobPostings.location}</p>
              <p className="text-sm">Posted: {new Date(jobPostings.datePosted).toLocaleDateString()}</p>
            </div>
        </div>
        <Input type="text" />
      </div>
    )
}