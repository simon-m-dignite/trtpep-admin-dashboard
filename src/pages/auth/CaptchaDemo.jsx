import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const CaptchaDemo = () => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form className="w-full lg:w-[55%] xl:w-[35%] mx-auto p-8 rounded-lg shadow-xl">
        <h1 className="text-xl font-semibold mb-8">Rechapta Demo</h1>
        <div className="w-full flex flex-col items-start gap-1 mb-6">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            className="w-full outline-none border rounded-md p-4 text-sm"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1 mb-6">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="text"
            className="w-full outline-none border rounded-md p-4 text-sm"
          />
        </div>

        <div className="w-full mb-6">
          <ReCAPTCHA sitekey="Your client site key" onChange={onChange} />
        </div>
        <div className="w-full mb-6">
          <button
            type="submit"
            className="w-full text-center bg-blue-600 text-white py-3 rounded-md text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaptchaDemo;
