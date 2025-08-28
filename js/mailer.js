function sendMail() {
    const email = "velusamypurushothaman@gmail.com";
    const subject = "Hello from Website";
    const body = "Hi, I am interested in your services.";

    // Create the mailto link
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default mail client
    window.location.href = mailtoLink;
}