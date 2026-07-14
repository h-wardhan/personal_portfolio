import { useState, useRef, FormEvent } from 'react';
import { useInView, motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.length > 50) {
      return 'Name must be 50 characters or less';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validateMessage = (message: string): string => {
    if (!message.trim()) {
      return 'Message is required';
    }
    if (message.length > 200) {
      return `Message must be 200 characters or less (${message.length}/200)`;
    }
    return '';
  };

  const validateForm = (): boolean => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
    });

    return !nameError && !emailError && !messageError;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const serviceId = 'service_4asi8b8';
      const templateId = 'template_5af8xl9';
      const publicKey = '5IoGl9LidEt8kIUnY';

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'wardhanh886@gmail.com',
      link: 'mailto:wardhanh886@gmail.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '9664063981',
      link: 'tel:+919664063981',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'harshwardhan-singh',
      link: 'https://www.linkedin.com/in/h-wardhan/',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'h-wardhan',
      link: 'https://github.com/h-wardhan',
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface dark:bg-light-surface"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">
            I'm always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-6">
              Contact Information
            </h3>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center gap-4 p-4 bg-dark-bg dark:bg-gray-100 rounded-lg hover:bg-indigo-600/10 dark:hover:bg-indigo-50 transition-colors group"
                >
                  <div className="p-3 bg-indigo-600/20 dark:bg-indigo-100 rounded-lg group-hover:bg-indigo-600 dark:group-hover:bg-indigo-200 transition-colors">
                    <Icon className="text-2xl text-indigo-400 dark:text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-600 text-sm">{info.label}</p>
                    <p className="text-white dark:text-gray-900 font-semibold">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-white dark:text-gray-900 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 50);
                  setFormData({ ...formData, name: value });
                  setErrors({ ...errors, name: validateName(value) });
                }}
                onBlur={() => setErrors({ ...errors, name: validateName(formData.name) })}
                maxLength={50}
                className={`w-full px-4 py-3 bg-dark-bg dark:bg-gray-50 border rounded-lg text-white dark:text-gray-900 focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-700 dark:border-gray-300 focus:border-indigo-500'
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-white dark:text-gray-900 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: validateEmail(e.target.value) });
                }}
                onBlur={() => setErrors({ ...errors, email: validateEmail(formData.email) })}
                className={`w-full px-4 py-3 bg-dark-bg dark:bg-gray-50 border rounded-lg text-white dark:text-gray-900 focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-700 dark:border-gray-300 focus:border-indigo-500'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-white dark:text-gray-900 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 200);
                  setFormData({ ...formData, message: value });
                  setErrors({ ...errors, message: validateMessage(value) });
                }}
                onBlur={() => setErrors({ ...errors, message: validateMessage(formData.message) })}
                maxLength={200}
                rows={6}
                className={`w-full px-4 py-3 bg-dark-bg dark:bg-gray-50 border rounded-lg text-white dark:text-gray-900 focus:outline-none transition-colors resize-none ${
                  errors.message
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-700 dark:border-gray-300 focus:border-indigo-500'
                }`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? 'Sending...'
                : submitStatus === 'success'
                ? 'Message Sent! ✓'
                : submitStatus === 'error'
                ? 'Error - Try Again'
                : 'Send Message'}
            </motion.button>
            {submitStatus === 'success' && (
              <p className="text-green-400 text-sm text-center">
                Thank you! I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Please try again or contact me directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

