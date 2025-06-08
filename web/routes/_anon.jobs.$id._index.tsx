import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { api } from "../api";
import Layout from "@/components/layout/layout";
import JobDetails from "@/components/job-details";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import { useFindOne } from "@gadgetinc/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return params
};

export default function ({ params }: any) {
  const { id } = useLoaderData<typeof loader>();
  // Use the id to fetch the job posting with Gadget's hooks
  const [{ data: jobPostings, fetching, error }] = useFindOne(api.jobPosting, params.id, {
    select: {
      id: true,
      title: true,
      organization: true,
      organizationLogo: true,
      organizationUrl: true,
      datePosted: true,
      location: true
    }
  });

  console.log(jobPostings, "jobposting");
  if (fetching) return <div>Loading...</div>;

  return (
    <Layout>
      <JobDetails jobPostings={jobPostings} />
    </Layout>
  );
}