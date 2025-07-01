import { useEffect } from "react"; // Import useEffect
import { useLocation } from "react-router-dom";
import { ESEWA_FRAUD_TEST_URL, ESEWA_TEST_PID, ESEWA_SCD } from "../Components/config/config";

export default function Success() {
  const search = useLocation().search;

  // Extracting query parameters from the URL
  const oid = new URLSearchParams(search).get("oid");
  const amt = new URLSearchParams(search).get("amt");
  const ref = new URLSearchParams(search).get("refId");

  // Logging extracted parameters for debugging
  console.log("in success page", search, "oid", oid, "amt", amt, "ref", ref);

  useEffect(() => {
    // Parameters required by eSewa fraud verification
    const params = {
      amt: amt || 100, // Use amount from URL or default to 100
      rid: ref,
      pid: ESEWA_TEST_PID,
      scd: ESEWA_SCD,
    };

    // Function to create and submit the form
    const post = () => {
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", ESEWA_FRAUD_TEST_URL);

      // Dynamically create hidden input fields for the form
      for (let key in params) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }

      // Append the form to the body and submit it
      document.body.appendChild(form);
      form.submit();
    };

    post(); // Call the post function inside useEffect
  }, [amt, ref]); // Ensure useEffect runs when amt or ref changes

  return (
    <div>
      <h2>Processing eSewa Payment...</h2>
    </div>
  );
}