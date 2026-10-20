import sendEmail from "./emailService.js";

const sendEmailFun = async (to, subject, text, html) => {
  const result = await sendEmail(to, subject, text, html);
  return result.success ? true : false;
};

export default sendEmailFun;
