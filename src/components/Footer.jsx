import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const footerLinks = [
    {
      title: "ABOUT",
      links: [
        { label: "Categories", href: "/Categories" },
        { label: "Reels", href: "/video" },
      ],
    },
  ];

  return (
    <footer className="bg-[#050914] border-t border-[#1f2933] mt-16">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl flex tracking-tight mb-4">
              <Image
                src="/lady.webp"
                alt="khrzt lgnaouiii"
                height={40}
                width={40}
                className="rounded-full mr-3"
              />
              <span className="text-[#e11d48]">Lady</span>
              <span className="text-[#f9fafb] ml-1">Porn</span>
            </div>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Discreet, high‑quality nude ladies videos and reels for adults who
              appreciate elegant visuals.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold tracking-[0.18em] mb-3 text-[#e11d48]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9ca3af] hover:text-[#f9fafb] hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1f2933]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-[#6b7280]">
            <p>© 2026 LadiesNude.com. All rights reserved.</p>
            <p className="text-center">
              This website contains explicit content and is intended for adults
              only. You must be 18 years or older to use this service.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
