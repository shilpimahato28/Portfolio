import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import config from "../data/config";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-padding relative z-10 bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight mb-4">
            LET&apos;S WORK{" "}
            <span className="text-[#915EFF]">TOGETHER</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="contact-card"
        >
          <SectionHeader
            title="Contact Form"
            subtitle={`Please contact me directly at ${config.email.replace("@", "(at)")} or drop your info here.`}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Full name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                placeholder=""
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                placeholder=""
              />
            </div>

            <div>
              <label className="form-label">Your Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="form-input resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <p className="text-[var(--text-muted)] text-sm">
              I&apos;ll never share your data with anyone else. Pinky promise!
            </p>

            <button type="submit" className="submit-btn">
              {sent ? (
                "Message Sent! ✓"
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
