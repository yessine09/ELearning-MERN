
import sgMail from "@sendgrid/mail";
import { config } from "../config";

sgMail.setApiKey(config.sendGridApiKey ?? '')

export default function sendEmail(payload: { to: any; from: any; subject: any; text: any; html: any; }) {

    const msg = {
        to: payload.to, // Change to your recipient
        from: payload.from, // Change to your verified sender
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
} 
