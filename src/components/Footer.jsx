import React from 'react';

export function Footer() {
  const footerLinks = [
    { title: 'ABOUT', links: ['About Us', 'Blog', 'Press', 'Careers'] },
    { title: 'SUPPORT', links: ['Help Center', 'Safety', 'Terms', 'Privacy'] },
    { title: 'COMMUNITY', links: ['Forums', 'Guidelines', 'Feedback', 'Contact'] },
  ];

  return (
    <footer className="bg-[#1C1C1C] border-t border-[#0B0B0B] mt-16">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl tracking-tight mb-4">
              <span className="text-[#E10600]">VICE</span>
              <span className="text-[#7B2FF7]">HUB</span>
            </div>
            <p className="text-sm text-[#9A9A9A] leading-relaxed">
              Premium adult entertainment platform. 18+ only.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm tracking-wide mb-3 text-[#E10600]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-[#9A9A9A] hover:text-[#E10600] transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0B0B0B]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9A9A9A]">
            <p>© 2025 ViceHub. All rights reserved.</p>
            <p className="text-center">
              This site is for adults only. Must be 18+ to enter.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
