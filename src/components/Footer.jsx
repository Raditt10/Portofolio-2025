import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    message: "", // Tambah state untuk pesan
    isSubmitting: false
  });
  const [statusMessage, setStatusMessage] = useState("");

  const EMAILJS_SERVICE_ID = "service_kkmzp89";
  const EMAILJS_TEMPLATE_ID = "template_gl1shr7"; 
  const EMAILJS_PUBLIC_KEY = "EG9qC9jkGx6_xS4cu"; // TAMBAH "pk_" di depan

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.message.trim()) {
      setStatusMessage("Please fill in all fields");
      return;
    }

    setFormData(prev => ({ ...prev, isSubmitting: true }));
    setStatusMessage("");

    try {
      const templateParams = {
        to_email: "iniakuraditt@gmail.com",
        from_email: formData.email,
        user_message: formData.message, // Kirim pesan user
        subject: `Collaboration Request from ${formData.email}`,
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result);

      setStatusMessage("✅ Message sent successfully! I'll get back to you soon.");
      setFormData({
        email: "",
        message: "",
        isSubmitting: false
      });
      
      setTimeout(() => {
        setStatusMessage("");
      }, 5000);

    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage("❌ Failed to send message. Please try again.");
      setFormData(prev => ({ ...prev, isSubmitting: false }));
    }
  };
  
  // COMMENT SEMUA GSAP CODE UNTUK TESTING
  useEffect(() => {
    /*
    const footer = footerRef.current;
    const line = lineRef.current;
    const logoSection = logoSectionRef.current;
    const contactSection = contactSectionRef.current;
    const socialSection = socialSectionRef.current;

    if (!footer || !line || !logoSection || !contactSection || !socialSection)
      return;

    // ... semua kode GSAP lainnya
    */
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative overflow-hidden mt-32 sm:mt-40 md:mt-48 lg:mt-56 xl:mt-64 px-4 sm:px-6 md:px-8 lg:px-12 pb-20 sm:pb-24 md:pb-28 lg:pb-32"
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 opacity-40 bg-white" />

      {/* Footer content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 lg:gap-8 pt-12 sm:pt-16 md:pt-20 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex flex-col items-center lg:items-start order-1 lg:order-1">
          <img
            src="/img/Monogram_RS.png"
            className="w-24 sm:w-32 md:w-36 lg:w-[142px] hover:scale-110 transition-transform duration-300"
            alt="LOGO RS"
          />
          <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3">
            RAFADITYA S
          </h3>
          <h4 className="text-white font-medium text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
            Front-End Developer & UI/UX Designer
          </h4>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center lg:items-center order-2 lg:order-2 w-full lg:w-auto max-w-md lg:max-w-none">
          {/* Contact Info */}
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
              Contact
            </h2>
            <div className="flex gap-2 items-center justify-center">
              <img
                src="/img/email.png"
                alt="Email icon"
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
              />
              <h3 className="text-white text-xs sm:text-sm md:text-base break-all">
               iniakuraditt@gmail.com
              </h3>
            </div>
          </div>

          {/* Collaboration Form */}
          <div className="flex flex-col items-center text-center w-full">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 lg:mb-7">
              Want To Collab?
            </h2>
            
            {/* Status Message */}
            {statusMessage && (
              <div className={`mb-4 p-3 rounded-md text-center max-w-md ${
                statusMessage.includes("✅") 
                  ? "bg-green-500 text-white" 
                  : "bg-red-500 text-white"
              }`}>
                {statusMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full lg:w-auto items-center gap-4"
            >
              {/* Email Input */}
              <input
                className="bg-white w-full sm:w-80 md:w-96 h-10 sm:h-12 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base border border-gray-300"
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={formData.isSubmitting}
              />
              
              {/* Message Textarea */}
              <textarea
                className="bg-white w-full sm:w-80 md:w-96 h-24 sm:h-28 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base border border-gray-300 resize-none"
                name="message"
                placeholder="Tell me about your project or collaboration idea..."
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={formData.isSubmitting}
                maxLength={500}
              />
              
              <div className="text-gray-400 text-xs text-right w-full sm:w-80 md:w-96">
                {formData.message.length}/500 characters
              </div>

              <button
                type="submit"
                disabled={formData.isSubmitting}
                className="bg-gradient-to-r from-[#280087] to-[#C00000] text-white font-bold text-sm md:text-base whitespace-nowrap px-6 sm:px-8 py-3 sm:py-4 rounded hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {formData.isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-center lg:items-end order-3 lg:order-3">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-center lg:text-right">
            Social
          </h2>
          <div className="flex justify-center gap-4 sm:gap-6 items-center">
            <a
              href="https://www.instagram.com/rafaa_ndl?igsh=MXVuenhyaHgzeGhjMw=="
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="Instagram"
            >
              <img
                src="/img/instagram.png"
                alt="Instagram"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer transition-all duration-300"
              />
            </a>
            <a
              href="https://www.youtube.com/@iniakuraditt"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="YouTube"
            >
              <img
                src="/img/youtube.png"
                alt="YouTube"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer transition-all duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="flex relative justify-center items-center mt-28">
        <div className="absolute -top-10 left-1/2 w-10/12 -translate-x-1/2 h-0.5 sm:h-1 opacity-20 bg-white" />
        <h1 className="text-white font-bold">RAFADITYA S • 2025</h1>
      </div>
    </footer>
  );
};

export default Footer;