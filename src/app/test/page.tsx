/* eslint-disable @typescript-eslint/ban-ts-comment */
import Script from "next/script";

const Page = () => {
  return (
    <>
      <main>test page with widget</main>
      {/* @ts-ignore */}
      <feedback-widget projectId="123"></feedback-widget>
      <Script src="https://client-care-stage-widget.vercel.app/widget.umd.js" />
    </>
  );
};

export default Page;
