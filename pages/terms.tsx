import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import FooterBar from "../src/components/Layout/FooterBar";
import NavigationBar from "../src/components/Layout/NavigationBar";
import TermsOfUse from "../src/components/TermsOfUse";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Terms of use",
  description:
    'These Terms of Use govern your access to and use of our services, including the application (whether as software or as a website or otherwise), its contents, push notifications and all other accompanying materials as identified in the Schedule below (collectively, the "Service").',
  openGraph: {
    title: "OpenCerts - Terms of use",
    description:
      'These Terms of Use govern your access to and use of our services, including the application (whether as software or as a website or otherwise), its contents, push notifications and all other accompanying materials as identified in the Schedule below (collectively, the "Service").',
    url: `${URL}/tou`,
  },
};

const PrivacyPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <NavigationBar active="tou" />
    <TermsOfUse />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
