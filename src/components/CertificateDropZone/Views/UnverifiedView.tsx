import { VerificationFragment } from "@govtechsg/oa-verify";
import { isValid } from "@govtechsg/opencerts-verify";
import Link from "next/link";
import React from "react";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import { addressInvalid, getAllButRevokeFragment, getRevokeFragment } from "../../../services/fragment";
import css from "./viewerStyles.module.scss";
interface DetailedErrorsProps {
  verificationStatus: VerificationFragment[];
}
const DetailedErrors: React.FunctionComponent<DetailedErrorsProps> = ({ verificationStatus }) => {
  const errors = [];
  const fragmentsWithoutRevoke = getAllButRevokeFragment(verificationStatus);
  const revokeFragment = [getRevokeFragment(verificationStatus)];
  if (!isValid(verificationStatus, ["DOCUMENT_INTEGRITY"])) {
    errors.push(TYPES.HASH);
  }
  if (!isValid(fragmentsWithoutRevoke, ["DOCUMENT_STATUS"])) {
    errors.push(TYPES.ISSUED);
  }
  if (!isValid(revokeFragment, ["DOCUMENT_STATUS"])) {
    errors.push(TYPES.REVOKED);
  }
  if (!isValid(verificationStatus, ["ISSUER_IDENTITY"])) {
    errors.push(TYPES.IDENTITY);
  }
  // if the error is because the address is invalid, then get rid of all errors and only keep this one
  if (!isValid(verificationStatus, ["DOCUMENT_STATUS"]) && addressInvalid(verificationStatus)) {
    errors.splice(0, errors.length);
    errors.push(TYPES.ADDRESS_INVALID);
  }
  const renderedError = errors.map((errorType, index) => (
    <div key={index}>
      <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
      <p>{MESSAGES[errorType].failureMessage}</p>
    </div>
  ));
  return (
    <div id="error-tab" className={css.verifications}>
      {renderedError}
    </div>
  );
};

interface UnverifiedViewProps {
  resetData: () => void;
  verificationStatus: VerificationFragment[];
}
export const UnverifiedView: React.FunctionComponent<UnverifiedViewProps> = ({ resetData, verificationStatus }) => (
  <div
    className={`${css["viewer-container"]} ${css.invalid}`}
    style={{
      backgroundColor: "#fbeae9",
      borderRadius: 10,
    }}
  >
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        {"This certificate is not valid"}
      </span>
    </span>

    {<DetailedErrors verificationStatus={verificationStatus} />}

    <Link href="/faq">
      <div className={css["unverified-btn"]}>What should I do?</div>
    </Link>

    <div className={css["secondary-links"]}>
      <span>
        <Link href=" ">
          <a
            onClick={(e) => {
              e.preventDefault();
              resetData();
            }}
            className={css["text-link"]}
          >
            Try another
          </a>
        </Link>
      </span>
    </div>
  </div>
);
