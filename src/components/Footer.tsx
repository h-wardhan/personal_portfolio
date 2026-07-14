import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/h-wardhan/',
      label: 'LinkedIn',
    },
    {
      icon: FaGithub,
      href: 'https://github.com/h-wardhan',
      label: 'GitHub',
    },
    {
      icon: FaEnvelope,
      href: 'mailto:wardhanh886@gmail.com',
      label: 'Email',
    },
    {
      icon: FaPhone,
      href: 'tel:+919664063981',
      label: 'Phone',
    },
  ];

  return (
    <footer className="bg-dark-bg dark:bg-light-bg border-t border-gray-800 dark:border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Harshwardhan Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="text-xl" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

