import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import FaqContent from "../src/components/FAQ/FaqContent";
import FooterBar from "../src/components/Layout/FooterBar";
import NavigationBar from "../src/components/Layout/NavigationBar";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Frequently Asked Questions",
  description:
    "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
  openGraph: {
    title: "OpenCerts - Frequently Asked Questions",
    description:
      "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
    url: `${URL}/faq`,
  },
};

const FaqPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </>
);

export default connect()(FaqPage);
