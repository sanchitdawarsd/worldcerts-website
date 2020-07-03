import "isomorphic-fetch";
import { WrappedDocument } from "@worldcerts/worldcerts-attestation";
import { EMAIL_API_URL } from "../../config";

export default function sendEmail({
  certificate,
  email,
  captcha,
}: {
  certificate: WrappedDocument;
  email: string;
  captcha: string;
}): Promise<boolean> {
  return window
    .fetch(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: certificate,
        to: email,
        captcha,
      }),
    })
    .then((res) => res.status === 200);
}
